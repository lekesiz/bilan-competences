import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/Button';
import { QuestionProgress } from '../../components/assessments/QuestionProgress';
import { QuestionOption } from '../../components/assessments/QuestionOption';
import { useTranslation } from '../../hooks/useTranslation';

export const AssessmentQuestions: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentAssessment, submitAssessment } = useAssessmentStore();
  const { user } = useAuthStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!currentAssessment || !user) {
    return <div>{t('assessment.notFound')}</div>;
  }

  const currentQuestion = currentAssessment.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentAssessment.questions.length - 1;

  const handleAnswer = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const totalScore = Object.entries(answers).reduce((score, [questionId, optionId]) => {
        const question = currentAssessment.questions.find((q) => q.id === questionId);
        const option = question?.options.find((o) => o.id === optionId);
        return score + (option?.value || 0);
      }, 0);

      submitAssessment({
        userId: user.id,
        assessmentId: currentAssessment.id,
        score: totalScore,
        answers,
      });
      navigate('/results');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentAssessment.title}
          </h1>
          <QuestionProgress
            currentIndex={currentQuestionIndex}
            totalQuestions={currentAssessment.questions.length}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl text-gray-800 mb-6">{currentQuestion.text}</h2>
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <QuestionOption
                key={option.id}
                option={option}
                isSelected={answers[currentQuestion.id] === option.id}
                onSelect={handleAnswer}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
          >
            {isLastQuestion ? t('assessment.submit') : t('assessment.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};