// ============================================
// FILTER BAR COMPONENT
// ============================================
// Search and filter controls following Odoo's pattern
// Includes search input, preset filters, and group by options

import { Search, ChevronDown, Filter, X } from 'lucide-react';
import { useState } from 'react';

export interface FilterOption {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface GroupByOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterOption[];
  onFilterToggle?: (filterId: string) => void;
  groupByOptions?: GroupByOption[];
  currentGroupBy?: string;
  onGroupByChange?: (groupById: string | null) => void;
}

export function FilterBar({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  filters = [],
  onFilterToggle,
  groupByOptions = [],
  currentGroupBy,
  onGroupByChange,
}: FilterBarProps) {
  const [showGroupBy, setShowGroupBy] = useState(false);

  const activeFilters = filters.filter((f) => f.isActive);

  return (
    <div className="odoo-filter-bar">
      {/* Search Input */}
      <div className="odoo-search">
        <Search className="h-4 w-4 text-[var(--odoo-gray-500)]" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      {/* Separator */}
      <div className="h-6 w-px bg-[var(--odoo-gray-300)]" />

      {/* Preset Filters */}
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterToggle?.(filter.id)}
          className={`odoo-filter-btn ${filter.isActive ? 'active' : ''}`}
        >
          {filter.label}
        </button>
      ))}

      {/* Group By Dropdown */}
      {groupByOptions.length > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowGroupBy(!showGroupBy)}
            className="odoo-filter-btn flex items-center gap-1"
          >
            <Filter className="h-3.5 w-3.5" />
            Group By
            {currentGroupBy && (
              <span className="ml-1 text-[var(--odoo-accent)]">
                ({groupByOptions.find((g) => g.id === currentGroupBy)?.label})
              </span>
            )}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {showGroupBy && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-[var(--odoo-gray-300)] rounded shadow-lg z-10 min-w-[150px]">
              {currentGroupBy && (
                <button
                  onClick={() => {
                    onGroupByChange?.(null);
                    setShowGroupBy(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-[var(--odoo-gray-600)] hover:bg-[var(--odoo-gray-100)] flex items-center gap-2"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear grouping
                </button>
              )}
              {groupByOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onGroupByChange?.(option.id);
                    setShowGroupBy(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-[var(--odoo-gray-100)] ${
                    currentGroupBy === option.id
                      ? 'bg-[var(--odoo-gray-100)] text-[var(--odoo-accent)]'
                      : 'text-[var(--odoo-gray-700)]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {activeFilters.length > 0 && (
        <div className="ml-auto flex items-center gap-1 text-xs text-[var(--odoo-gray-600)]">
          {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} active
        </div>
      )}
    </div>
  );
}
