"use client";

import { motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  message,
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <motion.div
      className={`
        flex flex-col items-center justify-center rounded-2xl border border-rose-200/80
        bg-rose-50/80 py-16 px-8 text-center
        ${className}
      `}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-full bg-rose-100 p-4"
      >
        <ExclamationTriangleIcon className="h-14 w-14 text-rose-600" />
      </motion.div>
      <motion.p
        className="mt-5 text-sm font-medium text-rose-800 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {message}
      </motion.p>
      {onRetry && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Button variant="primary" size="md" onClick={onRetry}>
            Retry
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
