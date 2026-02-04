// ============================================
// PROJECT FORM VIEW
// ============================================
// Detailed project view following Odoo's form pattern
// Features: Header with status, stat buttons, notebook tabs

import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Users, Layers, Plus, Trash2 } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { formatDuration, formatSignedDuration } from '@/lib/formatters';
import { StatusBar } from '@/components/odoo-style/shared';
import { StatButton, StatButtonGroup } from '@/components/odoo-style/shared/StatButton';
import type { Project } from '@/types';

interface ProjectFormViewProps {
  project: Project;
  onBack: () => void;
  onStatusChange: (status: 'active' | 'archived') => void;
}

export function ProjectFormView({
  project,
  onBack,
  onStatusChange,
}: ProjectFormViewProps) {
  const [activeTab, setActiveTab] = useState<'activities' | 'team' | 'settings'>('activities');
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityColor, setNewActivityColor] = useState('#3878ff');
  const [newActivityAllocatedHours, setNewActivityAllocatedHours] = useState('');
  const [allocatedDrafts, setAllocatedDrafts] = useState<Record<string, string>>({});
  const [projectAllocatedDraft, setProjectAllocatedDraft] = useState('');

  const {
    getActivitiesForProject,
    getAssignedEmployeeIds,
    createActivity,
    updateActivity,
    updateProject,
    archiveActivity,
    assignEmployee,
    unassignEmployee,
  } = useProjectStore();
  const { getTotalMinutesForActivity, getTotalMinutesForProject } = useTimeEntryStore();

  // Get project data
  const activities = getActivitiesForProject(project.id);
  const assignedEmployeeIds = getAssignedEmployeeIds(project.id);
  // Calculate stats
  const totalMinutes = getTotalMinutesForProject(project.id);
  const allocatedMinutes = Math.round((project.allocatedHours || 0) * 60);
  const remainingMinutes = allocatedMinutes - totalMinutes;
  const showProjectBudget = allocatedMinutes > 0;
  const remainingRatio = showProjectBudget ? remainingMinutes / allocatedMinutes : 1;
  const remainingVariant: 'default' | 'success' | 'warning' | 'danger' =
    !showProjectBudget
      ? 'default'
      : remainingMinutes < 0
        ? 'danger'
        : remainingRatio <= 0.2
          ? 'warning'
          : 'success';

  const isArchived = project.status === 'archived';

  // Status bar stages
  const stages = [
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived' },
  ];

  const handleAddActivity = () => {
    if (!newActivityName.trim()) return;
    const parsedAllocated = parseFloat(newActivityAllocatedHours);
    const allocatedHours =
      Number.isFinite(parsedAllocated) && parsedAllocated > 0
        ? parsedAllocated
        : undefined;

    createActivity({
      name: newActivityName.trim(),
      projectId: project.id,
      color: newActivityColor,
      isArchived: false,
      ...(allocatedHours ? { allocatedHours } : {}),
    });
    setNewActivityName('');
    setNewActivityAllocatedHours('');
  };

  useEffect(() => {
    if (project.allocatedHours && project.allocatedHours > 0) {
      setProjectAllocatedDraft(project.allocatedHours.toString());
    } else {
      setProjectAllocatedDraft('');
    }
  }, [project.id, project.allocatedHours]);

  const handleProjectAllocatedBlur = () => {
    const parsed = parseFloat(projectAllocatedDraft);
    const normalized = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    updateProject(project.id, { allocatedHours: normalized });
    setProjectAllocatedDraft(normalized > 0 ? normalized.toString() : '');
  };

  // Predefined colors for activities
  const activityColors = [
    '#3878ff', '#28a745', '#ffc107', '#dc3545', '#6f42c1',
    '#17a2b8', '#fd7e14', '#e83e8c', '#20c997', '#6c757d',
  ];

  const handleAllocatedChange = (activityId: string, value: string) => {
    setAllocatedDrafts((prev) => ({ ...prev, [activityId]: value }));
  };

  const handleAllocatedBlur = (activityId: string, value: string) => {
    const parsed = parseFloat(value);
    const normalized = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;

    updateActivity(activityId, { allocatedHours: normalized });

    setAllocatedDrafts((prev) => {
      const next = { ...prev };
      if (normalized > 0) {
        next[activityId] = normalized.toString();
      } else {
        delete next[activityId];
      }
      return next;
    });
  };

  return (
    <div className="odoo-page min-h-screen">
      {/* Header */}
      <div className="odoo-header">
        <div className="flex items-center justify-between mb-3">
          {/* Back button and title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded hover:bg-[var(--odoo-gray-200)] text-[var(--odoo-gray-600)]"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-[var(--odoo-gray-800)]">
                {project.name}
              </h1>
              {project.description && (
                <p className="text-sm text-[var(--odoo-gray-500)]">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          {/* Status Bar */}
          <StatusBar
            stages={stages}
            currentStage={project.status}
            onStageClick={(stageId) =>
              onStatusChange(stageId as 'active' | 'archived')
            }
          />
        </div>

        {/* Stat Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <StatButtonGroup>
            <StatButton
              value={formatDuration(totalMinutes)}
              label="Spent"
              icon={Clock}
            />
            <StatButton
              value={showProjectBudget ? formatDuration(allocatedMinutes) : '—'}
              label="Allocated"
            />
            <StatButton
              value={showProjectBudget ? formatSignedDuration(remainingMinutes) : '—'}
              label="Remaining"
              variant={remainingVariant}
            />
          </StatButtonGroup>
          <div className="sm:ml-auto">
            <StatButtonGroup>
              <StatButton
                value={assignedEmployeeIds.length}
                label="Team Members"
                icon={Users}
              />
              <StatButton
                value={activities.length}
                label="Activities"
                icon={Layers}
              />
            </StatButtonGroup>
          </div>
        </div>
      </div>

      {/* Archived Ribbon */}
      {isArchived && (
        <div className="bg-[var(--odoo-warning-light)] border-b border-[var(--odoo-warning)] px-4 py-2 text-sm text-[#856404]">
          ⚠️ This project is archived. Restore it to make changes.
        </div>
      )}

      {/* Notebook Tabs */}
      <div className="odoo-notebook bg-white">
        <div className="odoo-notebook-tabs px-4">
          <button
            className={`odoo-notebook-tab ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
          <button
            className={`odoo-notebook-tab ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team
          </button>
          <button
            className={`odoo-notebook-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="odoo-sheet p-4">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
              Project Activities
            </h3>

            {/* Add Activity Form */}
            {!isArchived && (
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[var(--odoo-gray-200)]">
                <input
                  type="text"
                  value={newActivityName}
                  onChange={(e) => setNewActivityName(e.target.value)}
                  placeholder="New activity name..."
                  className="odoo-form-input flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
                />
                <input
                  type="number"
                  min="0"
                  step="0.25"
                  value={newActivityAllocatedHours}
                  onChange={(e) => setNewActivityAllocatedHours(e.target.value)}
                  placeholder="Allocated hours"
                  className="odoo-form-input w-36"
                />
                <div className="flex items-center gap-1">
                  {activityColors.slice(0, 5).map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewActivityColor(color)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        newActivityColor === color
                          ? 'border-[var(--odoo-gray-800)]'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddActivity}
                  className="odoo-btn odoo-btn-primary flex items-center gap-1"
                  disabled={!newActivityName.trim()}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            )}

            {/* Activity List */}
            <div className="space-y-2">
              {activities.map((activity) => {
                const totalMinutes = getTotalMinutesForActivity(activity.id);
                const allocatedMinutes = Math.round(
                  (activity.allocatedHours || 0) * 60
                );
                const remainingMinutes = allocatedMinutes - totalMinutes;
                const showBudget = allocatedMinutes > 0;
                const remainingRatio = showBudget
                  ? remainingMinutes / allocatedMinutes
                  : 1;
                const remainingClass =
                  remainingMinutes < 0
                    ? 'text-[var(--odoo-danger)]'
                    : remainingRatio <= 0.2
                      ? 'text-[var(--odoo-warning)]'
                      : 'text-[var(--odoo-gray-600)]';

                const draftValue = allocatedDrafts[activity.id];
                const displayValue =
                  draftValue !== undefined
                    ? draftValue
                    : activity.allocatedHours && activity.allocatedHours > 0
                      ? activity.allocatedHours.toString()
                      : '';

                return (
                  <div
                    key={activity.id}
                    className="flex flex-col gap-2 p-3 rounded border border-[var(--odoo-gray-200)] hover:bg-[var(--odoo-gray-100)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: activity.color }}
                        />
                        <span className="font-medium">{activity.name}</span>
                      </div>
                      {!isArchived && (
                        <button
                          onClick={() => archiveActivity(activity.id)}
                          className="p-1.5 rounded hover:bg-[var(--odoo-danger-light)] text-[var(--odoo-gray-500)] hover:text-[var(--odoo-danger)]"
                          title="Delete activity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--odoo-gray-500)]">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--odoo-gray-600)]">
                          Allocated
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.25"
                          value={displayValue}
                          onChange={(e) =>
                            handleAllocatedChange(activity.id, e.target.value)
                          }
                          onBlur={() =>
                            handleAllocatedBlur(activity.id, displayValue)
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              (e.target as HTMLInputElement).blur();
                            }
                            if (e.key === 'Escape') {
                              setAllocatedDrafts((prev) => {
                                const next = { ...prev };
                                delete next[activity.id];
                                return next;
                              });
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          placeholder="0"
                          className="odoo-form-input w-24 py-1"
                          disabled={isArchived}
                        />
                        <span>h</span>
                      </div>
                      <div>
                        Spent: {formatDuration(totalMinutes)}
                      </div>
                      {showBudget && (
                        <div className={remainingClass}>
                          Remaining: {formatSignedDuration(remainingMinutes)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {activities.length === 0 && (
                <p className="text-center text-[var(--odoo-gray-500)] py-4">
                  No activities yet. Add one above.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="odoo-sheet p-4">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
              Team Members
            </h3>
            <TeamAssignmentList
              assignedEmployeeIds={assignedEmployeeIds}
              onAssign={(userId) => assignEmployee(project.id, userId, 'user-1')}
              onUnassign={(userId) => unassignEmployee(project.id, userId)}
              disabled={isArchived}
            />
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="odoo-sheet p-4">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
              Project Settings
            </h3>
            <div className="odoo-form-group">
              <div className="odoo-form-field">
                <label className="odoo-form-label">Project Name</label>
                <input
                  type="text"
                  className="odoo-form-input"
                  defaultValue={project.name}
                  disabled={isArchived}
                />
              </div>
              <div className="odoo-form-field">
                <label className="odoo-form-label">Status</label>
                <select
                  className="odoo-form-input"
                  value={project.status}
                  onChange={(e) =>
                    onStatusChange(e.target.value as 'active' | 'archived')
                  }
                >
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <div className="odoo-form-group mt-4">
              <div className="odoo-form-field">
                <label className="odoo-form-label">Allocated Hours</label>
                <input
                  type="number"
                  min="0"
                  step="0.25"
                  className="odoo-form-input"
                  value={projectAllocatedDraft}
                  onChange={(e) => setProjectAllocatedDraft(e.target.value)}
                  onBlur={handleProjectAllocatedBlur}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      (e.target as HTMLInputElement).blur();
                    }
                    if (e.key === 'Escape') {
                      setProjectAllocatedDraft(
                        project.allocatedHours && project.allocatedHours > 0
                          ? project.allocatedHours.toString()
                          : ''
                      );
                      (e.target as HTMLInputElement).blur();
                    }
                  }}
                  placeholder="0"
                  disabled={isArchived}
                />
              </div>
            </div>
            <div className="odoo-form-field mt-4">
              <label className="odoo-form-label">Description</label>
              <textarea
                className="odoo-form-input min-h-[100px]"
                defaultValue={project.description}
                disabled={isArchived}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// TEAM ASSIGNMENT LIST
// ============================================

import { mockUsers } from '@/data/mockData';

interface TeamAssignmentListProps {
  assignedEmployeeIds: string[];
  onAssign: (userId: string) => void;
  onUnassign: (userId: string) => void;
  disabled?: boolean;
}

function TeamAssignmentList({
  assignedEmployeeIds,
  onAssign,
  onUnassign,
  disabled,
}: TeamAssignmentListProps) {
  const employees = mockUsers.filter((u) => u.role === 'employee' && u.isActive);

  return (
    <div className="space-y-2">
      {employees.map((employee) => {
        const isAssigned = assignedEmployeeIds.includes(employee.id);

        return (
          <div
            key={employee.id}
            className="flex items-center justify-between p-3 rounded border border-[var(--odoo-gray-200)]"
          >
            <div className="flex items-center gap-3">
              <img
                src={employee.avatarUrl}
                alt={employee.displayName}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-[var(--odoo-gray-800)]">
                  {employee.displayName}
                </p>
                <p className="text-xs text-[var(--odoo-gray-500)]">
                  {employee.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => (isAssigned ? onUnassign(employee.id) : onAssign(employee.id))}
              className={`odoo-btn ${isAssigned ? '' : 'odoo-btn-primary'}`}
              disabled={disabled}
            >
              {isAssigned ? 'Remove' : 'Assign'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
