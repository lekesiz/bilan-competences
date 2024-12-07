import { create } from 'zustand';
import { AdminStats, UserListItem } from '../types/admin';
import { Assessment } from '../types';

interface AdminState {
  stats: AdminStats;
  users: UserListItem[];
  fetchStats: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  updateAssessment: (assessment: Assessment) => Promise<void>;
  deleteAssessment: (assessmentId: string) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: {
    totalUsers: 0,
    totalAssessments: 0,
    averageScore: 0,
    completionRate: 0,
  },
  users: [],
  fetchStats: async () => {
    // TODO: Replace with actual API call
    set({
      stats: {
        totalUsers: 150,
        totalAssessments: 450,
        averageScore: 78,
        completionRate: 65,
      },
    });
  },
  fetchUsers: async () => {
    // TODO: Replace with actual API call
    set({
      users: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          registeredAt: new Date('2024-01-15'),
          lastActive: new Date('2024-03-10'),
          completedAssessments: 5,
          averageScore: 82,
        },
        // Add more mock users as needed
      ],
    });
  },
  deleteUser: async (userId: string) => {
    // TODO: Replace with actual API call
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    }));
  },
  updateAssessment: async (assessment: Assessment) => {
    // TODO: Replace with actual API call
    console.log('Assessment updated:', assessment);
  },
  deleteAssessment: async (assessmentId: string) => {
    // TODO: Replace with actual API call
    console.log('Assessment deleted:', assessmentId);
  },
}));