import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHRContext } from '../../context/HRContext';
import Sidebar from '../../components/hr/sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    loading, 
    getDashboardStats, 
    getRecentJobs, 
    getRecentCandidates 
  } = useHRContext();

  const stats = getDashboardStats();
  const recentJobs = getRecentJobs(3);
  const recentCandidates = getRecentCandidates(3);

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Under Review': 'status-review',
      'Interview Scheduled': 'status-interview',
      'Hired': 'status-hired',
      'Rejected': 'status-rejected'
    };
    return statusClasses[status] || 'status-default';
  };

  if (loading) {
    return (
      <div className="hr-layout">
        <Sidebar />
        <div className="main-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hr-layout">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>HR Dashboard</h1>
          <p>Welcome back! Here's what's happening with your hiring process.</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard
            title="Active Jobs"
            value={stats.activeJobs}
            icon="💼"
            color="blue"
          />
          <StatCard
            title="Total Candidates"
            value={stats.totalCandidates}
            icon="👥"
            color="green"
          />
          <StatCard
            title="Under Review"
            value={stats.underReview}
            icon="📋"
            color="orange"
          />
          <StatCard
            title="Hired This Month"
            value={stats.hiredThisMonth}
            icon="✅"
            color="purple"
          />
        </div>

        {/* Recent Jobs and Candidates */}
        <div className="dashboard-content">
          <div className="content-section">
            <div className="section-header">
              <h2>Recent Job Postings</h2>
              <button 
                className="btn-primary"
                onClick={() => navigate('/hr/jobs')}
              >
                View All Jobs
              </button>
            </div>
            <div className="jobs-list">
              {recentJobs.map(job => (
                <div 
                  key={job.id} 
                  className="job-card clickable"
                  onClick={() => navigate(`/hr/jobs/${job.slug}`)}
                >
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="job-department">{job.department} • {job.location}</p>
                    <p className="job-date">Posted: {job.postedDate}</p>
                  </div>
                  <div className="job-stats">
                    <span className="applicants-count">{job.applicants} applicants</span>
                    <span className={`status-badge ${job.status}`}>{job.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <div className="section-header">
              <h2>Recent Candidates</h2>
              <button 
                className="btn-primary"
                onClick={() => navigate('/hr/candidates')}
              >
                View All Candidates
              </button>
            </div>
            <div className="candidates-list">
              {recentCandidates.map(candidate => (
                <div 
                  key={candidate.id} 
                  className="candidate-card clickable"
                  onClick={() => navigate('/hr/candidates')}
                >
                  <div className="candidate-avatar">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="candidate-info">
                    <h3>{candidate.name}</h3>
                    <p className="candidate-position">{candidate.position}</p>
                    <p className="candidate-experience">{candidate.experience} experience</p>
                    <p className="candidate-date">Applied: {candidate.appliedDate}</p>
                  </div>
                  <div className="candidate-status">
                    <span className={`status-badge ${getStatusBadge(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
