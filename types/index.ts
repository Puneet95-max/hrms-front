export interface Employee {
  _id: string;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  created_at: string;
}

export interface AttendanceRecord {
  _id: string;
  employee_id: string;
  date: string;
  status: "Present" | "Absent";
  created_at: string;
}

export interface DashboardStats {
  total_employees: number;
  total_present_today: number;
  total_absent_today: number;
  department_counts: Record<string, number>;
}

export interface ApiSuccess<T> {
  message: string;
  data: T;
}
