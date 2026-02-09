// ============================================
// AUTH HOOK
// ============================================
// Convenient hook for auth-related operations

import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { Role } from '@/types';

export function useAuth() {
  const navigate = useNavigate();
  const { currentUser, login, logout, switchRole } = useAuthStore();

  const handleLogin = (userId: string) => {
    login(userId);
    navigate('/projects');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchRole = (role: Role) => {
    switchRole(role);
    navigate('/projects');
  };

  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    isEmployee: currentUser?.role === 'employee',
    isPM: currentUser?.role === 'pm',
    login: handleLogin,
    logout: handleLogout,
    switchRole: handleSwitchRole,
  };
}
