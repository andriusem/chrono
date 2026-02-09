// ============================================
// PROJECT STORE
// ============================================
// Manages projects + project-domain/activity instances.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Activity,
  ActivityAllocation,
  EmployeeRole,
  KanbanStatus,
  Project,
  ProjectActivity,
  ProjectAssignment,
  ProjectDomain,
  ProjectStatus,
} from '@/types';
import {
  mockActivities,
  mockActivityAllocations,
  mockActivityTemplates,
  mockDomainTemplates,
  mockProjectActivities,
  mockProjectAssignments,
  mockProjectDomains,
  mockProjects,
} from '@/data/mockData';

interface ProjectState {
  // Data
  projects: Project[];
  projectDomains: ProjectDomain[];
  projectActivities: ProjectActivity[];
  // Legacy compatibility arrays
  activities: Activity[];
  assignments: ProjectAssignment[];
  allocations: ActivityAllocation[];

  // Project actions
  createProject: (project: Omit<Project, 'id' | 'createdAt'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  archiveProject: (id: string) => void;
  restoreProject: (id: string) => void;

  // Project-domain/activity actions
  hideProjectActivity: (projectActivityId: string) => void;
  restoreProjectActivity: (projectActivityId: string) => void;
  createProjectActivity: (
    projectId: string,
    projectDomainId: string,
    name: string
  ) => ProjectActivity;
  updateProjectActivity: (projectActivityId: string, updates: Partial<ProjectActivity>) => void;
  updateActivityKanbanStatus: (id: string, status: KanbanStatus) => void;

  // Legacy activity actions
  createActivity: (activity: Omit<Activity, 'id'>) => Activity;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  archiveActivity: (id: string) => void;

  // Assignment actions (informational only)
  assignEmployee: (projectId: string, userId: string, assignedById: string) => void;
  unassignEmployee: (projectId: string, userId: string) => void;

  // Queries
  getProjectById: (id: string) => Project | undefined;
  getProjectDomainById: (projectDomainId: string) => ProjectDomain | undefined;
  getProjectActivityById: (projectActivityId: string) => ProjectActivity | undefined;
  getProjectDomains: (projectId: string) => ProjectDomain[];
  getProjectActivities: (projectId: string, projectDomainId?: string) => ProjectActivity[];
  getActivitiesForProject: (projectId: string) => Activity[];
  getProjectsForUser: (userId: string) => Project[];
  getAssignedEmployeeIds: (projectId: string) => string[];
  isUserAssignedToProject: (userId: string, projectId: string) => boolean;
  getAllocationsForActivity: (activityId: string) => ActivityAllocation[];
  getAllocationsForRole: (role: EmployeeRole) => ActivityAllocation[];
}

let projectIdCounter = 100;
let activityIdCounter = 100;
let projectActivityCounter = 10000;

const PALETTE = [
  '#3878ff',
  '#28a745',
  '#ffc107',
  '#dc3545',
  '#6f42c1',
  '#17a2b8',
  '#fd7e14',
  '#e83e8c',
  '#20c997',
  '#6c757d',
];

const randomPaletteColor = (index: number) => PALETTE[index % PALETTE.length];

const buildProjectDomainId = (projectId: string, domainTemplateId: string) =>
  `${projectId}__${domainTemplateId}`;
const buildProjectActivityId = (projectId: string, projectDomainId: string, sourceId: string) =>
  `${projectId}__${projectDomainId}__${sourceId}`;

const toLegacyActivity = (
  projectActivity: ProjectActivity,
  fallbackKanbanStatus: KanbanStatus = 'todo'
): Activity => ({
  id: projectActivity.id,
  name: projectActivity.name,
  projectId: projectActivity.projectId,
  color: projectActivity.color || '#3878ff',
  isArchived: projectActivity.isHidden,
  kanbanStatus: projectActivity.kanbanStatusDefault || fallbackKanbanStatus,
  allocatedHours: projectActivity.allocatedHours,
});

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: mockProjects,
      projectDomains: mockProjectDomains,
      projectActivities: mockProjectActivities,
      activities: mockActivities,
      assignments: mockProjectAssignments,
      allocations: mockActivityAllocations,

      createProject: (projectData) => {
        const nextProject: Project = {
          ...projectData,
          id: `project-${++projectIdCounter}`,
          createdAt: new Date().toISOString(),
        };

        const clonedDomains: ProjectDomain[] = mockDomainTemplates.map((domainTemplate) => ({
          id: buildProjectDomainId(nextProject.id, domainTemplate.id),
          projectId: nextProject.id,
          domainTemplateId: domainTemplate.id,
          displayOrder: domainTemplate.displayOrder,
        }));

        const clonedActivities: ProjectActivity[] = clonedDomains.flatMap((projectDomain) =>
          mockActivityTemplates
            .filter(
              (activityTemplate) => activityTemplate.domainTemplateId === projectDomain.domainTemplateId
            )
            .map((activityTemplate, index) => ({
              id: buildProjectActivityId(nextProject.id, projectDomain.id, activityTemplate.id),
              projectId: nextProject.id,
              projectDomainId: projectDomain.id,
              name: activityTemplate.name,
              sourceActivityTemplateId: activityTemplate.id,
              isHidden: false,
              kanbanStatusDefault: 'todo',
              color: randomPaletteColor(index),
              allocatedHours: 0,
            }))
        );

        set((state) => ({
          projects: [...state.projects, nextProject],
          projectDomains: [...state.projectDomains, ...clonedDomains],
          projectActivities: [...state.projectActivities, ...clonedActivities],
          activities: [...state.activities, ...clonedActivities.map((activity) => toLegacyActivity(activity))],
        }));

        return nextProject;
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates } : project
          ),
        }));
      },

      archiveProject: (id) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, status: 'archived' as ProjectStatus } : project
          ),
        }));
      },

      restoreProject: (id) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, status: 'active' as ProjectStatus } : project
          ),
        }));
      },

      hideProjectActivity: (projectActivityId) => {
        set((state) => ({
          projectActivities: state.projectActivities.map((projectActivity) =>
            projectActivity.id === projectActivityId
              ? { ...projectActivity, isHidden: true }
              : projectActivity
          ),
          activities: state.activities.map((activity) =>
            activity.id === projectActivityId ? { ...activity, isArchived: true } : activity
          ),
        }));
      },

      restoreProjectActivity: (projectActivityId) => {
        set((state) => ({
          projectActivities: state.projectActivities.map((projectActivity) =>
            projectActivity.id === projectActivityId
              ? { ...projectActivity, isHidden: false }
              : projectActivity
          ),
          activities: state.activities.map((activity) =>
            activity.id === projectActivityId ? { ...activity, isArchived: false } : activity
          ),
        }));
      },

      createProjectActivity: (projectId, projectDomainId, name) => {
        const nextProjectActivity: ProjectActivity = {
          id: `project-activity-${++projectActivityCounter}`,
          projectId,
          projectDomainId,
          name: name.trim(),
          isHidden: false,
          kanbanStatusDefault: 'todo',
          color: randomPaletteColor(projectActivityCounter),
          allocatedHours: 0,
        };

        set((state) => ({
          projectActivities: [...state.projectActivities, nextProjectActivity],
          activities: [...state.activities, toLegacyActivity(nextProjectActivity)],
        }));

        return nextProjectActivity;
      },

      updateProjectActivity: (projectActivityId, updates) => {
        set((state) => ({
          projectActivities: state.projectActivities.map((projectActivity) =>
            projectActivity.id === projectActivityId
              ? { ...projectActivity, ...updates }
              : projectActivity
          ),
          activities: state.activities.map((activity) =>
            activity.id === projectActivityId
              ? {
                  ...activity,
                  name: updates.name ?? activity.name,
                  color: updates.color ?? activity.color,
                  isArchived:
                    updates.isHidden !== undefined ? updates.isHidden : activity.isArchived,
                  allocatedHours: updates.allocatedHours ?? activity.allocatedHours,
                  kanbanStatus: updates.kanbanStatusDefault ?? activity.kanbanStatus,
                }
              : activity
          ),
        }));
      },

      updateActivityKanbanStatus: (id, status) => {
        get().updateProjectActivity(id, { kanbanStatusDefault: status });
      },

      // Legacy methods
      createActivity: (activityData) => {
        const nextActivity: Activity = {
          ...activityData,
          id: `activity-${++activityIdCounter}`,
        };

        set((state) => ({
          activities: [...state.activities, nextActivity],
        }));

        return nextActivity;
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity
          ),
        }));
      },

      archiveActivity: (id) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, isArchived: true } : activity
          ),
          projectActivities: state.projectActivities.map((projectActivity) =>
            projectActivity.id === id ? { ...projectActivity, isHidden: true } : projectActivity
          ),
        }));
      },

      assignEmployee: (projectId, userId, assignedById) => {
        const existing = get().assignments.find(
          (assignment) => assignment.projectId === projectId && assignment.userId === userId
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
            (assignment) => !(assignment.projectId === projectId && assignment.userId === userId)
          ),
        }));
      },

      getProjectById: (id) => get().projects.find((project) => project.id === id),

      getProjectDomainById: (projectDomainId) =>
        get().projectDomains.find((projectDomain) => projectDomain.id === projectDomainId),

      getProjectActivityById: (projectActivityId) =>
        get().projectActivities.find((projectActivity) => projectActivity.id === projectActivityId),

      getProjectDomains: (projectId) =>
        get()
          .projectDomains.filter((projectDomain) => projectDomain.projectId === projectId)
          .sort((a, b) => a.displayOrder - b.displayOrder),

      getProjectActivities: (projectId, projectDomainId) =>
        get().projectActivities.filter((projectActivity) => {
          if (projectActivity.projectId !== projectId || projectActivity.isHidden) {
            return false;
          }
          if (projectDomainId && projectActivity.projectDomainId !== projectDomainId) {
            return false;
          }
          return true;
        }),

      getActivitiesForProject: (projectId) =>
        get().activities.filter((activity) => activity.projectId === projectId && !activity.isArchived),

      // Assignment restrictions intentionally removed: all active projects are visible.
      getProjectsForUser: (userId) => {
        void userId;
        return get().projects.filter((project) => project.status === 'active');
      },

      getAssignedEmployeeIds: (projectId) =>
        get()
          .assignments.filter((assignment) => assignment.projectId === projectId)
          .map((assignment) => assignment.userId),

      isUserAssignedToProject: (userId, projectId) =>
        get().assignments.some(
          (assignment) => assignment.userId === userId && assignment.projectId === projectId
        ),

      getAllocationsForActivity: (activityId) =>
        get().allocations.filter((allocation) => allocation.activityId === activityId),

      getAllocationsForRole: (role) =>
        get().allocations.filter((allocation) => allocation.role === role),
    }),
    {
      name: 'chrono-projects',
      version: 4,
      migrate: (persistedState) => {
        const state = persistedState as Partial<ProjectState>;
        return {
          ...state,
          projects: mockProjects,
          projectDomains: mockProjectDomains,
          projectActivities: mockProjectActivities,
          activities: mockActivities,
          assignments: mockProjectAssignments,
          allocations: mockActivityAllocations,
        };
      },
    }
  )
);
