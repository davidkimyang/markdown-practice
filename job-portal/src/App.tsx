import React from 'react';
import {
  Bookmark,
  CircleUserRound,
  Ellipsis,
  Heart,
  Home,
  MessageCircle,
  Navigation,
  PlaySquare,
  Repeat,
  Search,
  Volume2,
} from 'lucide-react';

type Story = {
  id: number;
  name: string;
  image: string;
  mine?: boolean;
};

const stories: Story[] = [
  { id: 1, name: '내 스토리', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop', mine: true },
  { id: 2, name: 'timberwolves', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&h=200&fit=crop' },
  { id: 3, name: 'magicjohnson', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
  { id: 4, name: 'shams', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
];

function App() {
  return (
    <div className="insta-shell">
      <div className="phone-frame">
        <header className="status-bar">
          <span>8:44</span>
          <span className="battery">68</span>
        </header>

        <section className="story-strip" aria-label="스토리 목록">
          {stories.map((story) => (
            <div key={story.id} className="story-item">
              <div className="story-ring">
                <img src={story.image} alt={story.name} />
                {story.mine && <span className="story-plus">+</span>}
              </div>
              <span>{story.name}</span>
            </div>
          ))}
        </section>

        <article className="post-card" aria-label="인스타그램 게시글 미리보기">
          <div className="post-header">
            <div className="author-wrap">
              <div className="author-avatar">AF</div>
              <strong>ai.favmag</strong>
            </div>
            <Ellipsis size={24} />
          </div>

          <div className="post-media">
            <img
              src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=1200&h=1600&fit=crop"
              alt="AI 미디어 아트 인터랙션 장면"
            />
            <button className="mute-btn" aria-label="음소거 토글">
              <Volume2 size={22} />
            </button>
            <div className="media-caption">AI Fav Mag</div>
          </div>

          <div className="post-dots" aria-hidden="true">
            <span />
            <span />
            <span className="active" />
            <span />
            <span />
          </div>

          <div className="post-actions">
            <div><Heart /> 1,552</div>
            <div><MessageCircle /> 377</div>
            <div><Repeat /> 106</div>
            <div><Navigation /> 899</div>
            <Bookmark className="bookmark" />
          </div>

          <p className="post-text">
            <strong>ai.favmag</strong> 코딩 없이 인터랙티브 미디어 아트가 만들어지는 워크플로우를 소개합니다.
          </p>
          <span className="post-time">4일 전</span>
        </article>

        <nav className="bottom-nav" aria-label="하단 네비게이션">
          <Home />
          <PlaySquare />
          <Navigation />
          <Search />
          <CircleUserRound />
        </nav>
      </div>
    </div>
  );
}

export default App;
