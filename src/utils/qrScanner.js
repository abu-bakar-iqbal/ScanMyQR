import jsQR from 'jsqr';

export function scanQrFromImageCanvas(canvas) {
  try {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return null;

    const imageData = ctx.getImageData(0, 0, width, height);

    // 1. Normal Scan
    let code = jsQR(imageData.data, width, height, { inversionAttempts: 'dontInvert' });
    if (code && code.data) return code.data;

    // 2. Inverted Colors Scan
    code = jsQR(imageData.data, width, height, { inversionAttempts: 'invertFirst' });
    if (code && code.data) return code.data;

    // 3. Attempt image contrast enhancement & binarization
    const binarized = ctx.createImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
      const v = avg > 128 ? 255 : 0;
      binarized.data[i] = v;
      binarized.data[i + 1] = v;
      binarized.data[i + 2] = v;
      binarized.data[i + 3] = 255;
    }

    code = jsQR(binarized.data, width, height, { inversionAttempts: 'attemptBoth' });
    if (code && code.data) return code.data;

    return null;
  } catch (err) {
    console.error('Scan canvas error:', err);
    return null;
  }
}

export function scanQrFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No file provided');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Try multiple canvas scales (Original, 600px, 400px)
        const scales = [1, 600 / Math.max(img.width, img.height), 400 / Math.max(img.width, img.height)];

        for (const scale of scales) {
          if (scale <= 0) continue;
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(100, Math.floor(img.width * scale));
          canvas.height = Math.max(100, Math.floor(img.height * scale));
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const result = scanQrFromImageCanvas(canvas);
          if (result) {
            resolve(result);
            return;
          }
        }

        reject('Could not detect or decode a valid QR code in this image. Please ensure the QR code is clear.');
      };
      img.onerror = () => reject('Failed to load image file.');
      img.src = e.target.result;
    };
    reader.onerror = () => reject('Failed to read file.');
    reader.readAsDataURL(file);
  });
}
