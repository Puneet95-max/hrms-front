"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChartBarIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  ChartBarIcon as ChartBarSolid,
  UserGroupIcon as UserGroupSolid,
  CalendarDaysIcon as CalendarDaysSolid,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", Icon: ChartBarIcon, IconActive: ChartBarSolid },
  { href: "/employees", label: "Employees", Icon: UserGroupIcon, IconActive: UserGroupSolid },
  { href: "/attendance", label: "Attendance", Icon: CalendarDaysIcon, IconActive: CalendarDaysSolid },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        className="fixed left-4 top-4 z-40 rounded-xl bg-white/95 backdrop-blur border border-slate-200/80 p-2.5 shadow-soft text-primary md:hidden"
        onClick={() => setMobileOpen((o) => !o)}
        aria-label="Toggle menu"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bars3Icon className="h-6 w-6" />
      </motion.button>
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-200/80 bg-white/98 backdrop-blur
          shadow-soft transform transition-transform duration-300 ease-out md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col pt-16 md:pt-6">
          <motion.div
            className="px-4 py-5 border-b border-slate-100"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary-dark to-primary-800 bg-clip-text text-transparent">
              HRMS Lite
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 font-medium">Human Resources</p>
          </motion.div>
          <nav className="flex-1 space-y-0.5 px-3 py-4">
            {nav.map((item, i) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                      transition-all duration-200
                      ${isActive
                        ? "bg-primary/12 text-primary-dark shadow-sm border border-primary/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
                      }
                    `}
                  >
                    {isActive ? (
                      <item.IconActive className="h-5 w-5 shrink-0" />
                    ) : (
                      <item.Icon className="h-5 w-5 shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
