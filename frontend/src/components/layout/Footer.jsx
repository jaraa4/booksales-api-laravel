import React from 'react';
import { Shield, CheckCircle2, Lock, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-indigo-400" />
          <span>© {new Date().getFullYear()} BookSales Portal — Praktikum Routing & Otorisasi Role</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-indigo-400" />
            Protected Route
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-rose-400" />
            Admin Role Guard
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Context API & Storage
          </span>
        </div>
      </div>
    </footer>
  );
};
