# CLAUDE.md - Chrono Time Tracking App

This file helps Claude understand the Chrono project and how to work on it effectively.

---

## What is Chrono?

**Chrono** is a time tracking application for small teams (1-20 people).

**The problem it solves:** Employees need an easy way to track how much time they spend on different work activities. Currently, people either forget to log time or use manual spreadsheets that are error-prone.

**The solution:** A simple app where employees click a button to start a timer, work on their task, then click again to stop. Like a stopwatch for work activities.

**Think of it like:** A fitness tracker, but for work. Instead of tracking steps, it tracks time spent on different activities.

---

## Key Documents

| Document | What it contains | When to read it |
|----------|------------------|-----------------|
| `docs/prd.md` | Full requirements - what we're building and why | Understanding features |
| `docs/mvp.md` | Technical plan - how we're building it | Implementation details |

**Quick reference:** The PRD is the "what", the MVP is the "how".

---

## How the App Works (Simple Version)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CHRONO FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   EMPLOYEE                         PM (Project Manager)         │
│   ────────                         ────────────────────         │
│                                                                 │
│   1. Logs in with Microsoft        1. Creates Projects          │
│      work account                     (e.g., "Website Redesign")│
│                                                                 │
│   2. Sees assigned projects        2. Adds Activities           │
│      (only what PM assigned)          (e.g., "Design", "Dev")   │
│                                                                 │
│   3. Clicks activity tile          3. Assigns employees         │
│      → Timer starts!                  to projects               │
│                                                                 │
│   4. Works on task                 4. Views time reports        │
│                                       for their projects        │
│   5. Clicks tile again                                          │
│      → Adds comment about work                                  │
│      → Timer stops!                                             │
│                                                                 │
│   6. Submits daily attendance                                   │
│      (clock-in / clock-out)                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack (What We're Using)

| Layer | Technology | What it does | Analogy |
|-------|------------|--------------|---------|
| **Frontend** | React + TypeScript | The screens users see and interact with | The "face" of the app |
| **Backend** | Python FastAPI | The brain that processes requests | The "brain" handling logic |
| **Database** | Azure SQL | Where all data is stored | The "filing cabinet" |
| **Auth** | Microsoft Entra ID | Login with work accounts | The "security guard" |
| **Hosting** | Azure App Service | Where the app lives on the internet | The "building" that houses everything |
| **Background Jobs** | Azure Functions | Scheduled tasks (reminders, cleanup) | The "night shift worker" doing automated tasks |
| **Notifications** | Teams Bot | Sends reminders to employees | The "assistant" that nudges people |

---

## Project Structure (Where Things Live)

```
chrono/
│
├── backend/                  # THE BRAIN (Python code)
│   ├── app/
│   │   ├── api/              # Endpoints (doors to receive requests)
│   │   ├── models/           # Database tables (how data is organized)
│   │   ├── schemas/          # Data shapes (what info looks like)
│   │   ├── services/         # Business logic (rules and calculations)
│   │   └── core/             # Setup stuff (config, auth, database connection)
│   ├── tests/                # Tests (checking code works correctly)
│   └── requirements.txt      # List of Python packages needed
│
├── frontend/                 # THE FACE (React code)
│   ├── src/
│   │   ├── components/       # Reusable UI pieces (buttons, cards, forms)
│   │   ├── pages/            # Full screens (Dashboard, Settings, etc.)
│   │   ├── hooks/            # Shared logic for components
│   │   ├── services/         # Code that talks to the backend
│   │   └── types/            # TypeScript definitions
│   └── package.json          # List of JavaScript packages needed
│
├── docs/                     # DOCUMENTATION
│   ├── prd.md                # Product Requirements
│   └── mvp.md                # MVP Technical Plan
│
└── .claude/                  # CLAUDE CODE CONFIG
    ├── settings.json         # Project settings
    └── rules/                # Specific rules for different parts
```

---

## Key Business Rules (IMPORTANT!)

These rules are fundamental to how Chrono works. Never break them:

### Rule 1: Single Timer
> **An employee can only have ONE timer running at a time.**

If someone tries to start a new timer while one is running, the app must stop them and ask them to finish the current timer first.

*Why?* Prevents duplicate time entries and confusion about what someone is working on.

### Rule 2: Project Assignments
> **Employees only see projects they're assigned to.**

A PM must explicitly assign an employee to a project before they can track time on it.

*Why?* Security and clarity. Employees don't get overwhelmed with projects that aren't theirs.

### Rule 3: No Locking in MVP
> **Time entries can be freely edited in MVP (Version 1).**

Locking (preventing edits after PM approval) comes in Version 2.

*Why?* Keeps MVP simple. We'll add the validation workflow later.

### Rule 4: Heartbeat Timer
> **Running timers send a "heartbeat" signal every 30 seconds.**

If the app doesn't receive a heartbeat for 5 minutes, it marks the timer as "interrupted".

*Why?* Handles crashes, browser closes, and internet disconnections gracefully.

### Rule 5: Reminder Schedule
> **Attendance reminders are sent at specific times (organization timezone):**

| Day | Time |
|-----|------|
| Monday | 5:00 PM |
| Tuesday | 4:00 PM |
| Wednesday | 4:00 PM |
| Thursday | 5:00 PM |
| Friday | 1:00 PM (earlier for weekend) |

**Timezone note:** Times are in the organization's configured timezone (e.g., "Europe/Vilnius"). DST changes are handled automatically - "5:00 PM" stays at 5:00 PM local time year-round.

### Rule 6: Soft Delete (No Permanent Deletion)
> **Data is never permanently deleted in MVP. "Delete" means hide, not destroy.**

| Resource | What "delete" does |
|----------|-------------------|
| Projects | Sets status to "archived" (PM can restore) |
| Activities | Archives with project |
| Time Entries | Sets `is_deleted = true` (PM can still see) |
| Attendance | Sets `is_deleted = true` (PM can still see) |

*Why?* Traceability. If someone accidentally deletes an entry, we can recover it. PMs can see deleted records to investigate discrepancies.

---

## Common Commands

### Backend (Python)

```bash
# First time setup (run once)
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt

# Start the backend server
cd backend
venv\Scripts\activate          # Activate virtual environment first!
uvicorn main:app --reload --port 8000

# Run tests
cd backend
venv\Scripts\activate
pytest
```

**What these do:**
- `venv` = Creates an isolated Python environment (like a sandbox)
- `activate` = Enters the sandbox
- `pip install` = Downloads required packages
- `uvicorn` = Starts the web server
- `pytest` = Runs automated tests

### Frontend (React)

```bash
# First time setup (run once)
cd frontend
npm install

# Start the frontend server
cd frontend
npm run dev

# Run tests
cd frontend
npm test

# Build for production
cd frontend
npm run build
```

**What these do:**
- `npm install` = Downloads required packages
- `npm run dev` = Starts development server (auto-refreshes on changes)
- `npm test` = Runs automated tests
- `npm run build` = Creates production-ready files

---

## Development Phases (Where We Are)

Based on `docs/mvp.md`, here's our progress:

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Database & API Foundation | ⬜ Not started |
| 2 | Authentication | ⬜ Not started |
| 3 | PM Features - Projects & Activities | ⬜ Not started |
| 4 | PM Features - Team Assignments | ⬜ Not started |
| 5 | Employee Timer | ⬜ Not started |
| 6 | Clock-in/Clock-out | ⬜ Not started |
| 7 | Teams Bot & Notifications | ⬜ Not started |
| 8 | Teams Tab Integration | ⬜ Not started |
| 9 | Testing & Polish | ⬜ Not started |

**Current focus:** Phase 1 - Setting up the database and basic API

---

## Decisions Log

Important decisions made during development:

| Date | Decision | Why |
|------|----------|-----|
| 2026-01-29 | No TASKS entity; use comments | Keep MVP simple - comments describe what work was done |
| 2026-01-29 | Entra groups for PM role | Use existing Microsoft security groups instead of building our own |
| 2026-01-29 | Assigned projects only | More secure; employees only see what's relevant to them |
| 2026-01-29 | Teams Bot for notifications | Better user experience than email |
| 2026-01-29 | Export CSV moved to v2 | Reduce MVP scope |
| 2026-01-29 | Heartbeat-based timer | More reliable than saving every 30 seconds |
| 2026-01-29 | Auto-split midnight timers | Clean data model; one entry per day |
| 2026-01-29 | Soft delete (no hard delete) | Traceability; can recover mistakes; PM can audit |
| 2026-01-29 | Azure Functions for background jobs | Serverless, cost-effective (~€0/month), easy monitoring |
| 2026-01-29 | Organization timezone for reminders | Consistent team experience; handles DST automatically |

---

## Data Model (How Data is Organized)

Think of each table like a spreadsheet:

### USERS (People who use the app)
| Column | What it stores |
|--------|----------------|
| id | Unique identifier |
| entra_oid | Microsoft account ID (never changes) |
| email | Work email address |
| display_name | Person's name |
| is_active | Can they log in? |

### PROJECTS (Work containers)
| Column | What it stores |
|--------|----------------|
| id | Unique identifier |
| name | "Website Redesign", "Marketing Campaign" |
| description | What the project is about |
| status | Active or Archived |
| created_by | Which PM created it |

### ACTIVITIES (Types of work within a project)
| Column | What it stores |
|--------|----------------|
| id | Unique identifier |
| name | "Design", "Development", "Communication" |
| project_id | Which project this belongs to |
| color | Color for the tile in the UI |

### TIME_ENTRIES (Tracked time)
| Column | What it stores |
|--------|----------------|
| id | Unique identifier |
| user_id | Who tracked this time |
| activity_id | What activity they worked on |
| start_time | When timer started |
| end_time | When timer stopped |
| duration_minutes | How long (calculated) |
| status | running / paused / completed / interrupted |
| comments | What work was done |
| is_deleted | Soft delete flag (true = hidden from normal views) |
| deleted_at | When it was deleted |
| deleted_by | Who deleted it |

### ATTENDANCE (Daily clock-in/out)
| Column | What it stores |
|--------|----------------|
| id | Unique identifier |
| user_id | Whose attendance |
| date | Which day |
| clock_in_time | Arrival time |
| clock_out_time | Departure time |
| is_deleted | Soft delete flag (true = hidden from normal views) |
| deleted_at | When it was deleted |
| deleted_by | Who deleted it |

### PROJECT_ASSIGNMENTS (Who works on what)
| Column | What it stores |
|--------|----------------|
| project_id | Which project |
| user_id | Which employee |
| assigned_by | Which PM assigned them |

---

## Reference Code (For Inspiration)

The Odoo 19.0 codebase is available at `../odoo-19.0/` if we need to look at how similar features are built:

- `../odoo-19.0/addons/project/` - How Odoo does projects
- `../odoo-19.0/addons/hr_timesheet/` - How Odoo does timesheets

**Note:** We're not copying Odoo code, just using it for ideas and patterns.

---

## Testing Strategy

Every feature needs tests. Here's what to test:

| Type | What it tests | Example |
|------|---------------|---------|
| **Unit tests** | Individual functions work correctly | "Calculate duration returns correct minutes" |
| **API tests** | Endpoints return correct responses | "POST /time-entries/start creates a running entry" |
| **Integration tests** | Multiple parts work together | "Starting timer when one is running returns error" |

---

## Security Rules

- **Never commit `.env` files** - They contain secrets
- **Never log passwords or tokens** - Even in error messages
- **Always validate input** - Don't trust data from users
- **Use parameterized queries** - Prevents SQL injection attacks

---

## When Working on This Project

### Before Starting
1. Read `docs/prd.md` sections relevant to the feature
2. Check `docs/mvp.md` for technical specifications
3. Look at the data model above to understand the tables involved

### While Coding
1. Follow existing patterns in the codebase
2. Write tests for new functionality
3. Use meaningful names for variables and functions
4. Add comments explaining "why", not "what"

### After Finishing
1. Run tests to make sure nothing broke
2. Update this CLAUDE.md if you made important decisions
3. Commit with a clear message explaining what changed

---

## Glossary

| Term | Meaning |
|------|---------|
| **API** | Application Programming Interface - how the frontend talks to the backend |
| **Endpoint** | A specific URL that accepts requests (like `/api/projects`) |
| **CRUD** | Create, Read, Update, Delete - basic database operations |
| **JWT** | JSON Web Token - a secure way to prove who you are |
| **ORM** | Object-Relational Mapping - lets us use Python objects instead of raw SQL |
| **Heartbeat** | A periodic signal saying "I'm still here" |
| **MVP** | Minimum Viable Product - the simplest version that's useful |
| **PM** | Project Manager - person who manages projects and views reports |
| **Soft Delete** | Hiding data instead of permanently removing it (sets `is_deleted = true`) |
| **Hard Delete** | Permanently removing data from the database (we don't do this in MVP) |
| **DST** | Daylight Saving Time - when clocks shift forward/backward seasonally |
| **Azure Functions** | Serverless code that runs on a schedule without needing a dedicated server |
