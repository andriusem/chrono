// ============================================
// PROJECT LIST
// ============================================
// Grid of project cards

import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

interface ProjectStats {
  totalHoursThisWeek: number;
  activeEmployees: number;
  activitiesCount: number;
}

interface ProjectListProps {
  projects: Project[];
  projectStats: Record<string, ProjectStats>;
  onArchiveProject: (projectId: string) => void;
}

export function ProjectList({
  projects,
  projectStats,
  onArchiveProject,
}: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => {
        const stats = projectStats[project.id] || {
          totalHoursThisWeek: 0,
          activeEmployees: 0,
          activitiesCount: 0,
        };

        return (
          <ProjectCard
            key={project.id}
            project={project}
            totalHoursThisWeek={stats.totalHoursThisWeek}
            activeEmployees={stats.activeEmployees}
            activitiesCount={stats.activitiesCount}
            onArchive={() => onArchiveProject(project.id)}
          />
        );
      })}
    </div>
  );
}

