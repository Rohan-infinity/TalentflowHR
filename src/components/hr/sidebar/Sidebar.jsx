import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      path: '/hr/dashboard'
    },
    {
      id: 'create-job',
      title: 'Create Job Posting',
      icon: '📝',
      path: '/hr/create-job'
    },
    {
      id: 'jobs',
      title: 'Manage Jobs',
      icon: '💼',
      path: '/hr/jobs'
    },
    {
      id: 'candidates',
      title: 'Candidates',
      icon: '👥',
      path: '/hr/candidates'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 
          className="sidebar-title"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          TalentFlow HR
        </h2>
        <p>Hiring Management</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">JD</div>
          <div className="user-details">
            <p className="user-name">John Davis</p>
            <p className="user-role">HR Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
