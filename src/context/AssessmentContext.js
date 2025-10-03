import React, { createContext, useContext, useState, useEffect } from 'react';
import { seedAssessments } from '../data/seedAssessments';
import { getVisibleQuestions } from '../utils/assessmentUtils';

const AssessmentContext = createContext();

export const useAssessmentContext = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessmentContext must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider = ({ children }) => {
  const [assessments, setAssessments] = useState([]);
  const [candidateResponses, setCandidateResponses] = useState([]);

  // Initialize with seed data and load from localStorage
  useEffect(() => {
    try {
      // Load existing assessments from localStorage
      const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      
      // Use seed assessments if no saved assessments
      const assessmentsToUse = savedAssessments.length > 0 ? savedAssessments : seedAssessments;
      
      // Load existing assessment responses from localStorage
      const savedResponses = JSON.parse(localStorage.getItem('assessmentResponses') || '[]');
      
      setAssessments(assessmentsToUse);
      setCandidateResponses(savedResponses);
      
      // Save seed assessments to localStorage if not already there
      if (savedAssessments.length === 0) {
        localStorage.setItem('assessments', JSON.stringify(seedAssessments));
      }
    } catch (error) {
      console.error('Error loading assessment data:', error);
      setAssessments(seedAssessments);
      setCandidateResponses([]);
    }
  }, []);

  // Polling for real-time updates
  useEffect(() => {
    const pollInterval = setInterval(() => {
      try {
        // Poll for assessments updates
        const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
        if (JSON.stringify(savedAssessments) !== JSON.stringify(assessments)) {
          setAssessments(savedAssessments);
        }
        
        // Poll for responses updates
        const savedResponses = JSON.parse(localStorage.getItem('assessmentResponses') || '[]');
        if (JSON.stringify(savedResponses) !== JSON.stringify(candidateResponses)) {
          setCandidateResponses(savedResponses);
        }
      } catch (error) {
        console.error('Error polling for updates:', error);
      }
    }, 8000); // Poll every 8 seconds

    return () => clearInterval(pollInterval);
  }, [assessments, candidateResponses]);

  // Create new assessment
  const createAssessment = (assessmentData) => {
    const newAssessment = {
      ...assessmentData,
      id: `assessment-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };
    
    const updatedAssessments = [...assessments, newAssessment];
    setAssessments(updatedAssessments);
    
    // Save to localStorage
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
    
    return newAssessment;
  };

  // Update assessment
  const updateAssessment = (assessmentId, updatedData) => {
    const updatedAssessments = assessments.map(assessment => 
      assessment.id === assessmentId 
        ? { ...assessment, ...updatedData, updatedAt: new Date().toISOString() }
        : assessment
    );
    
    setAssessments(updatedAssessments);
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
  };

  // Delete assessment
  const deleteAssessment = (assessmentId) => {
    const updatedAssessments = assessments.filter(assessment => assessment.id !== assessmentId);
    setAssessments(updatedAssessments);
    localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
  };

  // Get assessments by job ID
  const getAssessmentsByJob = (jobId) => {
    console.log('getAssessmentsByJob called with jobId:', jobId);
    console.log('All assessments:', assessments);
    
    const filtered = assessments.filter(assessment => {
      // Check if jobId matches exactly
      if (assessment.jobId === jobId) {
        console.log('Found exact jobId match:', assessment);
        return true;
      }
      
      // Check if jobId falls within the assessment's range
      if (assessment.id === 'assessment-1' && jobId >= 1 && jobId <= 8) {
        console.log('Found range match for assessment-1:', assessment);
        return true;
      }
      if (assessment.id === 'assessment-2' && jobId >= 9 && jobId <= 16) {
        console.log('Found range match for assessment-2:', assessment);
        return true;
      }
      if (assessment.id === 'assessment-3' && jobId >= 17 && jobId <= 25) {
        console.log('Found range match for assessment-3:', assessment);
        return true;
      }
      
      return false;
    });
    
    console.log('Filtered assessments for jobId', jobId, ':', filtered);
    return filtered;
  };

  // Get assessment by ID
  const getAssessmentById = (id) => {
    return assessments.find(assessment => assessment.id === id);
  };

  // Start assessment for candidate
  const startAssessment = (assessmentId, candidateId) => {
    const responseId = `response-${Date.now()}`;
    const newResponse = {
      id: responseId,
      assessmentId,
      candidateId,
      startedAt: new Date().toISOString(),
      status: 'in-progress',
      responses: {},
      score: 0
    };
    
    const updatedResponses = [...candidateResponses, newResponse];
    setCandidateResponses(updatedResponses);
    localStorage.setItem('assessmentResponses', JSON.stringify(updatedResponses));
    
    return newResponse;
  };

  // Update response
  const updateResponse = (responseId, questionId, answer) => {
    const updatedResponses = candidateResponses.map(response => 
      response.id === responseId 
        ? { ...response, responses: { ...response.responses, [questionId]: answer } }
        : response
    );
    
    setCandidateResponses(updatedResponses);
    localStorage.setItem('assessmentResponses', JSON.stringify(updatedResponses));
  };

  // Submit assessment response
  const submitAssessmentResponse = (responseId) => {
    const updatedResponses = candidateResponses.map(response => 
      response.id === responseId 
        ? { 
            ...response, 
            status: 'completed',
            completedAt: new Date().toISOString()
          }
        : response
    );
    
    setCandidateResponses(updatedResponses);
    localStorage.setItem('assessmentResponses', JSON.stringify(updatedResponses));
  };

  // Score assessment response
  const scoreAssessmentResponse = (responseId, score, feedback = '') => {
    const updatedResponses = candidateResponses.map(response => 
      response.id === responseId 
        ? { 
            ...response, 
            score,
            feedback,
            scoredAt: new Date().toISOString()
          }
        : response
    );
    
    setCandidateResponses(updatedResponses);
    localStorage.setItem('assessmentResponses', JSON.stringify(updatedResponses));
  };

  // Validate question response
  const validateQuestion = (question, answer) => {
    if (question.required && (!answer || answer.trim() === '')) {
      return { isValid: false, error: 'This question is required' };
    }

    switch (question.type) {
      case 'single-choice':
        return { isValid: true };
      case 'multi-choice':
        return { isValid: Array.isArray(answer) && answer.length > 0 };
      case 'short-text':
        if (answer && answer.length > (question.maxLength || 200)) {
          return { isValid: false, error: `Answer exceeds maximum length of ${question.maxLength || 200} characters` };
        }
        return { isValid: true };
      case 'long-text':
        if (answer && answer.length > (question.maxLength || 500)) {
          return { isValid: false, error: `Answer exceeds maximum length of ${question.maxLength || 500} characters` };
        }
        return { isValid: true };
      case 'numeric-range':
        const num = parseFloat(answer);
        if (isNaN(num) || num < question.min || num > question.max) {
          return { isValid: false, error: `Please enter a number between ${question.min} and ${question.max}` };
        }
        return { isValid: true };
      default:
        return { isValid: true };
    }
  };

  // Validate response for LivePreview
  const validateResponse = (question, response) => {
    const validation = validateQuestion(question, response);
    return validation.isValid ? [] : [validation.error];
  };

  // Calculate assessment score
  const calculateAssessmentScore = (assessment, responses) => {
    let totalScore = 0;
    let maxScore = 0;

    assessment.sections.forEach(section => {
      section.questions.forEach(question => {
        maxScore += question.points;
        const answer = responses[question.id];
        
        if (answer) {
          switch (question.type) {
            case 'single-choice':
              if (answer === question.correctAnswer) {
                totalScore += question.points;
              }
              break;
            case 'multi-choice':
              if (Array.isArray(answer) && answer.includes(question.correctAnswer)) {
                totalScore += question.points;
              }
              break;
            case 'short-text':
            case 'long-text':
              // For text questions, give partial credit based on length and content
              const wordCount = answer.split(' ').length;
              const minWords = question.type === 'short-text' ? 10 : 25;
              if (wordCount >= minWords) {
                totalScore += question.points * 0.8; // 80% for meeting word count
              }
              break;
            case 'numeric-range':
              const num = parseFloat(answer);
              if (!isNaN(num) && num >= question.min && num <= question.max) {
                totalScore += question.points;
              }
              break;
            default:
              totalScore += question.points * 0.5; // Default partial credit
          }
        }
      });
    });

    return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  };

  const value = {
    assessments,
    candidateResponses,
    createAssessment,
    updateAssessment,
    deleteAssessment,
    getAssessmentsByJob,
    getAssessmentById,
    startAssessment,
    updateResponse,
    submitAssessmentResponse,
    scoreAssessmentResponse,
    validateQuestion,
    calculateAssessmentScore,
    getVisibleQuestions,
    validateResponse
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};