import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

const TRIAL_DURATION_DAYS = 7;
const TRIAL_DURATION_MS = TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000;
const STORAGE_KEY_TRIAL = 'scanmyqr_trial_start';
const STORAGE_KEY_LIFETIME = 'scanmyqr_lifetime_pro';

export function SubscriptionProvider({ children }) {
  const [trialStartDate, setTrialStartDate] = useState(null);
  const [isLifetimePro, setIsLifetimePro] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    // Check local storage for trial & lifetime status
    const storedTrial = localStorage.getItem(STORAGE_KEY_TRIAL);
    const storedLifetime = localStorage.getItem(STORAGE_KEY_LIFETIME);

    if (storedLifetime === 'true') {
      setIsLifetimePro(true);
    }

    let startTime;
    if (!storedTrial) {
      startTime = Date.now();
      localStorage.setItem(STORAGE_KEY_TRIAL, startTime.toString());
    } else {
      startTime = parseInt(storedTrial, 10);
    }
    setTrialStartDate(startTime);
  }, []);

  useEffect(() => {
    if (!trialStartDate || isLifetimePro) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - trialStartDate;
      const remainingMs = TRIAL_DURATION_MS - elapsed;

      if (remainingMs <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds, isExpired: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [trialStartDate, isLifetimePro]);

  const unlockLifetime = () => {
    localStorage.setItem(STORAGE_KEY_LIFETIME, 'true');
    setIsLifetimePro(true);
    setShowPaymentModal(false);
  };

  const openPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isLifetimePro,
        trialStartDate,
        timeRemaining,
        showPaymentModal,
        openPaymentModal,
        closePaymentModal,
        unlockLifetime
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
