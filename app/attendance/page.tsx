"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { MarkAttendanceModal } from "@/components/attendance/MarkAttendanceModal";
import { EmployeeSelector } from "@/components/attendance/EmployeeSelector";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { fetchEmployees } from "@/lib/employeeService";
import { fetchAttendance } from "@/lib/attendanceService";
import type { Employee } from "@/types";
import type { AttendanceRecord } from "@/types";

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [markModalOpen, setMarkModalOpen] = useState(false);

  const loadEmployees = useCallback(async () => {
    setLoadingEmployees(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
      setSelectedEmployeeId((prev) =>
        prev && data.some((e) => e.employee_id === prev) ? prev : data[0]?.employee_id ?? ""
      );
    } finally {
      setLoadingEmployees(false);
    }
  }, []);

  const loadRecords = useCallback(async () => {
    if (!selectedEmployeeId) {
      setRecords([]);
      return;
    }
    setLoadingRecords(true);
    try {
      const data = await fetchAttendance(
        selectedEmployeeId,
        dateFilter || undefined
      );
      setRecords(data);
    } finally {
      setLoadingRecords(false);
    }
  }, [selectedEmployeeId, dateFilter]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const totalPresent = records.filter((r) => r.status === "Present").length;

  return (
    <PageWrapper title="Attendance">
      <div className="space-y-6">
        <motion.div
          className="flex flex-wrap items-end gap-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="min-w-[200px] flex-1">
            <EmployeeSelector
              employees={employees}
              value={selectedEmployeeId}
              onChange={setSelectedEmployeeId}
              label="Employee"
            />
          </div>
          <div className="w-40">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 transition-shadow"
            />
          </div>
          <Button onClick={() => setMarkModalOpen(true)} className="gap-2">
            <CalendarDaysIcon className="h-5 w-5" />
            Mark Attendance
          </Button>
        </motion.div>
        {loadingEmployees && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <TableSkeleton rows={4} cols={3} />
          </motion.div>
        )}
        {!loadingEmployees && employees.length === 0 && (
          <EmptyState
            icon="employees"
            title="No employees"
            description="Add employees first to mark attendance."
          />
        )}
        {!loadingEmployees && employees.length > 0 && !selectedEmployeeId && (
          <EmptyState
            icon="attendance"
            title="Select an employee"
            description="Choose an employee to view their attendance."
          />
        )}
        {!loadingEmployees && employees.length > 0 && selectedEmployeeId && (
          <>
            {loadingRecords && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <TableSkeleton rows={5} cols={3} />
              </motion.div>
            )}
            {!loadingRecords && records.length === 0 && (
              <EmptyState
                icon="attendance"
                title="No attendance records"
                description="Mark attendance for this employee to see records here."
              />
            )}
            {!loadingRecords && records.length > 0 && (
              <AttendanceTable records={records} totalPresent={totalPresent} />
            )}
          </>
        )}
      </div>
      <MarkAttendanceModal
        isOpen={markModalOpen}
        onClose={() => setMarkModalOpen(false)}
        onSuccess={loadRecords}
        preselectedEmployeeId={selectedEmployeeId}
      />
    </PageWrapper>
  );
}
