import React, { useState, useEffect } from 'react';
import { useAssessmentContext } from '../../context/AssessmentContext';
import { createEmptyQuestion, createEmptySection, QUESTION_TYPES, validateAssessment } from '../../utils/assessmentUtils';
import QuestionEditor from './QuestionEditor';
import LivePreview from './LivePreview';
import './AssessmentBuilder.css';

const AssessmentBuilder = ({ 
  jobId, 
  assessmentId = null, 
  onSave, 
  onCancel 
}) => {
  const { 
    getAssessmentById, 
    createAssessment, 
    updateAssessment 
  } = useAssessmentContext();

  const [assessment, setAssessment] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);

  // Initialize assessment
  useEffect(() => {
    if (assessmentId) {
      // Edit existing assessment
      const existingAssessment = getAssessmentById(assessmentId);
      if (existingAssessment) {
        setAssessment(existingAssessment);
        if (existingAssessment.sections.length > 0 && existingAssessment.sections[0].questions.length > 0) {
          setActiveQuestion(existingAssessment.sections[0].questions[0].id);
        }
      }
    } else {
      // Create new assessment
      const newAssessment = {
        jobId,
        title: 'New Assessment',
        description: '',
        sections: [
          {
            ...createEmptySection(),
            title: 'Section 1',
            questions: [createEmptyQuestion(QUESTION_TYPES.SINGLE_CHOICE)]
          }
        ],
        timeLimit: 60,
        passingScore: 70,
        isActive: true
      };
      setAssessment(newAssessment);
      setActiveQuestion(newAssessment.sections[0].questions[0].id);
    }
  }, [assessmentId, jobId, getAssessmentById]);

  const updateAssessmentField = (field, value) => {
    setAssessment(prev => ({ ...prev, [field]: value }));
  };

  const updateSection = (sectionIndex, updates) => {
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex ? { ...section, ...updates } : section
      )
    }));
  };

  const addSection = () => {
    const newSection = {
      ...createEmptySection(),
      title: `Section ${assessment.sections.length + 1}`
    };
    
    setAssessment(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    
    setActiveSection(assessment.sections.length);
  };

  const removeSection = (sectionIndex) => {
    if (assessment.sections.length <= 1) return;
    
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex)
    }));
    
    if (activeSection >= assessment.sections.length - 1) {
      setActiveSection(Math.max(0, activeSection - 1));
    }
  };

  const addQuestion = (sectionIndex, questionType) => {
    const newQuestion = createEmptyQuestion(questionType);
    
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) => 
        index === sectionIndex 
          ? { ...section, questions: [...section.questions, newQuestion] }
          : section
      )
    }));
    
    setActiveQuestion(newQuestion.id);
  };

  const updateQuestion = (sectionIndex, questionIndex, updates) => {
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) => 
        sIndex === sectionIndex 
          ? {
              ...section,
              questions: section.questions.map((question, qIndex) => 
                qIndex === questionIndex ? { ...question, ...updates } : question
              )
            }
          : section
      )
    }));
  };

  const removeQuestion = (sectionIndex, questionIndex) => {
    const section = assessment.sections[sectionIndex];
    if (section.questions.length <= 1) return;
    
    const questionToRemove = section.questions[questionIndex];
    
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) => 
        sIndex === sectionIndex 
          ? {
              ...section,
              questions: section.questions.filter((_, qIndex) => qIndex !== questionIndex)
            }
          : section
      )
    }));
    
    // Update active question if the removed question was active
    if (activeQuestion === questionToRemove.id) {
      const remainingQuestions = section.questions.filter((_, qIndex) => qIndex !== questionIndex);
      if (remainingQuestions.length > 0) {
        setActiveQuestion(remainingQuestions[0].id);
      }
    }
  };

  const duplicateQuestion = (sectionIndex, questionIndex) => {
    const originalQuestion = assessment.sections[sectionIndex].questions[questionIndex];
    const duplicatedQuestion = {
      ...originalQuestion,
      id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: `${originalQuestion.question} (Copy)`
    };
    
    setAssessment(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) => 
        sIndex === sectionIndex 
          ? {
              ...section,
              questions: [
                ...section.questions.slice(0, questionIndex + 1),
                duplicatedQuestion,
                ...section.questions.slice(questionIndex + 1)
              ]
            }
          : section
      )
    }));
    
    setActiveQuestion(duplicatedQuestion.id);
  };

  const handleSave = async () => {
    // Validate assessment
    const validationErrors = validateAssessment(assessment);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setSaving(true);
    setErrors([]);
    
    try {
      let savedAssessment;
      
      if (assessmentId) {
        // Update existing assessment
        updateAssessment(assessmentId, assessment);
        savedAssessment = { ...assessment, id: assessmentId };
      } else {
        // Create new assessment
        savedAssessment = createAssessment(assessment);
      }
      
      if (onSave) {
        onSave(savedAssessment);
      }
    } catch (error) {
      setErrors(['Failed to save assessment. Please try again.']);
    } finally {
      setSaving(false);
    }
  };

  const getActiveQuestionData = () => {
    if (!activeQuestion || !assessment) return null;
    
    for (let sIndex = 0; sIndex < assessment.sections.length; sIndex++) {
      const section = assessment.sections[sIndex];
      for (let qIndex = 0; qIndex < section.questions.length; qIndex++) {
        const question = section.questions[qIndex];
        if (question.id === activeQuestion) {
          return { question, sectionIndex: sIndex, questionIndex: qIndex };
        }
      }
    }
    return null;
  };

  if (!assessment) {
    return <div className="assessment-builder-loading">Loading assessment builder...</div>;
  }

  const activeQuestionData = getActiveQuestionData();

  return (
    <div className="assessment-builder">
      <div className="builder-header">
        <div className="header-content">
          <h1>{assessmentId ? 'Edit Assessment' : 'Create Assessment'}</h1>
          <div className="header-actions">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`preview-btn ${showPreview ? 'active' : ''}`}
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="save-btn"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Assessment'}
            </button>
          </div>
        </div>
        
        {errors.length > 0 && (
          <div className="error-list">
            {errors.map((error, index) => (
              <div key={index} className="error-item">{error}</div>
            ))}
          </div>
        )}
      </div>

      <div className="builder-content">
        <div className="builder-sidebar">
          {/* Assessment Settings */}
          <div className="settings-section">
            <h3>Assessment Settings</h3>
            <div className="setting-group">
              <label>Title</label>
              <input
                type="text"
                value={assessment.title}
                onChange={(e) => updateAssessmentField('title', e.target.value)}
                placeholder="Assessment title"
              />
            </div>
            <div className="setting-group">
              <label>Description</label>
              <textarea
                value={assessment.description}
                onChange={(e) => updateAssessmentField('description', e.target.value)}
                placeholder="Assessment description"
                rows={3}
              />
            </div>
            <div className="setting-row">
              <div className="setting-group">
                <label>Time Limit (minutes)</label>
                <input
                  type="number"
                  value={assessment.timeLimit}
                  onChange={(e) => updateAssessmentField('timeLimit', parseInt(e.target.value) || 60)}
                  min="1"
                />
              </div>
              <div className="setting-group">
                <label>Passing Score (%)</label>
                <input
                  type="number"
                  value={assessment.passingScore}
                  onChange={(e) => updateAssessmentField('passingScore', parseInt(e.target.value) || 70)}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          {/* Sections List */}
          <div className="sections-list">
            <div className="sections-header">
              <h3>Sections</h3>
              <button onClick={addSection} className="add-section-btn">
                + Add Section
              </button>
            </div>
            
            {assessment.sections.map((section, sectionIndex) => (
              <div 
                key={section.id} 
                className={`section-item ${activeSection === sectionIndex ? 'active' : ''}`}
              >
                <div 
                  className="section-header"
                  onClick={() => setActiveSection(sectionIndex)}
                >
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
                    onClick={(e) => e.stopPropagation()}
                    className="section-title-input"
                  />
                  {assessment.sections.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(sectionIndex);
                      }}
                      className="remove-section-btn"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {activeSection === sectionIndex && (
                  <div className="questions-list">
                    {section.questions.map((question, questionIndex) => (
                      <div 
                        key={question.id}
                        className={`question-item ${activeQuestion === question.id ? 'active' : ''}`}
                        onClick={() => setActiveQuestion(question.id)}
                      >
                        <div className="question-info">
                          <span className="question-type">
                            {QUESTION_TYPES[question.type.toUpperCase().replace('-', '_')] || question.type}
                          </span>
                          <span className="question-text">
                            {question.question || 'Untitled Question'}
                          </span>
                        </div>
                        <div className="question-actions">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateQuestion(sectionIndex, questionIndex);
                            }}
                            className="duplicate-question-btn"
                            title="Duplicate question"
                          >
                            📋
                          </button>
                          {section.questions.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeQuestion(sectionIndex, questionIndex);
                              }}
                              className="remove-question-btn"
                              title="Remove question"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="add-question-section">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            addQuestion(sectionIndex, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="question-type-select"
                      >
                        <option value="">+ Add Question</option>
                        <option value={QUESTION_TYPES.SINGLE_CHOICE}>Single Choice</option>
                        <option value={QUESTION_TYPES.MULTI_CHOICE}>Multiple Choice</option>
                        <option value={QUESTION_TYPES.SHORT_TEXT}>Short Text</option>
                        <option value={QUESTION_TYPES.LONG_TEXT}>Long Text</option>
                        <option value={QUESTION_TYPES.NUMERIC_RANGE}>Numeric Range</option>
                        <option value={QUESTION_TYPES.FILE_UPLOAD}>File Upload</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="builder-main">
          {showPreview ? (
            <LivePreview assessment={assessment} />
          ) : (
            activeQuestionData && (
              <QuestionEditor
                question={activeQuestionData.question}
                sectionIndex={activeQuestionData.sectionIndex}
                questionIndex={activeQuestionData.questionIndex}
                onUpdate={(updates) => updateQuestion(
                  activeQuestionData.sectionIndex,
                  activeQuestionData.questionIndex,
                  updates
                )}
                allQuestions={assessment.sections.flatMap(section => section.questions)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentBuilder;

