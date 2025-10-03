import React from 'react';
import { QUESTION_TYPES, getQuestionTypeLabel } from '../../utils/assessmentUtils';
import SingleChoice from './QuestionTypes/SingleChoice';
import MultiChoice from './QuestionTypes/MultiChoice';
import ShortText from './QuestionTypes/ShortText';
import LongText from './QuestionTypes/LongText';
import NumericRange from './QuestionTypes/NumericRange';
import FileUpload from './QuestionTypes/FileUpload';
import './QuestionEditor.css';

const QuestionEditor = ({ 
  question, 
  sectionIndex, 
  questionIndex, 
  onUpdate,
  allQuestions = []
}) => {
  const updateField = (field, value) => {
    onUpdate({ [field]: value });
  };

  const updateConditional = (field, value) => {
    const conditional = question.conditional || {};
    if (field === null) {
      // Remove conditional
      onUpdate({ conditional: null });
    } else {
      onUpdate({ 
        conditional: { ...conditional, [field]: value }
      });
    }
  };

  const renderQuestionType = () => {
    const commonProps = {
      question,
      value: null, // No value in builder mode
      onChange: () => {}, // No onChange in builder mode
      disabled: false,
      isBuilder: true,
      onUpdateQuestion: onUpdate
    };

    switch (question.type) {
      case QUESTION_TYPES.SINGLE_CHOICE:
        return <SingleChoice {...commonProps} />;
      case QUESTION_TYPES.MULTI_CHOICE:
        return <MultiChoice {...commonProps} />;
      case QUESTION_TYPES.SHORT_TEXT:
        return <ShortText {...commonProps} />;
      case QUESTION_TYPES.LONG_TEXT:
        return <LongText {...commonProps} />;
      case QUESTION_TYPES.NUMERIC_RANGE:
        return <NumericRange {...commonProps} />;
      case QUESTION_TYPES.FILE_UPLOAD:
        return <FileUpload {...commonProps} />;
      default:
        return <div>Unknown question type: {question.type}</div>;
    }
  };

  // Get available questions for conditional logic (excluding current question)
  const availableQuestions = allQuestions.filter(q => q.id !== question.id);

  return (
    <div className="question-editor">
      <div className="editor-header">
        <h2>Question Editor</h2>
        <div className="question-type-badge">
          {getQuestionTypeLabel(question.type)}
        </div>
      </div>

      <div className="editor-content">
        {/* Basic Question Settings */}
        <div className="editor-section">
          <h3>Question Details</h3>
          
          <div className="field-group">
            <label>Question Text *</label>
            <textarea
              value={question.question}
              onChange={(e) => updateField('question', e.target.value)}
              placeholder="Enter your question here..."
              rows={3}
              className="question-text-input"
            />
          </div>

          <div className="field-row">
            <div className="field-group">
              <label>Points</label>
              <input
                type="number"
                value={question.points || 10}
                onChange={(e) => updateField('points', parseInt(e.target.value) || 10)}
                min="0"
                className="points-input"
              />
            </div>
            
            <div className="field-group">
              <label>
                <input
                  type="checkbox"
                  checked={question.required || false}
                  onChange={(e) => updateField('required', e.target.checked)}
                />
                Required Question
              </label>
            </div>
          </div>
        </div>

        {/* Question Type Specific Settings */}
        <div className="editor-section">
          <h3>Question Configuration</h3>
          {renderQuestionType()}
        </div>

        {/* Conditional Logic */}
        <div className="editor-section">
          <h3>Conditional Logic</h3>
          <p className="section-description">
            Show this question only when certain conditions are met
          </p>
          
          <div className="conditional-controls">
            <label>
              <input
                type="checkbox"
                checked={!!question.conditional}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateConditional('dependsOn', '');
                    updateConditional('operator', 'equals');
                    updateConditional('value', '');
                  } else {
                    updateConditional(null, null);
                  }
                }}
              />
              Enable conditional logic
            </label>
          </div>

          {question.conditional && (
            <div className="conditional-settings">
              <div className="conditional-rule">
                <span>Show this question when</span>
                
                <select
                  value={question.conditional.dependsOn || ''}
                  onChange={(e) => updateConditional('dependsOn', e.target.value)}
                  className="conditional-select"
                >
                  <option value="">Select a question</option>
                  {availableQuestions.map(q => (
                    <option key={q.id} value={q.id}>
                      {q.question || 'Untitled Question'}
                    </option>
                  ))}
                </select>
                
                <span className="conditional-operator">
                  equals
                </span>
                
                <input
                  type="text"
                  value={question.conditional.value || ''}
                  onChange={(e) => updateConditional('value', e.target.value)}
                  placeholder="Enter value"
                  className="conditional-input"
                />
              </div>
              
              {question.conditional.dependsOn && (
                <div className="conditional-preview">
                  <strong>Rule:</strong> Show when "{availableQuestions.find(q => q.id === question.conditional.dependsOn)?.question || 'Unknown Question'}" equals "{question.conditional.value}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Question Preview */}
        <div className="editor-section">
          <h3>Preview</h3>
          <div className="question-preview">
            <div className="preview-header">
              <span className="preview-question-number">Q{questionIndex + 1}</span>
              {question.required && <span className="required-indicator">*</span>}
              <span className="preview-points">({question.points || 10} points)</span>
            </div>
            <div className="preview-question-text">
              {question.question || 'Enter your question text above'}
            </div>
            <div className="preview-answer-area">
              {renderQuestionType()}
            </div>
            {question.conditional && (
              <div className="preview-conditional">
                <small>
                  🔗 Conditional: Shows when specified conditions are met
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;

