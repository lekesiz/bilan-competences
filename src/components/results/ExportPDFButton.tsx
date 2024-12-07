import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { generatePDF } from '../../utils/pdfGenerator';
import { Assessment, AssessmentResult } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

interface ExportPDFButtonProps {
  result: AssessmentResult;
  assessment: Assessment;
  userName: string;
}

export const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({
  result,
  assessment,
  userName,
}) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    setIsGenerating(true);
    try {
      const pdf = await generatePDF({ result, assessment, userName });
      const filename = `${assessment.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isGenerating}
      variant="outline"
      className="flex items-center"
    >
      <FileDown className="w-4 h-4 mr-2" />
      {isGenerating ? t('common.loading') : t('results.export')}
    </Button>
  );
};