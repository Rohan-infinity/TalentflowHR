// Utility to generate 1000 candidates and assessment responses
// This generates realistic data programmatically but stores it as static data

import { seedJobs } from './seedJobs.js';
import { seedAssessments } from './seedAssessments.js';

// Sample data for generating realistic candidates
const firstNames = [
  'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Christopher', 'Ashley', 'Matthew', 'Amanda', 'Joshua',
  'Jennifer', 'Daniel', 'Michelle', 'Andrew', 'Lisa', 'James', 'Kimberly', 'Ryan', 'Nicole', 'John',
  'Stephanie', 'Robert', 'Angela', 'Kevin', 'Helen', 'Brian', 'Nancy', 'William', 'Karen', 'Thomas',
  'Betty', 'Charles', 'Dorothy', 'Joseph', 'Sandra', 'Richard', 'Donna', 'Kenneth', 'Carol', 'Steven',
  'Ruth', 'Paul', 'Sharon', 'Mark', 'Michelle', 'Donald', 'Laura', 'George', 'Sarah', 'Edward',
  'Kimberly', 'Ronald', 'Deborah', 'Timothy', 'Dorothy', 'Jason', 'Lisa', 'Jeffrey', 'Nancy', 'Ryan',
  'Karen', 'Jacob', 'Betty', 'Gary', 'Helen', 'Nicholas', 'Sandra', 'Eric', 'Donna', 'Jonathan',
  'Ruth', 'Stephen', 'Sharon', 'Larry', 'Michelle', 'Justin', 'Laura', 'Scott', 'Sarah', 'Brandon',
  'Kimberly', 'Benjamin', 'Deborah', 'Samuel', 'Dorothy', 'Gregory', 'Lisa', 'Alexander', 'Nancy', 'Patrick'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes'
];

const cities = [
  'San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio',
  'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte',
  'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Oklahoma City',
  'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson',
  'Fresno', 'Sacramento', 'Mesa', 'Kansas City', 'Atlanta', 'Omaha', 'Colorado Springs', 'Raleigh',
  'Miami', 'Virginia Beach', 'Oakland', 'Minneapolis', 'Tulsa', 'Arlington', 'Tampa', 'New Orleans'
];

const skills = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'TypeScript', 'Angular', 'Vue.js', 'CSS', 'HTML',
  'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'Project Management',
  'Data Analysis', 'Machine Learning', 'UI/UX Design', 'Figma', 'Photoshop', 'Marketing', 'Sales', 'Customer Service',
  'Leadership', 'Communication', 'Problem Solving', 'Analytics', 'Excel', 'PowerPoint', 'Word', 'Google Suite',
  'Linux', 'Windows', 'macOS', 'iOS', 'Android', 'REST APIs', 'GraphQL', 'Microservices', 'DevOps', 'CI/CD'
];

const statuses = ['Applied', 'Under Review', 'Interview Scheduled', 'Hired', 'Rejected'];
const experienceLevels = ['1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8+ years'];

// Generate random candidate data
export const generateCandidates = () => {
  const candidates = [];
  let candidateId = 1;
  
  // Assessment distribution: Jobs 1-8 → Assessment 1, Jobs 9-16 → Assessment 2, Jobs 17-25 → Assessment 3
  const assessmentMapping = {
    1: 'assessment-1', 2: 'assessment-1', 3: 'assessment-1', 4: 'assessment-1', 5: 'assessment-1', 6: 'assessment-1', 7: 'assessment-1', 8: 'assessment-1',
    9: 'assessment-2', 10: 'assessment-2', 11: 'assessment-2', 12: 'assessment-2', 13: 'assessment-2', 14: 'assessment-2', 15: 'assessment-2', 16: 'assessment-2',
    17: 'assessment-3', 18: 'assessment-3', 19: 'assessment-3', 20: 'assessment-3', 21: 'assessment-3', 22: 'assessment-3', 23: 'assessment-3', 24: 'assessment-3', 25: 'assessment-3'
  };
  
  // Candidate distribution per job (realistic distribution)
  const candidatesPerJob = {
    1: 60, 2: 45, 3: 50, 4: 55, 5: 40, 6: 35, 7: 45, 8: 30, 9: 50, 10: 40,
    11: 35, 12: 45, 13: 40, 14: 30, 15: 25, 16: 35, 17: 40, 18: 30, 19: 35, 20: 25,
    21: 30, 22: 35, 23: 30, 24: 25, 25: 30
  };
  
  seedJobs.forEach(job => {
    const jobId = job.id;
    const numCandidates = candidatesPerJob[jobId] || 30;
    const assessmentId = assessmentMapping[jobId];
    
    for (let i = 0; i < numCandidates; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const experience = experienceLevels[Math.floor(Math.random() * experienceLevels.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Generate random skills (3-6 skills)
      const numSkills = Math.floor(Math.random() * 4) + 3;
      const candidateSkills = [];
      for (let j = 0; j < numSkills; j++) {
        const skill = skills[Math.floor(Math.random() * skills.length)];
        if (!candidateSkills.includes(skill)) {
          candidateSkills.push(skill);
        }
      }
      
      // Generate applied date (within last 3 months)
      const appliedDate = new Date();
      appliedDate.setDate(appliedDate.getDate() - Math.floor(Math.random() * 90));
      const formattedDate = appliedDate.toLocaleDateString('en-GB');
      
      const candidate = {
        id: candidateId++,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        phone: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        location: `${city}, CA`,
        position: job.title,
        experience: experience,
        skills: candidateSkills,
        status: status,
        appliedDate: formattedDate,
        jobId: jobId,
        jobTitle: job.title,
        city: city,
        statusHistory: [
          {
            status: 'Applied',
            date: formattedDate,
            timestamp: appliedDate.toISOString(),
            note: 'Application submitted'
          }
        ]
      };
      
      // 50% of candidates have completed assessments
      if (Math.random() < 0.5 && assessmentId) {
        candidate.assignmentAnswers = generateAssessmentResponse(assessmentId);
        candidate.averageMarks = candidate.assignmentAnswers[assessmentId].score;
      }
      
      candidates.push(candidate);
    }
  });
  
  return candidates;
};

// Generate assessment responses
const generateAssessmentResponse = (assessmentId) => {
  const assessment = seedAssessments.find(a => a.id === assessmentId);
  if (!assessment) return {};
  
  const responses = {};
  let totalScore = 0;
  let maxScore = 0;
  
  assessment.sections.forEach(section => {
    section.questions.forEach(question => {
      maxScore += question.points;
      
      switch (question.type) {
        case 'single-choice':
          const randomOption = question.options[Math.floor(Math.random() * question.options.length)];
          responses[question.id] = randomOption.value;
          if (randomOption.value === question.correctAnswer) {
            totalScore += question.points;
          }
          break;
        case 'short-text':
          responses[question.id] = generateShortTextResponse(question.id);
          totalScore += Math.floor(Math.random() * question.points * 0.8) + (question.points * 0.2);
          break;
        case 'long-text':
          responses[question.id] = generateLongTextResponse(question.id);
          totalScore += Math.floor(Math.random() * question.points * 0.8) + (question.points * 0.2);
          break;
        default:
          // Handle other question types
          responses[question.id] = 'No response';
          totalScore += question.points * 0.5; // Partial credit
          break;
      }
    });
  });
  
  const score = Math.round((totalScore / maxScore) * 100);
  const completedAt = new Date();
  completedAt.setDate(completedAt.getDate() - Math.floor(Math.random() * 30));
  
  return {
    [assessmentId]: {
      responses: responses,
      score: score,
      completedAt: completedAt.toISOString()
    }
  };
};

// Generate short text responses
const generateShortTextResponse = (questionId) => {
  const responses = {
    'q2': 'I solved a complex technical challenge by breaking it down into smaller components and tackling each one systematically.',
    'q6': 'I had to communicate a project delay to stakeholders by focusing on solutions and next steps rather than just problems.',
    'q10': 'I learned a new framework by building a small project and following online tutorials and documentation.'
  };
  return responses[questionId] || 'I handled this situation by analyzing the problem, considering multiple approaches, and implementing the best solution.';
};

// Generate long text responses
const generateLongTextResponse = (questionId) => {
  const responses = {
    'q4': 'My decision-making process involves gathering all relevant information, analyzing the pros and cons of each option, consulting with key stakeholders when appropriate, and making decisions based on data and potential impact. I also consider long-term consequences and ensure alignment with organizational goals.',
    'q8': 'I have extensive experience working in diverse teams across different cultures and time zones. I focus on inclusive communication, respect for different perspectives, and leveraging each team member\'s unique strengths. Regular check-ins and clear documentation help ensure everyone stays aligned.',
    'q12': 'My learning approach is structured and hands-on. I start with fundamentals through courses or documentation, then immediately apply knowledge through small projects. I seek feedback from experts, iterate quickly, and gradually increase complexity. I also maintain a learning journal to track progress.'
  };
  return responses[questionId] || 'This is an important aspect of my professional approach that I continuously work to improve through experience, feedback, and learning.';
};

// Export the generated candidates (this would be called once to generate the data)
export const generatedCandidates = generateCandidates();
