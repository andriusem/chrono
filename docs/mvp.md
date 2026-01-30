# MVP Plan: Chrono Time Tracking Application

## Overview

A custom time tracking application inspired by Odoo's Projects and Timesheets modules, built for Microsoft Azure with Teams integration.

**Target Users:** Small team (1-20 employees)
**Priority:** Timer-based time tracking + attendance
**Hosting:** Azure (using non-profit credits)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR USERS                               │
│                    (Browser or Teams)                           │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                 FRONTEND (React TypeScript)                     │
│           Azure Static Web Apps (FREE tier)                     │
│                                                                 │
│  • Activity tiles with timer                                    │
│  • Clock-in/Clock-out submission                                │
│  • PM project management                                        │
│  • PM assignment management                                     │
│  • Can be embedded in Microsoft Teams                           │
└─────────────────────┬───────────────────────────────────────────┘
                      │ API calls
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                 BACKEND (Python FastAPI)                        │
│              Azure App Service (~€13/month)                     │
│                                                                 │
│  • REST API endpoints                                           │
│  • Timer state management (heartbeat-based)                     │
│  • User authentication via Microsoft Entra ID                   │
│  • Role-based access control (Entra groups)                     │
└─────────────────────┬───────────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌─────────────────────┐   ┌─────────────────────┐
│  DATABASE           │   │  AZURE BOT SERVICE  │
│  (Azure SQL)        │   │  (Notifications)    │
│  Basic (~€4/month)  │   │  (~€0/month*)       │
│                     │   │                     │
│  Users, Projects,   │   │  Teams proactive    │
│  Activities, Time   │   │  messaging for      │
│  Entries, Attendance│   │  reminders          │
│  Assignments        │   │                     │
└─────────────────────┘   └─────────────────────┘

* Bot Service is free for standard channels; Azure Functions consumption plan
```

**Estimated monthly cost:** ~€17-20/month (within €2000 Azure credits)

---

## Data Model

### Tables

```
┌──────────────────────┐
│       USERS          │
├──────────────────────┤
│ id (UUID, PK)        │
│ entra_oid (unique)   │◀─── Microsoft Entra Object ID (stable identifier)
│ email                │
│ display_name         │
│ is_active            │
│ created_at           │
│ updated_at           │
└──────────────────────┘
          │
          │ (referenced by all other tables)
          ▼
┌──────────────────────┐       ┌──────────────────────┐
│     PROJECTS         │       │ PROJECT_ASSIGNMENTS  │
├──────────────────────┤       ├──────────────────────┤
│ id (UUID, PK)        │◀──────│ project_id (FK)      │
│ name                 │       │ user_id (FK)         │──────┐
│ description          │       │ assigned_by (FK)     │      │
│ status (active/      │       │ assigned_at          │      │
│         archived)    │       │ UNIQUE(project_id,   │      │
│ created_by (FK→users)│       │        user_id)      │      │
│ created_at           │       └──────────────────────┘      │
│ updated_at           │                                     │
│ updated_by (FK→users)│                                     │
└──────────────────────┘                                     │
          │                                                  │
          │ 1:many                                           │
          ▼                                                  │
┌──────────────────────┐                                     │
│    ACTIVITIES        │                                     │
├──────────────────────┤                                     │
│ id (UUID, PK)        │                                     │
│ name                 │                                     │
│ project_id (FK)      │                                     │
│ description          │                                     │
│ color (hex, for tile)│                                     │
│ is_active            │                                     │
│ created_at           │                                     │
│ updated_at           │                                     │
│ updated_by (FK→users)│                                     │
└──────────────────────┘                                     │
          │                                                  │
          │ 1:many                                           │
          ▼                                                  │
┌──────────────────────┐                                     │
│   TIME_ENTRIES       │                                     │
├──────────────────────┤                                     │
│ id (UUID, PK)        │                                     │
│ user_id (FK→users)   │◀────────────────────────────────────┘
│ activity_id (FK)     │
│ date (local date)    │
│ start_time (UTC)     │
│ end_time (UTC, null  │
│   if running)        │
│ duration_minutes     │◀─── Computed on completion
│   (null if running)  │
│ status (running/     │
│   paused/completed/  │
│   interrupted)       │
│ comments             │◀─── Task description (what work was done)
│ last_heartbeat_at    │◀─── For detecting stale running entries
│ is_deleted (bool)    │◀─── Soft delete flag (default: false)
│ deleted_at (UTC)     │◀─── When soft-deleted (null if active)
│ deleted_by (FK→users)│◀─── Who deleted (null if active)
│ created_at           │
│ updated_at           │
│ updated_by (FK→users)│
└──────────────────────┘

┌──────────────────────┐
│    ATTENDANCE        │
├──────────────────────┤
│ id (UUID, PK)        │
│ user_id (FK→users)   │
│ date (local date)    │
│ clock_in_time (time) │◀─── Optional (can submit partial)
│ clock_out_time (time)│◀─── Optional (can submit partial)
│ is_deleted (bool)    │◀─── Soft delete flag (default: false)
│ deleted_at (UTC)     │◀─── When soft-deleted (null if active)
│ deleted_by (FK→users)│◀─── Who deleted (null if active)
│ created_at           │
│ updated_at           │
│ updated_by (FK→users)│
│ UNIQUE(user_id, date)│
└──────────────────────┘

┌──────────────────────┐
│ CONVERSATION_REFS    │◀─── For Teams bot proactive messaging
├──────────────────────┤
│ id (UUID, PK)        │
│ user_id (FK→users)   │
│ conversation_id      │
│ service_url          │
│ tenant_id            │
│ created_at           │
│ updated_at           │
└──────────────────────┘
```

### Key Constraints

```sql
-- Only one running entry per user (enforced at DB level)
CREATE UNIQUE INDEX idx_one_running_per_user
ON time_entries (user_id)
WHERE status = 'running';

-- One attendance per user per day
ALTER TABLE attendance
ADD CONSTRAINT uq_attendance_user_date UNIQUE (user_id, date);

-- One assignment per user per project
ALTER TABLE project_assignments
ADD CONSTRAINT uq_assignment UNIQUE (project_id, user_id);
```

### Relationships

- **User** has many **Project Assignments** (can be assigned to multiple projects)
- **Project** has many **Activities**
- **Project** has many **Project Assignments** (many users can be assigned)
- **Activity** has many **Time Entries**
- **User** has many **Time Entries**
- **User** has many **Attendance** records (one per day)

---

## User Interface

### Screen 1: Employee Dashboard (Main Screen)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🏠 Chrono                                       [John Doe ▼] [⚙️]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📅 Today: Monday, January 27                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 🕐 Clock-in: 09:00    Clock-out: [Not submitted]  [Edit]    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Select Project:  [ Website Redesign          ▼ ]                  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    ACTIVITIES                                │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐ │   │
│  │  │           │  │  ▶ ACTIVE │  │           │  │           │ │   │
│  │  │  📋       │  │  💬       │  │  🎨       │  │  💻       │ │   │
│  │  │ Planning  │  │  Comms    │  │  Design   │  │   Dev     │ │   │
│  │  │           │  │  01:32:05 │  │           │  │           │ │   │
│  │  │  0h today │  │ [running] │  │  2h today │  │  0h today │ │   │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘ │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  Today's Log:                                                       │
│  ├─ Design      09:15 - 11:15   2h    "Created mockups for..."     │
│  └─ Comms       11:30 - ⏱️ now  1h32  [Add comment when done]      │
│                                                                     │
│                                      Today Total: 3h 32m           │
└─────────────────────────────────────────────────────────────────────┘
```

### Screen 2: Start Activity Prompt

```
┌─────────────────────────────────────────┐
│                                         │
│   Start "Planning" activity?            │
│                                         │
│   Project: Website Redesign             │
│                                         │
│      [ Cancel ]    [ ▶ Start Timer ]    │
│                                         │
└─────────────────────────────────────────┘
```

### Screen 3: Stop/Pause Activity Prompt

```
┌─────────────────────────────────────────┐
│                                         │
│   "Communication" is running            │
│   ⏱️ 01:32:05                           │
│                                         │
│   What did you work on?                 │
│   ┌─────────────────────────────────┐   │
│   │ Client call about homepage...   │   │
│   └─────────────────────────────────┘   │
│                                         │
│   [ ⏸️ Pause ]     [ ✓ Finish ]         │
│                                         │
└─────────────────────────────────────────┘
```

### Screen 4: PM View - Project Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  📊 Website Redesign - Time Report                [⚙️ Settings]    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Filters: [Date Range ▼] [Employee ▼] [Activity ▼]                 │
│                                                                     │
│  Date       │ Employee    │ Activity      │ Time   │ Comments      │
│  ─────────────────────────────────────────────────────────────────  │
│  27 Jan     │ John Doe    │ Communication │ 1h 32m │ Client call...│
│  27 Jan     │ John Doe    │ Design        │ 2h 00m │ Mockups for...│
│  27 Jan     │ Jane Smith  │ Development   │ 4h 15m │ Built login...│
│  26 Jan     │ John Doe    │ Planning      │ 3h 00m │ Sprint plan...│
│                                                                     │
│                                       Project Total: 10h 47m       │
│                                                                     │
│  Note: Export to CSV available in v2                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Screen 5: Clock-in/Clock-out Submission

```
┌─────────────────────────────────────────────────────────────────────┐
│  🕐 Submit Attendance - January 27, 2026                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     Arrival Time:    [ 09:00 ▼ ]  (optional)                       │
│                                                                     │
│     Departure Time:  [ 17:30 ▼ ]  (optional)                       │
│                                                                     │
│                      [ Submit Attendance ]                          │
│                                                                     │
│  ⚠️ Reminder: Please submit your attendance before end of day      │
└─────────────────────────────────────────────────────────────────────┘
```

### Screen 6: PM - Project Settings / Team Assignment

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⚙️ Website Redesign - Settings                          [← Back]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Project Name: [ Website Redesign        ]                         │
│  Description:  [ Redesign company website]                         │
│  Status:       [ Active ▼ ]                                        │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  👥 Team Members                                                    │
│                                                                     │
│  Assigned to this project:          Available employees:           │
│  ┌─────────────────────────┐        ┌─────────────────────────┐   │
│  │ ☑ John Doe              │        │ ☐ Alice Johnson         │   │
│  │ ☑ Jane Smith            │  [>>]  │ ☐ Bob Wilson            │   │
│  │ ☑ Mike Brown            │  [<<]  │ ☐ Carol Davis           │   │
│  └─────────────────────────┘        └─────────────────────────┘   │
│                                                                     │
│                              [ Save Changes ]                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Screen 7: Empty State - No Assigned Projects

```
┌─────────────────────────────────────────────────────────────────────┐
│  🏠 Chrono                                       [John Doe ▼] [⚙️]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                                                                     │
│                          📋                                         │
│                                                                     │
│               No projects assigned                                  │
│                                                                     │
│       Contact your Project Manager to get started.                 │
│                                                                     │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  📅 Today: Monday, January 27                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 🕐 You can still submit your attendance:                    │   │
│  │    Clock-in: [     ▼ ]   Clock-out: [     ▼ ]   [Submit]   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Timer Logic

### Heartbeat-Based Approach

```
Employee clicks tile
        │
        ▼
   ┌─────────────┐      "Ready to start?"
   │ START PROMPT│ ────────────────────────▶ [Cancel] = Nothing happens
   └─────────────┘
        │ [Start]
        ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ API: POST /time-entries/start                               │
   │                                                             │
   │ Server creates entry:                                       │
   │   • status = 'running'                                      │
   │   • start_time = NOW() (UTC)                                │
   │   • last_heartbeat_at = NOW()                               │
   │   • Returns entry_id to client                              │
   │                                                             │
   │ Server validates: no other 'running' entry for this user   │
   │   • If exists: return 409 Conflict                          │
   └─────────────────────────────────────────────────────────────┘
        │
        ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ TIMER RUNS IN BROWSER                                       │
   │                                                             │
   │ Every 30 seconds:                                           │
   │   • API: POST /time-entries/{id}/heartbeat                  │
   │   • Server updates last_heartbeat_at = NOW()                │
   │                                                             │
   │ Display: Calculate elapsed from start_time locally         │
   └─────────────────────────────────────────────────────────────┘
        │ Click tile again
        ▼
   ┌─────────────┐
   │ STOP PROMPT │
   │ Add comment │
   └─────────────┘
        │
   ┌────┴────┐
   │         │
   ▼         ▼
[Pause]   [Finish]
   │         │
   ▼         ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ API: POST /time-entries/{id}/stop                           │
   │   Body: { action: 'pause' | 'finish', comments: '...' }     │
   │                                                             │
   │ Server:                                                     │
   │   • Sets end_time = NOW() (UTC)                             │
   │   • Calculates duration_minutes = end_time - start_time     │
   │   • Sets status = 'paused' or 'completed'                   │
   │   • Stores comments                                         │
   └─────────────────────────────────────────────────────────────┘

On page load (recovery):
   ┌─────────────────────────────────────────────────────────────┐
   │ API: GET /time-entries/current                              │
   │                                                             │
   │ If 'running' entry exists:                                  │
   │   • Resume timer display from start_time                    │
   │   • Continue sending heartbeats                             │
   │                                                             │
   │ If 'interrupted' entry exists:                              │
   │   • Show notification: "Your timer was interrupted"         │
   │   • Prompt to correct and close                             │
   └─────────────────────────────────────────────────────────────┘

Background job (every minute):
   ┌─────────────────────────────────────────────────────────────┐
   │ Find all 'running' entries where:                           │
   │   last_heartbeat_at < NOW() - 5 minutes                     │
   │                                                             │
   │ Mark as 'interrupted':                                      │
   │   • status = 'interrupted'                                  │
   │   • end_time = last_heartbeat_at                            │
   │   • duration = end_time - start_time                        │
   └─────────────────────────────────────────────────────────────┘
```

### Key Behaviors

- **Single timer only:** Employee can only have ONE activity running at a time (DB constraint)
- **Heartbeat every 30 seconds:** Updates `last_heartbeat_at` to prove timer is active
- **5-minute timeout:** Entries without heartbeat marked as `interrupted`
- **Server-side duration:** Duration calculated by server, not client (prevents drift)
- **Crash recovery:** On page load, check for running/interrupted entries

### Background Job Runtime Decision

**Two scheduled jobs required:**
1. **Interrupted timer detector** - runs every minute, marks stale timers
2. **Attendance reminder sender** - runs at specific times (weekday afternoons)

**Chosen runtime: Azure Functions Timer Trigger**

| Option | Pros | Cons |
|--------|------|------|
| **Azure Functions Timer Trigger** ✓ | Serverless, pay-per-execution, simple CRON syntax, auto-scaling | Cold start latency (acceptable for these jobs) |
| Azure WebJobs | Always-on, no cold start | Requires App Service plan, more expensive |
| Cron in App Service | Simple, built-in | Ties jobs to web app lifecycle, harder to monitor |

**Why Azure Functions:**
- Cost-effective for infrequent jobs (consumption plan, ~€0/month for low volume)
- Clear separation from main API (easier to deploy/debug independently)
- Built-in retry policies and dead-letter handling
- Native integration with Application Insights for monitoring

**Function Configurations:**
```
# function_interrupted_timer_detector
# Schedule: Every minute
schedule: "0 * * * * *"

# function_attendance_reminder
# Schedule: Varies by day (see PRD §13)
# Timezone: Organization timezone (configurable)
# Logic: Query users without attendance for today, send Teams message
```

**Timezone Handling for Reminders:**
- Organization timezone stored in app configuration (e.g., "Europe/Vilnius")
- Azure Functions use CRON in UTC; converter calculates UTC time from local schedule
- DST transitions handled automatically by timezone library (pytz)
- Example: "5:00 PM Europe/Vilnius" → dynamically calculated UTC offset

---

## Development Phases

### Phase 1: Database & API Foundation (Week 1-2)

**Deliverables:**
- Azure SQL Database provisioned
- Database tables created (see Data Model)
- FastAPI project scaffolded
- Basic CRUD endpoints for all entities
- API documentation (OpenAPI/Swagger)
- Azure App Service deployment configured

**Endpoints:**
```
GET    /health
GET    /users/me

POST   /projects
GET    /projects
GET    /projects/{id}
PUT    /projects/{id}
DELETE /projects/{id}

POST   /projects/{id}/activities
GET    /projects/{id}/activities
PUT    /activities/{id}
DELETE /activities/{id}

POST   /projects/{id}/assignments
GET    /projects/{id}/assignments
DELETE /projects/{id}/assignments/{user_id}

POST   /time-entries/start
POST   /time-entries/{id}/heartbeat
POST   /time-entries/{id}/stop
GET    /time-entries/current
GET    /time-entries
PUT    /time-entries/{id}
DELETE /time-entries/{id}

POST   /attendance
GET    /attendance
PUT    /attendance/{id}
```

### Phase 2: Authentication & Authorization (Week 2-3)

**Deliverables:**
- Microsoft Entra ID integration
- JWT token validation
- User sync on first login (create user record from Entra profile)
- PM role detection via Entra security group membership
- Role-based endpoint protection
- API middleware for auth

**Auth Flow:**
```
1. Frontend redirects to Microsoft login
2. User authenticates with work account
3. Receive ID token + access token
4. Backend validates token with Entra
5. Extract user info (OID, email, display_name)
6. Upsert user in database
7. Check PM group membership via Graph API
8. Return JWT with role claim (pm/employee)
9. Frontend stores token, includes in API calls
```

**Entra Configuration:**
- App Registration in Azure Portal
- API permissions: `User.Read`, `GroupMember.Read.All`
- Security group ID configured in app settings

### Phase 3: PM Features - Projects & Activities (Week 3-4)

**Deliverables:**
- PM dashboard UI
- Project CRUD (create, list, edit, archive)
- Activity CRUD within projects
- Color picker for activity tiles
- Project list with activity counts

### Phase 4: PM Features - Team Assignments (Week 4)

**Deliverables:**
- Team assignment UI (Screen 6)
- Assign/unassign employees to projects
- Employee list endpoint (all active users)
- Assignment validation (can't assign same user twice)
- PM can view all projects, employees see only assigned

### Phase 5: Employee Timer (Week 5-6)

**Deliverables:**
- Project dropdown (assigned projects only)
- Activity tiles grid UI
- Start timer flow (prompt → confirm → running)
- Pause/Finish flow (prompt → comment → save)
- Running timer display with elapsed time
- Heartbeat mechanism (30-second interval)
- Today's log view
- Manual time entry editing
- Crash recovery (resume running entry on page load)

**Acceptance Criteria:**
- [ ] Can only start timer if no other running
- [ ] Timer continues if page refreshed
- [ ] Timer shows correct elapsed time
- [ ] Comments saved when pausing/finishing
- [ ] Can edit past entries (start/end/comments)

### Phase 6: Clock-in/Clock-out (Week 6-7)

**Deliverables:**
- Attendance submission form
- View/edit past attendance
- Validation (departure >= arrival)
- One record per day constraint
- Attendance summary in dashboard

**Acceptance Criteria:**
- [ ] Can submit partial (arrival only, departure only)
- [ ] Cannot submit for future dates
- [ ] Can edit past days
- [ ] Shows warning if not submitted today

### Phase 7: Teams Bot & Notifications (Week 7-8)

**Deliverables:**
- Azure Bot Service registration
- Teams app manifest
- Bot Framework SDK integration
- Conversation reference storage
- Scheduled reminder function (Azure Functions)
- Proactive message sending

**Architecture:**
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Azure Functions │────▶│ Bot Framework   │────▶│ Microsoft Teams │
│ Timer Trigger   │     │ SDK             │     │ User DM         │
│                 │     │                 │     │                 │
│ Cron schedule:  │     │ Send activity   │     │ "Don't forget   │
│ M,Th: 5pm       │     │ to stored       │     │  to submit      │
│ Tu,W: 4pm       │     │ conversation    │     │  attendance!"   │
│ Fr: 1pm         │     │ references      │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Reminder Logic:**
```python
# Pseudocode for reminder function
def send_reminders():
    today = date.today()
    users_without_attendance = get_users_without_attendance(today)

    for user in users_without_attendance:
        conversation_ref = get_conversation_reference(user.id)
        if conversation_ref:
            send_proactive_message(
                conversation_ref,
                "Don't forget to submit your attendance for today!"
            )
```

### Phase 8: Teams Tab Integration (Week 8-9)

**Deliverables:**
- Teams app manifest (tab capability)
- Tab SSO authentication
- Responsive UI for Teams panel width
- Teams app package (.zip)
- Admin approval for org-wide deployment

**Teams SSO Flow:**
```
1. User opens Chrono tab in Teams
2. Teams SDK provides silent auth token
3. Exchange Teams token for app token
4. User seamlessly authenticated
```

### Phase 9: Testing & Polish (Week 9-10)

**Deliverables:**
- End-to-end testing
- Bug fixes
- Performance optimization
- UI polish
- Documentation (user guide, admin guide)
- Production deployment

---

## API Endpoints Summary

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/auth/login` | Redirect to Entra login | None |
| POST | `/auth/callback` | Handle Entra callback | None |
| GET | `/users/me` | Get current user info | Required |

### Projects (PM only for write)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/projects` | Create project | PM |
| GET | `/projects` | List projects | All* |
| GET | `/projects/{id}` | Get project | All* |
| PUT | `/projects/{id}` | Update project | PM |
| DELETE | `/projects/{id}` | Archive project | PM |

*Employees see only assigned projects

### Activities (PM only for write)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/projects/{id}/activities` | Create activity | PM |
| GET | `/projects/{id}/activities` | List activities | All |
| PUT | `/activities/{id}` | Update activity | PM |
| DELETE | `/activities/{id}` | Delete activity | PM |

### Assignments (PM only)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/projects/{id}/assignments` | Assign user | PM |
| GET | `/projects/{id}/assignments` | List assigned users | PM |
| DELETE | `/projects/{id}/assignments/{user_id}` | Unassign user | PM |
| GET | `/users` | List all users (for assignment UI) | PM |

### Time Entries
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/time-entries/start` | Start timer | Own |
| POST | `/time-entries/{id}/heartbeat` | Update heartbeat | Own |
| POST | `/time-entries/{id}/stop` | Stop/pause timer | Own |
| GET | `/time-entries/current` | Get running entry | Own |
| GET | `/time-entries` | List entries (filtered, excludes soft-deleted) | All* |
| PUT | `/time-entries/{id}` | Edit entry | Own |
| DELETE | `/time-entries/{id}` | Soft-delete entry (sets is_deleted=true) | Own |

*PM sees all for their projects; employees see own only
*PM can add `?include_deleted=true` to see soft-deleted entries

### Attendance
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/attendance` | Submit attendance | Own |
| GET | `/attendance` | List attendance (excludes soft-deleted) | All* |
| PUT | `/attendance/{id}` | Update attendance | Own |
| DELETE | `/attendance/{id}` | Soft-delete attendance (sets is_deleted=true) | Own |

*PM sees all; employees see own only
*PM can add `?include_deleted=true` to see soft-deleted records

---

## Non-Functional Requirements

### Environments

| Environment | Purpose | URL Pattern |
|-------------|---------|-------------|
| Development | Local development | localhost:3000 / localhost:8000 |
| Staging | Testing before prod | chrono-staging.azurewebsites.net |
| Production | Live users | chrono.azurewebsites.net |

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    - Run backend tests (pytest)
    - Run frontend tests (jest)
    - Lint checks (ruff, eslint)

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/main'
    - Deploy to staging
    - Run smoke tests

  deploy-prod:
    needs: deploy-staging
    - Manual approval required
    - Deploy to production
```

### Monitoring & Logging

- **Azure Application Insights** for:
  - Request tracing
  - Error logging
  - Performance metrics
  - Custom events (timer starts, completions)

- **Structured logging** format:
  ```json
  {
    "timestamp": "2026-01-27T14:30:00Z",
    "level": "INFO",
    "message": "Timer started",
    "user_id": "abc123",
    "entry_id": "xyz789",
    "activity_id": "act456"
  }
  ```

### Backups

- **Azure SQL automatic backups**
  - Point-in-time restore: 7-day retention
  - Long-term backup: weekly (configurable)

### Error Handling

- Global exception handler returns consistent error format:
  ```json
  {
    "error": {
      "code": "TIMER_ALREADY_RUNNING",
      "message": "You already have a timer running. Please stop it first.",
      "details": { "entry_id": "xyz789" }
    }
  }
  ```

- User-friendly error messages (no stack traces to users)
- All errors logged with correlation ID

### Security

- HTTPS only (enforced)
- JWT tokens with 1-hour expiry
- Refresh token rotation
- CORS restricted to known origins
- SQL parameterized queries (no injection)
- Input validation on all endpoints

---

## Tech Stack Summary

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | React (TypeScript) | Popular, easy Teams integration |
| UI Framework | TBD | Simple, modern look & feel |
| Backend | Python FastAPI | Simple, fast, async support |
| Database | Azure SQL | Reliable, cheap for small teams |
| ORM | SQLAlchemy | Mature, good Azure SQL support |
| Auth | Microsoft Entra ID | Use existing work accounts |
| Hosting | Azure App Service + Static Web Apps | Simple, uses Azure credits |
| Bot | Azure Bot Service + Bot Framework SDK | Teams notifications |
| Functions | Azure Functions | Scheduled reminders |
| Monitoring | Application Insights | Azure native |
| CI/CD | GitHub Actions | Simple, free for public repos |

---

## Success Criteria for MVP

### Functional Criteria

- [x] Employees can log in with Microsoft account
- [x] PM can create projects and activities
- [x] PM can assign employees to projects
- [x] Employees see only assigned projects
- [x] Employees can start/pause/stop timer on activities
- [x] Only one timer can run at a time per user
- [x] Timer recovers after page refresh/crash
- [x] Heartbeat mechanism detects stale timers
- [x] Employees can add comments when finishing activity
- [x] Employees can edit their own time entries
- [x] Employees can submit daily clock-in/clock-out
- [x] PM can view time report for projects
- [x] App works in browser
- [x] App works as Microsoft Teams tab
- [x] Teams bot sends attendance reminders

### Non-Functional Criteria

- [ ] Page load < 2 seconds
- [ ] API response < 500ms (p95)
- [ ] 99% uptime (measured over 30 days)
- [ ] All errors logged with correlation ID
- [ ] Automated tests pass before deploy
- [ ] Zero critical security vulnerabilities

---

## Appendix: Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-29 | No TASKS entity; use comments | Keep MVP simple |
| 2026-01-29 | Entra groups for PM role | Leverage existing identity |
| 2026-01-29 | Assigned projects only | Security + cleaner UX |
| 2026-01-29 | Teams Bot for notifications | Better UX than email |
| 2026-01-29 | Export CSV in v2 | Reduce MVP scope |
| 2026-01-29 | No locking in MVP | No validation workflow yet |
| 2026-01-29 | Basic audit fields only | Full history in v2 |
| 2026-01-29 | Auto-split midnight timers | Clean data model |
| 2026-01-29 | Heartbeat-based timers | More reliable than interval saves |
| 2026-01-29 | Soft delete for time entries/attendance | Traceability; hard delete breaks audit trails |
| 2026-01-29 | Azure Functions for background jobs | Serverless, cost-effective, easy monitoring |
| 2026-01-29 | Organization timezone for reminders | Consistent team experience; handles DST automatically |
