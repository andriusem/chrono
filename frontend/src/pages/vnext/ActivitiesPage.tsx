import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OdooHeader } from '@/components/odoo-style/shared';
import { useAuth } from '@/hooks/useAuth';
import { useDomainStore } from '@/store/domainStore';
import { useProjectStore } from '@/store/projectStore';
import { useTaskStore } from '@/store/taskStore';

type ViewMode = 'grid' | 'list';

export function ActivitiesPage() {
  const navigate = useNavigate();
  const { projectId = '', projectDomainId = '' } = useParams();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [newActivityName, setNewActivityName] = useState('');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [urgency, setUrgency] = useState('');
  const [importance, setImportance] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [interval, setIntervalValue] = useState('1');
  const [formError, setFormError] = useState('');

  const {
    getProjectById,
    getProjectDomainById,
    getProjectActivities,
    hideProjectActivity,
    restoreProjectActivity,
    createProjectActivity,
    projectActivities,
  } = useProjectStore();
  const { getDomainTemplateById } = useDomainStore();
  const { createTask, getTasksByProject } = useTaskStore();

  const project = getProjectById(projectId);
  const projectDomain = getProjectDomainById(projectDomainId);
  const domainTemplate = projectDomain
    ? getDomainTemplateById(projectDomain.domainTemplateId)
    : undefined;
  const activeActivities = useMemo(
    () => getProjectActivities(projectId, projectDomainId),
    [getProjectActivities, projectId, projectDomainId]
  );
  const allDomainActivities = useMemo(
    () =>
      projectActivities.filter(
        (activity) =>
          activity.projectId === projectId && activity.projectDomainId === projectDomainId
      ),
    [projectActivities, projectId, projectDomainId]
  );
  const projectTasks = useMemo(() => getTasksByProject(projectId), [getTasksByProject, projectId]);

  const effectiveSelectedActivityId = selectedActivityId || activeActivities[0]?.id || '';

  if (!project || !projectDomain) {
    return (
      <div className="odoo-page min-h-screen flex items-center justify-center">
        Project/domain not found.
      </div>
    );
  }

  const handleCreateActivity = () => {
    if (!newActivityName.trim()) return;
    createProjectActivity(projectId, projectDomainId, newActivityName.trim());
    setNewActivityName('');
  };

  const handleCreateTask = () => {
    setFormError('');
    if (!user) return;
    if (!taskTitle.trim() || !effectiveSelectedActivityId || !dueDate) {
      setFormError('Title, activity, urgency, importance, and due date are required.');
      return;
    }

    const urgencyValue = Number.parseInt(urgency, 10);
    const importanceValue = Number.parseInt(importance, 10);
    if (
      Number.isNaN(urgencyValue) ||
      Number.isNaN(importanceValue) ||
      urgencyValue < 1 ||
      urgencyValue > 5 ||
      importanceValue < 1 ||
      importanceValue > 5
    ) {
      setFormError('Urgency and importance must be integers between 1 and 5.');
      return;
    }

    const intervalValue = Math.max(1, Number.parseInt(interval, 10) || 1);
    const result = createTask({
      projectId,
      projectDomainId,
      projectActivityId: effectiveSelectedActivityId,
      title: taskTitle.trim(),
      description: taskDescription.trim() || undefined,
      createdByUserId: user.id,
      urgency: urgencyValue,
      importance: importanceValue,
      dueDate,
      isRecurring,
      recurrenceRule: isRecurring
        ? {
            frequency,
            interval: intervalValue,
            anchorDueDate: dueDate,
            enabled: true,
          }
        : undefined,
    });

    if (!result.success) {
      setFormError(result.error || 'Failed to create task.');
      return;
    }

    setTaskTitle('');
    setTaskDescription('');
    setDueDate('');
    setUrgency('');
    setImportance('');
    setIsRecurring(false);
    setIntervalValue('1');
  };

  return (
    <div className="odoo-page min-h-screen">
      <OdooHeader
        title="Activities"
        breadcrumbs={[
          { label: 'Projects', onClick: () => navigate('/projects') },
          { label: project.name, onClick: () => navigate(`/projects/${projectId}/domains`) },
          { label: domainTemplate?.name || 'Domain' },
          { label: 'Activities' },
        ]}
        secondaryActions={[
          { label: 'Tasks Kanban', onClick: () => navigate(`/projects/${projectId}/tasks`) },
        ]}
      />

      <div className="p-4 space-y-4">
        <div className="odoo-sheet p-3 flex items-center gap-2">
          <span className="text-xs text-[var(--odoo-gray-500)]">View</span>
          <button
            className={`odoo-btn ${viewMode === 'grid' ? 'odoo-btn-primary' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={`odoo-btn ${viewMode === 'list' ? 'odoo-btn-primary' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>

        <div className="odoo-sheet p-4 space-y-3">
          <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)]">
            Add Activity To Domain
          </h3>
          <div className="flex items-center gap-2">
            <input
              className="odoo-form-input flex-1"
              placeholder="Activity name"
              value={newActivityName}
              onChange={(event) => setNewActivityName(event.target.value)}
            />
            <button className="odoo-btn odoo-btn-primary" onClick={handleCreateActivity}>
              Add
            </button>
          </div>
        </div>

        <div className="odoo-sheet p-4 space-y-3">
          <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)]">
            Create Task (Required priority fields)
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            <input
              className="odoo-form-input"
              placeholder="Task title"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
            />
            <select
              className="odoo-form-input"
              value={effectiveSelectedActivityId}
              onChange={(event) => setSelectedActivityId(event.target.value)}
            >
              <option value="">Select activity</option>
              {activeActivities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
            <input
              className="odoo-form-input"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
            <select
              className="odoo-form-input"
              value={urgency}
              onChange={(event) => setUrgency(event.target.value)}
            >
              <option value="">Urgency</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  Urgency {value}
                </option>
              ))}
            </select>
            <select
              className="odoo-form-input"
              value={importance}
              onChange={(event) => setImportance(event.target.value)}
            >
              <option value="">Importance</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  Importance {value}
                </option>
              ))}
            </select>
            <input
              className="odoo-form-input"
              placeholder="Description (optional)"
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
            />
            <div className="flex items-center gap-2">
              <label className="text-xs text-[var(--odoo-gray-600)]">Recurring</label>
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(event) => setIsRecurring(event.target.checked)}
              />
            </div>
            {isRecurring && (
              <>
                <select
                  className="odoo-form-input"
                  value={frequency}
                  onChange={(event) =>
                    setFrequency(event.target.value as 'daily' | 'weekly' | 'monthly')
                  }
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <input
                  className="odoo-form-input"
                  type="number"
                  min={1}
                  value={interval}
                  onChange={(event) => setIntervalValue(event.target.value)}
                />
              </>
            )}
            <button className="odoo-btn odoo-btn-primary" onClick={handleCreateTask}>
              Create Task
            </button>
          </div>
          {formError && <p className="text-xs text-[var(--odoo-danger)]">{formError}</p>}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {allDomainActivities.map((activity) => {
              const activityTasks = projectTasks.filter(
                (task) => task.projectActivityId === activity.id
              );
              return (
                <div key={activity.id} className="odoo-sheet p-4">
                  <h4 className="font-semibold text-[var(--odoo-gray-800)]">{activity.name}</h4>
                  <p className="text-xs text-[var(--odoo-gray-500)] mb-2">
                    Tasks: {activityTasks.length}
                  </p>
                  <p className="text-xs text-[var(--odoo-gray-500)] mb-3">
                    Status: {activity.isHidden ? 'Hidden' : 'Visible'}
                  </p>
                  <button
                    className="odoo-btn"
                    onClick={() =>
                      activity.isHidden
                        ? restoreProjectActivity(activity.id)
                        : hideProjectActivity(activity.id)
                    }
                  >
                    {activity.isHidden ? 'Restore' : 'Hide'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="odoo-sheet">
            <table className="odoo-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Tasks</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allDomainActivities.map((activity) => {
                  const activityTasks = projectTasks.filter(
                    (task) => task.projectActivityId === activity.id
                  );
                  return (
                    <tr key={activity.id}>
                      <td>{activity.name}</td>
                      <td>{activityTasks.length}</td>
                      <td>{activity.isHidden ? 'Hidden' : 'Visible'}</td>
                      <td>
                        <button
                          className="odoo-btn"
                          onClick={() =>
                            activity.isHidden
                              ? restoreProjectActivity(activity.id)
                              : hideProjectActivity(activity.id)
                          }
                        >
                          {activity.isHidden ? 'Restore' : 'Hide'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
