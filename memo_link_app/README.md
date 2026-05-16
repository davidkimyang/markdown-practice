# Memo Link App (Flutter + Supabase)

링크 기반 메모 공유 앱입니다. Android/macOS 실행을 목표로 했고, Flutter Web로 배포하면 브라우저에서도 동일하게 볼 수 있습니다.

## 1) 시작하기

```bash
cp .env.example .env
# .env에 Supabase 정보 입력
flutter pub get
flutter run
```

## 2) Supabase 준비

1. Supabase 프로젝트 생성
2. `supabase/schema.sql` 실행
3. `.env`에 아래 값 설정
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `APP_BASE_URL` (예: `https://yourapp.com`)

## 3) 라우팅

- 홈: `/`
- 메모 조회: `/n/{short_id}`

## 4) 포함 기능

- 메모 작성 (최대 10,000자)
- 저장 후 short link 생성
- 링크/내용 복사
- short_id 기반 조회 (읽기 전용)

## 5) Vercel 배포 시 404 해결 (중요)

`/n/abc123` 같은 직접 URL 접근 시 Vercel이 서버에서 파일을 찾으려다 404를 낼 수 있습니다.
Flutter Web SPA 라우팅이 동작하도록 `vercel.json`의 rewrite 설정이 필요합니다.

이 저장소에는 아래 설정이 이미 포함되어 있습니다.

- `vercel.json`: 모든 경로를 `/index.html`로 rewrite

### 배포 순서

```bash
flutter build web
```

Vercel 프로젝트 설정:
1. **Root Directory**를 `memo_link_app`로 지정
2. **Build Command**: `flutter build web`
3. **Output Directory**: `build/web`
4. `vercel.json`이 루트(`memo_link_app/vercel.json`)에 있는지 확인

> 만약 Root Directory를 잘못 지정하면 rewrite가 적용되지 않아 404가 계속 발생합니다.
