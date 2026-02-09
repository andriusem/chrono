import { useEffect, useMemo, useState } from 'react';
import { differenceInMilliseconds, differenceInSeconds, parseISO } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OdooHeader } from '@/components/odoo-style/shared';
import { useAuth } from '@/hooks/useAuth';
import { useAttendanceStore } from '@/store/attendanceStore';
import { useProjectStore } from '@/store/projectStore';
import { useTaskStore } from '@/store/taskStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { formatDuration, formatTimerDisplay } from '@/lib/formatters';
import { mockUsers } from '@/data/mockData';

type TaskTab = 'my' | 'team';
type ColumnStatus = 'todo' | 'in_progress' | 'done';

const KANBAN_COLUMNS: { id: ColumnStatus; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

export function TasksKanbanPage() {
  const navigate = useNavigate();
  const { projectId = '' } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TaskTab>('my');
  const [heartbeatOpen, setHeartbeatOpen] = useState(false);
  const [heartbeatDeadline, setHeartbeatDeadline] = useState<number | null>(null);
  const [heartbeatCountdown, setHeartbeatCountdown] = useState(300);
  const [reconcileClockOut, setReconcileClockOut] = useState('17:00');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskUrgency, setTaskUrgency] = useState('');
  const [taskImportance, setTaskImportance] = useState('');
  const [taskActivityId, setTaskActivityId] = useState('');
  const [taskCreateError, setTaskCreateError] = useState('');
  const [pollTick, setPollTick] = useState(0);

  const { projects, getProjectById, getProjectActivities } = useProjectStore();
  const {
    tasks,
    featureFlags,
    getTasksByProject,
    getTaskById,
    createTask,
    claimTask,
    reassignTask,
    startTask,
    stopTask,
    finishTask,
  } = useTaskStore();
  const {
    entries,
    getRunningTimer,
    startTaskTimer,
    stopTaskTimer,
    acknowledgeHeartbeat,
    getTotalMinutesForTask,
  } = useTimeEntryStore();
  const {
    getTodayRecord,
    hasUnreconciledPreviousDay,
    reconcilePreviousDayClockOut,
  } = useAttendanceStore();

  const project = getProjectById(projectId);
  const projectActivities = useMemo(
    () => getProjectActivities(projectId),
    [getProjectActivities, projectId]
  );
  const projectTasks = useMemo(
    () => getTasksByProject(projectId),
    [getTasksByProject, projectId]
  );
  const projectsById = useMemo(
    () => new Map(projects.map((projectItem) => [projectItem.id, projectItem])),
    [projects]
  );
  const currentUser = user;
  const runningTimer = currentUser ? getRunningTimer(currentUser.id) : undefined;
  const todayAttendance = currentUser ? getTodayRecord(currentUser.id) : undefined;
  const reconciliation = currentUser
    ? hasUnreconciledPreviousDay(currentUser.id)
    : { blocked: false, date: '' };
  const canStartTask = !!todayAttendance?.clockInTime && !reconciliation.blocked;
  const effectiveTaskActivityId = taskActivityId || projectActivities[0]?.id || '';
  const teamQueueTasks = featureFlags.enableOrgWideClaim ? tasks : projectTasks;

  // Near-real-time PM refresh cadence.
  useEffect(() => {
    if (currentUser?.role !== 'pm') return undefined;
    const timer = window.setInterval(() => {
      setPollTick(Date.now());
    }, 15000);
    return () => window.clearInterval(timer);
  }, [currentUser?.role]);

  // Heartbeat prompt every 30 minutes while a timer is running.
  useEffect(() => {
    if (!featureFlags.enableHeartbeatModal) return undefined;
    if (!runningTimer) return undefined;

    const intervalId = window.setInterval(() => {
      if (heartbeatOpen) return;
      const lastPromptAt = runningTimer.lastHeartbeatPromptAt
        ? parseISO(runningTimer.lastHeartbeatPromptAt)
        : parseISO(runningTimer.startTime);
      const elapsedMs = differenceInMilliseconds(new Date(), lastPromptAt);
      if (elapsedMs >= 30 * 60 * 1000) {
        setHeartbeatOpen(true);
        setHeartbeatDeadline(Date.now() + 5 * 60 * 1000);
        setHeartbeatCountdown(300);
      }
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, [runningTimer, heartbeatOpen, featureFlags.enableHeartbeatModal]);

  // 5-minute countdown for unanswered heartbeat.
  useEffect(() => {
    if (!featureFlags.enableHeartbeatModal) return undefined;
    if (!heartbeatOpen || !heartbeatDeadline || !runningTimer || !currentUser) return undefined;

    const intervalId = window.setInterval(() => {
      const secondsLeft = Math.max(0, Math.floor((heartbeatDeadline - Date.now()) / 1000));
      setHeartbeatCountdown(secondsLeft);
      if (secondsLeft === 0) {
        const task = getTaskById(runningTimer.taskId);
        stopTaskTimer({
          entryId: runningTimer.id,
          reason: 'heartbeat_timeout',
        });
        if (task) {
          stopTask(task.id, currentUser.id, 'heartbeat_timeout');
        }
        setHeartbeatOpen(false);
        setHeartbeatDeadline(null);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [
    heartbeatOpen,
    heartbeatDeadline,
    runningTimer,
    currentUser,
    getTaskById,
    stopTaskTimer,
    stopTask,
    featureFlags.enableHeartbeatModal,
  ]);

  const filteredTasks = currentUser
    ? activeTab === 'my'
      ? projectTasks.filter((task) => task.assigneeUserId === currentUser.id)
      : teamQueueTasks
    : [];

  const tasksByColumn = KANBAN_COLUMNS.reduce<Record<ColumnStatus, typeof filteredTasks>>(
    (acc, column) => {
      acc[column.id] = filteredTasks.filter((task) => task.status === column.id);
      return acc;
    },
    { todo: [], in_progress: [], done: [] }
  );

  const runningTask = runningTimer ? getTaskById(runningTimer.taskId) : undefined;
  const runningForSeconds = runningTimer
    ? differenceInSeconds(new Date(), parseISO(runningTimer.startTime))
    : 0;

  void pollTick;
  const runningRows = entries
    .filter((entry) => entry.status === 'running')
    .map((entry) => ({
      entry,
      task: getTaskById(entry.taskId),
      user: mockUsers.find((candidate) => candidate.id === entry.userId),
    }));

  const blockedUsers = mockUsers
    .filter((candidate) => candidate.isActive)
    .map((candidate) => ({
      user: candidate,
      gate: hasUnreconciledPreviousDay(candidate.id),
    }))
    .filter((item) => item.gate.blocked);

  if (!project || !currentUser) {
    return (
      <div className="odoo-page min-h-screen flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  const handleStartTask = (taskId: string) => {
    if (!currentUser || !canStartTask) return;
    const task = getTaskById(taskId);
    if (!task) return;

    const timerResult = startTaskTimer({
      userId: currentUser.id,
      taskId: task.id,
      projectId: task.projectId,
      projectDomainId: task.projectDomainId,
      projectActivityId: task.projectActivityId,
      activityId: task.projectActivityId,
    });
    if (!timerResult.success) return;

    const startResult = startTask(taskId, currentUser.id);
    if (!startResult.success && timerResult.entryId) {
      stopTaskTimer({
        entryId: timerResult.entryId,
        reason: 'manual_stop',
      });
    }
  };

  const handleStopRunning = (reason: 'manual_stop' | 'heartbeat_declined') => {
    if (!currentUser || !runningTimer || !runningTask) return;
    stopTaskTimer({
      entryId: runningTimer.id,
      reason,
    });
    stopTask(runningTask.id, currentUser.id, reason);
  };

  const handleFinishRunning = () => {
    if (!currentUser || !runningTimer || !runningTask) return;
    stopTaskTimer({
      entryId: runningTimer.id,
      reason: 'manual_finish',
    });
    finishTask(runningTask.id, currentUser.id);
  };

  const handleHeartbeatYes = () => {
    if (!runningTimer) return;
    acknowledgeHeartbeat(runningTimer.id);
    setHeartbeatOpen(false);
    setHeartbeatDeadline(null);
  };

  const handleHeartbeatNo = () => {
    handleStopRunning('heartbeat_declined');
    setHeartbeatOpen(false);
    setHeartbeatDeadline(null);
  };

  const handleReconcile = () => {
    if (!currentUser) return;
    reconcilePreviousDayClockOut(currentUser.id, reconcileClockOut);
  };

  const handleCreateTask = () => {
    setTaskCreateError('');
    if (!taskTitle.trim() || !effectiveTaskActivityId || !taskDueDate) {
      setTaskCreateError('Title, activity, urgency, importance, and due date are required.');
      return;
    }

    const urgency = Number.parseInt(taskUrgency, 10);
    const importance = Number.parseInt(taskImportance, 10);
    if (
      Number.isNaN(urgency) ||
      Number.isNaN(importance) ||
      urgency < 1 ||
      urgency > 5 ||
      importance < 1 ||
      importance > 5
    ) {
      setTaskCreateError('Urgency and importance must be between 1 and 5.');
      return;
    }

    const activity = projectActivities.find(
      (candidate) => candidate.id === effectiveTaskActivityId
    );
    if (!activity) {
      setTaskCreateError('Selected activity is invalid.');
      return;
    }

    const result = createTask({
      projectId,
      projectDomainId: activity.projectDomainId,
      projectActivityId: activity.id,
      title: taskTitle.trim(),
      createdByUserId: currentUser.id,
      urgency,
      importance,
      dueDate: taskDueDate,
      isRecurring: false,
    });

    if (!result.success) {
      setTaskCreateError(result.error || 'Task creation failed.');
      return;
    }

    setTaskTitle('');
    setTaskDueDate('');
    setTaskUrgency('');
    setTaskImportance('');
  };

  return (
    <div className="odoo-page min-h-screen">
      <OdooHeader
        title="Tasks"
        breadcrumbs={[
          { label: 'Projects', onClick: () => navigate('/projects') },
          { label: project.name, onClick: () => navigate(`/projects/${projectId}/domains`) },
          { label: 'Tasks' },
        ]}
        secondaryActions={[
          { label: 'Domains', onClick: () => navigate(`/projects/${projectId}/domains`) },
          { label: 'ILYA Dashboard', onClick: () => navigate('/ilya') },
        ]}
      />

      <div className="p-4 space-y-4">
        {reconciliation.blocked && (
          <div className="odoo-sheet p-4 border border-[var(--odoo-warning)] bg-[var(--odoo-warning-light)]">
            <h3 className="font-semibold text-[var(--odoo-gray-800)] mb-2">
              Previous day needs reconciliation
            </h3>
            <p className="text-sm text-[var(--odoo-gray-700)] mb-2">
              You cannot start new work until you add yesterday&apos;s clock-out time.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="time"
                className="odoo-form-input"
                value={reconcileClockOut}
                onChange={(event) => setReconcileClockOut(event.target.value)}
              />
              <button className="odoo-btn odoo-btn-primary" onClick={handleReconcile}>
                Reconcile
              </button>
            </div>
          </div>
        )}

        {!todayAttendance?.clockInTime && (
          <div className="odoo-sheet p-4 border border-[var(--odoo-danger)] bg-[var(--odoo-danger-light)]">
            <p className="text-sm text-[var(--odoo-gray-700)]">
              Clock in before starting tasks. Use the header clock-in control.
            </p>
          </div>
        )}

        <div className="odoo-sheet p-3 flex items-center gap-2">
          <button
            className={`odoo-btn ${activeTab === 'my' ? 'odoo-btn-primary' : ''}`}
            onClick={() => setActiveTab('my')}
          >
            My Tasks
          </button>
          <button
            className={`odoo-btn ${activeTab === 'team' ? 'odoo-btn-primary' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team Queue
          </button>
          {runningTimer && (
            <span className="text-xs text-[var(--odoo-gray-600)] ml-auto">
              Active timer: {formatTimerDisplay(runningForSeconds)}
            </span>
          )}
        </div>

        {activeTab === 'team' && (
          <div className="odoo-sheet p-4 space-y-3">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)]">Create Task</h3>
            <div className="grid gap-3 md:grid-cols-5">
              <input
                className="odoo-form-input"
                placeholder="Task title"
                value={taskTitle}
                onChange={(event) => setTaskTitle(event.target.value)}
              />
              <select
                className="odoo-form-input"
                value={effectiveTaskActivityId}
                onChange={(event) => setTaskActivityId(event.target.value)}
              >
                <option value="">Activity</option>
                {projectActivities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="odoo-form-input"
                value={taskDueDate}
                onChange={(event) => setTaskDueDate(event.target.value)}
              />
              <select
                className="odoo-form-input"
                value={taskUrgency}
                onChange={(event) => setTaskUrgency(event.target.value)}
              >
                <option value="">Urgency</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    U:{value}
                  </option>
                ))}
              </select>
              <select
                className="odoo-form-input"
                value={taskImportance}
                onChange={(event) => setTaskImportance(event.target.value)}
              >
                <option value="">Importance</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    I:{value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="odoo-btn odoo-btn-primary" onClick={handleCreateTask}>
                Create
              </button>
              {taskCreateError && (
                <span className="text-xs text-[var(--odoo-danger)]">{taskCreateError}</span>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-3">
          {KANBAN_COLUMNS.map((column) => (
            <div key={column.id} className="odoo-sheet p-3">
              <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
                {column.label} ({tasksByColumn[column.id].length})
              </h3>
              <div className="space-y-2">
                {tasksByColumn[column.id].map((task) => {
                  const isRunningTask = runningTimer?.taskId === task.id;
                  const isCrossProjectTask = task.projectId !== projectId;
                  const taskProjectName = projectsById.get(task.projectId)?.name || task.projectId;
                  const assignee = mockUsers.find((candidate) => candidate.id === task.assigneeUserId);
                  return (
                    <div key={task.id} className="rounded border border-[var(--odoo-gray-200)] p-3">
                      <div className="font-medium text-[var(--odoo-gray-800)]">{task.title}</div>
                      <div className="text-xs text-[var(--odoo-gray-600)]">
                        Score {task.priorityScore} (U{task.urgency}/I{task.importance}) • Due {task.dueDate}
                      </div>
                      {isCrossProjectTask && (
                        <div className="text-xs text-[var(--odoo-gray-500)] mt-1">
                          Project: {taskProjectName}
                        </div>
                      )}
                      <div className="text-xs text-[var(--odoo-gray-500)] mt-1">
                        Logged: {formatDuration(getTotalMinutesForTask(task.id))}
                      </div>
                      <div className="mt-2 grid gap-2">
                        <select
                          className="odoo-form-input"
                          value={task.assigneeUserId || ''}
                          onChange={(event) =>
                            reassignTask(
                              task.id,
                              event.target.value || undefined,
                              currentUser.id
                            )
                          }
                        >
                          <option value="">Unassigned</option>
                          {mockUsers
                            .filter((candidate) => candidate.isActive)
                            .map((candidate) => (
                              <option key={candidate.id} value={candidate.id}>
                                {candidate.displayName}
                              </option>
                            ))}
                        </select>
                        <div className="text-xs text-[var(--odoo-gray-500)]">
                          Assignee: {assignee?.displayName || 'Unassigned'}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {!task.assigneeUserId && featureFlags.enableOrgWideClaim && (
                          <button
                            className="odoo-btn"
                            onClick={() => claimTask(task.id, currentUser.id)}
                          >
                            Claim
                          </button>
                        )}
                        {task.status !== 'done' && (
                          <button
                            className="odoo-btn odoo-btn-primary"
                            onClick={() => handleStartTask(task.id)}
                            disabled={
                              !canStartTask ||
                              !!isCrossProjectTask ||
                              (!!runningTimer && !isRunningTask)
                            }
                          >
                            Start
                          </button>
                        )}
                        {isRunningTask && (
                          <>
                            <button className="odoo-btn" onClick={() => handleStopRunning('manual_stop')}>
                              Stop
                            </button>
                            <button className="odoo-btn odoo-btn-primary" onClick={handleFinishRunning}>
                              Finish
                            </button>
                          </>
                        )}
                        {isCrossProjectTask && (
                          <button
                            className="odoo-btn"
                            onClick={() => navigate(`/projects/${task.projectId}/tasks`)}
                          >
                            Open Project
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {currentUser.role === 'pm' && (
          <div className="odoo-sheet p-4">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
              PM Live Monitor (15s polling)
            </h3>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold text-[var(--odoo-gray-600)] mb-2">
                  Running Timers
                </h4>
                <div className="space-y-2">
                  {runningRows.map(({ entry, task, user }) => (
                    <div key={entry.id} className="rounded border border-[var(--odoo-gray-200)] p-2 text-xs">
                      {user?.displayName || entry.userId} • {task?.title || entry.taskId}
                    </div>
                  ))}
                  {runningRows.length === 0 && (
                    <p className="text-xs text-[var(--odoo-gray-500)]">No running timers.</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[var(--odoo-gray-600)] mb-2">
                  Blocked Users (reconciliation)
                </h4>
                <div className="space-y-2">
                  {blockedUsers.map((item) => (
                    <div
                      key={item.user.id}
                      className="rounded border border-[var(--odoo-warning)] bg-[var(--odoo-warning-light)] p-2 text-xs"
                    >
                      {item.user.displayName} blocked on {item.gate.date}
                    </div>
                  ))}
                  {blockedUsers.length === 0 && (
                    <p className="text-xs text-[var(--odoo-gray-500)]">No blocked users.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={featureFlags.enableHeartbeatModal ? heartbeatOpen : false}
        onOpenChange={setHeartbeatOpen}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you still working on this task?</DialogTitle>
            <DialogDescription>
              Timer will auto-stop in {heartbeatCountdown}s if no response is received.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button className="odoo-btn" onClick={handleHeartbeatNo}>
              No, stop
            </button>
            <button className="odoo-btn odoo-btn-primary" onClick={handleHeartbeatYes}>
              Yes, continue
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
