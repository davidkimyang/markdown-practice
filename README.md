# MemoSaaS (Next.js + Supabase)

온라인 메모 공유 서비스 SaaS 예제입니다.

## 기능

- 비회원 메모 작성/저장 후 `/n/{short_id}` 링크 생성
- 메모 조회 페이지(읽기 전용)
- 로그인/회원가입(Supabase Auth)
- 대시보드: 내 메모 목록, 수정, 삭제
- 요금제: Free(하루 10개) / Pro(무제한, 만료일, 비공개)
- 보안: 길이 제한, 스크립트 제거, API rate limit, Supabase RLS

## 시작하기

```bash
cp .env.example .env.local
npm install
npm run dev
```

`NEXT_PUBLIC_BASE_URL`을 사용하는 경우 `.env.local`에 추가하세요.

## 필수 환경변수

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Supabase SQL

`supabase/schema.sql`을 SQL Editor에서 실행하세요.
