import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { useTranslation } from '../../hooks/useTranslation';

export const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              {t('assessment.title')}
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/assessments" className="text-gray-700 hover:text-blue-600">
              {t('assessment.list')}
            </Link>
            <Link to="/results" className="text-gray-700 hover:text-blue-600">
              {t('results.title')}
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              {t('profile.title')}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NotificationCenter />
                <Link to="/profile">
                  <User className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                </Link>
                <button onClick={logout}>
                  <LogOut className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                {t('auth.login')}
              </Link>
            )}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};