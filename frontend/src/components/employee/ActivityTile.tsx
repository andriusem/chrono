// ============================================
// ACTIVITY TILE
// ============================================
// Clickable tile for starting/stopping timers

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
  const hasActiveTimer = isRunning || isPaused;

  // Use timer hook for live updates
  const { formattedTime } = useTimer({
    startTime: runningEntry?.startTime || new Date().toISOString(),
    isRunning: isRunning,
  });

  // Determine what icon to show
  const renderIcon = () => {
    if (isRunning) {
      return <Square className="h-6 w-6" />;
    }
    if (isPaused) {
      return <Play className="h-6 w-6" />;
    }
    return <Play className="h-6 w-6" />;
  };

  // Determine the status text
  const renderStatus = () => {
    if (isRunning) {
      return (
        <span className="text-2xl font-mono font-bold tabular-nums">
          {formattedTime}
        </span>
      );
    }
    if (isPaused) {
      return (
        <span className="text-sm font-medium text-amber-600">Paused</span>
      );
    }
    return (
      <span className="text-sm text-white/80">
        {todayMinutes > 0 ? formatDuration(todayMinutes) + ' today' : 'Not started'}
      </span>
    );
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex flex-col items-center justify-center',
        'w-full aspect-square rounded-xl p-4',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Base colors
        !hasActiveTimer && 'hover:scale-[1.02] active:scale-[0.98]',
        // Running state
        isRunning && 'ring-4 ring-white/30 animate-pulse',
        // Paused state
        isPaused && 'ring-2 ring-amber-400'
      )}
      style={{
        backgroundColor: activity.color,
        color: 'white',
      }}
    >
      {/* Activity name */}
      <span className="text-lg font-semibold mb-2 text-center leading-tight">
        {activity.name}
      </span>

      {/* Status / Timer */}
      <div className="flex items-center gap-2">
        {renderIcon()}
        {renderStatus()}
      </div>

      {/* Running indicator dot */}
      {isRunning && (
        <div className="absolute top-3 right-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </div>
      )}

      {/* Today's tracked time badge */}
      {!hasActiveTimer && todayMinutes > 0 && (
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/20 text-xs">
          {formatDuration(todayMinutes)}
        </div>
      )}
    </button>
  );
}
