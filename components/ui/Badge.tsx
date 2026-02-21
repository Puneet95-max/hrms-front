"use client";

import { motion } from "framer-motion";

type Variant = "present" | "absent" | "neutral";

const variants: Record<Variant, string> = {
  present:
    "bg-emerald-100 text-emerald-800 border border-emerald-200/60",
  absent:
    "bg-rose-100 text-rose-800 border border-rose-200/60",
  neutral:
    "bg-slate-100 text-slate-700 border border-slate-200/60",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <motion.span
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
        ${variants[variant]} ${className}
      `}
      initial={{ scale: 0.92, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
}
