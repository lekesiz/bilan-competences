import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const navigation = [
  { name: 'dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'users', href: '/admin/users', icon: Users },
  { name: 'assessments', href: '/admin/assessments', icon: FileText },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">
              {t('admin.dashboard.title')}
            </h1>
          </div>
          <nav className="mt-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {t(`admin.${item.name}.title`)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};