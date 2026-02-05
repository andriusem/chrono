# Classic (Odoo-Style) UI Documentation

This document describes the Classic UI variant for Chrono, inspired by Odoo's Timesheets and Projects modules.

## Overview

Chrono now ships with the Classic (Odoo-style) UI as the active interface. The Modern UI has been archived at `src/archived/modern` for optional local use.

| Feature | Modern UI | Classic (Odoo-style) UI |
|---------|-----------|------------------------|
| Layout | Card-based with sidebar | Table-based, full-width |
| Editing | Modal dialogs | Inline editing in tables |
| Views | Single view | Multiple views (List, Kanban, Grid) |
| Filters | Minimal | Full filter bar with presets |
| Aesthetic | Contemporary, rounded | Clean, functional, enterprise |

## Color Scheme

The Classic UI uses colors inspired by [ileya.fr](https://ileya.fr), a Guadeloupe-based NGO:

| Color | Hex Code | Usage |
|-------|----------|-------|
| Black | `#000000` | Primary text, headings |
| White | `#ffffff` | Backgrounds, cards |
| **Golden** | `#ffab00` | Accent, buttons, active states |
| Golden Hover | `#e69500` | Button hover states |
| Gray 100-800 | `#f8f9fa` - `#343a40` | Borders, muted text, surfaces |

### Status Colors
- **Success (Green)**: `#28a745` - Completed entries
- **Warning (Amber)**: `#ffc107` - Paused timers
- **Danger (Red)**: `#dc3545` - Errors, delete actions
- **Info (Teal)**: `#17a2b8` - Information badges

## File Structure

```
frontend/src/
├── archived/modern/               # Archived Modern UI (optional local use)
│   ├── App.modern.tsx
│   ├── pages/
│   └── components/
├── components/odoo-style/
│   ├── shared/                    # Shared Odoo-style components
│   │   ├── ViewSwitcher.tsx       # List/Kanban/Calendar toggle
│   │   ├── FilterBar.tsx          # Search + filter buttons
│   │   ├── StatusBar.tsx          # Workflow stage indicator
│   │   ├── StatButton.tsx         # Metric display buttons
│   │   ├── OdooHeader.tsx         # Page header with breadcrumbs
│   │   └── index.ts
│   │
│   ├── timesheet/                 # Employee timesheet views
│   │   ├── TimesheetListView.tsx  # Editable table view
│   │   ├── TimesheetKanbanView.tsx # Activity cards view
│   │   ├── TimesheetGridView.tsx  # Weekly calendar grid view
│   │   ├── WeekNavigator.tsx      # Week navigation controls
│   │   └── index.ts
│   │
│   └── project/                   # PM project views
│       ├── ProjectListView.tsx    # Project table with stats
│       ├── ProjectFormView.tsx    # Project detail form
│       └── index.ts
│
└── pages/odoo-style/
    ├── OdooEmployeeDashboard.tsx  # Main employee view
    ├── OdooPMDashboard.tsx        # PM project management
    └── index.ts
```

## Components Reference

### Shared Components

#### ViewSwitcher
Toggles between List, Kanban, and Calendar views (Odoo-style icons).

```tsx
<ViewSwitcher
  currentView="list"
  onViewChange={(view) => setView(view)}
  availableViews={['list', 'kanban']}
/>
```

#### FilterBar
Search input with preset filter buttons and Group By dropdown.

```tsx
<FilterBar
  searchPlaceholder="Search entries..."
  searchValue={query}
  onSearchChange={setQuery}
  filters={[
    { id: 'today', label: 'Today', isActive: true },
    { id: 'my_entries', label: 'My Entries', isActive: false },
  ]}
  onFilterToggle={(id) => toggleFilter(id)}
  groupByOptions={[
    { id: 'date', label: 'Date' },
    { id: 'project', label: 'Project' },
  ]}
  currentGroupBy="date"
  onGroupByChange={(id) => setGroupBy(id)}
/>
```

#### StatusBar
Visual workflow stages with clickable steps.

```tsx
<StatusBar
  stages={[
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived' },
  ]}
  currentStage="active"
  onStageClick={(id) => changeStatus(id)}
/>
```

#### StatButton
Metric display following Odoo's stat button pattern.

```tsx
<StatButton
  value="6h 30m"
  label="Today"
  icon={Clock}
  variant="info"
/>
```

#### OdooHeader
Page header with breadcrumbs, title, actions, view switcher, and clock in/out.

**Features:**
- **Fixed/sticky** header that stays at top when scrolling
- **Clock in/out display** for employees (click to edit via modal)
- Breadcrumbs navigation
- Primary and secondary actions
- View mode switcher

```tsx
<OdooHeader
  title="My Timesheets"
  breadcrumbs={[{ label: 'Timesheets' }]}
  primaryAction={{
    label: 'New Entry',
    onClick: () => createEntry(),
  }}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
>
  <FilterBar {...filterProps} />
</OdooHeader>
```

### Timesheet Components

#### TimesheetListView
Editable table showing time entries with inline editing.

**Features:**
- Click on comments to edit inline
- Play/Stop buttons for each row
- Grouping by Date, Project, or Activity
- Sum footer showing total hours
- Row decorations (muted for deleted, highlighted for running)

```tsx
<TimesheetListView
  entries={entries}
  groupBy="date"
  onStartTimer={(activityId, projectId) => start(activityId, projectId)}
  onStopTimer={(entryId, comments) => stop(entryId, comments)}
  onDeleteEntry={(entryId) => deleteEntry(entryId)}
/>
```

#### TimesheetKanbanView
Card-based view with 3-column drag-and-drop Kanban board.

**Features:**
- Three fixed columns: **To Do**, **In Progress**, **Done**
- Drag-and-drop cards between columns (native HTML5)
- Activity cards with color coding
- Live timer display when running
- Today's total duration per activity
- Start/Stop buttons on each card

```tsx
<TimesheetKanbanView
  activities={activities}
  project={selectedProject}
  onStartTimer={(activityId) => start(activityId)}
  onStopTimer={(entryId, comments) => stop(entryId, comments)}
/>
```

**Kanban Columns:**

---

## Project Form View

`ProjectFormView` (PM) includes budget and allocation insights:

- **Project budget stat buttons**: Spent, Allocated, Remaining.
- **Activity budgets**: Inline allocated hours with remaining indicators.
- **Allocation par rôle** summary: Per-role allocated hours for the current project (derived from CSV allocations).
| Column | Status Value | Description |
|--------|--------------|-------------|
| To Do | `todo` | Activities not yet started |
| In Progress | `in_progress` | Active work items |
| Done | `done` | Completed activities |

#### TimesheetGridView
Weekly calendar grid view (Odoo-style timesheet grid).

**Features:**
- Week navigation (Today button, prev/next arrows)
- Rows = Project + Activity combinations
- Columns = 7 days (Monday to Sunday)
- Editable hour cells (click to edit, Enter to save)
- Today's column highlighted with accent color
- Row totals (Hours column)
- Column totals in footer
- "Add a line" to add new project/activity rows
- Direct time entry by clicking empty cells

```tsx
<TimesheetGridView
  onStartTimer={(activityId, projectId) => start(activityId, projectId)}
/>
```

#### WeekNavigator
Week navigation controls for the grid view.

```tsx
<WeekNavigator
  currentWeekStart={weekStart}
  onWeekChange={(newWeekStart) => setWeekStart(newWeekStart)}
/>
```

### Project Components

#### ProjectListView
Table showing projects with statistics.

**Features:**
- Hours this week per project
- Team size and activity count
- Archive/Restore actions
- Supports grouping by **date**, **activity**, or **employee** (via FilterBar)
- Sum footer with totals

```tsx
<ProjectListView
  projects={projects}
  onProjectClick={(id) => selectProject(id)}
  onArchive={(id) => archiveProject(id)}
  onRestore={(id) => restoreProject(id)}
  onSettings={(id) => openSettings(id)}
  groupBy={groupBy}
/>
```

#### ProjectFormView
Detailed project view with tabbed interface.

**Features:**
- Status bar (Active/Archived)
- Stat buttons (Total Hours, Team Size, Activities)
- Notebook tabs: Activities, Team, Settings
- Add/remove activities inline
- Team member assignment

```tsx
<ProjectFormView
  project={project}
  onBack={() => goBack()}
  onStatusChange={(status) => updateStatus(status)}
/>
```

## Pages

### OdooPMDashboard
PM project management view with Odoo-style filters and project list grouping.

**Features:**
- Search + Active/Archived filters
- Group by **Date**, **Activity**, or **Employee**
- Grouped project list in `ProjectListView`

```tsx
<OdooHeader title="Projects" breadcrumbs={[{ label: 'Projects' }]}> 
  <FilterBar
    searchPlaceholder="Search projects..."
    searchValue={searchQuery}
    onSearchChange={setSearchQuery}
    filters={filters}
    onFilterToggle={handleFilterToggle}
    groupByOptions={[
      { id: 'date', label: 'Date' },
      { id: 'activity', label: 'Activity' },
      { id: 'employee', label: 'Employee' },
    ]}
    currentGroupBy={groupBy}
    onGroupByChange={setGroupBy}
  />
</OdooHeader>

<ProjectListView
  projects={filteredProjects}
  onProjectClick={setSelectedProjectId}
  onArchive={archiveProject}
  onRestore={restoreProject}
  onSettings={setSelectedProjectId}
  groupBy={groupBy}
/>
```

## CSS Classes

All Odoo-style components use CSS custom properties and utility classes defined in `index.css`:

### Layout Classes
- `.odoo-page` - Gray background page wrapper
- `.odoo-sheet` - White card with border and shadow
- `.odoo-header` - Page header with border
- `.odoo-header-fixed` - Sticky header with shadow
- `.odoo-attendance-btn` - Clock in/out button styling

### Button Classes
- `.odoo-btn` - Base button style
- `.odoo-btn-primary` - Golden primary button
- `.odoo-filter-btn` - Filter toggle button

### Table Classes
- `.odoo-table` - Full-width table with styling
- `.odoo-table th` - Gray header row
- `.odoo-table tr.odoo-row-muted` - Muted/deleted row
- `.odoo-table tr.odoo-row-selected` - Selected row

### Badge Classes
- `.odoo-badge` - Base badge style
- `.odoo-badge-success` - Green badge
- `.odoo-badge-warning` - Amber badge
- `.odoo-badge-danger` - Red badge

### Form Classes
- `.odoo-form-group` - Two-column form layout
- `.odoo-form-field` - Field wrapper
- `.odoo-form-label` - Field label
- `.odoo-form-input` - Input/select styling
- `.odoo-inline-edit` - Inline editable cell

### Timer Classes
- `.odoo-timer-display` - Monospace timer font
- `.odoo-timer-running` - Pulsing animation

## Mock Data (NGO Context)

The mock data reflects an NGO/nonprofit context inspired by ileya.fr:

### Users
- **Marie Laurent** (Coordinator/PM)
- **Jean-Baptiste Morel** (Field Worker)
- **Camille Duval** (Program Assistant)
- **Thomas Martin** (Educator)

### Projects
1. **Community Outreach Program** - Field visits and social support
2. **Youth Education Initiative** - Workshops and mentoring
3. **Cultural Heritage Festival 2026** - Event planning
4. **Grant Reporting Q1 2026** - Documentation and reporting

### Activities
- Field Work, Home Visits, Case Documentation
- Workshop Facilitation, Mentoring Sessions
- Event Planning, Volunteer Coordination
- Report Writing, Data Collection

## Business Rules

### Clock-In Required Before Activities
Employees must clock in before they can start tracking time on any activity.

- If an employee tries to start a timer without clocking in, a modal prompts them
- Clicking "Clock In Now" opens the attendance modal
- After clocking in, the employee can start tracking time

```tsx
// Enforced in OdooEmployeeDashboard.handleStartTimer()
if (!isClockedIn) {
  setShowClockInModal(true);
  return;
}
```

## Design Principles

The Classic UI follows these Odoo-inspired design principles:

1. **Progressive Disclosure** - Show essential info in lists, details in forms
2. **Density** - Compact but readable layouts
3. **Inline Actions** - Edit directly in tables without opening modals
4. **Visual Feedback** - Clear status badges and row decorations
5. **Functional Aesthetic** - Clean and professional over decorative
6. **Accessibility** - High contrast, clear typography

## Differences from Odoo

While inspired by Odoo, this implementation differs in some ways:

| Odoo | Chrono Classic |
|------|----------------|
| XML view definitions | React components |
| Server-rendered | Client-side SPA |
| Full ERP integration | Standalone time tracking |
| Complex permissions | Simple role-based (PM/Employee) |
| Multi-company | Single organization |

## Future Enhancements

Potential additions for the Classic UI:
- Calendar view for time entries
- Pivot table view for reporting
- Drag-and-drop between kanban columns
- Bulk edit operations
- Export to CSV/Excel
