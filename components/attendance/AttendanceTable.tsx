"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import type { AttendanceRecord } from "@/types";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  totalPresent: number;
}

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.25 },
  }),
};

export function AttendanceTable({ records, totalPresent }: AttendanceTableProps) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {records.length > 0 && (
        <motion.p
          className="text-sm font-medium text-slate-700"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Total Present: <span className="text-primary-dark font-bold">{totalPresent}</span> days
        </motion.p>
      )}
      <motion.div
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="px-6 py-3.5 text-left font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left font-semibold text-slate-700">
                  Marked At
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <motion.tr
                  key={r._id}
                  className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  <td className="whitespace-nowrap px-6 py-3.5 text-slate-900 font-medium">
                    {r.date}
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge
                      variant={r.status === "Present" ? "present" : "absent"}
                    >
                      {r.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-3.5 text-slate-600">
                    {format(new Date(r.created_at), "MMM d, yyyy HH:mm")}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
