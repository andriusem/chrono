// ============================================
// AUTH STORE
// ============================================
// Manages current user state and authentication (simulated for prototype)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Role } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthState {
  // Current logged-in user
  currentUser: User | null;

  // Actions
  login: (userId: string) => void;
  logout: () => void;

  // For demo: switch role without logging out
  switchRole: (role: Role) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,

      login: (userId: string) => {
        const user = mockUsers.find((u) => u.id === userId);
        if (user) {
          set({ currentUser: user });
        }
      },

      logout: () => {
        set({ currentUser: null });
      },

      // Demo feature: quickly switch between employee and PM views
      switchRole: (role: Role) => {
        const current = get().currentUser;
        if (current) {
          // Find a user with the desired role
          const newUser = mockUsers.find((u) => u.role === role);
          if (newUser) {
            set({ currentUser: newUser });
          }
        }
      },
    }),
    {
      name: 'chrono-auth', // localStorage key
    }
  )
);
