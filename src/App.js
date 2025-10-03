import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HRProvider } from './context/HRContext';
import { AssessmentProvider } from './context/AssessmentContext';
import Home from './pages/Home.jsx';
import JobsBoard from './pages/JobsBoard';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/hr/Dashboard';
import CreateJob from './pages/hr/CreateJob';
import ManageJobs from './pages/hr/ManageJobs';
import HRCandidates from './pages/hr/Candidates';
import CandidateProfile from './pages/hr/CandidateProfile';
import HRJobDetail from './pages/hr/JobDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <HRProvider>
        <AssessmentProvider>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs-board" element={<JobsBoard />} />
          <Route path="/jobs/:slug" element={<JobDetail />} />
              <Route path="/hr/dashboard" element={<Dashboard />} />
              <Route path="/hr/create-job" element={<CreateJob />} />
              <Route path="/hr/jobs" element={<ManageJobs />} />
              <Route path="/hr/jobs/:slug" element={<HRJobDetail />} />
              <Route path="/hr/candidates" element={<HRCandidates />} />
              <Route path="/hr/candidates/:id" element={<CandidateProfile />} />
          
          </Routes>
        </AssessmentProvider>
      </HRProvider>
    </BrowserRouter>
  );
}

export default App;
