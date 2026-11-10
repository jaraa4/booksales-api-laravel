import React from 'react';
import { calculatePasswordStrength } from '../../utils/validation';
import { Check, X } from 'lucide-react';

export const PasswordStrengthMeter = ({ password }) => {
  if (!password) return null;

  const { score, label, color, percent } = calculatePasswordStrength(password);

  const criteria = [
    { label: 'Minimal 6 karakter', met: password.length >= 6 },
    { label: 'Mengandung angka (0-9)', met: /[0-9]/.test(password) },
    { label: 'Huruf besar & huruf kecil', met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: 'Karakter khusus / simbol', met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="space-y-2 rounded-xl bg-slate-900/50 p-3 border border-slate-800/80 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-slate-400 font-medium">Kekuatan Kata Sandi:</span>
        <span className={`font-semibold ${color}`}>{label}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            score === 1
              ? 'bg-red-500'
              : score === 2
              ? 'bg-amber-500'
              : score === 3
              ? 'bg-blue-500'
              : 'bg-emerald-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {criteria.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 transition-colors ${
              item.met ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            {item.met ? (
              <Check className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 shrink-0 text-slate-600" />
            )}
            <span className="text-[11px] truncate">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
