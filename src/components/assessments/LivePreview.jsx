import React, { useState } from 'react';
import { useAssessmentContext } from '../../context/AssessmentContext';
import { formatTime } from '../../utils/assessmentUtils';
import SingleChoice from './QuestionTypes/SingleChoice';
import MultiChoice from './QuestionTypes/MultiChoice';
import ShortText from './QuestionTypes/ShortText';
import LongText from './QuestionTypes/LongText';
import NumericRange from './QuestionTypes/NumericRange';
import FileUpload from './QuestionTypes/FileUpload';
import './LivePreview.css';

const LivePreview = ({ assessment }) => {
  const { getVisibleQuestions, validateResponse } = useAssessmentContext();
  const [responses, setResponses] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: null }));
    }
  };

  const validateCurrentResponses = () => {
    const newErrors = {};
    const visibleQuestions = getVisibleQuestions(assessment, responses);
    
    visibleQuestions.forEach(question => {
      const response = responses[question.id];
      const validationErrors = validateResponse(question, response);
      if (validationErrors.length > 0) {
        newErrors[question.id] = validationErrors[0]; // Show first error
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderQuestionType = (question) => {
    const value = responses[question.id];
    const onChange = (newValue) => handleResponseChange(question.id, newValue);

    const commonProps = {
      question,
      value,
      onChange,
      disabled: false,
      isBuilder: false
    };

    switch (question.type) {
      case 'single-choice':
        return <SingleChoice {...commonProps} />;
      case 'multi-choice':
        return <MultiChoice {...commonProps} />;
      case 'short-text':
        return <ShortText {...commonProps} />;
      case 'long-text':
        return <LongText {...commonProps} />;
      case 'numeric-range':
        return <NumericRange {...commonProps} />;
      case 'file-upload':
        return <FileUpload {...commonProps} />;
      default:
        return <div>Unknown question type: {question.type}</div>;
    }
  };

  const visibleQuestions = getVisibleQuestions(assessment, responses);
  
  // For now, let's show all questions from the current section directly
  const currentSectionData = assessment.sections[currentSection];
  const currentSectionQuestions = currentSectionData ? currentSectionData.questions : [];
  
  // Calculate total questions from all sections
  const totalQuestions = assessment.sections.reduce((total, section) => total + (section.questions?.length || 0), 0);
  const answeredQuestions = visibleQuestions.filter(q => {
    const response = responses[q.id];
    return response !== null && response !== undefined && response !== '' && 
           (!Array.isArray(response) || response.length > 0);
  }).length;

  return (
    <div className="live-preview">
      <div className="preview-header">
        <div className="assessment-info">
          <h1>{assessment.title}</h1>
          {assessment.description && (
            <p className="assessment-description">{assessment.description}</p>
          )}
        </div>
        
        <div className="assessment-meta">
          <div className="meta-item">
            <span className="meta-label">Time Limit:</span>
            <span className="meta-value">{formatTime(assessment.timeLimit)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Passing Score:</span>
            <span className="meta-value">{assessment.passingScore}%</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Progress:</span>
            <span className="meta-value">{answeredQuestions}/{totalQuestions}</span>
          </div>
        </div>
      </div>

      <div className="preview-content">
        {/* Section Navigation */}
        {assessment.sections.length > 1 && (
          <div className="section-navigation">
            {assessment.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`section-nav-btn ${currentSection === index ? 'active' : ''}`}
              >
                {section.title}
              </button>
            ))}
          </div>
        )}

        {/* Current Section */}
        {assessment.sections[currentSection] && (
          <div className="section-content">
            <div className="section-header">
              <h2>{assessment.sections[currentSection].title}</h2>
              {assessment.sections[currentSection].description && (
                <p className="section-description">
                  {assessment.sections[currentSection].description}
                </p>
              )}
            </div>

            <div className="questions-container">
              {currentSectionQuestions.length > 0 ? (
                currentSectionQuestions.map((question, index) => (
                  <div key={question.id} className="question-container">
                    <div className="question-header">
                      <div className="question-number">
                        Question {index + 1}
                      </div>
                      <div className="question-meta">
                        {question.required && (
                          <span className="required-indicator">Required</span>
                        )}
                        <span className="points-indicator">
                          {question.points || 10} points
                        </span>
                      </div>
                    </div>
                    
                    <div className="question-text">
                      {question.question}
                      {question.required && <span className="required-asterisk">*</span>}
                    </div>
                    
                    <div className="question-answer">
                      {renderQuestionType(question)}
                    </div>
                    
                    {errors[question.id] && (
                      <div className="question-error">
                        {errors[question.id]}
                      </div>
                    )}
                    
                    {question.conditional && (
                      <div className="conditional-info">
                        <small>
                          💡 This question is shown conditionally based on your previous answers
                        </small>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-questions">
                  <p>No questions are visible in this section based on your current responses.</p>
                  <p>Try answering questions in previous sections to reveal conditional questions.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="preview-navigation">
          <div className="nav-buttons">
            {currentSection > 0 && (
              <button
                onClick={() => setCurrentSection(currentSection - 1)}
                className="nav-btn prev-btn"
              >
                ← Previous Section
              </button>
            )}
            
            {currentSection < assessment.sections.length - 1 && (
              <button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="nav-btn next-btn"
              >
                Next Section →
              </button>
            )}
          </div>
          
          <div className="validation-controls">
            <button
              onClick={validateCurrentResponses}
              className="validate-btn"
            >
              Validate Responses
            </button>
            
            <button
              onClick={() => {
                setResponses({});
                setErrors({});
              }}
              className="reset-btn"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-info">
            <span>Progress: {answeredQuestions} of {totalQuestions} questions answered</span>
            <span>{totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Preview Notice */}
      <div className="preview-notice">
        <strong>Preview Mode:</strong> This is how candidates will see your assessment. 
        Responses are not saved and conditional logic is fully functional.
      </div>
    </div>
  );
};

export default LivePreview;

