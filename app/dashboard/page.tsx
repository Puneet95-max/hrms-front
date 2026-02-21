"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { fetchDashboard } from "@/lib/attendanceService";
import type { DashboardStats } from "@/types";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboard();
      setStats(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <PageWrapper title="Dashboard">
      {loading && <DashboardSkeleton />}
      {error && (
        <ErrorState message={error} onRetry={load} />
      )}
      {!loading && !error && stats && (
        <>
          {stats.total_employees === 0 &&
           stats.total_present_today === 0 &&
           stats.total_absent_today === 0 ? (
            <EmptyState
              icon="dashboard"
              title="No data yet"
              description="Add employees and mark attendance to see dashboard stats."
            />
          ) : (
            <motion.div
              className="space-y-6"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <motion.div variants={item}>
                  <StatCard
                    label="Total Employees"
                    value={stats.total_employees}
                    index={0}
                  />
                </motion.div>
                <motion.div variants={item}>
                  <StatCard
                    label="Present Today"
                    value={stats.total_present_today}
                    variant="success"
                    index={1}
                  />
                </motion.div>
                <motion.div variants={item}>
                  <StatCard
                    label="Absent Today"
                    value={stats.total_absent_today}
                    variant="danger"
                    index={2}
                  />
                </motion.div>
              </div>
              {Object.keys(stats.department_counts).length > 0 && (
                <motion.div
                  className="rounded-2xl border border-slate-200/80 bg-white shadow-soft overflow-hidden"
                  variants={item}
                >
                  <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4">
                    <h3 className="font-semibold text-slate-900">
                      Department breakdown
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/50">
                          <th className="px-6 py-3 text-left font-medium text-slate-700">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left font-medium text-slate-700">
                            Count
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(stats.department_counts).map(
                          ([dept, count], i) => (
                            <motion.tr
                              key={dept}
                              className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.05 }}
                            >
                              <td className="px-6 py-3.5 text-slate-900 font-medium">
                                {dept}
                              </td>
                              <td className="px-6 py-3.5 text-slate-600">
                                {count}
                              </td>
                            </motion.tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </>
      )}
    </PageWrapper>
  );
}
