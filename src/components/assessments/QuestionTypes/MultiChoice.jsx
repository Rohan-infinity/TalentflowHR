import React from 'react';
import './QuestionTypes.css';

const MultiChoice = ({ 
  question, 
  value = [], 
  onChange, 
  disabled = false, 
  showCorrectAnswer = false,
  isBuilder = false,
  onUpdateQuestion
}) => {
  const handleOptionChange = (optionValue) => {
    if (disabled) return;
    
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter(v => v !== optionValue)
      : [...currentValues, optionValue];
    
    onChange(newValues);
  };

  const handleOptionUpdate = (optionIndex, field, newValue) => {
    if (!isBuilder || !onUpdateQuestion) return;
    
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = { ...updatedOptions[optionIndex], [field]: newValue };
    
    onUpdateQuestion({ ...question, options: updatedOptions });
  };

  const addOption = () => {
    if (!isBuilder || !onUpdateQuestion) return;
    
    const newOption = {
      id: `opt${question.options.length + 1}`,
      text: `Option ${question.options.length + 1}`,
      value: `option${question.options.length + 1}`
    };
    
    onUpdateQuestion({ 
      ...question, 
      options: [...question.options, newOption] 
    });
  };

  const removeOption = (optionIndex) => {
    if (!isBuilder || !onUpdateQuestion || question.options.length <= 2) return;
    
    const updatedOptions = question.options.filter((_, index) => index !== optionIndex);
    const updatedCorrectAnswers = (question.correctAnswers || []).filter(
      answer => answer !== question.options[optionIndex].value
    );
    
    onUpdateQuestion({ 
      ...question, 
      options: updatedOptions,
      correctAnswers: updatedCorrectAnswers
    });
  };

  const toggleCorrectAnswer = (optionValue) => {
    if (!isBuilder || !onUpdateQuestion) return;
    
    const currentCorrectAnswers = question.correctAnswers || [];
    const updatedCorrectAnswers = currentCorrectAnswers.includes(optionValue)
      ? currentCorrectAnswers.filter(answer => answer !== optionValue)
      : [...currentCorrectAnswers, optionValue];
    
    onUpdateQuestion({ 
      ...question, 
      correctAnswers: updatedCorrectAnswers 
    });
  };

  const currentValues = Array.isArray(value) ? value : [];

  return (
    <div className="question-type multi-choice">
      {question.options?.map((option, index) => (
        <div key={option.id} className="option-container">
          <div className="option-input">
            <input
              type="checkbox"
              id={`${question.id}-${option.id}`}
              value={option.value}
              checked={currentValues.includes(option.value)}
              onChange={() => handleOptionChange(option.value)}
              disabled={disabled}
              className="checkbox-input"
            />
            <label 
              htmlFor={`${question.id}-${option.id}`}
              className={`option-label ${currentValues.includes(option.value) ? 'selected' : ''}`}
            >
              {isBuilder ? (
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionUpdate(index, 'text', e.target.value)}
                  className="option-text-input"
                  placeholder="Enter option text"
                />
              ) : (
                <span className="option-text">{option.text}</span>
              )}
            </label>
          </div>
          
          {isBuilder && (
            <div className="option-controls">
              <button
                type="button"
                onClick={() => toggleCorrectAnswer(option.value)}
                className={`correct-answer-btn ${(question.correctAnswers || []).includes(option.value) ? 'active' : ''}`}
                title="Mark as correct answer"
              >
                ✓
              </button>
              {question.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="remove-option-btn"
                  title="Remove option"
                >
                  ×
                </button>
              )}
            </div>
          )}
          
          {showCorrectAnswer && (question.correctAnswers || []).includes(option.value) && (
            <span className="correct-indicator">✓ Correct</span>
          )}
        </div>
      ))}
      
      {isBuilder && (
        <button
          type="button"
          onClick={addOption}
          className="add-option-btn"
        >
          + Add Option
        </button>
      )}
      
      {!isBuilder && question.options && question.options.length > 0 && (
        <div className="selection-info">
          {currentValues.length} of {question.options.length} selected
        </div>
      )}
    </div>
  );
};

export default MultiChoice;







