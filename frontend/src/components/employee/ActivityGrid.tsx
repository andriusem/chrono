// ============================================
// ACTIVITY GRID
// ============================================
// Responsive grid of activity tiles

import { ActivityTile } from './ActivityTile';
import type { Activity, TimeEntry } from '@/types';

interface ActivityGridProps {
  activities: Activity[];
  todayMinutesByActivity: Record<string, number>;
  runningEntry?: TimeEntry;
  onActivityClick: (activity: Activity) => void;
  disabledActivityIds?: string[];
}

export function ActivityGrid({
  activities,
  todayMinutesByActivity,
  runningEntry,
  onActivityClick,
  disabledActivityIds = [],
}: ActivityGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {activities.map((activity) => {
        const isRunningThis = runningEntry?.activityId === activity.id;
        const isPausedThis =
          isRunningThis && runningEntry?.status === 'paused';

        return (
          <ActivityTile
            key={activity.id}
            activity={activity}
            todayMinutes={todayMinutesByActivity[activity.id] || 0}
            runningEntry={isRunningThis || isPausedThis ? runningEntry : undefined}
            onClick={() => onActivityClick(activity)}
            disabled={disabledActivityIds.includes(activity.id)}
          />
        );
      })}
    </div>
  );
}
