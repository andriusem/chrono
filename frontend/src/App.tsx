import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LoginPage } from '@/pages/LoginPage';
import {
  ActivitiesPage,
  DomainsPage,
  IlyaDashboardPage,
  ProjectsPage,
  TasksKanbanPage,
} from '@/pages/vnext';
import { useAuthStore } from '@/store/authStore';
import { useTaskStore } from '@/store/taskStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppBootstrap({ children }: { children: React.ReactNode }) {
  const reconcileTaskState = useTaskStore((state) => state.reconcileState);
  useEffect(() => {
    reconcileTaskState();
  }, [reconcileTaskState]);
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AppBootstrap>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:projectId/domains"
            element={
              <ProtectedRoute>
                <DomainsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:projectId/domains/:projectDomainId/activities"
            element={
              <ProtectedRoute>
                <ActivitiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:projectId/tasks"
            element={
              <ProtectedRoute>
                <TasksKanbanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ilya"
            element={
              <ProtectedRoute>
                <IlyaDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>
      </AppBootstrap>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
