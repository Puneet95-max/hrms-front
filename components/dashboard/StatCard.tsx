"use client";

import { motion } from "framer-motion";

type Variant = "default" | "success" | "danger";

const variants: Record<Variant, string> = {
  default:
    "border-slate-200/80 bg-white text-slate-800 shadow-soft",
  success:
    "border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-teal-50/50 text-emerald-900 shadow-soft",
  danger:
    "border-rose-200/80 bg-gradient-to-br from-rose-50 to-amber-50/30 text-rose-900 shadow-soft",
};

interface StatCardProps {
  label: string;
  value: number;
  variant?: Variant;
  index?: number;
}

export function StatCard({
  label,
  value,
  variant = "default",
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl border px-6 py-5
        ${variants[variant]}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 40px -10px rgba(13, 148, 136, 0.15)",
        transition: { duration: 0.2 },
      }}
    >
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <motion.p
        className="mt-2 text-2xl font-bold tabular-nums text-inherit"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.15 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
