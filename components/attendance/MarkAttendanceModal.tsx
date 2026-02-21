"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { EmployeeSelector } from "./EmployeeSelector";
import { markAttendance } from "@/lib/attendanceService";
import { fetchEmployees } from "@/lib/employeeService";
import type { Employee } from "@/types";
import toast from "react-hot-toast";
import { format } from "date-fns";

const STATUS_OPTIONS = [
  { value: "Present", label: "Present" },
  { value: "Absent", label: "Absent" },
];

interface MarkAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  preselectedEmployeeId?: string;
}

export function MarkAttendanceModal({
  isOpen,
  onClose,
  onSuccess,
  preselectedEmployeeId = "",
}: MarkAttendanceModalProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState(preselectedEmployeeId);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [status, setStatus] = useState<"Present" | "Absent">("Present");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setEmployeeId(preselectedEmployeeId);
      setDate(format(new Date(), "yyyy-MM-dd"));
      setStatus("Present");
      setErrors({});
      setApiError(null);
      fetchEmployees().then(setEmployees).catch(() => setEmployees([]));
    }
  }, [isOpen, preselectedEmployeeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const next: Record<string, string> = {};
    if (!employeeId) next.employee_id = "Select an employee";
    if (!date) next.date = "Date is required";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    try {
      await markAttendance({ employee_id: employeeId, date, status });
      toast.success("Attendance marked");
      onClose();
      onSuccess();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to mark attendance";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark Attendance" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <EmployeeSelector
          employees={employees}
          value={employeeId}
          onChange={setEmployeeId}
          error={errors.employee_id}
        />
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
        />
        <Select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Present" | "Absent")
          }
          options={STATUS_OPTIONS}
        />
        {apiError && <p className="text-sm text-red-600">{apiError}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Mark Attendance
          </Button>
        </div>
      </form>
    </Modal>
  );
}
