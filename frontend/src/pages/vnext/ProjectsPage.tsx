import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OdooHeader } from '@/components/odoo-style/shared';
import { useAuth } from '@/hooks/useAuth';
import { useAttendanceStore } from '@/store/attendanceStore';
import { useProjectStore } from '@/store/projectStore';
import { useTaskStore } from '@/store/taskStore';
import { formatDuration } from '@/lib/formatters';

type ViewMode = 'grid' | 'list';

export function ProjectsPage() {
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();
  const { projects, createProject } = useProjectStore();
  const { getTasksByProject } = useTaskStore();
  const { hasUnreconciledPreviousDay } = useAttendanceStore();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status === 'active'),
    [projects]
  );
  const reconciliation = user
    ? hasUnreconciledPreviousDay(user.id)
    : { blocked: false, date: '' };

  const secondaryActions = [
    { label: 'ILYA Dashboard', onClick: () => navigate('/ilya') },
    ...(user?.role === 'pm'
      ? [{ label: 'Employee View', onClick: () => switchRole('employee') }]
      : [{ label: 'PM View', onClick: () => switchRole('pm') }]),
    { label: 'Sign Out', onClick: logout },
  ];

  const handleCreate = () => {
    if (!user || !name.trim()) return;
    const nextProject = createProject({
      name: name.trim(),
      description: description.trim(),
      status: 'active',
      createdById: user.id,
      allocatedHours: 0,
    });
    setName('');
    setDescription('');
    setShowCreate(false);
    navigate(`/projects/${nextProject.id}/domains`);
  };

  return (
    <div className="odoo-page min-h-screen">
      <OdooHeader
        title="Projects"
        breadcrumbs={[{ label: 'Projects' }]}
        primaryAction={
          user?.role === 'pm'
            ? {
                label: showCreate ? 'Close' : 'New Project',
                onClick: () => setShowCreate((value) => !value),
              }
            : undefined
        }
        secondaryActions={secondaryActions}
      />

      <div className="p-4 space-y-4">
        {reconciliation.blocked && (
          <div className="odoo-sheet p-4 border border-[var(--odoo-warning)] bg-[var(--odoo-warning-light)]">
            <p className="text-sm text-[var(--odoo-gray-700)]">
              Attendance reconciliation required for {reconciliation.date}. Task start is blocked
              until clock-out is fixed in Kanban.
            </p>
          </div>
        )}

        {showCreate && (
          <div className="odoo-sheet p-4">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
              Create Project
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              <input
                className="odoo-form-input"
                placeholder="Project name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="odoo-form-input"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <button className="odoo-btn odoo-btn-primary" onClick={handleCreate}>
                Create
              </button>
            </div>
          </div>
        )}

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

        {viewMode === 'grid' ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {activeProjects.map((project) => {
              const tasks = getTasksByProject(project.id);
              const done = tasks.filter((task) => task.status === 'done').length;
              const total = tasks.length;
              const completion = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={project.id} className="odoo-sheet p-4">
                  <h3 className="font-semibold text-[var(--odoo-gray-800)]">{project.name}</h3>
                  <p className="text-sm text-[var(--odoo-gray-500)] mb-3">{project.description}</p>
                  <div className="text-xs text-[var(--odoo-gray-600)] mb-3">
                    Tasks: {done}/{total} done ({completion}%)
                  </div>
                  <div className="text-xs text-[var(--odoo-gray-600)] mb-4">
                    Budget: {formatDuration(Math.round((project.allocatedHours || 0) * 60))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="odoo-btn odoo-btn-primary"
                      onClick={() => navigate(`/projects/${project.id}/domains`)}
                    >
                      Domains
                    </button>
                    <button
                      className="odoo-btn"
                      onClick={() => navigate(`/projects/${project.id}/tasks`)}
                    >
                      Tasks
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="odoo-sheet">
            <table className="odoo-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Tasks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.map((project) => {
                  const tasks = getTasksByProject(project.id);
                  const done = tasks.filter((task) => task.status === 'done').length;
                  return (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>
                        {done}/{tasks.length}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="odoo-btn odoo-btn-primary"
                            onClick={() => navigate(`/projects/${project.id}/domains`)}
                          >
                            Domains
                          </button>
                          <button
                            className="odoo-btn"
                            onClick={() => navigate(`/projects/${project.id}/tasks`)}
                          >
                            Tasks
                          </button>
                        </div>
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
