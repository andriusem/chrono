// ============================================
// ATTENDANCE STORE
// ============================================
// Clock-in/out records + previous-day reconciliation gate.

import { format, subDays } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Attendance } from '@/types';
import { mockAttendance } from '@/data/mockData';

interface ReconciliationState {
  blocked: boolean;
  date: string;
  recordId?: string;
}

interface AttendanceState {
  records: Attendance[];

  clockIn: (userId: string, time?: string) => void;
  clockOut: (userId: string, time?: string) => void;
  updateRecord: (
    recordId: string,
    updates: { clockInTime?: string; clockOutTime?: string }
  ) => void;
  deleteRecord: (recordId: string, deletedById: string) => void;
  reconcilePreviousDayClockOut: (
    userId: string,
    clockOutTime: string
  ) => { success: boolean; error?: string };

  getTodayRecord: (userId: string) => Attendance | undefined;
  getRecordForDate: (userId: string, date: string) => Attendance | undefined;
  getRecordsForUser: (userId: string, limit?: number) => Attendance[];
  hasUnreconciledPreviousDay: (userId: string) => ReconciliationState;
}

let recordIdCounter = 100;

const todayIso = () => format(new Date(), 'yyyy-MM-dd');
const yesterdayIso = () => format(subDays(new Date(), 1), 'yyyy-MM-dd');

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set, get) => ({
      records: mockAttendance,

      clockIn: (userId, time) => {
        const today = todayIso();
        const existing = get().records.find(
          (record) => record.userId === userId && record.date === today && !record.isDeleted
        );
        const clockInTime = time || format(new Date(), 'HH:mm');

        if (existing) {
          set((state) => ({
            records: state.records.map((record) =>
              record.id === existing.id ? { ...record, clockInTime } : record
            ),
          }));
          return;
        }

        const nextRecord: Attendance = {
          id: `att-${++recordIdCounter}`,
          userId,
          date: today,
          clockInTime,
          isDeleted: false,
        };

        set((state) => ({
          records: [...state.records, nextRecord],
        }));
      },

      clockOut: (userId, time) => {
        const today = todayIso();
        const clockOutTime = time || format(new Date(), 'HH:mm');
        const existing = get().records.find(
          (record) => record.userId === userId && record.date === today && !record.isDeleted
        );

        if (!existing) {
          const nextRecord: Attendance = {
            id: `att-${++recordIdCounter}`,
            userId,
            date: today,
            clockOutTime,
            isDeleted: false,
          };
          set((state) => ({
            records: [...state.records, nextRecord],
          }));
          return;
        }

        set((state) => ({
          records: state.records.map((record) =>
            record.id === existing.id ? { ...record, clockOutTime } : record
          ),
        }));
      },

      updateRecord: (recordId, updates) => {
        set((state) => ({
          records: state.records.map((record) =>
            record.id === recordId ? { ...record, ...updates } : record
          ),
        }));
      },

      deleteRecord: (recordId, deletedById) => {
        set((state) => ({
          records: state.records.map((record) =>
            record.id === recordId
              ? {
                  ...record,
                  isDeleted: true,
                  deletedAt: new Date().toISOString(),
                  deletedById,
                }
              : record
          ),
        }));
      },

      reconcilePreviousDayClockOut: (userId, clockOutTime) => {
        const previousDate = yesterdayIso();
        const previousRecord = get().records.find(
          (record) => record.userId === userId && record.date === previousDate && !record.isDeleted
        );

        if (!previousRecord || !previousRecord.clockInTime) {
          return { success: false, error: 'No unresolved previous-day clock-in found.' };
        }

        set((state) => ({
          records: state.records.map((record) =>
            record.id === previousRecord.id ? { ...record, clockOutTime } : record
          ),
        }));
        return { success: true };
      },

      getTodayRecord: (userId) =>
        get().records.find(
          (record) => record.userId === userId && record.date === todayIso() && !record.isDeleted
        ),

      getRecordForDate: (userId, date) =>
        get().records.find(
          (record) => record.userId === userId && record.date === date && !record.isDeleted
        ),

      getRecordsForUser: (userId, limit) => {
        let records = get()
          .records.filter((record) => record.userId === userId && !record.isDeleted)
          .sort((a, b) => b.date.localeCompare(a.date));
        if (limit) records = records.slice(0, limit);
        return records;
      },

      hasUnreconciledPreviousDay: (userId) => {
        const previousDate = yesterdayIso();
        const previousRecord = get().records.find(
          (record) => record.userId === userId && record.date === previousDate && !record.isDeleted
        );

        if (!previousRecord || !previousRecord.clockInTime) {
          return { blocked: false, date: previousDate };
        }
        if (!previousRecord.clockOutTime) {
          return {
            blocked: true,
            date: previousDate,
            recordId: previousRecord.id,
          };
        }
        return { blocked: false, date: previousDate, recordId: previousRecord.id };
      },
    }),
    {
      name: 'chrono-attendance',
      version: 2,
      migrate: () => ({
        records: mockAttendance,
      }),
    }
  )
);
