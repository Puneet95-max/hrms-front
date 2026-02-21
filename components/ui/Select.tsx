"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full rounded-xl border px-3.5 py-2.5 text-slate-900
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-slate-100 disabled:cursor-not-allowed
            ${error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30"
              : "border-slate-300 focus:border-teal-500 focus:ring-teal-500/30"
            }
            ${className}
          `}
          {...props}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm font-medium text-rose-600">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";
