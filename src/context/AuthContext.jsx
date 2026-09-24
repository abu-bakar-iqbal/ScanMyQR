import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const STORAGE_KEY_USER = 'Fakhr Almas_current_user';

const DEFAULT_USER = {
  id: 'usr_pro_101',
  name: 'Alex Morgan',
  email: 'alex.morgan@enterprise.com',
  company: 'Apex Global Solutions',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  role: 'Pro Member'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEFAULT_USER));
    }
  }, []);

  const login = (email, name) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name || email.split('@')[0],
      email,
      company: 'My Business',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      role: 'Verified Creator'
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authModalOpen,
        openAuthModal: () => setAuthModalOpen(true),
        closeAuthModal: () => setAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
