# Memo Link App (Flutter + Supabase)

링크 기반 메모 공유 앱입니다. Android/macOS 실행을 목표로 했습니다.

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
