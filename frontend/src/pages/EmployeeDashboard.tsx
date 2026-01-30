// ============================================
// EMPLOYEE DASHBOARD
// ============================================
// Main view for employees to track time

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectSelector } from '@/components/employee/ProjectSelector';
import { ActivityGrid } from '@/components/employee/ActivityGrid';
import { TodaysLog } from '@/components/employee/TodaysLog';
import { AttendanceCard } from '@/components/employee/AttendanceCard';
import { EmptyState } from '@/components/employee/EmptyState';
import { StartActivityModal } from '@/components/modals/StartActivityModal';
import { StopActivityModal } from '@/components/modals/StopActivityModal';
import { EditTimeEntryModal } from '@/components/modals/EditTimeEntryModal';
import { AttendanceModal } from '@/components/modals/AttendanceModal';
import { TimerConflictModal } from '@/components/modals/TimerConflictModal';

import { useAuthStore } from '@/store/authStore';
import { useProjectStore } from '@/store/projectStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { useAttendanceStore } from '@/store/attendanceStore';
import { getTodayDateString } from '@/lib/formatters';
import type { Activity, TimeEntry } from '@/types';

export function EmployeeDashboard() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.id || '';

  // Project store
  const { getProjectsForUser, getActivitiesForProject, projects } = useProjectStore();

  // Time entry store
  const {
    entries,
    getRunningTimer,
    getEntriesForUser,
    getTodayMinutesForActivity,
    startTimer,
    pauseTimer,
    resumeTimer,
    finishTimer,
    updateEntry,
  } = useTimeEntryStore();

  // Attendance store
  const { getTodayRecord, clockIn, clockOut } = useAttendanceStore();

  // Local state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Modal states
  const [startModalActivity, setStartModalActivity] = useState<Activity | null>(null);
  const [stopModalEntry, setStopModalEntry] = useState<TimeEntry | null>(null);
  const [editModalEntry, setEditModalEntry] = useState<TimeEntry | null>(null);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [conflictModalMessage, setConflictModalMessage] = useState<string | null>(null);

  // Get user's assigned projects
  const userProjects = useMemo(
    () => getProjectsForUser(userId),
    [getProjectsForUser, userId]
  );

  // Auto-select first project if none selected
  useEffect(() => {
    if (!selectedProjectId && userProjects.length > 0) {
      setSelectedProjectId(userProjects[0].id);
    }
  }, [userProjects, selectedProjectId]);

  // Get activities for selected project
  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId),
    [projects, selectedProjectId]
  );

  const activities = useMemo(
    () => (selectedProjectId ? getActivitiesForProject(selectedProjectId) : []),
    [getActivitiesForProject, selectedProjectId]
  );

  // Get running timer
  const runningEntry = useMemo(
    () => getRunningTimer(userId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getRunningTimer, userId, entries]
  );

  // Get today's entries
  const todayStr = getTodayDateString();
  const todayEntries = useMemo(
    () => getEntriesForUser(userId, todayStr),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getEntriesForUser, userId, todayStr, entries]
  );

  // Calculate today's minutes per activity
  const todayMinutesByActivity = useMemo(() => {
    const map: Record<string, number> = {};
    activities.forEach((activity) => {
      map[activity.id] = getTodayMinutesForActivity(userId, activity.id);
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, getTodayMinutesForActivity, userId, entries]);

  // Get today's attendance
  const todayAttendance = useMemo(
    () => getTodayRecord(userId),
    [getTodayRecord, userId]
  );

  // Get all activities and all projects for the log
  const allActivities = useProjectStore((state) => state.activities);

  // Get running activity for conflict modal
  const runningActivity = useMemo(
    () =>
      runningEntry
        ? allActivities.find((a) => a.id === runningEntry.activityId)
        : null,
    [runningEntry, allActivities]
  );

  // ============================================
  // HANDLERS
  // ============================================

  const handleActivityClick = (activity: Activity) => {
    // Is this the running activity?
    if (runningEntry?.activityId === activity.id) {
      // Open stop modal
      setStopModalEntry(runningEntry);
      return;
    }

    // Is there a different timer running?
    if (runningEntry) {
      setConflictModalMessage('You already have a timer running. Please stop it first.');
      return;
    }

    // Open start modal
    setStartModalActivity(activity);
  };

  const handleStartConfirm = () => {
    if (!startModalActivity || !selectedProjectId) return;

    const result = startTimer(userId, startModalActivity.id, selectedProjectId);

    if (result.success) {
      toast.success(`Timer started for ${startModalActivity.name}`);
    } else {
      setConflictModalMessage(result.error || 'Could not start timer');
    }

    setStartModalActivity(null);
  };

  const handlePause = () => {
    if (!stopModalEntry) return;
    pauseTimer(stopModalEntry.id);
    toast.info('Timer paused');
    setStopModalEntry(null);
  };

  const handleResume = () => {
    if (!stopModalEntry) return;
    const result = resumeTimer(stopModalEntry.id);

    if (result.success) {
      toast.success('Timer resumed');
      setStopModalEntry(null);
    } else {
      setConflictModalMessage(result.error || 'Could not resume timer');
    }
  };

  const handleFinish = (comments: string) => {
    if (!stopModalEntry) return;
    finishTimer(stopModalEntry.id, comments);
    toast.success('Time entry saved!');
    setStopModalEntry(null);
  };

  const handleEditEntry = (entry: TimeEntry) => {
    setEditModalEntry(entry);
  };

  const handleSaveEdit = (updates: { startTime: string; endTime: string; comments: string }) => {
    if (!editModalEntry) return;
    updateEntry(editModalEntry.id, updates);
    toast.success('Entry updated');
    setEditModalEntry(null);
  };

  const handleSaveAttendance = (clockInTime: string, clockOutTime?: string) => {
    clockIn(userId, clockInTime);
    if (clockOutTime) {
      clockOut(userId, clockOutTime);
    }
    toast.success('Attendance saved');
  };

  // ============================================
  // RENDER
  // ============================================

  // Get the activity for edit modal
  const editModalActivity = editModalEntry
    ? allActivities.find((a) => a.id === editModalEntry.activityId)
    : null;

  // Get the activity and project for stop modal
  const stopModalActivity = stopModalEntry
    ? allActivities.find((a) => a.id === stopModalEntry.activityId)
    : null;
  const stopModalProject = stopModalEntry
    ? projects.find((p) => p.id === stopModalEntry.projectId)
    : null;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Track Time</h1>
          {userProjects.length > 0 && (
            <ProjectSelector
              projects={userProjects}
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
            />
          )}
        </div>

        {/* Attendance Card */}
        <AttendanceCard
          attendance={todayAttendance}
          onOpenModal={() => setShowAttendanceModal(true)}
        />

        {/* Main content */}
        {userProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Grid - takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">
                {selectedProject?.name || 'Select a Project'}
              </h2>
              {activities.length > 0 ? (
                <ActivityGrid
                  activities={activities}
                  todayMinutesByActivity={todayMinutesByActivity}
                  runningEntry={runningEntry}
                  onActivityClick={handleActivityClick}
                />
              ) : (
                <EmptyState
                  title="No Activities"
                  message="This project doesn't have any activities yet. Contact your PM to add some."
                />
              )}
            </div>

            {/* Today's Log - takes 1 column */}
            <div>
              <TodaysLog
                entries={todayEntries}
                activities={allActivities}
                projects={projects}
                onEditEntry={handleEditEntry}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <StartActivityModal
        open={!!startModalActivity}
        onClose={() => setStartModalActivity(null)}
        activity={startModalActivity}
        project={selectedProject || null}
        onConfirm={handleStartConfirm}
      />

      <StopActivityModal
        open={!!stopModalEntry}
        onClose={() => setStopModalEntry(null)}
        entry={stopModalEntry}
        activity={stopModalActivity || null}
        project={stopModalProject || null}
        onPause={handlePause}
        onResume={handleResume}
        onFinish={handleFinish}
      />

      <EditTimeEntryModal
        open={!!editModalEntry}
        onClose={() => setEditModalEntry(null)}
        entry={editModalEntry}
        activity={editModalActivity || null}
        onSave={handleSaveEdit}
      />

      <AttendanceModal
        open={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        attendance={todayAttendance}
        onSave={handleSaveAttendance}
      />

      <TimerConflictModal
        open={!!conflictModalMessage}
        onClose={() => setConflictModalMessage(null)}
        runningActivity={runningActivity || null}
        message={conflictModalMessage || undefined}
      />
    </MainLayout>
  );
}
