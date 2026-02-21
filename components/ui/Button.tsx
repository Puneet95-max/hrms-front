"use client";

import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";

type Variant = "primary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus:ring-primary/40 shadow-soft hover:shadow-glow",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500/40 shadow-soft hover:shadow-lg",
  ghost:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400/40 border border-slate-200/80",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      whileHover={!(disabled || loading) ? { scale: 1.02 } : undefined}
      whileTap={!(disabled || loading) ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner className="h-4 w-4" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
