import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div className="space-y-1" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div
          className={`min-h-[42px] rounded-lg border px-3 py-2 ${
            disabled ? 'bg-gray-100' : 'cursor-pointer'
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-2">
            {value.length > 0 ? (
              value.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm"
                >
                  {item}
                  {!disabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOption(item);
                      }}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-500">Select options</span>
            )}
          </div>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
            <div className="py-1">
              {options.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    value.includes(option) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};