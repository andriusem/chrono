// ============================================
// APP ROOT
// ============================================
// Router configuration and route guards

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// Pages
import { LoginPage } from '@/pages/LoginPage';
import { EmployeeDashboard } from '@/pages/EmployeeDashboard';
import { PMDashboard } from '@/pages/PMDashboard';
import { ProjectTimeReport } from '@/pages/ProjectTimeReport';
import { ProjectSettings } from '@/pages/ProjectSettings';

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
// Routes to correct dashboard based on role

function DashboardRouter() {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (currentUser?.role === 'pm') {
    return <PMDashboard />;
  }

  return <EmployeeDashboard />;
}

// ============================================
// APP COMPONENT
// ============================================

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectTimeReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id/settings"
          element={
            <ProtectedRoute>
              <ProjectSettings />
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
