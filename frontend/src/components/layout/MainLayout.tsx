// ============================================
// MAIN LAYOUT
// ============================================
// Wrapper component that provides consistent layout for all pages
// Supports both Modern and Classic (Odoo-style) UI variants

import { Header } from './Header';
import { Toaster } from '@/components/ui/sonner';
import type { UIVariant } from './UIVariantSwitcher';

interface MainLayoutProps {
  children: React.ReactNode;
  uiVariant?: UIVariant;
  onUIVariantChange?: (variant: UIVariant) => void;
}

export function MainLayout({ children, uiVariant, onUIVariantChange }: MainLayoutProps) {
  // For Classic (Odoo) variant, use different styling
  const isClassic = uiVariant === 'classic';

  return (
    <div className={`min-h-screen ${isClassic ? 'odoo-page' : 'bg-background'}`}>
      {/* Header is always visible in Modern style */}
      {!isClassic && (
        <Header uiVariant={uiVariant} onUIVariantChange={onUIVariantChange} />
      )}

      {/* Classic style has its own header in each page, but we show the switcher */}
      {isClassic && (
        <div className="bg-white border-b border-[var(--odoo-gray-300)] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[var(--odoo-accent)] flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-semibold text-[var(--odoo-gray-800)]">Chrono</span>
          </div>
          <div className="flex items-center gap-3">
            {uiVariant && onUIVariantChange && (
              <button
                onClick={() => onUIVariantChange('modern')}
                className="text-xs text-[var(--odoo-gray-600)] hover:text-[var(--odoo-accent)]"
              >
                Switch to Modern →
              </button>
            )}
          </div>
        </div>
      )}

      <main className={isClassic ? '' : 'container px-4 py-6'}>
        {children}
      </main>
      <Toaster />
    </div>
  );
}
