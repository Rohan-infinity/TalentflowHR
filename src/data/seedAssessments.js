// Seed data for 3 generic assessments with 10+ questions each

export const seedAssessments = [
  {
    id: 'assessment-1',
    jobId: 1, // Associated with jobs 1-8
    title: 'General Skills Assessment',
    description: 'A comprehensive assessment covering problem-solving, communication, and technical skills.',
    sections: [
      {
        id: 'section-1',
        title: 'Problem Solving & Critical Thinking',
        questions: [
          {
            id: 'q1',
            type: 'single-choice',
            question: 'How do you approach solving complex problems?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Break them down into smaller parts', value: 'break-down' },
              { id: 'opt2', text: 'Research similar problems first', value: 'research' },
              { id: 'opt3', text: 'Ask for help immediately', value: 'ask-help' },
              { id: 'opt4', text: 'Try multiple solutions simultaneously', value: 'multiple' }
            ],
            correctAnswer: 'break-down',
            conditional: null
          },
          {
            id: 'q2',
            type: 'short-text',
            question: 'Describe a time when you had to think outside the box to solve a problem.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'Describe your experience in 2-3 sentences...',
            conditional: null
          },
          {
            id: 'q3',
            type: 'single-choice',
            question: 'Rate your analytical thinking skills:',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Excellent - I excel at analyzing complex data', value: 'excellent' },
              { id: 'opt2', text: 'Good - I can analyze most situations well', value: 'good' },
              { id: 'opt3', text: 'Average - I can handle basic analysis', value: 'average' },
              { id: 'opt4', text: 'Developing - I need more practice', value: 'developing' }
            ],
            correctAnswer: 'good',
            conditional: null
          },
          {
            id: 'q4',
            type: 'long-text',
            question: 'Explain your decision-making process when faced with multiple options.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'Describe your approach to making important decisions...',
            conditional: null
          }
        ]
      },
      {
        id: 'section-2',
        title: 'Communication & Teamwork',
        questions: [
          {
            id: 'q5',
            type: 'single-choice',
            question: 'What is your preferred communication style?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Direct and to the point', value: 'direct' },
              { id: 'opt2', text: 'Detailed and comprehensive', value: 'detailed' },
              { id: 'opt3', text: 'Collaborative and inclusive', value: 'collaborative' },
              { id: 'opt4', text: 'Visual and demonstrative', value: 'visual' }
            ],
            correctAnswer: 'collaborative',
            conditional: null
          },
          {
            id: 'q6',
            type: 'short-text',
            question: 'Describe a situation where you had to communicate difficult information.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'How did you handle the situation?',
            conditional: null
          },
          {
            id: 'q7',
            type: 'single-choice',
            question: 'How do you handle conflicts in a team setting?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Address them directly and immediately', value: 'direct' },
              { id: 'opt2', text: 'Facilitate discussion between parties', value: 'facilitate' },
              { id: 'opt3', text: 'Seek mediation from a supervisor', value: 'mediation' },
              { id: 'opt4', text: 'Avoid confrontation when possible', value: 'avoid' }
            ],
            correctAnswer: 'facilitate',
            conditional: null
          },
          {
            id: 'q8',
            type: 'long-text',
            question: 'Describe your experience working in diverse teams.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'Share examples of successful collaboration...',
            conditional: null
          }
        ]
      },
      {
        id: 'section-3',
        title: 'Technical & Learning',
        questions: [
          {
            id: 'q9',
            type: 'single-choice',
            question: 'How do you stay updated with new technologies?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Online courses and tutorials', value: 'courses' },
              { id: 'opt2', text: 'Industry blogs and publications', value: 'blogs' },
              { id: 'opt3', text: 'Hands-on experimentation', value: 'experiment' },
              { id: 'opt4', text: 'Professional conferences and networking', value: 'conferences' }
            ],
            correctAnswer: 'courses',
            conditional: null
          },
          {
            id: 'q10',
            type: 'short-text',
            question: 'Describe a technical challenge you recently overcame.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'What was the challenge and how did you solve it?',
            conditional: null
          },
          {
            id: 'q11',
            type: 'single-choice',
            question: 'Rate your adaptability to new technologies:',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Very High - I quickly master new tools', value: 'very-high' },
              { id: 'opt2', text: 'High - I learn new technologies well', value: 'high' },
              { id: 'opt3', text: 'Moderate - I need time to learn', value: 'moderate' },
              { id: 'opt4', text: 'Low - I prefer familiar technologies', value: 'low' }
            ],
            correctAnswer: 'high',
            conditional: null
          },
          {
            id: 'q12',
            type: 'long-text',
            question: 'Explain your approach to learning new skills or technologies.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'Describe your learning methodology...',
            conditional: null
          }
        ]
      }
    ],
    totalQuestions: 12,
    totalPoints: 160,
    estimatedTime: '20-30 minutes'
  },
  {
    id: 'assessment-2',
    jobId: 9, // Associated with jobs 9-16
    title: 'Professional Competency Assessment',
    description: 'An assessment focusing on professional skills, leadership, and work ethics.',
    sections: [
      {
        id: 'section-1',
        title: 'Leadership & Management',
        questions: [
          {
            id: 'q1',
            type: 'single-choice',
            question: 'What leadership style best describes you?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Democratic - I involve team in decisions', value: 'democratic' },
              { id: 'opt2', text: 'Autocratic - I make decisions independently', value: 'autocratic' },
              { id: 'opt3', text: 'Transformational - I inspire and motivate', value: 'transformational' },
              { id: 'opt4', text: 'Servant - I focus on team development', value: 'servant' }
            ],
            correctAnswer: 'democratic',
            conditional: null
          },
          {
            id: 'q2',
            type: 'short-text',
            question: 'Describe a time when you had to lead a project without formal authority.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'How did you influence others?',
            conditional: null
          },
          {
            id: 'q3',
            type: 'single-choice',
            question: 'How do you handle underperforming team members?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Provide immediate feedback and support', value: 'immediate' },
              { id: 'opt2', text: 'Set clear expectations and deadlines', value: 'expectations' },
              { id: 'opt3', text: 'Offer additional training and resources', value: 'training' },
              { id: 'opt4', text: 'Escalate to higher management', value: 'escalate' }
            ],
            correctAnswer: 'immediate',
            conditional: null
          },
          {
            id: 'q4',
            type: 'long-text',
            question: 'Describe your approach to building and maintaining team morale.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'Share your strategies for team motivation...',
            conditional: null
          }
        ]
      },
      {
        id: 'section-2',
        title: 'Work Ethics & Values',
        questions: [
          {
            id: 'q5',
            type: 'single-choice',
            question: 'How do you prioritize multiple competing deadlines?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'By urgency and importance', value: 'urgency' },
              { id: 'opt2', text: 'By client impact', value: 'client' },
              { id: 'opt3', text: 'By team dependencies', value: 'dependencies' },
              { id: 'opt4', text: 'By personal interest', value: 'interest' }
            ],
            correctAnswer: 'urgency',
            conditional: null
          },
          {
            id: 'q6',
            type: 'short-text',
            question: 'Describe a situation where you had to make an ethical decision.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'What was the situation and your decision?',
            conditional: null
          },
          {
            id: 'q7',
            type: 'single-choice',
            question: 'How do you handle work-life balance?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Strict boundaries between work and personal time', value: 'strict' },
              { id: 'opt2', text: 'Flexible approach based on priorities', value: 'flexible' },
              { id: 'opt3', text: 'Work takes priority when needed', value: 'work-priority' },
              { id: 'opt4', text: 'Personal time is always protected', value: 'personal-priority' }
            ],
            correctAnswer: 'flexible',
            conditional: null
          },
          {
            id: 'q8',
            type: 'long-text',
            question: 'Explain your approach to continuous professional development.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'How do you stay current in your field?',
            conditional: null
          }
        ]
      },
      {
        id: 'section-3',
        title: 'Adaptability & Innovation',
        questions: [
          {
            id: 'q9',
            type: 'single-choice',
            question: 'How do you handle unexpected changes in project scope?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Quickly reassess and adjust plans', value: 'reassess' },
              { id: 'opt2', text: 'Negotiate new timelines', value: 'negotiate' },
              { id: 'opt3', text: 'Seek additional resources', value: 'resources' },
              { id: 'opt4', text: 'Communicate impact to stakeholders', value: 'communicate' }
            ],
            correctAnswer: 'reassess',
            conditional: null
          },
          {
            id: 'q10',
            type: 'short-text',
            question: 'Describe a time when you had to learn something completely new quickly.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'What was the situation and how did you adapt?',
            conditional: null
          },
          {
            id: 'q11',
            type: 'single-choice',
            question: 'Rate your comfort with ambiguity:',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Very High - I thrive in uncertain situations', value: 'very-high' },
              { id: 'opt2', text: 'High - I can work with limited information', value: 'high' },
              { id: 'opt3', text: 'Moderate - I need some clarity', value: 'moderate' },
              { id: 'opt4', text: 'Low - I prefer clear instructions', value: 'low' }
            ],
            correctAnswer: 'high',
            conditional: null
          },
          {
            id: 'q12',
            type: 'long-text',
            question: 'Describe how you contribute to innovation in your work.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'Share examples of your innovative contributions...',
            conditional: null
          }
        ]
      }
    ],
    totalQuestions: 12,
    totalPoints: 160,
    estimatedTime: '20-30 minutes'
  },
  {
    id: 'assessment-3',
    jobId: 17, // Associated with jobs 17-25
    title: 'Cognitive & Behavioral Assessment',
    description: 'An assessment focusing on cognitive abilities, behavioral patterns, and personality traits.',
    sections: [
      {
        id: 'section-1',
        title: 'Cognitive Abilities',
        questions: [
          {
            id: 'q1',
            type: 'single-choice',
            question: 'How do you process and retain new information?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Visual - I learn best through diagrams and charts', value: 'visual' },
              { id: 'opt2', text: 'Auditory - I learn best through listening', value: 'auditory' },
              { id: 'opt3', text: 'Kinesthetic - I learn best through hands-on practice', value: 'kinesthetic' },
              { id: 'opt4', text: 'Reading/Writing - I learn best through text', value: 'reading' }
            ],
            correctAnswer: 'visual',
            conditional: null
          },
          {
            id: 'q2',
            type: 'short-text',
            question: 'Describe a complex concept you had to explain to someone with no background knowledge.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'How did you break it down?',
            conditional: null
          },
          {
            id: 'q3',
            type: 'single-choice',
            question: 'How do you approach learning from mistakes?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Analyze what went wrong and why', value: 'analyze' },
              { id: 'opt2', text: 'Seek feedback from others', value: 'feedback' },
              { id: 'opt3', text: 'Document lessons learned', value: 'document' },
              { id: 'opt4', text: 'Try a different approach immediately', value: 'different' }
            ],
            correctAnswer: 'analyze',
            conditional: null
          },
          {
            id: 'q4',
            type: 'long-text',
            question: 'Explain your thought process when analyzing data or information.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'Describe your analytical approach...',
            conditional: null
          }
        ]
      },
      {
        id: 'section-2',
        title: 'Behavioral Patterns',
        questions: [
          {
            id: 'q5',
            type: 'single-choice',
            question: 'How do you handle stress and pressure?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Take breaks and maintain perspective', value: 'breaks' },
              { id: 'opt2', text: 'Focus on what I can control', value: 'control' },
              { id: 'opt3', text: 'Seek support from colleagues', value: 'support' },
              { id: 'opt4', text: 'Work harder to meet deadlines', value: 'harder' }
            ],
            correctAnswer: 'control',
            conditional: null
          },
          {
            id: 'q6',
            type: 'short-text',
            question: 'Describe a time when you had to work under tight deadlines.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'How did you manage the pressure?',
            conditional: null
          },
          {
            id: 'q7',
            type: 'single-choice',
            question: 'What motivates you most in your work?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Recognition and appreciation', value: 'recognition' },
              { id: 'opt2', text: 'Challenging projects', value: 'challenges' },
              { id: 'opt3', text: 'Learning and growth opportunities', value: 'learning' },
              { id: 'opt4', text: 'Making a positive impact', value: 'impact' }
            ],
            correctAnswer: 'challenges',
            conditional: null
          },
          {
            id: 'q8',
            type: 'long-text',
            question: 'Describe your ideal work environment and what helps you perform best.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'What conditions enable your best work?',
            conditional: null
          }
        ]
      },
      {
        id: 'section-3',
        title: 'Personality & Values',
        questions: [
          {
            id: 'q9',
            type: 'single-choice',
            question: 'How do you prefer to receive feedback?',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Direct and honest', value: 'direct' },
              { id: 'opt2', text: 'Constructive and specific', value: 'constructive' },
              { id: 'opt3', text: 'Regular and ongoing', value: 'regular' },
              { id: 'opt4', text: 'Written and documented', value: 'written' }
            ],
            correctAnswer: 'constructive',
            conditional: null
          },
          {
            id: 'q10',
            type: 'short-text',
            question: 'Describe a time when you had to adapt your communication style.',
            required: true,
            points: 15,
            maxLength: 200,
            placeholder: 'What was the situation and how did you adapt?',
            conditional: null
          },
          {
            id: 'q11',
            type: 'single-choice',
            question: 'Rate your preference for collaboration vs. independent work:',
            required: true,
            points: 10,
            options: [
              { id: 'opt1', text: 'Strongly prefer collaboration', value: 'strong-collab' },
              { id: 'opt2', text: 'Prefer collaboration', value: 'collab' },
              { id: 'opt3', text: 'Balanced approach', value: 'balanced' },
              { id: 'opt4', text: 'Prefer independent work', value: 'independent' }
            ],
            correctAnswer: 'balanced',
            conditional: null
          },
          {
            id: 'q12',
            type: 'long-text',
            question: 'Explain what success means to you in your professional life.',
            required: true,
            points: 20,
            maxLength: 500,
            placeholder: 'How do you define and measure success?',
            conditional: null
          }
        ]
      }
    ],
    totalQuestions: 12,
    totalPoints: 160,
    estimatedTime: '20-30 minutes'
  }
];

// Helper function to get assessment by ID
export const getAssessmentById = (id) => {
  return seedAssessments.find(assessment => assessment.id === id);
};

// Helper function to get all assessments
export const getAllAssessments = () => seedAssessments;
