import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Shield,
  Key,
  Calendar,
  CheckCircle2,
  XCircle,
  LayoutDashboard,
  ShoppingBag,
  ExternalLink,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user, token, role, isAdmin, switchRoleDemo } = useAuth();

  const permissions = [
    {
      name: 'Melihat Katalog & Beranda',
      userAllowed: true,
      adminAllowed: true,
      desc: 'Dapat diakses oleh publik dan semua user terdaftar',
    },
    {
      name: 'Melihat Profil Saya (/profile)',
      userAllowed: true,
      adminAllowed: true,
      desc: 'Halaman profil ini dapat diakses oleh semua pengguna terotentikasi',
    },
    {
      name: 'Membuat & Melihat Transaksi Saya (/transactions)',
      userAllowed: true,
      adminAllowed: true,
      desc: 'Melakukan pembelian buku dan mengecek status pesanan',
    },
    {
      name: 'Akses Dashboard Admin (/admin)',
      userAllowed: false,
      adminAllowed: true,
      desc: 'Hanya Administrator yang memiliki wewenang mengelola sistem',
    },
    {
      name: 'Kelola Kategori / Genre Buku (POST, PUT, DELETE)',
      userAllowed: false,
      adminAllowed: true,
      desc: 'Sinkron dengan middleware [auth.api, admin] Laravel backend',
    },
    {
      name: 'Hapus Transaksi Penjualan (DELETE /transaksis/{id})',
      userAllowed: false,
      adminAllowed: true,
      desc: 'Hanya Admin yang dapat membatalkan atau menghapus transaksi sistem',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <User className="h-3.5 w-3.5" />
            <span>Protected Route — Terbuka untuk Semua Pengguna Terotentikasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Profil Pengguna</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Halaman ini dapat diakses oleh role <strong className="text-emerald-400">user</strong> maupun{' '}
            <strong className="text-rose-400">admin</strong>.
          </p>
        </div>

        {/* Quick Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl self-start">
          <span className="text-[11px] font-semibold text-slate-400 px-2">Role Saat Ini:</span>
          <button
            type="button"
            onClick={() => switchRoleDemo(isAdmin ? 'user' : 'admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isAdmin
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
            title="Klik untuk mengubah role akun demo secara instan"
          >
            <RefreshCw className="h-3 w-3" />
            <span className="uppercase">{role}</span>
            <span className="text-[10px] text-slate-300 font-normal">(Ganti)</span>
          </button>
        </div>
      </div>

      {/* User Information Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col items-center text-center space-y-4">
          <div
            className={`h-24 w-24 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-xl ${
              isAdmin
                ? 'bg-gradient-to-tr from-rose-600 to-amber-600 shadow-rose-600/30'
                : 'bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-indigo-600/30'
            }`}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">{user?.name || 'User'}</h2>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isAdmin
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            Peran: {role}
          </div>

          <div className="w-full pt-4 border-t border-slate-800 space-y-2">
            {isAdmin ? (
              <Link
                to="/admin"
                className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-600/20"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Buka Dashboard Admin</span>
              </Link>
            ) : (
              <Link
                to="/transactions"
                className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Riwayat Transaksi Saya</span>
              </Link>
            )}
          </div>
        </div>

        {/* Credentials & Token Details */}
        <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Key className="h-4 w-4 text-indigo-400" />
            <span>Detail Kredensial & Autentikasi (Storage)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400">ID Pengguna</span>
              <div className="font-semibold text-slate-200">#{user?.id || '1'}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-slate-400">Hak Akses Role</span>
              <div className="font-semibold text-slate-200 uppercase">{role}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 sm:col-span-2">
              <span className="text-slate-400">Token Akses Otorisasi (api_token / Bearer)</span>
              <div className="font-mono text-[11px] text-indigo-300 break-all bg-slate-900 p-2 rounded-lg border border-slate-800">
                {token || 'Tidak ada token'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1 sm:col-span-2">
              <span className="text-slate-400">Penyimpanan Sesi Klien</span>
              <div className="text-slate-300 text-[11px]">
                Disimpan secara aman di <code>localStorage.getItem('booksales_auth')</code> dan tersinkronisasi dengan React Context API.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Shield className="h-4 w-4 text-indigo-400" />
            <span>Matriks Hak Akses Berdasarkan Role (Role-Based Access)</span>
          </div>
          <span className="text-xs text-slate-400">
            Status Akun: <strong className="text-white uppercase">{role}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-2.5 px-3">Fitur / Route</th>
                <th className="py-2.5 px-3 text-center">Akses User</th>
                <th className="py-2.5 px-3 text-center">Akses Admin</th>
                <th className="py-2.5 px-3 text-center">Status Anda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {permissions.map((p, index) => {
                const userHasPermission = isAdmin ? p.adminAllowed : p.userAllowed;

                return (
                  <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{p.name}</div>
                      <div className="text-[11px] text-slate-400">{p.desc}</div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {p.userAllowed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-4 w-4" /> Boleh
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400/70 font-semibold">
                          <XCircle className="h-4 w-4" /> Ditolak
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {p.adminAllowed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-4 w-4" /> Boleh
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400/70 font-semibold">
                          <XCircle className="h-4 w-4" /> Ditolak
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {userHasPermission ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase">
                          Diizinkan
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-[10px] uppercase">
                          Ditolak (403)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
