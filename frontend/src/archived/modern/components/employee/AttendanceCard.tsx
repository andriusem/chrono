// ============================================
// ATTENDANCE CARD
// ============================================
// Shows clock-in/clock-out status for today

import { LogIn, LogOut, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Attendance } from '@/types';

interface AttendanceCardProps {
  attendance?: Attendance;
  onOpenModal: () => void;
}

export function AttendanceCard({ attendance, onOpenModal }: AttendanceCardProps) {
  const hasClockIn = !!attendance?.clockInTime;
  const hasClockOut = !!attendance?.clockOutTime;

  return (
    <Card className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h3 className="font-semibold">Today's Attendance</h3>

              <div className="flex items-center gap-4 mt-1 text-sm">
                {/* Clock In */}
                <div className="flex items-center gap-1.5">
                  <LogIn className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">In:</span>
                  {hasClockIn ? (
                    <span className="font-medium">{attendance?.clockInTime}</span>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Not set
                    </Badge>
                  )}
                </div>

                {/* Clock Out */}
                <div className="flex items-center gap-1.5">
                  <LogOut className="h-4 w-4 text-red-600" />
                  <span className="text-muted-foreground">Out:</span>
                  {hasClockOut ? (
                    <span className="font-medium">{attendance?.clockOutTime}</span>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Not set
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onOpenModal}>
            {hasClockIn ? 'Edit' : 'Set Attendance'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

