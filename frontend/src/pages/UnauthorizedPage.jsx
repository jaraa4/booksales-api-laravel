import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowLeft,
  KeyRound,
  Home,
  User,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UnauthorizedPage = () => {
  const { user, role, switchRoleDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const requiredRoles = location.state?.requiredRoles || ['admin'];

  const handleSwitchToAdmin = () => {
    switchRoleDemo('admin');
    navigate('/admin', { replace: true });
  };

  return (
    <div className="max-w-xl mx-auto py-10 text-center space-y-6">
      {/* 403 Icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-2xl shadow-rose-500/20">
        <ShieldAlert className="h-10 w-10 animate-bounce" />
      </div>

      {/* Title & Badge */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Error 403: Akses Ditolak (Forbidden)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Tidak Memiliki Izin Akses</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Maaf, Anda tidak memiliki hak akses (otorisasi) untuk membuka halaman ini.
          Halaman tersebut diproteksi khusus untuk pengguna dengan wewenang{' '}
          <strong className="text-rose-400 uppercase font-bold">{requiredRoles.join(', ')}</strong>.
        </p>
      </div>

      {/* Role Comparison Detail */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/70 text-left text-xs space-y-2">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <span className="text-slate-400">Akun Anda Saat Ini:</span>
          <span className="font-bold text-white">{user?.name || 'Tamu'}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <span className="text-slate-400">Role Anda:</span>
          <span className="font-bold uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {role || 'None'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Role yang Dibutuhkan:</span>
          <span className="font-bold uppercase text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            {requiredRoles.join(', ')}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <Home className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <Link
          to="/profile"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <User className="h-4 w-4" />
          <span>Buka Profil Saya</span>
        </Link>

        {/* Quick Demo Bypass for Evaluator/Lecturer */}
        <button
          type="button"
          onClick={handleSwitchToAdmin}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-600/25 cursor-pointer"
          title="Ganti ke peran Admin dan buka Dashboard"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Beralih ke Admin (Demo)</span>
        </button>
      </div>
    </div>
  );
};
