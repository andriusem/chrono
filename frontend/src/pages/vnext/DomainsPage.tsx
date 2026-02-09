import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OdooHeader } from '@/components/odoo-style/shared';
import { useProjectStore } from '@/store/projectStore';
import { useDomainStore } from '@/store/domainStore';
import { useTaskStore } from '@/store/taskStore';

type ViewMode = 'grid' | 'list';

export function DomainsPage() {
  const navigate = useNavigate();
  const { projectId = '' } = useParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const { getProjectById, getProjectDomains } = useProjectStore();
  const { getDomainTemplateById } = useDomainStore();
  const { getTasksByProject } = useTaskStore();

  const project = getProjectById(projectId);
  const projectDomains = useMemo(() => getProjectDomains(projectId), [getProjectDomains, projectId]);
  const tasks = useMemo(() => getTasksByProject(projectId), [getTasksByProject, projectId]);

  if (!project) {
    return (
      <div className="odoo-page min-h-screen flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  return (
    <div className="odoo-page min-h-screen">
      <OdooHeader
        title="Domains"
        breadcrumbs={[
          { label: 'Projects', onClick: () => navigate('/projects') },
          { label: project.name },
          { label: 'Domains' },
        ]}
        secondaryActions={[
          { label: 'Project Tasks', onClick: () => navigate(`/projects/${projectId}/tasks`) },
          { label: 'ILYA Dashboard', onClick: () => navigate('/ilya') },
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

        {viewMode === 'grid' ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {projectDomains.map((projectDomain) => {
              const template = getDomainTemplateById(projectDomain.domainTemplateId);
              const domainTasks = tasks.filter((task) => task.projectDomainId === projectDomain.id);
              const done = domainTasks.filter((task) => task.status === 'done').length;
              return (
                <div key={projectDomain.id} className="odoo-sheet p-4">
                  <h3 className="font-semibold text-[var(--odoo-gray-800)]">
                    {template?.name || projectDomain.domainTemplateId}
                  </h3>
                  <p className="text-sm text-[var(--odoo-gray-500)] mb-3">
                    Tasks: {done}/{domainTasks.length}
                  </p>
                  <button
                    className="odoo-btn odoo-btn-primary"
                    onClick={() =>
                      navigate(`/projects/${projectId}/domains/${projectDomain.id}/activities`)
                    }
                  >
                    Activities
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
                  <th>Domain</th>
                  <th>Task Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectDomains.map((projectDomain) => {
                  const template = getDomainTemplateById(projectDomain.domainTemplateId);
                  const domainTasks = tasks.filter((task) => task.projectDomainId === projectDomain.id);
                  const done = domainTasks.filter((task) => task.status === 'done').length;
                  return (
                    <tr key={projectDomain.id}>
                      <td>{template?.name || projectDomain.domainTemplateId}</td>
                      <td>
                        {done}/{domainTasks.length}
                      </td>
                      <td>
                        <button
                          className="odoo-btn odoo-btn-primary"
                          onClick={() =>
                            navigate(`/projects/${projectId}/domains/${projectDomain.id}/activities`)
                          }
                        >
                          Activities
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
