import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  BookOpen,
  Users,
  TrendingUp,
  Trash2,
  Plus,
  Tag,
  ShoppingBag,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboardPage = () => {
  const { user } = useAuth();

  // Mock data transaksi sistem (sinkron dengan struktur Transaksi di Laravel)
  const [transaksis, setTransaksis] = useState([
    {
      id: 101,
      customer: 'Budi Pembeli',
      email: 'user@booksales.com',
      bookTitle: 'Belajar Laravel & React JS Modern',
      amount: 145000,
      status: 'Selesai',
      date: '2026-11-09 14:20',
    },
    {
      id: 102,
      customer: 'Siti Aminah',
      email: 'siti@example.com',
      bookTitle: 'Mastering RESTful API & Security',
      amount: 175000,
      status: 'Selesai',
      date: '2026-11-08 10:15',
    },
    {
      id: 103,
      customer: 'Ahmad Fauzi',
      email: 'ahmad@example.com',
      bookTitle: 'Panduan Praktis Database MySQL',
      amount: 98000,
      status: 'Pending',
      date: '2026-11-07 18:30',
    },
  ]);

  // Mock data genre (sinkron dengan GenreController di Laravel)
  const [genres, setGenres] = useState([
    { id: 1, name: 'Teknologi & Pemrograman', count: 18 },
    { id: 2, name: 'Sains & Matematika', count: 9 },
    { id: 3, name: 'Bisnis & Manajemen', count: 12 },
    { id: 4, name: 'Fiksi & Sastra', count: 7 },
  ]);

  const [notification, setNotification] = useState(null);

  const handleDeleteTransaksi = (id) => {
    if (window.confirm(`Konfirmasi: Apakah Anda yakin ingin menghapus transaksi #${id}? (Hanya Admin)`)) {
      setTransaksis((prev) => prev.filter((t) => t.id !== id));
      setNotification(`Transaksi #${id} berhasil dihapus oleh Administrator.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Protected Route Confirmation */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">Dashboard Administrator</h1>
              <span className="text-[10px] bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                Khusus Admin
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Halaman ini dilindungi oleh <code className="text-rose-300 font-bold">&lt;ProtectedRoute allowedRoles={['admin']}&gt;</code>.
              Hanya akun dengan hak akses <strong>admin</strong> yang diizinkan membuka halaman ini.
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400 border-t md:border-t-0 md:border-l border-rose-500/20 pt-2 md:pt-0 md:pl-4">
          <div>Login sebagai: <strong className="text-white">{user?.name}</strong></div>
          <div className="text-emerald-400 font-semibold flex items-center gap-1 justify-end mt-0.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Otorisasi Admin Valid
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Pendapatan</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">Rp 418.000</div>
          <div className="text-[11px] text-emerald-400">↑ +14.2% dari bulan lalu</div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Transaksi Masuk</span>
            <ShoppingBag className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{transaksis.length} Transaksi</div>
          <div className="text-[11px] text-slate-400">Dikelola penuh oleh Admin</div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Genre Buku Terdaftar</span>
            <Tag className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{genres.length} Kategori</div>
          <div className="text-[11px] text-slate-400">Laravel GenreController API</div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Level Akses Keamanan</span>
            <Lock className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">Root / Admin</div>
          <div className="text-[11px] text-slate-400">RBAC Frontend Guard Aktif</div>
        </div>
      </div>

      {/* Transaksi Management Table (Admin Only Feature) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-indigo-400" />
              <span>Manajemen Seluruh Transaksi Penjualan (Admin Scope)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Admin berhak meninjau seluruh transaksi pelanggan dan menghapus data yang tidak valid.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 self-start">
            Total: {transaksis.length} data
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">Pelanggan</th>
                <th className="py-3 px-3">Judul Buku</th>
                <th className="py-3 px-3">Total Bayar</th>
                <th className="py-3 px-3">Tanggal</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-center">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {transaksis.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-indigo-300">#{trx.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{trx.customer}</div>
                    <div className="text-[10px] text-slate-400">{trx.email}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-200 font-medium">{trx.bookTitle}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-400">
                    Rp {trx.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-3 text-[11px] text-slate-400">{trx.date}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        trx.status === 'Selesai'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteTransaksi(trx.id)}
                      className="p-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all cursor-pointer"
                      title="Hapus Transaksi (Hanya Admin)"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Genre & Catalog Management Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Tag className="h-4 w-4 text-amber-400" />
              <span>Kelola Genre & Kategori Buku</span>
            </h3>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
              /api/genres
            </span>
          </div>

          <div className="space-y-2">
            {genres.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
              >
                <span className="font-semibold text-slate-200">{g.name}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-bold text-[10px]">
                  {g.count} Buku
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Summary */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-rose-400" />
            <span>Keterangan Arsitektur Otorisasi</span>
          </h3>

          <div className="space-y-2.5 text-xs text-slate-300">
            <p className="leading-relaxed">
              Struktur otorisasi ini menyelaraskan aturan hak akses frontend dengan backend Laravel:
            </p>
            <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
              <li>
                <strong className="text-slate-200">Middleware Laravel:</strong> Route dilindungi oleh <code>['auth.api', 'admin']</code> pada backend.
              </li>
              <li>
                <strong className="text-slate-200">Frontend Protected Route:</strong> Route <code>/admin</code> dibungkus dengan komponen <code>&lt;ProtectedRoute allowedRoles={['admin']}&gt;</code>.
              </li>
              <li>
                <strong className="text-slate-200">Keamanan Bertingkat:</strong> Jika user biasa mencoba masuk ke URL <code>/admin</code> secara manual di browser, router otomatis memblokir dan mengarahkan ke halaman <code>/unauthorized</code>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
