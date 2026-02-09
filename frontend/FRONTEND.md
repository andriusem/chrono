# Chrono Frontend Documentation (VNext)

> **Task-centric frontend prototype**
>
> **Last updated:** 2026-02-06

---

## Overview

The active frontend now follows the hierarchy:

`Projects -> Domains -> Activities -> Tasks`

This implementation is client-side only (React + Zustand + localStorage), with:

- Task-centric Kanban execution flow
- Attendance gate and previous-day reconciliation checks
- Single active timer per user
- 30-minute heartbeat prompt with 5-minute timeout handling
- Global ILYA dashboard for aggregated operational visibility

Legacy Odoo-style screens/components remain in the codebase for compatibility but are no longer the main routed UX.

---

## Runtime and Routing

### Runtime target
- PWA-first web app in current React stack
- Service worker + app manifest configured through `vite-plugin-pwa`
- Outlook integration deferred; adapter stub exists (`src/lib/calendarAdapter.ts`)

### Primary routes
- `/projects` -> Project index
- `/projects/:projectId/domains` -> Domain overview for a project
- `/projects/:projectId/domains/:projectDomainId/activities` -> Activity management + task creation
- `/projects/:projectId/tasks` -> Kanban execution board
- `/ilya` -> Global aggregated dashboard

---

## Data Model (Frontend)

### Core entities
- `DomainTemplate` -> global domain library seeded from CSV-derived data
- `ActivityTemplate` -> template activities per domain
- `ProjectDomain` -> project-specific domain instance
- `ProjectActivity` -> project-specific activity instance
- `Task` -> executable unit with urgency/importance, due date, recurrence fields
- `TaskEvent` -> task event history (created/started/stopped/finished/reassigned/etc.)
- `TimeEntry` -> timer segments linked to `taskId` with denormalized project/domain/activity ids
- `Attendance` -> daily clock-in / clock-out records

### Priority and sorting
- Required fields on task creation (no defaults): `urgency` (1-5), `importance` (1-5), `dueDate`
- Score: `priorityScore = urgency * importance`
- Sorting order:
1. `priorityScore` descending
2. `dueDate` ascending
3. `updatedAt` descending

---

## Seed Pipeline

CSV conversion script:

`frontend/scripts/convert_objectif_csv.cjs`

Generates:

`frontend/src/data/objectifData.ts`

Exports:
- `domainTemplates`
- `activityTemplates`
- `roleAllocations`
- Legacy compatibility exports: `objectifProjects`, `objectifActivities`, `objectifAllocations`

---

## Stores

### `domainStore` (`src/store/domainStore.ts`)
- Immutable template catalog (domains + activity templates)

### `projectStore` (`src/store/projectStore.ts`)
- Projects + project domain/activity instances
- Project creation clones all domain and activity templates
- Assignment data is informational only (no visibility gating)

### `taskStore` (`src/store/taskStore.ts`)
- Task CRUD
- Claim/reassign
- Fixed status workflow (`todo`, `in_progress`, `done`)
- Event logging
- Recurrence creation on finish
- Feature flags:
- `enableOrgWideClaim`
- `enableHeartbeatModal`
- `enableILYADashboard`

### `timeEntryStore` (`src/store/timeEntryStore.ts`)
- Task-based timers (`startTaskTimer`, `stopTaskTimer`)
- Single active timer rule per user
- Minimum 15-minute duration on stop/finish
- Heartbeat acknowledgement support
- Legacy wrapper methods retained for compatibility

### `attendanceStore` (`src/store/attendanceStore.ts`)
- Clock-in/clock-out
- Previous-day unresolved clock-out detection:
- `hasUnreconciledPreviousDay(userId)`
- Reconciliation action:
- `reconcilePreviousDayClockOut(userId, clockOutTime)`

All persisted stores are version-bumped for hard-reset migration behavior.

---

## Workflow Rules

### Task start restrictions
- Start is available only in `/projects/:projectId/tasks` Kanban
- User must be clocked in for today
- User must have reconciled previous-day unresolved clock-out
- User can run only one active timer at a time
- Team Queue tab is org-wide for visibility and claim/reassign actions

### Task transitions
- `Start` -> task moves to `in_progress` and timer starts
- `Stop` -> timer segment stops, task remains `in_progress`
- `Finish` -> timer segment stops, task moves to `done`

### Heartbeat behavior
- Every 30 minutes while timer runs, prompt asks if user is still working
- `Yes` -> heartbeat acknowledged, timer continues
- `No` -> timer stops (`heartbeat_declined`)
- No response for 5 minutes -> timer auto-stops (`heartbeat_timeout`)

---

## ILYA Dashboard

Route: `/ilya`

Provides:
- Active project count
- Tasks by status
- Running tasks now
- Completion trend (7d / 30d)
- Aggregation by domain and activity
- Employee workload snapshot
- Filters by project and domain

---

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Notes

- This phase is frontend-prototype only.
- Backend/API integration remains future work.
- Outlook calendar integration is intentionally deferred.
