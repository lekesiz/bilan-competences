import React, { useState } from 'react';
import { Assessment, Question, Option } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Plus, Minus, Save, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface AssessmentEditorProps {
  assessment?: Assessment;
  onSave: (assessment: Assessment) => void;
  onCancel: () => void;
}

export const AssessmentEditor: React.FC<AssessmentEditorProps> = ({
  assessment,
  onSave,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Partial<Assessment>>(
    assessment || {
      title: '',
      type: 'technical',
      description: '',
      estimatedTime: '',
      questions: [],
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = t('assessment.management.validation.titleRequired');
    }
    if (!formData.description?.trim()) {
      newErrors.description = t('assessment.management.validation.descriptionRequired');
    }
    if (!formData.estimatedTime?.trim()) {
      newErrors.estimatedTime = t('assessment.management.validation.timeRequired');
    }
    if (!formData.questions?.length) {
      newErrors.questions = t('assessment.management.validation.minQuestions');
    }

    formData.questions?.forEach((question, index) => {
      if (!question.text.trim()) {
        newErrors[`question_${index}`] = t('assessment.management.validation.questionRequired');
      }
      if (question.options.length < 2) {
        newErrors[`question_${index}_options`] = t('assessment.management.validation.minOptions');
      }
      question.options.forEach((option, optionIndex) => {
        if (!option.text.trim()) {
          newErrors[`question_${index}_option_${optionIndex}`] = t('assessment.management.validation.optionRequired');
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...(prev.questions || []),
        {
          id: crypto.randomUUID(),
          text: '',
          options: [
            { id: crypto.randomUUID(), text: '', value: 1 },
            { id: crypto.randomUUID(), text: '', value: 2 },
            { id: crypto.randomUUID(), text: '', value: 3 },
          ],
        },
      ],
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.filter((_, i) => i !== index),
    }));
  };

  const updateQuestion = (index: number, question: Partial<Question>) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.map((q, i) =>
        i === index ? { ...q, ...question } : q
      ),
    }));
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    option: Partial<Option>
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.map((q, qIndex) =>
        qIndex === questionIndex
          ? {
              ...q,
              options: q.options.map((o, oIndex) =>
                oIndex === optionIndex ? { ...o, ...option } : o
              ),
            }
          : q
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData as Assessment);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('assessment.management.title')}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={errors.title}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('assessment.types.title')}
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as Assessment['type'] })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="personality">{t('assessment.types.personality')}</option>
            <option value="technical">{t('assessment.types.technical')}</option>
            <option value="soft-skills">{t('assessment.types.soft-skills')}</option>
          </select>
        </div>
      </div>

      <Input
        label={t('assessment.description')}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        error={errors.description}
        required
      />

      <Input
        label={t('assessment.management.estimatedTime')}
        value={formData.estimatedTime}
        onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
        error={errors.estimatedTime}
        placeholder="15 minutes"
        required
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            {t('assessment.management.questionLabel')}s
          </h3>
          <Button type="button" onClick={addQuestion} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('assessment.management.addQuestion')}
          </Button>
        </div>

        {errors.questions && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.questions}
          </div>
        )}

        {formData.questions?.map((question, qIndex) => (
          <div key={question.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 mr-4">
                <Input
                  label={`${t('assessment.management.questionLabel')} ${qIndex + 1}`}
                  value={question.text}
                  onChange={(e) => updateQuestion(qIndex, { text: e.target.value })}
                  error={errors[`question_${qIndex}`]}
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeQuestion(qIndex)}
              >
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            {errors[`question_${qIndex}_options`] && (
              <div className="text-sm text-red-600">
                {errors[`question_${qIndex}_options`]}
              </div>
            )}

            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={option.id} className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      label={`${t('assessment.management.optionLabel')} ${oIndex + 1}`}
                      value={option.text}
                      onChange={(e) =>
                        updateOption(qIndex, oIndex, { text: e.target.value })
                      }
                      error={errors[`question_${qIndex}_option_${oIndex}`]}
                      required
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700">
                      {t('common.points')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="3"
                      value={option.value}
                      onChange={(e) =>
                        updateOption(qIndex, oIndex, {
                          value: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
};