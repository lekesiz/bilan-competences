import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { MultiSelect } from '../../components/ui/MultiSelect';
import { useTranslation } from '../../hooks/useTranslation';

const EXPERIENCE_LEVELS = [
  '0-2 ans',
  '3-5 ans',
  '6-10 ans',
  'Plus de 10 ans'
];

const INTEREST_OPTIONS = [
  'Développement logiciel',
  'Gestion de projet',
  'Science des données',
  'Design UI/UX',
  'DevOps',
  'Analyse commerciale',
  'Marketing digital',
  'Gestion de produit',
  'Intelligence artificielle',
  'Cybersécurité'
];

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    profession: user?.profession || '',
    experience: user?.experience || '',
    interests: user?.interests || [],
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('profile.settings')}
          </h1>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              {t('profile.edit')}
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="name"
            label={t('auth.fullName')}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
          />

          <Input
            id="profession"
            label={t('profile.profession')}
            value={formData.profession}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            disabled={!isEditing}
            placeholder="ex: Développeur logiciel"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {t('profile.experience')}
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              disabled={!isEditing}
              className="w-full rounded-lg border px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">{t('common.select')}</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <MultiSelect
            label={t('profile.interests')}
            options={INTEREST_OPTIONS}
            value={formData.interests}
            onChange={(interests) => setFormData({ ...formData, interests })}
            disabled={!isEditing}
          />

          {isEditing && (
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.name || '',
                    profession: user?.profession || '',
                    experience: user?.experience || '',
                    interests: user?.interests || [],
                  });
                }}
              >
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? t('common.saving') : t('common.save')}
              </Button>
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('profile.progress.title')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">
              {t('profile.progress.completed')}
            </h3>
            <p className="text-3xl font-bold text-blue-600">3</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">
              {t('profile.progress.averageScore')}
            </h3>
            <p className="text-3xl font-bold text-green-600">85%</p>
          </div>
        </div>
      </div>
    </div>
  );
};