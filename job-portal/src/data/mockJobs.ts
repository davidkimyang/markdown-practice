import { Job } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: '서빙 스태프',
    company: '더 테이블 레스토랑',
    location: '서울 강남구',
    employmentType: 'part-time',
    salary: {
      min: 10000,
      max: 12000,
      currency: 'KRW',
      period: 'hour'
    },
    description: '고급 레스토랑에서 근무할 친절하고 성실한 서빙 스태프를 모집합니다. 경험자 우대하며, 교육 제공합니다.',
    requirements: [
      '서비스업 경험 1년 이상',
      '친절하고 밝은 성격',
      '체력적으로 건강한 분',
      '주말 근무 가능'
    ],
    benefits: [
      '4대 보험',
      '식사 제공',
      '교통비 지원',
      '성과급'
    ],
    postedAt: '2024-01-15T09:00:00Z',
    expiresAt: '2024-02-15T23:59:59Z',
    category: '서비스업',
    experience: 'entry',
    isUrgent: true,
    companyLogo: 'https://via.placeholder.com/100x100?text=TR',
    contactInfo: {
      email: 'hr@thetable.com',
      phone: '02-1234-5678'
    }
  },
  {
    id: '2',
    title: '바리스타',
    company: '커피빈 강남점',
    location: '서울 강남구',
    employmentType: 'full-time',
    salary: {
      min: 2800000,
      max: 3200000,
      currency: 'KRW',
      period: 'month'
    },
    description: '커피에 대한 열정이 있는 바리스타를 모집합니다. 라떼아트 가능하신 분 우대합니다.',
    requirements: [
      '바리스타 자격증 보유',
      '커피 제조 경험 2년 이상',
      '라떼아트 가능자 우대',
      '고객 서비스 마인드'
    ],
    benefits: [
      '4대 보험',
      '연차 휴가',
      '교육비 지원',
      '커피 할인'
    ],
    postedAt: '2024-01-14T10:30:00Z',
    expiresAt: '2024-02-14T23:59:59Z',
    category: '카페/바리스타',
    experience: 'mid',
    companyLogo: 'https://via.placeholder.com/100x100?text=CB',
    contactInfo: {
      email: 'jobs@coffeebean.kr',
      phone: '02-2345-6789'
    }
  },
  {
    id: '3',
    title: '주방 보조',
    company: '맛있는집',
    location: '서울 마포구',
    employmentType: 'part-time',
    salary: {
      min: 9500,
      max: 10500,
      currency: 'KRW',
      period: 'hour'
    },
    description: '한식당에서 근무할 주방 보조를 모집합니다. 요리에 관심있는 분들의 많은 지원 바랍니다.',
    requirements: [
      '성실하고 책임감 있는 분',
      '체력적으로 건강한 분',
      '주방 위생 관리 가능',
      '평일 오후 시간 근무 가능'
    ],
    benefits: [
      '식사 제공',
      '교통비 지원',
      '요리 기술 습득 기회'
    ],
    postedAt: '2024-01-13T14:00:00Z',
    expiresAt: '2024-02-13T23:59:59Z',
    category: '주방/조리',
    experience: 'entry',
    companyLogo: 'https://via.placeholder.com/100x100?text=MJ',
    contactInfo: {
      phone: '02-3456-7890'
    }
  },
  {
    id: '4',
    title: '호텔 프론트 데스크',
    company: '그랜드 호텔',
    location: '서울 중구',
    employmentType: 'full-time',
    salary: {
      min: 3000000,
      max: 3500000,
      currency: 'KRW',
      period: 'month'
    },
    description: '5성급 호텔에서 근무할 프론트 데스크 직원을 모집합니다. 영어 가능자 우대합니다.',
    requirements: [
      '호텔업 경험 1년 이상',
      '영어 회화 가능',
      '고객 서비스 경험',
      '야간 근무 가능',
      '컴퓨터 활용 능력'
    ],
    benefits: [
      '4대 보험',
      '연차 휴가',
      '직원 할인',
      '교육 프로그램',
      '승진 기회'
    ],
    postedAt: '2024-01-12T11:00:00Z',
    expiresAt: '2024-02-12T23:59:59Z',
    category: '호텔/숙박업',
    experience: 'mid',
    companyLogo: 'https://via.placeholder.com/100x100?text=GH',
    contactInfo: {
      email: 'careers@grandhotel.com',
      phone: '02-4567-8901',
      website: 'https://grandhotel.com'
    }
  },
  {
    id: '5',
    title: '배달 라이더',
    company: '퀵서비스',
    location: '서울 전지역',
    employmentType: 'freelance',
    salary: {
      min: 15000,
      max: 25000,
      currency: 'KRW',
      period: 'hour'
    },
    description: '오토바이를 이용한 음식 배달 라이더를 모집합니다. 자유로운 근무 시간과 높은 수입을 보장합니다.',
    requirements: [
      '오토바이 운전 가능',
      '2종 보통 면허 보유',
      '서울 지리 숙지',
      '스마트폰 사용 가능'
    ],
    benefits: [
      '자유로운 근무시간',
      '높은 수입',
      '유류비 지원',
      '보험 지원'
    ],
    postedAt: '2024-01-11T16:00:00Z',
    expiresAt: '2024-03-11T23:59:59Z',
    category: '배달/운송',
    experience: 'entry',
    isUrgent: true,
    companyLogo: 'https://via.placeholder.com/100x100?text=QS',
    contactInfo: {
      phone: '02-5678-9012'
    }
  },
  {
    id: '6',
    title: '매장 관리자',
    company: '편의점 24',
    location: '서울 송파구',
    employmentType: 'full-time',
    salary: {
      min: 3500000,
      max: 4000000,
      currency: 'KRW',
      period: 'month'
    },
    description: '편의점 매장 관리자를 모집합니다. 매장 운영 전반을 담당하며, 관리 경험이 있는 분을 우대합니다.',
    requirements: [
      '매장 관리 경험 2년 이상',
      '리더십',
      '재고 관리 경험',
      'POS 시스템 사용 가능',
      '야간 근무 가능'
    ],
    benefits: [
      '4대 보험',
      '성과급',
      '승진 기회',
      '교육 지원',
      '연차 휴가'
    ],
    postedAt: '2024-01-10T13:30:00Z',
    expiresAt: '2024-02-10T23:59:59Z',
    category: '소매/유통',
    experience: 'senior',
    companyLogo: 'https://via.placeholder.com/100x100?text=24',
    contactInfo: {
      email: 'manager@store24.co.kr',
      phone: '02-6789-0123'
    }
  }
];

export const jobCategories = [
  '전체',
  '서비스업',
  '카페/바리스타',
  '주방/조리',
  '호텔/숙박업',
  '배달/운송',
  '소매/유통'
];

export const locations = [
  '전체',
  '서울 강남구',
  '서울 마포구',
  '서울 중구',
  '서울 송파구',
  '서울 전지역'
];

export const employmentTypes = [
  { value: 'all', label: '전체' },
  { value: 'full-time', label: '정규직' },
  { value: 'part-time', label: '아르바이트' },
  { value: 'contract', label: '계약직' },
  { value: 'freelance', label: '프리랜서' }
];

export const experienceLevels = [
  { value: 'all', label: '전체' },
  { value: 'entry', label: '신입' },
  { value: 'mid', label: '경력 1-3년' },
  { value: 'senior', label: '경력 3년+' },
  { value: 'executive', label: '임원급' }
];