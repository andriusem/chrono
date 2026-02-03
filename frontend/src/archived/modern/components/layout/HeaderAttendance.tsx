// ============================================
// HEADER ATTENDANCE
// ============================================
// Compact clock-in/out display for header (employee only)

import { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AttendanceModal } from '@/components/modals/AttendanceModal';
import { useAuthStore } from '@/store/authStore';
import { useAttendanceStore } from '@/store/attendanceStore';
import { toast } from 'sonner';

export function HeaderAttendance() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { getTodayRecord, clockIn, clockOut } = useAttendanceStore();
  const [showModal, setShowModal] = useState(false);

  // Only show for employees
  if (!currentUser || currentUser.role !== 'employee') {
    return null;
  }

  const attendance = getTodayRecord(currentUser.id);
  const hasClockIn = !!attendance?.clockInTime;
  const hasClockOut = !!attendance?.clockOutTime;

  const handleSave = (clockInTime: string, clockOutTime?: string) => {
    clockIn(currentUser.id, clockInTime);
    if (clockOutTime) {
      clockOut(currentUser.id, clockOutTime);
    }
    toast.success('Attendance saved');
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-2 text-xs font-normal"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center gap-1.5">
          <LogIn className="h-3.5 w-3.5 text-green-600" />
          {hasClockIn ? (
            <span className="font-medium">{attendance?.clockInTime}</span>
          ) : (
            <Badge variant="outline" className="h-5 text-[10px] px-1.5">
              --:--
            </Badge>
          )}
        </div>
        <span className="text-muted-foreground/50">|</span>
        <div className="flex items-center gap-1.5">
          <LogOut className="h-3.5 w-3.5 text-red-600" />
          {hasClockOut ? (
            <span className="font-medium">{attendance?.clockOutTime}</span>
          ) : (
            <Badge variant="outline" className="h-5 text-[10px] px-1.5">
              --:--
            </Badge>
          )}
        </div>
      </Button>

      <AttendanceModal
        open={showModal}
        onClose={() => setShowModal(false)}
        attendance={attendance}
        onSave={handleSave}
      />
    </>
  );
}

