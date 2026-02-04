// ============================================
// TIMESHEET GRID VIEW
// ============================================
// Weekly calendar grid view for time entries (Odoo-style)
// Features: Week navigation, editable hour cells, row totals

import { useState, useMemo, useCallback } from 'react';
import { Plus, Play } from 'lucide-react';
import {
  format,
  startOfWeek,
  addDays,
  parseISO,
  isToday,
} from 'date-fns';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { useProjectStore } from '@/store/projectStore';
import { useAuthStore } from '@/store/authStore';
import { WeekNavigator } from './WeekNavigator';
import { formatDuration, formatSignedDuration } from '@/lib/formatters';
import type { TimeEntry, Project, Activity } from '@/types';

interface TimesheetGridViewProps {
  onStartTimer?: (activityId: string, projectId: string) => void;
}

interface GridRow {
  projectId: string;
  activityId: string;
  project: Project;
  activity: Activity;
  entries: Map<string, TimeEntry[]>; // date string -> entries
}

export function TimesheetGridView({ onStartTimer }: TimesheetGridViewProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { projects, getProjectById, getActivitiesForProject } = useProjectStore();
  const { entries, getEntriesForUser, getTotalMinutesForActivity } = useTimeEntryStore();
  const addDirectEntry = useTimeEntryStore((state) => state.updateEntry);

  // Week navigation state
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  // Editing state
  const [editingCell, setEditingCell] = useState<{
    rowKey: string;
    date: string;
  } | null>(null);
  const [editValue, setEditValue] = useState('');

  // Add line state
  const [showAddLine, setShowAddLine] = useState(false);
  const [newLineProject, setNewLineProject] = useState('');
  const [newLineActivity, setNewLineActivity] = useState('');

  // Generate week days (Monday to Sunday)
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);

  // Get user entries for the current week
  const userEntries = useMemo(() => {
    if (!currentUser) return [];
    return getEntriesForUser(currentUser.id).filter((entry) => {
      const entryDate = parseISO(entry.startTime);
      return (
        entryDate >= weekStart &&
        entryDate < addDays(weekStart, 7) &&
        !entry.isDeleted
      );
    });
  }, [currentUser, getEntriesForUser, weekStart, entries]);

  // Build grid rows from entries
  const gridRows = useMemo(() => {
    const rowMap = new Map<string, GridRow>();

    userEntries.forEach((entry) => {
      const key = `${entry.projectId}:${entry.activityId}`;
      const dateKey = format(parseISO(entry.startTime), 'yyyy-MM-dd');

      if (!rowMap.has(key)) {
        const project = getProjectById(entry.projectId);
        const activities = getActivitiesForProject(entry.projectId);
        const activity = activities.find((a) => a.id === entry.activityId);

        if (project && activity) {
          rowMap.set(key, {
            projectId: entry.projectId,
            activityId: entry.activityId,
            project,
            activity,
            entries: new Map(),
          });
        }
      }

      const row = rowMap.get(key);
      if (row) {
        if (!row.entries.has(dateKey)) {
          row.entries.set(dateKey, []);
        }
        row.entries.get(dateKey)!.push(entry);
      }
    });

    return Array.from(rowMap.values());
  }, [userEntries, getProjectById, getActivitiesForProject]);

  // Calculate total minutes for a cell
  const getCellMinutes = useCallback(
    (row: GridRow, date: Date): number => {
      const dateKey = format(date, 'yyyy-MM-dd');
      const cellEntries = row.entries.get(dateKey) || [];
      return cellEntries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
    },
    []
  );

  // Calculate row total
  const getRowTotal = useCallback(
    (row: GridRow): number => {
      return weekDays.reduce((sum, day) => sum + getCellMinutes(row, day), 0);
    },
    [weekDays, getCellMinutes]
  );

  // Calculate column total
  const getColumnTotal = useCallback(
    (date: Date): number => {
      return gridRows.reduce((sum, row) => sum + getCellMinutes(row, date), 0);
    },
    [gridRows, getCellMinutes]
  );

  // Calculate grand total
  const grandTotal = useMemo(() => {
    return gridRows.reduce((sum, row) => sum + getRowTotal(row), 0);
  }, [gridRows, getRowTotal]);

  // Format minutes to H:MM
  const formatHours = (minutes: number): string => {
    if (minutes === 0) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  // Parse H:MM or decimal hours to minutes
  const parseHours = (value: string): number => {
    if (!value.trim()) return 0;

    // Handle H:MM format
    if (value.includes(':')) {
      const [hours, mins] = value.split(':').map(Number);
      return (hours || 0) * 60 + (mins || 0);
    }

    // Handle decimal format (e.g., 1.5 = 1h 30m)
    const decimal = parseFloat(value);
    if (!isNaN(decimal)) {
      return Math.round(decimal * 60);
    }

    return 0;
  };

  // Handle cell click to start editing
  const handleCellClick = (rowKey: string, date: string) => {
    const row = gridRows.find(
      (r) => `${r.projectId}:${r.activityId}` === rowKey
    );
    if (row) {
      const dateObj = parseISO(date);
      const currentMinutes = getCellMinutes(row, dateObj);
      setEditingCell({ rowKey, date });
      setEditValue(currentMinutes > 0 ? formatHours(currentMinutes) : '');
    }
  };

  // Handle saving cell edit
  const handleCellSave = () => {
    if (!editingCell || !currentUser) return;

    const minutes = parseHours(editValue);
    const row = gridRows.find(
      (r) => `${r.projectId}:${r.activityId}` === editingCell.rowKey
    );

    if (row) {
      const dateKey = editingCell.date;
      const existingEntries = row.entries.get(dateKey) || [];

      if (existingEntries.length > 0) {
        // Update existing entry's duration
        const entry = existingEntries[0];
        const startTime = parseISO(entry.startTime);
        const endTime = new Date(startTime.getTime() + minutes * 60 * 1000);

        addDirectEntry(entry.id, {
          endTime: endTime.toISOString(),
        });
      } else if (minutes > 0) {
        // Create new entry directly
        const startTime = new Date(`${dateKey}T09:00:00`);
        const endTime = new Date(startTime.getTime() + minutes * 60 * 1000);

        // Use internal method to add entry directly
        const newEntry: TimeEntry = {
          id: `entry-grid-${Date.now()}`,
          userId: currentUser.id,
          activityId: row.activityId,
          projectId: row.projectId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          durationMinutes: minutes,
          status: 'completed',
          isDeleted: false,
        };

        // Add to store via setState
        useTimeEntryStore.setState((state) => ({
          entries: [...state.entries, newEntry],
        }));
      }
    }

    setEditingCell(null);
    setEditValue('');
  };

  // Handle adding a new line
  const handleAddLine = () => {
    if (!newLineProject || !newLineActivity) return;

    // Check if row already exists
    const existingRow = gridRows.find(
      (r) => r.projectId === newLineProject && r.activityId === newLineActivity
    );

    if (!existingRow && currentUser) {
      // Create a placeholder entry for today to show the row
      const today = format(new Date(), 'yyyy-MM-dd');
      const startTime = new Date(`${today}T09:00:00`);

      const newEntry: TimeEntry = {
        id: `entry-grid-${Date.now()}`,
        userId: currentUser.id,
        activityId: newLineActivity,
        projectId: newLineProject,
        startTime: startTime.toISOString(),
        endTime: startTime.toISOString(),
        durationMinutes: 0,
        status: 'completed',
        isDeleted: false,
      };

      useTimeEntryStore.setState((state) => ({
        entries: [...state.entries, newEntry],
      }));
    }

    setShowAddLine(false);
    setNewLineProject('');
    setNewLineActivity('');
  };

  // Get available activities for selected project
  const availableActivities = useMemo(() => {
    if (!newLineProject) return [];
    return getActivitiesForProject(newLineProject);
  }, [newLineProject, getActivitiesForProject]);

  if (!currentUser) {
    return (
      <div className="odoo-sheet p-4 text-center text-[var(--odoo-gray-500)]">
        Please log in to view your timesheet.
      </div>
    );
  }

  return (
    <div className="odoo-sheet">
      {/* Header with START button and week navigation */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--odoo-gray-200)]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (gridRows.length > 0 && onStartTimer) {
                const firstRow = gridRows[0];
                onStartTimer(firstRow.activityId, firstRow.projectId);
              }
            }}
            className="odoo-btn odoo-btn-primary flex items-center gap-2"
            disabled={gridRows.length === 0}
          >
            <Play className="h-4 w-4" />
            START
          </button>
          <div className="text-sm text-[var(--odoo-gray-500)]">
            Press <kbd className="px-1.5 py-0.5 bg-[var(--odoo-gray-100)] rounded text-xs">Enter</kbd> or{' '}
            <kbd className="px-1.5 py-0.5 bg-[var(--odoo-gray-100)] rounded text-xs">a</kbd> to launch the timer
            <br />
            Press <kbd className="px-1.5 py-0.5 bg-[var(--odoo-gray-100)] rounded text-xs">Shift</kbd> +{' '}
            <kbd className="px-1.5 py-0.5 bg-[var(--odoo-gray-100)] rounded text-xs">A</kbd> to add 15 min
          </div>
        </div>
        <WeekNavigator currentWeekStart={weekStart} onWeekChange={setWeekStart} />
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto">
        <table className="odoo-table w-full">
          <thead>
            <tr>
              <th className="text-left min-w-[300px]">Project / Activity</th>
              {weekDays.map((day) => (
                <th
                  key={day.toISOString()}
                  className={`text-center w-20 ${
                    isToday(day)
                      ? 'bg-[var(--odoo-accent-light)] text-[var(--odoo-accent)]'
                      : ''
                  }`}
                >
                  <div className="text-xs font-normal text-[var(--odoo-gray-500)]">
                    {format(day, 'EEE')}
                  </div>
                  <div>{format(day, 'MMM d')}</div>
                </th>
              ))}
              <th className="text-center w-20">Hours</th>
            </tr>
          </thead>
          <tbody>
            {gridRows.map((row, index) => {
              const rowKey = `${row.projectId}:${row.activityId}`;
              const rowTotal = getRowTotal(row);
              const rowLetter = String.fromCharCode(65 + index); // A, B, C...
              const allocatedMinutes = Math.round(
                (row.activity.allocatedHours || 0) * 60
              );
              const totalMinutesForActivity = getTotalMinutesForActivity(row.activityId);
              const remainingMinutes = allocatedMinutes - totalMinutesForActivity;
              const showBudget = allocatedMinutes > 0;
              const remainingRatio = showBudget ? remainingMinutes / allocatedMinutes : 1;
              const remainingClass =
                remainingMinutes < 0
                  ? 'text-[var(--odoo-danger)]'
                  : remainingRatio <= 0.2
                    ? 'text-[var(--odoo-warning)]'
                    : 'text-[var(--odoo-gray-500)]';

              return (
                <tr key={rowKey} className="hover:bg-[var(--odoo-gray-50)]">
                  <td className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-[var(--odoo-gray-200)] flex items-center justify-center text-xs font-medium">
                        {rowLetter}
                      </span>
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: row.activity.color }}
                      />
                      <div>
                        <span className="font-medium">{row.project.name}</span>
                        <span className="text-[var(--odoo-gray-400)] mx-2">|</span>
                        <span className="text-[var(--odoo-gray-600)]">
                          {row.activity.name}
                        </span>
                        {showBudget && (
                          <div className={`text-xs ${remainingClass}`}>
                            Remaining: {formatSignedDuration(remainingMinutes)} /{' '}
                            {formatDuration(allocatedMinutes)}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  {weekDays.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const cellMinutes = getCellMinutes(row, day);
                    const isEditing =
                      editingCell?.rowKey === rowKey &&
                      editingCell?.date === dateKey;
                    const isTodayCol = isToday(day);

                    return (
                      <td
                        key={dateKey}
                        className={`text-center cursor-pointer hover:bg-[var(--odoo-gray-100)] ${
                          isTodayCol ? 'bg-[var(--odoo-accent-light)]' : ''
                        }`}
                        onClick={() =>
                          !isEditing && handleCellClick(rowKey, dateKey)
                        }
                      >
                        {isEditing ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleCellSave}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCellSave();
                              if (e.key === 'Escape') {
                                setEditingCell(null);
                                setEditValue('');
                              }
                            }}
                            className="w-16 text-center border border-[var(--odoo-accent)] rounded px-1 py-0.5 text-sm"
                            autoFocus
                            placeholder="0:00"
                          />
                        ) : (
                          <span
                            className={
                              cellMinutes > 0
                                ? 'text-[var(--odoo-gray-800)]'
                                : 'text-[var(--odoo-gray-300)]'
                            }
                          >
                            {cellMinutes > 0 ? formatHours(cellMinutes) : '0:00'}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="text-center font-semibold">
                    {formatHours(rowTotal) || '0:00'}
                  </td>
                </tr>
              );
            })}

            {/* Empty state */}
            {gridRows.length === 0 && !showAddLine && (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-8 text-[var(--odoo-gray-500)]"
                >
                  No time entries for this week. Click "Add a line" to get started.
                </td>
              </tr>
            )}

            {/* Add Line Row */}
            {showAddLine && (
              <tr className="bg-[var(--odoo-gray-50)]">
                <td colSpan={9} className="p-3">
                  <div className="flex items-center gap-3">
                    <select
                      value={newLineProject}
                      onChange={(e) => {
                        setNewLineProject(e.target.value);
                        setNewLineActivity('');
                      }}
                      className="odoo-form-input"
                    >
                      <option value="">Select Project</option>
                      {projects
                        .filter((p) => p.status === 'active')
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                    <select
                      value={newLineActivity}
                      onChange={(e) => setNewLineActivity(e.target.value)}
                      className="odoo-form-input"
                      disabled={!newLineProject}
                    >
                      <option value="">Select Activity</option>
                      {availableActivities.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddLine}
                      className="odoo-btn odoo-btn-primary"
                      disabled={!newLineProject || !newLineActivity}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowAddLine(false);
                        setNewLineProject('');
                        setNewLineActivity('');
                      }}
                      className="odoo-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-[var(--odoo-gray-100)] font-semibold">
              <td className="text-left">
                <button
                  onClick={() => setShowAddLine(true)}
                  className="flex items-center gap-1 text-[var(--odoo-accent)] hover:underline"
                >
                  <Plus className="h-4 w-4" />
                  Add a line
                </button>
              </td>
              {weekDays.map((day) => {
                const colTotal = getColumnTotal(day);
                return (
                  <td
                    key={day.toISOString()}
                    className={`text-center ${
                      isToday(day) ? 'bg-[var(--odoo-accent-light)]' : ''
                    }`}
                  >
                    {formatHours(colTotal) || '0:00'}
                  </td>
                );
              })}
              <td className="text-center">{formatHours(grandTotal) || '0:00'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
