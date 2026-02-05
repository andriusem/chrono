# Chrono Frontend Documentation

> **UI/UX Prototype** for the Chrono Time Tracking Application
>
> **Last updated:** 2026-02-05

---

## Overview

This frontend is a **stakeholder demonstration prototype** implementing the complete UI/UX for the Chrono time tracking application. It uses mock data and localStorage persistence to simulate full functionality without a backend.

**Current UI state:** The Classic (Odoo-style) UI is the active interface. The Modern UI has been archived under `src/archived/modern` for optional local use.

### Embedded CSV Data (Objective Allocations)

The prototype embeds a CSV-derived dataset from:

`chrono/docs/Objectif repartition des tâches.csv`

The one-time conversion script lives at:

`frontend/scripts/convert_objectif_csv.cjs`

It generates:

`frontend/src/data/objectifData.ts`

This file contains the projects, activities, and per-role allocations used by the UI. The runtime app does **not** parse CSV.

### Key Features Implemented

| Feature | Description |
|---------|-------------|
| **Timer-based Tracking** | Click activity tiles to start/stop timers with live elapsed time |
| **Single-timer Rule** | Only one timer can run at a time (enforced in store) |
| **Project Filtering** | Employees see only assigned projects |
| **Attendance** | Clock-in/clock-out submission with validation |
| **PM Dashboard** | Project management, activity creation, team assignment |
| **Time Reports** | Filterable, sortable time entry tables |
| **Allocated Hours** | Project/activity budgets with remaining time indicators |
| **Role Allocations** | CSV-derived allocations per role with project summary |
| **Responsive Design** | Supports 400px to 1920px screen widths |

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2 | UI framework |
| **TypeScript** | 5.9 | Type safety |
| **Vite** | 7.2 | Build tool & dev server |
| **Tailwind CSS** | 4.1 | Utility-first styling |
| **shadcn/ui** | - | Pre-built accessible components |
| **Zustand** | 5.0 | State management with persistence |
| **React Router** | 7.13 | Client-side routing |
| **Lucide React** | 0.563 | Icon library |
| **date-fns** | 4.1 | Date manipulation |
| **Sonner** | 2.0 | Toast notifications |

---

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx              # Classic (Odoo-style) router
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles & Tailwind imports
│   │
│   ├── archived/modern/     # Archived Modern UI (optional local use)
│   │   ├── App.modern.tsx
│   │   ├── pages/
│   │   └── components/
│   │
│   ├── components/
│   │   ├── modals/          # Dialog components (shared)
│   │   ├── odoo-style/      # Classic UI components
│   │   └── ui/              # shadcn/ui components
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx       # Classic login
│   │   └── odoo-style/         # Classic dashboards
│   │
│   ├── store/               # Zustand stores (localStorage persisted)
│   │   ├── authStore.ts           # Current user & login state
│   │   ├── projectStore.ts        # Projects, activities, assignments
│   │   ├── timeEntryStore.ts      # Time entries & timer logic
│   │   └── attendanceStore.ts     # Attendance records
│   │
│   ├── hooks/
│   │   ├── useAuth.ts       # Auth convenience hook
│   │   └── useTimer.ts      # Live timer display (updates every second)
│   │
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   │
│   ├── data/
│   │   ├── mockData.ts      # Mock users, project assignments, entries
│   │   └── objectifData.ts  # CSV-derived projects, activities, allocations
│   │
│   └── lib/
│       ├── utils.ts         # cn() utility for class merging
│       └── formatters.ts    # Time/duration formatting helpers
│
├── scripts/
│   └── convert_objectif_csv.cjs  # One-time CSV -> TS data generator
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── components.json          # shadcn/ui configuration
```

---

## State Management

### Zustand Stores

All stores use `persist` middleware to save state to localStorage, allowing the prototype to maintain state across page refreshes.

#### 1. `authStore` (`chrono-auth`)

```typescript
interface AuthState {
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
  switchRole: (role: Role) => void;  // Demo feature
}
```

#### 2. `projectStore` (`chrono-projects`)

```typescript
interface ProjectState {
  projects: Project[];
  activities: Activity[];
  assignments: ProjectAssignment[];
  allocations: ActivityAllocation[];
  
  // Actions
  createProject, updateProject, archiveProject, restoreProject
  createActivity, updateActivity, archiveActivity
  assignEmployee, unassignEmployee
  
  // Queries
  getProjectById, getActivitiesForProject, getProjectsForUser
  getAssignedEmployeeIds, isUserAssignedToProject
  getAllocationsForActivity, getAllocationsForRole
}
```

**Role allocation types:**
- `EmployeeRole` is a union of the six normalized roles used in the CSV dataset.
- `ActivityAllocation` links an `activityId` to a role and allocated hours.

#### 3. `timeEntryStore` (`chrono-time-entries`)

```typescript
interface TimeEntryState {
  entries: TimeEntry[];
  
  // Timer actions (enforce single-timer rule)
  startTimer: (userId, activityId, projectId) => { success, error?, entryId? }
  pauseTimer: (entryId) => void
  resumeTimer: (entryId) => { success, error? }
  finishTimer: (entryId, comments?) => void
  
  // CRUD
  updateEntry, deleteEntry (soft delete)
  updateHeartbeat
  
  // Queries
  getRunningTimer, getEntriesForUser, getEntriesForProject
  getTodayMinutesForActivity
}
```

#### 4. `attendanceStore` (`chrono-attendance`)

```typescript
interface AttendanceState {
  records: Attendance[];
  
  upsertAttendance: (userId, date, clockIn?, clockOut?) => { success, error? }
  deleteAttendance: (id, deletedById) => void
  
  getAttendanceForUser: (userId, date?) => Attendance[]
  getTodayAttendance: (userId) => Attendance | undefined
}
```

---

## Routing

```
/login              → LoginPage (public)
/                   → DashboardRouter (protected)
                      ├─ PM → OdooPMDashboard
                      └─ Employee → OdooEmployeeDashboard
```

**Route Guards:**
- `ProtectedRoute` - Redirects to `/login` if not authenticated
- `DashboardRouter` - Routes to correct dashboard based on user role

**Archived Modern UI:** routes for the modern prototype live in `src/archived/modern/App.modern.tsx`.

**Quick actions:** both dashboards include header actions to switch between PM/Employee views and to sign out (returning to `/login`).

---

## Key Components

**Note:** The components below live in the archived Modern UI (`src/archived/modern`) and are kept for optional local use.

### ActivityTile

Row-based interaction component for time tracking.

```typescript
interface ActivityTileProps {
  activity: Activity;
  todayMinutes: number;
  runningEntry?: TimeEntry;
  onClick: () => void;
  disabled?: boolean;
}
```

**Layout:** Color indicator | Activity name | Today's time | Timer/Status | Action button

**Visual States:**
- **Idle** - Play icon, muted background
- **Running** - Primary ring, live timer display, stop icon, pulsing indicator
- **Paused** - Amber ring/background, "Paused" text, play icon

### useTimer Hook

Provides live elapsed time updates for running timers.

```typescript
function useTimer({ startTime, isRunning }): {
  elapsedSeconds: number;
  formattedTime: string;  // "HH:MM:SS"
}
```

Updates every second when `isRunning` is true.

### WeeklyMonthlyLog

Displays completed time entries grouped by day with week/month tab views.

```typescript
interface WeeklyMonthlyLogProps {
  entries: TimeEntry[];
  activities: Activity[];
  projects: Project[];
}
```

**Features:**
- **Tab switching** - Week view (Mon-Sun) and Month view
- **Grouped by day** - Entries organized under date headers (most recent first)
- **Duration totals** - Per-day totals in header badges, overall totals in tab labels
- **Entry details** - Activity color, name, project, time range, duration, comments
- **Excludes running timers** - Only shows completed entries

### HeaderAttendance

Compact clock-in/clock-out display in the header for employees.

**Features:**
- **Employee-only** - Renders nothing for PM role
- **Inline display** - Shows clock-in and clock-out times with icons
- **Quick edit** - Clicking opens AttendanceModal for editing
- **Empty state** - Shows `--:--` badges when times not set

### CurrentActivityCard

Displays running activity details with inline comment editing.

```typescript
interface CurrentActivityCardProps {
  runningEntry?: TimeEntry;
  activity?: Activity;
  project?: Project;
  onUpdateComments: (entryId: string, comments: string) => void;
}
```

**Features:**
- **Empty state** - "No activity running" message when idle
- **Activity info** - Name, start time, project name
- **Comment editor** - Textarea with auto-save (1s debounce)
- **Save indicator** - Shows "Saving..." during auto-save

---

## Mock Data

Located in `src/data/mockData.ts`:

| Entity | Count | Details |
|--------|-------|---------|
| **Users** | 4 | 1 PM (Alice), 3 employees (John, Sarah, Mike) |
| **Projects** | 3 | Website Redesign, Mobile App, Marketing Campaign |
| **Activities** | 15 | 5 per project, with distinct colors |
| **Time Entries** | 9 | Including 1 running timer for John |
| **Attendance** | 4 | Sample records for today/yesterday |
| **Assignments** | 5 | Various employee-project mappings |

**Helper Functions:**
- `getUserById(id)`
- `getProjectById(id)`
- `getActivityById(id)`
- `getProjectsForUser(userId)`
- `getActivitiesForProject(projectId)`
- `getEmployeesForProject(projectId)`

---

## Type Definitions

Located in `src/types/index.ts`:

```typescript
// Core types
type Role = 'employee' | 'pm';
type ProjectStatus = 'active' | 'archived';
type TimerStatus = 'running' | 'paused' | 'completed' | 'interrupted';

// Entities
interface User { id, email, displayName, avatarUrl?, role, isActive }
interface Project { id, name, description, status, createdAt, createdById }
interface Activity { id, name, projectId, color, isArchived }
interface TimeEntry { id, userId, activityId, projectId, startTime, endTime?, 
                      durationMinutes?, status, comments?, isDeleted, ... }
interface Attendance { id, userId, date, clockInTime?, clockOutTime?, isDeleted, ... }
interface ProjectAssignment { projectId, userId, assignedById, assignedAt }

// Extended types for UI
interface ActivityWithStats extends Activity { todayMinutes, project }
interface TimeEntryWithDetails extends TimeEntry { activity, project, user }
interface ProjectWithStats extends Project { totalHoursThisWeek, activeEmployees, activities }

// Filter types
interface TimeReportFilters { projectId, startDate?, endDate?, employeeId?, activityId? }
```

---

## Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## Business Rules Enforced

### 1. Single Timer Rule
```typescript
// In timeEntryStore.startTimer():
const runningTimer = entries.find(e => e.userId === userId && e.status === 'running');
if (runningTimer) {
  return { success: false, error: 'You already have a timer running.' };
}
```

### 2. Paused Timer Blocking
```typescript
const pausedTimer = entries.find(e => e.userId === userId && e.status === 'paused');
if (pausedTimer) {
  return { success: false, error: 'You have a paused timer. Finish or resume it first.' };
}
```

### 3. Project Assignment Filtering
```typescript
// Employees only see assigned projects
const assignedProjectIds = assignments
  .filter(a => a.userId === userId)
  .map(a => a.projectId);
return projects.filter(p => assignedProjectIds.includes(p.id) && p.status === 'active');
```

### 4. Soft Delete
All delete operations set `isDeleted = true` rather than removing records.

### 5. Attendance Validation
Clock-out time must be >= clock-in time.

### 6. Minimum Entry Duration
Time entries must be at least **15 minutes** long.

---

## UI Components (shadcn/ui)

Pre-built accessible components in `src/components/ui/`:

| Component | Usage |
|-----------|-------|
| `Avatar` | User profile images |
| `Badge` | Status indicators |
| `Button` | All buttons with variants |
| `Card` | Content containers |
| `Dialog` | Modal windows |
| `DropdownMenu` | User menu, actions menu |
| `Input` | Form inputs |
| `Label` | Form labels |
| `ScrollArea` | Scrollable containers |
| `Select` | Dropdown selects |
| `Separator` | Visual dividers |
| `Switch` | Toggle switches |
| `Table` | Data tables |
| `Tabs` | Tab navigation |
| `Textarea` | Multi-line inputs |
| `Sonner` | Toast notifications |

---

## Responsive Breakpoints

Designed for these screen widths:
- **Mobile:** 400px - 640px
- **Tablet:** 640px - 1024px  
- **Desktop:** 1024px - 1920px

Activity grid adapts columns:
- 1 column on mobile
- 2-3 columns on tablet
- 4+ columns on desktop

---

## Future Integration Points

When connecting to the real backend API:

1. **Replace mock data imports** with API service calls
2. **Update stores** to use `async` actions with API calls
3. **Add error handling** for network failures
4. **Implement real authentication** via Microsoft Entra ID
5. **Add heartbeat mechanism** (30-second interval POST to `/time-entries/{id}/heartbeat`)
6. **Connect toast notifications** to API responses

---

## Development Notes

- **No backend required** - Prototype runs entirely client-side
- **State persists** in localStorage across refreshes
- **Reset state** by clearing localStorage keys: `chrono-auth`, `chrono-projects`, `chrono-time-entries`, `chrono-attendance`
- **Switch roles** via user menu dropdown (demo feature, archived Modern UI only)
- **Path aliases** configured: `@/` maps to `src/`
