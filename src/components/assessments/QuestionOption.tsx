import React from 'react';
import { Option } from '../../types';

interface QuestionOptionProps {
  option: Option;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
        isSelected
          ? 'border-blue-600 bg-blue-50'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      {option.text}
    </button>
  );
};