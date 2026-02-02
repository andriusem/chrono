// ============================================
// VIEW SWITCHER COMPONENT
// ============================================
// Allows switching between List, Kanban, and Calendar views
// Follows Odoo's view toggle pattern

import { List, LayoutGrid, Calendar } from 'lucide-react';

export type ViewMode = 'list' | 'kanban' | 'calendar';

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
  const views: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'list', icon: <List className="h-4 w-4" />, label: 'List' },
    { mode: 'kanban', icon: <LayoutGrid className="h-4 w-4" />, label: 'Kanban' },
    { mode: 'calendar', icon: <Calendar className="h-4 w-4" />, label: 'Calendar' },
  ];

  const filteredViews = views.filter((v) => availableViews.includes(v.mode));

  return (
    <div className="odoo-view-switcher">
      {filteredViews.map((view) => (
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
