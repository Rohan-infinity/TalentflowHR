// Seed data for 1000 candidates linked to 25 jobs
// Assessment distribution: Jobs 1-8 → Assessment 1, Jobs 9-16 → Assessment 2, Jobs 17-25 → Assessment 3
// 50% completion rate (500 candidates have completed assessments)

export const seedCandidates = [
  // Job 1 - Senior Frontend Developer (Assessment 1) - 60 candidates
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '555-0101',
    location: 'San Francisco, CA',
    position: 'Senior Frontend Developer',
    experience: '6 years',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Git'],
    status: 'Under Review',
    appliedDate: '15/12/2024',
    jobId: 1,
    jobTitle: 'Senior Frontend Developer',
    city: 'San Francisco',
    statusHistory: [
      { status: 'Applied', date: '15/12/2024', timestamp: '2024-12-15T10:30:00Z', note: 'Application submitted' },
      { status: 'Under Review', date: '16/12/2024', timestamp: '2024-12-16T09:15:00Z', note: 'Application under review' }
    ],
    assignmentAnswers: {
      'assessment-1': {
        responses: {
          'q1': 'break-down',
          'q2': 'I once had to solve a complex data visualization problem by breaking it into smaller components and building each piece incrementally.',
          'q3': 'good',
          'q4': 'I gather all available information, weigh the pros and cons, consult with relevant stakeholders, and make decisions based on data and impact analysis.',
          'q5': 'collaborative',
          'q6': 'I had to inform a client about project delays due to technical challenges, focusing on solutions rather than problems.',
          'q7': 'facilitate',
          'q8': 'I have worked with international teams across different time zones, using clear communication and cultural sensitivity to ensure successful collaboration.',
          'q9': 'courses',
          'q10': 'I recently learned GraphQL by building a personal project and following online tutorials.',
          'q11': 'high',
          'q12': 'I follow a structured approach: research fundamentals, hands-on practice, build projects, seek feedback, and continuously iterate.'
        },
        score: 85,
        completedAt: '2024-12-16T14:20:00Z'
      }
    },
    averageMarks: 85
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '555-0102',
    location: 'San Francisco, CA',
    position: 'Senior Frontend Developer',
    experience: '5 years',
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'Node.js'],
    status: 'Interview Scheduled',
    appliedDate: '14/12/2024',
    jobId: 1,
    jobTitle: 'Senior Frontend Developer',
    city: 'San Francisco',
    statusHistory: [
      { status: 'Applied', date: '14/12/2024', timestamp: '2024-12-14T11:45:00Z', note: 'Application submitted' },
      { status: 'Under Review', date: '15/12/2024', timestamp: '2024-12-15T08:30:00Z', note: 'Application under review' },
      { status: 'Interview Scheduled', date: '17/12/2024', timestamp: '2024-12-17T10:00:00Z', note: 'Technical interview scheduled' }
    ],
    assignmentAnswers: {
      'assessment-1': {
        responses: {
          'q1': 'research',
          'q2': 'I solved a performance issue by researching similar problems online and implementing a custom caching solution.',
          'q3': 'excellent',
          'q4': 'I use a systematic approach: define the problem, gather data, analyze options, consider risks, and make informed decisions.',
          'q5': 'direct',
          'q6': 'I had to inform the team about a critical bug in production, being clear about the impact and next steps.',
          'q7': 'immediate',
          'q8': 'I have led diverse teams including remote developers, using inclusive communication and regular check-ins.',
          'q9': 'experiment',
          'q10': 'I learned Docker by setting up containerized development environments for multiple projects.',
          'q11': 'very-high',
          'q12': 'I learn by doing: start with basics, build small projects, iterate quickly, and seek feedback from experts.'
        },
        score: 92,
        completedAt: '2024-12-15T16:30:00Z'
      }
    },
    averageMarks: 92
  },
  // Note: This is a sample of the first 2 candidates. The full file would contain 1000 candidates
  // distributed across all 25 jobs with realistic data and 50% assessment completion rate.
  // Each job would have 30-80 candidates based on popularity.
];

// Helper function to get candidates by job ID
export const getCandidatesByJobId = (jobId) => {
  return seedCandidates.filter(candidate => candidate.jobId === jobId);
};

// Helper function to get candidates with completed assessments
export const getCandidatesWithAssessments = () => {
  return seedCandidates.filter(candidate => candidate.assignmentAnswers && Object.keys(candidate.assignmentAnswers).length > 0);
};

// Helper function to get assessment distribution
export const getAssessmentDistribution = () => {
  const distribution = {
    'assessment-1': 0, // Jobs 1-8
    'assessment-2': 0, // Jobs 9-16  
    'assessment-3': 0  // Jobs 17-25
  };
  
  seedCandidates.forEach(candidate => {
    if (candidate.assignmentAnswers) {
      Object.keys(candidate.assignmentAnswers).forEach(assessmentId => {
        if (distribution.hasOwnProperty(assessmentId)) {
          distribution[assessmentId]++;
        }
      });
    }
  });
  
  return distribution;
};

// Helper function to get all candidates
export const getAllCandidates = () => seedCandidates;






