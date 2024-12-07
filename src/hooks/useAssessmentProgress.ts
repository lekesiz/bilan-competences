import { useMemo } from 'react';
import { AssessmentResult } from '../types';

export const useAssessmentProgress = (results: AssessmentResult[]) => {
  return useMemo(() => {
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const averageScore = results.length > 0 
      ? Math.round((totalScore / results.length) / 9 * 100) // 9 is max possible score (3 * 3 questions)
      : 0;

    return {
      completedCount: results.length,
      averageScore,
      latestResult: results[results.length - 1],
    };
  }, [results]);
};