// ============================================
// UI VARIANT SWITCHER
// ============================================
// Allows stakeholders to toggle between Modern and Classic (Odoo) UI styles
// Persists preference to localStorage

import { useState } from 'react';
import { Palette, Monitor, Layout } from 'lucide-react';

export type UIVariant = 'modern' | 'classic';

interface UIVariantSwitcherProps {
  variant: UIVariant;
  onVariantChange: (variant: UIVariant) => void;
}

export function UIVariantSwitcher({ variant, onVariantChange }: UIVariantSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors shadow-sm"
        title="Switch UI variant"
      >
        <Palette className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {variant === 'modern' ? 'Modern' : 'Classic'}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">
                UI Style
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Compare different interface designs
              </p>
            </div>

            <div className="p-2">
              {/* Modern Option */}
              <button
                onClick={() => {
                  onVariantChange('modern');
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  variant === 'modern'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  variant === 'modern' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Monitor className={`h-5 w-5 ${
                    variant === 'modern' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${
                    variant === 'modern' ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    Modern
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Card-based layout with modals
                  </p>
                </div>
                {variant === 'modern' && (
                  <span className="ml-auto text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                    Active
                  </span>
                )}
              </button>

              {/* Classic (Odoo) Option */}
              <button
                onClick={() => {
                  onVariantChange('classic');
                  setIsOpen(false);
                }}
                className={`w-full flex items-start gap-3 p-3 rounded-lg mt-1 transition-colors ${
                  variant === 'classic'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  variant === 'classic' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Layout className={`h-5 w-5 ${
                    variant === 'classic' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${
                    variant === 'classic' ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    Classic (Odoo-style)
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Table-based with inline editing
                  </p>
                </div>
                {variant === 'classic' && (
                  <span className="ml-auto text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                    Active
                  </span>
                )}
              </button>
            </div>

            <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              <p className="text-xs text-gray-500 text-center">
                Both styles use the same data
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// UI VARIANT STORE HOOK
// ============================================
// Custom hook for managing UI variant preference

const STORAGE_KEY = 'chrono-ui-variant';

export function useUIVariant(): [UIVariant, (variant: UIVariant) => void] {
  const [variant, setVariantState] = useState<UIVariant>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'modern' || stored === 'classic') {
        return stored;
      }
    }
    return 'modern';
  });

  const setVariant = (newVariant: UIVariant) => {
    setVariantState(newVariant);
    localStorage.setItem(STORAGE_KEY, newVariant);
  };

  return [variant, setVariant];
}
