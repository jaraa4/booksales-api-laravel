import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 focus:ring-indigo-500',
    secondary:
      'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 focus:ring-slate-400',
    outline:
      'bg-transparent hover:bg-slate-800/60 text-slate-300 border border-slate-700 hover:border-slate-600 focus:ring-indigo-500',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span>Memproses...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </span>
      )}
    </button>
  );
};
