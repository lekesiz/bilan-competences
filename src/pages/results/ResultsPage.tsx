import React from 'react';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ResultsChart } from './ResultsChart';
import { ResultsList } from './ResultsList';
import { ExportPDFButton } from '../../components/results/ExportPDFButton';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export const ResultsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { results, assessments } = useAssessmentStore();
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  const userResults = results.filter((result) => result.userId === user.id);

  if (userResults.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('results.noResults')}
          </h1>
          <p className="text-gray-600 mb-8">
            {t('assessment.status.notStarted')}
          </p>
          <Button onClick={() => navigate('/assessments')}>
            {t('assessment.start')}
          </Button>
        </div>
      </div>
    );
  }

  const latestResult = userResults[userResults.length - 1];
  const latestAssessment = assessments.find(a => a.id === latestResult.assessmentId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/assessments')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('assessment.list')}
          </Button>
          {latestAssessment && (
            <ExportPDFButton
              result={latestResult}
              assessment={latestAssessment}
              userName={user.name}
            />
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{t('results.title')}</h1>
        <p className="mt-2 text-gray-600">
          {t('results.overview')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('results.chart.title')}
          </h2>
          <ResultsChart results={userResults} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('assessment.list')}
          </h2>
          <ResultsList results={userResults} />
        </div>
      </div>
    </div>
  );
};