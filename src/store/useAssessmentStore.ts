import { create } from 'zustand';
import { Assessment, AssessmentResult } from '../types';
import { mockAssessments } from '../data/mockAssessments';

interface AssessmentState {
  assessments: Assessment[];
  currentAssessment: Assessment | null;
  results: AssessmentResult[];
  setCurrentAssessment: (assessment: Assessment | null) => void;
  submitAssessment: (result: Omit<AssessmentResult, 'id' | 'completedAt'>) => void;
  fetchAssessments: () => Promise<void>;
  createAssessment: (assessment: Omit<Assessment, 'id'>) => Promise<void>;
  updateAssessment: (assessment: Assessment) => Promise<void>;
  deleteAssessment: (id: string) => Promise<void>;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  assessments: [],
  currentAssessment: null,
  results: [],
  setCurrentAssessment: (assessment) => set({ currentAssessment: assessment }),
  submitAssessment: (result) => {
    const newResult: AssessmentResult = {
      ...result,
      id: crypto.randomUUID(),
      completedAt: new Date(),
    };
    set((state) => ({
      results: [...state.results, newResult],
      currentAssessment: null,
    }));
  },
  fetchAssessments: async () => {
    // TODO: Replace with actual API call
    set({ assessments: mockAssessments });
  },
  createAssessment: async (assessmentData) => {
    const newAssessment: Assessment = {
      ...assessmentData,
      id: crypto.randomUUID(),
    };
    set((state) => ({
      assessments: [...state.assessments, newAssessment],
    }));
  },
  updateAssessment: async (assessment) => {
    set((state) => ({
      assessments: state.assessments.map((a) =>
        a.id === assessment.id ? assessment : a
      ),
    }));
  },
  deleteAssessment: async (id) => {
    set((state) => ({
      assessments: state.assessments.filter((a) => a.id !== id),
    }));
  },
}));