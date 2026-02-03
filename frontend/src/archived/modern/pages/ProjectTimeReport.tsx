// ============================================
// PROJECT TIME REPORT
// ============================================
// View time entries for a specific project

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Clock } from 'lucide-react';
import { TimeEntryTable } from '@/archived/modern/components/pm/TimeEntryTable';
import { FilterBar } from '@/archived/modern/components/pm/FilterBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import { useProjectStore } from '@/store/projectStore';
import { useTimeEntryStore } from '@/store/timeEntryStore';
import { mockUsers } from '@/data/mockData';
import { formatDuration } from '@/lib/formatters';
import { parseISO, format } from 'date-fns';

export function ProjectTimeReport() {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Stores
  const { getProjectById, getActivitiesForProject, getAssignedEmployeeIds } = useProjectStore();

  // Get project data
  const project = projectId ? getProjectById(projectId) : undefined;
  const activities = projectId ? getActivitiesForProject(projectId) : [];
  const assignedEmployeeIds = projectId ? getAssignedEmployeeIds(projectId) : [];
  const assignedEmployees = mockUsers.filter((u) => assignedEmployeeIds.includes(u.id));

  // Get entries
  const entries = useTimeEntryStore((state) => state.entries);
  const projectEntries = projectId
    ? entries.filter((e) => e.projectId === projectId && !e.isDeleted)
    : [];

  // Filter state
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    employeeId: '',
    activityId: '',
  });

  // Apply filters
  const filteredEntries = useMemo(() => {
    return projectEntries.filter((entry) => {
      // Date filter
      if (filters.startDate) {
        const entryDate = format(parseISO(entry.startTime), 'yyyy-MM-dd');
        if (entryDate < filters.startDate) return false;
      }
      if (filters.endDate) {
        const entryDate = format(parseISO(entry.startTime), 'yyyy-MM-dd');
        if (entryDate > filters.endDate) return false;
      }

      // Employee filter
      if (filters.employeeId && entry.userId !== filters.employeeId) {
        return false;
      }

      // Activity filter
      if (filters.activityId && entry.activityId !== filters.activityId) {
        return false;
      }

      return true;
    });
  }, [projectEntries, filters]);

  // Map entries to include details
  const entriesWithDetails = useMemo(() => {
    return filteredEntries
      .map((entry) => {
        const activity = activities.find((a) => a.id === entry.activityId);
        const user = mockUsers.find((u) => u.id === entry.userId);

        if (!activity || !user) return null;

        return { entry, activity, user };
      })
      .filter(Boolean) as { entry: (typeof entries)[0]; activity: (typeof activities)[0]; user: (typeof mockUsers)[0] }[];
  }, [filteredEntries, activities]);

  // Calculate summary stats
  const totalMinutes = filteredEntries.reduce((sum, e) => sum + (e.durationMinutes || 0), 0);
  const uniqueEmployees = new Set(filteredEntries.map((e) => e.userId)).size;

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-muted-foreground">Time Report</p>
          </div>
          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
            {project.status}
          </Badge>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(`/projects/${projectId}/settings`)}
        >
          <Settings className="h-4 w-4 mr-2" />
          Project Settings
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-2xl font-bold">{formatDuration(totalMinutes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Entries</p>
                <p className="text-2xl font-bold">{filteredEntries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contributors</p>
                <p className="text-2xl font-bold">{uniqueEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <FilterBar
        employees={assignedEmployees}
        activities={activities}
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Table */}
      <TimeEntryTable entries={entriesWithDetails} />
    </div>
  );
}

