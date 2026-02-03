// ============================================
// PROJECT SETTINGS
// ============================================
// Edit project details, activities, and team assignments

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { TeamAssignment } from '@/archived/modern/components/pm/TeamAssignment';
import { CreateActivityModal } from '@/components/modals/CreateActivityModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useAuthStore } from '@/store/authStore';
import { useProjectStore } from '@/store/projectStore';
import { mockUsers } from '@/data/mockData';

export function ProjectSettings() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const userId = currentUser?.id || '';

  // Project store
  const {
    getProjectById,
    getActivitiesForProject,
    getAssignedEmployeeIds,
    updateProject,
    createActivity,
    archiveActivity,
    assignEmployee,
    unassignEmployee,
  } = useProjectStore();

  // Get project data
  const project = projectId ? getProjectById(projectId) : undefined;
  const activities = projectId ? getActivitiesForProject(projectId) : [];
  const assignedEmployeeIds = projectId ? getAssignedEmployeeIds(projectId) : [];

  // Form state
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');

  // Modal state
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Get employees
  const allEmployees = mockUsers.filter((u) => u.role === 'employee');
  const assignedEmployees = allEmployees.filter((u) => assignedEmployeeIds.includes(u.id));
  const availableEmployees = allEmployees.filter((u) => !assignedEmployeeIds.includes(u.id));

  // Handlers
  const handleSaveDetails = () => {
    if (!projectId || !name.trim()) {
      toast.error('Project name is required');
      return;
    }

    updateProject(projectId, {
      name: name.trim(),
      description: description.trim(),
    });
    toast.success('Project details saved');
  };

  const handleCreateActivity = (data: { name: string; color: string }) => {
    if (!projectId) return;

    createActivity({
      name: data.name,
      color: data.color,
      projectId,
      isArchived: false,
    });
    toast.success(`Activity "${data.name}" created`);
  };

  const handleArchiveActivity = (activityId: string, activityName: string) => {
    archiveActivity(activityId);
    toast.success(`Activity "${activityName}" archived`);
  };

  const handleAssignEmployee = (employeeId: string) => {
    if (!projectId) return;
    assignEmployee(projectId, employeeId, userId);
    const employee = mockUsers.find((u) => u.id === employeeId);
    toast.success(`${employee?.displayName} assigned to project`);
  };

  const handleUnassignEmployee = (employeeId: string) => {
    if (!projectId) return;
    unassignEmployee(projectId, employeeId);
    const employee = mockUsers.find((u) => u.id === employeeId);
    toast.success(`${employee?.displayName} removed from project`);
  };

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The project you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/')}>Go Back</Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <p className="text-muted-foreground">Project Settings</p>
            </div>
            <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(`/projects/${projectId}`)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            View Time Report
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="team">Team Assignment</TabsTrigger>
          </TabsList>

          {/* Project Details Tab */}
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>
                  Update the basic information for this project.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter project description"
                    rows={4}
                  />
                </div>

                <Button onClick={handleSaveDetails}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Activities</CardTitle>
                    <CardDescription>
                      Manage the activities employees can track time against.
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowActivityModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activities.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      No activities yet. Add your first activity.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setShowActivityModal(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg"
                            style={{ backgroundColor: activity.color }}
                          />
                          <div>
                            <p className="font-medium">{activity.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Color: {activity.color}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() =>
                            handleArchiveActivity(activity.id, activity.name)
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Archive
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Assignment Tab */}
          <TabsContent value="team" className="mt-6">
            <TeamAssignment
              assignedEmployees={assignedEmployees}
              availableEmployees={availableEmployees}
              onAssign={handleAssignEmployee}
              onUnassign={handleUnassignEmployee}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Activity Modal */}
      <CreateActivityModal
        open={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        onSubmit={handleCreateActivity}
      />
    </>
  );
}

