"use client";

import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
      when: "beforeChildren",
    },
  },
};

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function PageWrapper({ title, children }: PageWrapperProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:pl-64">
        <Header title={title} />
        <motion.main
          className="p-6"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
