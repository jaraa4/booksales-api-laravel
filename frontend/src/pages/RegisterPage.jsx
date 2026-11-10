import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterCard } from '../components/auth/RegisterCard';
import { SuccessModal } from '../components/auth/SuccessModal';
import { RegisteredUsersModal } from '../components/auth/RegisteredUsersModal';
import { Users } from 'lucide-react';

export const RegisterPage = () => {
  const [successData, setSuccessData] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSuccessRegister = (userData, source) => {
    setSuccessData({
      ...userData,
      source,
    });
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      {/* Tombol Lihat Riwayat Akun Tersimpan */}
      <div className="w-full max-w-lg flex justify-end mb-3">
        <button
          onClick={() => setIsUsersModalOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
          title="Lihat riwayat akun yang telah didaftarkan di sistem"
        >
          <Users className="h-4 w-4 text-indigo-400" />
          <span>Lihat Data Akun Tersimpan</span>
        </button>
      </div>

      <RegisterCard onSuccessRegister={handleSuccessRegister} />

      {/* Modal Sukses */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccess}
        registeredData={successData}
      />

      {/* Modal Riwayat Akun Terdaftar */}
      <RegisteredUsersModal
        isOpen={isUsersModalOpen}
        onClose={() => setIsUsersModalOpen(false)}
      />
    </div>
  );
};
