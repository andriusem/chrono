// ============================================
// CREATE ACTIVITY MODAL
// ============================================
// Form to create a new activity with color picker

import { useState } from 'react';
import { Plus } from 'lucide-react';
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

interface CreateActivityModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; color: string }) => void;
}

// Predefined colors for activities
const ACTIVITY_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#84CC16', // Lime
  '#0EA5E9', // Sky
  '#A855F7', // Violet
];

export function CreateActivityModal({
  open,
  onClose,
  onSubmit,
}: CreateActivityModalProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(ACTIVITY_COLORS[0]);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Activity name is required.');
      return;
    }

    onSubmit({ name: name.trim(), color });
    setName('');
    setColor(ACTIVITY_COLORS[0]);
    setError('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setColor(ACTIVITY_COLORS[0]);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
          <DialogDescription>
            Create a new activity type for this project.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity-name">Activity Name *</Label>
            <Input
              id="activity-name"
              placeholder="e.g., Development, Design, Testing"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {ACTIVITY_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-10 h-10 rounded-lg transition-all ${
                    color === c
                      ? 'ring-2 ring-offset-2 ring-primary scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="p-4 rounded-lg text-white text-center"
              style={{ backgroundColor: color }}
            >
              <p className="font-semibold">{name || 'Activity Name'}</p>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
