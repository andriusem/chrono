// ============================================
// ODOO HEADER COMPONENT
// ============================================
// Page header with breadcrumbs, title, actions, and clock in/out
// Follows Odoo's control panel pattern - Fixed/sticky header

import { useState } from 'react';
import { ChevronRight, Plus, LogIn, LogOut } from 'lucide-react';
import { ViewSwitcher, type ViewMode } from './ViewSwitcher';
import { useAuthStore } from '@/store/authStore';
import { useAttendanceStore } from '@/store/attendanceStore';
import { AttendanceModal } from '@/components/modals/AttendanceModal';
import { toast } from 'sonner';

interface Breadcrumb {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface OdooHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryActions?: {
    label: string;
    onClick: () => void;
  }[];
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  availableViews?: ViewMode[];
  children?: React.ReactNode;
}

export function OdooHeader({
  title,
  breadcrumbs = [],
  primaryAction,
  secondaryActions = [],
  viewMode,
  onViewModeChange,
  availableViews,
  children,
}: OdooHeaderProps) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { getTodayRecord, clockIn, clockOut } = useAttendanceStore();
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  // Attendance data (employees only)
  const isEmployee = currentUser?.role === 'employee';
  const attendance = currentUser ? getTodayRecord(currentUser.id) : undefined;
  const hasClockIn = !!attendance?.clockInTime;
  const hasClockOut = !!attendance?.clockOutTime;

  const handleAttendanceSave = (clockInTime: string, clockOutTime?: string) => {
    if (!currentUser) return;
    clockIn(currentUser.id, clockInTime);
    if (clockOutTime) {
      clockOut(currentUser.id, clockOutTime);
    }
    toast.success('Attendance saved');
  };

  return (
    <>
      <div className="odoo-header odoo-header-fixed">
        <div className="flex items-center justify-between">
          {/* Left side: Breadcrumbs and Title */}
          <div className="flex items-center gap-2">
            {breadcrumbs.length > 0 && (
              <>
                {breadcrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center gap-2">
                    {crumb.onClick || crumb.href ? (
                      <button
                        onClick={crumb.onClick}
                        className="text-sm text-[var(--odoo-gray-600)] hover:text-[var(--odoo-accent)]"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className="text-sm text-[var(--odoo-gray-600)]">
                        {crumb.label}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-[var(--odoo-gray-400)]" />
                  </span>
                ))}
              </>
            )}
            <h1 className="text-lg font-semibold text-[var(--odoo-gray-800)]">
              {title}
            </h1>
          </div>

          {/* Right side: Clock In/Out, Actions, View Switcher */}
          <div className="flex items-center gap-3">
            {/* Clock In/Out (employees only) */}
            {isEmployee && (
              <button
                onClick={() => setShowAttendanceModal(true)}
                className="odoo-attendance-btn"
              >
                <div className="flex items-center gap-1.5">
                  <LogIn className="h-3.5 w-3.5 text-[var(--odoo-success)]" />
                  <span className={hasClockIn ? 'font-medium' : 'text-[var(--odoo-gray-400)]'}>
                    {hasClockIn ? attendance?.clockInTime : '--:--'}
                  </span>
                </div>
                <span className="text-[var(--odoo-gray-300)]">|</span>
                <div className="flex items-center gap-1.5">
                  <LogOut className="h-3.5 w-3.5 text-[var(--odoo-danger)]" />
                  <span className={hasClockOut ? 'font-medium' : 'text-[var(--odoo-gray-400)]'}>
                    {hasClockOut ? attendance?.clockOutTime : '--:--'}
                  </span>
                </div>
              </button>
            )}

            {/* Secondary Actions */}
            {secondaryActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="odoo-btn"
              >
                {action.label}
              </button>
            ))}

            {/* Primary Action */}
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="odoo-btn odoo-btn-primary flex items-center gap-1.5"
              >
                {primaryAction.icon || <Plus className="h-4 w-4" />}
                {primaryAction.label}
              </button>
            )}

            {/* View Switcher */}
            {viewMode && onViewModeChange && (
              <ViewSwitcher
                currentView={viewMode}
                onViewChange={onViewModeChange}
                availableViews={availableViews}
              />
            )}
          </div>
        </div>

        {/* Additional content (like filter bar) */}
        {children}
      </div>

      {/* Attendance Modal */}
      {isEmployee && (
        <AttendanceModal
          open={showAttendanceModal}
          onClose={() => setShowAttendanceModal(false)}
          attendance={attendance}
          onSave={handleAttendanceSave}
        />
      )}
    </>
  );
}
