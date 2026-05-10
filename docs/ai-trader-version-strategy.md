# AI-Trader 릴리스/버전 전략

분석 대상: [HKUDS/AI-Trader](https://github.com/HKUDS/AI-Trader)

확인일: 2026-05-10

## 현재 상태 요약

- GitHub `Releases` 페이지와 `Tags` 페이지 기준으로 공식 릴리스와 태그가 아직 없습니다.
- `main` 브랜치는 2026-05-06 기준 `9a374a0` 커밋까지 진행되어 있고, 최근 커밋에 기능 추가와 가격 가드 보강이 섞여 있습니다.
- 따라서 현 시점에서는 `main`을 그대로 추적하기보다, 검증된 특정 커밋을 고정해서 내부 기준 버전으로 관리하는 전략이 필요합니다.

## 권장 정책

### 1. 외부 의존 기준은 커밋 SHA로 고정

AI-Trader에 공식 release/tag가 생기기 전까지는 `main` 브랜치 이름이 아니라 커밋 SHA를 기준으로 고정합니다.

권장 예시:

```text
AI_TRADER_UPSTREAM=HKUDS/AI-Trader
AI_TRADER_BASELINE_COMMIT=9a374a0
AI_TRADER_BASELINE_DATE=2026-05-06
AI_TRADER_REVIEW_DATE=2026-05-10
```

이렇게 기록하면 추후 장애가 발생했을 때 어떤 upstream 상태를 기준으로 검토했는지 역추적할 수 있습니다.

### 2. 내부 버전명을 별도로 부여

공식 버전이 없으므로 우리 쪽에서는 다음과 같은 내부 버전 체계를 사용합니다.

```text
ai-trader-eval.YYYYMMDD.N
```

예시:

```text
ai-trader-eval.20260510.1
```

내부 버전에는 반드시 다음 정보를 함께 기록합니다.

- upstream repository URL
- upstream commit SHA
- 검토일
- 적용 목적: 분석, PoC, 페이퍼 트레이딩, 상용 프로토타입 등
- 통과한 테스트 목록
- 알려진 제한 사항

### 3. 변경 추적 단위를 기능/리스크 기준으로 분류

AI-Trader는 트레이딩 도메인이므로 단순 기능 변경보다 리스크 분류가 중요합니다.

| 분류 | 예시 | 검토 강도 |
| --- | --- | --- |
| 문서/README | 안내 문구, 예시 업데이트 | 낮음 |
| UI | 대시보드, 랭킹, 챌린지 화면 | 중간 |
| 시그널/마켓플레이스 | 시그널 구매, 판매, dispute, escrow | 높음 |
| 주문/포지션 | buy/sell/short/cover, 평균단가, 정산 | 매우 높음 |
| 가격/데이터 | crypto, Polymarket, 주식 가격 fetcher | 매우 높음 |
| 인증/토큰 | agent token, session, 권한 | 매우 높음 |
| 백그라운드 작업 | 정산, market intel, worker loop | 높음 |

특히 가격 산정, 주문 실행, 포지션 계산, 인증 관련 변경은 별도의 regression checklist 없이 업데이트하지 않습니다.

### 4. 업데이트 절차

AI-Trader upstream을 새 커밋으로 올릴 때는 아래 순서를 따릅니다.

1. GitHub `Releases`와 `Tags`를 다시 확인합니다.
2. 대상 commit range의 커밋 목록을 확인합니다.
3. 변경 파일을 `service/server`, `service/frontend`, `skills`, `docs/api` 단위로 분류합니다.
4. API 스펙과 실제 route 구현이 어긋나는지 확인합니다.
5. 주문/포지션/가격/정산 관련 변경은 별도 테스트 케이스를 추가합니다.
6. 페이퍼 트레이딩 환경에서 최소 24시간 smoke run을 수행합니다.
7. 이상이 없을 때만 내부 기준 버전을 갱신합니다.

## 최소 검증 체크리스트

업stream 커밋을 내부 기준 버전으로 채택하기 전에 아래 항목을 확인합니다.

- [ ] 공식 release/tag 존재 여부 확인
- [ ] upstream commit SHA 기록
- [ ] 라이선스/사용 조건 재확인
- [ ] `.env.example` 또는 설정 키 변경 확인
- [ ] OpenAPI 문서와 실제 라우트 차이 확인
- [ ] agent skill 문서와 실제 API 차이 확인
- [ ] 페이퍼 주문 생성/체결/포지션 반영 테스트
- [ ] short position, partial close, settlement edge case 테스트
- [ ] 가격 fetch 실패, 오래된 가격, 잘못된 symbol 처리 테스트
- [ ] 토큰 유출 방지를 위한 로그 마스킹 확인
- [ ] background worker 중복 실행/재시작 동작 확인
- [ ] rollback 가능한 이전 내부 버전 보존

## 운영 판단 기준

### 사용 가능

- 페이퍼 트레이딩 실험
- AI 에이전트 시그널 발행/팔로우 PoC
- 커뮤니티/리더보드 기반 프로토타입
- 내부 연구용 agent workflow 실험

### 보류

- 실자금 자동매매
- 레버리지/선물/고빈도 거래
- 고객 자산을 직접 운용하는 상용 서비스
- 규제 준수, 감사, 책임 소재가 필요한 금융 서비스

## 다음 액션

1. `9a374a0`을 1차 baseline 후보로 기록합니다.
2. 실제 소스 클론이 가능한 환경에서 테스트 스위트와 API smoke test를 실행합니다.
3. `docs/api/openapi.yaml`, `skills/ai4trade/SKILL.md`, `service/server/routes*.py`를 서로 대조합니다.
4. 주문/가격/정산 관련 regression test 목록을 별도 문서로 분리합니다.
5. AI-Trader에 공식 release/tag가 생기면 내부 버전 정책을 tag 기반으로 전환합니다.
