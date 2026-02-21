"use client";

import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <motion.header
      className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-6 py-4 shadow-soft"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-slate-800 tracking-tight">
        {title}
      </h2>
    </motion.header>
  );
}
