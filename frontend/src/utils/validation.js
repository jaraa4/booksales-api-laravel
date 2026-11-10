/**
 * Helper modul validasi form registrasi
 */

export const validateFullName = (name) => {
  if (!name || !name.trim()) {
    return 'Nama lengkap tidak boleh kosong';
  }
  if (name.trim().length < 3) {
    return 'Nama lengkap minimal 3 karakter';
  }
  if (!/^[a-zA-Z\s'.]+$/.test(name.trim())) {
    return 'Nama hanya boleh mengandung huruf, spasi, titik, dan petik';
  }
  return '';
};

export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return 'Username tidak boleh kosong';
  }
  const trimmed = username.trim();
  if (trimmed.length < 3) {
    return 'Username minimal 3 karakter';
  }
  if (trimmed.length > 20) {
    return 'Username maksimal 20 karakter';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return 'Username hanya boleh huruf, angka, dan underscore (_), tanpa spasi';
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Alamat email tidak boleh kosong';
  }
  // Standar RFC 5322 regex sederhana untuk email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Format email tidak valid (contoh: nama@domain.com)';
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Kata sandi tidak boleh kosong';
  }
  if (password.length < 6) {
    return 'Kata sandi minimal 6 karakter';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Konfirmasi kata sandi tidak boleh kosong';
  }
  if (password !== confirmPassword) {
    return 'Konfirmasi kata sandi tidak cocok';
  }
  return '';
};

/**
 * Menghitung tingkat kekuatan password:
 * Score 0 - 4:
 * 0: Sangat Lemah
 * 1: Lemah
 * 2: Cukup
 * 3: Bagus
 * 4: Sangat Kuat
 */
export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: '', color: '', percent: 0 };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // normalize to max 4
  const normalized = Math.min(score, 4);

  switch (normalized) {
    case 1:
      return { score: 1, label: 'Lemah', color: 'bg-red-500 text-red-400', percent: 25 };
    case 2:
      return { score: 2, label: 'Cukup', color: 'bg-amber-500 text-amber-400', percent: 50 };
    case 3:
      return { score: 3, label: 'Bagus', color: 'bg-blue-500 text-blue-400', percent: 75 };
    case 4:
      return { score: 4, label: 'Sangat Kuat', color: 'bg-emerald-500 text-emerald-400', percent: 100 };
    default:
      return { score: 0, label: 'Terlalu Pendek', color: 'bg-rose-500 text-rose-400', percent: 10 };
  }
};
