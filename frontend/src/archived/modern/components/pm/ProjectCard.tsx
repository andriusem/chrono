// ============================================
// PROJECT CARD
// ============================================
// Card showing project info with action buttons

import { MoreVertical, Clock, Users, Settings, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDuration } from '@/lib/formatters';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  totalHoursThisWeek: number;
  activeEmployees: number;
  activitiesCount: number;
  onArchive: () => void;
}

export function ProjectCard({
  project,
  totalHoursThisWeek,
  activeEmployees,
  activitiesCount,
  onArchive,
}: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <Badge
              variant={project.status === 'active' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {project.status}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}`)}>
                <BarChart3 className="mr-2 h-4 w-4" />
                View Time Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/projects/${project.id}/settings`)}>
                <Settings className="mr-2 h-4 w-4" />
                Project Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onArchive}
                className="text-destructive"
              >
                Archive Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        {project.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-muted/50">
            <Clock className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-medium">{formatDuration(totalHoursThisWeek * 60)}</p>
            <p className="text-xs text-muted-foreground">This week</p>
          </div>

          <div className="p-2 rounded-lg bg-muted/50">
            <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-medium">{activeEmployees}</p>
            <p className="text-xs text-muted-foreground">Employees</p>
          </div>

          <div className="p-2 rounded-lg bg-muted/50">
            <BarChart3 className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-medium">{activitiesCount}</p>
            <p className="text-xs text-muted-foreground">Activities</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Time Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => navigate(`/projects/${project.id}/settings`)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

