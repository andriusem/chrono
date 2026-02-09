// ============================================
// MOCK DATA FOR CHRONO VNEXT PROTOTYPE
// ============================================
// Source: Objectif repartition des tâches.csv (converted in objectifData.ts)

import type {
  Activity,
  ActivityAllocation,
  ActivityTemplate,
  Attendance,
  DomainTemplate,
  Project,
  ProjectActivity,
  ProjectAssignment,
  ProjectDomain,
  Task,
  TaskEvent,
  TimeEntry,
  User,
} from '@/types';
import {
  activityTemplates,
  domainTemplates,
  roleAllocations,
} from '@/data/objectifData';

// ============================================
// USERS
// ============================================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'marie.laurent@ileya.fr',
    displayName: 'Marie Laurent',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=ML&backgroundColor=3878ff',
    role: 'pm',
    jobTitle: 'Directrice',
    isActive: true,
  },
  {
    id: 'user-5',
    email: 'alexandre.bernard@ileya.fr',
    displayName: 'Alexandre Bernard',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AB&backgroundColor=6f42c1',
    role: 'employee',
    jobTitle: 'Responsable du développement du projet associatif',
    isActive: true,
  },
  {
    id: 'user-7',
    email: 'leila.martins@ileya.fr',
    displayName: 'Leila Martins',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=LM&backgroundColor=fd7e14',
    role: 'employee',
    jobTitle: 'Chargé du développement financier et associatf',
    isActive: true,
  },
  {
    id: 'user-2',
    email: 'jean.baptiste@ileya.fr',
    displayName: 'Jean-Baptiste Morel',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JM&backgroundColor=28a745',
    role: 'employee',
    jobTitle: "Chargée d'accompagnement social",
    isActive: true,
  },
  {
    id: 'user-3',
    email: 'camille.duval@ileya.fr',
    displayName: 'Camille Duval',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=CD&backgroundColor=ffc107',
    role: 'employee',
    jobTitle: 'Médiatrice Sociale',
    isActive: true,
  },
  {
    id: 'user-4',
    email: 'thomas.martin@ileya.fr',
    displayName: 'Thomas Martin',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TM&backgroundColor=dc3545',
    role: 'employee',
    jobTitle: 'Conseillère numérique',
    isActive: true,
  },
  {
    id: 'user-6',
    email: 'nadia.petit@ileya.fr',
    displayName: 'Nadia Petit',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=NP&backgroundColor=17a2b8',
    role: 'employee',
    jobTitle: "Chargé d'innovation numérique et digitale",
    isActive: true,
  },
];

// ============================================
// CORE PROJECTS (operational projects)
// ============================================

export const mockProjects: Project[] = [
  {
    id: 'project-ops-1',
    name: 'USIK 2026 Delivery',
    description: 'Operational delivery for 2026 social and digital programmes.',
    status: 'active',
    createdAt: '2026-02-06T08:00:00Z',
    createdById: 'user-1',
    allocatedHours: 800,
  },
  {
    id: 'project-ops-2',
    name: 'Neighbourhood Inclusion',
    description: 'Cross-domain actions for outreach and accompaniment.',
    status: 'active',
    createdAt: '2026-02-06T08:00:00Z',
    createdById: 'user-1',
    allocatedHours: 560,
  },
  {
    id: 'project-ops-3',
    name: 'Internal Capacity Build',
    description: 'Internal governance, quality, and operational improvement.',
    status: 'active',
    createdAt: '2026-02-06T08:00:00Z',
    createdById: 'user-1',
    allocatedHours: 320,
  },
];

// ============================================
// TEMPLATE LIBRARIES
// ============================================

export const mockDomainTemplates: DomainTemplate[] = domainTemplates;
export const mockActivityTemplates: ActivityTemplate[] = activityTemplates;
export const mockRoleAllocations: ActivityAllocation[] = roleAllocations;

// ============================================
// PROJECT DOMAINS / ACTIVITIES (cloned from templates)
// ============================================

const palette = [
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

const buildProjectDomainId = (projectId: string, domainTemplateId: string) =>
  `${projectId}__${domainTemplateId}`;
const buildProjectActivityId = (
  projectId: string,
  projectDomainId: string,
  activityTemplateId: string
) => `${projectId}__${projectDomainId}__${activityTemplateId}`;

export const mockProjectDomains: ProjectDomain[] = mockProjects.flatMap((project) =>
  mockDomainTemplates.map((domain) => ({
    id: buildProjectDomainId(project.id, domain.id),
    projectId: project.id,
    domainTemplateId: domain.id,
    displayOrder: domain.displayOrder,
  }))
);

export const mockProjectActivities: ProjectActivity[] = mockProjectDomains.flatMap(
  (projectDomain) => {
    const templates = mockActivityTemplates.filter(
      (activityTemplate) => activityTemplate.domainTemplateId === projectDomain.domainTemplateId
    );

    return templates.map((activityTemplate, index) => ({
      id: buildProjectActivityId(projectDomain.projectId, projectDomain.id, activityTemplate.id),
      projectId: projectDomain.projectId,
      projectDomainId: projectDomain.id,
      name: activityTemplate.name,
      sourceActivityTemplateId: activityTemplate.id,
      isHidden: false,
      kanbanStatusDefault: 'todo',
      color: palette[index % palette.length],
      allocatedHours: mockRoleAllocations
        .filter((allocation) => allocation.activityId === activityTemplate.id)
        .reduce((sum, allocation) => sum + allocation.allocatedHours, 0),
    }));
  }
);

// Legacy compatibility: keep simple activity list in old shape.
export const mockActivities: Activity[] = mockProjectActivities.map((activity) => ({
  id: activity.id,
  name: activity.name,
  projectId: activity.projectId,
  color: activity.color || '#3878ff',
  isArchived: activity.isHidden,
  kanbanStatus: activity.kanbanStatusDefault,
  allocatedHours: activity.allocatedHours,
}));

export const mockActivityAllocations: ActivityAllocation[] = [];

// ============================================
// TASKS
// ============================================

const findProjectDomainId = (projectId: string, domainTemplateId: string) =>
  buildProjectDomainId(projectId, domainTemplateId);

const findActivityId = (projectId: string, domainTemplateId: string, activityTemplateId: string) =>
  buildProjectActivityId(
    projectId,
    findProjectDomainId(projectId, domainTemplateId),
    activityTemplateId
  );

const now = new Date('2026-02-06T09:00:00Z').toISOString();

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'project-ops-1',
    projectDomainId: findProjectDomainId('project-ops-1', 'domain-template-2'),
    projectActivityId: findActivityId('project-ops-1', 'domain-template-2', 'activity-template-13'),
    title: 'Finalize subvention dossier batch A',
    description: 'Prepare final checks before PM validation.',
    status: 'todo',
    assigneeUserId: 'user-5',
    createdByUserId: 'user-1',
    urgency: 5,
    importance: 5,
    priorityScore: 25,
    dueDate: '2026-02-09',
    isRecurring: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'task-2',
    projectId: 'project-ops-1',
    projectDomainId: findProjectDomainId('project-ops-1', 'domain-template-5'),
    projectActivityId: findActivityId('project-ops-1', 'domain-template-5', 'activity-template-64'),
    title: 'Prepare Monday literacy workshop',
    status: 'in_progress',
    assigneeUserId: 'user-3',
    createdByUserId: 'user-1',
    urgency: 4,
    importance: 4,
    priorityScore: 16,
    dueDate: '2026-02-07',
    isRecurring: true,
    recurrenceRule: {
      frequency: 'weekly',
      interval: 1,
      anchorDueDate: '2026-02-07',
      enabled: true,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'task-3',
    projectId: 'project-ops-2',
    projectDomainId: findProjectDomainId('project-ops-2', 'domain-template-4'),
    projectActivityId: findActivityId('project-ops-2', 'domain-template-4', 'activity-template-38'),
    title: 'New beneficiary initial diagnostic',
    status: 'todo',
    createdByUserId: 'user-2',
    urgency: 5,
    importance: 4,
    priorityScore: 20,
    dueDate: '2026-02-08',
    isRecurring: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'task-4',
    projectId: 'project-ops-2',
    projectDomainId: findProjectDomainId('project-ops-2', 'domain-template-10'),
    projectActivityId: findActivityId('project-ops-2', 'domain-template-10', 'activity-template-137'),
    title: 'Update DigiPoste software image',
    status: 'done',
    assigneeUserId: 'user-6',
    createdByUserId: 'user-1',
    urgency: 3,
    importance: 4,
    priorityScore: 12,
    dueDate: '2026-02-05',
    isRecurring: false,
    createdAt: now,
    updatedAt: now,
    completedAt: '2026-02-06T10:30:00Z',
  },
];

export const mockTaskEvents: TaskEvent[] = [
  {
    id: 'evt-1',
    taskId: 'task-1',
    eventType: 'task_created',
    actorUserId: 'user-1',
    timestamp: now,
    metadata: { source: 'seed' },
  },
  {
    id: 'evt-2',
    taskId: 'task-2',
    eventType: 'task_created',
    actorUserId: 'user-1',
    timestamp: now,
    metadata: { source: 'seed' },
  },
];

// ============================================
// PROJECT ASSIGNMENTS (informational only)
// ============================================

const assignmentDate = '2026-02-06T09:00:00Z';
export const mockProjectAssignments: ProjectAssignment[] = mockProjects.flatMap((project) =>
  mockUsers
    .filter((user) => user.isActive)
    .map((user) => ({
      projectId: project.id,
      userId: user.id,
      assignedById: 'user-1',
      assignedAt: assignmentDate,
    }))
);

// ============================================
// TIME ENTRIES
// ============================================

export const mockTimeEntries: TimeEntry[] = [];

// ============================================
// ATTENDANCE
// ============================================

const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const yesterdayStr = yesterday.toISOString().split('T')[0];

export const mockAttendance: Attendance[] = [
  {
    id: 'att-1',
    userId: 'user-3',
    date: todayStr,
    clockInTime: '08:30',
    isDeleted: false,
  },
  {
    id: 'att-2',
    userId: 'user-2',
    date: yesterdayStr,
    clockInTime: '09:00',
    // Missing clock out to exercise reconciliation gate.
    isDeleted: false,
  },
  {
    id: 'att-3',
    userId: 'user-6',
    date: yesterdayStr,
    clockInTime: '08:15',
    clockOutTime: '16:45',
    isDeleted: false,
  },
];

// ============================================
// HELPERS
// ============================================

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

export function getActivityById(id: string): Activity | undefined {
  return mockActivities.find((a) => a.id === id);
}

export function getProjectsForUser(userId: string): Project[] {
  void userId;
  return mockProjects.filter((p) => p.status === 'active');
}

export function getActivitiesForProject(projectId: string): Activity[] {
  return mockActivities.filter((a) => a.projectId === projectId && !a.isArchived);
}

export function getEmployeesForProject(projectId: string): User[] {
  void projectId;
  return mockUsers.filter((u) => u.isActive);
}
