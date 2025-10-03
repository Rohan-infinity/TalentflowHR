import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHRContext } from '../../context/HRContext';
import { useAssessmentContext } from '../../context/AssessmentContext';
import Sidebar from '../../components/hr/sidebar/Sidebar';
import './Candidates.css';

const Candidates = () => {
  const navigate = useNavigate();
  const { candidates, updateCandidateStatus, updateCandidateScore, loading } = useHRContext();
  const { getAssessmentById } = useAssessmentContext();
  
  
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [scoringData, setScoringData] = useState({});
  const [selectedStatusMenu, setSelectedStatusMenu] = useState('all');
  const [assessmentResponses, setAssessmentResponses] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);

  // Load assessment responses from localStorage
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem('assessmentResponses') || '[]');
    setAssessmentResponses(savedResponses);
  }, []);

  // Poll for assessment responses updates
  useEffect(() => {
    const pollInterval = setInterval(() => {
      try {
        const savedResponses = JSON.parse(localStorage.getItem('assessmentResponses') || '[]');
        if (JSON.stringify(savedResponses) !== JSON.stringify(assessmentResponses)) {
          console.log('New assessment responses found, updating...');
          setAssessmentResponses(savedResponses);
        }
      } catch (error) {
        console.error('Error polling for assessment responses:', error);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [assessmentResponses]);

  useEffect(() => {
    console.log('Filtering candidates:', candidates.length, 'candidates');
    let filtered = candidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      const matchesStatusMenu = selectedStatusMenu === 'all' || candidate.status === selectedStatusMenu;
      
      const matchesExperience = experienceFilter === 'all' || 
        (experienceFilter === 'entry' && parseInt(candidate.experience) <= 2) ||
        (experienceFilter === 'mid' && parseInt(candidate.experience) >= 3 && parseInt(candidate.experience) <= 5) ||
        (experienceFilter === 'senior' && parseInt(candidate.experience) >= 6);

      return matchesSearch && matchesStatus && matchesStatusMenu && matchesExperience;
    });

    setFilteredCandidates(filtered);
    
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [candidates, searchTerm, statusFilter, selectedStatusMenu, experienceFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCandidates = filteredCandidates.slice(startIndex, endIndex);

  const handleStatusUpdate = async (candidateId, newStatus) => {
    setActionLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateCandidateStatus(candidateId, newStatus);
    setActionLoading(false);
  };

  const handleViewAssignments = (candidate) => {
    setSelectedCandidate(candidate);
    setShowAssignmentModal(true);
    
    // Initialize scoring data for legacy assignment answers
    const initialScores = {};
    Object.keys(candidate.assignmentAnswers || {}).forEach(assignment => {
      initialScores[assignment] = candidate.assignmentAnswers[assignment].score || '';
    });
    setScoringData(initialScores);
  };

  const handleScoreUpdate = (assignmentName, score) => {
    setScoringData(prev => ({
      ...prev,
      [assignmentName]: score
    }));
  };

  const handleSaveScores = async () => {
    setActionLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update scores for each assignment
    Object.entries(scoringData).forEach(([assignmentName, score]) => {
      if (score !== '' && score !== null) {
        updateCandidateScore(selectedCandidate.id, assignmentName, parseInt(score));
      }
    });
    
    setActionLoading(false);
    setShowAssignmentModal(false);
    setSelectedCandidate(null);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Applied': 'status-applied',
      'Under Review': 'status-review',
      'Hired': 'status-hired',
      'Rejected': 'status-rejected'
    };
    return statusClasses[status] || 'status-default';
  };

  const getExperienceLevel = (experience) => {
    const years = parseInt(experience);
    if (years <= 2) return 'Entry Level';
    if (years <= 5) return 'Mid Level';
    return 'Senior Level';
  };

  const getCandidateAssessmentResponses = (candidate) => {
    return assessmentResponses.filter(response => 
      response.candidateEmail === candidate.email ||
      response.candidateName === candidate.name ||
      response.candidateId === candidate.id
    );
  };

  const getExperienceColor = (experience) => {
    const years = parseInt(experience);
    if (years <= 2) return 'experience-entry';
    if (years <= 5) return 'experience-mid';
    return 'experience-senior';
  };

  if (loading || candidates.length === 0) {
    return (
      <div className="hr-layout">
        <Sidebar />
        <div className="main-content">
          <div className="loading-container">
            <h2>Loading candidates...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <h1>Candidates Management</h1>
          <p>View, filter, and manage all candidate applications.</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search candidates by name, position, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          
          <div className="filter-controls">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select 
              value={experienceFilter} 
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Experience Levels</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior Level (6+ years)</option>
            </select>
          </div>
        </div>

        {/* Candidates List */}
        <div className="candidates-container">
          <div className="candidates-header">
            <h2>
              Candidates 
              <span className="candidate-count">({filteredCandidates.length})</span>
            </h2>
          </div>

          {/* Status Navigation */}
          <div className="status-navigation">
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('all')}
            >
              <div className="status-icon">👥</div>
              <span className="status-label">All</span>
              <span className="status-count">({candidates.length})</span>
            </button>
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'Applied' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('Applied')}
            >
              <div className="status-icon">📝</div>
              <span className="status-label">Applied</span>
              <span className="status-count">({candidates.filter(c => c.status === 'Applied').length})</span>
            </button>
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'Under Review' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('Under Review')}
            >
              <div className="status-icon">🔍</div>
              <span className="status-label">Under Review</span>
              <span className="status-count">({candidates.filter(c => c.status === 'Under Review').length})</span>
            </button>
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'Hired' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('Hired')}
            >
              <div className="status-icon">✅</div>
              <span className="status-label">Accepted</span>
              <span className="status-count">({candidates.filter(c => c.status === 'Hired').length})</span>
            </button>
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'Rejected' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('Rejected')}
            >
              <div className="status-icon">❌</div>
              <span className="status-label">Rejected</span>
              <span className="status-count">({candidates.filter(c => c.status === 'Rejected').length})</span>
            </button>
          </div>

          {filteredCandidates.length > 0 ? (
            <>
              <div className="candidates-list">
                {paginatedCandidates.map((candidate, index) => (
                <div key={candidate.id} className="candidate-card">
                  <div className="candidate-main-info">
                    <div className="candidate-avatar">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="candidate-details">
                      <h3>{candidate.name}</h3>
                      <p className="candidate-position">{candidate.position}</p>
                      <p className="candidate-email">{candidate.email}</p>
                      <p className="candidate-phone">{candidate.phone}</p>
                      <p className="candidate-location">{candidate.location}</p>
                    </div>
                  </div>

                  <div className="candidate-meta">
                    <div className="experience-section">
                      <span className={`experience-badge ${getExperienceColor(candidate.experience)}`}>
                        {candidate.experience} years
                      </span>
                      <span className="experience-level">{getExperienceLevel(candidate.experience)}</span>
                    </div>
                    
                    <div className="skills-section">
                      <h4>Skills:</h4>
                      <div className="skills-list">
                        {Array.isArray(candidate.skills) 
                          ? candidate.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">{skill}</span>
                            ))
                          : <span className="skill-tag">{candidate.skills || 'No skills listed'}</span>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="candidate-actions">
                    <div className="status-section">
                      <div className="status-info">
                        {candidate.marks !== null && candidate.marks !== undefined && (
                          <div className="candidate-marks">
                            {candidate.marks}/100
                          </div>
                        )}
                        <span className={`status-badge ${getStatusBadge(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      </div>
                      <p className="applied-date">Applied: {candidate.appliedDate}</p>
                    </div>
                    
                    <div className="action-buttons">
                      {candidate.status === 'Applied' && (
                        <button 
                          onClick={() => handleStatusUpdate(candidate.id, 'Under Review')}
                          className="btn-primary"
                          disabled={actionLoading}
                        >
                          Put Under Review
                        </button>
                      )}
                      
                      {candidate.status === 'Under Review' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(candidate.id, 'Hired')}
                            className="btn-success"
                            disabled={actionLoading}
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(candidate.id, 'Rejected')}
                            className="btn-danger"
                            disabled={actionLoading}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      
                      {candidate.status === 'Hired' && (
                        <button 
                          onClick={() => handleStatusUpdate(candidate.id, 'Under Review')}
                          className="btn-warning"
                          disabled={actionLoading}
                        >
                          Move to Review
                        </button>
                      )}
                      
                      {candidate.status === 'Rejected' && (
                        <button 
                          onClick={() => handleStatusUpdate(candidate.id, 'Under Review')}
                          className="btn-secondary"
                          disabled={actionLoading}
                        >
                          Restore
                        </button>
                      )}
                      
                      <button 
                        onClick={() => navigate(`/hr/candidates/${candidate.id}`)}
                        className="btn-profile"
                        disabled={actionLoading}
                      >
                        View Profile
                      </button>
                      
                      {((candidate.assignmentAnswers && Object.keys(candidate.assignmentAnswers).length > 0) || 
                        getCandidateAssessmentResponses(candidate).length > 0) && (
                        <button 
                          onClick={() => handleViewAssignments(candidate)}
                          className="btn-info"
                          disabled={actionLoading}
                        >
                          {getCandidateAssessmentResponses(candidate).length > 0 ? 'View Assessment' : 'View Assignments'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <div className="pagination-info">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredCandidates.length)} of {filteredCandidates.length} candidates
                </div>
                <div className="pagination-controls">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
          ) : (
            <div className="no-candidates">
              <div className="no-candidates-content">
                <h3>No candidates found</h3>
                <p>No candidates match your current filters.</p>
              </div>
            </div>
          )}
        </div>

        {/* Assignment Answers Modal */}
        {showAssignmentModal && selectedCandidate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Assignment Answers - {selectedCandidate.name}</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowAssignmentModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                {/* Legacy Assignment Answers */}
                {Object.entries(selectedCandidate.assignmentAnswers || {}).length > 0 && (
                  <div className="legacy-assignments">
                    <h3 className="section-title">Legacy Assignments</h3>
                    {Object.entries(selectedCandidate.assignmentAnswers || {}).map(([assignmentName, data]) => (
                      <div key={assignmentName} className="assignment-item">
                        <h4>{assignmentName}</h4>
                        <div className="assignment-details">
                          <p><strong>Submitted:</strong> {data.submittedDate}</p>
                          <p><strong>Current Score:</strong> {data.score ? `${data.score}/100` : 'Not scored'}</p>
                        </div>
                        
                        <div className="assignment-answer">
                          <h5>Answer:</h5>
                          <div className="answer-text">
                            {data.answer}
                          </div>
                        </div>
                        
                        <div className="scoring-section">
                          <label htmlFor={`score-${assignmentName}`}>
                            <strong>Score (0-100):</strong>
                          </label>
                          <input
                            type="number"
                            id={`score-${assignmentName}`}
                            min="0"
                            max="100"
                            value={scoringData[assignmentName] || ''}
                            onChange={(e) => handleScoreUpdate(assignmentName, e.target.value)}
                            className="score-input"
                            placeholder="Enter score"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Assessment Responses */}
                {(() => {
                  const candidateResponses = getCandidateAssessmentResponses(selectedCandidate);
                  return candidateResponses.length > 0 ? (
                    <div className="assessment-responses">
                      <h3 className="section-title">Assessment Responses</h3>
                      <p className="assessment-info">
                        Showing {candidateResponses.length} assessment response(s) for this candidate
                      </p>
                      {candidateResponses.map((response) => {
                        const assessment = getAssessmentById(response.assessmentId);
                        console.log('Assessment found:', assessment ? 'Yes' : 'No');
                        console.log('Assessment ID:', response.assessmentId);
                        console.log('Assessment:', assessment);
                        return (
                          <div key={response.id} className="assessment-response-item">
                            <div className="assessment-header">
                              <h4>{response.jobTitle} - Assessment</h4>
                              <p><strong>Submitted:</strong> {new Date(response.submittedAt).toLocaleDateString()}</p>
                              <p><strong>Job ID:</strong> {response.jobId}</p>
                            </div>
                            
                            <div className="assessment-questions-responses">
                              {assessment ? (
                                assessment.sections?.flatMap(section => section.questions || []).map((question) => {
                                  const answer = response.responses[question.id];
                                  return (
                                    <div key={question.id} className="question-response">
                                      <div className="question-text">
                                        <strong>Q: {question.question}</strong>
                                      </div>
                                      <div className="answer-content">
                                        <strong>A: </strong>
                                        {(() => {
                                          // Handle different answer types and convert option values to text
                                          if (typeof answer === 'object' && answer !== null) {
                                            return JSON.stringify(answer);
                                          }
                                          
                                          // Handle based on question type
                                          if (question.type === 'multi-choice') {
                                            // Debug logging
                                            console.log('Multi-choice question detected');
                                            console.log('Answer:', answer);
                                            console.log('Answer type:', typeof answer);
                                            console.log('Is array:', Array.isArray(answer));
                                            
                                            // For multi-choice questions, handle array answers
                                            let answerArray = answer;
                                            if (Array.isArray(answer)) {
                                              answerArray = answer;
                                              console.log('Using answer as array:', answerArray);
                                            } else if (typeof answer === 'string' && answer.startsWith('[') && answer.endsWith(']')) {
                                              // Handle case where array is stored as string
                                              try {
                                                answerArray = JSON.parse(answer);
                                                console.log('Parsed string array:', answerArray);
                                              } catch (e) {
                                                answerArray = [answer];
                                                console.log('Failed to parse, using as single item:', answerArray);
                                              }
                                            } else {
                                              answerArray = [answer];
                                              console.log('Converted to array:', answerArray);
                                            }
                                            
                                            // Convert option values to text
                                            const result = answerArray.map(optionValue => {
                                              const option = question.options?.find(opt => opt.value === optionValue);
                                              console.log('Converting:', optionValue, 'to:', option ? option.text : optionValue);
                                              return option ? option.text : optionValue;
                                            }).join(', ');
                                            
                                            console.log('Final multi-choice result:', result);
                                            return result;
                                          } else if (question.type === 'single-choice') {
                                            // For single-choice questions, convert single option value to text
                                            const option = question.options?.find(opt => opt.value === answer);
                                            return option ? option.text : answer;
                                          } else {
                                            // For other question types (text, numeric, etc.), return as-is
                                            return String(answer || 'No answer provided');
                                          }
                                        })()}
                                      </div>
                                    </div>
                                  );
                                }) || []
                              ) : (
                                <div className="no-assessment-found">
                                  <p>Assessment template not found. Showing raw responses:</p>
                                  {Object.entries(response.responses || {}).map(([questionId, answer]) => (
                                    <div key={questionId} className="question-response">
                                      <div className="question-text">
                                        <strong>Q: Question {questionId}</strong>
                                      </div>
                                      <div className="answer-content">
                                        <strong>A: </strong>
                                        {(() => {
                                          // Handle different answer types and convert option values to text
                                          if (typeof answer === 'object' && answer !== null) {
                                            return JSON.stringify(answer);
                                          }
                                          
                                          // For fallback display, try to convert option values to text
                                          if (Array.isArray(answer)) {
                                            // For array answers, try to convert option values
                                            return answer.map(optionValue => {
                                              // Try to find matching option in any available question
                                              // This is a fallback, so we'll just return the value if no conversion possible
                                              return optionValue;
                                            }).join(', ');
                                          } else if (typeof answer === 'string') {
                                            // For string answers, return as-is (no option conversion in fallback)
                                            return answer;
                                          }
                                          return String(answer || 'No answer provided');
                                        })()}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : null;
                })()}

                {/* No data message */}
                {Object.entries(selectedCandidate.assignmentAnswers || {}).length === 0 && 
                 getCandidateAssessmentResponses(selectedCandidate).length === 0 && (
                  <div className="no-data">
                    <p>No assignments or assessments found for this candidate.</p>
                  </div>
                )}
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowAssignmentModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleSaveScores}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Saving...' : 'Save Scores'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
