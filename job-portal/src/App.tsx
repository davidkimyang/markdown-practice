import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  Check,
} from 'lucide-react';

type Mode = 'text' | 'drawing';

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

const getEffectColor = (effect: string): string => {
  switch (effect) {
    case 'Neon':
      return '#8cd8ff';
    case 'Aurora':
      return '#8df7bb';
    case 'Gold':
      return '#ffd87a';
    case 'Calligraphy':
      return '#e5e7f7';
    case 'Fire':
      return '#ff9f60';
    case 'Liquid':
      return '#7edcff';
    case 'Hologram':
      return '#d0b3ff';
    case 'Bloom':
      return '#ffb8ec';
    case 'Dissolve':
      return '#b9c0df';
    default:
      return '#8db9ff';
  }
};


const safeGetContext = (canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | null => {
  if (!canvas) {
    return null;
  }

  if (process.env.NODE_ENV === 'test') {
    return null;
  }

  try {
    return canvas.getContext('2d');
  } catch {
    return null;
  }
};

function App() {
  const [mode, setMode] = useState<Mode>('text');
  const [selectedEffect, setSelectedEffect] = useState('Neon');
  const [glow, setGlow] = useState(68);
  const [smoothing, setSmoothing] = useState(81);
  const [thickness, setThickness] = useState(54);
  const [textInput, setTextInput] = useState('GLYMO');
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [cameraMessage, setCameraMessage] = useState('웹캠 권한 허용 후 손을 카메라 앞에서 움직여보세요.');

  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const effectHint = useMemo(() => {
    if (mode === 'text') {
      return `"${textInput || 'GLYMO'}" 텍스트에 ${selectedEffect} 효과를 적용합니다.`;
    }

    return `${selectedEffect} 브러시로 캔버스에 직접 드로잉할 수 있습니다.`;
  }, [mode, selectedEffect, textInput]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.max(Math.floor(width * dpr), 1);
    canvas.height = Math.max(Math.floor(height * dpr), 1);

    const context = safeGetContext(canvas);
    if (!context) {
      return;
    }

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(dpr, dpr);
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }, []);

  useEffect(() => {
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = safeGetContext(canvas ?? null);

    if (!canvas || !context) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleReset = () => {
    setMode('text');
    setSelectedEffect('Neon');
    setGlow(68);
    setSmoothing(81);
    setThickness(54);
    setTextInput('GLYMO');
    setCameraStatus('idle');
    setCameraMessage('웹캠 권한 허용 후 손을 카메라 앞에서 움직여보세요.');
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = null;
    }
    clearCanvas();
  };

  const drawStroke = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number) => {
      const canvas = canvasRef.current;
      const context = safeGetContext(canvas ?? null);
      if (!canvas || !context) {
        return;
      }

      const color = getEffectColor(selectedEffect);
      const lineWidth = 1.5 + thickness / 9;

      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.shadowBlur = 8 + glow / 1.7;
      context.shadowColor = color;
      context.globalAlpha = 0.55 + smoothing / 220;

      context.beginPath();
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    },
    [selectedEffect, thickness, glow, smoothing],
  );

  const getCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== 'drawing') {
      return;
    }

    const point = getCanvasPoint(event);
    if (!point) {
      return;
    }

    drawingRef.current = true;
    lastPointRef.current = point;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || mode !== 'drawing') {
      return;
    }

    const point = getCanvasPoint(event);
    const lastPoint = lastPointRef.current;

    if (!point || !lastPoint) {
      return;
    }

    drawStroke(lastPoint.x, lastPoint.y, point.x, point.y);
    lastPointRef.current = point;
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleCameraConnect = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraStatus('error');
      setCameraMessage('이 브라우저에서는 카메라 API를 지원하지 않습니다. Safari/Chrome에서 열어주세요.');
      return;
    }

    setCameraStatus('connecting');
    setCameraMessage('카메라 연결 중...');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = stream;

      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
      }

      setCameraStatus('connected');
      setCameraMessage('카메라 연결 완료. 손을 움직여 드로잉을 테스트해보세요.');
    } catch (error) {
      const name = error instanceof DOMException ? error.name : 'UnknownError';

      setCameraStatus('error');
      if (name === 'NotAllowedError') {
        setCameraMessage('카메라 권한이 거부되었습니다. 브라우저/OS 권한을 허용해주세요.');
      } else if (name === 'NotFoundError') {
        setCameraMessage('사용 가능한 카메라를 찾지 못했습니다.');
      } else {
        setCameraMessage('카메라 연결 실패. GitHub 인앱 브라우저 대신 Safari에서 다시 시도해주세요.');
      }
    }
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const link = document.createElement('a');
    link.download = `glymo-clone-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="studio-page">
      <header className="topbar">
        <div className="brand">
          <Sparkles size={18} />
          <span>Glymo Studio Clone</span>
        </div>

        <div className="mode-switch" role="tablist" aria-label="mode switch">
          <button
            type="button"
            className={`mode ${mode === 'text' ? 'active' : ''}`}
            aria-pressed={mode === 'text'}
            onClick={() => setMode('text')}
          >
            <Type size={15} /> Text
          </button>
          <button
            type="button"
            className={`mode ${mode === 'drawing' ? 'active' : ''}`}
            aria-pressed={mode === 'drawing'}
            onClick={() => setMode('drawing')}
          >
            <PenLine size={15} /> Drawing
          </button>
        </div>

        <div className="top-actions">
          <button type="button" className="btn ghost" onClick={handleReset}>
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
            {effects.map((effect) => (
              <li key={effect.name}>
                <button
                  type="button"
                  onClick={() => setSelectedEffect(effect.name)}
                  className={`effect-item ${selectedEffect === effect.name ? 'selected' : ''}`}
                  aria-pressed={selectedEffect === effect.name}
                >
                  <span>{effect.name}</span>
                  <span className="effect-tags">
                    {effect.badge && <em>{effect.badge}</em>}
                    {selectedEffect === effect.name && <Check size={14} />}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="camera-card">
            <h3>
              <Camera size={15} /> Camera Input
            </h3>
            <p>{cameraMessage}</p>
            <button type="button" className="btn full" onClick={handleCameraConnect}>
              {cameraStatus === 'connecting' ? '연결 중...' : cameraStatus === 'connected' ? '카메라 재연결' : '카메라 연결'}
            </button>
            <video ref={cameraVideoRef} className="camera-preview" autoPlay muted playsInline />
          </div>
        </aside>

        <section className="canvas-zone" aria-label="studio canvas area">
          <div className="hero-copy">
            <p className="badge">Draw rough. See magic.</p>
            <h1>손짓만으로 네온/오로라 드로잉을 만드는 AI 스튜디오</h1>
            <p>
              모드와 효과 선택에 따라 캔버스 프리뷰가 바뀌고, Drawing 모드에서는 직접 선을 그릴 수 있습니다.
              실제 스튜디오 느낌으로 조작 흐름을 확인할 수 있게 개선했습니다.
            </p>
          </div>

          <div className="canvas-card">
            <div className="canvas-overlay">
              <Hand size={17} />
              <span>{mode === 'text' ? 'Text tracking ready' : 'Gesture drawing ready'}</span>
            </div>

            <canvas
              ref={canvasRef}
              className="draw-canvas"
              aria-label="drawing canvas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />

            <p className="canvas-hint">{effectHint}</p>
            <h2 className="preview-text">{mode === 'text' ? textInput || 'GLYMO' : selectedEffect}</h2>

            <div className="mock-stroke one" style={{ opacity: Math.max(glow / 100, 0.25) }} />
            <div className="mock-stroke two" style={{ width: `${34 + smoothing * 0.2}%` }} />
            <div className="mock-stroke three" style={{ height: `${6 + thickness * 0.1}px` }} />
          </div>

          <div className="input-card">
            <label htmlFor="text-input">Live Text</label>
            <input
              id="text-input"
              value={textInput}
              onChange={(event) => setTextInput(event.target.value.toUpperCase())}
              placeholder="텍스트를 입력해 미리보기"
              disabled={mode === 'drawing'}
            />
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
            <label htmlFor="glow">Glow Intensity ({glow})</label>
            <input
              id="glow"
              type="range"
              min="0"
              max="100"
              value={glow}
              onChange={(event) => setGlow(Number(event.target.value))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="smooth">Smoothing ({smoothing})</label>
            <input
              id="smooth"
              type="range"
              min="0"
              max="100"
              value={smoothing}
              onChange={(event) => setSmoothing(Number(event.target.value))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="thickness">Brush Weight ({thickness})</label>
            <input
              id="thickness"
              type="range"
              min="0"
              max="100"
              value={thickness}
              onChange={(event) => setThickness(Number(event.target.value))}
            />
          </div>

          <div className="asset-box">
            <h3>
              <Layers size={15} /> Output
            </h3>
            <button type="button" className="btn full" onClick={handleDownloadPng}>
              <Download size={14} /> PNG로 저장
            </button>
            <button type="button" className="btn ghost full" onClick={clearCanvas}>
              캔버스 지우기
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
