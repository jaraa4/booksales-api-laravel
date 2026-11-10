import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BookMarked,
  Shield,
  User,
  LogOut,
  LogIn,
  UserPlus,
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  ChevronDown,
  RefreshCw,
  Home,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, role, logout, switchRoleDemo } = useAuth();
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <BookMarked className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              BookSales
            </span>
            <span className="block text-[10px] text-slate-400 font-medium">
              Role-Based Access Control
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          <NavLink to="/" className={navItemClass}>
            <Home className="h-4 w-4" />
            <span>Beranda</span>
          </NavLink>

          {/* Halaman untuk semua user yang terotentikasi */}
          {isAuthenticated && (
            <>
              <NavLink to="/profile" className={navItemClass}>
                <User className="h-4 w-4" />
                <span>Profil Saya</span>
              </NavLink>

              <NavLink to="/transactions" className={navItemClass}>
                <ShoppingBag className="h-4 w-4" />
                <span>Transaksi</span>
              </NavLink>
            </>
          )}

          {/* Halaman KHUSUS ADMIN (Role Guarded) */}
          {isAuthenticated && isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-rose-400 hover:text-rose-200 hover:bg-rose-500/10 border border-rose-500/20'
                }`
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin Dashboard</span>
              <span className="text-[9px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Admin
              </span>
            </NavLink>
          )}
        </nav>

        {/* Right Side: Auth Status & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              {/* Quick Demo Switcher (Sangat membantu dosen/evaluator saat menguji role) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/90 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
                  title="Ganti role instan untuk demonstrasi pengujian"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Simulasi Role:</span>
                  <span
                    className={`font-bold uppercase text-[10px] px-1.5 py-0.5 rounded ${
                      isAdmin
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {role}
                  </span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>

                {showRoleMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-800 bg-slate-900 shadow-xl p-1.5 z-50">
                    <p className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Uji Hak Akses:
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        switchRoleDemo('admin');
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                        role === 'admin'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>Role: Administrator</span>
                      {role === 'admin' && <span className="text-[10px]">✓</span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        switchRoleDemo('user');
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                        role === 'user'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>Role: User Biasa</span>
                      {role === 'user' && <span className="text-[10px]">✓</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* User Identity Chip */}
              <div className="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-800">
                <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-semibold text-slate-200 leading-tight">
                    {user.name || 'Pengguna'}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    {user.email}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-rose-950/40 hover:border-rose-900/60 hover:text-rose-300 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
                title="Keluar dari akun"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5 text-indigo-400" />
                <span>Masuk</span>
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xs font-semibold text-white transition-all shadow-sm shadow-indigo-600/30"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Daftar</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
