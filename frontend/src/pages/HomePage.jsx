import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  Users,
  LayoutDashboard,
  Layers,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const { user, isAuthenticated, isAdmin, role, switchRoleDemo } = useAuth();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Sistem Otorisasi Berbasis Peran (RBAC) & Protected Routes</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          Portal Toko Buku <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            BookSales API & Frontend
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Demonstrasi implementasi <strong className="text-indigo-300">Protected Route</strong> di React JS
          menggunakan <strong className="text-slate-200">React Router v7</strong>,{' '}
          <strong className="text-slate-200">Context API</strong>, dan sinkronisasi hak akses dengan backend{' '}
          <strong className="text-emerald-300">Laravel API</strong>.
        </p>

        {/* Current Session Banner */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-left max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold text-white shadow-inner ${
                isAdmin
                  ? 'bg-rose-500 shadow-rose-600/30'
                  : isAuthenticated
                  ? 'bg-indigo-600 shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isAdmin ? <ShieldCheck className="h-6 w-6" /> : <Users className="h-6 w-6" />}
            </div>
            <div>
              <div className="text-xs text-slate-400">Status Sesi Anda Saat Ini:</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{isAuthenticated ? user.name : 'Tamu (Guest / Belum Login)'}</span>
                {isAuthenticated && (
                  <span
                    className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                      isAdmin
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    Role: {role}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <Link
                to={isAdmin ? '/admin' : '/profile'}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <span>Buka {isAdmin ? 'Dashboard Admin' : 'Profil Saya'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Role Access Comparison Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Role Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Hak Akses: User Biasa
              </span>
              <Unlock className="h-5 w-5 text-emerald-400" />
            </div>

            <h3 className="text-xl font-bold text-white">Pengguna Biasa (Customer)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Memiliki wewenang untuk melihat profil, menelusuri katalog buku, serta membuat dan melihat riwayat transaksi pembelian buku.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300">Akses Halaman:</div>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span><strong>/</strong> (Beranda & Katalog Buku)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span><strong>/profile</strong> (Profil Pengguna Pribadi)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span><strong>/transactions</strong> (Riwayat Pembelian Buku)</span>
                </li>
                <li className="flex items-center gap-2 text-rose-400/80">
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  <span><strong>/admin</strong> (Ditolak / 403 Forbidden)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => switchRoleDemo('user')}
              className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="h-4 w-4" />
              <span>Coba Masuk Sebagai Role User</span>
            </button>
          </div>
        </div>

        {/* Admin Role Card */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6 flex flex-col justify-between hover:border-rose-500/30 transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
                Hak Akses: Administrator
              </span>
              <Lock className="h-5 w-5 text-rose-400" />
            </div>

            <h3 className="text-xl font-bold text-white">Administrator (Full Access)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Memiliki wewenang tingkat tinggi untuk mengelola katalog (CRUD Genre & Author), memantau seluruh transaksi buku penjualan, serta mengontrol sistem.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300">Akses Halaman:</div>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  <span><strong>/admin</strong> (Dashboard Manajemen & Laporan)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span><strong>/profile</strong> (Profil Administrator)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span><strong>/transactions</strong> (Lihat Semua Transaksi)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span><strong>/</strong> (Semua Halaman Publik)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => switchRoleDemo('admin')}
              className="w-full py-2.5 px-4 rounded-xl border border-rose-500/40 bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="h-4 w-4" />
              <span>Coba Masuk Sebagai Role Admin</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Route Testing Sandbox */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold">
          <Layers className="h-4 w-4" />
          <span>Pengujian Cepat Routing & Otorisasi</span>
        </div>
        <p className="text-xs text-slate-400">
          Klik tombol di bawah ini untuk melihat bagaimana React Router dan Protected Route merespons peran Anda saat ini:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/profile"
            className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-left transition-all group"
          >
            <div className="text-xs font-bold text-white group-hover:text-indigo-300 flex items-center justify-between">
              <span>Halaman Profil</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Protected Route: Membutuhkan Login (Role User / Admin)
            </div>
          </Link>

          <Link
            to="/transactions"
            className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-left transition-all group"
          >
            <div className="text-xs font-bold text-white group-hover:text-indigo-300 flex items-center justify-between">
              <span>Transaksi Pengguna</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Protected Route: Riwayat transaksi pembelian customer
            </div>
          </Link>

          <Link
            to="/admin"
            className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-950/20 hover:bg-rose-950/40 text-left transition-all group"
          >
            <div className="text-xs font-bold text-rose-300 flex items-center justify-between">
              <span>Dashboard Admin</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Protected Route Khusus: <strong>Hanya Role Admin</strong> (User biasa ditolak)
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
