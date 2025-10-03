import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHRContext } from '../../context/HRContext';
import { useAssessmentContext } from '../../context/AssessmentContext';
import AssessmentBuilder from '../../components/assessments/AssessmentBuilder';
import LivePreview from '../../components/assessments/LivePreview';
import './JobDetail.css';

const HRJobDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getJobBySlug, getJobWithApplicantCount, candidates } = useHRContext();
  const { getAssessmentsByJob } = useAssessmentContext();
  
  const [showAssessmentBuilder, setShowAssessmentBuilder] = useState(false);
  const [showAssessmentPreview, setShowAssessmentPreview] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundJob = getJobBySlug(slug);
    if (foundJob) {
      const jobWithApplicants = getJobWithApplicantCount(foundJob);
      setJob(jobWithApplicants);
    }
    setLoading(false);
  }, [slug, getJobBySlug, getJobWithApplicantCount]);

  // Get candidates who applied for this job
  const getJobApplicants = (jobTitle) => {
    console.log('getJobApplicants called with jobTitle:', jobTitle);
    console.log('Current job:', job);
    console.log('All candidates:', candidates.length);
    
    const filtered = candidates.filter(candidate => 
      (candidate.jobTitle === jobTitle || candidate.position === jobTitle || candidate.jobId === job?.id) && 
      (candidate.status === 'Applied' || candidate.status === 'Under Review' || candidate.status === 'Hired')
    );
    
    console.log('Filtered candidates for job:', filtered.length);
    console.log('Filtered candidates:', filtered);
    
    return filtered;
  };

  const handleEditJob = () => {
    navigate('/hr/create-job', { state: { editJob: job } });
  };

  const handleCreateAssessment = () => {
    setShowAssessmentBuilder(true);
  };

  const handlePreviewAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setShowAssessmentPreview(true);
  };

  const handleAssessmentSaved = () => {
    setShowAssessmentBuilder(false);
  };

  const handleAssessmentCancelled = () => {
    setShowAssessmentBuilder(false);
  };

  const handleClosePreview = () => {
    setShowAssessmentPreview(false);
    setSelectedAssessment(null);
  };

  const handleBackToJobs = () => {
    navigate('/hr/jobs');
  };

  if (loading) {
    return (
      <div className="hr-job-detail-container">
        <div className="loading">Loading job details...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="hr-job-detail-container">
        <div className="error">
          <h2>Job Not Found</h2>
          <p>The job you're looking for doesn't exist or has been removed.</p>
          <button onClick={handleBackToJobs} className="btn-primary">
            Back to Manage Jobs
          </button>
        </div>
      </div>
    );
  }

  const jobApplicants = getJobApplicants(job.title);

  return (
    <div className="hr-job-detail-container">
      <div className="hr-job-detail-header">
        <button 
          onClick={handleBackToJobs} 
          className="back-button"
        >
          ← Back to Manage Jobs
        </button>
        
        <div className="job-title-section">
          <h1>{job.title}</h1>
          <div className="job-badges">
            <span className={`status-badge ${job.status}`}>
              {job.status.toUpperCase()}
            </span>
            <span className={`type-badge ${job.employmentType}`}>
              {job.employmentType.replace('-', ' ')}
            </span>
          </div>
        </div>
        
        <div className="job-meta">
          <div className="job-info">
            <span className="department">📋 {job.department}</span>
            <span className="location">📍 {job.location}</span>
            <span className="salary">
              💰 ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}
            </span>
          </div>
          <div className="job-stats">
            <span className="posted-date">Posted: {job.postedDate}</span>
            <span className="applicant-count">
              {job.applicants || 0} applicants
            </span>
          </div>
        </div>

        <div className="job-actions">
          <button onClick={handleEditJob} className="edit-button">
            Edit Job
          </button>
          <button onClick={handleCreateAssessment} className="assessment-button">
            Create Assessment
          </button>
        </div>
      </div>

      <div className="hr-job-detail-content">
        <div className="job-description">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="job-requirements">
          <h2>Requirements</h2>
          <ul>
            {Array.isArray(job.requirements) ? (
              job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))
            ) : (
              job.requirements?.split('\n').filter(req => req.trim()).map((requirement, index) => (
                <li key={index}>{requirement.trim()}</li>
              ))
            )}
          </ul>
        </div>

        <div className="job-perks">
          <h2>Perks & Benefits</h2>
          <ul>
            {Array.isArray(job.perks) ? (
              job.perks.map((perk, index) => (
                <li key={index}>{perk}</li>
              ))
            ) : (
              job.benefits?.split('\n').filter(benefit => benefit.trim()).map((benefit, index) => (
                <li key={index}>{benefit.trim()}</li>
              ))
            )}
          </ul>
        </div>

        <div className="job-skills">
          <h2>Required Skills</h2>
          <div className="skills-tags">
            {Array.isArray(job.skills) ? (
              job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))
            ) : (
              job.skills?.split(',').filter(skill => skill.trim()).map((skill, index) => (
                <span key={index} className="skill-tag">{skill.trim()}</span>
              ))
            )}
          </div>
        </div>

        {/* Assessments Section */}
        {job && (() => {
          const jobAssessments = getAssessmentsByJob(job.id);
          return jobAssessments.length > 0 && (
            <div className="assessments-section">
              <h2>Assessments ({jobAssessments.length})</h2>
              <div className="assessments-list">
                {jobAssessments.map((assessment) => (
                  <div key={assessment.id} className="assessment-card">
                    <div className="assessment-info">
                      <h3>{assessment.title}</h3>
                      <p className="assessment-description">{assessment.description}</p>
                      <div className="assessment-meta">
                        <span className="question-count">
                          {assessment.sections.reduce((total, section) => total + section.questions.length, 0)} questions
                        </span>
                        <span className="section-count">
                          {assessment.sections.length} sections
                        </span>
                      </div>
                    </div>
                    <div className="assessment-actions">
                      <button 
                        onClick={() => handlePreviewAssessment(assessment)}
                        className="preview-button"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      <div className="candidates-section">
        <h2>Applied Candidates ({jobApplicants.length})</h2>
        {jobApplicants.length > 0 ? (
          <div className="candidates-list">
            {jobApplicants.map((candidate) => (
              <div key={candidate.id} className="candidate-card">
                <div className="candidate-info">
                  <h3>{candidate.name}</h3>
                  <p className="candidate-email">{candidate.email}</p>
                  <p className="candidate-experience">{candidate.experience}</p>
                  <p className="candidate-location">{candidate.location}</p>
                </div>
                <div className="candidate-status">
                  <span className={`status-badge ${candidate.status.toLowerCase().replace(' ', '-')}`}>
                    {candidate.status}
                  </span>
                  <p className="applied-date">Applied: {candidate.appliedDate}</p>
                </div>
                <div className="candidate-skills">
                  {candidate.skills?.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  {candidate.skills?.length > 3 && (
                    <span className="skill-tag more">+{candidate.skills.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-candidates">
            <p>No candidates have applied for this position yet.</p>
          </div>
        )}
      </div>

      {/* Assessment Builder Modal */}
      {showAssessmentBuilder && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleAssessmentCancelled()}>
          <div className="modal-content assessment-builder-modal">
            <AssessmentBuilder
              jobId={job.id}
              onSave={handleAssessmentSaved}
              onCancel={handleAssessmentCancelled}
            />
          </div>
        </div>
      )}

      {/* Assessment Preview Modal */}
      {showAssessmentPreview && selectedAssessment && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClosePreview()}>
          <div className="modal-content assessment-preview-modal">
            <div className="modal-header">
              <h2>Assessment Preview: {selectedAssessment.title}</h2>
              <button onClick={handleClosePreview} className="close-button">×</button>
            </div>
            <div className="modal-body">
              <LivePreview assessment={selectedAssessment} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRJobDetail;
