import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHRContext } from '../../context/HRContext';
import Sidebar from '../../components/hr/sidebar/Sidebar';
import './CandidateProfile.css';

const CandidateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCandidateById, updateCandidateStatus } = useHRContext();
  
  const candidate = getCandidateById(id);

  if (!candidate) {
    return (
      <div className="candidate-profile-container">
        <Sidebar />
        <div className="main-content">
          <div className="not-found">
            <h1>Candidate Not Found</h1>
            <p>The candidate you're looking for doesn't exist.</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/hr/candidates')}
            >
              Back to Candidates
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    updateCandidateStatus(candidate.id, newStatus);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Applied': '#3182ce',
      'Under Review': '#ed8936',
      'Interview Scheduled': '#9f7aea',
      'Hired': '#38a169',
      'Rejected': '#e53e3e'
    };
    return colors[status] || '#4a5568';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Applied': '📝',
      'Under Review': '👀',
      'Interview Scheduled': '📅',
      'Hired': '✅',
      'Rejected': '❌'
    };
    return icons[status] || '📋';
  };

  return (
    <div className="candidate-profile-container">
      <Sidebar />
      <div className="main-content">
        <div className="profile-header">
          <button 
            className="back-btn"
            onClick={() => navigate('/hr/candidates')}
          >
            ← Back to Candidates
          </button>
          <div className="candidate-info">
            <div className="candidate-avatar">
              {candidate.name.charAt(0)}
            </div>
            <div className="candidate-details">
              <h1>{candidate.name}</h1>
              <p className="candidate-email">{candidate.email}</p>
              <p className="candidate-position">{candidate.position}</p>
              <div className="candidate-meta">
                <span className="location">📍 {candidate.location}</span>
                <span className="experience">💼 {candidate.experience}</span>
                <span className="phone">📞 {candidate.phone}</span>
              </div>
            </div>
            <div className="status-section">
              <div 
                className="current-status"
                style={{ backgroundColor: getStatusColor(candidate.status) }}
              >
                <span className="status-icon">{getStatusIcon(candidate.status)}</span>
                <span className="status-text">{candidate.status}</span>
              </div>
              <div className="status-actions">
                <select 
                  value={candidate.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="status-select"
                >
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-grid">
            {/* Skills Section */}
            <div className="profile-section">
              <h2>Skills</h2>
              <div className="skills-list">
                {Array.isArray(candidate.skills) 
                  ? candidate.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))
                  : <span className="skill-tag">{candidate.skills || 'No skills listed'}</span>
                }
              </div>
            </div>

            {/* Assignment Answers Section */}
            <div className="profile-section">
              <h2>Assignment Responses</h2>
              {candidate.assignmentAnswers && Object.keys(candidate.assignmentAnswers).length > 0 ? (
                Object.entries(candidate.assignmentAnswers).map(([assignmentName, assignment]) => (
                <div key={assignmentName} className="assignment-item">
                  <div className="assignment-header">
                    <h3>{assignmentName}</h3>
                    <div className="assignment-meta">
                      <span className="submitted-date">
                        Submitted: {assignment.submittedDate}
                      </span>
                      {assignment.score !== null && (
                        <span className="assignment-score">
                          Score: {assignment.score}/100
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="assignment-answer">
                    <p>{assignment.answer}</p>
                  </div>
                </div>
                ))
              ) : (
                <div className="no-assignments">
                  <p>No assignment responses available for this candidate.</p>
                </div>
              )}
            </div>

            {/* Status Timeline Section */}
            <div className="profile-section timeline-section">
              <h2>Status Timeline</h2>
              <div className="timeline">
                {candidate.statusHistory.map((entry, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      <span className="marker-icon">{getStatusIcon(entry.status)}</span>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h3 className="timeline-status">{entry.status}</h3>
                        <span className="timeline-date">{entry.date}</span>
                      </div>
                      <p className="timeline-note">{entry.note}</p>
                      <span className="timeline-time">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;

