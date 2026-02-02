// ============================================
// PROJECT STORE
// ============================================
// Manages projects, activities, and assignments

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Project, Activity, ProjectAssignment, ProjectStatus, KanbanStatus } from '@/types';
import {
  mockProjects,
  mockActivities,
  mockProjectAssignments,
} from '@/data/mockData';

interface ProjectState {
  // Data
  projects: Project[];
  activities: Activity[];
  assignments: ProjectAssignment[];

  // Project actions
  createProject: (project: Omit<Project, 'id' | 'createdAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  archiveProject: (id: string) => void;
  restoreProject: (id: string) => void;

  // Activity actions
  createActivity: (activity: Omit<Activity, 'id'>) => Activity;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  updateActivityKanbanStatus: (id: string, status: KanbanStatus) => void;
  archiveActivity: (id: string) => void;

  // Assignment actions
  assignEmployee: (projectId: string, userId: string, assignedById: string) => void;
  unassignEmployee: (projectId: string, userId: string) => void;

  // Queries
  getProjectById: (id: string) => Project | undefined;
  getActivitiesForProject: (projectId: string) => Activity[];
  getProjectsForUser: (userId: string) => Project[];
  getAssignedEmployeeIds: (projectId: string) => string[];
  isUserAssignedToProject: (userId: string, projectId: string) => boolean;
}

// Generate unique IDs
let projectIdCounter = 100;
let activityIdCounter = 100;

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      // Initialize with mock data
      projects: mockProjects,
      activities: mockActivities,
      assignments: mockProjectAssignments,

      // ============================================
      // PROJECT ACTIONS
      // ============================================

      createProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: `project-${++projectIdCounter}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          projects: [...state.projects, newProject],
        }));

        return newProject;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      archiveProject: (id) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, status: 'archived' as ProjectStatus } : p
          ),
        }));
      },

      restoreProject: (id) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, status: 'active' as ProjectStatus } : p
          ),
        }));
      },

      // ============================================
      // ACTIVITY ACTIONS
      // ============================================

      createActivity: (activityData) => {
        const newActivity: Activity = {
          ...activityData,
          id: `activity-${++activityIdCounter}`,
        };

        set((state) => ({
          activities: [...state.activities, newActivity],
        }));

        return newActivity;
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        }));
      },

      updateActivityKanbanStatus: (id, status) => {
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, kanbanStatus: status } : a
          ),
        }));
      },

      archiveActivity: (id) => {
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, isArchived: true } : a
          ),
        }));
      },

      // ============================================
      // ASSIGNMENT ACTIONS
      // ============================================

      assignEmployee: (projectId, userId, assignedById) => {
        const existing = get().assignments.find(
          (a) => a.projectId === projectId && a.userId === userId
        );

        if (!existing) {
          set((state) => ({
            assignments: [
              ...state.assignments,
              {
                projectId,
                userId,
                assignedById,
                assignedAt: new Date().toISOString(),
              },
            ],
          }));
        }
      },

      unassignEmployee: (projectId, userId) => {
        set((state) => ({
          assignments: state.assignments.filter(
            (a) => !(a.projectId === projectId && a.userId === userId)
          ),
        }));
      },

      // ============================================
      // QUERIES
      // ============================================

      getProjectById: (id) => {
        return get().projects.find((p) => p.id === id);
      },

      getActivitiesForProject: (projectId) => {
        return get().activities.filter(
          (a) => a.projectId === projectId && !a.isArchived
        );
      },

      getProjectsForUser: (userId) => {
        const assignedProjectIds = get()
          .assignments.filter((a) => a.userId === userId)
          .map((a) => a.projectId);

        return get().projects.filter(
          (p) => assignedProjectIds.includes(p.id) && p.status === 'active'
        );
      },

      getAssignedEmployeeIds: (projectId) => {
        return get()
          .assignments.filter((a) => a.projectId === projectId)
          .map((a) => a.userId);
      },

      isUserAssignedToProject: (userId, projectId) => {
        return get().assignments.some(
          (a) => a.userId === userId && a.projectId === projectId
        );
      },
    }),
    {
      name: 'chrono-projects', // localStorage key
    }
  )
);
