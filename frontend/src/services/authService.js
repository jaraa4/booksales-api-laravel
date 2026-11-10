/**
 * Service Otorisasi dan Autentikasi (Auth Service)
 * Terintegrasi dengan Backend Laravel API (BookSales API)
 * Dilengkapi fallback offline / local storage mock demi keandalan demo pengujian.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const AUTH_KEY = 'booksales_auth';
const USERS_KEY = 'registered_users';

// Seed default users untuk pengujian langsung (User & Admin)
export const initDefaultMockUsers = () => {
  try {
    const existing = localStorage.getItem(USERS_KEY);
    if (!existing) {
      const defaultUsers = [
        {
          id: 1,
          name: 'Super Administrator',
          username: 'admin',
          email: 'admin@booksales.com',
          password: 'password123',
          role: 'admin',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Budi Pembeli (User)',
          username: 'budi_user',
          email: 'user@booksales.com',
          password: 'password123',
          role: 'user',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }
  } catch (e) {
    console.error('Gagal inisialisasi default users:', e);
  }
};

// Ambil riwayat user yang tersimpan di localStorage
export const getRegisteredUsers = () => {
  initDefaultMockUsers();
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Simpan user baru ke localStorage
export const saveToLocalStorage = (user) => {
  try {
    const users = getRegisteredUsers();
    const newUser = {
      id: user.id || Date.now(),
      name: user.name || user.fullName,
      username: user.username || (user.email ? user.email.split('@')[0] : 'user'),
      email: user.email,
      password: user.password || 'password123',
      role: user.role || 'user',
      createdAt: new Date().toISOString(),
    };
    // Hapus duplikat email jika ada di riwayat
    const filtered = users.filter((u) => u.email.toLowerCase() !== newUser.email.toLowerCase());
    filtered.unshift(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(filtered.slice(0, 50)));
    return newUser;
  } catch (e) {
    console.error('Gagal menyimpan user ke localStorage:', e);
    return user;
  }
};

// Ambil sesi autentikasi aktif dari localStorage
export const getStoredAuth = () => {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Gagal membaca auth session:', e);
    return null;
  }
};

// Simpan sesi autentikasi aktif
export const setStoredAuth = (user, token) => {
  try {
    const authData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
      },
      token: token || `mock_token_${Date.now()}`,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return authData;
  } catch (e) {
    console.error('Gagal menyimpan sesi auth:', e);
    return null;
  }
};

// Hapus sesi autentikasi
export const clearStoredAuth = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Gagal menghapus sesi auth:', e);
  }
};

// Helper: Cek apakah user memiliki peran yang diizinkan
export const hasRole = (user, allowedRoles) => {
  if (!user || !user.role) return false;
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return allowedRoles.includes(user.role);
};

// Helper: Cek apakah user adalah admin
export const isAdmin = (user) => {
  return user?.role === 'admin';
};

/**
 * Service Login
 * Menghubungi API Laravel POST /api/login dengan fallback mock database
 */
export const loginUser = async (email, password) => {
  initDefaultMockUsers();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);

    if (response.ok && data?.status === 'success') {
      const user = data.data.user;
      const token = data.data.token;
      setStoredAuth(user, token);
      saveToLocalStorage(user);

      return {
        success: true,
        source: 'api',
        message: data.message || 'Login berhasil melalui Laravel API!',
        user,
        token,
      };
    } else {
      if (response.status === 401 || response.status === 422) {
        return {
          success: false,
          source: 'api',
          message: data?.message || 'Email atau password salah.',
          errors: data?.errors,
        };
      }
      throw new Error(data?.message || 'Server error');
    }
  } catch (err) {
    // Mode Offline / Fallback Mocking
    console.warn('Backend API tidak merespons, beralih ke validasi mock akun:', err.message);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getRegisteredUsers();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    // Cek kecocokan password sederhana pada data mock
    if (!foundUser || (foundUser.password && foundUser.password !== password)) {
      return {
        success: false,
        source: 'mock',
        message: 'Kombinasi email dan kata sandi tidak ditemukan pada sistem.',
      };
    }

    const authData = setStoredAuth(foundUser, `mock_token_${Date.now()}`);

    return {
      success: true,
      source: 'mock',
      message: 'Login berhasil (Mode Simulasi Client Storage).',
      user: authData.user,
      token: authData.token,
    };
  }
};

/**
 * Service Registrasi
 * Menghubungi API Laravel POST /api/register
 */
export const registerUser = async (userData) => {
  initDefaultMockUsers();

  const payload = {
    name: userData.fullName || userData.name,
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user',
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);

    if (response.ok) {
      const savedUser = saveToLocalStorage(payload);
      const user = data?.data?.user || savedUser;
      const token = data?.data?.token || `mock_token_${Date.now()}`;
      setStoredAuth(user, token);

      return {
        success: true,
        source: 'api',
        message: data?.message || 'Registrasi akun berhasil ke server Laravel!',
        data: { user, token },
      };
    } else {
      if (response.status === 422 && data?.errors) {
        return {
          success: false,
          source: 'api',
          message: data.message || 'Validasi pendaftaran gagal',
          errors: data.errors,
        };
      }
      throw new Error(data?.message || 'Server error');
    }
  } catch (err) {
    console.warn('Backend API tidak merespons, beralih ke mode offline simulasi:', err.message);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const existingUsers = getRegisteredUsers();
    const emailExists = existingUsers.some(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        source: 'mock',
        message: 'Alamat email ini sudah terdaftar. Silakan gunakan email lain atau login.',
        errors: { email: ['Email sudah terdaftar.'] },
      };
    }

    const saved = saveToLocalStorage(payload);
    const token = `mock_token_${Date.now()}`;
    setStoredAuth(saved, token);

    return {
      success: true,
      source: 'mock',
      message: 'Registrasi berhasil (Simulasi Client Storage). Akun siap digunakan!',
      data: {
        user: {
          id: saved.id,
          name: saved.name,
          username: saved.username,
          email: saved.email,
          role: saved.role,
        },
        token,
      },
    };
  }
};

/**
 * Service Logout
 * Menghubungi POST /api/logout (jika ada token) dan membersihkan storage
 */
export const logoutUser = async () => {
  const currentAuth = getStoredAuth();

  if (currentAuth?.token && !currentAuth.token.startsWith('mock_')) {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${currentAuth.token}`,
        },
      });
    } catch (e) {
      console.warn('Gagal memanggil endpoint logout Laravel:', e.message);
    }
  }

  clearStoredAuth();
  return { success: true };
};

/**
 * Service Ambil Profil Pengguna Saat Ini
 */
export const fetchCurrentUserProfile = async () => {
  const currentAuth = getStoredAuth();
  if (!currentAuth) return null;

  if (currentAuth.token && !currentAuth.token.startsWith('mock_')) {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${currentAuth.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setStoredAuth(data.data, currentAuth.token);
          return data.data;
        }
      }
    } catch (e) {
      console.warn('Gagal sync profil dengan Laravel API, menggunakan data lokal:', e.message);
    }
  }

  return currentAuth.user;
};
