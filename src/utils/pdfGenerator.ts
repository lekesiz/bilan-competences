import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';
import { Assessment, AssessmentResult } from '../types';

interface GeneratePDFProps {
  result: AssessmentResult;
  assessment: Assessment;
  userName: string;
}

export const generatePDF = async ({ result, assessment, userName }: GeneratePDFProps) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const maxScore = assessment.questions.length * 3;
  const percentage = Math.round((result.score / maxScore) * 100);

  // Header
  pdf.setFontSize(20);
  pdf.text('Bilan Compétence Assessment Report', 20, 20);
  
  // Basic Information
  pdf.setFontSize(12);
  pdf.text(`Candidate: ${userName}`, 20, 40);
  pdf.text(`Assessment: ${assessment.title}`, 20, 50);
  pdf.text(`Date: ${format(result.completedAt, 'PPP')}`, 20, 60);
  pdf.text(`Overall Score: ${percentage}%`, 20, 70);

  // International Standards Section
  pdf.setFontSize(14);
  pdf.text('International Competency Framework', 20, 90);
  
  pdf.setFontSize(12);
  const competencyLevels = getCompetencyLevel(percentage);
  pdf.text(`European Qualifications Framework (EQF) Level: ${competencyLevels.eqf}`, 20, 105);
  pdf.text(`Common European Framework (CEFR) Equivalent: ${competencyLevels.cefr}`, 20, 115);
  
  // Detailed Analysis
  pdf.setFontSize(14);
  pdf.text('Detailed Analysis', 20, 135);
  
  pdf.setFontSize(12);
  let yPosition = 150;
  
  // Strengths and Areas for Improvement
  const { strengths, improvements } = analyzeResponses(result, assessment);
  
  pdf.text('Key Strengths:', 20, yPosition);
  yPosition += 10;
  strengths.forEach(strength => {
    pdf.text(`• ${strength}`, 25, yPosition);
    yPosition += 10;
  });
  
  yPosition += 10;
  pdf.text('Areas for Improvement:', 20, yPosition);
  yPosition += 10;
  improvements.forEach(improvement => {
    pdf.text(`• ${improvement}`, 25, yPosition);
    yPosition += 10;
  });
  
  // Recommendations
  yPosition += 10;
  pdf.text('Development Recommendations:', 20, yPosition);
  yPosition += 10;
  const recommendations = generateRecommendations(assessment.type, percentage);
  recommendations.forEach(rec => {
    const lines = pdf.splitTextToSize(rec, 170);
    lines.forEach(line => {
      pdf.text(`• ${line}`, 25, yPosition);
      yPosition += 10;
    });
  });
  
  // Footer
  pdf.setFontSize(10);
  pdf.text('This assessment follows international competency frameworks and standards.', 20, 280);
  pdf.text(`Generated on ${format(new Date(), 'PPP')}`, 20, 285);

  return pdf;
};

const getCompetencyLevel = (percentage: number) => {
  // EQF Levels (1-8)
  let eqf = '1';
  if (percentage >= 95) eqf = '8';
  else if (percentage >= 85) eqf = '7';
  else if (percentage >= 75) eqf = '6';
  else if (percentage >= 65) eqf = '5';
  else if (percentage >= 55) eqf = '4';
  else if (percentage >= 45) eqf = '3';
  else if (percentage >= 35) eqf = '2';

  // CEFR Levels (A1-C2)
  let cefr = 'A1';
  if (percentage >= 95) cefr = 'C2';
  else if (percentage >= 85) cefr = 'C1';
  else if (percentage >= 75) cefr = 'B2';
  else if (percentage >= 65) cefr = 'B2';
  else if (percentage >= 55) cefr = 'B1';
  else if (percentage >= 45) cefr = 'A2';

  return { eqf, cefr };
};

const analyzeResponses = (result: AssessmentResult, assessment: Assessment) => {
  const strengths: string[] = [];
  const improvements: string[] = [];

  assessment.questions.forEach(question => {
    const answer = result.answers[question.id];
    const selectedOption = question.options.find(opt => opt.id === answer);
    
    if (selectedOption?.value === 3) {
      strengths.push(question.text);
    } else if (selectedOption?.value === 1) {
      improvements.push(question.text);
    }
  });

  return { strengths, improvements };
};

const generateRecommendations = (assessmentType: string, percentage: number): string[] => {
  const recommendations: string[] = [];

  switch (assessmentType) {
    case 'personality':
      if (percentage < 70) {
        recommendations.push('Consider participating in self-awareness workshops to better understand your work style.');
        recommendations.push('Practice mindfulness techniques to enhance emotional intelligence.');
      } else {
        recommendations.push('Mentor others in developing their professional identity.');
        recommendations.push('Take on leadership roles that align with your personality strengths.');
      }
      break;

    case 'technical':
      if (percentage < 70) {
        recommendations.push('Focus on strengthening fundamental technical concepts through structured learning.');
        recommendations.push('Participate in hands-on projects to gain practical experience.');
      } else {
        recommendations.push('Consider pursuing advanced certifications in your technical domain.');
        recommendations.push('Contribute to open-source projects to expand your technical expertise.');
      }
      break;

    case 'soft-skills':
      if (percentage < 70) {
        recommendations.push('Join communication workshops or Toastmasters to improve presentation skills.');
        recommendations.push('Practice active listening techniques in daily interactions.');
      } else {
        recommendations.push('Take on roles that require cross-functional team coordination.');
        recommendations.push('Develop training materials to share your communication best practices.');
      }
      break;
  }

  return recommendations;
};