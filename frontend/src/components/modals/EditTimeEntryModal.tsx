// ============================================
// EDIT TIME ENTRY MODAL
// ============================================
// Edit start time, end time, and comments

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format, parseISO } from 'date-fns';
import type { TimeEntry, Activity } from '@/types';

interface EditTimeEntryModalProps {
  open: boolean;
  onClose: () => void;
  entry: TimeEntry | null;
  activity: Activity | null;
  onSave: (updates: { startTime: string; endTime: string; comments: string }) => void;
}

export function EditTimeEntryModal({
  open,
  onClose,
  entry,
  activity,
  onSave,
}: EditTimeEntryModalProps) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');

  // Initialize form when entry changes
  useEffect(() => {
    if (entry) {
      // Extract time portion from ISO string
      setStartTime(format(parseISO(entry.startTime), 'HH:mm'));
      setEndTime(entry.endTime ? format(parseISO(entry.endTime), 'HH:mm') : '');
      setComments(entry.comments || '');
      setError('');
    }
  }, [entry]);

  if (!entry || !activity) return null;

  const handleSave = () => {
    // Validate times
    if (!startTime || !endTime) {
      setError('Both start and end times are required.');
      return;
    }

    if (startTime >= endTime) {
      setError('End time must be after start time.');
      return;
    }

    // Reconstruct ISO datetime strings (same date, new times)
    const date = format(parseISO(entry.startTime), 'yyyy-MM-dd');
    const newStartTime = `${date}T${startTime}:00Z`;
    const newEndTime = `${date}T${endTime}:00Z`;

    onSave({
      startTime: newStartTime,
      endTime: newEndTime,
      comments,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Time Entry</DialogTitle>
          <DialogDescription>
            Update the times and description for this entry.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Activity indicator */}
          <div
            className="px-3 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: activity.color }}
          >
            {activity.name}
          </div>

          {/* Time inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setError('');
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="edit-comments">Comments</Label>
            <Textarea
              id="edit-comments"
              placeholder="What did you work on?"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
