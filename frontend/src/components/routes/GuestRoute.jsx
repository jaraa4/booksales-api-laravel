import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * GuestRoute Component
 * Menjaga halaman seperti /login dan /register agar tidak diakses oleh pengguna yang sudah login.
 */
export const GuestRoute = ({ children }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (isAuthenticated) {
    // Jika admin, arahkan ke /admin; jika user biasa, arahkan ke /profile
    const destination = role === 'admin' ? '/admin' : '/profile';
    return <Navigate to={destination} replace />;
  }

  return children ? children : <Outlet />;
};
