// ============================================
// TIMER CONFLICT MODAL
// ============================================
// Shown when user tries to start a second timer

import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Activity } from '@/types';

interface TimerConflictModalProps {
  open: boolean;
  onClose: () => void;
  runningActivity: Activity | null;
  message?: string;
}

export function TimerConflictModal({
  open,
  onClose,
  runningActivity,
  message,
}: TimerConflictModalProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Timer Already Running</DialogTitle>
          </div>
          <DialogDescription>
            {message || 'You can only have one timer running at a time.'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {runningActivity && (
            <div
              className="p-4 rounded-lg text-white text-center"
              style={{ backgroundColor: runningActivity.color }}
            >
              <p className="text-sm opacity-80">Currently tracking:</p>
              <p className="text-lg font-semibold">{runningActivity.name}</p>
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-4 text-center">
            Please stop or pause your current timer before starting a new one.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
