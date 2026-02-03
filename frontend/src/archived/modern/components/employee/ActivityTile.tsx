// ============================================
// ACTIVITY TILE
// ============================================
// Table row for starting/stopping timers

import { Play, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/lib/formatters';
import { useTimer } from '@/hooks/useTimer';
import type { Activity, TimeEntry } from '@/types';

interface ActivityTileProps {
  activity: Activity;
  todayMinutes: number;
  runningEntry?: TimeEntry;
  onClick: () => void;
  disabled?: boolean;
}

export function ActivityTile({
  activity,
  todayMinutes,
  runningEntry,
  onClick,
  disabled,
}: ActivityTileProps) {
  const isRunning = runningEntry?.status === 'running';
  const isPaused = runningEntry?.status === 'paused';
  // Use timer hook for live updates
  const { formattedTime } = useTimer({
    startTime: runningEntry?.startTime || new Date().toISOString(),
    isRunning: isRunning,
  });

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-4 px-4 py-3 rounded-lg',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:bg-muted/50',
        // Running state
        isRunning && 'bg-primary/5 ring-2 ring-primary/20',
        // Paused state
        isPaused && 'bg-amber-50 dark:bg-amber-950/20 ring-2 ring-amber-400/50'
      )}
    >
      {/* Color indicator */}
      <div
        className="w-3 h-8 rounded-full shrink-0"
        style={{ backgroundColor: activity.color }}
      />

      {/* Activity name */}
      <div className="flex-1 text-left">
        <span className="font-medium">{activity.name}</span>
      </div>

      {/* Today's time */}
      <div className="w-20 text-right text-sm text-muted-foreground tabular-nums">
        {todayMinutes > 0 ? formatDuration(todayMinutes) : '—'}
      </div>

      {/* Timer / Status */}
      <div className="w-28 text-right">
        {isRunning ? (
          <span className="font-mono font-bold text-primary tabular-nums">
            {formattedTime}
          </span>
        ) : isPaused ? (
          <span className="text-sm font-medium text-amber-600">Paused</span>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </div>

      {/* Action button */}
      <div className="w-10 flex justify-center">
        {isRunning ? (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Square className="h-4 w-4 text-primary" />
          </div>
        ) : isPaused ? (
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Play className="h-4 w-4 text-amber-600" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10">
            <Play className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Running indicator */}
      {isRunning && (
        <div className="absolute right-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </div>
      )}
    </button>
  );
}

