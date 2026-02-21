/**
 * Form validation rules and helpers.
 * Use for client-side validation; keep in sync with backend when needed.
 */

// Length limits
export const EMPLOYEE_ID_MIN = 2;
export const EMPLOYEE_ID_MAX = 20;
export const FULL_NAME_MIN = 2;
export const FULL_NAME_MAX = 100;
export const EMAIL_MAX = 254;

// Valid email (RFC 5322 simplified): local@domain.tld
// Supports Gmail, Outlook, company emails, etc.
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function validateEmployeeId(value: string): string | null {
  const t = value.trim();
  if (!t) return "Employee ID is required";
  if (t.length < EMPLOYEE_ID_MIN)
    return `At least ${EMPLOYEE_ID_MIN} characters required`;
  if (t.length > EMPLOYEE_ID_MAX)
    return `Maximum ${EMPLOYEE_ID_MAX} characters allowed`;
  if (!/^[a-zA-Z0-9_-]+$/.test(t))
    return "Only letters, numbers, hyphens and underscores allowed";
  return null;
}

export function validateFullName(value: string): string | null {
  const t = value.trim();
  if (!t) return "Full name is required";
  if (t.length < FULL_NAME_MIN)
    return `At least ${FULL_NAME_MIN} characters required`;
  if (t.length > FULL_NAME_MAX)
    return `Maximum ${FULL_NAME_MAX} characters allowed`;
  return null;
}

export function validateEmail(value: string): string | null {
  const t = value.trim().toLowerCase();
  if (!t) return "Email is required";
  if (t.length > EMAIL_MAX) return `Maximum ${EMAIL_MAX} characters allowed`;
  if (!EMAIL_REGEX.test(t)) return "Enter a valid email (e.g. name@gmail.com)";
  return null;
}

export function validateDepartment(value: string): string | null {
  if (!value?.trim()) return "Department is required";
  return null;
}
