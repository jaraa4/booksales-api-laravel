import React, { useState, useEffect } from 'react';
import { getRegisteredUsers } from '../../services/authService';
import { Users, X, Clock, Mail, AtSign, Trash2 } from 'lucide-react';

export const RegisteredUsersModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    setUsers(getRegisteredUsers());
  };

  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  const handleClear = () => {
    if (confirm('Hapus seluruh riwayat registrasi di browser?')) {
      localStorage.removeItem('registered_users');
      setUsers([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold">
            <Users className="h-5 w-5" />
            <h3 className="text-base text-white">Daftar Akun Terdaftar ({users.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-4 max-h-80 overflow-y-auto space-y-3 pr-1">
          {users.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              Belum ada akun yang terdaftar. Coba isi form registrasi terlebih dahulu!
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 space-y-1.5 text-xs transition hover:border-slate-700"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{user.name}</span>
                  <span className="font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    @{user.username}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{user.email}</span>
                </div>
                {user.createdAt && (
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(user.createdAt).toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-800">
          {users.length > 0 ? (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Bersihkan Data</span>
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
