import { useEffect, useMemo, useState } from 'react';
import { format, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { OdooHeader } from '@/components/odoo-style/shared';
import { useProjectStore } from '@/store/projectStore';
import { useDomainStore } from '@/store/domainStore';
import { useTaskStore } from '@/store/taskStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { mockUsers } from '@/data/mockData';

export function IlyaDashboardPage() {
  const navigate = useNavigate();
  const { projects, projectDomains, projectActivities } = useProjectStore();
  const { getDomainTemplateById } = useDomainStore();
  const { tasks, featureFlags } = useTaskStore();
  const { entries } = useTimeEntryStore();
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [pollTick, setPollTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPollTick(Date.now());
    }, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status === 'active'),
    [projects]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (projectFilter !== 'all' && task.projectId !== projectFilter) {
        return false;
      }
      if (domainFilter !== 'all' && task.projectDomainId !== domainFilter) {
        return false;
      }
      return true;
    });
  }, [tasks, projectFilter, domainFilter]);

  const tasksByStatus = useMemo(
    () => ({
      todo: filteredTasks.filter((task) => task.status === 'todo').length,
      inProgress: filteredTasks.filter((task) => task.status === 'in_progress').length,
      done: filteredTasks.filter((task) => task.status === 'done').length,
    }),
    [filteredTasks]
  );

  void pollTick;
  const runningRows = useMemo(
    () =>
      entries
        .filter((entry) => entry.status === 'running' && !entry.isDeleted)
        .filter((entry) => {
          if (projectFilter !== 'all' && entry.projectId !== projectFilter) {
            return false;
          }
          if (domainFilter !== 'all' && entry.projectDomainId !== domainFilter) {
            return false;
          }
          return true;
        })
        .map((entry) => ({
          entryId: entry.id,
          taskTitle: tasks.find((task) => task.id === entry.taskId)?.title || entry.taskId,
          userName: mockUsers.find((user) => user.id === entry.userId)?.displayName || entry.userId,
          projectName: projects.find((project) => project.id === entry.projectId)?.name || entry.projectId,
          startedAt: format(new Date(entry.startTime), 'yyyy-MM-dd HH:mm'),
        })),
    [entries, tasks, projects, projectFilter, domainFilter]
  );
  const runningTasks = runningRows.length;

  const completionTrend = useMemo(() => {
    const now = new Date();
    const countForWindow = (days: number) =>
      filteredTasks.filter((task) => {
        if (!task.completedAt) return false;
        return new Date(task.completedAt) >= subDays(now, days);
      }).length;
    return {
      last7: countForWindow(7),
      last30: countForWindow(30),
    };
  }, [filteredTasks]);

  const byDomain = useMemo(() => {
    const groups = new Map<string, { total: number; done: number }>();
    filteredTasks.forEach((task) => {
      const current = groups.get(task.projectDomainId) || { total: 0, done: 0 };
      current.total += 1;
      if (task.status === 'done') current.done += 1;
      groups.set(task.projectDomainId, current);
    });
    return Array.from(groups.entries()).map(([projectDomainId, metrics]) => {
      const projectDomain = projectDomains.find((domain) => domain.id === projectDomainId);
      const name = projectDomain
        ? getDomainTemplateById(projectDomain.domainTemplateId)?.name || projectDomain.domainTemplateId
        : projectDomainId;
      return { projectDomainId, name, ...metrics };
    });
  }, [filteredTasks, projectDomains, getDomainTemplateById]);

  const byActivity = useMemo(() => {
    const groups = new Map<string, number>();
    filteredTasks.forEach((task) => {
      groups.set(task.projectActivityId, (groups.get(task.projectActivityId) || 0) + 1);
    });
    return Array.from(groups.entries()).map(([projectActivityId, total]) => {
      const activity = projectActivities.find((item) => item.id === projectActivityId);
      return {
        projectActivityId,
        name: activity?.name || projectActivityId,
        total,
      };
    });
  }, [filteredTasks, projectActivities]);

  const employeeWorkload = useMemo(
    () =>
      mockUsers
        .filter((user) => user.isActive)
        .map((user) => {
          const ownedTasks = filteredTasks.filter((task) => task.assigneeUserId === user.id);
          return {
            userId: user.id,
            name: user.displayName,
            open: ownedTasks.filter((task) => task.status === 'todo').length,
            inProgress: ownedTasks.filter((task) => task.status === 'in_progress').length,
            completedToday: ownedTasks.filter(
              (task) =>
                !!task.completedAt && format(new Date(task.completedAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
            ).length,
          };
        }),
    [filteredTasks]
  );

  return (
    <div className="odoo-page min-h-screen">
      <OdooHeader
        title="ILYA Global Dashboard"
        breadcrumbs={[{ label: 'ILYA Dashboard' }]}
        secondaryActions={[{ label: 'Projects', onClick: () => navigate('/projects') }]}
      />

      <div className="p-4 space-y-4">
        {!featureFlags.enableILYADashboard && (
          <div className="odoo-sheet p-4">
            ILYA dashboard feature flag is disabled.
          </div>
        )}

        <div className="odoo-sheet p-4 grid gap-3 md:grid-cols-3">
          <select
            className="odoo-form-input"
            value={projectFilter}
            onChange={(event) => setProjectFilter(event.target.value)}
          >
            <option value="all">All projects</option>
            {activeProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <select
            className="odoo-form-input"
            value={domainFilter}
            onChange={(event) => setDomainFilter(event.target.value)}
          >
            <option value="all">All domains</option>
            {projectDomains
              .filter((projectDomain) => projectFilter === 'all' || projectDomain.projectId === projectFilter)
              .map((projectDomain) => (
                <option key={projectDomain.id} value={projectDomain.id}>
                  {getDomainTemplateById(projectDomain.domainTemplateId)?.name || projectDomain.id}
                </option>
              ))}
          </select>
          <div className="text-xs text-[var(--odoo-gray-500)] flex items-center">
            Scope: {filteredTasks.length} tasks
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <MetricCard label="Active Projects" value={activeProjects.length} />
          <MetricCard label="To Do" value={tasksByStatus.todo} />
          <MetricCard label="In Progress" value={tasksByStatus.inProgress} />
          <MetricCard label="Done" value={tasksByStatus.done} />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <MetricCard label="Running Now" value={runningTasks} />
          <MetricCard label="Completed (7d)" value={completionTrend.last7} />
          <MetricCard label="Completed (30d)" value={completionTrend.last30} />
        </div>

        <div className="odoo-sheet p-4">
          <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
            Execution Now (15s polling)
          </h3>
          <table className="odoo-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Task</th>
                <th>Project</th>
                <th>Started</th>
              </tr>
            </thead>
            <tbody>
              {runningRows.map((row) => (
                <tr key={row.entryId}>
                  <td>{row.userName}</td>
                  <td>{row.taskTitle}</td>
                  <td>{row.projectName}</td>
                  <td>{row.startedAt}</td>
                </tr>
              ))}
              {runningRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-xs text-[var(--odoo-gray-500)]">
                    No running task timers in current filter scope.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <div className="odoo-sheet p-4">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
              Domain Aggregation
            </h3>
            <table className="odoo-table">
              <thead>
                <tr>
                  <th>Domain</th>
                  <th>Done</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {byDomain.map((item) => (
                  <tr key={item.projectDomainId}>
                    <td>{item.name}</td>
                    <td>{item.done}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="odoo-sheet p-4">
            <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
              Activity Aggregation
            </h3>
            <table className="odoo-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {byActivity.map((item) => (
                  <tr key={item.projectActivityId}>
                    <td>{item.name}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="odoo-sheet p-4">
          <h3 className="text-sm font-semibold text-[var(--odoo-gray-700)] mb-3">
            Employee Workload Snapshot
          </h3>
          <table className="odoo-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Open</th>
                <th>In Progress</th>
                <th>Completed Today</th>
              </tr>
            </thead>
            <tbody>
              {employeeWorkload.map((row) => (
                <tr key={row.userId}>
                  <td>{row.name}</td>
                  <td>{row.open}</td>
                  <td>{row.inProgress}</td>
                  <td>{row.completedToday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="odoo-sheet p-4">
      <p className="text-xs text-[var(--odoo-gray-500)]">{label}</p>
      <p className="text-2xl font-semibold text-[var(--odoo-gray-800)]">{value}</p>
    </div>
  );
}
