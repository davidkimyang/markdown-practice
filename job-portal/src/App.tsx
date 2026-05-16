import React from 'react';
import {
  Sparkles,
  Wand2,
  Type,
  PenLine,
  Camera,
  Play,
  RotateCcw,
  Download,
  SlidersHorizontal,
  Layers,
  Hand,
} from 'lucide-react';

type Effect = {
  name: string;
  badge?: string;
};

type Preset = {
  title: string;
  description: string;
};

const effects: Effect[] = [
  { name: 'Canvas 2D' },
  { name: 'Neon', badge: 'HOT' },
  { name: 'Aurora' },
  { name: 'Gold' },
  { name: 'Calligraphy' },
  { name: 'Fire' },
  { name: 'Liquid' },
  { name: 'Hologram' },
  { name: 'Bloom' },
  { name: 'Dissolve' },
];

const presets: Preset[] = [
  {
    title: 'Text Mode',
    description: '공중에 글자를 쓰면 AI가 실시간으로 폰트로 변환합니다.',
  },
  {
    title: 'Drawing Mode',
    description: '손 제스처로 도형을 그리면 이펙트가 적용되어 살아납니다.',
  },
  {
    title: 'Gesture FX',
    description: '손 속도/방향을 감지해 선 두께, 광원, 파티클을 자동 조절합니다.',
  },
];

function App() {
  return (
    <div className="studio-page">
      <header className="topbar">
        <div className="brand">
          <Sparkles size={18} />
          <span>Glymo Studio Clone</span>
        </div>

        <div className="mode-switch">
          <button type="button" className="mode active">
            <Type size={15} /> Text
          </button>
          <button type="button" className="mode">
            <PenLine size={15} /> Drawing
          </button>
        </div>

        <div className="top-actions">
          <button type="button" className="btn ghost">
            <RotateCcw size={15} /> 초기화
          </button>
          <button type="button" className="btn primary">
            <Play size={15} /> 실행
          </button>
        </div>
      </header>

      <main className="studio-layout">
        <aside className="panel left-panel">
          <h2>
            <Wand2 size={16} /> Effects
          </h2>
          <ul className="effect-list" aria-label="visual effects">
            {effects.map((effect, index) => (
              <li key={effect.name} className={index === 1 ? 'selected' : ''}>
                <span>{effect.name}</span>
                {effect.badge && <em>{effect.badge}</em>}
              </li>
            ))}
          </ul>

          <div className="camera-card">
            <h3>
              <Camera size={15} /> Camera Input
            </h3>
            <p>웹캠 권한 허용 후 손을 카메라 앞에서 움직여보세요.</p>
            <button type="button" className="btn full">
              카메라 연결
            </button>
          </div>
        </aside>

        <section className="canvas-zone" aria-label="studio canvas area">
          <div className="hero-copy">
            <p className="badge">Draw rough. See magic.</p>
            <h1>손짓만으로 네온/오로라 드로잉을 만드는 AI 스튜디오</h1>
            <p>
              태블릿 없이 브라우저에서 바로 실행되는 인터랙티브 캔버스 UI를 재현했습니다.
              실제 서비스와 유사한 정보 구조(모드, 이펙트, 스타일, 라이브 프리뷰)를 중심으로 구성했습니다.
            </p>
          </div>

          <div className="canvas-card">
            <div className="canvas-overlay">
              <Hand size={17} />
              <span>Hand tracking ready</span>
            </div>
            <div className="mock-stroke one" />
            <div className="mock-stroke two" />
            <div className="mock-stroke three" />
          </div>

          <div className="preset-grid">
            {presets.map((preset) => (
              <article key={preset.title}>
                <h3>{preset.title}</h3>
                <p>{preset.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="panel right-panel">
          <h2>
            <SlidersHorizontal size={16} /> Style
          </h2>

          <div className="control-group">
            <label htmlFor="glow">Glow Intensity</label>
            <input id="glow" type="range" min="0" max="100" defaultValue="68" />
          </div>

          <div className="control-group">
            <label htmlFor="smooth">Smoothing</label>
            <input id="smooth" type="range" min="0" max="100" defaultValue="81" />
          </div>

          <div className="control-group">
            <label htmlFor="thickness">Brush Weight</label>
            <input id="thickness" type="range" min="0" max="100" defaultValue="54" />
          </div>

          <div className="asset-box">
            <h3>
              <Layers size={15} /> Output
            </h3>
            <button type="button" className="btn full">
              <Download size={14} /> PNG로 저장
            </button>
            <button type="button" className="btn ghost full">
              WebM 녹화 내보내기
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
