// ============================================
// CLASSIC LOGIN PAGE
// ============================================
// Odoo-style login screen (classic UI only)

import { Clock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { mockUsers } from '@/data/mockData';

export function LoginPage() {
  const { login } = useAuth();
  const defaultEmployee =
    mockUsers.find((user) => user.role === 'employee' && user.isActive) ?? mockUsers[0];

  return (
    <div className="odoo-page min-h-screen flex items-center justify-center p-6">
      <div className="odoo-sheet w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="odoo-header flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[var(--odoo-accent)] text-white flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[var(--odoo-gray-800)]">Chrono</h1>
              <p className="text-xs text-[var(--odoo-gray-600)]">
                Classic UI login
              </p>
            </div>
          </div>
          <span className="odoo-badge odoo-badge-info">Classic</span>
        </div>

        <div className="p-6 space-y-5">
          {/* Microsoft login (demo shortcut) */}
          <button
            className="odoo-btn odoo-btn-primary w-full flex items-center justify-center"
            onClick={() => login(defaultEmployee.id)}
          >
            Sign in with Microsoft
          </button>

          <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-[var(--odoo-gray-600)]">
            <span>Demo users</span>
            <div className="h-px flex-1 bg-[var(--odoo-gray-300)]" />
          </div>

          {/* Demo users */}
          <div className="space-y-2">
            {mockUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => login(user.id)}
                className="odoo-btn w-full flex items-center gap-3 text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--odoo-gray-200)] flex items-center justify-center">
                  <User className="h-4 w-4 text-[var(--odoo-gray-600)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[var(--odoo-gray-800)] truncate">
                    {user.displayName}
                  </div>
                  <div className="text-xs text-[var(--odoo-gray-600)] truncate">
                    {user.email}
                  </div>
                  {user.jobTitle && (
                    <div className="text-xs text-[var(--odoo-gray-500)] truncate">
                      {user.jobTitle}
                    </div>
                  )}
                </div>
                <span
                  className={`odoo-badge ${
                    user.role === 'pm' ? 'odoo-badge-info' : 'odoo-badge-warning'
                  }`}
                >
                  {user.role === 'pm' ? 'PM' : 'Employee'}
                </span>
              </button>
            ))}
          </div>

          <p className="text-xs text-[var(--odoo-gray-600)] text-center">
            This is a UI prototype. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
