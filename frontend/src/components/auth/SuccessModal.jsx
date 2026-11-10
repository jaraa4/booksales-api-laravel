import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Sparkles, UserCheck } from 'lucide-react';
import { Button } from '../common/Button';

export const SuccessModal = ({ isOpen, onClose, registeredData }) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#ec4899', '#10b981'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen || !registeredData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-emerald-500/30 bg-slate-900/95 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Registrasi Berhasil!</span>
          </div>

          <h3 className="text-xl font-bold text-white">Selamat Datang di BookSales!</h3>
          <p className="text-xs text-slate-300">
            Akun pengguna Anda telah berhasil dibuat dan disimpan ke dalam sistem.
          </p>
        </div>

        {/* User Card Summary */}
        <div className="my-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5 text-xs text-left">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
            <span className="text-slate-400">Nama Lengkap</span>
            <span className="font-semibold text-slate-100">{registeredData.fullName || registeredData.name}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
            <span className="text-slate-400">Username</span>
            <span className="font-mono text-indigo-400 font-semibold">@{registeredData.username}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
            <span className="text-slate-400">Alamat Email</span>
            <span className="font-semibold text-slate-200">{registeredData.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Peran Akun (Role)</span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
              Customer / User
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm"
          >
            Selesai / Daftarkan Akun Lain
          </Button>
        </div>
      </div>
    </div>
  );
};
