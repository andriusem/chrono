// ============================================
// ACTIVITY GRID
// ============================================
// Table view of activity rows

import { ActivityTile } from './ActivityTile';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <div className="w-3" />
          <div className="flex-1">Activity</div>
          <div className="w-20 text-right">Today</div>
          <div className="w-28 text-right">Timer</div>
          <div className="w-10 text-center">Action</div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
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
      </CardContent>
    </Card>
  );
}
