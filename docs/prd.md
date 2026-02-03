# Product Requirements Document (PRD)

## Chrono - Time Tracking Application

**Version:** 1.2
**Last Updated:** January 29, 2026
**Inspired by:** Odoo Projects & Timesheets modules

---

## 1. Executive Summary

A custom time tracking application for a small organization (1-20 users) that enables employees to track time spent on project activities using a timer-based system, while also recording daily attendance. The application will be hosted on Microsoft Azure and integrated with Microsoft Teams.

---

## 2. Problem Statement

### Current Pain Points

- **Manual time tracking** is error-prone and time-consuming
- **No standardized system** for tracking time spent on different project activities
- **Attendance records** are managed separately from project work, causing data fragmentation
- **Limited visibility** for project managers into how time is being allocated across activities
- **Missed entries** due to lack of reminders and easy-to-use interface

### Solution

Chrono provides a timer-based approach where employees simply click to start/stop tracking, reducing friction and improving accuracy. The system unifies time tracking and attendance in one place, integrated into the existing Microsoft Teams workflow.

---

## 3. Goals and Non-Goals

### Goals (In Scope)

| ID | Goal |
|----|------|
| G1 | Enable timer-based time tracking for project activities |
| G2 | Record daily attendance (clock-in/clock-out) |
| G3 | Provide PMs visibility into project time allocation |
| G4 | Integrate with Microsoft Teams for seamless access |
| G5 | Send automated reminders for attendance submission |
| G6 | Support manual correction of time entries |

### Non-Goals (Out of Scope)

| ID | Non-Goal | Rationale |
|----|----------|-----------|
| NG1 | Task management / to-do lists | MVP focuses on time tracking only; use comments for task descriptions |
| NG2 | Invoicing or billing | Not needed for internal time tracking |
| NG3 | Payroll integration | Separate system handles payroll |
| NG4 | Leave management / PTO tracking | Out of scope for this app |
| NG5 | Multi-tenant / multi-organization | Single organization deployment |
| NG6 | Offline-first / PWA | Browser + Teams only for MVP |
| NG7 | Mobile native apps | Web responsive is sufficient |

---

## 4. Personas

### Project Manager (PM)

- Creates and manages projects and activities
- Assigns employees to projects
- Views time reports for their projects
- Validates timesheets (v2)
- Needs visibility into team time allocation

### Employee

- Tracks time on assigned activities using timer
- Submits daily attendance
- Can edit their own time entries
- Needs simple, low-friction interface
- Works primarily in Microsoft Teams

---

## 5. Assumptions & Constraints

### Assumptions

- Users have Microsoft work accounts (Entra ID)
- Organization has Microsoft Teams deployed
- Maximum 20 active users
- Single timezone organization (or users manage their own timezone)
- Internet connectivity required (no offline mode)

### Constraints

- **Budget:** Azure non-profit credits (~€2000/year)
- **Hosting:** Must use Microsoft Azure
- **Authentication:** Must use Microsoft Entra ID
- **Integration:** Must work within Microsoft Teams

---

## 6. Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| Microsoft Entra ID tenant | IT Admin | Required for auth |
| Entra security group for PM role | IT Admin | Required for RBAC |
| Azure subscription with credits | IT Admin | Required for hosting |
| Teams app approval (org-level) | IT Admin | Required for Teams embed |
| Bot registration in Azure | Dev Team | Required for notifications |
| Teams app manifest approval | IT Admin | Required for bot messaging |

---

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Teams bot approval delays | Medium | High | Start approval process early; have email fallback |
| Azure credits exhaustion | Low | High | Monitor usage; basic tiers selected |
| User adoption resistance | Medium | Medium | Keep UI simple; integrate into Teams |
| Timer state loss on crash | Medium | Medium | Heartbeat-based recovery; manual edit fallback |
| Scope creep to task management | High | Medium | Strict MVP scope; defer to comments field |

---

## 8. Project Structure

### Hierarchy

```
PROJECTS (managed by PM)
    └── ACTIVITIES (managed by PM)
            └── TIME ENTRIES (created by employees via timer)
```

**Note:** There is no separate "TASKS" entity in MVP. The **comments** field on time entries serves as the task description, where employees describe what work they performed during the tracked time.

### Access Levels

| Resource | Project Manager (PM) | Employee |
|----------|---------------------|----------|
| Projects | Create, Edit, Archive, View All | View Assigned Only |
| Activities | Create, Edit, Archive | View (for assigned projects) |
| Time Entries | View All (for their projects), View Deleted | Create, Edit, Soft-Delete (own only) |
| Attendance | View All, View Deleted | Create, Edit, Soft-Delete (own only) |
| Assignments | Assign/unassign employees | N/A (view own assignments) |

**Note:** "Delete" for Projects/Activities = Archive (hide, recoverable). "Delete" for Time Entries/Attendance = Soft-delete (hidden but PM can view).

---

## 9. User Identity & RBAC

### User Identity

- **Primary identifier:** Microsoft Entra Object ID (OID) - stable, unique per user
- **Email:** Stored as attribute, but not used as primary key (emails can change)
- **Display name:** Synced from Entra profile on login

### Role Assignment

PM role is determined by membership in a designated **Entra security group**:

- Group name: configurable (e.g., "Chrono-ProjectManagers")
- Checked at login via Microsoft Graph API
- Role cached in JWT token for session duration
- If not in PM group, user is treated as Employee

### Permission Matrix

| Resource | Action | PM | Employee |
|----------|--------|----|----|
| Projects | Create | Yes | No |
| Projects | Edit | Yes | No |
| Projects | Archive | Yes | No |
| Projects | View | All | Assigned Only |
| Activities | Create | Yes | No |
| Activities | Edit | Yes | No |
| Activities | Archive | Yes | No |
| Activities | View | All | Assigned Projects Only |
| Time Entries | Create | No | Yes (own) |
| Time Entries | Edit | No | Yes (own, until locked*) |
| Time Entries | Soft-Delete | No | Yes (own, until locked*) |
| Time Entries | View | All (their projects)** | Own Only |
| Time Entries | View Deleted | Yes | No |
| Attendance | Create | No | Yes (own) |
| Attendance | Edit | No | Yes (own, until locked*) |
| Attendance | Soft-Delete | No | Yes (own, until locked*) |
| Attendance | View | All** | Own Only |
| Attendance | View Deleted | Yes | No |
| Assignments | Manage | Yes | No |

*Locking introduced in v2 with validation workflow. MVP: entries freely editable.
**PM can optionally include soft-deleted records in views.

---

## 10. Project Assignments

### Model

- **Many-to-many relationship** between Users and Projects
- PM assigns employees to projects
- Employees only see projects they are assigned to

### Behavior

- **Assigned employees:** Can view project and its activities, can track time
- **Unassigned employees:** Project does not appear in their dropdown; cannot track time
- **New employees:** See empty dashboard with message "No projects assigned. Contact your PM."
- **PM:** Can see all projects regardless of assignment

### Assignment Management (PM)

1. PM navigates to Project Settings
2. PM sees list of all active employees
3. PM adds/removes employees from project
4. Changes take effect immediately

---

## 11. Core Features

### 11.1 Timer-Based Time Tracking (MVP)

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
- Comments serve as the task description (what work was performed)

**Server-Side Enforcement:**
- Only ONE running timer per user (enforced at database and API level)
- Attempting to start a new timer while one is running returns an error
- Client must prompt user to stop current timer first

**Acceptance Criteria (MVP):**
- [ ] Clicking an activity tile shows "Ready to start?" confirmation
- [ ] Confirming start creates a time entry with status=running
- [ ] Only ONE timer can be running per user (409 error if attempting second)
- [ ] Running tile shows visual indicator (color change/animation)
- [ ] Elapsed time displays on running tile and updates every second
- [ ] Clicking running tile shows pause/finish options
- [ ] Comment field is required when finishing (optional when pausing)
- [ ] Pause sets status=paused; Finish sets status=completed
- [ ] Page refresh recovers running timer (timer resumes display)
- [ ] Heartbeat sent every 30 seconds for running timers
- [ ] Timer without heartbeat for 5 minutes marked as interrupted
- [ ] User notified of interrupted entries on next login

### 11.2 Clock-in/Clock-out System (MVP)

**Description:** Separate system from activity tracking to record employee office presence.

**Requirements:**
- Separate screen/section for attendance submission
- Employee submits arrival time and departure time
- Does NOT need to be submitted in real-time (can submit by end of day)
- Employee is prompted/reminded to submit attendance if not submitted by end of day
- Clock-in/Clock-out is independent from activity time tracking
- One attendance record per user per calendar day
- Both clock-in and clock-out are optional (can submit partial)
- System validates: departure time >= arrival time

**Acceptance Criteria (MVP):**
- [ ] Attendance section visible on employee dashboard
- [ ] Can submit clock-in time only (partial record)
- [ ] Can submit clock-out time only (partial record)
- [ ] Can submit both clock-in and clock-out together
- [ ] Error shown if clock-out time < clock-in time
- [ ] Only one attendance record per user per day (upsert behavior)
- [ ] Cannot submit attendance for future dates
- [ ] Can edit attendance for past days
- [ ] Warning indicator shown if today's attendance not yet submitted
- [ ] Teams reminder sent at scheduled time if attendance not submitted

### 11.3 Manual Time Editing (MVP)

**Description:** Ability to correct or adjust logged time entries.

**Requirements:**
- Employees can edit their own time entries
- Can adjust start time, end time
- Can edit comments
- Cannot edit entries for future dates
- Can backdate entries (create entries for past days)
- MVP: Entries freely editable (no locking)
- v2: Entries locked after PM validation

**Acceptance Criteria (MVP):**
- [ ] Employee can view list of their own time entries
- [ ] Employee can edit start time, end time, and comments on their entries
- [ ] Employee can create new entry for a past date (backdating allowed)
- [ ] Error shown if attempting to create/edit entry with future date
- [ ] Duration auto-recalculates when start/end times are changed
- [ ] Employee can soft-delete their own time entries (see §11.6)
- [ ] Employee cannot edit or see other employees' entries
- [ ] PM can view (but not edit) all entries for their projects

### 11.4 Timesheet Validation by PM (Version 2.0)

**Description:** Project Managers review and approve employee timesheets.

**Requirements:**
- PM can view all time entries for their projects
- PM can approve or reject time entries
- Rejected entries return to employee for correction
- Approved entries are locked (cannot be edited)
- Approval workflow with status tracking

### 11.5 Reporting (Version 2.0)

**Description:** Reports and analytics on time spent.

**Report Types:**
- **By Employee:** Total hours per employee, breakdown by project/activity
- **By Project:** Total hours per project, breakdown by employee/activity
- **By Activity:** Total hours per activity type across all projects

**Requirements:**
- Filterable by date range
- Export to CSV
- Visual dashboards (charts/graphs)

### 11.6 Delete Semantics (MVP)

**Description:** How deletion of records is handled for traceability and audit purposes.

**Rationale:** Even internal tools need traceability. Hard delete (permanent removal) breaks audit trails and makes it impossible to recover from mistakes. Soft delete preserves data while hiding it from normal views.

**Time Entries:**
- **Soft delete** - Employee "deletes" entry → `is_deleted = true`, `deleted_at = NOW()`
- Deleted entries hidden from normal views
- PM can view deleted entries in admin view (marked as deleted)
- No permanent deletion in MVP

**Attendance:**
- **Soft delete** - Same pattern as time entries
- `is_deleted = true`, `deleted_at = NOW()`, `deleted_by = user_id`

**Projects & Activities:**
- **Archive instead of delete** - Projects set to `status = 'archived'`
- Archived projects hidden from employee dropdown
- PM can view and restore archived projects
- Activities inherit archive status from project

**Acceptance Criteria (MVP):**
- [ ] Time entry "delete" action sets is_deleted=true (not hard delete)
- [ ] Deleted entries not shown in employee dashboard
- [ ] Deleted entries visible to PM with "deleted" indicator
- [ ] Attendance "delete" action sets is_deleted=true
- [ ] Projects use archive status instead of delete
- [ ] No permanent data deletion in MVP

---

## 12. Timer State Machine

### States

| State | Description |
|-------|-------------|
| `idle` | No timer running; user can start a new entry |
| `running` | Timer is active; elapsed time incrementing |
| `paused` | Timer stopped but entry not complete; can resume |
| `completed` | Entry finished; duration finalized |
| `interrupted` | System detected stale running entry (no heartbeat) |

### Transitions

```
                    ┌─────────────────────────────────────────────┐
                    │                                             │
                    ▼                                             │
    ┌─────────┐  Start   ┌─────────┐  Pause   ┌─────────┐       │
    │  idle   │─────────▶│ running │─────────▶│ paused  │───────┘
    └─────────┘          └─────────┘          └─────────┘  Resume
                              │                    │
                              │ Finish             │ Finish
                              ▼                    ▼
                         ┌───────────┐
                         │ completed │
                         └───────────┘
```

### Server Rules

1. **Single Running Entry:** Only ONE entry per user can be in `running` state
   - Enforced via database constraint
   - API returns 409 Conflict if attempting to start while another is running

2. **Heartbeat Mechanism:**
   - Client sends heartbeat every 30 seconds while timer is running
   - Server stores `last_heartbeat_at` timestamp
   - If no heartbeat for 5 minutes, entry marked as `interrupted`
   - Duration calculated from `start_time` to `last_heartbeat_at`

3. **Duration Calculation:**
   - Duration computed server-side on completion (not stored while running)
   - `duration_minutes = (end_time - start_time) in minutes`
   - For paused entries: duration accumulated across pause/resume cycles

4. **Crash Recovery:**
   - On page load, client checks for any `running` entry
   - If found, resumes timer display from `start_time`
   - If entry is `interrupted`, prompt user to correct and close it

### Midnight Handling

If a timer crosses midnight (local user timezone):

1. **Auto-split** the entry at 23:59:59 local time
2. First entry: original start → 23:59:59 (marked `completed`)
3. Second entry: 00:00:00 → continues running (new entry, same activity)
4. User notified on next interaction: "Your timer crossed midnight. Entry was split."

---

## 13. Teams Bot Notifications

### Overview

End-of-day reminders are delivered via Microsoft Teams Bot using proactive messaging.

### Architecture

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  Azure Functions    │────▶│  Bot Framework SDK  │────▶│  Microsoft Teams    │
│  (Timer Trigger)    │     │  (Azure Bot Service)│     │  (User receives     │
│                     │     │                     │     │   notification)     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

### Requirements

| Requirement | Description |
|-------------|-------------|
| Bot Registration | Register bot in Azure Bot Service |
| Teams App Manifest | Create and deploy Teams app with bot capability |
| User Consent | Users must install the app / consent to receive messages |
| Proactive Messaging | Bot sends messages without user initiation |
| Conversation Reference | Store user's conversation reference for proactive messages |

### Reminder Schedule

| Day | Reminder Time | Message |
|-----|---------------|---------|
| Monday | 5:00 PM | "Don't forget to submit your attendance for today!" |
| Tuesday | 4:00 PM | "Don't forget to submit your attendance for today!" |
| Wednesday | 4:00 PM | "Don't forget to submit your attendance for today!" |
| Thursday | 5:00 PM | "Don't forget to submit your attendance for today!" |
| Friday | 1:00 PM | "Don't forget to submit your attendance for today!" |

**Timezone Handling:**
- **Reminder timezone:** Organization timezone (configured in app settings, e.g., "Europe/Vilnius")
- **DST behavior:** Reminders follow local clock time. If DST shifts, "5:00 PM" remains 5:00 PM local time.
- **Server timezone:** Server runs in UTC; reminder scheduler converts org timezone to UTC for scheduling.
- **Example:** If org timezone is UTC+2 (summer) and shifts to UTC+3 (winter), the reminder at "5:00 PM local" adjusts automatically.

### Fallback

If Teams bot is not yet approved or user hasn't consented:
- v2 consideration: Email fallback via Microsoft Graph

---

## 14. Time Semantics

### Timestamps

- **Storage:** All timestamps stored in **UTC**
- **Display:** Converted to user's local timezone (detected from browser)
- **Date boundaries:** "Today" = calendar day in user's local timezone

### Time Entry Rules

| Rule | Behavior |
|------|----------|
| Future entries | **Not allowed** - cannot create entries for future dates |
| Backdating | **Allowed** - can create entries for past days |
| Rounding | **None** - exact minutes stored and displayed |
| Minimum duration | **15 minutes** - entries must be at least 15 minutes long |
| Maximum duration | **24 hours** - single entry cannot exceed one day |

### Day Boundaries

- Entries are assigned to the **date of start_time** (in user's local timezone)
- If timer crosses midnight, auto-split into two entries (see Timer State Machine)

---

## 15. Attendance Business Rules

### Record Structure

- One attendance record per user per calendar day
- Both clock-in (arrival) and clock-out (departure) are optional
- Can submit partial record (arrival only, departure only)

### Validation Rules

| Rule | Behavior |
|------|----------|
| Departure >= Arrival | System prevents submission if departure before arrival |
| Future dates | Cannot submit attendance for future dates |
| Past dates | Can submit/edit attendance for past days (MVP: no time limit) |
| Duplicate prevention | Only one record per user per day; update if exists |

### MVP Behavior

- Entries freely editable at any time
- No approval workflow
- No locking mechanism

### v2 Behavior (with Validation)

- PM can validate attendance records
- Validated records are locked
- Employee must request PM to unlock for corrections

---

## 16. User Workflows

### 16.1 PM Workflow

```
1. PM logs into application (via Microsoft account)
2. PM creates a new Project
3. PM adds Activities to the project (Communication, Planning, Development, etc.)
4. PM assigns employees to the project
5. PM views time reports for their projects
6. (v2) PM approves/rejects submitted timesheets
```

**Key Rules:**
- Only PM can create/edit projects and activities
- Only PM can assign employees to projects
- Employees cannot assign themselves or others

### 16.2 Employee Workflow

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

### 16.3 End of Day Notifications

- System sends Teams notification at scheduled time if attendance not submitted
- Notification contains link to open Chrono and submit attendance
- Notifications require user to have installed the Teams app

---

## 17. User Interface Requirements

### 17.1 General UI/UX

- Similar look and feel to Odoo
- Clean, modern interface
- Mobile-responsive design
- Works in web browser and Microsoft Teams

### 17.2 Activity Tiles

**Requirements:**
- Grid/card layout showing all activities for selected project
- Each tile displays:
  - Activity name
  - Icon or color indicator
  - Hours logged today
  - Visual indicator if currently active (running)
  - Running timer display when active
- Clicking tile triggers start/stop prompts

### 17.3 PM Project View

**Columns to display:**
- Date
- Employee name
- Activity
- Time spent
- Comments

**Features:**
- Sortable columns
- Filterable by date range, employee, activity
- Note: Export functionality deferred to v2

### 17.4 Empty States

| State | Message |
|-------|---------|
| No assigned projects | "No projects assigned. Contact your Project Manager to get started." |
| No activities in project | "No activities yet. PM will add activities soon." |
| No time entries today | "No time logged today. Click an activity to start tracking." |

---

## 18. Technical Requirements

### 18.1 Platform

- **Hosting:** Microsoft Azure
- **Database:** Azure SQL Database
- **Authentication:** Microsoft Entra ID (Azure AD)
- **Frontend:** Web application (React TypeScript)
- **Backend:** REST API (Python FastAPI)

### 18.2 Integration

- **Microsoft Teams:** Embed as Teams tab application
- **Microsoft Graph:** For user profile, group membership
- **Azure Bot Service:** For proactive notifications

### 18.3 Data Storage

All data stored in Microsoft ecosystem (Azure SQL Database).

### 18.4 Security

- Users authenticate with Microsoft work accounts
- Role-based access control (PM vs Employee via Entra groups)
- Data encrypted at rest and in transit
- Basic audit fields on all records (`created_at`, `updated_at`, `updated_by`)
- Full audit trail (edit history) deferred to v2

---

## 19. Feature Prioritization

### MVP (Version 1.0)

| Priority | Feature | Description |
|----------|---------|-------------|
| P0 | Authentication | Microsoft Entra ID login |
| P0 | User Management | Store users, sync from Entra |
| P0 | Project/Activity Management | PM creates projects and activities |
| P0 | Project Assignments | PM assigns employees to projects |
| P0 | Timer-based Tracking | Start/pause/stop on activity tiles with heartbeat |
| P0 | Comments | Add notes when finishing activity |
| P1 | Clock-in/Clock-out | Daily attendance submission |
| P1 | Manual Time Edit | Correct logged entries |
| P1 | Basic PM View | See time entries for projects |
| P2 | Teams Integration | Embed in Microsoft Teams as tab |
| P2 | Teams Bot | Proactive notifications for reminders |

### Version 2.0

| Priority | Feature | Description |
|----------|---------|-------------|
| P0 | Timesheet Validation | PM approval workflow |
| P0 | Entry Locking | Lock entries after validation |
| P0 | Full Audit Trail | History of all entry changes |
| P0 | Reporting | By employee, project, activity |
| P1 | Export CSV | Export reports to CSV |
| P1 | Dashboard | Visual charts and analytics |
| P2 | Email Fallback | Notifications via email if Teams bot unavailable |
| P2 | Monday.com Integration | Sync projects/tasks from Monday.com |

---

## 20. Business Rules Summary

### 20.1 Timer Rules

- **Single Activity Only:** An employee can only have ONE active timer running at a time
- If employee tries to start a new activity while another is running, prompt them to stop/pause the current one first
- **Minimum Duration:** **15 minutes** - entries must be at least 15 minutes long
- **Heartbeat Required:** Running timers must send heartbeat every 30 seconds
- **Midnight Split:** Timers crossing midnight auto-split into two entries

### 20.2 Time Entry Editing Rules (MVP)

- Employees can edit their own time entries freely
- No time limit on edits
- No locking mechanism in MVP

### 20.3 Time Entry Editing Rules (v2)

- **Before Validation:** Employees can edit their time entries freely
- **After PM Validation:** Time entries are LOCKED and cannot be edited
- If correction needed after validation, employee must request PM to unlock

### 20.4 Reminder Schedule

| Day | Reminder Time |
|-----|---------------|
| Monday | 5:00 PM |
| Tuesday | 4:00 PM |
| Wednesday | 4:00 PM |
| Thursday | 5:00 PM |
| Friday | 1:00 PM |

**Timezone:** Organization timezone (configurable). Times are local; DST adjustments handled automatically.

### 20.5 Delete Rules

| Resource | Delete Behavior |
|----------|-----------------|
| Projects | Archive (status = 'archived'), recoverable by PM |
| Activities | Archive with project, recoverable |
| Time Entries | Soft-delete (is_deleted = true), PM can view |
| Attendance | Soft-delete (is_deleted = true), PM can view |

**No hard deletes in MVP.** All data preserved for traceability.

---

## 21. Monday.com Integration (Version 2.0)

### Overview
Integration with Monday.com to sync projects (optional enhancement for organizations using Monday.com for project management).

### Requirements (Deferred to v2)
- Auto-import Monday.com boards as Chrono projects
- Auto-import Monday.com groups/columns as activities
- Two-way status sync when time is tracked
- OAuth-based authentication with Monday.com API
- Configurable sync interval (manual, hourly, daily)

**Note:** Full specification will be developed when this feature is prioritized for v2.

---

## 22. Open Questions (Resolved)

| Question | Decision | Rationale |
|----------|----------|-----------|
| Include TASKS entity? | No - use comments | Keeps MVP simple; comments describe work |
| How to assign PM role? | Entra security group | Leverages existing identity infrastructure |
| Project visibility | Assigned only | More secure; prevents data leakage |
| Notification method | Teams Bot | Integrated UX; proactive messaging |
| Export in MVP? | Moved to v2 | Reduces MVP scope; PM view sufficient |
| Edit locking in MVP? | No locking | No validation workflow yet |
| Audit trail depth | Basic fields MVP, full history v2 | Incremental complexity |
| Midnight timers | Auto-split | Clean data model; one entry per day |
| Delete semantics | Soft delete | Traceability; hard delete breaks audit trails |
| Background job runtime | Azure Functions Timer Trigger | Cost-effective, serverless, easy monitoring |
| Reminder timezone | Organization timezone | Consistent team experience; auto DST handling |

---

## 23. Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| **Adoption** | 100% of team using within 1 month | % of active employees with ≥1 time entry in the past 7 days |
| **Weekly Active Users** | >90% of team | (Users with ≥1 time entry this week) / (Total active employees) × 100 |
| **Accuracy** | Reduction in missed entries | Compare to baseline: count of days with 0 time entries per user per month |
| **Efficiency** | <2 min to log daily hours | Average time from dashboard load to last entry completion (tracked via analytics) |
| **Attendance Compliance** | 95% same-day submission | (Attendance records submitted same day) / (Total workdays × active users) × 100 |
| **Timer Reliability** | <1% interrupted | (Entries with status='interrupted') / (Total entries) × 100, measured weekly |
| **Error Rate** | <0.5% API errors | (5xx responses) / (Total API requests) × 100, measured daily |

**Measurement Notes:**
- "Active employee" = user with `is_active = true` in database
- Metrics calculated via Application Insights dashboards
- Weekly metrics report generated every Monday

---

## 24. Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **Project** | A container for related work activities (e.g., "Website Redesign") |
| **Activity** | A type of work within a project (e.g., "Communication", "Development") |
| **Time Entry** | A single record of time spent on an activity |
| **Comments** | Free-text description of work performed (serves as task description) |
| **Attendance** | Record of employee clock-in and clock-out times |
| **PM** | Project Manager - has admin rights to create projects, assign users, view all data |
| **Heartbeat** | Periodic signal from client indicating timer is still running |
| **OID** | Object ID - Microsoft Entra's unique identifier for a user |

### B. Reference

- Inspired by Odoo 19.0 Projects and Timesheets modules
- Odoo License: LGPL (allows using ideas and concepts)
- Microsoft Teams Proactive Messaging: https://learn.microsoft.com/en-us/microsoftteams/platform/bots/how-to/conversations/send-proactive-messages
- Azure Bot Service: https://learn.microsoft.com/en-us/azure/bot-service/
