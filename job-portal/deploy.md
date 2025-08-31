# 🚀 배포 가이드

## 1. Vercel 배포 (추천) ⭐

### 방법 1: Vercel CLI
```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 프로젝트 폴더에서 배포 실행
vercel

# 3. 첫 배포시 질문들:
# - Set up and deploy? → Y
# - Which scope? → 개인 계정 선택
# - Link to existing project? → N
# - What's your project's name? → job-portal (또는 원하는 이름)
# - In which directory is your code located? → ./
# - Want to override settings? → N

# 4. 배포 완료! 제공된 URL로 접속
```

### 방법 2: Vercel 웹사이트
1. https://vercel.com 방문
2. GitHub/GitLab 계정으로 로그인
3. "New Project" 클릭
4. Git 저장소 연결하거나 build 폴더 업로드
5. 자동 배포 완료!

---

## 2. Netlify 배포

### 방법 1: 드래그 앤 드롭 (가장 쉬움)
1. https://netlify.com 방문 후 로그인
2. "Sites" 탭으로 이동
3. **build 폴더**를 드래그 앤 드롭
4. 즉시 배포 완료!

### 방법 2: Netlify CLI
```bash
# 1. Netlify CLI 설치
npm install -g netlify-cli

# 2. 로그인
netlify login

# 3. 배포
netlify deploy --prod --dir=build
```

---

## 3. GitHub Pages 배포

### 사전 준비
1. GitHub에 저장소 생성 (예: job-portal)
2. 코드를 GitHub에 푸시

### 배포 명령
```bash
# 1. package.json에서 homepage 수정
# "homepage": "https://YOUR_USERNAME.github.io/job-portal"

# 2. 배포 실행
npm run deploy

# 3. GitHub 저장소 → Settings → Pages에서 확인
```

---

## 4. Firebase Hosting

```bash
# 1. Firebase CLI 설치
npm install -g firebase-tools

# 2. Firebase 로그인
firebase login

# 3. 프로젝트 초기화
firebase init hosting

# 4. 설정:
# - Public directory: build
# - Single-page app: Yes
# - Overwrite index.html: No

# 5. 배포
firebase deploy
```

---

## 🎯 추천 배포 순서

### 초보자용 (가장 쉬움)
1. **Netlify 드래그 앤 드롭** - 1분 완성
2. **Vercel 웹사이트** - 2분 완성

### 개발자용
1. **Vercel CLI** - 자동 배포
2. **GitHub Pages** - Git 연동

---

## 📋 배포 전 체크리스트

- [x] `npm run build` 성공 확인
- [x] build 폴더 생성 확인
- [ ] 배포 서비스 계정 생성
- [ ] 도메인 설정 (선택사항)

---

## 🔧 배포 후 설정

### 커스텀 도메인 연결
- Vercel: Settings → Domains
- Netlify: Site settings → Domain management
- GitHub Pages: Settings → Pages → Custom domain

### HTTPS 설정
- 대부분의 서비스에서 자동 제공
- Let's Encrypt 인증서 자동 적용

---

## 🐛 문제 해결

### 빌드 실패
```bash
# 캐시 정리 후 다시 빌드
npm run build
```

### 라우팅 문제 (404 에러)
- Vercel: vercel.json 파일 생성 필요
- Netlify: _redirects 파일 생성 필요

### 환경변수 설정
- 각 플랫폼의 환경변수 설정에서 추가