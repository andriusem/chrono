// ============================================
// WEEK NAVIGATOR COMPONENT
// ============================================
// Navigation controls for weekly timesheet grid view
// Features: Today button, week navigation arrows, week range display

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameWeek } from 'date-fns';

interface WeekNavigatorProps {
  currentWeekStart: Date;
  onWeekChange: (weekStart: Date) => void;
}

export function WeekNavigator({ currentWeekStart, onWeekChange }: WeekNavigatorProps) {
  const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  const isCurrentWeek = isSameWeek(currentWeekStart, new Date(), { weekStartsOn: 1 });

  const handlePrevWeek = () => {
    onWeekChange(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    onWeekChange(addWeeks(currentWeekStart, 1));
  };

  const handleToday = () => {
    onWeekChange(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const formatWeekRange = () => {
    const startMonth = format(currentWeekStart, 'MMM');
    const endMonth = format(weekEnd, 'MMM');
    const startDay = format(currentWeekStart, 'd');
    const endDay = format(weekEnd, 'd');
    const year = format(currentWeekStart, 'yyyy');

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToday}
        className={`odoo-btn ${isCurrentWeek ? 'odoo-btn-primary' : ''}`}
      >
        Today
      </button>

      <div className="flex items-center border border-[var(--odoo-gray-300)] rounded">
        <button
          onClick={handlePrevWeek}
          className="p-1.5 hover:bg-[var(--odoo-gray-100)] border-r border-[var(--odoo-gray-300)]"
          title="Previous week"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-3 py-1 text-sm font-medium min-w-[160px] text-center">
          {formatWeekRange()}
        </span>
        <button
          onClick={handleNextWeek}
          className="p-1.5 hover:bg-[var(--odoo-gray-100)] border-l border-[var(--odoo-gray-300)]"
          title="Next week"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
