// ============================================
// TIME ENTRY STORE
// ============================================
// Task-based time tracking with single active timer per user.

import { differenceInMinutes, format, parseISO } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TimeEntry, TimeEntryStopReason, TimerStatus } from '@/types';
import { mockTimeEntries } from '@/data/mockData';

const MIN_ENTRY_MINUTES = 15;

interface StartTaskTimerInput {
  userId: string;
  taskId: string;
  projectId: string;
  projectDomainId: string;
  projectActivityId: string;
  activityId: string;
}

interface StopTaskTimerInput {
  entryId: string;
  reason: TimeEntryStopReason;
  comments?: string;
}

interface TimeEntryState {
  entries: TimeEntry[];

  startTaskTimer: (
    input: StartTaskTimerInput
  ) => { success: boolean; error?: string; entryId?: string };
  stopTaskTimer: (input: StopTaskTimerInput) => { success: boolean; error?: string };
  acknowledgeHeartbeat: (entryId: string) => void;

  // Legacy compatibility API
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
  updateHeartbeat: (entryId: string) => void;

  getRunningTimer: (userId: string) => TimeEntry | undefined;
  getEntriesForUser: (userId: string, date?: string) => TimeEntry[];
  getEntriesForProject: (projectId: string) => TimeEntry[];
  getEntriesForTask: (taskId: string) => TimeEntry[];
  getTodayMinutesForActivity: (userId: string, activityId: string) => number;
  getTotalMinutesForActivity: (activityId: string) => number;
  getTotalMinutesForProject: (projectId: string) => number;
  getTotalMinutesForTask: (taskId: string) => number;
}

let entryIdCounter = 100;

const sumDurationMinutes = (entries: TimeEntry[]) =>
  entries.reduce((total, entry) => {
    if (entry.durationMinutes) return total + entry.durationMinutes;
    if (entry.status === 'running') {
      return total + differenceInMinutes(new Date(), parseISO(entry.startTime));
    }
    return total;
  }, 0);

export const useTimeEntryStore = create<TimeEntryState>()(
  persist(
    (set, get) => ({
      entries: mockTimeEntries,

      startTaskTimer: ({
        userId,
        taskId,
        projectId,
        projectDomainId,
        projectActivityId,
        activityId,
      }) => {
        const runningTimer = get().entries.find(
          (entry) => entry.userId === userId && entry.status === 'running' && !entry.isDeleted
        );

        if (runningTimer) {
          return {
            success: false,
            error: 'You already have a timer running. Stop it before starting another task.',
          };
        }

        const nextEntry: TimeEntry = {
          id: `entry-${++entryIdCounter}`,
          taskId,
          userId,
          activityId,
          projectId,
          projectDomainId,
          projectActivityId,
          startTime: new Date().toISOString(),
          status: 'running',
          isDeleted: false,
          lastHeartbeat: new Date().toISOString(),
        };

        set((state) => ({
          entries: [...state.entries, nextEntry],
        }));

        return { success: true, entryId: nextEntry.id };
      },

      stopTaskTimer: ({ entryId, reason, comments }) => {
        const entry = get().entries.find((currentEntry) => currentEntry.id === entryId);
        if (!entry) {
          return { success: false, error: 'Time entry not found.' };
        }
        if (entry.status !== 'running') {
          return { success: false, error: 'Timer is not running.' };
        }

        const now = new Date();
        const durationMinutes = Math.max(
          MIN_ENTRY_MINUTES,
          differenceInMinutes(now, parseISO(entry.startTime))
        );

        set((state) => ({
          entries: state.entries.map((currentEntry) =>
            currentEntry.id === entryId
              ? {
                  ...currentEntry,
                  endTime: now.toISOString(),
                  durationMinutes,
                  status: 'completed' as TimerStatus,
                  stopReason: reason,
                  comments: comments || currentEntry.comments,
                }
              : currentEntry
          ),
        }));

        return { success: true };
      },

      acknowledgeHeartbeat: (entryId) => {
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  lastHeartbeatPromptAt: new Date().toISOString(),
                  lastHeartbeat: new Date().toISOString(),
                }
              : entry
          ),
        }));
      },

      // Legacy wrappers
      startTimer: (userId, activityId, projectId) =>
        get().startTaskTimer({
          userId,
          taskId: `legacy-${activityId}`,
          projectId,
          projectDomainId: '',
          projectActivityId: activityId,
          activityId,
        }),

      pauseTimer: (entryId) => {
        get().stopTaskTimer({ entryId, reason: 'manual_stop' });
      },

      resumeTimer: (entryId) => {
        const existing = get().entries.find((entry) => entry.id === entryId);
        if (!existing) {
          return { success: false, error: 'Entry not found' };
        }
        return get().startTaskTimer({
          userId: existing.userId,
          taskId: existing.taskId,
          projectId: existing.projectId,
          projectDomainId: existing.projectDomainId || '',
          projectActivityId: existing.projectActivityId || existing.activityId,
          activityId: existing.activityId,
        });
      },

      finishTimer: (entryId, comments) => {
        get().stopTaskTimer({
          entryId,
          reason: 'manual_finish',
          comments,
        });
      },

      updateEntry: (entryId, updates) => {
        set((state) => ({
          entries: state.entries.map((entry) => {
            if (entry.id !== entryId) return entry;
            const nextEntry = { ...entry, ...updates };
            if (nextEntry.endTime) {
              nextEntry.durationMinutes = Math.max(
                MIN_ENTRY_MINUTES,
                differenceInMinutes(parseISO(nextEntry.endTime), parseISO(nextEntry.startTime))
              );
            }
            return nextEntry;
          }),
        }));
      },

      deleteEntry: (entryId, deletedById) => {
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === entryId
              ? {
                  ...entry,
                  isDeleted: true,
                  deletedAt: new Date().toISOString(),
                  deletedById,
                }
              : entry
          ),
        }));
      },

      updateHeartbeat: (entryId) => {
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === entryId
              ? { ...entry, lastHeartbeat: new Date().toISOString() }
              : entry
          ),
        }));
      },

      getRunningTimer: (userId) =>
        get().entries.find(
          (entry) => entry.userId === userId && entry.status === 'running' && !entry.isDeleted
        ),

      getEntriesForUser: (userId, date) => {
        let result = get().entries.filter((entry) => entry.userId === userId && !entry.isDeleted);
        if (date) {
          result = result.filter(
            (entry) => format(parseISO(entry.startTime), 'yyyy-MM-dd') === date
          );
        }
        return result.sort(
          (a, b) => parseISO(b.startTime).getTime() - parseISO(a.startTime).getTime()
        );
      },

      getEntriesForProject: (projectId) =>
        get()
          .entries.filter((entry) => entry.projectId === projectId && !entry.isDeleted)
          .sort((a, b) => parseISO(b.startTime).getTime() - parseISO(a.startTime).getTime()),

      getEntriesForTask: (taskId) =>
        get()
          .entries.filter((entry) => entry.taskId === taskId && !entry.isDeleted)
          .sort((a, b) => parseISO(b.startTime).getTime() - parseISO(a.startTime).getTime()),

      getTodayMinutesForActivity: (userId, activityId) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        return sumDurationMinutes(
          get().entries.filter(
            (entry) =>
              entry.userId === userId &&
              entry.activityId === activityId &&
              !entry.isDeleted &&
              format(parseISO(entry.startTime), 'yyyy-MM-dd') === today
          )
        );
      },

      getTotalMinutesForActivity: (activityId) =>
        sumDurationMinutes(
          get().entries.filter((entry) => entry.activityId === activityId && !entry.isDeleted)
        ),

      getTotalMinutesForProject: (projectId) =>
        sumDurationMinutes(
          get().entries.filter((entry) => entry.projectId === projectId && !entry.isDeleted)
        ),

      getTotalMinutesForTask: (taskId) =>
        sumDurationMinutes(
          get().entries.filter((entry) => entry.taskId === taskId && !entry.isDeleted)
        ),
    }),
    {
      name: 'chrono-time-entries',
      version: 3,
      migrate: () => ({
        entries: [],
      }),
    }
  )
);
