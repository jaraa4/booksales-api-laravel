import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * ProtectedRoute Component
 * @param {Array<string>} allowedRoles - Daftar role yang memiliki izin akses (contoh: ['admin'])
 * @param {React.ReactNode} children - Child element opsional jika tidak memakai Outlet
 */
export const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const location = useLocation();

  // Tampilkan loading spinner saat status autentikasi sedang dimuat
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        <span className="text-sm font-medium">Memverifikasi hak akses...</span>
      </div>
    );
  }

  // 1. Cek apakah pengguna sudah login (Authenticated)
  if (!isAuthenticated) {
    // Arahkan ke halaman login dan simpan URL tujuan sebelumnya di state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Cek apakah role pengguna diizinkan (Role-Based Authorization)
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Pengguna terotentikasi, tapi tidak punya hak akses peran (403 Forbidden)
    return <Navigate to="/unauthorized" state={{ requiredRoles: allowedRoles, currentRole: role }} replace />;
  }

  // Izin valid, render route anak
  return children ? children : <Outlet />;
};
