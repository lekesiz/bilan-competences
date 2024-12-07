import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthCard } from '../../components/auth/AuthCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/assessments');
    } catch (err) {
      setError(t('auth.errors.invalid'));
    }
  };

  return (
    <AuthCard title={t('auth.signIn')}>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <Input
            id="email"
            label={t('auth.email')}
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            id="password"
            label={t('auth.password')}
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full">
          {t('auth.signIn')}
        </Button>

        <p className="text-center text-sm text-gray-600">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            {t('auth.register')}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};