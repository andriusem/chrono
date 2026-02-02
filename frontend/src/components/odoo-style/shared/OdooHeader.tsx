// ============================================
// ODOO HEADER COMPONENT
// ============================================
// Page header with breadcrumbs, title, and actions
// Follows Odoo's control panel pattern

import { ChevronRight, Plus } from 'lucide-react';
import { ViewSwitcher, type ViewMode } from './ViewSwitcher';

interface Breadcrumb {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface OdooHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryActions?: {
    label: string;
    onClick: () => void;
  }[];
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  availableViews?: ViewMode[];
  children?: React.ReactNode;
}

export function OdooHeader({
  title,
  breadcrumbs = [],
  primaryAction,
  secondaryActions = [],
  viewMode,
  onViewModeChange,
  availableViews,
  children,
}: OdooHeaderProps) {
  return (
    <div className="odoo-header">
      <div className="flex items-center justify-between">
        {/* Left side: Breadcrumbs and Title */}
        <div className="flex items-center gap-2">
          {breadcrumbs.length > 0 && (
            <>
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  {crumb.onClick || crumb.href ? (
                    <button
                      onClick={crumb.onClick}
                      className="text-sm text-[var(--odoo-gray-600)] hover:text-[var(--odoo-accent)]"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-sm text-[var(--odoo-gray-600)]">
                      {crumb.label}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-[var(--odoo-gray-400)]" />
                </span>
              ))}
            </>
          )}
          <h1 className="text-lg font-semibold text-[var(--odoo-gray-800)]">
            {title}
          </h1>
        </div>

        {/* Right side: Actions and View Switcher */}
        <div className="flex items-center gap-3">
          {/* Secondary Actions */}
          {secondaryActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="odoo-btn"
            >
              {action.label}
            </button>
          ))}

          {/* Primary Action */}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="odoo-btn odoo-btn-primary flex items-center gap-1.5"
            >
              {primaryAction.icon || <Plus className="h-4 w-4" />}
              {primaryAction.label}
            </button>
          )}

          {/* View Switcher */}
          {viewMode && onViewModeChange && (
            <ViewSwitcher
              currentView={viewMode}
              onViewChange={onViewModeChange}
              availableViews={availableViews}
            />
          )}
        </div>
      </div>

      {/* Additional content (like filter bar) */}
      {children}
    </div>
  );
}
