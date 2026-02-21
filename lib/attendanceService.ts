import { api } from "./api";
import type { AttendanceRecord, DashboardStats, ApiSuccess } from "@/types";

export async function markAttendance(body: {
  employee_id: string;
  date: string;
  status: "Present" | "Absent";
}): Promise<AttendanceRecord> {
  const res = await api.post<ApiSuccess<AttendanceRecord>>(
    "/api/attendance",
    body
  );
  return res.data.data;
}

export async function fetchAttendance(
  employeeId: string,
  date?: string
): Promise<AttendanceRecord[]> {
  const params = date ? { date } : {};
  const res = await api.get<ApiSuccess<AttendanceRecord[]>>(
    `/api/attendance/${encodeURIComponent(employeeId)}`,
    { params }
  );
  return res.data.data;
}

export async function fetchDashboard(): Promise<DashboardStats> {
  const res = await api.get<ApiSuccess<DashboardStats>>("/api/dashboard");
  return res.data.data;
}
