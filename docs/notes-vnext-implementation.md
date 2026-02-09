# Chrono VNext Implementation Notes (2026-02-06)

## Scope Delivered
- Frontend prototype refactored to task-centric navigation and state model.
- Hierarchy implemented in app flow:
- `Projects -> Domains -> Activities -> Tasks`
- Global ILYA dashboard added.
- Task execution constrained to Kanban route.

## Branch
- `feature/domains-tasks-workflow-v1`

## Behavior Matrix

| Area | Implemented Behavior |
|---|---|
| Domain composition | All domain templates are cloned into every project on creation |
| Activity composition | Activities are cloned from templates into project-domain instances |
| Task creation | Supported on Activities page and Team Queue on Tasks page |
| Task ownership | Single assignee; unassigned tasks are claimable |
| Team Queue visibility | Org-wide queue in Kanban with claim/reassign support across projects |
| Reassignment | Any active user can reassign any visible task |
| Task start restrictions | Requires today clock-in, no unresolved previous-day clock-out, and no other running timer |
| Task workflow | Fixed statuses: `todo`, `in_progress`, `done` |
| Start action | Moves task to `in_progress`, creates running time entry |
| Stop action | Stops timer segment, task remains `in_progress` |
| Finish action | Stops timer segment, marks task `done` |
| Time rounding | Minimum 15 minutes enforced per stopped/finished segment |
| Heartbeat | 30-min prompt; 5-min timeout auto-stops timer |
| Recurrence | On finish only; next due date computed from previous due date and frequency |
| Recurring assignee | Preserved if user is active; otherwise unassigned |
| Priority formula | `urgency * importance` |
| Sorting order | Score desc, due date asc, updatedAt desc |
| PM monitoring | Near-real-time polling panel (15s cadence) on Tasks page |
| ILYA dashboard | Aggregated metrics with project/domain filters |
| Outlook integration | Stub adapter only, not integrated |
| PWA runtime | Vite PWA plugin configured with manifest + service worker registration |

## Implemented Files (Primary)
- `chrono/frontend/src/types/index.ts`
- `chrono/frontend/scripts/convert_objectif_csv.cjs`
- `chrono/frontend/src/data/objectifData.ts` (generated)
- `chrono/frontend/src/data/mockData.ts`
- `chrono/frontend/src/store/domainStore.ts`
- `chrono/frontend/src/store/projectStore.ts`
- `chrono/frontend/src/store/taskStore.ts`
- `chrono/frontend/src/store/timeEntryStore.ts`
- `chrono/frontend/src/store/attendanceStore.ts`
- `chrono/frontend/src/App.tsx`
- `chrono/frontend/src/hooks/useAuth.ts`
- `chrono/frontend/src/pages/vnext/ProjectsPage.tsx`
- `chrono/frontend/src/pages/vnext/DomainsPage.tsx`
- `chrono/frontend/src/pages/vnext/ActivitiesPage.tsx`
- `chrono/frontend/src/pages/vnext/TasksKanbanPage.tsx`
- `chrono/frontend/src/pages/vnext/IlyaDashboardPage.tsx`
- `chrono/frontend/src/pages/vnext/index.ts`
- `chrono/frontend/src/lib/calendarAdapter.ts`
- `chrono/frontend/FRONTEND.md`

## Known Limits (Current Prototype)
- No backend/API persistence; all data remains localStorage-based.
- No websocket transport; PM monitor uses interval polling.
- Heartbeat scheduling is client-session dependent.
- Legacy Odoo screens/components remain in repository but are no longer primary routed paths.
- Role-based policy beyond PM vs employee is not fully enforced server-side (prototype-only).

## Validation Executed
- `npm run build` in `chrono/frontend` completed successfully.
