const fs = require('fs');
const path = require('path');

const csvPath = path.resolve(
  __dirname,
  '..',
  '..',
  'docs',
  'Objectif repartition des tâches.csv'
);
const outputPath = path.resolve(
  __dirname,
  '..',
  'src',
  'data',
  'objectifData.ts'
);

const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.split(/\r?\n/);

if (lines.length === 0) {
  throw new Error('CSV file is empty');
}

const header = lines[0].split(';').map((value) => value.trim());

const ROLE_COLUMNS = [
  {
    csv: 'Directrice',
    role: 'Directrice',
  },
  {
    csv: 'Responsable du developpement du projet associatif',
    role: 'Responsable du développement du projet associatif',
  },
  {
    csv: "Chargée d'accompagnement social",
    role: "Chargée d'accompagnement social",
  },
  {
    csv: 'Médiatrice Sociale',
    role: 'Médiatrice Sociale',
  },
  {
    csv: 'Conseillère numérique',
    role: 'Conseillère numérique',
  },
  {
    csv: "Chargé d'innovation numérique et digitale",
    role: "Chargé d'innovation numérique et digitale",
  },
];

const roleIndexes = ROLE_COLUMNS.map((role) => {
  const index = header.findIndex(
    (value) => value.toLowerCase() === role.csv.toLowerCase()
  );
  if (index === -1) {
    throw new Error(`Missing role column: ${role.csv}`);
  }
  return { role: role.role, index };
});

const PALETTE = [
  '#3878ff',
  '#28a745',
  '#ffc107',
  '#dc3545',
  '#6f42c1',
  '#17a2b8',
  '#fd7e14',
  '#e83e8c',
  '#20c997',
  '#6c757d',
];

const projects = [];
const activities = [];
const allocations = [];
const projectTotals = new Map();

let currentProject = null;
let projectCounter = 0;
let activityCounter = 0;

const parseNumber = (value) => {
  if (!value) return 0;
  const normalized = value.replace(',', '.').replace(/\s/g, '');
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

for (let i = 1; i < lines.length; i += 1) {
  const line = lines[i];
  if (!line) continue;

  const columns = line.split(';');
  if (columns.length === 0) continue;

  const first = (columns[0] || '').trim();
  const second = (columns[1] || '').trim();
  const third = (columns[2] || '').trim();

  if (!first && !second && !third) {
    continue;
  }

  if (second === 'Total temps' || third === 'Total temps') {
    continue;
  }

  if (second.startsWith('Note:')) {
    continue;
  }

  if (!first && second) {
    projectCounter += 1;
    const projectId = `project-${projectCounter}`;
    currentProject = {
      id: projectId,
      name: second,
      description: '',
      status: 'active',
      createdAt: '2026-02-05T09:00:00Z',
      createdById: 'user-1',
      allocatedHours: 0,
    };
    projects.push(currentProject);
    projectTotals.set(projectId, 0);
    continue;
  }

  if (/^\d+/.test(first) && second) {
    if (!currentProject) {
      continue;
    }

    activityCounter += 1;
    const activityId = `activity-${activityCounter}`;

    let activityAllocated = 0;
    roleIndexes.forEach(({ role, index }) => {
      const rawValue = (columns[index] || '').trim();
      const hours = parseNumber(rawValue);
      if (hours > 0) {
        allocations.push({
          activityId,
          role,
          allocatedHours: hours,
        });
        activityAllocated += hours;
      }
    });

    const activity = {
      id: activityId,
      name: second,
      projectId: currentProject.id,
      color: PALETTE[(activityCounter - 1) % PALETTE.length],
      isArchived: false,
      allocatedHours: activityAllocated,
    };

    activities.push(activity);
    projectTotals.set(
      currentProject.id,
      projectTotals.get(currentProject.id) + activityAllocated
    );
  }
}

projects.forEach((project) => {
  project.allocatedHours = projectTotals.get(project.id) || 0;
});

const fileContents = `// AUTO-GENERATED FROM Objectif repartition des tâches.csv
// Do not edit manually. Run frontend/scripts/convert_objectif_csv.cjs instead.

import type { Project, Activity, EmployeeRole, ActivityAllocation } from '@/types';

export const EMPLOYEE_ROLES: EmployeeRole[] = ${JSON.stringify(
  ROLE_COLUMNS.map((role) => role.role),
  null,
  2
)};

export const objectifProjects: Project[] = ${JSON.stringify(
  projects,
  null,
  2
)};

export const objectifActivities: Activity[] = ${JSON.stringify(
  activities,
  null,
  2
)};

export const objectifAllocations: ActivityAllocation[] = ${JSON.stringify(
  allocations,
  null,
  2
)};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContents, 'utf8');

console.log(`Generated ${outputPath}`);
