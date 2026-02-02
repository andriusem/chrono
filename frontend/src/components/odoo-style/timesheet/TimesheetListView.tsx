// ============================================
// TIMESHEET LIST VIEW
// ============================================
// Editable table view for time entries following Odoo's list pattern
// Features inline editing, row actions, and sum footer

import { useState, useMemo } from 'react';
import { Play, Square, Pencil, Trash2, Clock } from 'lucide-react';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { useProjectStore } from '@/store/projectStore';
import { useAuthStore } from '@/store/authStore';
import { formatDuration, formatTime, formatRelativeDate } from '@/lib/formatters';
import { useTimer } from '@/hooks/useTimer';
import type { TimeEntry, Activity, Project } from '@/types';

interface TimesheetListViewProps {
  entries: TimeEntry[];
  groupBy?: 'date' | 'project' | 'activity' | null;
  onStartTimer?: (activityId: string, projectId: string) => void;
  onStopTimer?: (entryId: string, comments?: string) => void;
  onEditEntry?: (entry: TimeEntry) => void;
  onDeleteEntry?: (entryId: string) => void;
}

export function TimesheetListView({
  entries,
  groupBy = null,
  onStartTimer,
  onStopTimer,
  onDeleteEntry,
}: TimesheetListViewProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { getProjectById, getActivitiesForProject } = useProjectStore();
  const runningTimer = useTimeEntryStore((state) =>
    currentUser ? state.getRunningTimer(currentUser.id) : null
  );

  // Helper to get activity by ID
  const getActivityById = (activityId: string): Activity | undefined => {
    // Search across all projects' activities
    const allProjects = useProjectStore.getState().projects;
    for (const project of allProjects) {
      const activities = getActivitiesForProject(project.id);
      const found = activities.find((a) => a.id === activityId);
      if (found) return found;
    }
    return undefined;
  };

  // Group entries if needed
  const groupedEntries = useMemo(() => {
    if (!groupBy) {
      return { ungrouped: entries };
    }

    const groups: Record<string, TimeEntry[]> = {};
    entries.forEach((entry) => {
      let key: string;
      switch (groupBy) {
        case 'date':
          key = entry.startTime.split('T')[0];
          break;
        case 'project':
          key = entry.projectId;
          break;
        case 'activity':
          key = entry.activityId;
          break;
        default:
          key = 'ungrouped';
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(entry);
    });

    return groups;
  }, [entries, groupBy]);

  // Calculate total hours
  const totalMinutes = useMemo(() => {
    return entries.reduce((sum, entry) => sum + (entry.durationMinutes || 0), 0);
  }, [entries]);

  const getGroupLabel = (key: string): string => {
    if (!groupBy || key === 'ungrouped') return '';
    switch (groupBy) {
      case 'date':
        return formatRelativeDate(new Date(key));
      case 'project':
        return getProjectById(key)?.name || key;
      case 'activity':
        return getActivityById(key)?.name || key;
      default:
        return key;
    }
  };

  return (
    <div className="odoo-sheet">
      <table className="odoo-table">
        <thead>
          <tr>
            <th style={{ width: '120px' }}>Date</th>
            <th>Project</th>
            <th>Activity</th>
            <th style={{ width: '100px' }}>Duration</th>
            <th>Comments</th>
            <th style={{ width: '100px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedEntries).map(([groupKey, groupEntries]) => (
            <>
              {/* Group Header */}
              {groupBy && groupKey !== 'ungrouped' && (
                <tr key={`group-${groupKey}`} className="bg-[var(--odoo-gray-100)]">
                  <td colSpan={6} className="font-semibold text-[var(--odoo-gray-700)]">
                    {getGroupLabel(groupKey)}
                    <span className="ml-2 text-sm font-normal text-[var(--odoo-gray-500)]">
                      ({groupEntries.length} entries)
                    </span>
                  </td>
                </tr>
              )}

              {/* Entries */}
              {groupEntries.map((entry) => (
                <TimesheetRow
                  key={entry.id}
                  entry={entry}
                  activity={getActivityById(entry.activityId)}
                  project={getProjectById(entry.projectId)}
                  isRunning={runningTimer?.id === entry.id}
                  onStart={() => onStartTimer?.(entry.activityId, entry.projectId)}
                  onStop={(comments) => onStopTimer?.(entry.id, comments)}
                  onDelete={() => onDeleteEntry?.(entry.id)}
                />
              ))}
            </>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-[var(--odoo-gray-100)] font-semibold">
            <td colSpan={3} className="text-right">
              Total
            </td>
            <td>{formatDuration(totalMinutes)}</td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ============================================
// TIMESHEET ROW COMPONENT
// ============================================

interface TimesheetRowProps {
  entry: TimeEntry;
  activity?: Activity;
  project?: Project;
  isRunning: boolean;
  onStart: () => void;
  onStop: (comments?: string) => void;
  onDelete: () => void;
}

function TimesheetRow({
  entry,
  activity,
  project,
  isRunning,
  onStart,
  onStop,
  onDelete,
}: TimesheetRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editComments, setEditComments] = useState(entry.comments || '');

  // Live timer for running entries
  const { elapsedSeconds } = useTimer({
    startTime: entry.startTime,
    isRunning: isRunning,
  });

  const formatLiveTimer = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopClick = () => {
    onStop(editComments || undefined);
  };

  const rowClass = `${entry.isDeleted ? 'odoo-row-muted' : ''} ${
    isRunning ? 'bg-blue-50' : ''
  }`;

  return (
    <tr className={rowClass}>
      {/* Date */}
      <td>
        <span className="text-[var(--odoo-gray-700)]">
          {formatRelativeDate(new Date(entry.startTime))}
        </span>
        <br />
        <span className="text-xs text-[var(--odoo-gray-500)]">
          {formatTime(new Date(entry.startTime))}
          {entry.endTime && ` - ${formatTime(new Date(entry.endTime))}`}
        </span>
      </td>

      {/* Project */}
      <td>
        <span className="text-[var(--odoo-gray-800)]">
          {project?.name || 'Unknown Project'}
        </span>
      </td>

      {/* Activity */}
      <td>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: activity?.color || '#ccc' }}
          />
          <span>{activity?.name || 'Unknown Activity'}</span>
        </div>
      </td>

      {/* Duration */}
      <td>
        {isRunning ? (
          <span className="odoo-timer-display odoo-timer-running">
            {formatLiveTimer(elapsedSeconds)}
          </span>
        ) : (
          <span>{formatDuration(entry.durationMinutes || 0)}</span>
        )}
      </td>

      {/* Comments */}
      <td>
        {isRunning || isEditing ? (
          <input
            type="text"
            value={editComments}
            onChange={(e) => setEditComments(e.target.value)}
            placeholder="What are you working on?"
            className="odoo-form-input w-full"
            autoFocus={isEditing}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setIsEditing(false);
              if (e.key === 'Escape') {
                setEditComments(entry.comments || '');
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <span
            className="odoo-inline-edit block truncate max-w-[300px]"
            onClick={() => entry.status === 'completed' && setIsEditing(true)}
            title={entry.comments}
          >
            {entry.comments || (
              <span className="text-[var(--odoo-gray-400)] italic">
                No comments
              </span>
            )}
          </span>
        )}
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-1">
          {isRunning ? (
            <button
              onClick={handleStopClick}
              className="p-1.5 rounded hover:bg-[var(--odoo-danger-light)] text-[var(--odoo-danger)]"
              title="Stop timer"
            >
              <Square className="h-4 w-4" />
            </button>
          ) : entry.status === 'completed' ? (
            <>
              <button
                onClick={onStart}
                className="p-1.5 rounded hover:bg-[var(--odoo-success-light)] text-[var(--odoo-success)]"
                title="Start timer for this activity"
              >
                <Play className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded hover:bg-[var(--odoo-gray-200)] text-[var(--odoo-gray-600)]"
                title="Edit entry"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-1.5 rounded hover:bg-[var(--odoo-danger-light)] text-[var(--odoo-gray-500)] hover:text-[var(--odoo-danger)]"
                title="Delete entry"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          ) : (
            <span className="text-xs text-[var(--odoo-gray-500)] flex items-center gap-1">
              {entry.status === 'paused' && <Clock className="h-3 w-3" />}
              {entry.status === 'interrupted' && <Clock className="h-3 w-3 text-[var(--odoo-warning)]" />}
              {entry.status}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}
