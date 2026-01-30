// ============================================
// EMPLOYEE DASHBOARD
// ============================================
// Main view for employees to track time

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectSelector } from '@/components/employee/ProjectSelector';
import { ActivityGrid } from '@/components/employee/ActivityGrid';
import { CurrentActivityCard } from '@/components/employee/CurrentActivityCard';
import { EmptyState } from '@/components/employee/EmptyState';
import { WeeklyMonthlyLog } from '@/components/employee/WeeklyMonthlyLog';
import { StartActivityModal } from '@/components/modals/StartActivityModal';
import { StopActivityModal } from '@/components/modals/StopActivityModal';
import { EditTimeEntryModal } from '@/components/modals/EditTimeEntryModal';
import { TimerConflictModal } from '@/components/modals/TimerConflictModal';

import { useAuthStore } from '@/store/authStore';
import { useProjectStore } from '@/store/projectStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
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
        getTodayMinutesForActivity,
    startTimer,
    pauseTimer,
    resumeTimer,
    finishTimer,
    updateEntry,
  } = useTimeEntryStore();

  
  // Local state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Modal states
  const [startModalActivity, setStartModalActivity] = useState<Activity | null>(null);
  const [stopModalEntry, setStopModalEntry] = useState<TimeEntry | null>(null);
  const [editModalEntry, setEditModalEntry] = useState<TimeEntry | null>(null);
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

  // Calculate today's minutes per activity
  const todayMinutesByActivity = useMemo(() => {
    const map: Record<string, number> = {};
    activities.forEach((activity) => {
      map[activity.id] = getTodayMinutesForActivity(userId, activity.id);
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, getTodayMinutesForActivity, userId, entries]);

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

  const handleUpdateComments = (entryId: string, comments: string) => {
    updateEntry(entryId, { comments });
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
        {/* Project Selector */}
        {userProjects.length > 0 && (
          <ProjectSelector
            projects={userProjects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
          />
        )}

        {/* Main content */}
        {userProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {/* Top row: Activity Grid + Current Activity Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Grid - takes 2 columns on large screens */}
              <div className="lg:col-span-2">
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

              {/* Current Activity Card */}
              <CurrentActivityCard
                runningEntry={runningEntry}
                activity={runningEntry ? allActivities.find((a) => a.id === runningEntry.activityId) : undefined}
                project={runningEntry ? projects.find((p) => p.id === runningEntry.projectId) : undefined}
                onUpdateComments={handleUpdateComments}
              />
            </div>

            {/* Time History - full width below */}
            <WeeklyMonthlyLog
              entries={entries.filter((e) => e.userId === userId && !e.isDeleted)}
              activities={allActivities}
              projects={projects}
              onEditEntry={handleEditEntry}
            />
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

      <TimerConflictModal
        open={!!conflictModalMessage}
        onClose={() => setConflictModalMessage(null)}
        runningActivity={runningActivity || null}
        message={conflictModalMessage || undefined}
      />
    </MainLayout>
  );
}
