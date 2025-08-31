import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Calendar, 
  AlertCircle, 
  Heart, 
  Share2, 
  Send,
  CheckCircle,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { Job } from '../types';

interface JobDetailPageProps {
  job: Job;
  onBack: () => void;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, onBack }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { user } = useAuth();

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

  const getDaysUntilExpiry = (dateString: string) => {
    const expiry = new Date(dateString);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return '마감됨';
    if (diffDays === 1) return '1일 남음';
    if (diffDays <= 7) return `${diffDays}일 남음`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}주 남음`;
    return `${Math.ceil(diffDays / 30)}개월 남음`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.title} - ${job.company}`,
          text: job.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            목록으로 돌아가기
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  {job.companyLogo ? (
                    <img 
                      src={job.companyLogo} 
                      alt={`${job.company} 로고`}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <p className="text-lg text-gray-700 font-medium">
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isBookmarked 
                        ? 'border-red-300 bg-red-50 text-red-600' 
                        : 'border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Job details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span>{getEmploymentTypeLabel(job.employmentType)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-primary-600" />
                  <span>{formatSalary(job.salary)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <span>경력 {getExperienceLabel(job.experience)}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {job.category}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {getExperienceLabel(job.experience)}
                </span>
                {job.isUrgent && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    급구
                  </span>
                )}
              </div>

              {/* Posted and expiry dates */}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                <span>게시일: {getDaysAgo(job.postedAt)}</span>
                <span className={`font-medium ${
                  getDaysUntilExpiry(job.expiresAt).includes('마감') 
                    ? 'text-red-600' 
                    : getDaysUntilExpiry(job.expiresAt).includes('1일') || getDaysUntilExpiry(job.expiresAt).includes('2일')
                    ? 'text-orange-600'
                    : 'text-gray-600'
                }`}>
                  마감: {getDaysUntilExpiry(job.expiresAt)}
                </span>
              </div>
            </div>

            {/* Job description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                채용 상세내용
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                자격요건
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  복리후생
                </h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <button
                onClick={() => {
                  if (user) {
                    if (user.role === 'jobseeker') {
                      setShowApplicationForm(true);
                    } else {
                      alert('구직자만 지원할 수 있습니다.');
                    }
                  } else {
                    setShowAuthModal(true);
                  }
                }}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center font-medium mb-4"
              >
                <Send className="w-5 h-5 mr-2" />
                지원하기
              </button>
              
              <div className="text-center text-sm text-gray-600 mb-4">
                지원 전 기업 정보를 확인해보세요
              </div>

              {/* Contact info */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">연락처 정보</h3>
                
                {job.contactInfo.phone && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-4 h-4 text-primary-600" />
                    <span className="text-sm">{job.contactInfo.phone}</span>
                  </div>
                )}
                
                {job.contactInfo.email && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-4 h-4 text-primary-600" />
                    <span className="text-sm">{job.contactInfo.email}</span>
                  </div>
                )}
                
                {job.contactInfo.website && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Globe className="w-4 h-4 text-primary-600" />
                    <a 
                      href={job.contactInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      회사 홈페이지
                    </a>
                  </div>
                )}
              </div>

              {/* Warning for urgent jobs */}
              {job.isUrgent && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="text-sm font-medium text-orange-800">
                      급구 채용공고
                    </span>
                  </div>
                  <p className="text-xs text-orange-700 mt-1">
                    빠른 지원을 권장합니다.
                  </p>
                </div>
              )}
            </div>

            {/* Company info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">기업 정보</h3>
              <div className="space-y-3">
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
                    <h4 className="font-medium text-gray-900">{job.company}</h4>
                    <p className="text-sm text-gray-600">{job.category} 업계</p>
                  </div>
                </div>
                
                <button className="w-full text-left px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  기업 정보 더보기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationForm && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {job.title} 지원하기
            </h3>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">지원자 정보:</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.profile?.phone && (
                  <p className="text-sm text-gray-600">{user.profile.phone}</p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                지원 메시지 (선택사항)
              </label>
              <textarea
                placeholder="지원 동기나 자기소개를 간단히 작성해주세요."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                rows={4}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowApplicationForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setShowApplicationForm(false);
                  alert('지원이 완료되었습니다!');
                }}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                지원하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </div>
  );
};

export default JobDetailPage;