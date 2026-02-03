// ============================================
// PROJECT LIST VIEW
// ============================================
// Table view of projects for PM following Odoo's list pattern
// Features: Status filtering, quick stats, row actions

import { Fragment, useMemo } from 'react';
import { Users, Clock, FolderOpen, Archive, RotateCcw, Settings } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { formatDuration, formatRelativeDate } from '@/lib/formatters';
import { getUserById } from '@/data/mockData';
import type { Project } from '@/types';

interface ProjectListViewProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
  onArchive: (projectId: string) => void;
  onRestore: (projectId: string) => void;
  onSettings: (projectId: string) => void;
  groupBy?: 'date' | 'activity' | 'employee' | null;
}

export function ProjectListView({
  projects,
  onProjectClick,
  onArchive,
  onRestore,
  onSettings,
  groupBy = null,
}: ProjectListViewProps) {
  const { getActivitiesForProject, getAssignedEmployeeIds } = useProjectStore();
  const { getEntriesForProject } = useTimeEntryStore();

  // Calculate stats for each project
  const projectStats = useMemo(() => {
    const stats: Record<string, { hours: number; employees: number; activities: number }> = {};

    projects.forEach((project) => {
      const entries = getEntriesForProject(project.id);
      const thisWeekStart = new Date();
      thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
      thisWeekStart.setHours(0, 0, 0, 0);

      const weekMinutes = entries
        .filter((e) => new Date(e.startTime) >= thisWeekStart && !e.isDeleted)
        .reduce((sum, e) => sum + (e.durationMinutes || 0), 0);

      stats[project.id] = {
        hours: weekMinutes,
        employees: getAssignedEmployeeIds(project.id).length,
        activities: getActivitiesForProject(project.id).length,
      };
    });

    return stats;
  }, [projects, getEntriesForProject, getAssignedEmployeeIds, getActivitiesForProject]);

  // Calculate totals
  const totals = useMemo(() => {
    return projects.reduce(
      (acc, p) => ({
        hours: acc.hours + (projectStats[p.id]?.hours || 0),
        employees: acc.employees + (projectStats[p.id]?.employees || 0),
        activities: acc.activities + (projectStats[p.id]?.activities || 0),
      }),
      { hours: 0, employees: 0, activities: 0 }
    );
  }, [projects, projectStats]);

  const groupedProjects = useMemo(() => {
    if (!groupBy) {
      return [{ id: 'ungrouped', label: '', projects }];
    }

    const groups = new Map<string, { id: string; label: string; projects: Project[] }>();
    const addToGroup = (id: string, label: string, project: Project) => {
      const existing = groups.get(id);
      if (existing) {
        existing.projects.push(project);
      } else {
        groups.set(id, { id, label, projects: [project] });
      }
    };

    projects.forEach((project) => {
      switch (groupBy) {
        case 'date': {
          const dateKey = project.createdAt.split('T')[0];
          addToGroup(`date:${dateKey}`, formatRelativeDate(new Date(dateKey)), project);
          break;
        }
        case 'activity': {
          const activities = getActivitiesForProject(project.id);
          if (activities.length === 0) {
            addToGroup('activity:none', 'No Activities', project);
          } else {
            activities.forEach((activity) => {
              addToGroup(`activity:${activity.id}`, activity.name, project);
            });
          }
          break;
        }
        case 'employee': {
          const employeeIds = getAssignedEmployeeIds(project.id);
          if (employeeIds.length === 0) {
            addToGroup('employee:unassigned', 'Unassigned', project);
          } else {
            employeeIds.forEach((employeeId) => {
              const employee = getUserById(employeeId);
              addToGroup(
                `employee:${employeeId}`,
                employee?.displayName || 'Unknown Employee',
                project
              );
            });
          }
          break;
        }
        default:
          addToGroup('ungrouped', '', project);
      }
    });

    return Array.from(groups.values());
  }, [projects, groupBy, getActivitiesForProject, getAssignedEmployeeIds]);

  if (projects.length === 0) {
    return (
      <div className="odoo-sheet p-8 text-center">
        <FolderOpen className="h-12 w-12 mx-auto mb-3 text-[var(--odoo-gray-400)]" />
        <p className="text-[var(--odoo-gray-600)]">No projects found</p>
      </div>
    );
  }

  return (
    <div className="odoo-sheet">
      <table className="odoo-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th style={{ width: '120px' }}>Status</th>
            <th style={{ width: '120px' }}>This Week</th>
            <th style={{ width: '100px' }}>Team</th>
            <th style={{ width: '100px' }}>Activities</th>
            <th style={{ width: '120px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groupedProjects.map((group) => (
            <Fragment key={group.id}>
              {groupBy && group.id !== 'ungrouped' && (
                <tr className="bg-[var(--odoo-gray-100)]">
                  <td colSpan={6} className="font-semibold text-[var(--odoo-gray-700)]">
                    {group.label}
                    <span className="ml-2 text-sm font-normal text-[var(--odoo-gray-500)]">
                      ({group.projects.length} projects)
                    </span>
                  </td>
                </tr>
              )}
              {group.projects.map((project) => {
                const stats = projectStats[project.id] || { hours: 0, employees: 0, activities: 0 };
                const isArchived = project.status === 'archived';

                return (
                  <tr
                    key={project.id}
                    className={`cursor-pointer ${isArchived ? 'odoo-row-muted' : ''}`}
                    onClick={() => onProjectClick(project.id)}
                  >
                    {/* Project Name */}
                    <td>
                      <div>
                        <span className="font-medium text-[var(--odoo-gray-800)]">
                          {project.name}
                        </span>
                        {project.description && (
                          <p className="text-xs text-[var(--odoo-gray-500)] truncate max-w-[300px]">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`odoo-badge ${
                          isArchived ? 'odoo-badge-warning' : 'odoo-badge-success'
                        }`}
                      >
                        {isArchived ? 'Archived' : 'Active'}
                      </span>
                    </td>

                    {/* Hours This Week */}
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[var(--odoo-gray-500)]" />
                        <span>{formatDuration(stats.hours)}</span>
                      </div>
                    </td>

                    {/* Team Size */}
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-[var(--odoo-gray-500)]" />
                        <span>{stats.employees}</span>
                      </div>
                    </td>

                    {/* Activities Count */}
                    <td>
                      <span>{stats.activities}</span>
                    </td>

                    {/* Actions */}
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onSettings(project.id)}
                          className="p-1.5 rounded hover:bg-[var(--odoo-gray-200)] text-[var(--odoo-gray-600)]"
                          title="Settings"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                        {isArchived ? (
                          <button
                            onClick={() => onRestore(project.id)}
                            className="p-1.5 rounded hover:bg-[var(--odoo-success-light)] text-[var(--odoo-success)]"
                            title="Restore project"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => onArchive(project.id)}
                            className="p-1.5 rounded hover:bg-[var(--odoo-warning-light)] text-[var(--odoo-gray-500)]"
                            title="Archive project"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-[var(--odoo-gray-100)] font-semibold">
            <td>Total ({projects.length} projects)</td>
            <td></td>
            <td>{formatDuration(totals.hours)}</td>
            <td>{totals.employees}</td>
            <td>{totals.activities}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
