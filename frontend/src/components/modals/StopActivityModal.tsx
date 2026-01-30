// ============================================
// STOP ACTIVITY MODAL
// ============================================
// Dialog with pause/finish options and comment field

import { useState } from 'react';
import { Pause, Square, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTimer } from '@/hooks/useTimer';
import type { Activity, Project, TimeEntry } from '@/types';

interface StopActivityModalProps {
  open: boolean;
  onClose: () => void;
  entry: TimeEntry | null;
  activity: Activity | null;
  project: Project | null;
  onPause: () => void;
  onResume: () => void;
  onFinish: (comments: string) => void;
}

export function StopActivityModal({
  open,
  onClose,
  entry,
  activity,
  project,
  onPause,
  onResume,
  onFinish,
}: StopActivityModalProps) {
  const [comments, setComments] = useState(entry?.comments || '');

  const isRunning = entry?.status === 'running';
  const isPaused = entry?.status === 'paused';

  // Use timer hook for live display
  const { formattedTime } = useTimer({
    startTime: entry?.startTime || new Date().toISOString(),
    isRunning: isRunning,
  });

  if (!entry || !activity || !project) return null;

  const handleFinish = () => {
    onFinish(comments);
    setComments('');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Timer Running</DialogTitle>
          <DialogDescription>
            What would you like to do with this timer?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Activity info with timer */}
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ backgroundColor: activity.color }}
          >
            <p className="text-lg font-semibold">{activity.name}</p>
            <p className="text-sm opacity-80 mb-2">{project.name}</p>
            <p className="text-3xl font-mono font-bold">{formattedTime}</p>
            {isPaused && (
              <p className="text-sm mt-1 opacity-80">Timer paused</p>
            )}
          </div>

          {/* Comments field */}
          <div className="space-y-2">
            <Label htmlFor="comments">What did you work on?</Label>
            <Textarea
              id="comments"
              placeholder="Describe the work you did..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {/* Pause / Resume button */}
          {isRunning ? (
            <Button variant="outline" onClick={onPause} className="w-full sm:w-auto">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          ) : isPaused ? (
            <Button variant="outline" onClick={onResume} className="w-full sm:w-auto">
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
          ) : null}

          {/* Finish button */}
          <Button onClick={handleFinish} className="w-full sm:w-auto">
            <Square className="h-4 w-4 mr-2" />
            Finish & Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
