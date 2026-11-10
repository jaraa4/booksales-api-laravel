import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, UserCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { InputField } from '../components/common/InputField';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // URL yang dituju sebelum di-redirect oleh ProtectedRoute
  const destination = location.state?.from?.pathname || null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessInfo('');

    if (!email || !password) {
      setErrorMessage('Harap isi alamat email dan kata sandi.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccessInfo(res.message);
        setTimeout(() => {
          if (destination) {
            navigate(destination, { replace: true });
          } else {
            navigate(res.user.role === 'admin' ? '/admin' : '/profile', { replace: true });
          }
        }, 600);
      } else {
        setErrorMessage(res.message || 'Login gagal. Periksa kembali email dan password.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kendala saat login. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick fill untuk mempermudah reviewer/dosen
  const handleQuickFill = (roleType) => {
    if (roleType === 'admin') {
      setEmail('admin@booksales.com');
      setPassword('password123');
    } else {
      setEmail('user@booksales.com');
      setPassword('password123');
    }
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 pt-4 pb-8">
      {/* Redirection Notice jika diarahkan oleh ProtectedRoute */}
      {destination && (
        <Alert
          type="warning"
          title="Akses Memerlukan Login"
          message={`Halaman "${destination}" dilindungi oleh sistem keamanan. Silakan login terlebih dahulu.`}
        />
      )}

      {/* Login Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 items-center justify-center text-white shadow-lg shadow-indigo-600/30 mb-1">
            <LogIn className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Masuk ke BookSales</h2>
          <p className="text-xs text-slate-400">
            Gunakan akun Anda untuk mengakses fitur sesuai role (User / Admin)
          </p>
        </div>

        {/* Error / Success Feedback */}
        {errorMessage && (
          <div className="mb-4">
            <Alert type="error" message={errorMessage} />
          </div>
        )}
        {successInfo && (
          <div className="mb-4">
            <Alert type="success" message={successInfo} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="login-email"
            name="email"
            label="Alamat Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />

          <InputField
            id="login-password"
            name="password"
            label="Kata Sandi"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            isPassword
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            required
          />

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/25 transition-all"
          >
            Masuk Sekarang
          </Button>
        </form>

        {/* Quick Demo Fill Buttons (Sangat berguna untuk uji cepat dosen/evaluator) */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>Akun Uji Coba Cepat (1-Klik Isi):</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="px-3 py-2 rounded-xl border border-rose-500/30 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Akun Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('user')}
              className="px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Akun User</span>
            </button>
          </div>
        </div>

        {/* Link to Register */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Belum memiliki akun?{' '}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 underline">
            Daftar akun baru
          </Link>
        </div>
      </div>
    </div>
  );
};
