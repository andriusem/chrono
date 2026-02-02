// ============================================
// APP ROOT
// ============================================
// Router configuration and route guards
// Supports both Modern and Classic (Odoo-style) UI variants

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useUIVariant } from '@/components/layout/UIVariantSwitcher';
import { MainLayout } from '@/components/layout/MainLayout';

// Modern UI Pages
import { LoginPage } from '@/pages/LoginPage';
import { EmployeeDashboard } from '@/pages/EmployeeDashboard';
import { PMDashboard } from '@/pages/PMDashboard';
import { ProjectTimeReport } from '@/pages/ProjectTimeReport';
import { ProjectSettings } from '@/pages/ProjectSettings';

// Classic (Odoo-style) UI Pages
import { OdooEmployeeDashboard, OdooPMDashboard } from '@/pages/odoo-style';

// ============================================
// PROTECTED ROUTE WRAPPER
// ============================================
// Redirects to login if not authenticated

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// ============================================
// DASHBOARD ROUTER
// ============================================
// Routes to correct dashboard based on role AND UI variant

interface DashboardRouterProps {
  variant: 'modern' | 'classic';
}

function DashboardRouter({ variant }: DashboardRouterProps) {
  const currentUser = useAuthStore((state) => state.currentUser);

  // Classic (Odoo-style) variant
  if (variant === 'classic') {
    if (currentUser?.role === 'pm') {
      return <OdooPMDashboard />;
    }
    return <OdooEmployeeDashboard />;
  }

  // Modern variant (default)
  if (currentUser?.role === 'pm') {
    return <PMDashboard />;
  }

  return <EmployeeDashboard />;
}

// ============================================
// APP COMPONENT
// ============================================

function App() {
  const [uiVariant, setUIVariant] = useUIVariant();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with UI variant support */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout
                uiVariant={uiVariant}
                onUIVariantChange={setUIVariant}
              >
                <DashboardRouter variant={uiVariant} />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Project routes (Modern UI only for now) */}
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <MainLayout
                uiVariant={uiVariant}
                onUIVariantChange={setUIVariant}
              >
                <ProjectTimeReport />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id/settings"
          element={
            <ProtectedRoute>
              <MainLayout
                uiVariant={uiVariant}
                onUIVariantChange={setUIVariant}
              >
                <ProjectSettings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
