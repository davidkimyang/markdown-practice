import React, { useState } from 'react';
import Layout from './components/Layout';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import { AuthProvider } from './context/AuthContext';
import { Job } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'list' | 'detail'>('list');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setCurrentPage('detail');
  };

  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedJob(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentPage !== 'list') {
      setCurrentPage('list');
    }
  };

  return (
    <AuthProvider>
      <Layout onSearch={handleSearch}>
        {currentPage === 'list' && (
          <JobListPage 
            searchQuery={searchQuery}
            onJobSelect={handleJobSelect}
          />
        )}
        {currentPage === 'detail' && selectedJob && (
          <JobDetailPage 
            job={selectedJob}
            onBack={handleBackToList}
          />
        )}
      </Layout>
    </AuthProvider>
  );
}

export default App;
