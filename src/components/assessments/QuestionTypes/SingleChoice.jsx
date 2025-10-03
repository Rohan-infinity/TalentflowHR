import React from 'react';
import './QuestionTypes.css';

const SingleChoice = ({ 
  question, 
  value, 
  onChange, 
  disabled = false, 
  showCorrectAnswer = false,
  isBuilder = false,
  onUpdateQuestion
}) => {
  const handleOptionChange = (optionValue) => {
    if (!disabled) {
      onChange(optionValue);
    }
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
    onUpdateQuestion({ ...question, options: updatedOptions });
  };

  const setCorrectAnswer = (optionValue) => {
    if (!isBuilder || !onUpdateQuestion) return;
    
    onUpdateQuestion({ 
      ...question, 
      correctAnswer: question.correctAnswer === optionValue ? null : optionValue 
    });
  };

  return (
    <div className="question-type single-choice">
      {question.options?.map((option, index) => (
        <div key={option.id} className="option-container">
          <div className="option-input">
            <input
              type="radio"
              id={`${question.id}-${option.id}`}
              name={question.id}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleOptionChange(option.value)}
              disabled={disabled}
              className="radio-input"
            />
            <label 
              htmlFor={`${question.id}-${option.id}`}
              className={`option-label ${value === option.value ? 'selected' : ''}`}
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
                onClick={() => setCorrectAnswer(option.value)}
                className={`correct-answer-btn ${question.correctAnswer === option.value ? 'active' : ''}`}
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
          
          {showCorrectAnswer && question.correctAnswer === option.value && (
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
    </div>
  );
};

export default SingleChoice;







