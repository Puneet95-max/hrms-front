"use client";

import { motion } from "framer-motion";
import {
  UserGroupIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

interface EmptyStateProps {
  icon?: "employees" | "attendance" | "dashboard";
  title: string;
  description: string;
  className?: string;
}

const icons = {
  employees: UserGroupIcon,
  attendance: CalendarDaysIcon,
  dashboard: ChartBarIcon,
};

export function EmptyState({
  icon = "employees",
  title,
  description,
  className = "",
}: EmptyStateProps) {
  const Icon = icons[icon];
  return (
    <motion.div
      className={`
        flex flex-col items-center justify-center rounded-2xl border-2 border-dashed
        border-slate-200/80 bg-slate-50/80 py-16 px-8 text-center
        ${className}
      `}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-full bg-primary/10 p-4"
      >
        <Icon className="h-14 w-14 text-primary" />
      </motion.div>
      <motion.h3
        className="mt-5 text-base font-bold text-slate-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {title}
      </motion.h3>
      <motion.p
        className="mt-2 text-sm text-slate-500 max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
