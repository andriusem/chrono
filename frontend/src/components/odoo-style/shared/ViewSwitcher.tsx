// ============================================
// VIEW SWITCHER COMPONENT
// ============================================
// Allows switching between List, Kanban, and Calendar views
// Follows Odoo's view toggle pattern

import { List, LayoutGrid, Calendar, Grid3x3 } from 'lucide-react';

export type ViewMode = 'list' | 'kanban' | 'calendar' | 'grid';

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  availableViews?: ViewMode[];
}

export function ViewSwitcher({
  currentView,
  onViewChange,
  availableViews = ['list', 'kanban'],
}: ViewSwitcherProps) {
  const viewMap: Record<ViewMode, { icon: React.ReactNode; label: string }> = {
    list: { icon: <List className="h-4 w-4" />, label: 'List' },
    kanban: { icon: <LayoutGrid className="h-4 w-4" />, label: 'Kanban' },
    grid: { icon: <Grid3x3 className="h-4 w-4" />, label: 'Grid' },
    calendar: { icon: <Calendar className="h-4 w-4" />, label: 'Calendar' },
  };

  const orderedViews = availableViews
    .map((mode) => ({ mode, ...viewMap[mode] }))
    .filter((view) => view.icon && view.label);

  return (
    <div className="odoo-view-switcher">
      {orderedViews.map((view) => (
        <button
          key={view.mode}
          onClick={() => onViewChange(view.mode)}
          className={currentView === view.mode ? 'active' : ''}
          title={view.label}
        >
          {view.icon}
        </button>
      ))}
    </div>
  );
}
