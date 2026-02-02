// ============================================
// CURRENT ACTIVITY CARD
// ============================================
// Shows the currently running activity with comment editor

import { useState, useEffect } from 'react';
import { Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { formatTimeRange } from '@/lib/formatters';
import type { TimeEntry, Activity, Project } from '@/types';

interface CurrentActivityCardProps {
  runningEntry?: TimeEntry;
  activity?: Activity;
  project?: Project;
  onUpdateComments: (entryId: string, comments: string) => void;
}

export function CurrentActivityCard({
  runningEntry,
  activity,
  project,
  onUpdateComments,
}: CurrentActivityCardProps) {
  const [comments, setComments] = useState(runningEntry?.comments || '');
  const [isSaving, setIsSaving] = useState(false);

  
  // Sync comments when entry changes
  useEffect(() => {
    setComments(runningEntry?.comments || '');
  }, [runningEntry?.id, runningEntry?.comments]);

  // Auto-save comments with debounce
  useEffect(() => {
    if (!runningEntry || comments === runningEntry.comments) return;

    const timeout = setTimeout(() => {
      setIsSaving(true);
      onUpdateComments(runningEntry.id, comments);
      setTimeout(() => setIsSaving(false), 500);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [comments, runningEntry, onUpdateComments]);

  // Empty state when no activity is running
  if (!runningEntry || !activity || !project) {
    return (
      <Card className="h-[400px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Current Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No activity running</p>
            <p className="text-sm mt-1">Select an activity from the list to start tracking</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">In Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-1">
        {/* Activity info */}
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-semibold truncate">{activity.name}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span>{formatTimeRange(runningEntry.startTime, undefined)}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              {project.name}
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4" />
              Comments
            </label>
            {isSaving && (
              <span className="text-xs text-muted-foreground animate-pulse">
                Saving...
              </span>
            )}
          </div>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add notes about what you're working on..."
            className="min-h-[120px] resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
