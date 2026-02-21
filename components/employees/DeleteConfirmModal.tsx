"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Employee } from "@/types";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  employee,
  onConfirm,
  loading = false,
}: DeleteConfirmModalProps) {
  if (!employee) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Employee" size="sm">
      <p className="text-slate-600">
        Are you sure you want to delete <strong>{employee.full_name}</strong>?
      </p>
      <p className="mt-2 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200/60 rounded-xl px-3 py-2">
        Their attendance records will also be deleted.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
