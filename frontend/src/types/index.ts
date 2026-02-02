// ============================================
// CHRONO TYPE DEFINITIONS
// ============================================
// These types define the structure of all data in the application.
// They match the data model from docs/mvp.md

// ============================================
// USER TYPES
// ============================================

export type Role = 'employee' | 'pm';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: Role;
  isActive: boolean;
}

// ============================================
// PROJECT TYPES
// ============================================

export type ProjectStatus = 'active' | 'archived';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string; // ISO date string
  createdById: string;
}

// ============================================
// ACTIVITY TYPES
// ============================================

export type KanbanStatus = 'todo' | 'in_progress' | 'done';

export interface Activity {
  id: string;
  name: string;
  projectId: string;
  color: string; // Hex color code like "#3B82F6"
  isArchived: boolean;
  kanbanStatus?: KanbanStatus; // For Kanban board columns, defaults to 'todo'
}

// ============================================
// TIME ENTRY TYPES
// ============================================

export type TimerStatus = 'running' | 'paused' | 'completed' | 'interrupted';

export interface TimeEntry {
  id: string;
  userId: string;
  activityId: string;
  projectId: string; // Denormalized for easier queries
  startTime: string; // ISO date-time string
  endTime?: string; // Undefined while running
  durationMinutes?: number; // Calculated when completed
  status: TimerStatus;
  comments?: string;
  isDeleted: boolean;
  deletedAt?: string;
  deletedById?: string;
  lastHeartbeat?: string; // For detecting interrupted timers
}

// ============================================
// ATTENDANCE TYPES
// ============================================

export interface Attendance {
  id: string;
  userId: string;
  date: string; // ISO date (YYYY-MM-DD)
  clockInTime?: string; // Time only (HH:MM)
  clockOutTime?: string; // Time only (HH:MM)
  isDeleted: boolean;
  deletedAt?: string;
  deletedById?: string;
}

// ============================================
// PROJECT ASSIGNMENT TYPES
// ============================================

export interface ProjectAssignment {
  projectId: string;
  userId: string;
  assignedById: string;
  assignedAt: string; // ISO date-time string
}

// ============================================
// UI STATE TYPES
// ============================================

// For the activity tile component
export interface ActivityWithStats extends Activity {
  todayMinutes: number; // Total tracked today
  project: Project;
}

// For time entry display
export interface TimeEntryWithDetails extends TimeEntry {
  activity: Activity;
  project: Project;
  user: User;
}

// For project list display
export interface ProjectWithStats extends Project {
  totalHoursThisWeek: number;
  activeEmployees: number;
  activities: Activity[];
}

// ============================================
// FILTER TYPES
// ============================================

export interface TimeReportFilters {
  projectId: string;
  startDate?: string;
  endDate?: string;
  employeeId?: string;
  activityId?: string;
}

export interface DateRange {
  start: string;
  end: string;
}
