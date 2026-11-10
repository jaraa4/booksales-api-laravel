import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto py-16 text-center space-y-5">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
        <Compass className="h-10 w-10 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-xl font-bold text-slate-200">Halaman Tidak Ditemukan</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Alamat rute URL yang Anda cari tidak tersedia atau telah dipindahkan ke lokasi lain.
        </p>
      </div>

      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
        >
          <Home className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
};
