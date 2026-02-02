// ============================================
// CLOCK IN REQUIRED MODAL
// ============================================
// Prompts user to clock in before starting activities

import { LogIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ClockInRequiredModalProps {
  open: boolean;
  onClose: () => void;
  onClockIn: () => void;
}

export function ClockInRequiredModal({
  open,
  onClose,
  onClockIn,
}: ClockInRequiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-[var(--odoo-accent)]" />
            Clock In Required
          </DialogTitle>
          <DialogDescription>
            You need to clock in before you can start tracking time on activities.
            Please clock in first to continue.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClockIn} className="bg-[var(--odoo-accent)] hover:bg-[var(--odoo-accent-hover)]">
            <LogIn className="h-4 w-4 mr-2" />
            Clock In Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
