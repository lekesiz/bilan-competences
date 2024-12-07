import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { useAssessmentStore } from '../../../store/useAssessmentStore';
import { useAdminStore } from '../../../store/useAdminStore';

export const AnalyticsDashboard: React.FC = () => {
  const { results } = useAssessmentStore();
  const { stats } = useAdminStore();

  // Calculate assessment type distribution
  const typeDistribution = results.reduce((acc, result) => {
    const type = result.assessmentId; // You'd need to map this to actual assessment type
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate score distribution
  const scoreDistribution = results.reduce((acc, result) => {
    const scoreRange = Math.floor(result.score / 10) * 10;
    acc[`${scoreRange}-${scoreRange + 9}`] = (acc[`${scoreRange}-${scoreRange + 9}`] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assessment Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Assessment Type Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(typeDistribution).map(([type, count]) => ({ type, count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Score Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Object.entries(scoreDistribution).map(([range, count]) => ({ range, count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Completion Trends */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Assessment Completion Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Daily Average</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(stats.totalAssessments / 30)} {/* Assuming last 30 days */}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Weekly Growth</p>
            <p className="text-2xl font-bold text-green-600">+12%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <p className="text-2xl font-bold text-purple-600">{stats.completionRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};