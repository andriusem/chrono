// ============================================
// MOCK DATA FOR CHRONO PROTOTYPE
// ============================================
// Data derived from Objectif repartition des tâches.csv

import type {
  User,
  Project,
  Activity,
  TimeEntry,
  Attendance,
  ProjectAssignment,
  ActivityAllocation,
} from '@/types';
import {
  objectifProjects,
  objectifActivities,
  objectifAllocations,
} from '@/data/objectifData';

// ============================================
// USERS
// ============================================
// NGO team: 1 Coordinator (Marie) and 3 team members

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
];

// ============================================
// PROJECTS & ACTIVITIES (from CSV)
// ============================================

export const mockProjects: Project[] = objectifProjects;
export const mockActivities: Activity[] = objectifActivities;
export const mockActivityAllocations: ActivityAllocation[] = objectifAllocations;

// ============================================
// PROJECT ASSIGNMENTS
// ============================================
// Assign all active users to all projects for demo visibility

const assignmentDate = '2026-02-05T09:00:00Z';
const assignableUsers = mockUsers.filter((u) => u.isActive);

export const mockProjectAssignments: ProjectAssignment[] = mockProjects.flatMap(
  (project) =>
    assignableUsers.map((user) => ({
      projectId: project.id,
      userId: user.id,
      assignedById: 'user-1',
      assignedAt: assignmentDate,
    }))
);

// ============================================
// TIME ENTRIES
// ============================================
// Reset to empty to avoid ID mismatches with CSV data

export const mockTimeEntries: TimeEntry[] = [];

// ============================================
// ATTENDANCE RECORDS
// ============================================

const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const yesterdayStr = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const mockAttendance: Attendance[] = [
  {
    id: 'att-2',
    userId: 'user-2',
    date: yesterdayStr,
    clockInTime: '08:30',
    clockOutTime: '17:30',
    isDeleted: false,
  },
  {
    id: 'att-3',
    userId: 'user-3',
    date: todayStr,
    clockInTime: '08:15',
    clockOutTime: '16:00',
    isDeleted: false,
  },
  {
    id: 'att-4',
    userId: 'user-4',
    date: todayStr,
    clockInTime: '08:55',
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
  const assignedProjectIds = mockProjectAssignments
    .filter((a) => a.userId === userId)
    .map((a) => a.projectId);

  return mockProjects.filter(
    (p) => assignedProjectIds.includes(p.id) && p.status === 'active'
  );
}

export function getActivitiesForProject(projectId: string): Activity[] {
  return mockActivities.filter(
    (a) => a.projectId === projectId && !a.isArchived
  );
}

export function getEmployeesForProject(projectId: string): User[] {
  const assignedUserIds = mockProjectAssignments
    .filter((a) => a.projectId === projectId)
    .map((a) => a.userId);

  return mockUsers.filter((u) => assignedUserIds.includes(u.id));
}
