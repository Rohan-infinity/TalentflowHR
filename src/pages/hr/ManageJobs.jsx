import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useHRContext } from '../../context/HRContext';
import Sidebar from '../../components/hr/sidebar/Sidebar';
import './ManageJobs.css';

const ManageJobs = () => {
  const navigate = useNavigate();
  const { 
    jobs, 
    candidates,
    loading, 
    archiveJob, 
    unarchiveJob, 
    deleteJob,
    getJobWithApplicantCount
  } = useHRContext();
  
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedStatusMenu, setSelectedStatusMenu] = useState('active');
  const [isDragging, setIsDragging] = useState(false);
  const [originalOrder, setOriginalOrder] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle click outside modal to close
  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowJobModal(false);
      setSelectedJob(null);
    }
  };

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && job.status === 'active') ||
        (statusFilter === 'archived' && job.archived);
      
      const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
      
      // Status menu filter
      const matchesStatusMenu = selectedStatusMenu === 'all' || 
        (selectedStatusMenu === 'active' && !job.archived) ||
        (selectedStatusMenu === 'archived' && job.archived);

      return matchesSearch && matchesStatus && matchesDepartment && matchesStatusMenu;
    });

    // Add real-time applicant counts to each job
    const jobsWithApplicants = filtered.map(job => getJobWithApplicantCount(job));
    setFilteredJobs(jobsWithApplicants);
    
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [jobs, candidates, searchTerm, statusFilter, departmentFilter, selectedStatusMenu, getJobWithApplicantCount]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const handleArchiveJob = (jobId) => {
    archiveJob(jobId);
  };

  const handleUnarchiveJob = (jobId) => {
    unarchiveJob(jobId);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      deleteJob(jobId);
    }
  };

  const handleViewJob = (job) => {
    // Navigate to HR job detail page using slug
    navigate(`/hr/jobs/${job.slug}`);
  };

  const handleEditJob = (job) => {
    // Navigate to create job page with job data as state
    navigate('/hr/create-job', { state: { editJob: job } });
  };

  const getJobApplicants = (jobTitle) => {
    return candidates.filter(candidate => candidate.position === jobTitle);
  };

  // Handle drag and drop reordering
  const handleDragEnd = async (event) => {
    setIsDragging(false);
    
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return; // No change in position
    }

    const sourceIndex = paginatedJobs.findIndex(job => job.id.toString() === active.id);
    const destinationIndex = paginatedJobs.findIndex(job => job.id.toString() === over.id);

    if (sourceIndex === -1 || destinationIndex === -1) {
      return; // Invalid indices
    }

    // Store original order for rollback
    setOriginalOrder([...filteredJobs]);

    // Calculate actual indices in the full filtered list
    const actualSourceIndex = startIndex + sourceIndex;
    const actualDestinationIndex = startIndex + destinationIndex;

    // Optimistic update - immediately update the UI
    const newJobs = arrayMove(filteredJobs, actualSourceIndex, actualDestinationIndex);
    setFilteredJobs(newJobs);

    try {
      // Simulate API call to update order
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call an API here to persist the new order
      console.log(`Moved job from position ${actualSourceIndex} to ${actualDestinationIndex}`);
      
      // Success - no rollback needed
      setOriginalOrder([]);
    } catch (error) {
      // Rollback on failure
      console.error('Failed to reorder jobs:', error);
      setFilteredJobs(originalOrder);
      alert('Failed to reorder jobs. Changes have been reverted.');
    }
  };

  const handleDragStart = (event) => {
    setIsDragging(true);
  };


  // Sortable Job Card Component
  const SortableJobCard = ({ job, ...props }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: isItemDragging,
    } = useSortable({ id: job.id.toString() });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`job-card ${job.archived ? 'archived' : ''} ${isItemDragging ? 'dragging' : ''} ${isDragging ? 'drag-active' : ''}`}
      >
        <div 
          {...attributes}
          {...listeners}
          className="drag-handle-area"
        />

                  <div className="job-content">
                    <div className="job-details">
                      <div className="job-title-section">
                        <h3 className="job-title">{job.title}</h3>
                        <span className="job-status-badge">{job.status.toUpperCase()}</span>
                      </div>
                      <div className="job-info">
                        <span className="department">{job.department}</span>
                        <span className="location">📍 {job.location}</span>
                        <span className="salary">
                          💰 ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}
                        </span>
                      </div>
                      <div className="job-meta">
                        <span className="posted-date">Posted: {job.postedDate}</span>
                        <span className="applicant-count">
                          <span className="live-indicator">●</span>
                          {job.applicants || 0} applicants
                        </span>
                      </div>
                    </div>

                    <div className="job-actions">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewJob(job)}
                      >
                        View
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditJob(job)}
                      >
                        Edit
                      </button>
                      {job.archived ? (
                        <button 
                          className="action-btn unarchive-btn"
                          onClick={() => handleUnarchiveJob(job.id)}
                        >
                          Unarchive
                        </button>
                      ) : (
                        <button 
                          className="action-btn archive-btn"
                          onClick={() => handleArchiveJob(job.id)}
                        >
                          Archive
                        </button>
                      )}
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="manage-jobs-container">
        <Sidebar />
        <div className="main-content">
          <div className="loading">Loading jobs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-jobs-container">
      <Sidebar />
      <div className="main-content">
        <div className="page-header">
          <h1>Manage Jobs</h1>
          <p>View and manage all job postings</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

        </div>

        {/* Jobs List */}
        <div className="jobs-section">
          <div className="jobs-header">
            <h2>
              {selectedStatusMenu === 'active' ? 'Active Jobs' : 
               selectedStatusMenu === 'archived' ? 'Archived Jobs' : 'All Jobs'} 
              <span className="job-count">({filteredJobs.length})</span>
            </h2>
          </div>

          {/* Status Navigation */}
          <div className="status-navigation">
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'active' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('active')}
            >
              <span className="nav-icon">📋</span>
              Active Jobs
              <span className="nav-count">
                ({jobs.filter(job => !job.archived).length})
              </span>
            </button>
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'archived' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('archived')}
            >
              <span className="nav-icon">📦</span>
              Archived Jobs
              <span className="nav-count">
                ({jobs.filter(job => job.archived).length})
              </span>
            </button>
            <button 
              className={`status-nav-item ${selectedStatusMenu === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedStatusMenu('all')}
            >
              <span className="nav-icon">🔍</span>
              All Jobs
              <span className="nav-count">
                ({jobs.length})
              </span>
            </button>
          </div>

          {filteredJobs.length > 0 ? (
            <>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={paginatedJobs.map(job => job.id.toString())}
                  strategy={verticalListSortingStrategy}
                >
                  <div className={`jobs-list ${isDragging ? 'dragging-over' : ''}`}>
                    {paginatedJobs.map((job) => (
                      <SortableJobCard
                        key={job.id}
                        job={job}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination">
                  <div className="pagination-info">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} jobs
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
            <div className="no-jobs">
              <h3>No jobs found</h3>
              <p>
                {selectedStatusMenu === 'archived' 
                  ? 'No archived jobs match your search criteria.' 
                  : selectedStatusMenu === 'active'
                  ? 'No active jobs match your search criteria.'
                  : 'No jobs match your search criteria.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div className="modal-overlay" onClick={handleModalOverlayClick}>
          <div className="modal-content job-details-modal">
            <div className="modal-header">
              <h2>{selectedJob.title}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowJobModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="job-details-grid">
                <div className="job-details-main">
                  <div className="job-details-section">
                    <h3>Job Information</h3>
                    <div className="job-info-grid">
                      <div className="info-item">
                        <span className="info-label">Department:</span>
                        <span className="info-value">{selectedJob.department}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Location:</span>
                        <span className="info-value">{selectedJob.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Employment Type:</span>
                        <span className="info-value">{selectedJob.employmentType.replace('-', ' ')}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Salary Range:</span>
                        <span className="info-value">
                          ${selectedJob.salary?.min?.toLocaleString()} - ${selectedJob.salary?.max?.toLocaleString()}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Posted Date:</span>
                        <span className="info-value">{selectedJob.postedDate}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Status:</span>
                        <span className="info-value">{selectedJob.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="job-details-section">
                    <h3>Job Description</h3>
                    <p className="job-description">{selectedJob.description}</p>
                  </div>

                  <div className="job-details-section">
                    <h3>Requirements</h3>
                    <ul className="requirements-list">
                      {selectedJob.requirements?.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="job-details-section">
                    <h3>Perks & Benefits</h3>
                    <ul className="perks-list">
                      {selectedJob.perks?.map((perk, index) => (
                        <li key={index}>{perk}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="job-details-section">
                    <h3>Required Skills</h3>
                    <div className="skills-tags">
                      {selectedJob.skills?.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="job-details-section">
                    <h3>Applied Candidates ({selectedJob.applicants || 0})</h3>
                    <div className="applicants-list">
                      {getJobApplicants(selectedJob.title).length > 0 ? (
                        getJobApplicants(selectedJob.title).map((candidate, index) => (
                          <div key={index} className="applicant-item">
                            <div className="applicant-info">
                              <div className="applicant-avatar">
                                {candidate.name.charAt(0)}
                              </div>
                              <div className="applicant-details">
                                <h4>{candidate.name}</h4>
                                <p>{candidate.email}</p>
                                <span className="applicant-status">{candidate.status}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="no-applicants">No candidates have applied for this position yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowJobModal(false)}
              >
                Close
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  handleEditJob(selectedJob);
                  setShowJobModal(false);
                }}
              >
                Edit Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;