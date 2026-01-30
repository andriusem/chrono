// ============================================
// MAIN LAYOUT
// ============================================
// Wrapper component that provides consistent layout for all pages

import { Header } from './Header';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">{children}</main>
      <Toaster />
    </div>
  );
}
