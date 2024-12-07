import React, { useState } from 'react';
import { Assessment, Question, Option } from '../../../types';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Plus, Minus, Save } from 'lucide-react';

interface AssessmentEditorProps {
  assessment?: Assessment;
  onSave: (assessment: Assessment) => void;
  onCancel: () => void;
}

export const AssessmentEditor: React.FC<AssessmentEditorProps> = ({
  assessment,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Assessment>>(
    assessment || {
      title: '',
      type: 'technical',
      description: '',
      estimatedTime: '',
      questions: [],
    }
  );

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...(prev.questions || []),
        {
          id: crypto.randomUUID(),
          text: '',
          options: [
            { id: crypto.randomUUID(), text: '', value: 1 },
            { id: crypto.randomUUID(), text: '', value: 2 },
            { id: crypto.randomUUID(), text: '', value: 3 },
          ],
        },
      ],
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.filter((_, i) => i !== index),
    }));
  };

  const updateQuestion = (index: number, question: Partial<Question>) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.map((q, i) =>
        i === index ? { ...q, ...question } : q
      ),
    }));
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    option: Partial<Option>
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions?.map((q, qIndex) =>
        qIndex === questionIndex
          ? {
              ...q,
              options: q.options.map((o, oIndex) =>
                oIndex === optionIndex ? { ...o, ...option } : o
              ),
            }
          : q
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.type && formData.questions?.length) {
      onSave(formData as Assessment);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value as Assessment['type'] })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="personality">Personality</option>
            <option value="technical">Technical</option>
            <option value="soft-skills">Soft Skills</option>
          </select>
        </div>
      </div>

      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />

      <Input
        label="Estimated Time (e.g., '15 minutes')"
        value={formData.estimatedTime}
        onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
        required
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Questions</h3>
          <Button type="button" onClick={addQuestion} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {formData.questions?.map((question, qIndex) => (
          <div key={question.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <Input
                label={`Question ${qIndex + 1}`}
                value={question.text}
                onChange={(e) => updateQuestion(qIndex, { text: e.target.value })}
                required
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeQuestion(qIndex)}
                className="ml-4"
              >
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={option.id} className="flex gap-4">
                  <Input
                    label={`Option ${oIndex + 1}`}
                    value={option.text}
                    onChange={(e) =>
                      updateOption(qIndex, oIndex, { text: e.target.value })
                    }
                    required
                  />
                  <div className="w-24">
                    <label className="block text-sm font-medium text-gray-700">
                      Points
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="3"
                      value={option.value}
                      onChange={(e) =>
                        updateOption(qIndex, oIndex, {
                          value: parseInt(e.target.value),
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Save Assessment
        </Button>
      </div>
    </form>
  );
};