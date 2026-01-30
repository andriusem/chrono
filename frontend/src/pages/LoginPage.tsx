// ============================================
// LOGIN PAGE
// ============================================
// Entry point with Microsoft-style login and demo user selector

import { Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { mockUsers } from '@/data/mockData';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Clock className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Chrono</h1>
          <p className="text-muted-foreground">
            Time tracking made simple
          </p>
        </div>

        {/* Login card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Use your Microsoft work account to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Microsoft login button - placeholder for demo */}
            <Button
              variant="outline"
              className="w-full h-12 text-base"
              onClick={() => login(mockUsers[1].id)} // Default to John Doe
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
              </svg>
              Sign in with Microsoft
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or select a demo user
                </span>
              </div>
            </div>

            {/* Demo user selector */}
            <div className="space-y-2">
              {mockUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => login(user.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors text-left"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <Badge variant={user.role === 'pm' ? 'default' : 'secondary'}>
                    {user.role === 'pm' ? 'PM' : 'Employee'}
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground">
          This is a UI prototype. No data is sent to any server.
        </p>
      </div>
    </div>
  );
}
