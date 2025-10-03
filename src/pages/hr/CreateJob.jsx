import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHRContext } from '../../context/HRContext';
import { useAssessmentContext } from '../../context/AssessmentContext';
import Sidebar from '../../components/hr/sidebar/Sidebar';
import AssessmentBuilder from '../../components/assessments/AssessmentBuilder';
import './CreateJob.css';

const CreateJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addJob, updateJob } = useHRContext();
  const { getAssessmentsByJob } = useAssessmentContext();
  
  const editJob = location.state?.editJob;
  const isEditing = !!editJob;
  
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: '',
      max: ''
    },
    description: '',
    requirements: '',
    benefits: '',
    skills: [],
    assignments: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // 1: Job Details, 2: Assessment
  const [showAssessmentBuilder, setShowAssessmentBuilder] = useState(false);
  const [createdJobId, setCreatedJobId] = useState(null);

  // Populate form with edit data
  useEffect(() => {
    if (editJob) {
      setFormData({
        title: editJob.title || '',
        department: editJob.department || '',
        location: editJob.location || '',
        employmentType: editJob.employmentType || 'full-time',
        experienceLevel: 'mid', // Default since not in original data
        salary: {
          min: editJob.salary?.min || '',
          max: editJob.salary?.max || ''
        },
        description: editJob.description || '',
        requirements: editJob.requirements?.join('\n') || '',
        benefits: editJob.perks?.join('\n') || '',
        skills: editJob.skills || [],
        assignments: editJob.assignments || []
      });
    }
  }, [editJob]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      // Step 1: Save job details and move to assessment creation
      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        employmentType: formData.employmentType,
        experienceLevel: formData.experienceLevel,
        salary: formData.salary,
        description: formData.description,
        requirements: formData.requirements,
        benefits: formData.benefits,
        skills: formData.skills,
        assignments: formData.assignments
      };
      
      let savedJob;
      if (isEditing) {
        // Update existing job
        updateJob(editJob.id, jobData);
        savedJob = { ...editJob, ...jobData };
      } else {
        // Add new job
        savedJob = addJob(jobData);
      }
      
      setCreatedJobId(savedJob.id);
      setCurrentStep(2);
    }
  };

  const handleSkipAssessment = () => {
    navigate('/hr/jobs');
  };

  const handleCreateAssessment = () => {
    setShowAssessmentBuilder(true);
  };

  const handleAssessmentSaved = () => {
    setShowAssessmentBuilder(false);
    alert('Assessment created successfully!');
    navigate('/hr/jobs');
  };

  const handleAssessmentCancelled = () => {
    setShowAssessmentBuilder(false);
  };

  const employmentTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6+ years)' },
    { value: 'lead', label: 'Lead/Principal (8+ years)' }
  ];


  // Show assessment builder if requested
  if (showAssessmentBuilder && createdJobId) {
    return (
      <AssessmentBuilder
        jobId={createdJobId}
        onSave={handleAssessmentSaved}
        onCancel={handleAssessmentCancelled}
      />
    );
  }

  return (
    <div className="hr-layout">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <div className="header-content">
            <h1>{isEditing ? 'Edit Job Posting' : 'Create Job Posting'}</h1>
            <p>{isEditing ? 'Update the job posting details below.' : 'Fill out the form below to create a new job posting with optional assessments.'}</p>
          </div>
          
          {/* Step Indicator */}
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Job Details</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Assessment (Optional)</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Job Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="engineering">Engineering</option>
                  <option value="product">Product</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., San Francisco, CA or Remote"
                />
              </div>

              <div className="form-group">
                <label htmlFor="employmentType">Employment Type *</label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  required
                >
                  {employmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experienceLevel">Experience Level *</label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  required
                >
                  {experienceLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="salary.min">Salary Range (Min)</label>
                <input
                  type="number"
                  id="salary.min"
                  name="salary.min"
                  value={formData.salary.min}
                  onChange={handleInputChange}
                  placeholder="e.g., 80000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="salary.max">Salary Range (Max)</label>
                <input
                  type="number"
                  id="salary.max"
                  name="salary.max"
                  value={formData.salary.max}
                  onChange={handleInputChange}
                  placeholder="e.g., 120000"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Job Description & Requirements</h2>
            <div className="form-group">
              <label htmlFor="description">Job Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Describe the role, responsibilities, and what the candidate will be working on..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">Requirements *</label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="List the required qualifications, skills, and experience..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="benefits">Benefits & Perks</label>
              <textarea
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                rows="3"
                placeholder="List benefits, perks, and what makes your company great to work for..."
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Required Skills</h2>
            <div className="skills-container">
              <div className="skills-input">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., React, Python, Leadership)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
                <button type="button" onClick={handleAddSkill} className="btn-add">
                  Add Skill
                </button>
              </div>
              <div className="skills-list">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="skill-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>


          <div className="form-actions">
            {currentStep === 1 ? (
              <>
                <button type="submit" className="btn-primary btn-large">
                  {isEditing ? 'Update Job Posting' : 'Create Job Posting & Continue'}
                </button>
                <button type="button" className="btn-secondary btn-large">
                  Save as Draft
                </button>
              </>
            ) : (
              <div className="assessment-actions">
                <h2>Create Assessment (Optional)</h2>
                <p>You can create an assessment to evaluate candidates for this position.</p>
                
                <div className="assessment-buttons">
                  <button 
                    type="button" 
                    onClick={handleCreateAssessment}
                    className="btn-primary btn-large"
                  >
                    Create Assessment
                  </button>
                  <button 
                    type="button" 
                    onClick={handleSkipAssessment}
                    className="btn-secondary btn-large"
                  >
                    Skip Assessment
                  </button>
                </div>
                
                <div className="existing-assessments">
                  {createdJobId && getAssessmentsByJob(createdJobId).length > 0 && (
                    <>
                      <h3>Existing Assessments</h3>
                      <div className="assessments-list">
                        {getAssessmentsByJob(createdJobId).map(assessment => (
                          <div key={assessment.id} className="assessment-item">
                            <span className="assessment-title">{assessment.title}</span>
                            <span className="assessment-questions">
                              {assessment.sections.reduce((total, section) => total + section.questions.length, 0)} questions
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
