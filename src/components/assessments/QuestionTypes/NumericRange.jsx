import React from 'react';
import './QuestionTypes.css';

const NumericRange = ({ 
  question, 
  value, 
  onChange, 
  disabled = false,
  isBuilder = false,
  onUpdateQuestion
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value === '' ? null : parseFloat(e.target.value);
    if (!disabled) {
      onChange(newValue);
    }
  };

  const handleMinUpdate = (newMin) => {
    if (!isBuilder || !onUpdateQuestion) return;
    const min = parseFloat(newMin) || 0;
    onUpdateQuestion({ ...question, min });
  };

  const handleMaxUpdate = (newMax) => {
    if (!isBuilder || !onUpdateQuestion) return;
    const max = parseFloat(newMax) || 100;
    onUpdateQuestion({ ...question, max });
  };

  const handleStepUpdate = (newStep) => {
    if (!isBuilder || !onUpdateQuestion) return;
    const step = parseFloat(newStep) || 1;
    onUpdateQuestion({ ...question, step });
  };

  const handleUnitUpdate = (newUnit) => {
    if (!isBuilder || !onUpdateQuestion) return;
    onUpdateQuestion({ ...question, unit: newUnit });
  };

  const min = question.min || 0;
  const max = question.max || 100;
  const step = question.step || 1;
  const unit = question.unit || '';

  const isValid = value === null || value === undefined || (value >= min && value <= max);

  return (
    <div className="question-type numeric-range">
      {isBuilder && (
        <div className="builder-controls">
          <div className="control-row">
            <div className="control-group">
              <label>Min Value:</label>
              <input
                type="number"
                value={question.min || 0}
                onChange={(e) => handleMinUpdate(e.target.value)}
                className="control-input"
              />
            </div>
            <div className="control-group">
              <label>Max Value:</label>
              <input
                type="number"
                value={question.max || 100}
                onChange={(e) => handleMaxUpdate(e.target.value)}
                className="control-input"
              />
            </div>
            <div className="control-group">
              <label>Step:</label>
              <input
                type="number"
                value={question.step || 1}
                onChange={(e) => handleStepUpdate(e.target.value)}
                className="control-input"
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="control-group">
              <label>Unit:</label>
              <input
                type="text"
                value={question.unit || ''}
                onChange={(e) => handleUnitUpdate(e.target.value)}
                className="control-input"
                placeholder="e.g., years, kg, %"
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="numeric-input-container">
        <div className="input-with-unit">
          <input
            type="number"
            value={value === null || value === undefined ? '' : value}
            onChange={handleChange}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={`numeric-input ${!isValid ? 'invalid' : ''}`}
            placeholder={`Enter value (${min} - ${max})`}
          />
          {unit && <span className="unit-label">{unit}</span>}
        </div>
        
        <div className="range-info">
          <span className="range-label">
            Range: {min} - {max} {unit}
          </span>
          {step !== 1 && (
            <span className="step-label">
              Step: {step}
            </span>
          )}
        </div>
        
        {!isBuilder && (
          <input
            type="range"
            value={value === null || value === undefined ? min : value}
            onChange={handleChange}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className="range-slider"
          />
        )}
      </div>
      
      {!isValid && (
        <div className="error-message">
          Value must be between {min} and {max} {unit}
        </div>
      )}
    </div>
  );
};

export default NumericRange;







