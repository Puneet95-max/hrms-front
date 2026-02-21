import { api } from "./api";
import type { Employee, ApiSuccess } from "@/types";

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await api.get<ApiSuccess<Employee[]>>("/api/employees");
  return res.data.data;
}

export async function fetchEmployee(employeeId: string): Promise<Employee> {
  const res = await api.get<ApiSuccess<Employee>>(
    `/api/employees/${encodeURIComponent(employeeId)}`
  );
  return res.data.data;
}

export async function createEmployee(body: {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}): Promise<Employee> {
  const res = await api.post<ApiSuccess<Employee>>("/api/employees", body);
  return res.data.data;
}

export async function deleteEmployee(employeeId: string): Promise<void> {
  await api.delete(
    `/api/employees/${encodeURIComponent(employeeId)}`
  );
}
