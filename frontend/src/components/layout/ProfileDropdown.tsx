// ============================================
// PROFILE DROPDOWN
// ============================================
// User menu with logout and demo role switcher

import { LogOut, User, ArrowLeftRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

export function ProfileDropdown() {
  const { user, logout, switchRole, isPM } = useAuth();

  if (!user) return null;

  // Get initials for avatar fallback
  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-2 hover:bg-accent transition-colors outline-none">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatarUrl} alt={user.displayName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium">{user.displayName}</span>
          <Badge variant={isPM ? 'default' : 'secondary'} className="text-xs">
            {isPM ? 'Project Manager' : 'Employee'}
          </Badge>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.displayName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          Profile Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Demo feature: quick role switch */}
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Demo: Switch View
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => switchRole(isPM ? 'employee' : 'pm')}>
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          Switch to {isPM ? 'Employee' : 'PM'} View
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
