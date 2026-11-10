import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Background Glow Decorations */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/15 blur-[150px] rounded-full" />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Page Body */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 py-8 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
