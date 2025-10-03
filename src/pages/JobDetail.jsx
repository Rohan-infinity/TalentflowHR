import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHRContext } from '../context/HRContext';
import './JobDetail.css';

const JobDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getJobBySlug, getJobWithApplicantCount, loading } = useHRContext();
  
  const [job, setJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Map());
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const foundJob = getJobBySlug(slug);
    if (foundJob) {
      const jobWithApplicants = getJobWithApplicantCount(foundJob);
      setJob(jobWithApplicants);
    }
  }, [slug, getJobBySlug, getJobWithApplicantCount]);

  // Load applied jobs from localStorage
  useEffect(() => {
    const savedApplications = localStorage.getItem('appliedJobs');
    if (savedApplications) {
      try {
        const parsedApplications = JSON.parse(savedApplications);
        const appliedJobsMap = new Map();
        parsedApplications.forEach(jobData => {
          if (typeof jobData === 'object' && jobData.jobId) {
            appliedJobsMap.set(jobData.jobId, jobData);
          }
        });
        setAppliedJobs(appliedJobsMap);
      } catch (error) {
        console.error('Error parsing saved applications:', error);
        setAppliedJobs(new Map());
      }
    }
  }, []);

  const handleApply = () => {
    if (!job) return;
    
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      const newAppliedJobs = new Map(appliedJobs);
      newAppliedJobs.set(job.id, { 
        jobId: job.id, 
        status: 'Applied', 
        appliedDate: new Date().toISOString() 
      });
      
      // Save to localStorage
      const applicationsArray = Array.from(newAppliedJobs.values());
      localStorage.setItem('appliedJobs', JSON.stringify(applicationsArray));
      
      setAppliedJobs(newAppliedJobs);
      setIsApplying(false);
      
      // Show success message
      alert('Application submitted successfully!');
    }, 1000);
  };

  const isApplied = job ? appliedJobs.has(job.id) : false;
  const applicationStatus = isApplied ? appliedJobs.get(job.id)?.status : null;

  if (loading) {
    return (
      <div className="job-detail-container">
        <div className="loading">Loading job details...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-detail-container">
        <div className="error">
          <h2>Job Not Found</h2>
          <p>The job you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/jobs-board')} className="btn-primary">
            Back to Jobs Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-detail-container">
      <div className="job-detail-header">
        <button 
          onClick={() => navigate('/jobs-board')} 
          className="back-button"
        >
          ← Back to Jobs
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
      </div>

      <div className="job-detail-content">
        <div className="job-description">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="job-requirements">
          <h2>Requirements</h2>
          <ul>
            {job.requirements?.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="job-perks">
          <h2>Perks & Benefits</h2>
          <ul>
            {job.perks?.map((perk, index) => (
              <li key={index}>{perk}</li>
            ))}
          </ul>
        </div>

        <div className="job-skills">
          <h2>Required Skills</h2>
          <div className="skills-tags">
            {job.skills?.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="job-detail-footer">
        {isApplied ? (
          <div className="applied-status">
            <span className="status-badge applied">
              {applicationStatus}
            </span>
            <p>You have already applied for this position.</p>
          </div>
        ) : (
          <button 
            onClick={handleApply}
            disabled={isApplying}
            className="apply-button"
          >
            {isApplying ? 'Applying...' : 'Apply Now'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetail;

