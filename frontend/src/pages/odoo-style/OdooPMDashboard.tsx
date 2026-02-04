// ============================================
// ODOO-STYLE PM DASHBOARD
// ============================================
// Project management view for PMs following Odoo's design patterns
// Features: Project list, filtering, project form view

import { useState, useMemo } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { useAuthStore } from '@/store/authStore';
import {
  OdooHeader,
  FilterBar,
} from '@/components/odoo-style/shared';
import { ProjectListView } from '@/components/odoo-style/project/ProjectListView';
import { ProjectFormView } from '@/components/odoo-style/project/ProjectFormView';
import { CreateProjectModal } from '@/components/modals/CreateProjectModal';

export function OdooPMDashboard() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const { projects, archiveProject, restoreProject, createProject } = useProjectStore();

  // View state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groupBy, setGroupBy] = useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  // Get filtered projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Filter by status
    if (!showArchived) {
      result = result.filter((p) => p.status === 'active');
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [projects, showArchived, searchQuery]);

  // Get selected project
  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  // Filter options
  const filters = [
    {
      id: 'active',
      label: 'Active',
      isActive: !showArchived,
    },
    {
      id: 'archived',
      label: 'Show Archived',
      isActive: showArchived,
    },
  ];

  const groupByOptions = [
    { id: 'date', label: 'Date' },
    { id: 'activity', label: 'Activity' },
    { id: 'employee', label: 'Employee' },
  ];

  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'active') setShowArchived(false);
    if (filterId === 'archived') setShowArchived(!showArchived);
  };

  const handleCreateProject = (data: { name: string; description: string; allocatedHours?: number }) => {
    if (!currentUser) return;
    createProject({
      name: data.name,
      description: data.description,
      allocatedHours: data.allocatedHours,
      status: 'active',
      createdById: currentUser.id,
    });
    setShowCreateModal(false);
  };

  const handleStatusChange = (status: 'active' | 'archived') => {
    if (!selectedProjectId) return;
    if (status === 'archived') {
      archiveProject(selectedProjectId);
    } else {
      restoreProject(selectedProjectId);
    }
  };

  if (!currentUser) {
    return (
      <div className="odoo-page flex items-center justify-center">
        <p>Please log in to view projects.</p>
      </div>
    );
  }

  // Show project form if one is selected
  if (selectedProject) {
    return (
      <ProjectFormView
        project={selectedProject}
        onBack={() => setSelectedProjectId(null)}
        onStatusChange={handleStatusChange}
      />
    );
  }

  return (
    <div className="odoo-page min-h-screen">
      {/* Header */}
      <OdooHeader
        title="Projects"
        breadcrumbs={[{ label: 'Projects' }]}
        primaryAction={{
          label: 'New Project',
          onClick: () => setShowCreateModal(true),
        }}
      >
        {/* Filter Bar */}
        <FilterBar
          searchPlaceholder="Search projects..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFilterToggle={handleFilterToggle}
          groupByOptions={groupByOptions}
          currentGroupBy={groupBy ?? undefined}
          onGroupByChange={setGroupBy}
        />
      </OdooHeader>

      {/* Main Content */}
      <div className="p-4">
        <ProjectListView
          projects={filteredProjects}
          onProjectClick={setSelectedProjectId}
          onArchive={archiveProject}
          onRestore={restoreProject}
          onSettings={setSelectedProjectId}
          groupBy={groupBy as 'date' | 'activity' | 'employee' | null}
        />
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
}
