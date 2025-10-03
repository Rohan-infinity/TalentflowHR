import React, { createContext, useContext, useState, useEffect } from 'react';
import { seedJobs } from '../data/seedJobs';
import { generatedCandidates } from '../data/generateSeedData';

const HRContext = createContext();

export const useHRContext = () => {
  const context = useContext(HRContext);
  if (!context) {
    throw new Error('useHRContext must be used within an HRProvider');
  }
  return context;
};

export const HRProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate unique slug for job titles
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Check if slug is unique
  const isSlugUnique = (slug, currentJobs, excludeId = null) => {
    return !currentJobs.some(job => job.slug === slug && job.id !== excludeId);
  };

  // Generate unique slug
  const generateUniqueSlug = (title, currentJobs, excludeId = null) => {
    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (!isSlugUnique(slug, currentJobs, excludeId)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  };

  // Get job by slug
  const getJobBySlug = (slug) => {
    return jobs.find(job => job.slug === slug);
  };

  // Calculate average marks for a candidate
  const calculateAverageMarks = (assignmentAnswers) => {
    if (!assignmentAnswers || Object.keys(assignmentAnswers).length === 0) {
      return 0;
    }

    const scores = Object.values(assignmentAnswers).map(assignment => assignment.score || 0);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    return Math.round(totalScore / scores.length);
  };

  // Initialize data
  const initializeData = () => {
    try {
      // Load jobs from localStorage first, then merge with seed data
      const savedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
      const mockJobs = seedJobs;
      
      // Merge saved jobs with seed jobs, avoiding duplicates
      const mergedJobs = [...savedJobs];
      mockJobs.forEach(seedJob => {
        if (!mergedJobs.find(job => job.id === seedJob.id)) {
          mergedJobs.push(seedJob);
        }
      });
      
      setJobs(mergedJobs);
      
      // Save merged jobs back to localStorage
      localStorage.setItem('jobs', JSON.stringify(mergedJobs));

      // Use seed candidates data (1000 candidates with 50% assessment completion)
      const mockCandidates = generatedCandidates;
      
      // Load candidates from localStorage and merge with seed data
      const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
      console.log('initializeData - savedCandidates from localStorage:', savedCandidates.length);
      const mergedCandidates = [...savedCandidates];
      
      // Add seed candidates that don't already exist
      mockCandidates.forEach(seedCandidate => {
        if (!mergedCandidates.find(candidate => candidate.id === seedCandidate.id)) {
          mergedCandidates.push(seedCandidate);
        }
      });
      
      // Calculate marks for candidates who already have scores
      const candidatesWithMarks = mergedCandidates.map(candidate => {
        const averageMarks = calculateAverageMarks(candidate.assignmentAnswers);
        return {
          ...candidate,
          averageMarks
        };
      });
      
      console.log('initializeData - final merged candidates:', candidatesWithMarks.length);
      setCandidates(candidatesWithMarks);
      
      // Save merged candidates to localStorage
      localStorage.setItem('candidates', JSON.stringify(candidatesWithMarks));
      console.log('initializeData - saved merged candidates to localStorage');
      
      setLoading(false);
    } catch (error) {
      console.error('Error initializing data:', error);
      setLoading(false);
    }
  };

  // Add new job
  const addJob = (newJob) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    // Generate unique slug
    const slug = generateUniqueSlug(newJob.title, jobs);
    
    const job = {
      ...newJob,
      id: Date.now(),
      slug,
      postedDate: formattedDate,
      applicants: 0,
      status: 'active',
      archived: false
    };
    const updatedJobs = [job, ...jobs];
    setJobs(updatedJobs);
    
    // Save to localStorage for real-time sync
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    
    return job;
  };

  // Update job
  const updateJob = (jobId, updatedJobData) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        const updatedJob = { ...job, ...updatedJobData };
        
        // If title changed, regenerate slug
        if (updatedJobData.title && updatedJobData.title !== job.title) {
          updatedJob.slug = generateUniqueSlug(updatedJobData.title, jobs, jobId);
        }
        
        return updatedJob;
      }
      return job;
    });
    
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  // Archive job
  const archiveJob = (jobId) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        const updatedJob = {
          ...job,
          archived: true,
          status: 'archived'
        };
        
        // Ensure slug exists
        if (!updatedJob.slug) {
          updatedJob.slug = generateUniqueSlug(job.title, jobs, jobId);
        }
        
        return updatedJob;
      }
      return job;
    });
    
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  // Unarchive job
  const unarchiveJob = (jobId) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        const updatedJob = {
          ...job,
          archived: false,
          status: 'active'
        };
        
        // Ensure slug exists
        if (!updatedJob.slug) {
          updatedJob.slug = generateUniqueSlug(job.title, jobs, jobId);
        }
        
        return updatedJob;
      }
      return job;
    });
    
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  // Delete job
  const deleteJob = (jobId) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
  };

  // Update candidate status
  const updateCandidateStatus = (candidateId, newStatus, note = '') => {
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === candidateId) {
        const statusUpdate = {
          status: newStatus,
          date: new Date().toLocaleDateString('en-GB'),
          timestamp: new Date().toISOString(),
          note: note || `Status changed to ${newStatus}`
        };
        
        return {
          ...candidate,
          status: newStatus,
          statusHistory: [...candidate.statusHistory, statusUpdate]
        };
      }
      return candidate;
    });
    
    setCandidates(updatedCandidates);
    localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
  };

  // Reorder jobs with optimistic updates
  const reorderJobs = async (startIndex, endIndex) => {
    const result = Array.from(jobs);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    // Optimistic update
    setJobs(result);
    localStorage.setItem('jobs', JSON.stringify(result));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If successful, keep the new order
      // If failed, you could revert here
    } catch (error) {
      console.error('Failed to reorder jobs:', error);
      // Revert on failure
      setJobs(jobs);
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  };

  // Dashboard stats
  const getDashboardStats = () => {
    const activeJobs = jobs.filter(job => job.status === 'active' && !job.archived).length;
    const totalCandidates = candidates.length;
    const underReview = candidates.filter(candidate => candidate.status === 'Under Review').length;
    
    // Calculate hired this month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const hiredThisMonth = candidates.filter(candidate => {
      if (candidate.status !== 'Hired') return false;
      const appliedDate = new Date(candidate.appliedDate.split('/').reverse().join('-'));
      return appliedDate.getMonth() === currentMonth && appliedDate.getFullYear() === currentYear;
    }).length;

    return {
      activeJobs,
      totalCandidates,
      underReview,
      hiredThisMonth
    };
  };

  // Get recent jobs
  const getRecentJobs = (limit = 5) => {
    return jobs
      .filter(job => job.status === 'active' && !job.archived)
      .sort((a, b) => new Date(b.postedDate.split('/').reverse().join('-')) - new Date(a.postedDate.split('/').reverse().join('-')))
      .slice(0, limit);
  };

  // Get recent candidates
  const getRecentCandidates = (limit = 5) => {
    return candidates
      .sort((a, b) => new Date(b.appliedDate.split('/').reverse().join('-')) - new Date(a.appliedDate.split('/').reverse().join('-')))
      .slice(0, limit);
  };

  // Get job with real-time applicant count
  const getJobWithApplicantCount = (job) => {
    const applicantCount = candidates.filter(candidate => 
      candidate.jobId === job.id || candidate.position === job.title
    ).length;
    
    return {
      ...job,
      applicants: applicantCount
    };
  };

  // Polling for real-time updates
  useEffect(() => {
    const pollInterval = setInterval(() => {
      try {
        // Poll for jobs updates
        const savedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        if (JSON.stringify(savedJobs) !== JSON.stringify(jobs)) {
          setJobs(savedJobs);
        }
        
        // Poll for candidates updates
        const savedCandidates = JSON.parse(localStorage.getItem('candidates') || '[]');
        console.log('HRContext polling - localStorage candidates:', savedCandidates.length);
        console.log('HRContext polling - current state candidates:', candidates.length);
        
        if (JSON.stringify(savedCandidates) !== JSON.stringify(candidates)) {
          console.log('New candidates found, updating...');
          setCandidates(savedCandidates);
        }
      } catch (error) {
        console.error('Error polling for updates:', error);
      }
    }, 7000); // Poll every 7 seconds

    return () => clearInterval(pollInterval);
  }, [jobs, candidates]);

  // Initialize data on mount
  useEffect(() => {
    initializeData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateCandidateScore = (candidateId, assessmentId, score) => {
    setCandidates(prevCandidates => {
      const updatedCandidates = prevCandidates.map(candidate => {
        if (candidate.id === candidateId) {
          // Update the score in assignmentAnswers structure
          const updatedAssignmentAnswers = {
            ...candidate.assignmentAnswers,
            [assessmentId]: {
              ...candidate.assignmentAnswers?.[assessmentId],
              score: score
            }
          };
          
          return {
            ...candidate,
            assignmentAnswers: updatedAssignmentAnswers
          };
        }
        return candidate;
      });
      
      // Save to localStorage
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
      return updatedCandidates;
    });
  };

  const getCandidateById = (candidateId) => {
    // Handle both string and number IDs
    const id = typeof candidateId === 'string' ? parseInt(candidateId, 10) : candidateId;
    return candidates.find(candidate => candidate.id === id || candidate.id === candidateId);
  };

  const value = {
    jobs,
    candidates,
    loading,
    addJob,
    updateJob,
    archiveJob,
    unarchiveJob,
    deleteJob,
    updateCandidateStatus,
    reorderJobs,
    getJobBySlug,
    generateSlug,
    isSlugUnique,
    generateUniqueSlug,
    getDashboardStats,
    getRecentJobs,
    getRecentCandidates,
    getJobWithApplicantCount,
    updateCandidateScore,
    getCandidateById
  };

  return (
    <HRContext.Provider value={value}>
      {children}
    </HRContext.Provider>
  );
};