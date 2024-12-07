import React from 'react';
import { AssessmentResult } from '../../types';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { CheckCircle2 } from 'lucide-react';

interface ResultsListProps {
  results: AssessmentResult[];
}

export const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  const { assessments } = useAssessmentStore();

  const sortedResults = [...results].sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime()
  );

  return (
    <div className="space-y-4">
      {sortedResults.map((result) => {
        const assessment = assessments.find((a) => a.id === result.assessmentId);
        if (!assessment) return null;

        const maxScore = assessment.questions.length * 3; // Assuming max value per question is 3
        const percentage = Math.round((result.score / maxScore) * 100);

        return (
          <div
            key={result.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-900">{assessment.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(result.completedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-blue-600 mr-2">
                {percentage}%
              </span>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
};