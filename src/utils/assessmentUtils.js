// Assessment utility functions

export const QUESTION_TYPES = {
  SINGLE_CHOICE: 'single-choice',
  MULTI_CHOICE: 'multi-choice',
  SHORT_TEXT: 'short-text',
  LONG_TEXT: 'long-text',
  NUMERIC_RANGE: 'numeric-range',
  FILE_UPLOAD: 'file-upload'
};

export const CONDITIONAL_OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not-equals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not-contains',
  GREATER_THAN: 'greater-than',
  LESS_THAN: 'less-than',
  GREATER_THAN_EQUAL: 'greater-than-equal',
  LESS_THAN_EQUAL: 'less-than-equal'
};

export const createEmptyQuestion = (type) => {
  const baseQuestion = {
    id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    question: '',
    required: false,
    points: 10,
    conditional: null
  };

  switch (type) {
    case QUESTION_TYPES.SINGLE_CHOICE:
      return {
        ...baseQuestion,
        options: [
          { id: 'opt1', text: 'Option 1', value: 'option1' },
          { id: 'opt2', text: 'Option 2', value: 'option2' }
        ],
        correctAnswer: null
      };

    case QUESTION_TYPES.MULTI_CHOICE:
      return {
        ...baseQuestion,
        options: [
          { id: 'opt1', text: 'Option 1', value: 'option1' },
          { id: 'opt2', text: 'Option 2', value: 'option2' }
        ],
        correctAnswers: []
      };

    case QUESTION_TYPES.SHORT_TEXT:
      return {
        ...baseQuestion,
        placeholder: 'Enter your answer here...',
        maxLength: 200
      };

    case QUESTION_TYPES.LONG_TEXT:
      return {
        ...baseQuestion,
        placeholder: 'Enter your detailed answer here...',
        maxLength: 1000
      };

    case QUESTION_TYPES.NUMERIC_RANGE:
      return {
        ...baseQuestion,
        min: 0,
        max: 100,
        step: 1,
        unit: ''
      };

    case QUESTION_TYPES.FILE_UPLOAD:
      return {
        ...baseQuestion,
        acceptedTypes: ['.pdf', '.doc', '.docx'],
        maxSize: 5 // MB
      };

    default:
      return baseQuestion;
  }
};

export const createEmptySection = () => ({
  id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  title: 'New Section',
  description: '',
  questions: []
});

export const createEmptyAssessment = (jobId) => ({
  jobId,
  title: 'New Assessment',
  description: '',
  sections: [createEmptySection()],
  timeLimit: 60, // minutes
  passingScore: 70, // percentage
  isActive: true
});

export const validateAssessment = (assessment) => {
  const errors = [];

  if (!assessment.title || assessment.title.trim() === '') {
    errors.push('Assessment title is required');
  }

  if (!assessment.sections || assessment.sections.length === 0) {
    errors.push('Assessment must have at least one section');
  }

  assessment.sections?.forEach((section, sectionIndex) => {
    if (!section.title || section.title.trim() === '') {
      errors.push(`Section ${sectionIndex + 1} title is required`);
    }

    if (!section.questions || section.questions.length === 0) {
      errors.push(`Section "${section.title}" must have at least one question`);
    }

    section.questions?.forEach((question, questionIndex) => {
      if (!question.question || question.question.trim() === '') {
        errors.push(`Question ${questionIndex + 1} in section "${section.title}" is required`);
      }

      // Type-specific validation
      switch (question.type) {
        case QUESTION_TYPES.SINGLE_CHOICE:
        case QUESTION_TYPES.MULTI_CHOICE:
          if (!question.options || question.options.length < 2) {
            errors.push(`Question "${question.question}" must have at least 2 options`);
          }
          break;

        case QUESTION_TYPES.SHORT_TEXT:
        case QUESTION_TYPES.LONG_TEXT:
          if (question.maxLength && question.maxLength < 1) {
            errors.push(`Question "${question.question}" max length must be greater than 0`);
          }
          break;

        case QUESTION_TYPES.NUMERIC_RANGE:
          if (question.min >= question.max) {
            errors.push(`Question "${question.question}" min value must be less than max value`);
          }
          break;

        case QUESTION_TYPES.FILE_UPLOAD:
          if (!question.acceptedTypes || question.acceptedTypes.length === 0) {
            errors.push(`Question "${question.question}" must specify accepted file types`);
          }
          if (!question.maxSize || question.maxSize <= 0) {
            errors.push(`Question "${question.question}" must specify a valid max file size`);
          }
          break;
        
        default:
          // No specific validation for other question types
          break;
      }
    });
  });

  return errors;
};

export const calculateAssessmentStats = (assessment, responses) => {
  const totalQuestions = assessment.sections.reduce((total, section) => total + section.questions.length, 0);
  const totalPoints = assessment.sections.reduce((total, section) => 
    total + section.questions.reduce((sectionTotal, question) => sectionTotal + (question.points || 0), 0), 0
  );

  const completedResponses = responses.filter(response => response.status === 'completed');
  const averageScore = completedResponses.length > 0 
    ? completedResponses.reduce((sum, response) => sum + (response.score || 0), 0) / completedResponses.length 
    : 0;

  const passedResponses = completedResponses.filter(response => 
    (response.score / response.maxScore) * 100 >= assessment.passingScore
  );

  return {
    totalQuestions,
    totalPoints,
    totalResponses: responses.length,
    completedResponses: completedResponses.length,
    inProgressResponses: responses.filter(response => response.status === 'in-progress').length,
    averageScore: Math.round(averageScore * 100) / 100,
    passRate: completedResponses.length > 0 ? (passedResponses.length / completedResponses.length) * 100 : 0,
    averageTimeSpent: completedResponses.length > 0 
      ? completedResponses.reduce((sum, response) => sum + (response.timeSpent || 0), 0) / completedResponses.length 
      : 0
  };
};

export const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const getQuestionTypeLabel = (type) => {
  const labels = {
    [QUESTION_TYPES.SINGLE_CHOICE]: 'Single Choice',
    [QUESTION_TYPES.MULTI_CHOICE]: 'Multiple Choice',
    [QUESTION_TYPES.SHORT_TEXT]: 'Short Text',
    [QUESTION_TYPES.LONG_TEXT]: 'Long Text',
    [QUESTION_TYPES.NUMERIC_RANGE]: 'Numeric Range',
    [QUESTION_TYPES.FILE_UPLOAD]: 'File Upload'
  };
  return labels[type] || type;
};

export const getConditionalOperatorLabel = (operator) => {
  const labels = {
    [CONDITIONAL_OPERATORS.EQUALS]: 'equals',
    [CONDITIONAL_OPERATORS.NOT_EQUALS]: 'does not equal',
    [CONDITIONAL_OPERATORS.CONTAINS]: 'contains',
    [CONDITIONAL_OPERATORS.NOT_CONTAINS]: 'does not contain',
    [CONDITIONAL_OPERATORS.GREATER_THAN]: 'is greater than',
    [CONDITIONAL_OPERATORS.LESS_THAN]: 'is less than',
    [CONDITIONAL_OPERATORS.GREATER_THAN_EQUAL]: 'is greater than or equal to',
    [CONDITIONAL_OPERATORS.LESS_THAN_EQUAL]: 'is less than or equal to'
  };
  return labels[operator] || operator;
};

// Function to get visible questions based on conditional logic
export const getVisibleQuestions = (assessment, responses) => {
  if (!assessment || !assessment.sections) return [];
  
  // Flatten all questions from all sections
  const allQuestions = assessment.sections.flatMap(section => section.questions || []);
  
  // Filter questions based on conditional logic (only equals)
  return allQuestions.filter(question => {
    // If no conditional logic, always show
    if (!question.conditional) return true;
    
    // Get the question this depends on
    const dependsOnQuestion = allQuestions.find(q => q.id === question.conditional.dependsOn);
    if (!dependsOnQuestion) return true;
    
    // Get the answer to the dependent question
    const dependentAnswer = responses[dependsOnQuestion.id];
    if (dependentAnswer === undefined || dependentAnswer === null) return false;
    
    // Evaluate the condition (only equals)
    return dependentAnswer === question.conditional.value;
  });
};

export const exportAssessmentData = (assessment, responses) => {
  const stats = calculateAssessmentStats(assessment, responses);
  
  return {
    assessment: {
      id: assessment.id,
      title: assessment.title,
      description: assessment.description,
      createdAt: assessment.createdAt,
      stats
    },
    responses: responses.map(response => ({
      id: response.id,
      candidateId: response.candidateId,
      startedAt: response.startedAt,
      submittedAt: response.submittedAt,
      score: response.score,
      maxScore: response.maxScore,
      status: response.status,
      timeSpent: response.timeSpent,
      responses: response.responses
    }))
  };
};

export const importAssessmentData = (data) => {
  // Validate imported data structure
  if (!data.assessment || !data.assessment.title) {
    throw new Error('Invalid assessment data: missing title');
  }
  
  if (!data.assessment.sections || !Array.isArray(data.assessment.sections)) {
    throw new Error('Invalid assessment data: missing sections');
  }
  
  // Create new assessment with imported data
  const assessment = {
    ...createEmptyAssessment(),
    ...data.assessment,
    id: `assessment-${Date.now()}`, // Generate new ID
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return assessment;
};
