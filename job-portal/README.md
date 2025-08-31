# 잡포털 - 구인구직 사이트

waiternara.kr과 유사한 UI/UX를 가진 구인구직 사이트입니다. 교육용으로 제작되었으며, 현대적인 웹 기술을 사용하여 구현되었습니다.

## 🚀 주요 기능

### 📋 채용공고 관리
- 채용공고 목록 보기 (그리드/리스트 뷰)
- 채용공고 상세 정보 확인
- 실시간 검색 및 다중 필터링
- 정렬 기능 (최신순, 급여순, 회사명순)

### 🔍 검색 및 필터링
- 키워드 검색 (제목, 회사명, 설명)
- 지역별 필터링
- 직종별 필터링
- 고용형태별 필터링 (정규직, 아르바이트, 계약직, 프리랜서)
- 경력별 필터링 (신입, 경력, 시니어)
- 급여 범위 필터링

### 👥 사용자 인증 시스템
- 구직자/기업 담당자 회원가입
- 로그인/로그아웃
- 프로필 관리
- 지원하기 기능 (구직자 전용)

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 최적화
- 현대적이고 직관적인 UI/UX
- 접근성 고려

## 🛠️ 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스 구축
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링 및 반응형 디자인
- **Lucide React** - 아이콘

### 상태 관리
- **React Context API** - 사용자 인증 상태 관리
- **Local Storage** - 사용자 세션 유지

## 🚀 시작하기

### 사전 요구사항
- Node.js 14.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론
\`\`\`bash
git clone <repository-url>
cd job-portal
\`\`\`

2. 의존성 설치
\`\`\`bash
npm install
\`\`\`

3. 개발 서버 실행
\`\`\`bash
npm start
\`\`\`

4. 브라우저에서 `http://localhost:3000` 접속

### 빌드
\`\`\`bash
npm run build
\`\`\`

## 🧪 테스트 계정

개발 및 테스트를 위한 계정 정보:

### 구직자 계정
- **이메일**: jobseeker@example.com
- **비밀번호**: password123

### 기업 담당자 계정
- **이메일**: employer@example.com
- **비밀번호**: password123

## 📁 프로젝트 구조

\`\`\`
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Header.tsx      # 헤더 (네비게이션, 검색)
│   ├── Footer.tsx      # 푸터
│   ├── Layout.tsx      # 레이아웃 래퍼
│   ├── JobCard.tsx     # 채용공고 카드
│   ├── SearchFilters.tsx # 검색 필터
│   └── AuthModal.tsx   # 인증 모달
├── pages/              # 페이지 컴포넌트
│   ├── JobListPage.tsx # 채용공고 목록 페이지
│   └── JobDetailPage.tsx # 채용공고 상세 페이지
├── context/            # React Context
│   └── AuthContext.tsx # 인증 컨텍스트
├── types/              # TypeScript 타입 정의
│   └── index.ts
├── data/               # 목업 데이터
│   └── mockJobs.ts
└── App.tsx             # 메인 앱 컴포넌트
\`\`\`

## 🎨 주요 기능 설명

### 1. 채용공고 목록
- 6개의 샘플 채용공고 제공
- 그리드/리스트 뷰 전환 가능
- 실시간 검색 및 필터링
- 무한 스크롤 (추후 구현 예정)

### 2. 상세 페이지
- 채용공고 전체 정보 표시
- 북마크 기능
- 공유 기능
- 지원하기 (로그인 필요)

### 3. 인증 시스템
- 모달 기반 로그인/회원가입
- 역할 기반 접근 제어
- 세션 유지 (localStorage)

### 4. 검색 및 필터
- 다중 조건 검색
- 실시간 결과 업데이트
- 필터 초기화 기능

## 🔮 향후 개발 계획

- [ ] 백엔드 API 연동
- [ ] 실제 데이터베이스 연결
- [ ] 이미지 업로드 기능
- [ ] 이메일 알림 시스템
- [ ] 채팅 기능
- [ ] 관리자 대시보드
- [ ] SEO 최적화
- [ ] PWA 지원

## 📝 라이선스

이 프로젝트는 교육용으로 제작되었습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이나 버그 리포트는 이슈를 생성해주세요.