// ============================================
// ATTENDANCE STORE
// ============================================
// Manages clock-in/clock-out records

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Attendance } from '@/types';
import { mockAttendance } from '@/data/mockData';
import { format } from 'date-fns';

interface AttendanceState {
  // Data
  records: Attendance[];

  // Actions
  clockIn: (userId: string, time?: string) => void;
  clockOut: (userId: string, time?: string) => void;
  updateRecord: (
    recordId: string,
    updates: { clockInTime?: string; clockOutTime?: string }
  ) => void;
  deleteRecord: (recordId: string, deletedById: string) => void;

  // Queries
  getTodayRecord: (userId: string) => Attendance | undefined;
  getRecordsForUser: (userId: string, limit?: number) => Attendance[];
}

// Generate unique IDs
let recordIdCounter = 100;

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set, get) => ({
      // Initialize with mock data
      records: mockAttendance,

      // ============================================
      // CLOCK IN
      // ============================================
      clockIn: (userId, time) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const existing = get().records.find(
          (r) => r.userId === userId && r.date === today && !r.isDeleted
        );

        const clockInTime = time || format(new Date(), 'HH:mm');

        if (existing) {
          // Update existing record
          set((state) => ({
            records: state.records.map((r) =>
              r.id === existing.id ? { ...r, clockInTime } : r
            ),
          }));
        } else {
          // Create new record
          const newRecord: Attendance = {
            id: `att-${++recordIdCounter}`,
            userId,
            date: today,
            clockInTime,
            isDeleted: false,
          };

          set((state) => ({
            records: [...state.records, newRecord],
          }));
        }
      },

      // ============================================
      // CLOCK OUT
      // ============================================
      clockOut: (userId, time) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const clockOutTime = time || format(new Date(), 'HH:mm');

        set((state) => ({
          records: state.records.map((r) =>
            r.userId === userId && r.date === today && !r.isDeleted
              ? { ...r, clockOutTime }
              : r
          ),
        }));
      },

      // ============================================
      // UPDATE RECORD
      // ============================================
      updateRecord: (recordId, updates) => {
        set((state) => ({
          records: state.records.map((r) =>
            r.id === recordId ? { ...r, ...updates } : r
          ),
        }));
      },

      // ============================================
      // DELETE RECORD (soft delete)
      // ============================================
      deleteRecord: (recordId, deletedById) => {
        set((state) => ({
          records: state.records.map((r) =>
            r.id === recordId
              ? {
                  ...r,
                  isDeleted: true,
                  deletedAt: new Date().toISOString(),
                  deletedById,
                }
              : r
          ),
        }));
      },

      // ============================================
      // QUERIES
      // ============================================

      getTodayRecord: (userId) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return get().records.find(
          (r) => r.userId === userId && r.date === today && !r.isDeleted
        );
      },

      getRecordsForUser: (userId, limit) => {
        let records = get()
          .records.filter((r) => r.userId === userId && !r.isDeleted)
          .sort((a, b) => b.date.localeCompare(a.date)); // Most recent first

        if (limit) {
          records = records.slice(0, limit);
        }

        return records;
      },
    }),
    {
      name: 'chrono-attendance', // localStorage key
    }
  )
);
