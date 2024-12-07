import React, { useEffect } from 'react';
import { useAdminStore } from '../../store/useAdminStore';
import { Users, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const StatCard: React.FC<{
  title: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, unit, icon, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-2">
          {value}
          {unit && <span className="text-gray-500 text-lg ml-1">{unit}</span>}
        </p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('admin.dashboard.title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={t('admin.dashboard.stats.totalUsers')}
          value={stats.totalUsers}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <StatCard
          title={t('admin.dashboard.stats.totalAssessments')}
          value={stats.totalAssessments}
          icon={<BookOpen className="w-6 h-6 text-green-600" />}
          color="bg-green-100"
        />
        <StatCard
          title={t('admin.dashboard.stats.averageScore')}
          value={stats.averageScore}
          unit="%"
          icon={<Target className="w-6 h-6 text-purple-600" />}
          color="bg-purple-100"
        />
        <StatCard
          title={t('admin.dashboard.stats.completionRate')}
          value={stats.completionRate}
          unit="%"
          icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
          color="bg-orange-100"
        />
      </div>
    </div>
  );
};