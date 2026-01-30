// ============================================
// HEADER COMPONENT
// ============================================
// Top navigation bar with logo, date, and user profile

import { Clock } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';
import { HeaderAttendance } from './HeaderAttendance';
import { formatDateLong } from '@/lib/formatters';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        {/* Logo and brand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Clock className="h-5 w-5" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Chrono</span>
        </div>

        {/* Center section - date and attendance */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-muted-foreground">
            {formatDateLong(new Date())}
          </div>
          <HeaderAttendance />
        </div>

        {/* User profile dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
