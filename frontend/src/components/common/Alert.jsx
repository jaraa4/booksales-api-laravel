import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export const Alert = ({ type = 'info', message, details, onClose }) => {
  if (!message) return null;

  const styles = {
    error: {
      bg: 'bg-rose-950/40 border-rose-800/60 text-rose-200',
      icon: <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />,
    },
    info: {
      bg: 'bg-indigo-950/40 border-indigo-800/60 text-indigo-200',
      icon: <Info className="h-5 w-5 text-indigo-400 shrink-0" />,
    },
  };

  const current = styles[type] || styles.info;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm backdrop-blur-md transition-all duration-300 ${current.bg}`}
    >
      {current.icon}
      <div className="flex-1 space-y-1">
        <p className="font-semibold leading-tight">{message}</p>
        {details && (
          <ul className="list-inside list-disc space-y-0.5 text-xs opacity-90">
            {Array.isArray(details) ? (
              details.map((d, i) => <li key={i}>{d}</li>)
            ) : (
              <li>{details}</li>
            )}
          </ul>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
