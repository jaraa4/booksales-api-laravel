import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/routes/ProtectedRoute';
import { GuestRoute } from './components/routes/GuestRoute';

// Halaman-halaman Aplikasi
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserTransactionsPage } from './pages/UserTransactionsPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main Layout Wrapper */}
          <Route element={<MainLayout />}>
            {/* 1. ROUTE PUBLIK (Dapat diakses oleh siapa saja / tanpa login) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* 2. ROUTE GUEST (Hanya untuk yang belum login; jika sudah login dialihkan) */}
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <RegisterPage />
                </GuestRoute>
              }
            />

            {/* 3. ROUTE PROTECTED — SEMUA USER TEROTENTIKASI (User & Admin) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/transactions" element={<UserTransactionsPage />} />
            </Route>

            {/* 4. ROUTE PROTECTED — KHUSUS ADMINISTRATOR (Role: 'admin') */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
            </Route>

            {/* 5. ROUTE 404 NOT FOUND */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
