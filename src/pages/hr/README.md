# HR Management System

A comprehensive HR management system for the TalentFlow hiring platform with job posting, assignment management, and candidate tracking capabilities.

## Features

### 🏠 Dashboard
- **Overview Statistics**: Active jobs, total candidates, interviews scheduled, hired this month
- **Recent Job Postings**: Latest job postings with applicant counts and status
- **Recent Candidates**: Latest candidate applications with status tracking
- **Real-time Updates**: Live data updates and loading states

### 📝 Job Management
- **Create Job Postings**: Comprehensive job creation form with:
  - Basic information (title, department, location, employment type)
  - Job description and requirements
  - Required skills management
  - Salary range specification
  - Benefits and perks
- **Assignment Integration**: Add custom assignments to job postings:
  - Technical tests
  - Case studies
  - Presentations
  - Coding challenges
  - Difficulty levels and duration settings

### 📋 Job Management
- **View All Jobs**: Complete job listing with filtering and search
- **Archive/Unarchive**: Archive completed jobs and unarchive when needed
- **Status Management**: Track job status (active, closed, draft)
- **Assignment Tracking**: View all assignments associated with each job
- **Bulk Actions**: Manage multiple jobs at once

### 🎯 Assignment System
- **Custom Assignments**: Create tailored assignments for each job
- **Multiple Types**: Support for various assignment types
- **Difficulty Levels**: Easy, Medium, Hard difficulty settings
- **Duration Tracking**: Set time limits for assignments
- **Integration**: Seamlessly integrated with job postings

## File Structure

```
src/
├── pages/hr/
│   ├── Dashboard.jsx          # Main HR dashboard
│   ├── CreateJob.jsx         # Job creation page
│   ├── ManageJobs.jsx        # Job management page
│   ├── Dashboard.css         # Dashboard styles
│   ├── CreateJob.css         # Job creation styles
│   ├── ManageJobs.css        # Job management styles
│   └── README.md             # This file
├── components/hr/
│   ├── sidebar/
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   └── Sidebar.css       # Sidebar styles
│   └── jobs/                 # Job-related components (future)
└── App.js                    # Main routing configuration
```

## Navigation

The system includes a comprehensive sidebar navigation with:

- **Dashboard** (`/hr/dashboard`) - Main overview page
- **Create Job Posting** (`/hr/create-job`) - Job creation form
- **Manage Jobs** (`/hr/jobs`) - Job management and archiving
- **Create Assignment** (`/hr/create-assignment`) - Assignment creation
- **Manage Assignments** (`/hr/assignments`) - Assignment management
- **Candidates** (`/hr/candidates`) - Candidate management
- **Analytics** (`/hr/analytics`) - Hiring analytics

## Key Components

### Dashboard Components
- **Stats Cards**: Visual representation of key metrics
- **Recent Jobs List**: Latest job postings with quick actions
- **Recent Candidates List**: Latest applications with status
- **Loading States**: Skeleton UI during data loading
- **Error Handling**: Graceful error states with retry options

### Job Creation Form
- **Multi-step Form**: Organized into logical sections
- **Dynamic Skills**: Add/remove required skills
- **Assignment Builder**: Create custom assignments
- **Form Validation**: Client-side validation with error messages
- **Draft Saving**: Save work in progress

### Job Management
- **Advanced Filtering**: Filter by status, department, archive state
- **Search Functionality**: Search across job titles, departments, locations
- **Bulk Actions**: Archive, unarchive, delete multiple jobs
- **Assignment Overview**: View all assignments per job
- **Status Tracking**: Visual status indicators

## Styling

The system uses custom CSS with:
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface
- **Color Coding**: Status-based color schemes
- **Hover Effects**: Interactive feedback
- **Loading States**: Smooth loading animations

## Data Management

- **Mock Data**: Currently uses static data for development
- **State Management**: React hooks for local state
- **Form Handling**: Controlled components with validation
- **API Ready**: Structured for easy API integration

## Responsive Design

- **Desktop**: Full sidebar with multi-column layouts
- **Tablet**: Condensed sidebar with stacked layouts
- **Mobile**: Collapsible sidebar with single-column layouts

## Future Enhancements

- **API Integration**: Connect to backend services
- **Real-time Updates**: WebSocket integration
- **Advanced Analytics**: Detailed reporting and insights
- **Bulk Operations**: Mass job management
- **Templates**: Job posting templates
- **Notifications**: Real-time alerts and updates

## Usage

1. **Access Dashboard**: Navigate to `/` or `/hr/dashboard`
2. **Create Jobs**: Use "Create Job Posting" from sidebar
3. **Manage Jobs**: Use "Manage Jobs" to view, edit, archive jobs
4. **Add Assignments**: Include assignments during job creation
5. **Track Progress**: Monitor applications and hiring progress

## Technical Notes

- Built with React 19.1.1
- Uses React Router for navigation
- Responsive CSS with modern design patterns
- Component-based architecture
- Form validation and error handling
- Loading states and user feedback
