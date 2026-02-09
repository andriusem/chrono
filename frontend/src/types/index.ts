// ============================================
// CHRONO TYPE DEFINITIONS
// ============================================
// These types define the structure of all data in the application.
// They match the data model from docs/mvp.md

// ============================================
// USER TYPES
// ============================================

export type Role = 'employee' | 'pm';

export type EmployeeRole =
  | 'Directrice'
  | 'Responsable du développement du projet associatif'
  | 'Chargé du développement financier et associatf'
  | "Chargée d'accompagnement social"
  | 'Médiatrice Sociale'
  | 'Conseillère numérique'
  | "Chargé d'innovation numérique et digitale";

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: Role;
  jobTitle?: EmployeeRole;
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
  allocatedHours?: number; // Planned time budget for the project (hours)
}

// ============================================
// DOMAIN / TEMPLATE TYPES
// ============================================

export interface DomainTemplate {
  id: string;
  name: string;
  displayOrder: number;
  isGeneral: boolean;
}

export interface ActivityTemplate {
  id: string;
  domainTemplateId: string;
  name: string;
  displayOrder: number;
}

export interface ProjectDomain {
  id: string;
  projectId: string;
  domainTemplateId: string;
  displayOrder: number;
}

export interface ProjectActivity {
  id: string;
  projectId: string;
  projectDomainId: string;
  name: string;
  sourceActivityTemplateId?: string;
  isHidden: boolean;
  kanbanStatusDefault?: TaskStatus;
  color?: string;
  allocatedHours?: number;
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
  allocatedHours?: number; // Planned time budget for the activity (hours)
}

// ============================================
// TASK TYPES
// ============================================

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly';

export interface RecurrenceRule {
  frequency: RecurrenceFrequency;
  interval: number;
  anchorDueDate: string; // ISO date YYYY-MM-DD
  enabled: boolean;
}

export type TaskEventType =
  | 'task_created'
  | 'task_claimed'
  | 'task_reassigned'
  | 'task_started'
  | 'task_stopped'
  | 'task_finished'
  | 'heartbeat_timeout'
  | 'attendance_reconciled';

export interface Task {
  id: string;
  projectId: string;
  projectDomainId: string;
  projectActivityId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeUserId?: string;
  createdByUserId: string;
  urgency: number; // 1..5
  importance: number; // 1..5
  priorityScore: number;
  dueDate: string; // ISO date YYYY-MM-DD
  isRecurring: boolean;
  recurrenceRule?: RecurrenceRule;
  parentRecurringTaskId?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface TaskEvent {
  id: string;
  taskId: string;
  eventType: TaskEventType;
  actorUserId: string;
  timestamp: string;
  metadata?: Record<string, string | number | boolean | null>;
}

// ============================================
// ALLOCATION TYPES
// ============================================

export interface ActivityAllocation {
  activityId: string;
  role: EmployeeRole;
  allocatedHours: number;
}

// ============================================
// TIME ENTRY TYPES
// ============================================

export type TimerStatus = 'running' | 'paused' | 'completed' | 'interrupted';

export type TimeEntryStopReason =
  | 'manual_stop'
  | 'manual_finish'
  | 'heartbeat_timeout'
  | 'heartbeat_declined';

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  activityId: string;
  projectId: string; // Denormalized for easier queries
  projectDomainId?: string; // Denormalized for domain filtering
  projectActivityId?: string; // Denormalized for activity filtering
  startTime: string; // ISO date-time string
  endTime?: string; // Undefined while running
  durationMinutes?: number; // Calculated when completed
  status: TimerStatus;
  stopReason?: TimeEntryStopReason;
  comments?: string;
  isDeleted: boolean;
  deletedAt?: string;
  deletedById?: string;
  lastHeartbeat?: string; // For detecting interrupted timers
  lastHeartbeatPromptAt?: string;
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
