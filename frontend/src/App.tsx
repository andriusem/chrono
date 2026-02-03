// ============================================
// APP ROOT
// ============================================
// Router configuration and route guards
// Classic (Odoo-style) UI only

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Toaster } from '@/components/ui/sonner';

import { LoginPage } from '@/pages/LoginPage';
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
// Routes to correct dashboard based on role (classic only)

function DashboardRouter() {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (currentUser?.role === 'pm') {
    return <OdooPMDashboard />;
  }

  return <OdooEmployeeDashboard />;
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

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
