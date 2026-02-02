// ============================================
// STAT BUTTON COMPONENT
// ============================================
// Quick metric display following Odoo's oe_stat_button pattern
// Shows a value with a label, optionally clickable

import type { LucideIcon } from 'lucide-react';

interface StatButtonProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export function StatButton({
  value,
  label,
  icon: Icon,
  onClick,
  variant = 'default',
}: StatButtonProps) {
  const variantColors = {
    default: 'text-[var(--odoo-gray-800)]',
    success: 'text-[var(--odoo-success)]',
    warning: 'text-[#856404]',
    danger: 'text-[var(--odoo-danger)]',
    info: 'text-[var(--odoo-info)]',
  };

  return (
    <button
      onClick={onClick}
      className="odoo-stat-btn"
      disabled={!onClick}
    >
      {Icon && (
        <Icon className={`h-5 w-5 mb-1 ${variantColors[variant]}`} />
      )}
      <span className={`odoo-stat-value ${variantColors[variant]}`}>
        {value}
      </span>
      <span className="odoo-stat-label">{label}</span>
    </button>
  );
}

// ============================================
// STAT BUTTON GROUP
// ============================================
// Container for multiple stat buttons

interface StatButtonGroupProps {
  children: React.ReactNode;
}

export function StatButtonGroup({ children }: StatButtonGroupProps) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  );
}
