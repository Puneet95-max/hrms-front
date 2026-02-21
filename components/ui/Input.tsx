"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  showCount?: boolean;
  maxCount?: number;
  currentCount?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      showCount,
      maxCount,
      currentCount = 0,
      className = "",
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    return (
      <div className="w-full">
        <div className="flex items-baseline justify-between gap-2">
          {label && (
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              {label}
            </label>
          )}
          {showCount && maxCount != null && (
            <span
              className={`text-xs font-medium tabular-nums ${
                currentCount > maxCount ? "text-rose-600" : "text-slate-400"
              }`}
            >
              {currentCount}/{maxCount}
            </span>
          )}
        </div>
        <input
          ref={ref}
          className={`
            w-full rounded-xl border px-3.5 py-2.5 text-slate-900
            placeholder-slate-400 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-slate-100 disabled:cursor-not-allowed
            ${hasError
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30"
              : "border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
            }
            ${className}
          `}
          {...props}
        />
        {helper && !error && (
          <p className="mt-1 text-xs text-slate-500">{helper}</p>
        )}
        {error && (
          <p className="mt-1 text-sm font-medium text-rose-600">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
