// ============================================
// TIME ENTRY TABLE
// ============================================
// Table showing time entries with sorting

import { useState } from 'react';
import { ArrowUpDown, MessageSquare } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatTimeRange, formatDuration } from '@/lib/formatters';
import type { TimeEntry, Activity, User } from '@/types';

interface TimeEntryWithDetails {
  entry: TimeEntry;
  activity: Activity;
  user: User;
}

interface TimeEntryTableProps {
  entries: TimeEntryWithDetails[];
}

type SortField = 'date' | 'employee' | 'activity' | 'duration';
type SortDirection = 'asc' | 'desc';

export function TimeEntryTable({ entries }: TimeEntryTableProps) {
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Handle sort click
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Sort entries
  const sortedEntries = [...entries].sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case 'date':
        comparison = new Date(a.entry.startTime).getTime() - new Date(b.entry.startTime).getTime();
        break;
      case 'employee':
        comparison = a.user.displayName.localeCompare(b.user.displayName);
        break;
      case 'activity':
        comparison = a.activity.name.localeCompare(b.activity.name);
        break;
      case 'duration':
        comparison = (a.entry.durationMinutes || 0) - (b.entry.durationMinutes || 0);
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Calculate total
  const totalMinutes = entries.reduce((sum, e) => sum + (e.entry.durationMinutes || 0), 0);

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton field="date">Date</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="employee">Employee</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="activity">Activity</SortButton>
            </TableHead>
            <TableHead>Time</TableHead>
            <TableHead>
              <SortButton field="duration">Duration</SortButton>
            </TableHead>
            <TableHead>Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEntries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No time entries found for the selected filters.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {sortedEntries.map(({ entry, activity, user }) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {formatDate(entry.startTime)}
                  </TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: activity.color }}
                      />
                      {activity.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatTimeRange(entry.startTime, entry.endTime)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {formatDuration(entry.durationMinutes || 0)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    {entry.comments ? (
                      <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                        <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{entry.comments}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {/* Total row */}
              <TableRow className="bg-muted/50 font-medium">
                <TableCell colSpan={4} className="text-right">
                  Total:
                </TableCell>
                <TableCell>
                  <Badge>{formatDuration(totalMinutes)}</Badge>
                </TableCell>
                <TableCell />
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

