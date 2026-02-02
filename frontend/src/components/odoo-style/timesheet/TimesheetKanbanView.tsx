// ============================================
// TIMESHEET KANBAN VIEW
// ============================================
// Card-based activity view following Odoo's kanban pattern
// Features: 3-column layout with drag-and-drop (To Do, In Progress, Done)

import { useState, useMemo } from 'react';
import type { DragEvent } from 'react';
import { Play, Square, Clock, User } from 'lucide-react';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { useProjectStore } from '@/store/projectStore';
import { useAuthStore } from '@/store/authStore';
import { formatDuration } from '@/lib/formatters';
import { useTimer } from '@/hooks/useTimer';
import type { Activity, Project, TimeEntry, KanbanStatus } from '@/types';

interface TimesheetKanbanViewProps {
  activities: Activity[];
  project: Project | null;
  onStartTimer: (activityId: string) => void;
  onStopTimer: (entryId: string, comments?: string) => void;
}

const KANBAN_COLUMNS: { id: KanbanStatus; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

export function TimesheetKanbanView({
  activities,
  project,
  onStartTimer,
  onStopTimer,
}: TimesheetKanbanViewProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { entries, getRunningTimer, getTodayMinutesForActivity } = useTimeEntryStore();
  const { updateActivityKanbanStatus } = useProjectStore();

  const runningTimer = currentUser ? getRunningTimer(currentUser.id) : null;

  // Drag state
  const [draggedActivityId, setDraggedActivityId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<KanbanStatus | null>(null);

  // Group activities by kanban status
  const activitiesByColumn = useMemo(() => {
    const grouped: Record<KanbanStatus, Activity[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    activities.forEach((activity) => {
      const status = activity.kanbanStatus || 'todo';
      grouped[status].push(activity);
    });

    return grouped;
  }, [activities]);

  // Calculate total hours for today
  const totalTodayMinutes = useMemo(() => {
    if (!currentUser || !project) return 0;
    return activities.reduce(
      (sum, activity) => sum + getTodayMinutesForActivity(currentUser.id, activity.id),
      0
    );
  }, [activities, currentUser, project, entries, getTodayMinutesForActivity]);

  // Drag handlers
  const handleDragStart = (e: DragEvent<HTMLDivElement>, activityId: string) => {
    setDraggedActivityId(activityId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', activityId);
  };

  const handleDragEnd = () => {
    setDraggedActivityId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, columnId: KanbanStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, columnId: KanbanStatus) => {
    e.preventDefault();
    const activityId = e.dataTransfer.getData('text/plain');
    
    if (activityId) {
      updateActivityKanbanStatus(activityId, columnId);
    }
    
    setDraggedActivityId(null);
    setDragOverColumn(null);
  };

  if (!project) {
    return (
      <div className="odoo-sheet p-8 text-center text-[var(--odoo-gray-500)]">
        Select a project to view activities
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Summary Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-[var(--odoo-gray-600)]">
            Today's Total
          </h3>
          <p className="text-2xl font-semibold text-[var(--odoo-gray-800)]">
            {formatDuration(totalTodayMinutes)}
          </p>
        </div>
        <div className="text-sm text-[var(--odoo-gray-500)]">
          {activities.length} activities
        </div>
      </div>

      {/* Kanban Board - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {KANBAN_COLUMNS.map((column) => (
          <div
            key={column.id}
            className={`odoo-kanban-column ${
              dragOverColumn === column.id ? 'odoo-kanban-column-dragover' : ''
            }`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="odoo-kanban-column-header">
              <h3 className="font-semibold text-[var(--odoo-gray-700)]">
                {column.label}
              </h3>
              <span className="text-sm text-[var(--odoo-gray-500)]">
                {activitiesByColumn[column.id].length}
              </span>
            </div>

            {/* Column Content */}
            <div className="odoo-kanban-column-content">
              {activitiesByColumn[column.id].map((activity) => (
                <ActivityKanbanCard
                  key={activity.id}
                  activity={activity}
                  isRunning={runningTimer?.activityId === activity.id}
                  runningEntry={
                    runningTimer?.activityId === activity.id ? runningTimer : null
                  }
                  todayMinutes={
                    currentUser
                      ? getTodayMinutesForActivity(currentUser.id, activity.id)
                      : 0
                  }
                  onStart={() => onStartTimer(activity.id)}
                  onStop={(comments) =>
                    runningTimer && onStopTimer(runningTimer.id, comments)
                  }
                  isDragging={draggedActivityId === activity.id}
                  onDragStart={(e) => handleDragStart(e, activity.id)}
                  onDragEnd={handleDragEnd}
                />
              ))}

              {activitiesByColumn[column.id].length === 0 && (
                <div className="p-4 text-center text-sm text-[var(--odoo-gray-400)] italic">
                  Drop activities here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="odoo-sheet p-8 text-center text-[var(--odoo-gray-500)]">
          No activities in this project yet
        </div>
      )}
    </div>
  );
}

// ============================================
// ACTIVITY KANBAN CARD
// ============================================

interface ActivityKanbanCardProps {
  activity: Activity;
  isRunning: boolean;
  runningEntry: TimeEntry | null;
  todayMinutes: number;
  onStart: () => void;
  onStop: (comments?: string) => void;
  isDragging?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
}

function ActivityKanbanCard({
  activity,
  isRunning,
  runningEntry,
  todayMinutes,
  onStart,
  onStop,
  isDragging = false,
  onDragStart,
  onDragEnd,
}: ActivityKanbanCardProps) {
  // Live timer
  const { elapsedSeconds } = useTimer({
    startTime: runningEntry?.startTime || new Date().toISOString(),
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

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`odoo-kanban-card ${
        isRunning ? 'border-l-4 border-l-[var(--odoo-accent)]' : ''
      } ${isDragging ? 'odoo-kanban-card-dragging' : ''}`}
      style={{
        borderTopColor: isRunning ? undefined : activity.color,
        borderTopWidth: isRunning ? undefined : '3px',
      }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="odoo-kanban-card-title">{activity.name}</h4>
          <p className="odoo-kanban-card-subtitle">
            Today: {formatDuration(todayMinutes)}
          </p>
        </div>
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: activity.color }}
        />
      </div>

      {/* Running Timer Display */}
      {isRunning && (
        <div className="mb-3 p-3 bg-[var(--odoo-gray-100)] rounded">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-[var(--odoo-accent)] animate-pulse" />
            <span className="odoo-timer-display odoo-timer-running text-lg">
              {formatLiveTimer(elapsedSeconds)}
            </span>
          </div>
          <input
            type="text"
            placeholder="What are you working on?"
            className="odoo-form-input w-full text-sm"
            defaultValue={runningEntry?.comments || ''}
          />
        </div>
      )}

      {/* Card Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[var(--odoo-gray-200)]">
        <div className="flex items-center gap-1 text-xs text-[var(--odoo-gray-500)]">
          <User className="h-3 w-3" />
          <span>You</span>
        </div>

        {isRunning ? (
          <button
            onClick={() => onStop()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--odoo-danger)] text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            <Square className="h-3.5 w-3.5" />
            Stop
          </button>
        ) : (
          <button
            onClick={onStart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--odoo-accent)] text-white text-sm font-medium hover:bg-[var(--odoo-accent-hover)] transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            Start
          </button>
        )}
      </div>
    </div>
  );
}
