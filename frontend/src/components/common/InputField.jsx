import React from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  icon: Icon,
  required = true,
  isPassword = false,
  showPassword = false,
  onTogglePassword,
  helperText,
  autoComplete,
}) => {
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        {helperText && (
          <span className="text-xs text-slate-400">{helperText}</span>
        )}
      </div>

      <div className="relative rounded-xl transition-all duration-200">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-slate-900/70 py-2.5 text-sm text-slate-100 placeholder-slate-500 backdrop-blur-md outline-none transition-all duration-200 ${
            Icon ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-11' : 'pr-4'} ${
            error
              ? 'border-rose-500/70 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-200 transition-colors"
            title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 pt-0.5 text-xs text-rose-400 animate-fadeIn">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
