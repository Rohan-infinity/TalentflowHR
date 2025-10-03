// Seed data for 25 jobs (mixed active/archived) as per project requirements

export const seedJobs = [
  // ACTIVE JOBS (15 jobs)
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    employmentType: 'Full Time',
    salary: { min: 120000, max: 180000 },
    description: 'We are looking for a Senior Frontend Developer to join our engineering team. You will be responsible for building user-facing features and ensuring the best user experience.',
    requirements: [
      '5+ years of experience with React, Vue, or Angular',
      'Strong knowledge of JavaScript, HTML, CSS',
      'Experience with modern frontend build tools',
      'Understanding of responsive design principles',
      'Experience with version control systems (Git)'
    ],
    perks: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Professional development budget',
      '401(k) matching'
    ],
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
    postedDate: '15/12/2024',
    applicants: 12,
    status: 'active',
    archived: false,
    slug: 'senior-frontend-developer'
  },
  {
    id: 2,
    title: 'UX Designer',
    department: 'Design',
    location: 'Austin, TX',
    employmentType: 'Full Time',
    salary: { min: 85000, max: 120000 },
    description: 'Join our design team as a UX Designer to create intuitive and engaging user experiences. You will work closely with product managers and developers.',
    requirements: [
      '3+ years of UX design experience',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio demonstrating user-centered design',
      'Experience with user research and usability testing',
      'Knowledge of design systems and accessibility'
    ],
    perks: [
      'Flexible work arrangements',
      'Design tools and software licenses',
      'Conference and training budget',
      'Creative workspace',
      'Team building activities'
    ],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    postedDate: '10/01/2025',
    applicants: 8,
    status: 'active',
    archived: false,
    slug: 'ux-designer'
  },
  {
    id: 3,
    title: 'Data Scientist',
    department: 'Data & Analytics',
    location: 'New York, NY',
    employmentType: 'Full Time',
    salary: { min: 110000, max: 160000 },
    description: 'We are seeking a Data Scientist to analyze complex data sets and provide actionable insights to drive business decisions.',
    requirements: [
      'Master\'s degree in Data Science, Statistics, or related field',
      '3+ years of experience in data analysis',
      'Proficiency in Python, R, or SQL',
      'Experience with machine learning algorithms',
      'Strong statistical analysis skills'
    ],
    perks: [
      'Competitive salary package',
      'Health and wellness benefits',
      'Learning and development opportunities',
      'Flexible schedule',
      'Stock options'
    ],
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'Data Visualization'],
    postedDate: '08/01/2025',
    applicants: 15,
    status: 'active',
    archived: false,
    slug: 'data-scientist'
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    location: 'Seattle, WA',
    employmentType: 'Full Time',
    salary: { min: 130000, max: 190000 },
    description: 'Lead product strategy and execution for our core platform. Work with cross-functional teams to deliver exceptional user experiences.',
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile development methodologies',
      'Excellent communication and leadership skills',
      'Technical background preferred'
    ],
    perks: [
      'Comprehensive health benefits',
      'Flexible PTO policy',
      'Professional development fund',
      'Home office stipend',
      'Team events and retreats'
    ],
    skills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership', 'Technical Communication'],
    postedDate: '12/01/2025',
    applicants: 22,
    status: 'active',
    archived: false,
    slug: 'product-manager'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'Full Time',
    salary: { min: 100000, max: 150000 },
    description: 'Join our DevOps team to build and maintain our cloud infrastructure. Focus on automation, scalability, and reliability.',
    requirements: [
      '4+ years of DevOps experience',
      'Experience with AWS, Azure, or GCP',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Experience with CI/CD pipelines',
      'Scripting skills (Python, Bash)'
    ],
    perks: [
      'Remote work flexibility',
      'Cloud certification support',
      'Latest tools and technologies',
      'Conference attendance',
      'Health and dental coverage'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Python'],
    postedDate: '05/01/2025',
    applicants: 18,
    status: 'active',
    archived: false,
    slug: 'devops-engineer'
  },
  {
    id: 6,
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Chicago, IL',
    employmentType: 'Full Time',
    salary: { min: 60000, max: 85000 },
    description: 'Drive marketing initiatives and campaigns to increase brand awareness and customer acquisition.',
    requirements: [
      '2+ years of marketing experience',
      'Experience with digital marketing channels',
      'Proficiency in marketing analytics tools',
      'Strong written and verbal communication',
      'Creative thinking and problem-solving skills'
    ],
    perks: [
      'Marketing budget for campaigns',
      'Professional development opportunities',
      'Flexible work environment',
      'Health insurance',
      'Performance bonuses'
    ],
    skills: ['Digital Marketing', 'Analytics', 'Content Creation', 'Social Media', 'SEO'],
    postedDate: '18/01/2025',
    applicants: 25,
    status: 'active',
    archived: false,
    slug: 'marketing-specialist'
  },
  {
    id: 7,
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Boston, MA',
    employmentType: 'Full Time',
    salary: { min: 95000, max: 140000 },
    description: 'Develop and maintain server-side applications and APIs. Work with databases and cloud services.',
    requirements: [
      '3+ years of backend development experience',
      'Proficiency in Python, Java, or Node.js',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Knowledge of RESTful API design',
      'Understanding of cloud platforms'
    ],
    perks: [
      'Competitive compensation',
      'Health and wellness benefits',
      'Learning opportunities',
      'Flexible hours',
      'Stock options'
    ],
    skills: ['Python', 'Node.js', 'PostgreSQL', 'REST APIs', 'Cloud Services'],
    postedDate: '20/01/2025',
    applicants: 14,
    status: 'active',
    archived: false,
    slug: 'backend-developer'
  },
  {
    id: 8,
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Denver, CO',
    employmentType: 'Full Time',
    salary: { min: 50000, max: 80000 },
    description: 'Build relationships with clients and drive sales growth. Manage the full sales cycle from prospecting to closing.',
    requirements: [
      '2+ years of sales experience',
      'Strong interpersonal and communication skills',
      'Experience with CRM systems',
      'Goal-oriented and self-motivated',
      'Bachelor\'s degree preferred'
    ],
    perks: [
      'Commission structure',
      'Sales training program',
      'Company car allowance',
      'Health benefits',
      'Team building events'
    ],
    skills: ['Sales', 'CRM', 'Communication', 'Negotiation', 'Relationship Building'],
    postedDate: '22/01/2025',
    applicants: 30,
    status: 'active',
    archived: false,
    slug: 'sales-representative'
  },
  {
    id: 9,
    title: 'QA Engineer',
    department: 'Engineering',
    location: 'Portland, OR',
    employmentType: 'Full Time',
    salary: { min: 75000, max: 110000 },
    description: 'Ensure software quality through comprehensive testing strategies. Work with development teams to prevent bugs.',
    requirements: [
      '3+ years of QA experience',
      'Experience with automated testing tools',
      'Knowledge of testing methodologies',
      'Experience with bug tracking systems',
      'Strong attention to detail'
    ],
    perks: [
      'Quality-focused environment',
      'Testing tools and licenses',
      'Professional development',
      'Flexible schedule',
      'Health insurance'
    ],
    skills: ['Test Automation', 'Selenium', 'Jest', 'Bug Tracking', 'Quality Assurance'],
    postedDate: '25/01/2025',
    applicants: 12,
    status: 'active',
    archived: false,
    slug: 'qa-engineer'
  },
  {
    id: 10,
    title: 'HR Coordinator',
    department: 'Human Resources',
    location: 'Miami, FL',
    employmentType: 'Full Time',
    salary: { min: 45000, max: 65000 },
    description: 'Support HR operations including recruitment, onboarding, and employee relations.',
    requirements: [
      '2+ years of HR experience',
      'Knowledge of HR policies and procedures',
      'Experience with HRIS systems',
      'Strong organizational skills',
      'Bachelor\'s degree in HR or related field'
    ],
    perks: [
      'HR certification support',
      'Professional development',
      'Flexible work arrangements',
      'Health benefits',
      'Employee assistance program'
    ],
    skills: ['HRIS', 'Recruitment', 'Employee Relations', 'Policy Development', 'Compliance'],
    postedDate: '28/01/2025',
    applicants: 20,
    status: 'active',
    archived: false,
    slug: 'hr-coordinator'
  },
  {
    id: 11,
    title: 'Content Writer',
    department: 'Marketing',
    location: 'Remote',
    employmentType: 'Part Time',
    salary: { min: 30000, max: 50000 },
    description: 'Create engaging content for our blog, website, and marketing materials. Collaborate with marketing team on content strategy.',
    requirements: [
      '2+ years of content writing experience',
      'Excellent writing and editing skills',
      'Experience with SEO best practices',
      'Knowledge of content management systems',
      'Portfolio of published work'
    ],
    perks: [
      'Remote work flexibility',
      'Content creation tools',
      'Professional development',
      'Flexible schedule',
      'Performance bonuses'
    ],
    skills: ['Content Writing', 'SEO', 'WordPress', 'Social Media', 'Editing'],
    postedDate: '30/01/2025',
    applicants: 35,
    status: 'active',
    archived: false,
    slug: 'content-writer'
  },
  {
    id: 12,
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Phoenix, AZ',
    employmentType: 'Full Time',
    salary: { min: 70000, max: 95000 },
    description: 'Ensure customer satisfaction and drive product adoption. Build strong relationships with key clients.',
    requirements: [
      '3+ years of customer success experience',
      'Strong communication and relationship skills',
      'Experience with CRM systems',
      'Analytical and problem-solving abilities',
      'Technical aptitude preferred'
    ],
    perks: [
      'Customer-focused culture',
      'Professional development',
      'Flexible work options',
      'Health benefits',
      'Team recognition programs'
    ],
    skills: ['Customer Success', 'CRM', 'Account Management', 'Analytics', 'Communication'],
    postedDate: '02/02/2025',
    applicants: 16,
    status: 'active',
    archived: false,
    slug: 'customer-success-manager'
  },
  {
    id: 13,
    title: 'Mobile App Developer',
    department: 'Engineering',
    location: 'Los Angeles, CA',
    employmentType: 'Full Time',
    salary: { min: 90000, max: 130000 },
    description: 'Develop and maintain mobile applications for iOS and Android platforms.',
    requirements: [
      '3+ years of mobile development experience',
      'Proficiency in React Native, Flutter, or native development',
      'Experience with mobile app deployment',
      'Knowledge of mobile UI/UX principles',
      'Understanding of mobile security best practices'
    ],
    perks: [
      'Latest mobile devices for testing',
      'App store optimization support',
      'Professional development',
      'Flexible schedule',
      'Health insurance'
    ],
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI/UX'],
    postedDate: '05/02/2025',
    applicants: 19,
    status: 'active',
    archived: false,
    slug: 'mobile-app-developer'
  },
  {
    id: 14,
    title: 'Business Analyst',
    department: 'Business Operations',
    location: 'Dallas, TX',
    employmentType: 'Full Time',
    salary: { min: 65000, max: 90000 },
    description: 'Analyze business processes and requirements to drive operational improvements and support decision-making.',
    requirements: [
      '3+ years of business analysis experience',
      'Strong analytical and problem-solving skills',
      'Experience with data analysis tools',
      'Excellent communication skills',
      'Bachelor\'s degree in Business or related field'
    ],
    perks: [
      'Business analysis tools',
      'Professional certification support',
      'Flexible work arrangements',
      'Health benefits',
      'Performance bonuses'
    ],
    skills: ['Business Analysis', 'Data Analysis', 'Process Improvement', 'Requirements Gathering', 'Documentation'],
    postedDate: '08/02/2025',
    applicants: 13,
    status: 'active',
    archived: false,
    slug: 'business-analyst'
  },
  {
    id: 15,
    title: 'Security Engineer',
    department: 'Engineering',
    location: 'Washington, DC',
    employmentType: 'Full Time',
    salary: { min: 110000, max: 160000 },
    description: 'Protect our systems and data through security assessments, monitoring, and incident response.',
    requirements: [
      '4+ years of cybersecurity experience',
      'Knowledge of security frameworks and standards',
      'Experience with security tools and technologies',
      'Understanding of threat landscape',
      'Relevant certifications preferred'
    ],
    perks: [
      'Security training and certifications',
      'Latest security tools',
      'Professional development',
      'Flexible schedule',
      'Comprehensive benefits'
    ],
    skills: ['Cybersecurity', 'Security Assessment', 'Incident Response', 'Compliance', 'Risk Management'],
    postedDate: '10/02/2025',
    applicants: 8,
    status: 'active',
    archived: false,
    slug: 'security-engineer'
  },

  // ARCHIVED JOBS (10 jobs)
  {
    id: 16,
    title: 'Junior Developer',
    department: 'Engineering',
    location: 'San Diego, CA',
    employmentType: 'Full Time',
    salary: { min: 60000, max: 80000 },
    description: 'Entry-level developer position for recent graduates or career changers. Learn and grow with our experienced team.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Basic programming knowledge',
      'Eagerness to learn and grow',
      'Strong problem-solving skills',
      'Good communication skills'
    ],
    perks: [
      'Mentorship program',
      'Learning budget',
      'Health insurance',
      'Flexible schedule',
      'Career development'
    ],
    skills: ['JavaScript', 'HTML', 'CSS', 'Git', 'Problem Solving'],
    postedDate: '01/11/2024',
    applicants: 45,
    status: 'archived',
    archived: true,
    slug: 'junior-developer'
  },
  {
    id: 17,
    title: 'Graphic Designer',
    department: 'Design',
    location: 'Nashville, TN',
    employmentType: 'Contract',
    salary: { min: 40000, max: 60000 },
    description: 'Create visual designs for marketing materials, websites, and digital products.',
    requirements: [
      '2+ years of graphic design experience',
      'Proficiency in Adobe Creative Suite',
      'Strong portfolio of design work',
      'Understanding of design principles',
      'Experience with print and digital media'
    ],
    perks: [
      'Creative freedom',
      'Design software licenses',
      'Flexible contract terms',
      'Portfolio development',
      'Networking opportunities'
    ],
    skills: ['Adobe Creative Suite', 'Graphic Design', 'Branding', 'Print Design', 'Digital Design'],
    postedDate: '15/10/2024',
    applicants: 28,
    status: 'archived',
    archived: true,
    slug: 'graphic-designer'
  },
  {
    id: 18,
    title: 'Project Manager',
    department: 'Operations',
    location: 'Atlanta, GA',
    employmentType: 'Full Time',
    salary: { min: 80000, max: 110000 },
    description: 'Lead cross-functional teams to deliver projects on time and within budget.',
    requirements: [
      '4+ years of project management experience',
      'PMP certification preferred',
      'Experience with project management tools',
      'Strong leadership and communication skills',
      'Bachelor\'s degree required'
    ],
    perks: [
      'PMP certification support',
      'Project management tools',
      'Professional development',
      'Health benefits',
      'Performance bonuses'
    ],
    skills: ['Project Management', 'Agile', 'Leadership', 'Risk Management', 'Communication'],
    postedDate: '20/09/2024',
    applicants: 32,
    status: 'archived',
    archived: true,
    slug: 'project-manager'
  },
  {
    id: 19,
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    location: 'Orlando, FL',
    employmentType: 'Full Time',
    salary: { min: 70000, max: 100000 },
    description: 'Develop and execute digital marketing strategies to drive online presence and customer engagement.',
    requirements: [
      '4+ years of digital marketing experience',
      'Experience with Google Ads, Facebook Ads',
      'Knowledge of SEO and content marketing',
      'Analytical and data-driven approach',
      'Bachelor\'s degree in Marketing or related field'
    ],
    perks: [
      'Marketing budget',
      'Digital marketing tools',
      'Professional development',
      'Flexible work options',
      'Health insurance'
    ],
    skills: ['Digital Marketing', 'Google Ads', 'SEO', 'Content Marketing', 'Analytics'],
    postedDate: '10/08/2024',
    applicants: 40,
    status: 'archived',
    archived: true,
    slug: 'digital-marketing-manager'
  },
  {
    id: 20,
    title: 'Database Administrator',
    department: 'Engineering',
    location: 'Minneapolis, MN',
    employmentType: 'Full Time',
    salary: { min: 85000, max: 120000 },
    description: 'Manage and maintain our database systems to ensure optimal performance and data integrity.',
    requirements: [
      '4+ years of database administration experience',
      'Experience with PostgreSQL, MySQL, or Oracle',
      'Knowledge of database optimization',
      'Understanding of backup and recovery procedures',
      'Strong problem-solving skills'
    ],
    perks: [
      'Database certification support',
      'Latest database tools',
      'Professional development',
      'Flexible schedule',
      'Health benefits'
    ],
    skills: ['PostgreSQL', 'MySQL', 'Database Optimization', 'Backup & Recovery', 'Performance Tuning'],
    postedDate: '25/07/2024',
    applicants: 15,
    status: 'archived',
    archived: true,
    slug: 'database-administrator'
  },
  {
    id: 21,
    title: 'Technical Writer',
    department: 'Documentation',
    location: 'Remote',
    employmentType: 'Contract',
    salary: { min: 50000, max: 75000 },
    description: 'Create clear and comprehensive technical documentation for our products and APIs.',
    requirements: [
      '3+ years of technical writing experience',
      'Strong technical background',
      'Experience with documentation tools',
      'Excellent written communication skills',
      'Ability to translate complex concepts into clear language'
    ],
    perks: [
      'Remote work flexibility',
      'Documentation tools',
      'Professional development',
      'Flexible contract terms',
      'Portfolio building'
    ],
    skills: ['Technical Writing', 'API Documentation', 'Markdown', 'Git', 'Communication'],
    postedDate: '15/06/2024',
    applicants: 22,
    status: 'archived',
    archived: true,
    slug: 'technical-writer'
  },
  {
    id: 22,
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'Philadelphia, PA',
    employmentType: 'Full Time',
    salary: { min: 65000, max: 90000 },
    description: 'Analyze financial data and provide insights to support business decisions and strategic planning.',
    requirements: [
      '3+ years of financial analysis experience',
      'Strong analytical and Excel skills',
      'Knowledge of financial modeling',
      'Bachelor\'s degree in Finance or related field',
      'Attention to detail and accuracy'
    ],
    perks: [
      'Financial modeling tools',
      'Professional certification support',
      'Flexible work arrangements',
      'Health benefits',
      'Performance bonuses'
    ],
    skills: ['Financial Analysis', 'Excel', 'Financial Modeling', 'Data Analysis', 'Reporting'],
    postedDate: '05/05/2024',
    applicants: 18,
    status: 'archived',
    archived: true,
    slug: 'financial-analyst'
  },
  {
    id: 23,
    title: 'UI Designer',
    department: 'Design',
    location: 'Detroit, MI',
    employmentType: 'Full Time',
    salary: { min: 70000, max: 95000 },
    description: 'Design intuitive and visually appealing user interfaces for our web and mobile applications.',
    requirements: [
      '3+ years of UI design experience',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Strong understanding of design systems',
      'Experience with responsive design',
      'Portfolio demonstrating UI design skills'
    ],
    perks: [
      'Design tools and licenses',
      'Creative workspace',
      'Professional development',
      'Flexible schedule',
      'Health insurance'
    ],
    skills: ['UI Design', 'Figma', 'Design Systems', 'Responsive Design', 'Prototyping'],
    postedDate: '20/04/2024',
    applicants: 26,
    status: 'archived',
    archived: true,
    slug: 'ui-designer'
  },
  {
    id: 24,
    title: 'System Administrator',
    department: 'IT',
    location: 'Kansas City, MO',
    employmentType: 'Full Time',
    salary: { min: 70000, max: 100000 },
    description: 'Maintain and support our IT infrastructure including servers, networks, and systems.',
    requirements: [
      '4+ years of system administration experience',
      'Experience with Linux and Windows servers',
      'Knowledge of networking and security',
      'Experience with virtualization technologies',
      'Strong troubleshooting skills'
    ],
    perks: [
      'IT certification support',
      'Latest hardware and software',
      'Professional development',
      'Flexible schedule',
      'Health benefits'
    ],
    skills: ['Linux', 'Windows Server', 'Networking', 'Virtualization', 'Troubleshooting'],
    postedDate: '10/03/2024',
    applicants: 20,
    status: 'archived',
    archived: true,
    slug: 'system-administrator'
  },
  {
    id: 25,
    title: 'Customer Support Specialist',
    department: 'Customer Support',
    location: 'Salt Lake City, UT',
    employmentType: 'Full Time',
    salary: { min: 40000, max: 55000 },
    description: 'Provide excellent customer support through various channels including email, chat, and phone.',
    requirements: [
      '2+ years of customer support experience',
      'Excellent communication skills',
      'Experience with support ticketing systems',
      'Patience and problem-solving abilities',
      'Technical aptitude preferred'
    ],
    perks: [
      'Customer service training',
      'Support tools and software',
      'Professional development',
      'Flexible schedule',
      'Health insurance'
    ],
    skills: ['Customer Support', 'Communication', 'Problem Solving', 'Ticketing Systems', 'Product Knowledge'],
    postedDate: '01/02/2024',
    applicants: 50,
    status: 'archived',
    archived: true,
    slug: 'customer-support-specialist'
  }
];

// Helper function to get active jobs
export const getActiveJobs = () => seedJobs.filter(job => !job.archived);

// Helper function to get archived jobs
export const getArchivedJobs = () => seedJobs.filter(job => job.archived);

// Helper function to get jobs by department
export const getJobsByDepartment = (department) => 
  seedJobs.filter(job => job.department === department);

// Helper function to get jobs by employment type
export const getJobsByEmploymentType = (employmentType) => 
  seedJobs.filter(job => job.employmentType === employmentType);






