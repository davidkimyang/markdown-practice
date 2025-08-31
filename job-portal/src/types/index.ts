export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salary?: {
    min: number;
    max: number;
    currency: string;
    period: 'hour' | 'day' | 'month' | 'year';
  };
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  expiresAt: string;
  category: string;
  experience: 'entry' | 'mid' | 'senior' | 'executive';
  isUrgent?: boolean;
  companyLogo?: string;
  contactInfo: {
    email?: string;
    phone?: string;
    website?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer';
  profile?: {
    avatar?: string;
    phone?: string;
    location?: string;
    resume?: string;
    bio?: string;
  };
}

export interface SearchFilters {
  keyword?: string;
  location?: string;
  category?: string;
  employmentType?: string[];
  experience?: string[];
  salaryMin?: number;
  salaryMax?: number;
}