# Chrono - Time Tracking Application

A timer-based time tracking application for small teams, featuring activity tracking and attendance management.

## Features

### MVP (Version 1.0)
- Timer-based activity tracking (start/pause/stop)
- Activity tiles with visual status indicators
- Clock-in/Clock-out attendance submission
- Manual time entry editing
- Project Manager dashboard
- Microsoft Teams integration

### Version 2.0 (Planned)
- PM timesheet validation workflow
- Reporting (by employee, project, activity)
- Monday.com integration (auto-sync tasks)

## Tech Stack

- **Frontend:** React with TypeScript
- **Backend:** Python FastAPI
- **Database:** Azure SQL Database
- **Authentication:** Microsoft Entra ID
- **Hosting:** Azure (App Service + Static Web Apps)

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Azure account with SQL Database
- Microsoft Entra ID app registration

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Documentation

- [Product Requirements (PRD)](docs/prd.md)
- [MVP Implementation Plan](docs/mvp.md)

## License

Proprietary - Internal use only
