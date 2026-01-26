# MVP Plan: Chrono Time Tracking Application

## Overview

A custom time tracking application inspired by Odoo's Projects and Timesheets modules, built for Microsoft Azure with Teams integration.

**Target Users:** Small team (1-20 employees)
**Priority:** Timer-based time tracking
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
│                 FRONTEND (React)                                │
│           Azure Static Web Apps (FREE tier)                     │
│                                                                 │
│  • Activity tiles with timer                                    │
│  • Clock-in/Clock-out submission                                │
│  • PM project management                                        │
│  • Can be embedded in Microsoft Teams                           │
└─────────────────────┬───────────────────────────────────────────┘
                      │ API calls
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                 BACKEND (Python FastAPI)                        │
│              Azure App Service (~€13/month)                     │
│                                                                 │
│  • REST API endpoints                                           │
│  • Timer state management                                       │
│  • User authentication via Microsoft Entra ID                   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                 DATABASE (Azure SQL)                            │
│               Basic tier (~€4/month)                            │
│                                                                 │
│  • Projects, Activities, Time Entries, Attendance               │
└─────────────────────────────────────────────────────────────────┘
```

**Estimated monthly cost:** ~€17/month (within €2000 Azure credits)

---

## Data Model

### Tables

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│    PROJECTS      │       │   ACTIVITIES     │       │  TIME_ENTRIES    │
├──────────────────┤       ├──────────────────┤       ├──────────────────┤
│ id               │──┐    │ id               │──┐    │ id               │
│ name             │  │    │ name             │  │    │ date             │
│ description      │  │    │ project_id ──────│──┘    │ start_time       │
│ status           │  └───▶│ description      │       │ end_time         │
│ created_by (PM)  │       │ color (for tile) │   ┌──▶│ duration_minutes │
└──────────────────┘       └──────────────────┘   │   │ activity_id ─────│───┐
                                                  │   │ employee_email   │   │
                                                  │   │ comments         │   │
┌──────────────────┐                              │   │ status (running/ │   │
│  ATTENDANCE      │                              │   │         paused/  │   │
├──────────────────┤                              │   │         done)    │   │
│ id               │                              │   └──────────────────┘   │
│ date             │                              │                          │
│ employee_email   │                              └──────────────────────────┘
│ clock_in_time    │
│ clock_out_time   │
│ submitted        │
└──────────────────┘
```

### Relationships

- **Project** has many **Activities**
- **Activity** has many **Time Entries**
- **Employee** has many **Time Entries**
- **Employee** has many **Attendance** records (one per day)

---

## User Interface

### Screen 1: Employee Dashboard (Main Screen)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🏠 My Workspace                              [John Doe ▼] [⚙️]    │
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
│  📊 Website Redesign - Time Report                    [Export CSV] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Date       │ Employee    │ Activity      │ Time   │ Comments      │
│  ─────────────────────────────────────────────────────────────────  │
│  27 Jan     │ John Doe    │ Communication │ 1h 32m │ Client call...│
│  27 Jan     │ John Doe    │ Design        │ 2h 00m │ Mockups for...│
│  27 Jan     │ Jane Smith  │ Development   │ 4h 15m │ Built login...│
│  26 Jan     │ John Doe    │ Planning      │ 3h 00m │ Sprint plan...│
│                                                                     │
│                                       Project Total: 10h 47m       │
└─────────────────────────────────────────────────────────────────────┘
```

### Screen 5: Clock-in/Clock-out Submission

```
┌─────────────────────────────────────────────────────────────────────┐
│  🕐 Submit Attendance - January 27, 2026                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     Arrival Time:    [ 09:00 ▼ ]                                   │
│                                                                     │
│     Departure Time:  [ 17:30 ▼ ]                                   │
│                                                                     │
│                      [ Submit Attendance ]                          │
│                                                                     │
│  ⚠️ Reminder: Please submit your attendance before end of day      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Timer Logic

```
Employee clicks tile
        │
        ▼
   ┌─────────────┐      "Ready to start?"
   │ START PROMPT│ ────────────────────────▶ [Cancel] = Nothing happens
   └─────────────┘
        │ [Start]
        ▼
   ┌─────────────┐
   │ TIMER RUNS  │◀─────────────────────────┐
   │ in browser  │      Save every 30 sec   │
   │ & server    │ ─────to database─────────┘
   └─────────────┘
        │ Click tile again
        ▼
   ┌─────────────┐
   │ STOP PROMPT │ ────[Pause]───▶ Timer paused, can resume
   │ Add comment │ ────[Finish]──▶ Entry completed, saved
   └─────────────┘
        │
        ▼ On unexpected exit (browser close, crash)
   ┌─────────────┐
   │ LAST KNOWN  │     Employee can edit time later
   │ TIME SAVED  │     if needed
   └─────────────┘
```

**Key behaviors:**
- **Single timer only:** Employee can only have ONE activity running at a time
- Timer saves to database every 30 seconds
- On unexpected exit, last known time is preserved
- Employee can edit time entries until PM validates them (then locked)

---

## Development Phases

### Phase 1: Database & API Setup
- Set up Azure SQL Database
- Create database tables (Projects, Activities, Time Entries, Attendance)
- Build FastAPI backend with basic CRUD endpoints
- Set up Azure App Service for hosting

### Phase 2: Authentication
- Integrate Microsoft Entra ID (Azure AD)
- Employees log in with work Microsoft accounts
- Role-based access (PM vs Employee)

### Phase 3: PM Features
- Create/edit/delete Projects
- Create/edit/delete Activities within projects
- View all time entries across projects

### Phase 4: Employee Timer
- Activity tiles UI
- Start/Pause/Stop timer functionality
- Comments field on stop
- Auto-save timer state every 30 seconds
- Today's log view

### Phase 5: Clock-in/Clock-out
- Attendance submission form
- View/edit attendance history
- End-of-day reminder notifications with schedule:
  - Monday & Thursday: 5:00 PM
  - Tuesday & Wednesday: 4:00 PM
  - Friday: 1:00 PM

### Phase 6: Manual Time Editing
- Edit existing time entries
- Add time entries manually (for missed tracking)

### Phase 7: Teams Integration
- Package app for Microsoft Teams
- Embed as Teams tab
- Teams notifications for reminders

---

## Tech Stack Summary

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | React (TypeScript) | Popular, easy Teams integration |
| Backend | Python FastAPI | Simple, fast, similar to Odoo |
| Database | Azure SQL | Reliable, cheap for small teams |
| Auth | Microsoft Entra ID | Use existing work accounts |
| Hosting | Azure App Service + Static Web Apps | Simple, uses Azure credits |

---

## Success Criteria for MVP

- [ ] Employees can log in with Microsoft account
- [ ] PM can create projects and activities
- [ ] Employees can start/pause/stop timer on activities
- [ ] Timer saves progress automatically
- [ ] Employees can add comments when finishing activity
- [ ] Employees can submit daily clock-in/clock-out
- [ ] PM can view time report for projects
- [ ] App works in browser and Microsoft Teams
