# TalentFlow HR - Job Board & HR Management System

A comprehensive React-based job board and HR management system that enables job seekers to apply for positions and HR teams to manage the entire recruitment process.

## 🚀 Live Demo

[Deployed App Link](https://your-deployment-url.com) | [GitHub Repository](https://github.com/Rohan-infinity/testing)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [State Management](#state-management)
- [Data Flow](#data-flow)
- [Technical Decisions](#technical-decisions)
- [Known Issues](#known-issues)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## ✨ Features

### Job Seeker Side
- **Job Discovery**: Browse 25+ seeded jobs with search and filtering
- **Application Process**: Apply to jobs with detailed application forms
- **Assessment System**: Take job-specific assessments with conditional logic
- **Application Tracking**: View applied jobs and assessment status

### HR Management Side
- **Dashboard**: Overview of active jobs, candidates, and hiring metrics
- **Job Management**: Create, edit, and manage job postings with drag-and-drop reordering
- **Candidate Management**: View and manage candidates with pagination (35 per page)
- **Assessment Builder**: Create comprehensive assessments with multiple question types
- **Candidate Profiles**: Detailed candidate profiles with assessment scores and status history
- **Real-time Sync**: Live updates between job seeker and HR interfaces

## 🛠 Tech Stack

- **Frontend**: React 19.1.1, React Router DOM 7.9.3
- **Styling**: CSS3, Tailwind CSS 4.1.13
- **Drag & Drop**: @dnd-kit (core, sortable, utilities)
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Testing**: React Testing Library, Jest
- **Build Tool**: Create React App
- **Mocking**: MSW (Mock Service Worker)

## 🏗 Architecture

### Component Architecture
```
src/
├── components/           # Reusable UI components
│   ├── assessments/     # Assessment-related components
│   ├── hr/             # HR-specific components
│   └── jobs/           # Job-related components
├── context/            # Global state management
├── data/               # Seed data and generators
├── pages/              # Page components
│   ├── hr/            # HR management pages
│   └── [public pages] # Job seeker pages
└── utils/              # Utility functions
```

### State Management Pattern
- **HRContext**: Manages jobs, candidates, and HR-specific state
- **AssessmentContext**: Handles assessments, questions, and responses
- **localStorage**: Persistent data storage with real-time synchronization
- **Polling**: 7-8 second intervals for cross-interface updates

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/entnt-assignment.git
   cd entnt-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode

## 📁 Project Structure

```
src/
├── components/
│   ├── assessments/
│   │   ├── AssessmentBuilder.jsx    # HR assessment creation
│   │   ├── LivePreview.jsx          # Assessment preview
│   │   ├── QuestionEditor.jsx       # Question editing
│   │   └── QuestionTypes/           # Question type components
│   ├── hr/
│   │   ├── dashboard/               # Dashboard components
│   │   ├── jobs/                    # Job management components
│   │   └── sidebar/                 # Navigation sidebar
│   ├── Header.js                    # Main header component
│   └── JobTable.js                  # Job listing table
├── context/
│   ├── AssessmentContext.js         # Assessment state management
│   └── HRContext.js                 # HR state management
├── data/
│   ├── generateSeedData.js          # Candidate data generator
│   ├── seedAssessments.js           # Assessment templates
│   ├── seedCandidates.js            # Candidate data
│   └── seedJobs.js                  # Job postings
├── pages/
│   ├── hr/
│   │   ├── Candidates.jsx           # Candidate management
│   │   ├── CandidateProfile.jsx     # Individual candidate view
│   │   ├── CreateJob.jsx            # Job creation form
│   │   ├── Dashboard.jsx            # HR dashboard
│   │   ├── JobDetail.jsx            # Job details (HR view)
│   │   └── ManageJobs.jsx           # Job management
│   ├── Home.jsx                     # Landing page
│   ├── JobDetail.jsx                # Job details (public view)
│   └── JobsBoard.jsx                # Job seeker interface
├── utils/
│   └── assessmentUtils.js           # Assessment utilities
├── App.js                           # Main app component
└── index.js                         # App entry point
```

## 🎯 Key Features

### 1. Job Management
- **25 Seeded Jobs**: Mix of active and archived positions
- **Drag & Drop Reordering**: Reorder jobs in HR interface
- **Pagination**: 5 jobs per page in HR view
- **Search & Filter**: By title, department, status, location

### 2. Candidate Management
- **1000 Seeded Candidates**: Realistic data with varied experience
- **Pagination**: 35 candidates per page
- **Status Tracking**: Applied → Under Review → Hired
- **Assessment Integration**: 50% completion rate with scoring

### 3. Assessment System
- **3 Generic Assessments**: 12+ questions each
- **Multiple Question Types**: Single choice, multi-choice, short text, long text
- **Conditional Logic**: Questions that appear based on previous answers
- **Real-time Preview**: Live assessment preview for HR
- **Scoring System**: Automated and manual scoring options

### 4. Real-time Synchronization
- **Cross-interface Updates**: Changes sync between HR and job seeker views
- **Polling Mechanism**: 7-8 second intervals for live updates
- **localStorage Persistence**: Data persists across browser sessions

## 🔄 State Management

### HRContext
```javascript
// Manages jobs, candidates, and HR operations
const {
  jobs,                    // Array of job postings
  candidates,              // Array of candidates
  addJob,                  // Create new job
  updateCandidateStatus,   // Update candidate status
  getDashboardStats,       // Dashboard metrics
  getRecentJobs,          // Recent job posts
  getRecentCandidates     // Recent applications
} = useHRContext();
```

### AssessmentContext
```javascript
// Handles assessments and responses
const {
  assessments,             // Array of assessments
  assessmentResponses,     // Candidate responses
  createAssessment,        // Create new assessment
  startAssessment,         // Begin assessment
  submitAssessmentResponse, // Submit answers
  scoreAssessmentResponse  // Score assessment
} = useAssessmentContext();
```

## 🔄 Data Flow

### Job Application Flow
1. **Job Seeker** browses jobs on `/jobs-board`
2. **Applies** to job with personal information
3. **Takes Assessment** (if available for the job)
4. **HR** receives application in `/hr/candidates`
5. **HR** reviews candidate and assessment scores
6. **Status Updates** sync in real-time

### Assessment Creation Flow
1. **HR** creates assessment in `/hr/create-job`
2. **Assessment** is linked to specific job
3. **Job Seeker** takes assessment after applying
4. **Responses** are saved and scored
5. **HR** views results in candidate profile

## 🎨 Technical Decisions

### 1. localStorage over Database
**Decision**: Use localStorage for data persistence
**Rationale**: 
- Simpler setup for demo purposes
- No backend dependencies
- Real-time synchronization via polling
- Easy to reset and seed data

### 2. Context API over Redux
**Decision**: React Context API for state management
**Rationale**:
- Built-in React solution
- Simpler for medium-sized applications
- Less boilerplate code
- Sufficient for current feature set

### 3. Polling over WebSockets
**Decision**: 7-8 second polling intervals
**Rationale**:
- Simpler implementation
- No WebSocket server required
- Reliable for demo purposes
- Easy to adjust intervals

### 4. CSS over Styled Components
**Decision**: Traditional CSS with Tailwind
**Rationale**:
- Better performance
- Easier to maintain
- Familiar to most developers
- Good balance of utility and custom styles

## 🐛 Known Issues

### 1. Performance
- **Issue**: Large candidate lists (1000+) may cause slow rendering
- **Workaround**: Pagination limits display to 35 candidates
- **Future Fix**: Implement virtualization for large lists

### 2. Data Persistence
- **Issue**: localStorage has size limits (~5-10MB)
- **Workaround**: Current data is well within limits
- **Future Fix**: Implement data compression or backend storage

### 3. Real-time Updates
- **Issue**: Polling may miss rapid changes
- **Workaround**: 7-8 second intervals provide good balance
- **Future Fix**: Implement WebSocket for instant updates

### 4. Browser Compatibility
- **Issue**: Some modern features may not work in older browsers
- **Workaround**: Modern browser requirements
- **Future Fix**: Add polyfills for broader compatibility

## 🚀 Future Enhancements

### Short Term
- [ ] **Kanban Board**: Drag-and-drop candidate status management
- [ ] **Email Notifications**: Automated status update emails
- [ ] **Advanced Filtering**: More granular search options
- [ ] **Export Functionality**: Export candidate data to CSV

### Medium Term
- [ ] **Backend Integration**: Replace localStorage with real database
- [ ] **User Authentication**: Login system for HR and candidates
- [ ] **File Uploads**: Resume and document uploads
- [ ] **Calendar Integration**: Interview scheduling

### Long Term
- [ ] **AI-Powered Matching**: Smart candidate-job matching
- [ ] **Video Interviews**: Integrated video calling
- [ ] **Analytics Dashboard**: Advanced hiring metrics
- [ ] **Mobile App**: React Native mobile application

## 🤝 Contributing

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 👥 Team

- **Developer**: Rohan Sahu

## 📞 Support

For support, email [awsm.rohan44@gmail.com] or create an issue in the GitHub repository.

---

**Built with ❤️ using React and modern web technologies**
