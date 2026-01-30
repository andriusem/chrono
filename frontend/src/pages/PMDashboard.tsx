// ============================================
// PM DASHBOARD
// ============================================
// Main view for project managers

import { useState, useMemo } from 'react';
import { Plus, FolderKanban, Archive } from 'lucide-react';
import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectList } from '@/components/pm/ProjectList';
import { CreateProjectModal } from '@/components/modals/CreateProjectModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

import { useAuthStore } from '@/store/authStore';
import { useProjectStore } from '@/store/projectStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';

export function PMDashboard() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.id || '';

  // Project store
  const {
    projects,
    activities,
    assignments,
    createProject,
    archiveProject,
    restoreProject,
    getActivitiesForProject,
    getAssignedEmployeeIds,
  } = useProjectStore();

  // Time entry store - for calculating stats
  const { entries } = useTimeEntryStore();

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filter projects by status
  const activeProjects = useMemo(
    () => projects.filter((p) => p.status === 'active'),
    [projects]
  );

  const archivedProjects = useMemo(
    () => projects.filter((p) => p.status === 'archived'),
    [projects]
  );

  // Calculate stats for each project
  const projectStats = useMemo(() => {
    const stats: Record<string, { totalHoursThisWeek: number; activeEmployees: number; activitiesCount: number }> = {};

    // Get start of current week
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    projects.forEach((project) => {
      // Get activities count
      const projectActivities = getActivitiesForProject(project.id);

      // Get assigned employees count
      const assignedEmployees = getAssignedEmployeeIds(project.id);

      // Calculate hours this week
      const projectEntries = entries.filter(
        (e) =>
          e.projectId === project.id &&
          !e.isDeleted &&
          new Date(e.startTime) >= startOfWeek
      );

      const totalMinutes = projectEntries.reduce((sum, entry) => {
        return sum + (entry.durationMinutes || 0);
      }, 0);

      stats[project.id] = {
        totalHoursThisWeek: Math.round((totalMinutes / 60) * 10) / 10,
        activeEmployees: assignedEmployees.length,
        activitiesCount: projectActivities.length,
      };
    });

    return stats;
  }, [projects, activities, assignments, entries, getActivitiesForProject, getAssignedEmployeeIds]);

  // Handlers
  const handleCreateProject = (data: { name: string; description: string }) => {
    createProject({
      name: data.name,
      description: data.description,
      status: 'active',
      createdById: userId,
    });
    toast.success(`Project "${data.name}" created!`);
  };

  const handleArchiveProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      archiveProject(projectId);
      toast.success(`Project "${project.name}" archived`);
    }
  };

  const handleRestoreProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      restoreProject(projectId);
      toast.success(`Project "${project.name}" restored`);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-muted-foreground">
              Manage your team's projects and track time
            </p>
          </div>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Tabs for Active/Archived */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              <FolderKanban className="h-4 w-4" />
              Active
              <Badge variant="secondary" className="ml-1">
                {activeProjects.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="archived" className="gap-2">
              <Archive className="h-4 w-4" />
              Archived
              <Badge variant="secondary" className="ml-1">
                {archivedProjects.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {activeProjects.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <FolderKanban className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Active Projects</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first project to start tracking time.
                </p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>
            ) : (
              <ProjectList
                projects={activeProjects}
                projectStats={projectStats}
                onArchiveProject={handleArchiveProject}
              />
            )}
          </TabsContent>

          <TabsContent value="archived" className="mt-6">
            {archivedProjects.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <Archive className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Archived Projects</h3>
                <p className="text-muted-foreground">
                  Archived projects will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {archivedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge variant="secondary">Archived</Badge>
                    </div>
                    {project.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestoreProject(project.id)}
                    >
                      Restore Project
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
      />
    </MainLayout>
  );
}
