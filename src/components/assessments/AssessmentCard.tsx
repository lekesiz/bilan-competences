import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Assessment } from '../../types';
import { Button } from '../ui/Button';
import { ASSESSMENT_CATEGORIES } from '../../data/assessmentCategories';
import { useTranslation } from '../../hooks/useTranslation';

interface AssessmentCardProps {
  assessment: Assessment;
  onStart: () => void;
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  onStart,
}) => {
  const { t } = useTranslation();
  const category = ASSESSMENT_CATEGORIES[assessment.type];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{assessment.title}</h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
          {category.title}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{assessment.description}</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-6">
        <Clock className="w-4 h-4 mr-1" />
        <span>{assessment.estimatedTime}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {assessment.questions.length} {t('assessment.questions')}
        </span>
        <Button onClick={onStart} size="sm">
          {t('assessment.start')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};