// ============================================
// TODAY'S LOG
// ============================================
// List of time entries for today

import { Clock, Edit2, MessageSquare, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatTimeRange, formatDuration } from '@/lib/formatters';
import { useTimer } from '@/hooks/useTimer';
import type { TimeEntry, Activity, Project } from '@/types';

interface TimeEntryItemProps {
  entry: TimeEntry;
  activity: Activity;
  project: Project;
  onEdit: () => void;
}

function TimeEntryItem({ entry, activity, project, onEdit }: TimeEntryItemProps) {
  const isRunning = entry.status === 'running';

  // Use timer hook for running entries
  const { formattedTime } = useTimer({
    startTime: entry.startTime,
    isRunning,
  });

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      {/* Color indicator */}
      <div
        className="w-2 h-full min-h-[3rem] rounded-full shrink-0"
        style={{ backgroundColor: activity.color }}
      />

      {/* Entry details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium truncate">{activity.name}</span>
          {isRunning && (
            <Badge variant="default" className="text-xs animate-pulse">
              <Play className="h-3 w-3 mr-1" />
              Running
            </Badge>
          )}
          {entry.status === 'paused' && (
            <Badge variant="secondary" className="text-xs">
              Paused
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatTimeRange(entry.startTime, entry.endTime)}</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="font-medium text-foreground">
            {isRunning ? formattedTime : formatDuration(entry.durationMinutes || 0)}
          </span>
        </div>

        {entry.comments && (
          <div className="flex items-start gap-1.5 mt-2 text-sm text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span className="line-clamp-2">{entry.comments}</span>
          </div>
        )}

        <div className="text-xs text-muted-foreground mt-1">
          {project.name}
        </div>
      </div>

      {/* Edit button - only for completed entries */}
      {entry.status === 'completed' && (
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 h-8 w-8"
          onClick={onEdit}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

interface TodaysLogProps {
  entries: TimeEntry[];
  activities: Activity[];
  projects: Project[];
  onEditEntry: (entry: TimeEntry) => void;
}

export function TodaysLog({
  entries,
  activities,
  projects,
  onEditEntry,
}: TodaysLogProps) {
  // Create lookup maps for activities and projects
  const activityMap = new Map(activities.map((a) => [a.id, a]));
  const projectMap = new Map(projects.map((p) => [p.id, p]));

  // Calculate total time today
  const totalMinutes = entries.reduce((sum, entry) => {
    if (entry.durationMinutes) {
      return sum + entry.durationMinutes;
    }
    // For running entries, calculate current duration
    if (entry.status === 'running') {
      const start = new Date(entry.startTime);
      const now = new Date();
      return sum + Math.floor((now.getTime() - start.getTime()) / 60000);
    }
    return sum;
  }, 0);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Today's Log</CardTitle>
          <Badge variant="outline" className="font-mono">
            {formatDuration(totalMinutes)} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No time entries yet today.</p>
            <p className="text-sm">Click an activity tile to start tracking.</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 min-h-[300px] pr-4">
            <div className="space-y-2">
              {entries.map((entry) => {
                const activity = activityMap.get(entry.activityId);
                const project = projectMap.get(entry.projectId);

                if (!activity || !project) return null;

                return (
                  <TimeEntryItem
                    key={entry.id}
                    entry={entry}
                    activity={activity}
                    project={project}
                    onEdit={() => onEditEntry(entry)}
                  />
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

