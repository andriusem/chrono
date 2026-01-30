// ============================================
// MOCK DATA FOR CHRONO PROTOTYPE
// ============================================
// This data simulates what would come from the backend API.
// It matches the PRD data model and provides realistic scenarios.

import type {
  User,
  Project,
  Activity,
  TimeEntry,
  Attendance,
  ProjectAssignment,
} from '@/types';

// ============================================
// USERS
// ============================================
// 4 users: 1 PM (Alice) and 3 employees (John, Sarah, Mike)

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'alice.johnson@company.com',
    displayName: 'Alice Johnson',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AJ&backgroundColor=3B82F6',
    role: 'pm',
    isActive: true,
  },
  {
    id: 'user-2',
    email: 'john.doe@company.com',
    displayName: 'John Doe',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=10B981',
    role: 'employee',
    isActive: true,
  },
  {
    id: 'user-3',
    email: 'sarah.smith@company.com',
    displayName: 'Sarah Smith',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=SS&backgroundColor=F59E0B',
    role: 'employee',
    isActive: true,
  },
  {
    id: 'user-4',
    email: 'mike.wilson@company.com',
    displayName: 'Mike Wilson',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MW&backgroundColor=EF4444',
    role: 'employee',
    isActive: true,
  },
];

// ============================================
// PROJECTS
// ============================================
// 3 projects with different statuses

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with new branding and improved UX.',
    status: 'active',
    createdAt: '2026-01-15T09:00:00Z',
    createdById: 'user-1',
  },
  {
    id: 'project-2',
    name: 'Mobile App Development',
    description: 'Building a companion mobile app for iOS and Android platforms.',
    status: 'active',
    createdAt: '2026-01-10T10:00:00Z',
    createdById: 'user-1',
  },
  {
    id: 'project-3',
    name: 'Q4 Marketing Campaign',
    description: 'Year-end marketing push including social media, email, and paid ads.',
    status: 'active',
    createdAt: '2026-01-20T08:00:00Z',
    createdById: 'user-1',
  },
];

// ============================================
// ACTIVITIES
// ============================================
// Multiple activities per project with distinct colors

export const mockActivities: Activity[] = [
  // Website Redesign activities
  {
    id: 'activity-1',
    name: 'Design',
    projectId: 'project-1',
    color: '#3B82F6', // Blue
    isArchived: false,
  },
  {
    id: 'activity-2',
    name: 'Development',
    projectId: 'project-1',
    color: '#10B981', // Green
    isArchived: false,
  },
  {
    id: 'activity-3',
    name: 'Testing',
    projectId: 'project-1',
    color: '#F59E0B', // Amber
    isArchived: false,
  },
  {
    id: 'activity-4',
    name: 'Communication',
    projectId: 'project-1',
    color: '#8B5CF6', // Purple
    isArchived: false,
  },
  {
    id: 'activity-5',
    name: 'Documentation',
    projectId: 'project-1',
    color: '#EC4899', // Pink
    isArchived: false,
  },
  // Mobile App activities
  {
    id: 'activity-6',
    name: 'iOS Development',
    projectId: 'project-2',
    color: '#6366F1', // Indigo
    isArchived: false,
  },
  {
    id: 'activity-7',
    name: 'Android Development',
    projectId: 'project-2',
    color: '#22C55E', // Green
    isArchived: false,
  },
  {
    id: 'activity-8',
    name: 'UI/UX Design',
    projectId: 'project-2',
    color: '#F97316', // Orange
    isArchived: false,
  },
  {
    id: 'activity-9',
    name: 'API Integration',
    projectId: 'project-2',
    color: '#14B8A6', // Teal
    isArchived: false,
  },
  {
    id: 'activity-10',
    name: 'QA Testing',
    projectId: 'project-2',
    color: '#EF4444', // Red
    isArchived: false,
  },
  // Marketing Campaign activities
  {
    id: 'activity-11',
    name: 'Content Creation',
    projectId: 'project-3',
    color: '#A855F7', // Purple
    isArchived: false,
  },
  {
    id: 'activity-12',
    name: 'Social Media',
    projectId: 'project-3',
    color: '#0EA5E9', // Sky
    isArchived: false,
  },
  {
    id: 'activity-13',
    name: 'Email Marketing',
    projectId: 'project-3',
    color: '#84CC16', // Lime
    isArchived: false,
  },
  {
    id: 'activity-14',
    name: 'Paid Advertising',
    projectId: 'project-3',
    color: '#F43F5E', // Rose
    isArchived: false,
  },
  {
    id: 'activity-15',
    name: 'Analytics & Reporting',
    projectId: 'project-3',
    color: '#64748B', // Slate
    isArchived: false,
  },
];

// ============================================
// PROJECT ASSIGNMENTS
// ============================================
// Who works on what

export const mockProjectAssignments: ProjectAssignment[] = [
  // John Doe: Website Redesign, Mobile App
  {
    projectId: 'project-1',
    userId: 'user-2',
    assignedById: 'user-1',
    assignedAt: '2026-01-15T09:30:00Z',
  },
  {
    projectId: 'project-2',
    userId: 'user-2',
    assignedById: 'user-1',
    assignedAt: '2026-01-10T11:00:00Z',
  },
  // Sarah Smith: Website Redesign, Marketing Campaign
  {
    projectId: 'project-1',
    userId: 'user-3',
    assignedById: 'user-1',
    assignedAt: '2026-01-15T09:30:00Z',
  },
  {
    projectId: 'project-3',
    userId: 'user-3',
    assignedById: 'user-1',
    assignedAt: '2026-01-20T08:30:00Z',
  },
  // Mike Wilson: Mobile App only
  {
    projectId: 'project-2',
    userId: 'user-4',
    assignedById: 'user-1',
    assignedAt: '2026-01-10T11:00:00Z',
  },
];

// ============================================
// TIME ENTRIES
// ============================================
// Sample entries including one currently running

// Helper to get today's date in ISO format
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const yesterdayStr = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
// Earlier dates for monthly view (2 weeks ago, 3 weeks ago)
const twoWeeksAgoStr = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const threeWeeksAgoStr = new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const lastWeekStr = new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const mockTimeEntries: TimeEntry[] = [
  // John's entries - including one RUNNING timer
  {
    id: 'entry-1',
    userId: 'user-2',
    activityId: 'activity-2', // Development
    projectId: 'project-1',
    startTime: `${todayStr}T09:00:00Z`,
    endTime: `${todayStr}T11:30:00Z`,
    durationMinutes: 150,
    status: 'completed',
    comments: 'Implemented homepage hero section with responsive design',
    isDeleted: false,
  },
  {
    id: 'entry-2',
    userId: 'user-2',
    activityId: 'activity-4', // Communication
    projectId: 'project-1',
    startTime: `${todayStr}T11:45:00Z`,
    endTime: `${todayStr}T12:15:00Z`,
    durationMinutes: 30,
    status: 'completed',
    comments: 'Team standup and design review meeting',
    isDeleted: false,
  },
  {
    id: 'entry-3',
    userId: 'user-2',
    activityId: 'activity-2', // Development
    projectId: 'project-1',
    startTime: `${todayStr}T13:00:00Z`,
    // No endTime - this is the RUNNING timer!
    status: 'running',
    isDeleted: false,
    lastHeartbeat: new Date().toISOString(),
  },
  // John's yesterday entries
  {
    id: 'entry-4',
    userId: 'user-2',
    activityId: 'activity-6', // iOS Development
    projectId: 'project-2',
    startTime: `${yesterdayStr}T09:00:00Z`,
    endTime: `${yesterdayStr}T12:00:00Z`,
    durationMinutes: 180,
    status: 'completed',
    comments: 'Set up SwiftUI project structure and navigation',
    isDeleted: false,
  },
  {
    id: 'entry-5',
    userId: 'user-2',
    activityId: 'activity-9', // API Integration
    projectId: 'project-2',
    startTime: `${yesterdayStr}T13:30:00Z`,
    endTime: `${yesterdayStr}T17:00:00Z`,
    durationMinutes: 210,
    status: 'completed',
    comments: 'Integrated authentication API endpoints',
    isDeleted: false,
  },
  // Sarah's entries
  {
    id: 'entry-6',
    userId: 'user-3',
    activityId: 'activity-1', // Design
    projectId: 'project-1',
    startTime: `${todayStr}T08:30:00Z`,
    endTime: `${todayStr}T12:00:00Z`,
    durationMinutes: 210,
    status: 'completed',
    comments: 'Created wireframes for product pages',
    isDeleted: false,
  },
  {
    id: 'entry-7',
    userId: 'user-3',
    activityId: 'activity-11', // Content Creation
    projectId: 'project-3',
    startTime: `${todayStr}T13:00:00Z`,
    endTime: `${todayStr}T15:30:00Z`,
    durationMinutes: 150,
    status: 'completed',
    comments: 'Wrote blog posts for the campaign launch',
    isDeleted: false,
  },
  // Mike's entries
  {
    id: 'entry-8',
    userId: 'user-4',
    activityId: 'activity-7', // Android Development
    projectId: 'project-2',
    startTime: `${todayStr}T09:00:00Z`,
    endTime: `${todayStr}T12:30:00Z`,
    durationMinutes: 210,
    status: 'completed',
    comments: 'Implemented Jetpack Compose UI components',
    isDeleted: false,
  },
  {
    id: 'entry-9',
    userId: 'user-4',
    activityId: 'activity-10', // QA Testing
    projectId: 'project-2',
    startTime: `${todayStr}T14:00:00Z`,
    endTime: `${todayStr}T16:00:00Z`,
    durationMinutes: 120,
    status: 'completed',
    comments: 'Tested login flow and found 2 bugs',
    isDeleted: false,
  },
  // ============================================
  // HISTORICAL ENTRIES (for monthly view)
  // ============================================
  // John's entries from last week
  {
    id: 'entry-10',
    userId: 'user-2',
    activityId: 'activity-2', // Development
    projectId: 'project-1',
    startTime: `${lastWeekStr}T09:00:00Z`,
    endTime: `${lastWeekStr}T12:00:00Z`,
    durationMinutes: 180,
    status: 'completed',
    comments: 'Built navigation component and footer',
    isDeleted: false,
  },
  {
    id: 'entry-11',
    userId: 'user-2',
    activityId: 'activity-3', // Testing
    projectId: 'project-1',
    startTime: `${lastWeekStr}T13:00:00Z`,
    endTime: `${lastWeekStr}T15:30:00Z`,
    durationMinutes: 150,
    status: 'completed',
    comments: 'Unit tests for auth module',
    isDeleted: false,
  },
  // John's entries from 2 weeks ago
  {
    id: 'entry-12',
    userId: 'user-2',
    activityId: 'activity-1', // Design
    projectId: 'project-1',
    startTime: `${twoWeeksAgoStr}T10:00:00Z`,
    endTime: `${twoWeeksAgoStr}T14:00:00Z`,
    durationMinutes: 240,
    status: 'completed',
    comments: 'Initial design review with stakeholders',
    isDeleted: false,
  },
  {
    id: 'entry-13',
    userId: 'user-2',
    activityId: 'activity-6', // iOS Development
    projectId: 'project-2',
    startTime: `${twoWeeksAgoStr}T14:30:00Z`,
    endTime: `${twoWeeksAgoStr}T17:30:00Z`,
    durationMinutes: 180,
    status: 'completed',
    comments: 'Project kickoff and environment setup',
    isDeleted: false,
  },
  // John's entries from 3 weeks ago
  {
    id: 'entry-14',
    userId: 'user-2',
    activityId: 'activity-4', // Communication
    projectId: 'project-1',
    startTime: `${threeWeeksAgoStr}T09:00:00Z`,
    endTime: `${threeWeeksAgoStr}T11:00:00Z`,
    durationMinutes: 120,
    status: 'completed',
    comments: 'Sprint planning meeting',
    isDeleted: false,
  },
  {
    id: 'entry-15',
    userId: 'user-2',
    activityId: 'activity-2', // Development
    projectId: 'project-1',
    startTime: `${threeWeeksAgoStr}T13:00:00Z`,
    endTime: `${threeWeeksAgoStr}T17:00:00Z`,
    durationMinutes: 240,
    status: 'completed',
    comments: 'Initial codebase setup and boilerplate',
    isDeleted: false,
  },
];

// ============================================
// ATTENDANCE RECORDS
// ============================================

export const mockAttendance: Attendance[] = [
  // John's attendance
  {
    id: 'att-1',
    userId: 'user-2',
    date: todayStr,
    clockInTime: '08:45',
    // No clock out - hasn't left yet
    isDeleted: false,
  },
  {
    id: 'att-2',
    userId: 'user-2',
    date: yesterdayStr,
    clockInTime: '09:00',
    clockOutTime: '17:30',
    isDeleted: false,
  },
  // Sarah's attendance
  {
    id: 'att-3',
    userId: 'user-3',
    date: todayStr,
    clockInTime: '08:30',
    clockOutTime: '16:00',
    isDeleted: false,
  },
  // Mike's attendance
  {
    id: 'att-4',
    userId: 'user-4',
    date: todayStr,
    clockInTime: '08:55',
    // No clock out - hasn't left yet
    isDeleted: false,
  },
];

// ============================================
// HELPER: Get user by ID
// ============================================
export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

// ============================================
// HELPER: Get project by ID
// ============================================
export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

// ============================================
// HELPER: Get activity by ID
// ============================================
export function getActivityById(id: string): Activity | undefined {
  return mockActivities.find((a) => a.id === id);
}

// ============================================
// HELPER: Get projects assigned to a user
// ============================================
export function getProjectsForUser(userId: string): Project[] {
  const assignedProjectIds = mockProjectAssignments
    .filter((a) => a.userId === userId)
    .map((a) => a.projectId);

  return mockProjects.filter(
    (p) => assignedProjectIds.includes(p.id) && p.status === 'active'
  );
}

// ============================================
// HELPER: Get activities for a project
// ============================================
export function getActivitiesForProject(projectId: string): Activity[] {
  return mockActivities.filter(
    (a) => a.projectId === projectId && !a.isArchived
  );
}

// ============================================
// HELPER: Get employees assigned to a project
// ============================================
export function getEmployeesForProject(projectId: string): User[] {
  const assignedUserIds = mockProjectAssignments
    .filter((a) => a.projectId === projectId)
    .map((a) => a.userId);

  return mockUsers.filter((u) => assignedUserIds.includes(u.id));
}
