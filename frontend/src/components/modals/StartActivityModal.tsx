// ============================================
// START ACTIVITY MODAL
// ============================================
// Confirmation dialog before starting a timer

import { Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Activity, Project } from '@/types';

interface StartActivityModalProps {
  open: boolean;
  onClose: () => void;
  activity: Activity | null;
  project: Project | null;
  onConfirm: () => void;
}

export function StartActivityModal({
  open,
  onClose,
  activity,
  project,
  onConfirm,
}: StartActivityModalProps) {
  if (!activity || !project) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start Timer</DialogTitle>
          <DialogDescription>
            Ready to start tracking time?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div
            className="p-4 rounded-lg text-white text-center"
            style={{ backgroundColor: activity.color }}
          >
            <p className="text-lg font-semibold">{activity.name}</p>
            <p className="text-sm opacity-80">{project.name}</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            <Play className="h-4 w-4 mr-2" />
            Start Timer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
