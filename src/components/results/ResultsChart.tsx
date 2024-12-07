import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { AssessmentResult } from '../../types';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { useTranslation } from '../../hooks/useTranslation';

interface ResultsChartProps {
  results: AssessmentResult[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ results }) => {
  const { t } = useTranslation();
  const { assessments } = useAssessmentStore();

  const chartData = assessments.map((assessment) => {
    const result = results.find((r) => r.assessmentId === assessment.id);
    return {
      subject: assessment.title,
      score: result?.score || 0,
      fullMark: assessment.questions.length * 3,
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name={t('results.chart.score')}
            dataKey="score"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip
            formatter={(value: number) => [
              `${Math.round((value / (chartData[0]?.fullMark || 1)) * 100)}%`,
              t('results.chart.score'),
            ]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};