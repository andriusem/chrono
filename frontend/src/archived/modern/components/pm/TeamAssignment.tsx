// ============================================
// TEAM ASSIGNMENT
// ============================================
// Dual list for assigning/unassigning employees

import { UserPlus, UserMinus, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { User } from '@/types';

interface TeamAssignmentProps {
  assignedEmployees: User[];
  availableEmployees: User[];
  onAssign: (userId: string) => void;
  onUnassign: (userId: string) => void;
}

function EmployeeItem({
  employee,
  action,
  actionIcon: ActionIcon,
  actionLabel,
}: {
  employee: User;
  action: () => void;
  actionIcon: typeof UserPlus;
  actionLabel: string;
}) {
  const initials = employee.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={employee.avatarUrl} alt={employee.displayName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{employee.displayName}</p>
          <p className="text-xs text-muted-foreground">{employee.email}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={action}>
        <ActionIcon className="h-4 w-4 mr-1" />
        {actionLabel}
      </Button>
    </div>
  );
}

export function TeamAssignment({
  assignedEmployees,
  availableEmployees,
  onAssign,
  onUnassign,
}: TeamAssignmentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Available Employees */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-5 w-5" />
            Available Employees
            <span className="text-sm font-normal text-muted-foreground">
              ({availableEmployees.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {availableEmployees.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>All employees are assigned</p>
              </div>
            ) : (
              <div className="space-y-1">
                {availableEmployees.map((employee) => (
                  <EmployeeItem
                    key={employee.id}
                    employee={employee}
                    action={() => onAssign(employee.id)}
                    actionIcon={ChevronRight}
                    actionLabel="Add"
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Assigned Employees */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Assigned to Project
            <span className="text-sm font-normal text-muted-foreground">
              ({assignedEmployees.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            {assignedEmployees.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <UserMinus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No employees assigned yet</p>
                <p className="text-sm">Add employees from the left</p>
              </div>
            ) : (
              <div className="space-y-1">
                {assignedEmployees.map((employee) => (
                  <EmployeeItem
                    key={employee.id}
                    employee={employee}
                    action={() => onUnassign(employee.id)}
                    actionIcon={ChevronLeft}
                    actionLabel="Remove"
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

