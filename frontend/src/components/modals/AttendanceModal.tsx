// ============================================
// ATTENDANCE MODAL
// ============================================
// Set or edit clock-in/clock-out times

import { useState, useEffect } from 'react';
import { Save, LogIn, LogOut } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import type { Attendance } from '@/types';

interface AttendanceModalProps {
  open: boolean;
  onClose: () => void;
  attendance?: Attendance;
  onSave: (clockIn: string, clockOut?: string) => void;
}

export function AttendanceModal({
  open,
  onClose,
  attendance,
  onSave,
}: AttendanceModalProps) {
  const [clockInTime, setClockInTime] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');
  const [error, setError] = useState('');

  // Initialize form when attendance changes
  useEffect(() => {
    if (attendance) {
      setClockInTime(attendance.clockInTime || '');
      setClockOutTime(attendance.clockOutTime || '');
    } else {
      // Default to current time for new record
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      setClockInTime(timeString);
      setClockOutTime('');
    }
    setError('');
  }, [attendance, open]);

  const handleSave = () => {
    if (!clockInTime) {
      setError('Clock-in time is required.');
      return;
    }

    if (clockOutTime && clockInTime >= clockOutTime) {
      setError('Clock-out time must be after clock-in time.');
      return;
    }

    onSave(clockInTime, clockOutTime || undefined);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {attendance ? 'Edit Attendance' : 'Set Attendance'}
          </DialogTitle>
          <DialogDescription>
            Record your clock-in and clock-out times for today.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Clock In */}
          <div className="space-y-2">
            <Label htmlFor="clock-in" className="flex items-center gap-2">
              <LogIn className="h-4 w-4 text-green-600" />
              Clock In Time
            </Label>
            <Input
              id="clock-in"
              type="time"
              value={clockInTime}
              onChange={(e) => {
                setClockInTime(e.target.value);
                setError('');
              }}
            />
          </div>

          {/* Clock Out */}
          <div className="space-y-2">
            <Label htmlFor="clock-out" className="flex items-center gap-2">
              <LogOut className="h-4 w-4 text-red-600" />
              Clock Out Time
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="clock-out"
              type="time"
              value={clockOutTime}
              onChange={(e) => {
                setClockOutTime(e.target.value);
                setError('');
              }}
              placeholder="Leave blank if still working"
            />
          </div>

          {/* Error message */}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
