// ============================================
// MOCK DATA FOR CHRONO PROTOTYPE
// ============================================
// NGO domain context - reflecting nonprofit/association work
// Inspired by ileya.fr (Guadeloupe social mediation organization)

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
// NGO team: 1 Coordinator (Marie) and 3 team members

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'marie.laurent@ileya.fr',
    displayName: 'Marie Laurent',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=ML&backgroundColor=3878ff',
    role: 'pm',
    isActive: true,
  },
  {
    id: 'user-2',
    email: 'jean.baptiste@ileya.fr',
    displayName: 'Jean-Baptiste Morel',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JM&backgroundColor=28a745',
    role: 'employee',
    isActive: true,
  },
  {
    id: 'user-3',
    email: 'camille.duval@ileya.fr',
    displayName: 'Camille Duval',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=CD&backgroundColor=ffc107',
    role: 'employee',
    isActive: true,
  },
  {
    id: 'user-4',
    email: 'thomas.martin@ileya.fr',
    displayName: 'Thomas Martin',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TM&backgroundColor=dc3545',
    role: 'employee',
    isActive: true,
  },
];

// ============================================
// PROJECTS
// ============================================
// NGO programs and initiatives

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'Community Outreach Program',
    description: 'Field visits and support services for local communities. Includes home visits, community center activities, and social support coordination.',
    status: 'active',
    createdAt: '2026-01-15T09:00:00Z',
    createdById: 'user-1',
  },
  {
    id: 'project-2',
    name: 'Youth Education Initiative',
    description: 'Educational workshops and mentoring programs for young people aged 12-25. Focus on skills development and career guidance.',
    status: 'active',
    createdAt: '2026-01-10T10:00:00Z',
    createdById: 'user-1',
  },
  {
    id: 'project-3',
    name: 'Cultural Heritage Festival 2026',
    description: 'Annual celebration of local culture and traditions. Event planning, volunteer coordination, and community engagement.',
    status: 'active',
    createdAt: '2026-01-20T08:00:00Z',
    createdById: 'user-1',
  },
  {
    id: 'project-4',
    name: 'Grant Reporting Q1 2026',
    description: 'Quarterly reporting for funding partners. Documentation, impact metrics, and financial reporting.',
    status: 'active',
    createdAt: '2026-01-05T09:00:00Z',
    createdById: 'user-1',
  },
];

// ============================================
// ACTIVITIES
// ============================================
// NGO work activities with colors

export const mockActivities: Activity[] = [
  // Community Outreach activities
  {
    id: 'activity-1',
    name: 'Field Work',
    projectId: 'project-1',
    color: '#3878ff', // Blue (accent)
    isArchived: false,
  },
  {
    id: 'activity-2',
    name: 'Home Visits',
    projectId: 'project-1',
    color: '#28a745', // Green
    isArchived: false,
  },
  {
    id: 'activity-3',
    name: 'Case Documentation',
    projectId: 'project-1',
    color: '#6c757d', // Gray
    isArchived: false,
  },
  {
    id: 'activity-4',
    name: 'Partner Meetings',
    projectId: 'project-1',
    color: '#17a2b8', // Teal
    isArchived: false,
  },
  {
    id: 'activity-5',
    name: 'Community Center',
    projectId: 'project-1',
    color: '#ffc107', // Amber
    isArchived: false,
  },
  // Youth Education activities
  {
    id: 'activity-6',
    name: 'Workshop Facilitation',
    projectId: 'project-2',
    color: '#6f42c1', // Purple
    isArchived: false,
  },
  {
    id: 'activity-7',
    name: 'Mentoring Sessions',
    projectId: 'project-2',
    color: '#20c997', // Teal-green
    isArchived: false,
  },
  {
    id: 'activity-8',
    name: 'Curriculum Development',
    projectId: 'project-2',
    color: '#fd7e14', // Orange
    isArchived: false,
  },
  {
    id: 'activity-9',
    name: 'School Coordination',
    projectId: 'project-2',
    color: '#e83e8c', // Pink
    isArchived: false,
  },
  {
    id: 'activity-10',
    name: 'Youth Events',
    projectId: 'project-2',
    color: '#007bff', // Blue
    isArchived: false,
  },
  // Cultural Festival activities
  {
    id: 'activity-11',
    name: 'Event Planning',
    projectId: 'project-3',
    color: '#dc3545', // Red
    isArchived: false,
  },
  {
    id: 'activity-12',
    name: 'Volunteer Coordination',
    projectId: 'project-3',
    color: '#28a745', // Green
    isArchived: false,
  },
  {
    id: 'activity-13',
    name: 'Vendor Relations',
    projectId: 'project-3',
    color: '#6610f2', // Indigo
    isArchived: false,
  },
  {
    id: 'activity-14',
    name: 'Marketing & Promotion',
    projectId: 'project-3',
    color: '#e83e8c', // Pink
    isArchived: false,
  },
  {
    id: 'activity-15',
    name: 'Logistics',
    projectId: 'project-3',
    color: '#795548', // Brown
    isArchived: false,
  },
  // Grant Reporting activities
  {
    id: 'activity-16',
    name: 'Data Collection',
    projectId: 'project-4',
    color: '#607d8b', // Blue-gray
    isArchived: false,
  },
  {
    id: 'activity-17',
    name: 'Report Writing',
    projectId: 'project-4',
    color: '#3878ff', // Accent blue
    isArchived: false,
  },
  {
    id: 'activity-18',
    name: 'Financial Documentation',
    projectId: 'project-4',
    color: '#4caf50', // Material green
    isArchived: false,
  },
  {
    id: 'activity-19',
    name: 'Stakeholder Communication',
    projectId: 'project-4',
    color: '#ff9800', // Material orange
    isArchived: false,
  },
];

// ============================================
// PROJECT ASSIGNMENTS
// ============================================
// Who works on what

export const mockProjectAssignments: ProjectAssignment[] = [
  // Jean-Baptiste: Community Outreach, Youth Education
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
  // Camille: Community Outreach, Cultural Festival
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
  // Thomas: Youth Education, Grant Reporting
  {
    projectId: 'project-2',
    userId: 'user-4',
    assignedById: 'user-1',
    assignedAt: '2026-01-10T11:00:00Z',
  },
  {
    projectId: 'project-4',
    userId: 'user-4',
    assignedById: 'user-1',
    assignedAt: '2026-01-05T09:30:00Z',
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
  // Jean-Baptiste's entries - including one RUNNING timer
  {
    id: 'entry-1',
    userId: 'user-2',
    activityId: 'activity-2', // Home Visits
    projectId: 'project-1',
    startTime: `${todayStr}T09:00:00Z`,
    endTime: `${todayStr}T11:30:00Z`,
    durationMinutes: 150,
    status: 'completed',
    comments: 'Visited 3 families in Pointe-à-Pitre. Discussed social support options and collected documentation.',
    isDeleted: false,
  },
  {
    id: 'entry-2',
    userId: 'user-2',
    activityId: 'activity-4', // Partner Meetings
    projectId: 'project-1',
    startTime: `${todayStr}T11:45:00Z`,
    endTime: `${todayStr}T12:30:00Z`,
    durationMinutes: 45,
    status: 'completed',
    comments: 'Meeting with social services coordinator to discuss case referrals',
    isDeleted: false,
  },
  {
    id: 'entry-3',
    userId: 'user-2',
    activityId: 'activity-7', // Mentoring Sessions
    projectId: 'project-2',
    startTime: `${todayStr}T14:00:00Z`,
    // No endTime - this is the RUNNING timer!
    status: 'running',
    isDeleted: false,
    lastHeartbeat: new Date().toISOString(),
  },
  // Jean-Baptiste's yesterday entries
  {
    id: 'entry-4',
    userId: 'user-2',
    activityId: 'activity-6', // Workshop Facilitation
    projectId: 'project-2',
    startTime: `${yesterdayStr}T09:00:00Z`,
    endTime: `${yesterdayStr}T12:00:00Z`,
    durationMinutes: 180,
    status: 'completed',
    comments: 'CV writing workshop with 12 participants. Good engagement and practical exercises.',
    isDeleted: false,
  },
  {
    id: 'entry-5',
    userId: 'user-2',
    activityId: 'activity-3', // Case Documentation
    projectId: 'project-1',
    startTime: `${yesterdayStr}T13:30:00Z`,
    endTime: `${yesterdayStr}T17:00:00Z`,
    durationMinutes: 210,
    status: 'completed',
    comments: 'Updated case files for recent home visits. Prepared reports for partner agencies.',
    isDeleted: false,
  },
  // Camille's entries
  {
    id: 'entry-6',
    userId: 'user-3',
    activityId: 'activity-1', // Field Work
    projectId: 'project-1',
    startTime: `${todayStr}T08:30:00Z`,
    endTime: `${todayStr}T12:00:00Z`,
    durationMinutes: 210,
    status: 'completed',
    comments: 'Community center support session. Helped with administrative paperwork and benefit applications.',
    isDeleted: false,
  },
  {
    id: 'entry-7',
    userId: 'user-3',
    activityId: 'activity-11', // Event Planning
    projectId: 'project-3',
    startTime: `${todayStr}T13:00:00Z`,
    endTime: `${todayStr}T15:30:00Z`,
    durationMinutes: 150,
    status: 'completed',
    comments: 'Festival planning meeting. Finalized venue layout and entertainment schedule.',
    isDeleted: false,
  },
  // Thomas's entries
  {
    id: 'entry-8',
    userId: 'user-4',
    activityId: 'activity-8', // Curriculum Development
    projectId: 'project-2',
    startTime: `${todayStr}T09:00:00Z`,
    endTime: `${todayStr}T12:30:00Z`,
    durationMinutes: 210,
    status: 'completed',
    comments: 'Developed new module on digital literacy. Created lesson plans and materials.',
    isDeleted: false,
  },
  {
    id: 'entry-9',
    userId: 'user-4',
    activityId: 'activity-17', // Report Writing
    projectId: 'project-4',
    startTime: `${todayStr}T14:00:00Z`,
    endTime: `${todayStr}T16:00:00Z`,
    durationMinutes: 120,
    status: 'completed',
    comments: 'Drafted Q1 impact report narrative section. Compiled success stories.',
    isDeleted: false,
  },
  // ============================================
  // HISTORICAL ENTRIES (for monthly view)
  // ============================================
  // Jean-Baptiste's entries from last week
  {
    id: 'entry-10',
    userId: 'user-2',
    activityId: 'activity-2', // Home Visits
    projectId: 'project-1',
    startTime: `${lastWeekStr}T09:00:00Z`,
    endTime: `${lastWeekStr}T12:00:00Z`,
    durationMinutes: 180,
    status: 'completed',
    comments: 'Follow-up visits with families from previous week. Good progress on benefit applications.',
    isDeleted: false,
  },
  {
    id: 'entry-11',
    userId: 'user-2',
    activityId: 'activity-6', // Workshop Facilitation
    projectId: 'project-2',
    startTime: `${lastWeekStr}T13:00:00Z`,
    endTime: `${lastWeekStr}T15:30:00Z`,
    durationMinutes: 150,
    status: 'completed',
    comments: 'Job interview preparation workshop. Role-playing exercises.',
    isDeleted: false,
  },
  // Jean-Baptiste's entries from 2 weeks ago
  {
    id: 'entry-12',
    userId: 'user-2',
    activityId: 'activity-5', // Community Center
    projectId: 'project-1',
    startTime: `${twoWeeksAgoStr}T10:00:00Z`,
    endTime: `${twoWeeksAgoStr}T14:00:00Z`,
    durationMinutes: 240,
    status: 'completed',
    comments: 'Drop-in support day at community center. Assisted 8 people with various needs.',
    isDeleted: false,
  },
  {
    id: 'entry-13',
    userId: 'user-2',
    activityId: 'activity-7', // Mentoring Sessions
    projectId: 'project-2',
    startTime: `${twoWeeksAgoStr}T14:30:00Z`,
    endTime: `${twoWeeksAgoStr}T17:30:00Z`,
    durationMinutes: 180,
    status: 'completed',
    comments: 'One-on-one mentoring with 3 young people. Career exploration and goal setting.',
    isDeleted: false,
  },
  // Jean-Baptiste's entries from 3 weeks ago
  {
    id: 'entry-14',
    userId: 'user-2',
    activityId: 'activity-4', // Partner Meetings
    projectId: 'project-1',
    startTime: `${threeWeeksAgoStr}T09:00:00Z`,
    endTime: `${threeWeeksAgoStr}T11:00:00Z`,
    durationMinutes: 120,
    status: 'completed',
    comments: 'Monthly coordination meeting with partner organizations.',
    isDeleted: false,
  },
  {
    id: 'entry-15',
    userId: 'user-2',
    activityId: 'activity-3', // Case Documentation
    projectId: 'project-1',
    startTime: `${threeWeeksAgoStr}T13:00:00Z`,
    endTime: `${threeWeeksAgoStr}T17:00:00Z`,
    durationMinutes: 240,
    status: 'completed',
    comments: 'End of month reporting and case file updates.',
    isDeleted: false,
  },
];

// ============================================
// ATTENDANCE RECORDS
// ============================================

export const mockAttendance: Attendance[] = [
  // Jean-Baptiste's attendance
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
    clockInTime: '08:30',
    clockOutTime: '17:30',
    isDeleted: false,
  },
  // Camille's attendance
  {
    id: 'att-3',
    userId: 'user-3',
    date: todayStr,
    clockInTime: '08:15',
    clockOutTime: '16:00',
    isDeleted: false,
  },
  // Thomas's attendance
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
