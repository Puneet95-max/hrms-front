"use client";

import { useState, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { createEmployee } from "@/lib/employeeService";
import {
  validateEmployeeId,
  validateFullName,
  validateEmail,
  validateDepartment,
  EMPLOYEE_ID_MIN,
  EMPLOYEE_ID_MAX,
  FULL_NAME_MIN,
  FULL_NAME_MAX,
  EMAIL_MAX,
} from "@/lib/validation";
import toast from "react-hot-toast";

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "HR",
  "Finance",
  "Operations",
  "Design",
  "Sales",
];

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const initial = {
  employee_id: "",
  full_name: "",
  email: "",
  department: "",
};

export function AddEmployeeModal({
  isOpen,
  onClose,
  onSuccess,
}: AddEmployeeModalProps) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    const e1 = validateEmployeeId(form.employee_id);
    if (e1) next.employee_id = e1;
    const e2 = validateFullName(form.full_name);
    if (e2) next.full_name = e2;
    const e3 = validateEmail(form.email);
    if (e3) next.email = e3;
    const e4 = validateDepartment(form.department);
    if (e4) next.department = e4;
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      await createEmployee({
        employee_id: form.employee_id.trim(),
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        department: form.department,
      });
      toast.success("Employee added successfully");
      setForm(initial);
      setErrors({});
      onClose();
      onSuccess();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to add employee";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initial);
    setErrors({});
    setApiError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Employee" size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Employee ID"
          value={form.employee_id}
          onChange={(e) =>
            setForm((p) => ({ ...p, employee_id: e.target.value }))
          }
          error={errors.employee_id}
          placeholder="e.g. EMP001"
          maxLength={EMPLOYEE_ID_MAX}
          showCount
          maxCount={EMPLOYEE_ID_MAX}
          currentCount={form.employee_id.length}
          helper={`${EMPLOYEE_ID_MIN}–${EMPLOYEE_ID_MAX} characters, letters, numbers, - or _`}
        />
        <Input
          label="Full Name"
          value={form.full_name}
          onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
          error={errors.full_name}
          placeholder="John Doe"
          maxLength={FULL_NAME_MAX}
          showCount
          maxCount={FULL_NAME_MAX}
          currentCount={form.full_name.length}
          helper={`${FULL_NAME_MIN}–${FULL_NAME_MAX} characters`}
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          error={errors.email}
          placeholder="name@gmail.com"
          maxLength={EMAIL_MAX}
          showCount
          maxCount={EMAIL_MAX}
          currentCount={form.email.length}
          helper="Valid email (e.g. name@gmail.com or name@company.com)"
        />
        <Select
          label="Department"
          value={form.department}
          onChange={(e) =>
            setForm((p) => ({ ...p, department: e.target.value }))
          }
          options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
          error={errors.department}
        />
        {apiError && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3">
            <p className="text-sm font-medium text-rose-700">{apiError}</p>
          </div>
        )}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Add Employee
          </Button>
        </div>
      </form>
    </Modal>
  );
}
