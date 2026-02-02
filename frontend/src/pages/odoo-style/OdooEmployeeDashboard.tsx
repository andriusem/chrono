// ============================================
// ODOO-STYLE EMPLOYEE DASHBOARD
// ============================================
// Main timesheet view for employees following Odoo's design patterns
// Features: View switching, filtering, project selection

import { useState, useMemo } from 'react';
import { Clock, Calendar, FolderKanban } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useProjectStore } from '@/store/projectStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { useAttendanceStore } from '@/store/attendanceStore';
import {
  OdooHeader,
  FilterBar,
  type ViewMode,
} from '@/components/odoo-style/shared';
import { TimesheetListView } from '@/components/odoo-style/timesheet/TimesheetListView';
import { TimesheetKanbanView } from '@/components/odoo-style/timesheet/TimesheetKanbanView';
import { TimesheetGridView } from '@/components/odoo-style/timesheet/TimesheetGridView';
import { formatDuration, getTodayDateString } from '@/lib/formatters';
import { StatButton, StatButtonGroup } from '@/components/odoo-style/shared/StatButton';
import { TimerConflictModal } from '@/components/modals/TimerConflictModal';
import { ClockInRequiredModal } from '@/components/modals/ClockInRequiredModal';
import { AttendanceModal } from '@/components/modals/AttendanceModal';
import { toast } from 'sonner';

export function OdooEmployeeDashboard() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { getProjectsForUser, getActivitiesForProject, getProjectById, activities: allActivities } =
    useProjectStore();
  const {
    getEntriesForUser,
    getRunningTimer,
    startTimer,
    finishTimer,
  } = useTimeEntryStore();

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showTodayOnly, setShowTodayOnly] = useState(true);
  const [showMyEntriesOnly, setShowMyEntriesOnly] = useState(true);

  // Modal state
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [showClockInModal, setShowClockInModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [_pendingActivity, setPendingActivity] = useState<{
    activityId: string;
    projectId: string;
  } | null>(null);

  // Attendance state
  const { getTodayRecord, clockIn, clockOut } = useAttendanceStore();
  const todayAttendance = currentUser ? getTodayRecord(currentUser.id) : undefined;
  const isClockedIn = !!todayAttendance?.clockInTime;

  // Get user's projects
  const userProjects = useMemo(() => {
    if (!currentUser) return [];
    return getProjectsForUser(currentUser.id);
  }, [currentUser, getProjectsForUser]);

  // Auto-select first project
  const effectiveProjectId = selectedProjectId || userProjects[0]?.id || null;
  const selectedProject = effectiveProjectId
    ? getProjectById(effectiveProjectId)
    : null;

  // Get activities for selected project
  const activities = useMemo(() => {
    if (!effectiveProjectId) return [];
    return getActivitiesForProject(effectiveProjectId);
  }, [effectiveProjectId, getActivitiesForProject, allActivities]);

  // Get time entries
  const entries = useMemo(() => {
    if (!currentUser) return [];
    let result = getEntriesForUser(currentUser.id);

    // Filter by project if selected
    if (effectiveProjectId) {
      result = result.filter((e) => e.projectId === effectiveProjectId);
    }

    // Filter by today
    if (showTodayOnly) {
      const today = getTodayDateString();
      result = result.filter((e) => e.startTime.startsWith(today));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.comments?.toLowerCase().includes(query) ||
          getProjectById(e.projectId)?.name.toLowerCase().includes(query)
      );
    }

    return result.filter((e) => !e.isDeleted);
  }, [
    currentUser,
    effectiveProjectId,
    showTodayOnly,
    searchQuery,
    getEntriesForUser,
    getProjectById,
  ]);

  // Calculate stats
  const todayMinutes = useMemo(() => {
    if (!currentUser) return 0;
    const today = getTodayDateString();
    return getEntriesForUser(currentUser.id)
      .filter((e) => e.startTime.startsWith(today) && !e.isDeleted)
      .reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  }, [currentUser, getEntriesForUser, entries]);

  const runningTimer = currentUser ? getRunningTimer(currentUser.id) : null;

  // Get running activity for conflict modal
  const runningActivity = runningTimer
    ? activities.find((a) => a.id === runningTimer.activityId) ||
      getActivitiesForProject(runningTimer.projectId).find(
        (a) => a.id === runningTimer.activityId
      ) ||
      null
    : null;

  // Handlers
  const handleStartTimer = (activityId: string, projectId?: string) => {
    if (!currentUser) return;

    const targetProjectId = projectId || effectiveProjectId;
    if (!targetProjectId) return;

    // BUSINESS RULE: Must be clocked in to start activities
    if (!isClockedIn) {
      setPendingActivity({ activityId, projectId: targetProjectId });
      setShowClockInModal(true);
      return;
    }

    // Check for running timer
    if (runningTimer) {
      setPendingActivity({ activityId, projectId: targetProjectId });
      setShowConflictModal(true);
      return;
    }

    startTimer(currentUser.id, activityId, targetProjectId);
  };

  // Handle clock-in from modal
  const handleClockInNow = () => {
    setShowClockInModal(false);
    setShowAttendanceModal(true);
  };

  // Handle attendance save
  const handleAttendanceSave = (clockInTime: string, clockOutTime?: string) => {
    if (!currentUser) return;
    clockIn(currentUser.id, clockInTime);
    if (clockOutTime) {
      clockOut(currentUser.id, clockOutTime);
    }
    toast.success('Clocked in successfully! You can now start tracking time.');
    setShowAttendanceModal(false);
  };

  const handleStopTimer = (entryId: string, comments?: string) => {
    finishTimer(entryId, comments);
  };

  // Filter options
  const filters = [
    {
      id: 'today',
      label: 'Today',
      isActive: showTodayOnly,
    },
    {
      id: 'my_entries',
      label: 'My Entries',
      isActive: showMyEntriesOnly,
    },
  ];

  const groupByOptions = [
    { id: 'date', label: 'Date' },
    { id: 'project', label: 'Project' },
    { id: 'activity', label: 'Activity' },
  ];

  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'today') setShowTodayOnly(!showTodayOnly);
    if (filterId === 'my_entries') setShowMyEntriesOnly(!showMyEntriesOnly);
  };

  if (!currentUser) {
    return (
      <div className="odoo-page flex items-center justify-center">
        <p>Please log in to view your timesheet.</p>
      </div>
    );
  }

  return (
    <div className="odoo-page min-h-screen">
      {/* Header */}
      <OdooHeader
        title="My Timesheets"
        breadcrumbs={[{ label: 'Timesheets' }]}
        primaryAction={{
          label: 'New Entry',
          onClick: () => {
            // Start timer on first activity if available
            if (activities.length > 0 && effectiveProjectId) {
              handleStartTimer(activities[0].id, effectiveProjectId);
            }
          },
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        availableViews={['list', 'kanban', 'grid']}
      >
        {/* Filter Bar */}
        <FilterBar
          searchPlaceholder="Search entries..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterToggle={handleFilterToggle}
          groupByOptions={viewMode === 'list' ? groupByOptions : []}
          currentGroupBy={groupBy || undefined}
          onGroupByChange={setGroupBy}
        />
      </OdooHeader>

      {/* Stats Row */}
      <div className="bg-white border-b border-[var(--odoo-gray-200)] px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Project Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-[var(--odoo-gray-600)]">
              Project:
            </label>
            <select
              value={effectiveProjectId || ''}
              onChange={(e) => setSelectedProjectId(e.target.value || null)}
              className="odoo-form-input py-1.5"
            >
              {userProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <StatButtonGroup>
            <StatButton
              value={formatDuration(todayMinutes)}
              label="Today"
              icon={Clock}
              variant={runningTimer ? 'info' : 'default'}
            />
            <StatButton
              value={entries.length}
              label="Entries"
              icon={Calendar}
            />
            <StatButton
              value={userProjects.length}
              label="Projects"
              icon={FolderKanban}
            />
          </StatButtonGroup>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {viewMode === 'list' && (
          <TimesheetListView
            entries={entries}
            groupBy={groupBy as 'date' | 'project' | 'activity' | null}
            onStartTimer={handleStartTimer}
            onStopTimer={handleStopTimer}
          />
        )}
        {viewMode === 'kanban' && (
          <TimesheetKanbanView
            activities={activities}
            project={selectedProject || null}
            onStartTimer={(activityId) =>
              handleStartTimer(activityId, effectiveProjectId || undefined)
            }
            onStopTimer={handleStopTimer}
          />
        )}
        {viewMode === 'grid' && (
          <TimesheetGridView
            onStartTimer={handleStartTimer}
          />
        )}
      </div>

      {/* Timer Conflict Modal */}
      <TimerConflictModal
        open={showConflictModal}
        onClose={() => {
          setShowConflictModal(false);
          setPendingActivity(null);
        }}
        runningActivity={runningActivity}
        message="Please stop the current timer before starting a new one."
      />

      {/* Clock In Required Modal */}
      <ClockInRequiredModal
        open={showClockInModal}
        onClose={() => {
          setShowClockInModal(false);
          setPendingActivity(null);
        }}
        onClockIn={handleClockInNow}
      />

      {/* Attendance Modal for Clock In */}
      <AttendanceModal
        open={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        attendance={todayAttendance}
        onSave={handleAttendanceSave}
      />
    </div>
  );
}
