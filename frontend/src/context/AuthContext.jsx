import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredAuth,
  setStoredAuth,
  clearStoredAuth,
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUserProfile,
  initDefaultMockUsers,
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inisialisasi sesi saat aplikasi pertama kali dimuat
  useEffect(() => {
    initDefaultMockUsers();
    const stored = getStoredAuth();
    if (stored?.user && stored?.token) {
      setUser(stored.user);
      setToken(stored.token);

      // Sinkronkan data user terbaru jika token aktif
      fetchCurrentUserProfile()
        .then((freshUser) => {
          if (freshUser) setUser(freshUser);
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login handler
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.user);
      setToken(result.token);
    }
    return result;
  };

  // Register handler
  const register = async (userData) => {
    const result = await registerUser(userData);
    if (result.success && result.data?.user) {
      setUser(result.data.user);
      setToken(result.data.token);
    }
    return result;
  };

  // Logout handler
  const logout = async () => {
    await logoutUser();
    setUser(null);
    setToken(null);
  };

  // Demo helper: Ganti role secara instan untuk kemudahan pengujian & evaluasi
  const switchRoleDemo = (targetRole) => {
    if (!user) {
      // Jika belum login, pasang default mock user sesuai role
      const mockUser =
        targetRole === 'admin'
          ? { id: 1, name: 'Super Administrator', email: 'admin@booksales.com', role: 'admin' }
          : { id: 2, name: 'Budi Pembeli (User)', email: 'user@booksales.com', role: 'user' };
      const mockToken = `demo_${targetRole}_${Date.now()}`;
      setStoredAuth(mockUser, mockToken);
      setUser(mockUser);
      setToken(mockToken);
      return;
    }

    const updatedUser = { ...user, role: targetRole };
    setStoredAuth(updatedUser, token);
    setUser(updatedUser);
  };

  const value = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isLoading,
    login,
    register,
    logout,
    switchRoleDemo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam <AuthProvider>');
  }
  return context;
};
