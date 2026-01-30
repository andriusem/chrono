// ============================================
// WEEKLY / MONTHLY LOG
// ============================================
// Time entries grouped by day with tab switch for week/month views

import { useMemo } from 'react';
import { Clock, Calendar, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWithinInterval,
} from 'date-fns';
import { formatDuration, formatTimeRange, formatRelativeDate } from '@/lib/formatters';
import type { TimeEntry, Activity, Project } from '@/types';

interface DayEntriesProps {
  date: Date;
  entries: TimeEntry[];
  activityMap: Map<string, Activity>;
  projectMap: Map<string, Project>;
}

function DayEntries({ date, entries, activityMap, projectMap }: DayEntriesProps) {
  const totalMinutes = entries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      {/* Day header */}
      <div className="flex items-center justify-between mb-2 sticky top-0 bg-background py-1">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{formatRelativeDate(date)}</span>
          <span className="text-sm text-muted-foreground">
            {format(date, 'EEE')}
          </span>
        </div>
        <Badge variant="outline" className="font-mono text-xs">
          {formatDuration(totalMinutes)}
        </Badge>
      </div>

      {/* Entries for this day */}
      <div className="space-y-2 pl-6 border-l-2 border-muted ml-2">
        {entries.map((entry) => {
          const activity = activityMap.get(entry.activityId);
          const project = projectMap.get(entry.projectId);

          if (!activity || !project) return null;

          return (
            <div
              key={entry.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {/* Color indicator */}
              <div
                className="w-2 h-8 rounded-full shrink-0"
                style={{ backgroundColor: activity.color }}
              />

              {/* Entry details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm truncate">
                    {activity.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {project.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeRange(entry.startTime, entry.endTime)}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="font-medium text-foreground">
                    {formatDuration(entry.durationMinutes || 0)}
                  </span>
                </div>

                {entry.comments && (
                  <div className="flex items-start gap-1 mt-1 text-xs text-muted-foreground">
                    <MessageSquare className="h-3 w-3 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{entry.comments}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface WeeklyMonthlyLogProps {
  entries: TimeEntry[];
  activities: Activity[];
  projects: Project[];
}

export function WeeklyMonthlyLog({
  entries,
  activities,
  projects,
}: WeeklyMonthlyLogProps) {
  const activityMap = useMemo(
    () => new Map(activities.map((a) => [a.id, a])),
    [activities]
  );
  const projectMap = useMemo(
    () => new Map(projects.map((p) => [p.id, p])),
    [projects]
  );

  const today = new Date();

  // Get week boundaries (Monday to Sunday)
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  // Get month boundaries
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);

  // Filter entries for this week
  const weekEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (entry.status === 'running') return false; // Exclude running entries
      const entryDate = parseISO(entry.startTime);
      return isWithinInterval(entryDate, { start: weekStart, end: weekEnd });
    });
  }, [entries, weekStart, weekEnd]);

  // Filter entries for this month
  const monthEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (entry.status === 'running') return false;
      const entryDate = parseISO(entry.startTime);
      return isWithinInterval(entryDate, { start: monthStart, end: monthEnd });
    });
  }, [entries, monthStart, monthEnd]);

  // Group entries by day
  const groupEntriesByDay = (entriesToGroup: TimeEntry[], start: Date, end: Date) => {
    const days = eachDayOfInterval({ start, end });
    const grouped: { date: Date; entries: TimeEntry[] }[] = [];

    // Process days in reverse order (most recent first)
    for (const day of days.reverse()) {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayEntries = entriesToGroup.filter(
        (e) => format(parseISO(e.startTime), 'yyyy-MM-dd') === dayStr
      );
      if (dayEntries.length > 0) {
        grouped.push({
          date: day,
          entries: dayEntries.sort(
            (a, b) => parseISO(b.startTime).getTime() - parseISO(a.startTime).getTime()
          ),
        });
      }
    }

    return grouped;
  };

  const weekGrouped = useMemo(
    () => groupEntriesByDay(weekEntries, weekStart, weekEnd),
    [weekEntries, weekStart, weekEnd]
  );

  const monthGrouped = useMemo(
    () => groupEntriesByDay(monthEntries, monthStart, monthEnd),
    [monthEntries, monthStart, monthEnd]
  );

  // Calculate totals
  const weekTotal = weekEntries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  const monthTotal = monthEntries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);

  const renderEmptyState = (message: string) => (
    <div className="text-center py-8 text-muted-foreground">
      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
      <p>{message}</p>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Time History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="h-8 w-fit gap-1 bg-transparent p-0 mb-3">
            <TabsTrigger 
              value="week" 
              className="h-7 px-3 text-xs font-normal data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md"
            >
              Week
              <span className="ml-1.5 text-muted-foreground font-mono">
                {formatDuration(weekTotal)}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="month" 
              className="h-7 px-3 text-xs font-normal data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-md"
            >
              Month
              <span className="ml-1.5 text-muted-foreground font-mono">
                {formatDuration(monthTotal)}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="week">
            {weekGrouped.length === 0 ? (
              renderEmptyState('No completed entries this week.')
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                {weekGrouped.map(({ date, entries: dayEntries }) => (
                  <DayEntries
                    key={format(date, 'yyyy-MM-dd')}
                    date={date}
                    entries={dayEntries}
                    activityMap={activityMap}
                    projectMap={projectMap}
                  />
                ))}
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="month">
            {monthGrouped.length === 0 ? (
              renderEmptyState('No completed entries this month.')
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                {monthGrouped.map(({ date, entries: dayEntries }) => (
                  <DayEntries
                    key={format(date, 'yyyy-MM-dd')}
                    date={date}
                    entries={dayEntries}
                    activityMap={activityMap}
                    projectMap={projectMap}
                  />
                ))}
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
