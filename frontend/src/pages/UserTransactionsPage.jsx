import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  BookOpen,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const UserTransactionsPage = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([
    {
      id: 'TRX-901',
      bookTitle: 'Belajar Laravel & React JS Modern',
      author: 'John Doe',
      price: 145000,
      quantity: 1,
      date: '2026-11-09 14:20',
      status: 'Berhasil',
      paymentMethod: 'Transfer Bank',
    },
    {
      id: 'TRX-854',
      bookTitle: 'Desain Sistem & Clean Architecture',
      author: 'Robert C.',
      price: 185000,
      quantity: 1,
      date: '2026-10-25 09:12',
      status: 'Berhasil',
      paymentMethod: 'E-Wallet',
    },
  ]);

  const [isOrdering, setIsOrdering] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const handleSimulateNewOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      const newOrder = {
        id: `TRX-${Math.floor(100 + Math.random() * 900)}`,
        bookTitle: 'Pengembangan Web Frontend dengan React 19',
        author: 'Tim BookSales',
        price: 120000,
        quantity: 1,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Berhasil',
        paymentMethod: 'QRIS',
      };
      setOrders([newOrder, ...orders]);
      setIsOrdering(false);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Protected Route — Transaksi Pelanggan (/transactions)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Riwayat Transaksi Saya</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Daftar pembelian buku oleh akun: <strong className="text-white">{user?.name}</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={handleSimulateNewOrder}
          disabled={isOrdering}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          <span>{isOrdering ? 'Memproses Pesanan...' : 'Simulasi Pembelian Buku Baru'}</span>
        </button>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Transaksi pembelian buku baru berhasil dicatat ke sistem!</span>
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-3">
        {orders.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-indigo-400 font-bold">{item.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{item.bookTitle}</h3>
                <div className="text-[11px] text-slate-400 flex items-center gap-3">
                  <span>Penulis: {item.author}</span>
                  <span>•</span>
                  <span>Metode: {item.paymentMethod}</span>
                  <span>•</span>
                  <span>Tanggal: {item.date}</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0 shrink-0">
              <div className="text-xs text-slate-400">Total Harga</div>
              <div className="text-base font-black text-emerald-400">
                Rp {item.price.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
