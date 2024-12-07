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

interface ResultsChartProps {
  results: AssessmentResult[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ results }) => {
  const { assessments } = useAssessmentStore();

  const chartData = assessments.map((assessment) => {
    const result = results.find((r) => r.assessmentId === assessment.id);
    return {
      subject: assessment.title,
      score: result?.score || 0,
      fullMark: assessment.questions.length * 3, // Assuming max value per question is 3
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};