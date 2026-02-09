// ============================================
// TASK STORE
// ============================================
// Task CRUD + workflow transitions + recurrence + event logging.

import { addDays, addMonths, addWeeks, compareAsc, compareDesc, parseISO } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  RecurrenceRule,
  Task,
  TaskEvent,
  TaskEventType,
  TaskStatus,
} from '@/types';
import { mockTasks, mockTaskEvents, mockUsers } from '@/data/mockData';

const EVENT_TYPES: TaskEventType[] = [
  'task_created',
  'task_claimed',
  'task_reassigned',
  'task_started',
  'task_stopped',
  'task_finished',
  'heartbeat_timeout',
  'attendance_reconciled',
];

const ensureEventType = (eventType: string): TaskEventType => {
  if (EVENT_TYPES.includes(eventType as TaskEventType)) {
    return eventType as TaskEventType;
  }
  return 'task_stopped';
};

const scoreTask = (urgency: number, importance: number) => urgency * importance;

const sortTasks = (tasks: Task[]): Task[] =>
  [...tasks].sort((a, b) => {
    if (a.priorityScore !== b.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    const dueCompare = compareAsc(parseISO(a.dueDate), parseISO(b.dueDate));
    if (dueCompare !== 0) {
      return dueCompare;
    }
    return compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt));
  });

const nextDateFromRule = (baseDueDate: string, rule: RecurrenceRule): string => {
  const base = parseISO(baseDueDate);
  const interval = Math.max(rule.interval, 1);
  switch (rule.frequency) {
    case 'daily':
      return addDays(base, interval).toISOString().slice(0, 10);
    case 'weekly':
      return addWeeks(base, interval).toISOString().slice(0, 10);
    case 'monthly':
      return addMonths(base, interval).toISOString().slice(0, 10);
    default:
      return addWeeks(base, 1).toISOString().slice(0, 10);
  }
};

interface CreateTaskInput {
  projectId: string;
  projectDomainId: string;
  projectActivityId: string;
  title: string;
  description?: string;
  assigneeUserId?: string;
  createdByUserId: string;
  urgency: number;
  importance: number;
  dueDate: string;
  isRecurring: boolean;
  recurrenceRule?: RecurrenceRule;
}

interface TaskState {
  tasks: Task[];
  events: TaskEvent[];
  featureFlags: {
    enableOrgWideClaim: boolean;
    enableHeartbeatModal: boolean;
    enableILYADashboard: boolean;
  };

  createTask: (input: CreateTaskInput) => { success: boolean; taskId?: string; error?: string };
  updateTask: (taskId: string, updates: Partial<Task>, actorUserId: string) => void;
  claimTask: (taskId: string, userId: string) => { success: boolean; error?: string };
  reassignTask: (
    taskId: string,
    assigneeUserId: string | undefined,
    actorUserId: string
  ) => { success: boolean; error?: string };
  startTask: (taskId: string, actorUserId: string) => { success: boolean; error?: string };
  stopTask: (
    taskId: string,
    actorUserId: string,
    reason?: 'manual_stop' | 'heartbeat_timeout' | 'heartbeat_declined'
  ) => { success: boolean; error?: string };
  finishTask: (taskId: string, actorUserId: string) => { success: boolean; error?: string };
  setPriority: (
    taskId: string,
    urgency: number,
    importance: number,
    actorUserId: string
  ) => { success: boolean; error?: string };
  logEvent: (
    taskId: string,
    eventType: TaskEventType,
    actorUserId: string,
    metadata?: Record<string, string | number | boolean | null>
  ) => void;
  reconcileState: () => void;

  getTaskById: (taskId: string) => Task | undefined;
  getTasksByProject: (projectId: string) => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksForUser: (userId: string) => Task[];
  getUnassignedTasks: () => Task[];
}

let taskIdCounter = 1000;
let eventIdCounter = 1000;

const validatePriority = (value: number) => Number.isInteger(value) && value >= 1 && value <= 5;

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,
      events: mockTaskEvents,
      featureFlags: {
        enableOrgWideClaim: true,
        enableHeartbeatModal: true,
        enableILYADashboard: true,
      },

      createTask: (input) => {
        if (!input.title.trim()) {
          return { success: false, error: 'Task title is required.' };
        }
        if (!input.dueDate) {
          return { success: false, error: 'Due date is required.' };
        }
        if (!validatePriority(input.urgency) || !validatePriority(input.importance)) {
          return { success: false, error: 'Urgency and importance must be integers from 1 to 5.' };
        }

        const timestamp = new Date().toISOString();
        const nextTask: Task = {
          id: `task-${++taskIdCounter}`,
          projectId: input.projectId,
          projectDomainId: input.projectDomainId,
          projectActivityId: input.projectActivityId,
          title: input.title.trim(),
          description: input.description?.trim() || undefined,
          status: 'todo',
          assigneeUserId: input.assigneeUserId,
          createdByUserId: input.createdByUserId,
          urgency: input.urgency,
          importance: input.importance,
          priorityScore: scoreTask(input.urgency, input.importance),
          dueDate: input.dueDate,
          isRecurring: input.isRecurring,
          recurrenceRule: input.isRecurring ? input.recurrenceRule : undefined,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        set((state) => ({
          tasks: sortTasks([...state.tasks, nextTask]),
        }));

        get().logEvent(nextTask.id, 'task_created', input.createdByUserId, {
          source: 'ui',
          isRecurring: nextTask.isRecurring,
        });

        return { success: true, taskId: nextTask.id };
      },

      updateTask: (taskId, updates, actorUserId) => {
        void actorUserId;
        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((task) => {
              if (task.id !== taskId) return task;
              const urgency = updates.urgency ?? task.urgency;
              const importance = updates.importance ?? task.importance;
              return {
                ...task,
                ...updates,
                urgency,
                importance,
                priorityScore: scoreTask(urgency, importance),
                updatedAt: new Date().toISOString(),
              };
            })
          ),
        }));
      },

      claimTask: (taskId, userId) => {
        const task = get().tasks.find((currentTask) => currentTask.id === taskId);
        if (!task) {
          return { success: false, error: 'Task not found.' };
        }
        if (!get().featureFlags.enableOrgWideClaim) {
          return { success: false, error: 'Claim is disabled by feature flag.' };
        }
        if (task.assigneeUserId && task.assigneeUserId !== userId) {
          return { success: false, error: 'Task is already assigned.' };
        }

        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((currentTask) =>
              currentTask.id === taskId
                ? {
                    ...currentTask,
                    assigneeUserId: userId,
                    updatedAt: new Date().toISOString(),
                  }
                : currentTask
            )
          ),
        }));

        get().logEvent(taskId, 'task_claimed', userId, {
          previousAssigneeUserId: task.assigneeUserId || null,
        });
        return { success: true };
      },

      reassignTask: (taskId, assigneeUserId, actorUserId) => {
        const task = get().tasks.find((currentTask) => currentTask.id === taskId);
        if (!task) {
          return { success: false, error: 'Task not found.' };
        }
        if (assigneeUserId && !mockUsers.some((user) => user.id === assigneeUserId && user.isActive)) {
          return { success: false, error: 'Assignee not available.' };
        }

        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((currentTask) =>
              currentTask.id === taskId
                ? {
                    ...currentTask,
                    assigneeUserId,
                    updatedAt: new Date().toISOString(),
                  }
                : currentTask
            )
          ),
        }));

        get().logEvent(taskId, 'task_reassigned', actorUserId, {
          assigneeUserId: assigneeUserId || null,
        });

        return { success: true };
      },

      startTask: (taskId, actorUserId) => {
        const task = get().tasks.find((currentTask) => currentTask.id === taskId);
        if (!task) {
          return { success: false, error: 'Task not found.' };
        }
        if (task.status === 'done') {
          return { success: false, error: 'Completed tasks cannot be restarted.' };
        }

        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((currentTask) =>
              currentTask.id === taskId
                ? {
                    ...currentTask,
                    status: 'in_progress',
                    assigneeUserId: currentTask.assigneeUserId || actorUserId,
                    updatedAt: new Date().toISOString(),
                  }
                : currentTask
            )
          ),
        }));

        get().logEvent(taskId, 'task_started', actorUserId);
        return { success: true };
      },

      stopTask: (taskId, actorUserId, reason = 'manual_stop') => {
        const task = get().tasks.find((currentTask) => currentTask.id === taskId);
        if (!task) {
          return { success: false, error: 'Task not found.' };
        }
        if (task.status === 'done') {
          return { success: false, error: 'Completed tasks cannot be stopped.' };
        }

        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((currentTask) =>
              currentTask.id === taskId
                ? {
                    ...currentTask,
                    status: 'in_progress',
                    updatedAt: new Date().toISOString(),
                  }
                : currentTask
            )
          ),
        }));

        const eventType = reason === 'heartbeat_timeout' ? 'heartbeat_timeout' : 'task_stopped';
        get().logEvent(taskId, eventType, actorUserId, { reason });
        return { success: true };
      },

      finishTask: (taskId, actorUserId) => {
        const task = get().tasks.find((currentTask) => currentTask.id === taskId);
        if (!task) {
          return { success: false, error: 'Task not found.' };
        }
        if (task.status === 'done') {
          return { success: false, error: 'Task is already completed.' };
        }

        const timestamp = new Date().toISOString();
        let recurringTask: Task | undefined;

        if (task.isRecurring && task.recurrenceRule?.enabled) {
          const nextDueDate = nextDateFromRule(task.dueDate, task.recurrenceRule);
          recurringTask = {
            ...task,
            id: `task-${++taskIdCounter}`,
            status: 'todo',
            dueDate: nextDueDate,
            parentRecurringTaskId: task.parentRecurringTaskId || task.id,
            createdAt: timestamp,
            updatedAt: timestamp,
            completedAt: undefined,
            assigneeUserId: task.assigneeUserId &&
              mockUsers.some((user) => user.id === task.assigneeUserId && user.isActive)
              ? task.assigneeUserId
              : undefined,
          };
        }

        set((state) => {
          const updatedTasks: Task[] = state.tasks.map((currentTask) =>
            currentTask.id === taskId
              ? {
                  ...currentTask,
                  status: 'done' as const,
                  completedAt: timestamp,
                  updatedAt: timestamp,
                }
              : currentTask
          );

          if (recurringTask) {
            updatedTasks.push(recurringTask);
          }

          return { tasks: sortTasks(updatedTasks) };
        });

        get().logEvent(taskId, 'task_finished', actorUserId);
        if (recurringTask) {
          get().logEvent(recurringTask.id, 'task_created', actorUserId, {
            recurrence: true,
            parentTaskId: task.id,
          });
        }
        return { success: true };
      },

      setPriority: (taskId, urgency, importance, actorUserId) => {
        if (!validatePriority(urgency) || !validatePriority(importance)) {
          return { success: false, error: 'Priority values must be 1..5 integers.' };
        }
        get().updateTask(taskId, { urgency, importance }, actorUserId);
        return { success: true };
      },

      logEvent: (taskId, eventType, actorUserId, metadata) => {
        set((state) => ({
          events: [
            ...state.events,
            {
              id: `evt-${++eventIdCounter}`,
              taskId,
              eventType: ensureEventType(eventType),
              actorUserId,
              timestamp: new Date().toISOString(),
              metadata,
            },
          ],
        }));
      },

      reconcileState: () => {
        set((state) => ({
          tasks: sortTasks(
            state.tasks.map((task) => ({
              ...task,
              priorityScore: scoreTask(task.urgency, task.importance),
            }))
          ),
        }));
      },

      getTaskById: (taskId) => get().tasks.find((task) => task.id === taskId),

      getTasksByProject: (projectId) =>
        sortTasks(get().tasks.filter((task) => task.projectId === projectId)),

      getTasksByStatus: (status) => sortTasks(get().tasks.filter((task) => task.status === status)),

      getTasksForUser: (userId) =>
        sortTasks(get().tasks.filter((task) => task.assigneeUserId === userId)),

      getUnassignedTasks: () => sortTasks(get().tasks.filter((task) => !task.assigneeUserId)),
    }),
    {
      name: 'chrono-tasks',
      version: 1,
    }
  )
);
