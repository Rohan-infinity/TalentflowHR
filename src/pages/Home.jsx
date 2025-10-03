import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleJobSeekerClick = () => {
    navigate('/jobs-board');
  };

  const handleHRClick = () => {
    navigate('/hr/dashboard');
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>TalentFlow</h1>
            <p className="hero-subtitle">Modern Hiring Management Platform</p>
            <p className="hero-description">
              Streamline your recruitment process with our comprehensive platform designed for both job seekers and HR professionals.
            </p>
          </div>
          
          <div className="hero-cards">
            <div className="role-card job-seeker-card" onClick={handleJobSeekerClick}>
              <div className="card-header">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2>Job Seeker</h2>
              </div>
              <p>Discover opportunities, apply seamlessly, and track your application progress.</p>
              <div className="card-features">
                <span>• Browse Jobs</span>
                <span>• Track Applications</span>
                <span>• Career Growth</span>
              </div>
              <div className="card-action">
                <span>Get Started</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>

            <div className="role-card hr-card" onClick={handleHRClick}>
              <div className="card-header">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </div>
                <h2>HR Professional</h2>
              </div>
              <p>Manage recruitment, evaluate candidates, and build your dream team efficiently.</p>
              <div className="card-features">
                <span>• Post Jobs</span>
                <span>• Manage Candidates</span>
                <span>• Create Assessments</span>
              </div>
              <div className="card-action">
                <span>Access Dashboard</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-content">
          <h2>Why Choose TalentFlow?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
              <h3>Smart Matching</h3>
              <p>Advanced algorithms to match the right candidates with the right opportunities.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3>Quality Assessments</h3>
              <p>Comprehensive evaluation tools to assess candidate skills and cultural fit.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"></path>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                </svg>
              </div>
              <h3>Real-time Analytics</h3>
              <p>Track performance, monitor progress, and make data-driven hiring decisions.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Secure Platform</h3>
              <p>Enterprise-grade security to protect sensitive candidate and company data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
