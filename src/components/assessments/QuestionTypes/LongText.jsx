import React, { useState } from 'react';
import './QuestionTypes.css';

const LongText = ({ 
  question, 
  value = '', 
  onChange, 
  disabled = false,
  isBuilder = false,
  onUpdateQuestion
}) => {
  const getWordCount = (text) => {
    if (!text || typeof text !== 'string') return 0;
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const [wordCount, setWordCount] = useState(getWordCount(value));

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!disabled) {
      onChange(newValue);
      setWordCount(getWordCount(newValue));
    }
  };

  const maxWords = 500; // Fixed word limit for long text
  const isNearLimit = wordCount > maxWords * 0.8;
  const isOverLimit = wordCount > maxWords;

  return (
    <div className="question-type long-text">
      <div className="text-input-container">
        <textarea
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Enter your detailed answer here (max 500 words)..."
          rows={6}
          className={`text-area ${isOverLimit ? 'over-limit' : isNearLimit ? 'near-limit' : ''}`}
        />
        
        <div className="input-info">
          <span className={`word-count ${isOverLimit ? 'over-limit' : isNearLimit ? 'near-limit' : ''}`}>
            {wordCount} / {maxWords} words
          </span>
        </div>
      </div>
      
      {isOverLimit && (
        <div className="error-message">
          Answer exceeds maximum limit of {maxWords} words
        </div>
      )}
    </div>
  );
};

export default LongText;
