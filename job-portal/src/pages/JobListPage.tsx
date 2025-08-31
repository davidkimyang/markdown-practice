import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import JobCard from '../components/JobCard';
import SearchFilters from '../components/SearchFilters';
import { Job, SearchFilters as SearchFiltersType } from '../types';
import { mockJobs } from '../data/mockJobs';

interface JobListPageProps {
  searchQuery?: string;
  onJobSelect?: (job: Job) => void;
}

const JobListPage: React.FC<JobListPageProps> = ({ searchQuery, onJobSelect }) => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [sortBy, setSortBy] = useState<'recent' | 'salary' | 'company'>('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Apply filters and search
  useEffect(() => {
    let filtered = [...jobs];

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    // Apply keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword) ||
        job.category.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword) ||
        job.requirements.some(req => req.toLowerCase().includes(keyword))
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(job => job.location === filters.location);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    // Apply employment type filter
    if (filters.employmentType && filters.employmentType.length > 0) {
      filtered = filtered.filter(job => 
        filters.employmentType!.includes(job.employmentType)
      );
    }

    // Apply experience filter
    if (filters.experience && filters.experience.length > 0) {
      filtered = filtered.filter(job => 
        filters.experience!.includes(job.experience)
      );
    }

    // Apply salary filter
    if (filters.salaryMin || filters.salaryMax) {
      filtered = filtered.filter(job => {
        if (!job.salary) return false;
        
        const jobSalary = job.salary.period === 'month' 
          ? job.salary.min / 10000  // Convert to 만원
          : job.salary.period === 'hour'
          ? job.salary.min * 40 * 4 / 10000  // Estimate monthly salary in 만원
          : job.salary.min / 10000;
        
        if (filters.salaryMin && jobSalary < filters.salaryMin) return false;
        if (filters.salaryMax && jobSalary > filters.salaryMax) return false;
        
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        case 'salary':
          const aSalary = a.salary?.min || 0;
          const bSalary = b.salary?.min || 0;
          return bSalary - aSalary;
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, filters, sortBy]);

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'recent': return '최신순';
      case 'salary': return '급여순';
      case 'company': return '회사명순';
      default: return '최신순';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `"${searchQuery}" 검색 결과` : '전체 채용정보'}
          </h1>
          <p className="text-gray-600 mt-1">
            총 {filteredJobs.length}개의 채용공고가 있습니다.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="recent">최신순</option>
            <option value="salary">급여순</option>
            <option value="company">회사명순</option>
          </select>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            필터
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24">
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
              resultCount={filteredJobs.length}
            />
          </div>
        </div>

        {/* Job listings */}
        <div className="flex-1">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <SortAsc className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600 mb-4">
                다른 키워드로 검색하거나 필터를 조정해보세요.
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                : 'space-y-4'
            }>
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={onJobSelect}
                />
              ))}
            </div>
          )}

          {/* Load more button (placeholder) */}
          {filteredJobs.length > 0 && (
            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                더 많은 채용정보 보기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListPage;