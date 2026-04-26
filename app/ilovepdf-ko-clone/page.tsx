const toolCategories = [
  {
    title: "PDF 구성",
    items: [
      ["PDF 합치기", "여러 PDF 파일을 원하는 순서대로 병합합니다."],
      ["PDF 분할", "페이지 범위를 선택해 문서를 나누거나 페이지별 파일로 저장합니다."],
      ["PDF 구성", "페이지 순서를 재정렬하고 필요 없는 페이지를 제거합니다."],
    ],
  },
  {
    title: "PDF 변환",
    items: [
      ["JPG PDF 변환", "이미지를 PDF 파일로 빠르게 변환합니다."],
      ["PDF JPG 변환", "PDF 페이지를 JPG로 내보내거나 이미지를 추출합니다."],
      ["워드 PDF 변환", "DOC/DOCX 문서를 PDF로 안전하게 변환합니다."],
    ],
  },
  {
    title: "PDF 편집/보안",
    items: [
      ["PDF 편집", "텍스트, 도형, 이미지, 주석을 문서에 추가합니다."],
      ["워터마크 추가", "브랜드 문구와 로고를 PDF 위에 삽입합니다."],
      ["PDF 보호", "비밀번호 설정으로 파일 접근을 제한합니다."],
    ],
  },
];

export default function ILovePdfKoClonePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-14 px-4 py-10">
      <header className="space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">iLovePDF 스타일 분석 페이지</p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          PDF 애호가들을 위한 온라인 툴
        </h1>
        <p className="mx-auto max-w-3xl text-base text-slate-600 sm:text-lg">
          원본(https://www.ilovepdf.com/ko)의 정보 구조를 참고해, 핵심 섹션과 카드형 도구 목록을
          재구성한 학습용 클론 화면입니다.
        </p>
        <div className="flex justify-center gap-3">
          <button className="rounded-lg bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-rose-700">
            PDF 합치기 시작
          </button>
          <button className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            모든 도구 보기
          </button>
        </div>
      </header>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-3">
        <article>
          <h2 className="text-sm font-bold text-slate-900">빠른 작업</h2>
          <p className="mt-2 text-sm text-slate-600">업로드 후 2~3단계 안에 대부분의 작업을 완료할 수 있도록 구성</p>
        </article>
        <article>
          <h2 className="text-sm font-bold text-slate-900">다양한 변환</h2>
          <p className="mt-2 text-sm text-slate-600">PDF ↔ Office/JPG 변환 도구를 상단 중심 콘텐츠로 배치</p>
        </article>
        <article>
          <h2 className="text-sm font-bold text-slate-900">보안 강조</h2>
          <p className="mt-2 text-sm text-slate-600">암호화, 잠금 해제, 전자 서명 등 신뢰 관련 기능을 독립 카테고리로 구성</p>
        </article>
      </section>

      <section className="space-y-8">
        {toolCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">{category.title}</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {category.items.map(([name, desc]) => (
                <article
                  key={name}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                >
                  <h4 className="text-lg font-semibold text-slate-900">{name}</h4>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl bg-slate-900 px-6 py-10 text-white">
        <h3 className="text-2xl font-bold">프리미엄 섹션 구조 예시</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-200">
          <li>광고 제거 및 처리 횟수 제한 완화</li>
          <li>OCR, 전자 서명 요청, 워크플로 자동화 같은 고급 기능 제공</li>
          <li>데스크톱/모바일 앱과의 연동 메시지로 전환 유도</li>
        </ul>
      </section>
    </main>
  );
}
