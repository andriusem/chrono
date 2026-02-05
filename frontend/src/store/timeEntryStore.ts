// ============================================
// TIME ENTRY STORE
// ============================================
// Manages time entries and enforces the SINGLE TIMER RULE

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimeEntry, TimerStatus } from '@/types';
import { mockTimeEntries } from '@/data/mockData';
import { differenceInMinutes, parseISO, format } from 'date-fns';

const MIN_ENTRY_MINUTES = 15;

interface TimeEntryState {
  // Data
  entries: TimeEntry[];

  // Actions
  startTimer: (
    userId: string,
    activityId: string,
    projectId: string
  ) => { success: boolean; error?: string; entryId?: string };

  pauseTimer: (entryId: string) => void;
  resumeTimer: (entryId: string) => { success: boolean; error?: string };

  finishTimer: (entryId: string, comments?: string) => void;

  updateEntry: (
    entryId: string,
    updates: { startTime?: string; endTime?: string; comments?: string }
  ) => void;

  deleteEntry: (entryId: string, deletedById: string) => void;

  // Heartbeat for running timers
  updateHeartbeat: (entryId: string) => void;

  // Queries
  getRunningTimer: (userId: string) => TimeEntry | undefined;
  getEntriesForUser: (userId: string, date?: string) => TimeEntry[];
  getEntriesForProject: (projectId: string) => TimeEntry[];
  getTodayMinutesForActivity: (userId: string, activityId: string) => number;
  getTotalMinutesForActivity: (activityId: string) => number;
  getTotalMinutesForProject: (projectId: string) => number;
}

// Generate unique IDs
let entryIdCounter = 100;

export const useTimeEntryStore = create<TimeEntryState>()(
  persist(
    (set, get) => ({
      // Initialize with mock data
      entries: mockTimeEntries,

      // ============================================
      // START TIMER
      // ============================================
      // IMPORTANT: Enforces single-timer rule
      startTimer: (userId, activityId, projectId) => {
        // Check for existing running timer
        const runningTimer = get().entries.find(
          (e) => e.userId === userId && e.status === 'running'
        );

        if (runningTimer) {
          return {
            success: false,
            error: 'You already have a timer running. Please stop it first.',
          };
        }

        // Check for paused timer
        const pausedTimer = get().entries.find(
          (e) => e.userId === userId && e.status === 'paused'
        );

        if (pausedTimer) {
          return {
            success: false,
            error: 'You have a paused timer. Please finish or resume it first.',
          };
        }

        // Create new entry
        const newEntry: TimeEntry = {
          id: `entry-${++entryIdCounter}`,
          userId,
          activityId,
          projectId,
          startTime: new Date().toISOString(),
          status: 'running',
          isDeleted: false,
          lastHeartbeat: new Date().toISOString(),
        };

        set((state) => ({
          entries: [...state.entries, newEntry],
        }));

        return { success: true, entryId: newEntry.id };
      },

      // ============================================
      // PAUSE TIMER
      // ============================================
      pauseTimer: (entryId) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === entryId && e.status === 'running'
              ? { ...e, status: 'paused' as TimerStatus }
              : e
          ),
        }));
      },

      // ============================================
      // RESUME TIMER
      // ============================================
      resumeTimer: (entryId) => {
        const entry = get().entries.find((e) => e.id === entryId);
        if (!entry) {
          return { success: false, error: 'Entry not found' };
        }

        // Check for any other running timers
        const runningTimer = get().entries.find(
          (e) => e.userId === entry.userId && e.status === 'running'
        );

        if (runningTimer) {
          return {
            success: false,
            error: 'Another timer is already running.',
          };
        }

        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === entryId && e.status === 'paused'
              ? {
                  ...e,
                  status: 'running' as TimerStatus,
                  lastHeartbeat: new Date().toISOString(),
                }
              : e
          ),
        }));

        return { success: true };
      },

      // ============================================
      // FINISH TIMER
      // ============================================
      finishTimer: (entryId, comments) => {
        const now = new Date();

        set((state) => ({
          entries: state.entries.map((e) => {
            if (
              e.id === entryId &&
              (e.status === 'running' || e.status === 'paused')
            ) {
              const startTime = parseISO(e.startTime);
              const durationMinutes = differenceInMinutes(now, startTime);

              return {
                ...e,
                endTime: now.toISOString(),
                durationMinutes: Math.max(MIN_ENTRY_MINUTES, durationMinutes), // Minimum 15 minutes
                status: 'completed' as TimerStatus,
                comments: comments || e.comments,
              };
            }
            return e;
          }),
        }));
      },

      // ============================================
      // UPDATE ENTRY
      // ============================================
      updateEntry: (entryId, updates) => {
        set((state) => ({
          entries: state.entries.map((e) => {
            if (e.id === entryId) {
              const updated = { ...e, ...updates };

              // Recalculate duration if times changed
              if (updates.startTime || updates.endTime) {
                if (updated.endTime) {
                  const startTime = parseISO(updated.startTime);
                  const endTime = parseISO(updated.endTime);
                  updated.durationMinutes = Math.max(
                    MIN_ENTRY_MINUTES,
                    differenceInMinutes(endTime, startTime)
                  );
                }
              }

              return updated;
            }
            return e;
          }),
        }));
      },

      // ============================================
      // DELETE ENTRY (soft delete)
      // ============================================
      deleteEntry: (entryId, deletedById) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === entryId
              ? {
                  ...e,
                  isDeleted: true,
                  deletedAt: new Date().toISOString(),
                  deletedById,
                }
              : e
          ),
        }));
      },

      // ============================================
      // UPDATE HEARTBEAT
      // ============================================
      updateHeartbeat: (entryId) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === entryId
              ? { ...e, lastHeartbeat: new Date().toISOString() }
              : e
          ),
        }));
      },

      // ============================================
      // QUERIES
      // ============================================

      getRunningTimer: (userId) => {
        return get().entries.find(
          (e) => e.userId === userId && e.status === 'running' && !e.isDeleted
        );
      },

      getEntriesForUser: (userId, date) => {
        let entries = get().entries.filter(
          (e) => e.userId === userId && !e.isDeleted
        );

        if (date) {
          entries = entries.filter(
            (e) => format(parseISO(e.startTime), 'yyyy-MM-dd') === date
          );
        }

        // Sort by start time descending (most recent first)
        return entries.sort(
          (a, b) =>
            parseISO(b.startTime).getTime() - parseISO(a.startTime).getTime()
        );
      },

      getEntriesForProject: (projectId) => {
        return get()
          .entries.filter((e) => e.projectId === projectId && !e.isDeleted)
          .sort(
            (a, b) =>
              parseISO(b.startTime).getTime() - parseISO(a.startTime).getTime()
          );
      },

      getTodayMinutesForActivity: (userId, activityId) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const entries = get().entries.filter(
          (e) =>
            e.userId === userId &&
            e.activityId === activityId &&
            !e.isDeleted &&
            format(parseISO(e.startTime), 'yyyy-MM-dd') === today
        );

        return entries.reduce((total, entry) => {
          if (entry.durationMinutes) {
            return total + entry.durationMinutes;
          }
          // For running timer, calculate current duration
          if (entry.status === 'running') {
            return total + differenceInMinutes(new Date(), parseISO(entry.startTime));
          }
          return total;
        }, 0);
      },

      getTotalMinutesForActivity: (activityId) => {
        const entries = get().entries.filter(
          (e) => e.activityId === activityId && !e.isDeleted
        );

        return entries.reduce((total, entry) => {
          if (entry.durationMinutes) {
            return total + entry.durationMinutes;
          }
          if (entry.status === 'running') {
            return total + differenceInMinutes(new Date(), parseISO(entry.startTime));
          }
          return total;
        }, 0);
      },

      getTotalMinutesForProject: (projectId) => {
        const entries = get().entries.filter(
          (e) => e.projectId === projectId && !e.isDeleted
        );

        return entries.reduce((total, entry) => {
          if (entry.durationMinutes) {
            return total + entry.durationMinutes;
          }
          if (entry.status === 'running') {
            return total + differenceInMinutes(new Date(), parseISO(entry.startTime));
          }
          return total;
        }, 0);
      },
    }),
    {
      name: 'chrono-time-entries', // localStorage key
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as TimeEntryState;
        return {
          ...state,
          entries: [],
        };
      },
    }
  )
);
