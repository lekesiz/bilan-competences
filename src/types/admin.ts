export interface AdminUser extends User {
  role: 'admin';
}

export interface AdminStats {
  totalUsers: number;
  totalAssessments: number;
  averageScore: number;
  completionRate: number;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  registeredAt: Date;
  lastActive: Date;
  completedAssessments: number;
  averageScore: number;
}