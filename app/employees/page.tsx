"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { AddEmployeeModal } from "@/components/employees/AddEmployeeModal";
import { DeleteConfirmModal } from "@/components/employees/DeleteConfirmModal";
import { Button } from "@/components/ui/Button";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { fetchEmployees, deleteEmployee } from "@/lib/employeeService";
import type { Employee } from "@/types";
import toast from "react-hot-toast";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load employees");
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteEmployee(deleteTarget.employee_id);
      toast.success("Employee deleted");
      setDeleteTarget(null);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <PageWrapper title="Employees">
      <div className="flex flex-col gap-6">
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button onClick={() => setAddOpen(true)} className="gap-2">
            <UserPlusIcon className="h-5 w-5" />
            Add Employee
          </Button>
        </motion.div>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <TableSkeleton rows={6} cols={6} />
          </motion.div>
        )}
        {error && (
          <ErrorState message={error} onRetry={load} />
        )}
        {!loading && !error && employees.length === 0 && (
          <EmptyState
            icon="employees"
            title="No employees yet"
            description="Add your first employee to get started."
          />
        )}
        {!loading && !error && employees.length > 0 && (
          <EmployeeTable
            employees={employees}
            onDelete={(emp) => setDeleteTarget(emp)}
          />
        )}
      </div>
      <AddEmployeeModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={load}
      />
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        employee={deleteTarget}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </PageWrapper>
  );
}
