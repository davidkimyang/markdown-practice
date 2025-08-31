import React from 'react';
import { MapPin, Clock, DollarSign, Building2, Calendar, AlertCircle } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick?: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const formatSalary = (salary: Job['salary']) => {
    if (!salary) return '급여 협의';
    
    const { min, max, currency, period } = salary;
    const periodMap = {
      hour: '시급',
      day: '일급', 
      month: '월급',
      year: '연봉'
    };
    
    const formatNumber = (num: number) => {
      if (period === 'hour' || period === 'day') {
        return num.toLocaleString();
      }
      if (num >= 100000000) {
        return `${(num / 100000000).toFixed(1)}억`;
      }
      if (num >= 10000) {
        return `${(num / 10000).toFixed(0)}만`;
      }
      return num.toLocaleString();
    };
    
    const minFormatted = formatNumber(min);
    const maxFormatted = formatNumber(max);
    
    return `${minFormatted}${min !== max ? `~${maxFormatted}` : ''}${currency === 'KRW' ? '원' : currency} ${periodMap[period]}`;
  };

  const getEmploymentTypeLabel = (type: string) => {
    const typeMap = {
      'full-time': '정규직',
      'part-time': '아르바이트',
      'contract': '계약직',
      'freelance': '프리랜서'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const getExperienceLabel = (level: string) => {
    const levelMap = {
      'entry': '신입',
      'mid': '경력',
      'senior': '시니어',
      'executive': '임원급'
    };
    return levelMap[level as keyof typeof levelMap] || level;
  };

  const getDaysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1일 전';
    if (diffDays <= 7) return `${diffDays}일 전`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}주 전`;
    return `${Math.ceil(diffDays / 30)}개월 전`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onClick?.(job)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {job.companyLogo ? (
              <img 
                src={job.companyLogo} 
                alt={`${job.company} 로고`}
                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 font-medium">{job.company}</p>
            </div>
          </div>
          {job.isUrgent && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <AlertCircle className="w-3 h-3 mr-1" />
              급구
            </span>
          )}
        </div>

        {/* Job details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {getEmploymentTypeLabel(job.employmentType)}
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {formatSalary(job.salary)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
              {job.category}
            </span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
              {getExperienceLabel(job.experience)}
            </span>
          </div>
        </div>

        {/* Description preview */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {job.description}
        </p>

        {/* Requirements preview */}
        {job.requirements.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">주요 요구사항:</p>
            <div className="flex flex-wrap gap-1">
              {job.requirements.slice(0, 2).map((req, index) => (
                <span 
                  key={index}
                  className="inline-block px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded"
                >
                  {req}
                </span>
              ))}
              {job.requirements.length > 2 && (
                <span className="inline-block px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded">
                  +{job.requirements.length - 2}개 더
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {getDaysAgo(job.postedAt)}
          </div>
          <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            자세히 보기 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;