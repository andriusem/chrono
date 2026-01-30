// ============================================
// FILTER BAR
// ============================================
// Filters for time report

import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { User, Activity } from '@/types';

interface FilterBarProps {
  employees: User[];
  activities: Activity[];
  filters: {
    startDate: string;
    endDate: string;
    employeeId: string;
    activityId: string;
  };
  onFilterChange: (filters: {
    startDate: string;
    endDate: string;
    employeeId: string;
    activityId: string;
  }) => void;
}

export function FilterBar({
  employees,
  activities,
  filters,
  onFilterChange,
}: FilterBarProps) {
  const handleChange = (key: keyof typeof filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      startDate: '',
      endDate: '',
      employeeId: '',
      activityId: '',
    });
  };

  const hasFilters =
    filters.startDate || filters.endDate || filters.employeeId || filters.activityId;

  return (
    <div className="p-4 border rounded-lg bg-muted/30 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4" />
          Filters
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input
            id="start-date"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end-date">End Date</Label>
          <Input
            id="end-date"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
          />
        </div>

        {/* Employee Filter */}
        <div className="space-y-2">
          <Label>Employee</Label>
          <Select
            value={filters.employeeId || 'all'}
            onValueChange={(value) =>
              handleChange('employeeId', value === 'all' ? '' : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All employees</SelectItem>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Activity Filter */}
        <div className="space-y-2">
          <Label>Activity</Label>
          <Select
            value={filters.activityId || 'all'}
            onValueChange={(value) =>
              handleChange('activityId', value === 'all' ? '' : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All activities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All activities</SelectItem>
              {activities.map((activity) => (
                <SelectItem key={activity.id} value={activity.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: activity.color }}
                    />
                    {activity.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
