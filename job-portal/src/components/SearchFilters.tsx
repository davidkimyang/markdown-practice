import React from 'react';
import { Search, MapPin, Briefcase, Clock, DollarSign, X } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types';
import { jobCategories, locations, employmentTypes, experienceLevels } from '../data/mockJobs';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClearFilters: () => void;
  resultCount?: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  resultCount
}) => {
  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && 
    !(Array.isArray(value) && value.length === 0)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Search className="w-5 h-5 mr-2" />
          상세 검색
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            초기화
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Keyword search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            키워드
          </label>
          <input
            type="text"
            value={filters.keyword || ''}
            onChange={(e) => updateFilter('keyword', e.target.value)}
            placeholder="직종, 회사명, 기술스택 등"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            지역
          </label>
          <select
            value={filters.location || '전체'}
            onChange={(e) => updateFilter('location', e.target.value === '전체' ? undefined : e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Briefcase className="w-4 h-4 mr-1" />
            직종
          </label>
          <select
            value={filters.category || '전체'}
            onChange={(e) => updateFilter('category', e.target.value === '전체' ? undefined : e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {jobCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            고용형태
          </label>
          <div className="space-y-2">
            {employmentTypes.map((type) => (
              <label key={type.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    type.value === 'all' 
                      ? !filters.employmentType || filters.employmentType.length === 0
                      : filters.employmentType?.includes(type.value) || false
                  }
                  onChange={(e) => {
                    if (type.value === 'all') {
                      updateFilter('employmentType', []);
                    } else {
                      const currentTypes = filters.employmentType || [];
                      if (e.target.checked) {
                        updateFilter('employmentType', [...currentTypes, type.value]);
                      } else {
                        updateFilter('employmentType', currentTypes.filter(t => t !== type.value));
                      }
                    }
                  }}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            경력
          </label>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    level.value === 'all'
                      ? !filters.experience || filters.experience.length === 0
                      : filters.experience?.includes(level.value) || false
                  }
                  onChange={(e) => {
                    if (level.value === 'all') {
                      updateFilter('experience', []);
                    } else {
                      const currentLevels = filters.experience || [];
                      if (e.target.checked) {
                        updateFilter('experience', [...currentLevels, level.value]);
                      } else {
                        updateFilter('experience', currentLevels.filter(l => l !== level.value));
                      }
                    }
                  }}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            급여 (만원)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={filters.salaryMin || ''}
              onChange={(e) => updateFilter('salaryMin', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="최소"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <input
              type="number"
              value={filters.salaryMax || ''}
              onChange={(e) => updateFilter('salaryMax', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="최대"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      {resultCount !== undefined && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            총 <span className="font-semibold text-primary-600">{resultCount}개</span>의 채용공고
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;