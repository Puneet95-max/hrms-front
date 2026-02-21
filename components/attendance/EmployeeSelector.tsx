"use client";

import { Select } from "@/components/ui/Select";
import type { Employee } from "@/types";

interface EmployeeSelectorProps {
  employees: Employee[];
  value: string;
  onChange: (employeeId: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

export function EmployeeSelector({
  employees,
  value,
  onChange,
  label = "Employee",
  placeholder = "Select employee",
  error,
}: EmployeeSelectorProps) {
  const options = employees.map((e) => ({
    value: e.employee_id,
    label: `${e.full_name} (${e.employee_id})`,
  }));
  return (
    <Select
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      error={error}
    />
  );
}
