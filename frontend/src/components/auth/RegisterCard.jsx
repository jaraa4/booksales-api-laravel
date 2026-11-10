import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, AtSign, Lock, ShieldCheck, ArrowRight, BookOpen, Shield } from 'lucide-react';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import {
  validateFullName,
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validation';
import { registerUser } from '../../services/authService';

export const RegisterCard = ({ onSuccessRegister }) => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role
    termsAccepted: false,
  });

  // UI & Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverFeedback, setServerFeedback] = useState(null);

  // Field validation function
  const validateField = (name, value, currentFormData = formData) => {
    switch (name) {
      case 'fullName':
        return validateFullName(value);
      case 'username':
        return validateUsername(value);
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return validateConfirmPassword(currentFormData.password, value);
      case 'termsAccepted':
        return !value ? 'Anda harus menyetujui Syarat dan Ketentuan' : '';
      default:
        return '';
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: fieldValue,
    };

    setFormData(updatedFormData);

    // If already touched, validate dynamically
    if (touched[name]) {
      const errorMsg = validateField(name, fieldValue, updatedFormData);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
      }));
    }

    // Special case: if password changed, re-validate confirmPassword if touched
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateConfirmPassword(fieldValue, formData.confirmPassword);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  // Handle onBlur (when user leaves input)
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const errorMsg = validateField(name, fieldValue, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  // Validate entire form before submission
  const validateEntireForm = () => {
    const newErrors = {
      fullName: validateFullName(formData.fullName),
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
      termsAccepted: !formData.termsAccepted ? 'Anda harus menyetujui Syarat & Ketentuan' : '',
    };

    setErrors(newErrors);

    // Mark all as touched
    setTouched({
      fullName: true,
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      termsAccepted: true,
    });

    const hasError = Object.values(newErrors).some((msg) => msg !== '');
    return !hasError;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerFeedback(null);

    const isValid = validateEntireForm();
    if (!isValid) {
      setServerFeedback({
        type: 'error',
        message: 'Mohon periksa kembali kolom formulir yang masih belum valid.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser(formData);

      if (result.success) {
        // Reset form
        setFormData({
          fullName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'user',
          termsAccepted: false,
        });
        setTouched({});
        setErrors({});

        // Notify parent with the registered data
        if (onSuccessRegister) {
          onSuccessRegister(result.data.user || formData, result.source);
        }
      } else {
        setServerFeedback({
          type: 'error',
          message: result.message || 'Registrasi gagal diproses.',
          details: result.errors ? Object.values(result.errors).flat() : null,
        });
      }
    } catch (err) {
      setServerFeedback({
        type: 'error',
        message: 'Terjadi kesalahan sistem yang tidak terduga. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl backdrop-blur-xl sm:p-9 glow-card">
      {/* Header Form */}
      <div className="mb-7 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
          <BookOpen className="h-3.5 w-3.5" />
          <span>BookSales Registration Portal</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Buat Akun Baru
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
          Silakan lengkapi formulir di bawah ini untuk memulai akses penuh ke katalog buku.
        </p>
      </div>

      {/* Server / Validation Feedback Banner */}
      {serverFeedback && (
        <div className="mb-6 animate-fadeIn">
          <Alert
            type={serverFeedback.type}
            message={serverFeedback.message}
            details={serverFeedback.details}
            onClose={() => setServerFeedback(null)}
          />
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Field: Role / Peran Akun */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Pilih Peran Akun (Role) <span className="text-rose-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'user' })}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                formData.role === 'user'
                  ? 'border-indigo-500 bg-indigo-500/15 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">User / Customer</span>
                {formData.role === 'user' && <span className="text-indigo-400 text-xs">●</span>}
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Akses katalog, profil, dan transaksi belanja
              </p>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'admin' })}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                formData.role === 'admin'
                  ? 'border-rose-500 bg-rose-500/15 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-rose-300">Administrator</span>
                {formData.role === 'admin' && <span className="text-rose-400 text-xs">●</span>}
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Akses penuh Admin Dashboard & manajemen data
              </p>
            </button>
          </div>
        </div>

        {/* Field: Nama Lengkap */}
        <InputField
          id="fullName"
          name="fullName"
          label="Nama Lengkap"
          placeholder="Contoh: Budi Pratama"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fullName ? errors.fullName : ''}
          icon={User}
          autoComplete="name"
        />

        {/* Field: Username & Email in Responsive Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            id="username"
            name="username"
            label="Username"
            placeholder="budipratama99"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username ? errors.username : ''}
            icon={AtSign}
            autoComplete="username"
          />

          <InputField
            id="email"
            name="email"
            type="email"
            label="Alamat Email"
            placeholder="budi@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : ''}
            icon={Mail}
            autoComplete="email"
          />
        </div>

        {/* Field: Kata Sandi */}
        <InputField
          id="password"
          name="password"
          label="Kata Sandi"
          placeholder="Minimal 8 karakter unik"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : ''}
          icon={Lock}
          isPassword
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          autoComplete="new-password"
        />

        {/* Password Strength Meter */}
        <PasswordStrengthMeter password={formData.password} />

        {/* Field: Konfirmasi Kata Sandi */}
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi Anda"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : ''}
          icon={ShieldCheck}
          isPassword
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          autoComplete="new-password"
        />

        {/* Checkbox: Syarat & Ketentuan */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500/30"
            />
            <span className="text-xs text-slate-300 leading-relaxed">
              Saya menyetujui{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="text-indigo-400 hover:underline">
                Syarat & Ketentuan
              </a>{' '}
              serta{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-indigo-400 hover:underline">
                Kebijakan Privasi
              </a>{' '}
              BookSales.
            </span>
          </label>
          {touched.termsAccepted && errors.termsAccepted && (
            <p className="mt-1 text-xs text-rose-400">{errors.termsAccepted}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white"
          >
            Daftar Sekarang
          </Button>
        </div>
      </form>

      {/* Footer Info */}
      <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
        <p className="text-xs text-slate-400">
          Sudah memiliki akun?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
          >
            Masuk ke Akun
          </Link>
        </p>
      </div>
    </div>
  );
};
