import React, { useState } from 'react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { Button } from '../../components/ui/Button';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Assessment } from '../../types';
import { AssessmentEditor } from './components/AssessmentEditor';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useTranslation } from '../../hooks/useTranslation';

export const AssessmentManagement: React.FC = () => {
  const { t } = useTranslation();
  const { assessments, deleteAssessment, createAssessment, updateAssessment } = useAssessmentStore();
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingAssessment(null);
  };

  const handleDelete = async (assessmentId: string) => {
    if (window.confirm(t('assessment.management.deleteConfirm'))) {
      setIsLoading(true);
      try {
        await deleteAssessment(assessmentId);
      } catch (error) {
        console.error('Failed to delete assessment:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (assessment: Assessment) => {
    setIsLoading(true);
    try {
      if (isCreating) {
        await createAssessment(assessment);
      } else {
        await updateAssessment(assessment);
      }
      setEditingAssessment(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Failed to save assessment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingAssessment(null);
    setIsCreating(false);
  };

  if (editingAssessment || isCreating) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isCreating 
            ? t('assessment.management.create')
            : t('assessment.management.edit')
          }
        </h1>
        <AssessmentEditor
          assessment={editingAssessment || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('assessment.management.title')}
        </h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          {t('assessment.management.create')}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid gap-6">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {assessment.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{assessment.description}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {t(`assessment.types.${assessment.type}`)}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      {assessment.estimatedTime}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(assessment)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(assessment.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  {t('assessment.management.questionLabel')}s
                </h3>
                <div className="space-y-4">
                  {assessment.questions.map((question, index) => (
                    <div key={question.id} className="pl-4 border-l-2 border-gray-200">
                      <p className="text-gray-900">
                        {index + 1}. {question.text}
                      </p>
                      <div className="mt-2 space-y-1">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className="text-sm text-gray-600 pl-4"
                          >
                            • {option.text} ({option.value} {t('common.points')})
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};