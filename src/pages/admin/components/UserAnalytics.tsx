import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useAdminStore } from '../../../store/useAdminStore';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export const UserAnalytics: React.FC = () => {
  const { users } = useAdminStore();

  const experienceLevels = users.reduce((acc, user) => {
    const level = user.averageScore >= 80 ? 'Expert' :
                 user.averageScore >= 60 ? 'Intermediate' :
                 'Beginner';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(experienceLevels).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        User Skill Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {pieData.map((entry, index) => (
          <div key={entry.name} className="text-center">
            <div
              className="w-3 h-3 rounded-full inline-block mr-2"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-gray-600">
              {entry.name}: {entry.value} users
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};