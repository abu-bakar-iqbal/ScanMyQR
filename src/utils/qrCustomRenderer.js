// Custom QR Code Drawing Engine (Supports Heart, Diamond, Dot, Square, Rectangle, Star, Leaf shapes)
import QRCode from 'qrcode';

export async function renderCustomQrToCanvas(canvas, qrContent, options = {}) {
  const {
    fgColor = '#000000',
    bgColor = '#ffffff',
    eyeShape = 'square', // square, rounded, circle, leaf, diamond
    eyeInnerShape = 'square', // square, circle, diamond, heart, star
    moduleShape = 'square', // square, dot, rounded, diamond, heart, star, rectangle
    logoUrl = null,
    frameText = 'SCAN ME', // SCAN ME, FOLLOW US, CONNECT, WATCH VIDEO, VIEW PDF, none
    frameColor = '#2563eb',
    frameTextColor = '#ffffff',
    errorCorrection = 'M'
  } = options;

  if (!canvas || !qrContent) return;

  const ctx = canvas.getContext('2d');
  const size = 320;
  const canvasSize = size + (frameText && frameText !== 'none' ? 90 : 30);

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // 1. Outer Frame
  if (frameText && frameText !== 'none') {
    ctx.fillStyle = frameColor;
    drawRoundedRect(ctx, 0, 0, canvasSize, canvasSize, 24);
    ctx.fill();

    ctx.fillStyle = bgColor;
    drawRoundedRect(ctx, 15, 15, canvasSize - 30, canvasSize - 75, 16);
    ctx.fill();

    ctx.fillStyle = frameTextColor;
    ctx.font = 'bold 18px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(frameText.toUpperCase(), canvasSize / 2, canvasSize - 30);
  } else {
    ctx.fillStyle = bgColor;
    drawRoundedRect(ctx, 0, 0, canvasSize, canvasSize, 16);
    ctx.fill();
  }

  // 2. Generate QR Data Matrix
  try {
    const qrData = QRCode.create(qrContent, { errorCorrectionLevel: errorCorrection });
    const modules = qrData.modules;
    const moduleCount = modules.size;
    const qrDrawSize = size;
    const cellSize = qrDrawSize / moduleCount;
    const offsetX = (canvasSize - qrDrawSize) / 2;
    const offsetY = frameText && frameText !== 'none' ? 25 : (canvasSize - qrDrawSize) / 2;

    ctx.fillStyle = fgColor;

    for (let r = 0; r < moduleCount; r++) {
      for (let c = 0; c < moduleCount; c++) {
        if (!modules.get(r, c)) continue;

        // Skip corner eyes
        const isTopLeftEye = r < 7 && c < 7;
        const isTopRightEye = r < 7 && c >= moduleCount - 7;
        const isBottomLeftEye = r >= moduleCount - 7 && c < 7;

        if (isTopLeftEye || isTopRightEye || isBottomLeftEye) continue;

        const x = offsetX + c * cellSize;
        const y = offsetY + r * cellSize;

        drawModuleShape(ctx, x, y, cellSize, moduleShape, fgColor);
      }
    }

    // 3. Draw Finder Eyes
    drawEye(ctx, offsetX, offsetY, cellSize, eyeShape, eyeInnerShape, fgColor, bgColor);
    drawEye(ctx, offsetX + (moduleCount - 7) * cellSize, offsetY, cellSize, eyeShape, eyeInnerShape, fgColor, bgColor);
    drawEye(ctx, offsetX, offsetY + (moduleCount - 7) * cellSize, cellSize, eyeShape, eyeInnerShape, fgColor, bgColor);

    // 4. Logo Overlay
    if (logoUrl) {
      const logoSize = size * 0.22;
      const logoX = canvasSize / 2 - logoSize / 2;
      const logoY = frameText && frameText !== 'none' ? (offsetY + size / 2 - logoSize / 2) : canvasSize / 2 - logoSize / 2;

      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.arc(canvasSize / 2, logoY + logoSize / 2, logoSize * 0.6, 0, Math.PI * 2);
      ctx.fill();

      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = logoUrl;
        await new Promise((resolve) => {
          img.onload = () => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(canvasSize / 2, logoY + logoSize / 2, logoSize * 0.5, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
            ctx.restore();
            resolve();
          };
          img.onerror = () => resolve();
        });
      } catch (err) {
        console.error('Logo render error:', err);
      }
    }
  } catch (err) {
    console.error('QR Render Error:', err);
  }
}

function drawModuleShape(ctx, x, y, size, shape, color) {
  ctx.fillStyle = color;
  const pad = size * 0.05;
  const s = size - pad * 2;

  switch (shape) {
    case 'dot':
    case 'circle':
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size * 0.42, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'rounded':
      drawRoundedRect(ctx, x + pad, y + pad, s, s, s * 0.35);
      ctx.fill();
      break;

    case 'diamond':
      ctx.beginPath();
      ctx.moveTo(x + size / 2, y);
      ctx.lineTo(x + size, y + size / 2);
      ctx.lineTo(x + size / 2, y + size);
      ctx.lineTo(x, y + size / 2);
      ctx.closePath();
      ctx.fill();
      break;

    case 'heart':
      drawHeart(ctx, x + size / 2, y + size / 2, size * 0.45);
      ctx.fill();
      break;

    case 'star':
      drawStar(ctx, x + size / 2, y + size / 2, 5, size * 0.45, size * 0.22);
      ctx.fill();
      break;

    case 'rectangle':
    case 'bar':
      drawRoundedRect(ctx, x + pad, y + pad + size * 0.1, s, s * 0.8, s * 0.2);
      ctx.fill();
      break;

    case 'square':
    default:
      ctx.fillRect(x, y, size + 0.2, size + 0.2);
      break;
  }
}

function drawEye(ctx, x, y, cellSize, eyeShape, eyeInnerShape, fgColor, bgColor) {
  const outerSize = 7 * cellSize;
  const innerSize = 3 * cellSize;

  ctx.fillStyle = fgColor;

  // Draw Outer Eye Frame
  if (eyeShape === 'circle') {
    ctx.beginPath();
    ctx.arc(x + outerSize / 2, y + outerSize / 2, outerSize / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(x + outerSize / 2, y + outerSize / 2, (outerSize - 2 * cellSize) / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (eyeShape === 'rounded') {
    drawRoundedRect(ctx, x, y, outerSize, outerSize, outerSize * 0.3);
    ctx.fill();

    ctx.fillStyle = bgColor;
    drawRoundedRect(ctx, x + cellSize, y + cellSize, outerSize - 2 * cellSize, outerSize - 2 * cellSize, (outerSize - 2 * cellSize) * 0.25);
    ctx.fill();
  } else if (eyeShape === 'leaf') {
    ctx.beginPath();
    ctx.moveTo(x + outerSize / 2, y);
    ctx.quadraticCurveTo(x + outerSize, y, x + outerSize, y + outerSize / 2);
    ctx.quadraticCurveTo(x + outerSize, y + outerSize, x + outerSize / 2, y + outerSize);
    ctx.quadraticCurveTo(x, y + outerSize, x, y + outerSize / 2);
    ctx.quadraticCurveTo(x, y, x + outerSize / 2, y);
    ctx.fill();

    ctx.fillStyle = bgColor;
    drawRoundedRect(ctx, x + cellSize, y + cellSize, outerSize - 2 * cellSize, outerSize - 2 * cellSize, outerSize * 0.2);
    ctx.fill();
  } else if (eyeShape === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(x + outerSize / 2, y);
    ctx.lineTo(x + outerSize, y + outerSize / 2);
    ctx.lineTo(x + outerSize / 2, y + outerSize);
    ctx.lineTo(x, y + outerSize / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = bgColor;
    const inSize = outerSize - 2 * cellSize;
    const inX = x + cellSize;
    const inY = y + cellSize;
    ctx.beginPath();
    ctx.moveTo(inX + inSize / 2, inY);
    ctx.lineTo(inX + inSize, inY + inSize / 2);
    ctx.lineTo(inX + inSize / 2, inY + inSize);
    ctx.lineTo(inX, inY + inSize / 2);
    ctx.closePath();
    ctx.fill();
  } else {
    // Default Square
    ctx.fillRect(x, y, outerSize, outerSize);
    ctx.fillStyle = bgColor;
    ctx.fillRect(x + cellSize, y + cellSize, outerSize - 2 * cellSize, outerSize - 2 * cellSize);
  }

  // Draw Inner Pupil Center
  ctx.fillStyle = fgColor;
  const pupilX = x + 2 * cellSize;
  const pupilY = y + 2 * cellSize;

  if (eyeInnerShape === 'circle') {
    ctx.beginPath();
    ctx.arc(x + outerSize / 2, y + outerSize / 2, innerSize / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (eyeInnerShape === 'diamond') {
    ctx.beginPath();
    ctx.moveTo(x + outerSize / 2, pupilY);
    ctx.lineTo(pupilX + innerSize, y + outerSize / 2);
    ctx.lineTo(x + outerSize / 2, pupilY + innerSize);
    ctx.lineTo(pupilX, y + outerSize / 2);
    ctx.closePath();
    ctx.fill();
  } else if (eyeInnerShape === 'heart') {
    drawHeart(ctx, x + outerSize / 2, y + outerSize / 2, innerSize * 0.5);
    ctx.fill();
  } else if (eyeInnerShape === 'star') {
    drawStar(ctx, x + outerSize / 2, y + outerSize / 2, 5, innerSize * 0.5, innerSize * 0.25);
    ctx.fill();
  } else {
    // Default Square
    drawRoundedRect(ctx, pupilX, pupilY, innerSize, innerSize, innerSize * 0.2);
    ctx.fill();
  }
}

function drawHeart(ctx, cx, cy, r) {
  ctx.beginPath();
  ctx.moveTo(cx, cy + r * 0.7);
  ctx.bezierCurveTo(cx - r * 1.2, cy + r * 0.2, cx - r * 1.2, cy - r * 0.6, cx - r * 0.6, cy - r * 0.8);
  ctx.bezierCurveTo(cx - r * 0.2, cy - r * 0.9, cx, cy - r * 0.4, cx, cy - r * 0.3);
  ctx.bezierCurveTo(cx, cy - r * 0.4, cx + r * 0.2, cy - r * 0.9, cx + r * 0.6, cy - r * 0.8);
  ctx.bezierCurveTo(cx + r * 1.2, cy - r * 0.6, cx + r * 1.2, cy + r * 0.2, cx, cy + r * 0.7);
  ctx.closePath();
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
