"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { Employee } from "@/types";
import { Button } from "@/components/ui/Button";

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (emp: Employee) => void;
}

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3 },
  }),
};

export function EmployeeTable({ employees, onDelete }: EmployeeTableProps) {
  return (
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
              <th className="sticky left-0 z-10 bg-slate-50/95 px-6 py-3.5 text-left font-semibold text-slate-700">
                Employee ID
              </th>
              <th className="px-6 py-3.5 text-left font-semibold text-slate-700">
                Full Name
              </th>
              <th className="px-6 py-3.5 text-left font-semibold text-slate-700">
                Email
              </th>
              <th className="px-6 py-3.5 text-left font-semibold text-slate-700">
                Department
              </th>
              <th className="px-6 py-3.5 text-left font-semibold text-slate-700">
                Joined Date
              </th>
              <th className="px-6 py-3.5 text-right font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <motion.tr
                key={emp._id}
                className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <td className="whitespace-nowrap px-6 py-3.5 font-medium text-slate-900">
                  {emp.employee_id}
                </td>
                <td className="px-6 py-3.5 text-slate-700">{emp.full_name}</td>
                <td className="px-6 py-3.5 text-slate-600">{emp.email}</td>
                <td className="px-6 py-3.5 text-slate-600">{emp.department}</td>
                <td className="px-6 py-3.5 text-slate-600">
                  {format(new Date(emp.created_at), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-3.5 text-right">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(emp)}
                    className="gap-1.5"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
