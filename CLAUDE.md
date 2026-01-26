# CLAUDE.md - Chrono Time Tracking App

This file provides guidance to Claude Code when working with this project.

## Project Overview

**Chrono** is a custom time tracking application for a small organization (1-20 users). It features timer-based activity tracking and attendance management, inspired by Odoo's Projects and Timesheets modules.

## Documentation

- `docs/prd.md` - Product Requirements Document (full requirements)
- `docs/mvp.md` - MVP Implementation Plan (technical architecture)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (TypeScript) |
| Backend | Python FastAPI |
| Database | Azure SQL Database |
| Auth | Microsoft Entra ID (Azure AD) |
| Hosting | Azure App Service + Static Web Apps |

## Project Structure

```
chrono/
├── backend/              # Python FastAPI application
│   ├── app/
│   │   ├── api/          # API route handlers
│   │   ├── models/       # Database models (SQLAlchemy)
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   └── core/         # Config, auth, database setup
│   ├── tests/
│   ├── requirements.txt
│   └── main.py
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API client
│   │   └── types/        # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── docs/                 # Documentation
│   ├── prd.md
│   └── mvp.md
└── README.md
```

## Common Commands

### Backend (from `backend/` directory)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --reload --port 8000

# Run tests
pytest
```

### Frontend (from `frontend/` directory)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Reference Code

The Odoo 19.0 codebase is available at `../odoo-19.0/` for reference:
- `../odoo-19.0/addons/project/` - Project module
- `../odoo-19.0/addons/hr_timesheet/` - Timesheet module
- `../odoo-19.0/odoo/orm/` - ORM patterns

## Key Business Rules

1. **Single Timer:** Employee can only have ONE activity timer running at a time
2. **Time Entry Locking:** Entries can be edited freely until PM validates them, then locked
3. **Reminder Schedule:**
   - Monday & Thursday: 5:00 PM
   - Tuesday & Wednesday: 4:00 PM
   - Friday: 1:00 PM

## Development Guidelines

- Follow Python PEP 8 style guide for backend code
- Use TypeScript strict mode for frontend
- Write tests for all API endpoints
- Keep components small and focused
- Use environment variables for configuration (never commit secrets)
