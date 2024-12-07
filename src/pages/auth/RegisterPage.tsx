import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { AuthCard } from '../../components/auth/AuthCard';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.errors.passwordMismatch'));
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      navigate('/assessments');
    } catch (err) {
      setError(t('auth.errors.invalid'));
    }
  };

  return (
    <AuthCard title={t('auth.signUp')}>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            id="name"
            label={t('auth.fullName')}
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

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

          <Input
            id="confirmPassword"
            label={t('auth.confirmPassword')}
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full">
          {t('auth.signUp')}
        </Button>

        <p className="text-center text-sm text-gray-600">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            {t('auth.signIn')}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
};