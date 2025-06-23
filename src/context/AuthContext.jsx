// birdlen_official_page/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import * as api from '../services/apiService'; // Import our API service

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login function that calls your backend, then signs into Firebase
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && !response.data.error && response.data.data) {
      const customToken = response.data.data;
      await signInWithCustomToken(auth, customToken);
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  };

  // Register function that calls your backend, then signs into Firebase
  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data && !response.data.error && response.data.data) {
      const customToken = response.data.data;
      await signInWithCustomToken(auth, customToken);
      return response.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // This listener from Firebase handles auth state changes automatically.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}