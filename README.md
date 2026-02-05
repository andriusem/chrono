# Chrono - Time Tracking Application

A timer-based time tracking application for small teams (1-20 people), built with React, FastAPI, and Microsoft Azure.

## Overview

Chrono helps employees track time spent on project activities using a simple timer interface. Click to start, work, click to stop. It also tracks daily attendance (clock-in/clock-out) and integrates with Microsoft Teams for seamless access and reminders.

## Prototype Status (2026-02-05)

The current app is a **frontend-only prototype** that runs entirely in the browser with localStorage persistence.

- **Embedded data** comes from `docs/Objectif repartition des tâches.csv`, converted once via `frontend/scripts/convert_objectif_csv.cjs` into `frontend/src/data/objectifData.ts`.
- **Allocated hours** are computed from per-role allocations; the project form shows a small role summary card.
- **No backend** is connected yet (FastAPI/Azure stack remains the target architecture).

## Features

### MVP (Version 1.0)

- **Timer-based time tracking** - Click activity tiles to start/pause/stop timers
- **Project & Activity management** - PMs create projects and activities
- **Team assignments** - PMs assign employees to projects (employees only see assigned projects)
- **Daily attendance** - Clock-in/clock-out submission with end-of-day reminders
- **Allocated hours & budgets** - Project/activity allocations with remaining time indicators
- **Microsoft Teams integration** - Embedded as a Teams tab
- **Teams Bot notifications** - Automated attendance reminders (organization timezone, DST-aware)
- **Manual time editing** - Correct or backdate entries
- **Soft delete** - Data preserved for traceability (no permanent deletion)

### Version 2.0 (Planned)

- PM timesheet validation workflow
- Entry locking after approval
- Reporting dashboards (by employee, project, activity)
- CSV export
- Full audit trail
- Monday.com integration

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React + TypeScript |
| Backend | Python FastAPI |
| Database | Azure SQL |
| Authentication | Microsoft Entra ID |
| Hosting | Azure App Service + Static Web Apps |
| Background Jobs | Azure Functions (Timer Trigger) |
| Notifications | Azure Bot Service + Teams |

## Project Structure

```
chrono/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/          # REST endpoints
│   │   ├── models/       # SQLAlchemy models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   └── core/         # Config, auth, database
│   └── tests/
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── docs/
│   ├── prd.md            # Product Requirements Document
│   └── mvp.md            # MVP Technical Plan
└── CLAUDE.md             # AI assistant context
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Azure subscription
- Microsoft Entra ID tenant

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Timer-based (not manual entry) | Reduces friction, improves accuracy |
| Soft delete (no hard delete) | Traceability and mistake recovery |
| Organization timezone for reminders | Consistent team experience, automatic DST handling |
| Azure Functions for scheduled jobs | Cost-effective serverless execution |
| Comments instead of tasks entity | Keeps MVP simple |
| Heartbeat-based timer | Reliable crash detection and recovery |

## Business Rules

1. **Single Timer** - Only one timer can run at a time per user
2. **Project Assignments** - Employees only see projects they're assigned to
3. **Heartbeat Timer** - 30-second heartbeat signal, 5-minute timeout marks entry as interrupted
4. **Soft Delete** - Data is hidden, not permanently deleted; PMs can view deleted records
5. **Midnight Split** - Timers crossing midnight are auto-split into two entries

## Documentation

- **[Product Requirements (PRD)](docs/prd.md)** - What we're building and why
- **[MVP Technical Plan](docs/mvp.md)** - How we're building it
- **[CLAUDE.md](CLAUDE.md)** - Project context for AI assistants

## Estimated Cost

~€17-20/month on Azure (within €2000/year non-profit credits)

## License

Proprietary - Internal use only

---

*Inspired by Odoo Projects and Timesheets modules*
