import { Assessment, AssessmentResult, Question } from '../types';

export const calculateScore = (
  answers: Record<string, string>,
  questions: Question[]
): number => {
  return questions.reduce((score, question) => {
    const answer = answers[question.id];
    const option = question.options.find((opt) => opt.id === answer);
    return score + (option?.value || 0);
  }, 0);
};

export const getAssessmentProgress = (
  currentIndex: number,
  totalQuestions: number
): number => {
  return ((currentIndex + 1) / totalQuestions) * 100;
};

export const formatAssessmentDuration = (minutes: string): string => {
  const num = parseInt(minutes);
  return num === 1 ? '1 minute' : `${num} minutes`;
};