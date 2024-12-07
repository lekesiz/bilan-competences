export interface User {
  id: string;
  email: string;
  name: string;
  profession?: string;
  experience?: string;
  interests?: string[];
  createdAt: Date;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'personality' | 'technical' | 'soft-skills';
  description: string;
  estimatedTime: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  value: number;
}

export interface AssessmentResult {
  id: string;
  userId: string;
  assessmentId: string;
  score: number;
  answers: Record<string, string>;
  completedAt: Date;
}

export interface AssessmentCategory {
  title: string;
  description: string;
  icon: string;
}