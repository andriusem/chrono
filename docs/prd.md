# Product Requirements Document (PRD)

## Time Tracking Application

**Version:** 1.0
**Last Updated:** January 27, 2026
**Inspired by:** Odoo Projects & Timesheets modules

---

## 1. Executive Summary

A custom time tracking application for a small organization (1-20 users) that enables employees to track time spent on project activities using a timer-based system, while also recording daily attendance. The application will be hosted on Microsoft Azure and integrated with Microsoft Teams.

---

## 2. Project Structure

### Hierarchy

```
PROJECTS (read-only for employees)
    └── ACTIVITIES (read-only for employees)
            └── TASKS (managed separately, comments field for MVP)
```

### Access Levels

| Level | Projects | Activities | Tasks/Comments |
|-------|----------|------------|----------------|
| **Project Manager (PM)** | Create, Edit, Delete | Create, Edit, Delete | Assign to employees |
| **Employee** | View only | View only | Write comments, cannot assign to others |

---

## 3. Core Features

### 3.1 Timer-Based Time Tracking (MVP)

**Description:** Employees track time by clicking on activity tiles rather than manually entering hours.

**Requirements:**
- When employee clicks an activity tile, prompt: "Are you ready to start this activity?"
- If confirmed, timer starts running in background
- Activity tile displays visual indicator showing "in progress" state
- Running timer shows elapsed time on the tile
- When employee clicks the active tile again, prompt: "Do you want to pause or finish this activity?"
- On pause: Timer stops, can be resumed later
- On finish: Timer stops, entry is completed
- Comments field appears when pausing or finishing for employee to describe work done

**Unexpected Exit Handling:**
- Timer saves state to database every 30 seconds
- On unexpected exit (browser close, internet loss, crash): Save last known time
- Employee can manually edit time later if needed

### 3.2 Clock-in/Clock-out System (MVP)

**Description:** Separate system from activity tracking to record employee office presence.

**Requirements:**
- Separate screen/section for attendance submission
- Employee submits arrival time and departure time
- Does NOT need to be submitted in real-time (can submit by end of day)
- Employee is prompted/reminded to submit attendance if not submitted by end of day
- Clock-in/Clock-out is independent from activity time tracking

### 3.3 Manual Time Editing (MVP)

**Description:** Ability to correct or adjust logged time entries.

**Requirements:**
- Employees can edit their own time entries
- Can adjust start time, end time, duration
- Can edit comments
- Edit history should be preserved (for audit purposes in v2.0)

### 3.4 Timesheet Validation by PM (Version 2.0)

**Description:** Project Managers review and approve employee timesheets.

**Requirements:**
- PM can view all time entries for their projects
- PM can approve or reject time entries
- Rejected entries return to employee for correction
- Approval workflow with status tracking

### 3.5 Reporting (Version 2.0)

**Description:** Reports and analytics on time spent.

**Report Types:**
- **By Employee:** Total hours per employee, breakdown by project/activity
- **By Project:** Total hours per project, breakdown by employee/activity
- **By Activity:** Total hours per activity type across all projects

**Requirements:**
- Filterable by date range
- Export to CSV
- Visual dashboards (charts/graphs)

---

## 4. User Workflows

### 4.1 PM Workflow

```
1. PM logs into application
2. PM creates a new Project
3. PM adds Activities to the project (Communication, Planning, Development, etc.)
4. PM assigns tasks/activities to specific employees
5. PM views time reports for their projects
6. (v2.0) PM approves/rejects submitted timesheets
```

**Key Rules:**
- Only PM can create/edit projects and activities
- Only PM can allocate tasks to employees
- Employees cannot assign tasks to other employees

### 4.2 Employee Workflow

```
1. Employee logs in (with Microsoft work account)
2. Employee sees their dashboard with assigned projects
3. Employee selects a project from dropdown
4. Employee sees activity tiles for that project
5. Employee clicks an activity tile
6. System prompts: "Ready to start?"
7. Employee confirms, timer starts
8. Activity tile shows "in progress" indicator with running timer
9. Employee works on the task
10. Employee clicks the active tile again
11. System prompts: "Pause or Finish?"
12. Employee adds comment describing work done
13. Employee chooses Pause (can resume) or Finish (completes entry)
14. At end of day, employee submits clock-in/clock-out times
```

### 4.3 End of Day/Week Notifications

**Requirements:**
- System sends notification at end of day if attendance not submitted
- System sends notification at end of period (configurable: daily or weekly) to review logged hours
- Notifications should work in browser and Microsoft Teams

---

## 5. User Interface Requirements

### 5.1 General UI/UX

- Similar look and feel to Odoo
- Clean, modern interface
- Mobile-responsive design
- Works in web browser and Microsoft Teams

### 5.2 Activity Tiles

**Requirements:**
- Grid/card layout showing all activities for selected project
- Each tile displays:
  - Activity name
  - Icon or color indicator
  - Hours logged today
  - Visual indicator if currently active (running)
  - Running timer display when active
- Clicking tile triggers start/stop prompts

### 5.3 Project View (PM)

**Columns to display:**
- Date
- Employee name
- Activity
- Time spent
- Comments

**Features:**
- Sortable columns
- Filterable by date range, employee, activity
- Export functionality

### 5.4 Global View (Future/Maybe)

- Overview of time spent across all projects
- Breakdown by project and activity
- For management reporting purposes

---

## 6. Technical Requirements

### 6.1 Platform

- **Hosting:** Microsoft Azure
- **Database:** Azure SQL Database
- **Authentication:** Microsoft Entra ID (Azure AD)
- **Frontend:** Web application (React)
- **Backend:** REST API (Python FastAPI)

### 6.2 Integration

- **Microsoft Teams:** Embed as Teams tab application
- **Monday.com:** Not required for MVP (future consideration)

### 6.3 Data Storage

All data stored in Microsoft ecosystem (Azure SQL Database).

### 6.4 Security

- Users authenticate with Microsoft work accounts
- Role-based access control (PM vs Employee)
- Data encrypted at rest and in transit
- Audit logging for time entry modifications

---

## 7. Feature Prioritization

### MVP (Version 1.0)

| Priority | Feature | Description |
|----------|---------|-------------|
| P0 | Authentication | Microsoft login |
| P0 | Project/Activity Management | PM creates projects and activities |
| P0 | Timer-based Tracking | Start/pause/stop on activity tiles |
| P0 | Comments | Add notes when finishing activity |
| P1 | Clock-in/Clock-out | Daily attendance submission |
| P1 | Manual Time Edit | Correct logged entries |
| P1 | Basic PM View | See time entries for projects |
| P2 | Teams Integration | Embed in Microsoft Teams |
| P2 | End-of-day Reminders | Notifications for attendance |

### Version 2.0

| Priority | Feature | Description |
|----------|---------|-------------|
| P0 | Timesheet Validation | PM approval workflow |
| P0 | Reporting | By employee, project, activity |
| P0 | Monday.com Integration | Auto-sync projects/tasks, update status on completion |
| P1 | Dashboard | Visual charts and analytics |
| P1 | Export | CSV export for reports |
| P2 | Audit Trail | History of time entry changes |
| P2 | Minimum Time Entry | Optional setting to require minimum duration |

---

## 8. Business Rules

### 8.1 Timer Rules

- **Single Activity Only:** An employee can only have ONE active timer running at a time
- If employee tries to start a new activity while another is running, prompt them to stop/pause the current one first
- **No Minimum Duration:** No minimum time entry requirement for MVP (consider for v2.0)

### 8.2 Time Entry Editing Rules

- **Before Validation:** Employees can edit their time entries freely (no time limit)
- **After PM Validation:** Time entries are LOCKED and cannot be edited by employees
- If correction needed after validation, employee must request PM to unlock or adjust

### 8.3 Reminder Schedule

End-of-day reminders for attendance submission are sent at different times depending on the day:

| Day | Reminder Time |
|-----|---------------|
| Monday | 5:00 PM |
| Tuesday | 4:00 PM |
| Wednesday | 4:00 PM |
| Thursday | 5:00 PM |
| Friday | 1:00 PM |

---

## 9. Monday.com Integration (Version 2.0)

### Overview
Integration with Monday.com to sync tasks and update their status.

### Requirements

**Auto-sync approach:**
- App automatically imports projects from Monday.com boards
- Activities are created from Monday.com groups within boards
- Tasks are pulled from Monday.com items within groups
- When employee completes a task, status is updated in Monday.com

**Data Flow:**
```
MONDAY.COM                         YOUR APP
───────────────────────────────────────────────────
Board        ─────sync────▶       Project
  └── Group  ─────sync────▶         └── Activity
        └── Item ───sync───▶              └── Task
              └── Status ◀──update──         └── Complete
```

**Sync Behavior:**
- Projects/Activities sync from Monday.com → App (one-way import)
- Task status syncs App → Monday.com (when marked complete)
- Sync frequency: On-demand or periodic (e.g., every 15 minutes)

**Technical Requirements:**
- Monday.com API token (created by admin)
- GraphQL queries to read boards, groups, items
- GraphQL mutations to update item status
- Mapping stored in database to track synced items

### Not Included in Version 2.0
- Creating new tasks from the app (tasks created in Monday.com only)
- Two-way sync of task details (only status updates)
- Real-time webhooks (use polling instead for simplicity)

---

## 10. Open Questions

(None at this time - all questions resolved)

---

## 11. Success Metrics

- **Adoption:** 100% of team using the application within 1 month
- **Accuracy:** Reduction in missed time entries compared to manual tracking
- **Efficiency:** Time to log daily hours reduced by 50%
- **Compliance:** 95% attendance submission rate by end of day

---

## 12. Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **Project** | A container for related work activities (e.g., "Website Redesign") |
| **Activity** | A type of work within a project (e.g., "Communication", "Development") |
| **Time Entry** | A single record of time spent on an activity |
| **Attendance** | Record of employee clock-in and clock-out times |
| **PM** | Project Manager - has admin rights to create projects and view all data |

### B. Reference

- Inspired by Odoo 19.0 Projects and Timesheets modules
- Odoo License: LGPL (allows using ideas and concepts)
