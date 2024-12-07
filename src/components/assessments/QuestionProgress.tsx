import React from 'react';
import { getAssessmentProgress } from '../../utils/assessment';

interface QuestionProgressProps {
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionProgress: React.FC<QuestionProgressProps> = ({
  currentIndex,
  totalQuestions,
}) => {
  const progress = getAssessmentProgress(currentIndex, totalQuestions);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};