import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessmentStore } from '../../store/useAssessmentStore';
import { AssessmentCard } from '../../components/assessments/AssessmentCard';
import { ASSESSMENT_CATEGORIES } from '../../data/assessmentCategories';
import { Brain, Code, Users } from 'lucide-react';

const CategoryIcon = ({ type }: { type: keyof typeof ASSESSMENT_CATEGORIES }) => {
  switch (type) {
    case 'personality':
      return <Brain className="w-6 h-6" />;
    case 'technical':
      return <Code className="w-6 h-6" />;
    case 'soft-skills':
      return <Users className="w-6 h-6" />;
  }
};

export const AssessmentList: React.FC = () => {
  const navigate = useNavigate();
  const { assessments, fetchAssessments, setCurrentAssessment } = useAssessmentStore();

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  const handleStartAssessment = (assessmentId: string) => {
    const assessment = assessments.find((a) => a.id === assessmentId);
    if (assessment) {
      setCurrentAssessment(assessment);
      navigate(`/assessments/${assessmentId}`);
    }
  };

  const groupedAssessments = assessments.reduce((acc, assessment) => {
    const type = assessment.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(assessment);
    return acc;
  }, {} as Record<string, typeof assessments>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skills Assessment</h1>
        <p className="mt-2 text-gray-600">
          Evaluate your professional competencies across different domains
        </p>
      </div>

      {Object.entries(ASSESSMENT_CATEGORIES).map(([type, category]) => {
        const typeAssessments = groupedAssessments[type] || [];
        if (typeAssessments.length === 0) return null;

        return (
          <div key={type} className="mb-12">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <CategoryIcon type={type as keyof typeof ASSESSMENT_CATEGORIES} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {typeAssessments.map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  onStart={() => handleStartAssessment(assessment.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};