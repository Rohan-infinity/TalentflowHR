import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHRContext } from '../context/HRContext';
import { useAssessmentContext } from '../context/AssessmentContext';
import SingleChoice from '../components/assessments/QuestionTypes/SingleChoice';
import MultiChoice from '../components/assessments/QuestionTypes/MultiChoice';
import ShortText from '../components/assessments/QuestionTypes/ShortText';
import LongText from '../components/assessments/QuestionTypes/LongText';
import NumericRange from '../components/assessments/QuestionTypes/NumericRange';
import FileUpload from '../components/assessments/QuestionTypes/FileUpload';
import './JobsBoard.css';

const JobsBoard = () => {
  const { jobs, loading } = useHRContext();
  const { getAssessmentsByJob } = useAssessmentContext();
  const navigate = useNavigate();

  // Helper function to get the first assessment for a job
  const getAssessmentByJobId = (jobId) => {
    const assessments = getAssessmentsByJob(jobId);
    console.log('Looking for assessment for jobId:', jobId);
    console.log('Available assessments:', assessments);
    return assessments.length > 0 ? assessments[0] : null;
  };

  // Function to evaluate conditional logic (only equals)
  const evaluateConditional = (answer, conditional) => {
    if (!conditional || !answer) {
      console.log('Missing conditional or answer:', { conditional, answer });
      return false;
    }
    
    const { value } = conditional;
    
    console.log('Evaluating:', { answer, value, strict: answer === value });
    
    // Only support equals operator
    return answer === value;
  };
  
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSection, setSelectedSection] = useState('available');
  const [appliedJobs, setAppliedJobs] = useState(new Map());
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationFormData, setApplicationFormData] = useState({
    name: '',
    email: '',
    position: '',
    experience: '',
    location: ''
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [assessmentResponses, setAssessmentResponses] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState([]);

  const jobsPerPage = 6;

  // Load applied jobs from localStorage
  useEffect(() => {
    const savedAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    const appliedJobsMap = new Map();
    savedAppliedJobs.forEach(job => {
      appliedJobsMap.set(job.jobId, job);
    });
    setAppliedJobs(appliedJobsMap);
  }, []);

  // Note: Jobs are automatically synced via HRContext polling mechanism

  // Calculate visible questions when assessment responses change
  useEffect(() => {
    if (selectedAssessment && selectedAssessment.sections) {
      const allQuestions = selectedAssessment.sections.flatMap(section => section.questions || []);
      
      const filteredQuestions = allQuestions.filter((question) => {
        // If no conditional logic, always show
        if (!question.conditional) return true;
        
        // Get the question this depends on
        const dependsOnQuestion = allQuestions.find(q => q.id === question.conditional.dependsOn);
        if (!dependsOnQuestion) {
          console.log('Dependent question not found for:', question.id);
          return true;
        }
        
        // Get the answer to the dependent question
        const dependentAnswer = assessmentResponses[dependsOnQuestion.id];
        console.log('Checking conditional for question:', question.question);
        console.log('Depends on question:', dependsOnQuestion.question);
        console.log('Dependent answer:', dependentAnswer);
        console.log('Expected value:', question.conditional.value);
        
        if (dependentAnswer === undefined || dependentAnswer === null) {
          console.log('No answer yet for dependent question');
          return false;
        }
        
        // Evaluate the condition
        const result = evaluateConditional(dependentAnswer, question.conditional);
        console.log('Conditional result:', result);
        return result;
      });
      
      setVisibleQuestions(filteredQuestions);
    }
  }, [selectedAssessment, assessmentResponses]);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
      const matchesEmploymentType = employmentTypeFilter === 'all' || job.employmentType === employmentTypeFilter;
      
      return matchesSearch && matchesDepartment && matchesEmploymentType && !job.archived;
    });

    if (selectedSection === 'applied') {
      filtered = filtered.filter(job => appliedJobs.has(job.id));
    } else if (selectedSection === 'available') {
      filtered = filtered.filter(job => !appliedJobs.has(job.id));
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, departmentFilter, employmentTypeFilter, selectedSection, appliedJobs]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'department') {
      setDepartmentFilter(value);
    } else if (filterType === 'employmentType') {
      setEmploymentTypeFilter(value);
    }
    setCurrentPage(1);
  };

  const handleViewJob = (job) => {
    navigate(`/jobs/${job.slug}`);
  };

  const handleApply = (jobId) => {
    setSelectedJob(jobs.find(job => job.id === jobId));
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!applicationFormData.name || !applicationFormData.email || !applicationFormData.position || !applicationFormData.experience || !applicationFormData.location) {
      alert('Please fill in all fields');
      return;
    }

    // Create application data
    const applicationData = {
      jobId: selectedJob.id,
      status: 'Applied',
      appliedDate: new Date().toISOString(),
      applicantInfo: {
        name: applicationFormData.name,
        email: applicationFormData.email,
        position: applicationFormData.position,
        experience: applicationFormData.experience,
        location: applicationFormData.location,
        skills: 'mock',
        city: applicationFormData.location,
        phone: '000000000'
      }
    };

    // Add to applied jobs
    const newAppliedJobs = new Map(appliedJobs);
    newAppliedJobs.set(selectedJob.id, applicationData);
    setAppliedJobs(newAppliedJobs);
    localStorage.setItem('appliedJobs', JSON.stringify([...newAppliedJobs.values()]));

    // Add to candidates list in localStorage
    const candidateData = {
      id: Date.now(), // Simple ID generation
      name: applicationFormData.name,
      email: applicationFormData.email,
      position: applicationFormData.position,
      experience: applicationFormData.experience,
      location: applicationFormData.location,
      skills: ['General Skills'], // Array instead of string
      city: applicationFormData.location,
      phone: '000000000',
      appliedDate: new Date().toLocaleDateString('en-GB'),
      status: 'Under Review',
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      statusHistory: [
        {
          status: 'Applied',
          date: new Date().toLocaleDateString('en-GB'),
          timestamp: new Date().toISOString(),
          note: 'Application submitted via job board'
        },
        {
          status: 'Under Review',
          date: new Date().toLocaleDateString('en-GB'),
          timestamp: new Date().toISOString(),
          note: 'Application under review'
        }
      ],
      assignmentAnswers: {}
    };

    const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    console.log('Before saving - existing candidates:', savedCandidates.length);
    console.log('New candidate data:', candidateData);
    
    savedCandidates.push(candidateData);
    localStorage.setItem('candidates', JSON.stringify(savedCandidates));
    
    console.log('After saving - total candidates:', savedCandidates.length);
    console.log('Saved to localStorage with key "candidates"');

    // Reset form and close modal
    setApplicationFormData({ name: '', email: '', position: '', experience: '', location: '' });
    setShowApplicationForm(false);
    setSelectedJob(null);
    
    alert('Application submitted successfully!');
  };

  const handleTakeAssessment = (job) => {
    const assessment = getAssessmentByJobId(job.id);
    if (assessment) {
      setSelectedJob(job);
      setSelectedAssessment(assessment);
      setAssessmentResponses({});
      
      // Initialize visible questions (only non-conditional questions initially)
      const allQuestions = assessment.sections?.flatMap(section => section.questions || []) || [];
      const initialVisibleQuestions = allQuestions.filter(question => !question.conditional);
      setVisibleQuestions(initialVisibleQuestions);
      
      setShowAssessment(true);
    }
  };

  const handleAssessmentResponse = (questionId, value) => {
    setAssessmentResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmitAssessment = () => {
    // Get all questions from all sections
    const allQuestions = selectedAssessment.sections?.flatMap(section => section.questions || []) || [];
    
    // Validate all questions are answered
    const unansweredQuestions = allQuestions.filter(
      question => !assessmentResponses[question.id] || 
      (Array.isArray(assessmentResponses[question.id]) && assessmentResponses[question.id].length === 0) ||
      (typeof assessmentResponses[question.id] === 'string' && assessmentResponses[question.id].trim() === '')
    );

    if (unansweredQuestions.length > 0) {
      alert('Please answer all questions before submitting.');
      return;
    }

    // Save assessment response to localStorage
    const applicantInfo = appliedJobs.get(selectedJob.id)?.applicantInfo;
    
    // Find the candidate ID from the candidates array
    const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
    const candidate = savedCandidates.find(c => 
      c.email === applicantInfo?.email && 
      c.jobId === selectedJob.id
    );
    
    const assessmentResponse = {
      id: `response-${Date.now()}`,
      candidateId: candidate?.id || `candidate-${Date.now()}`, // Use existing candidate ID
      candidateName: applicantInfo?.name || 'Unknown',
      candidateEmail: applicantInfo?.email || 'unknown@example.com',
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      assessmentId: selectedAssessment.id,
      responses: assessmentResponses,
      submittedAt: new Date().toISOString(),
      status: 'completed',
      score: null,
      maxScore: null,
      feedback: null
    };

    const existingResponses = JSON.parse(localStorage.getItem('assessmentResponses') || '[]');
    existingResponses.push(assessmentResponse);
    localStorage.setItem('assessmentResponses', JSON.stringify(existingResponses));

    // Update applied jobs with assessment completion
    const updatedAppliedJobs = new Map(appliedJobs);
    const currentApplication = updatedAppliedJobs.get(selectedJob.id);
    updatedAppliedJobs.set(selectedJob.id, {
      ...currentApplication,
      assessmentCompleted: true,
      assessmentCompletedAt: new Date().toISOString()
    });
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem('appliedJobs', JSON.stringify([...updatedAppliedJobs.values()]));

    // Close assessment modal
    setShowAssessment(false);
    setSelectedJob(null);
    setSelectedAssessment(null);
    setAssessmentResponses({});
    
    alert('Thank you for submitting!');
  };

  const handleCloseAssessment = () => {
    setShowAssessment(false);
    setSelectedJob(null);
    setSelectedAssessment(null);
    setAssessmentResponses({});
  };

  const getStatusColor = (status) => {
    const colors = {
      'Applied': '#3b82f6',
      'Under Review': '#f59e0b',
      'Interview': '#8b5cf6',
      'Rejected': '#ef4444',
      'Hired': '#10b981'
    };
    return colors[status] || '#6b7280';
  };

  const departments = [...new Set(jobs.filter(job => !job.archived).map(job => job.department))];
  const employmentTypes = [...new Set(jobs.filter(job => !job.archived).map(job => job.employmentType))];

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="jobs-board-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-board-container">
      {/* Header */}
      <div className="jobs-board-header">
        <div className="header-content">
          <h1 className="header-title">
            <Link to="/" className="header-link">TalentFlow</Link>
          </h1>
          <p className="header-subtitle">Find your next career opportunity</p>
        </div>
        <button className="view-applications-btn">
          View My Applications
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search jobs by title, department, location, or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        
        <div className="filters-container">
          <select
            value={departmentFilter}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={employmentTypeFilter}
            onChange={(e) => handleFilterChange('employmentType', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            {employmentTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          
          <select className="filter-select">
            <option value="all">All Experience Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="section-navigation">
        <div className="section-tabs">
          <button
            className={`section-tab ${selectedSection === 'available' ? 'active' : ''}`}
            onClick={() => setSelectedSection('available')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
            Available Jobs ({jobs.filter(job => !job.archived && !appliedJobs.has(job.id)).length})
          </button>
          
          <button
            className={`section-tab ${selectedSection === 'applied' ? 'active' : ''}`}
            onClick={() => setSelectedSection('applied')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            Applied Jobs ({appliedJobs.size})
          </button>
          
          <button
            className={`section-tab ${selectedSection === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedSection('all')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            All Jobs ({jobs.filter(job => !job.archived).length})
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-container">
        {currentJobs.length > 0 ? (
          <div className="jobs-grid">
            {currentJobs.map(job => {
              const isApplied = appliedJobs.has(job.id);
              const applicationData = appliedJobs.get(job.id);
              const applicationStatus = applicationData?.status || 'Applied';
              
              return (
                <div key={job.id} className="job-card">
                  <div className="job-card-header">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-tags">
                      <span className="job-tag department-tag">{job.department}</span>
                      <span className="job-tag type-tag">{job.employmentType}</span>
                    </div>
                  </div>
                  
                  <div className="job-card-meta">
                    <div className="job-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="job-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                      <span>{job.salary?.min && job.salary?.max ? `$${job.salary.min} - $${job.salary.max}` : 'Salary not specified'}</span>
                    </div>
                  </div>
                  
                  <div className="job-card-footer">
                    <div className="job-posted-date">
                      Posted: {job.postedDate}
                    </div>
                    
                    <div className="job-card-actions">
                      <button 
                        className="view-details-btn"
                        onClick={() => handleViewJob(job)}
                      >
                        View Details
                      </button>
                      
                      {isApplied ? (
                        <div className="applied-status">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(applicationStatus) }}
                          >
                            {applicationStatus}
                          </span>
                          {selectedSection === 'applied' && getAssessmentByJobId(job.id) && (
                            <button 
                              className="assessment-btn"
                              onClick={() => handleTakeAssessment(job)}
                              disabled={appliedJobs.get(job.id)?.assessmentCompleted}
                            >
                              {appliedJobs.get(job.id)?.assessmentCompleted ? 'Assessment Completed' : 'Take Assessment'}
                            </button>
                          )}
                        </div>
                      ) : selectedSection !== 'applied' ? (
                        <button 
                          className="apply-now-btn"
                          onClick={() => handleApply(job.id)}
                        >
                          Apply Now
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-jobs">
            <div className="no-jobs-content">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <h3>No jobs found</h3>
              <p>Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowApplicationForm(false)}>
          <div className="application-form-modal">
            <div className="modal-header">
              <h2>Apply for {selectedJob.title}</h2>
              <button className="modal-close" onClick={() => setShowApplicationForm(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmitApplication}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={applicationFormData.name}
                    onChange={(e) => setApplicationFormData({...applicationFormData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    value={applicationFormData.email}
                    onChange={(e) => setApplicationFormData({...applicationFormData, email: e.target.value})}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Current Position *</label>
                  <input
                    type="text"
                    id="position"
                    value={applicationFormData.position}
                    onChange={(e) => setApplicationFormData({...applicationFormData, position: e.target.value})}
                    placeholder="Enter your current position"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience *</label>
                  <input
                    type="text"
                    id="experience"
                    value={applicationFormData.experience}
                    onChange={(e) => setApplicationFormData({...applicationFormData, experience: e.target.value})}
                    placeholder="e.g., 3"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    value={applicationFormData.location}
                    onChange={(e) => setApplicationFormData({...applicationFormData, location: e.target.value})}
                    placeholder="e.g., New York, NY"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowApplicationForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Taking Modal */}
      {showAssessment && selectedAssessment && selectedJob && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleCloseAssessment()}>
          <div className="assessment-modal">
            <div className="modal-header">
              <h2>Assessment: {selectedJob.title}</h2>
              <button className="modal-close" onClick={handleCloseAssessment}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="assessment-info">
                <p><strong>Instructions:</strong> Please answer all questions to complete the assessment.</p>
                <p><strong>Time:</strong> No time limit</p>
              </div>
              <div className="assessment-questions">
                {(() => {
                  // Flatten all questions from all sections
                  // Use the pre-calculated visible questions
                  
                  return visibleQuestions.map((question, index) => {
                    const QuestionComponent = {
                      'single-choice': SingleChoice,
                      'multi-choice': MultiChoice,
                      'short-text': ShortText,
                      'long-text': LongText,
                      'numeric-range': NumericRange,
                      'file-upload': FileUpload
                    }[question.type];

                    if (!QuestionComponent) return null;

                    return (
                      <div key={question.id} className="assessment-question">
                        <div className="question-header">
                          <span className="question-number">Question {index + 1}</span>
                          {question.conditional && (
                            <span className="conditional-indicator" style={{fontSize: '12px', color: '#666', marginLeft: '10px'}}>
                              (Conditional)
                            </span>
                          )}
                          {question.required && <span className="required-indicator">*</span>}
                        </div>
                        <div className="question-text">
                          <strong>{question.question || 'Untitled Question'}</strong>
                        </div>
                        <QuestionComponent
                          question={question}
                          value={assessmentResponses[question.id] || ''}
                          onChange={(value) => handleAssessmentResponse(question.id, value)}
                          isBuilder={false}
                        />
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseAssessment}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSubmitAssessment}>
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsBoard;
