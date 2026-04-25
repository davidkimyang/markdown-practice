import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Pin, PinOff, Trash2, FileText } from 'lucide-react';

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  pinned: boolean;
};

const STORAGE_KEY = 'simple-notes-v1';

const createId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createNewNote = (): Note => {
  const now = new Date().toISOString();
  return {
    id: createId(),
    title: '새 메모',
    content: '',
    updatedAt: now,
    pinned: false,
  };
};

const formatKoreanDate = (iso: string): string => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [
        {
          id: createId(),
          title: '오늘 아이디어',
          content: '심플한 메모앱 느낌\n- 할 일 정리\n- 떠오른 생각 기록\n- 빠르게 검색',
          updatedAt: new Date().toISOString(),
          pinned: true,
        },
      ];
    }

    try {
      const parsed = JSON.parse(saved) as Note[];
      return parsed;
    } catch {
      return [];
    }
  });

  const [selectedId, setSelectedId] = useState<string>(() => notes[0]?.id ?? '');
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const search = query.trim().toLowerCase();

    return [...notes]
      .sort((a, b) => {
        if (a.pinned === b.pinned) {
          return b.updatedAt.localeCompare(a.updatedAt);
        }
        return a.pinned ? -1 : 1;
      })
      .filter((note) => {
        if (!search) {
          return true;
        }

        return (
          note.title.toLowerCase().includes(search) ||
          note.content.toLowerCase().includes(search)
        );
      });
  }, [notes, query]);

  useEffect(() => {
    if (!selectedId && filteredNotes[0]) {
      setSelectedId(filteredNotes[0].id);
    }
  }, [filteredNotes, selectedId]);

  const selectedNote = notes.find((note) => note.id === selectedId);

  const updateSelectedNote = (next: Partial<Note>) => {
    if (!selectedNote) {
      return;
    }

    const updatedAt = new Date().toISOString();
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNote.id
          ? { ...note, ...next, updatedAt: next.updatedAt ?? updatedAt }
          : note,
      ),
    );
  };

  const handleAddNote = () => {
    const newNote = createNewNote();
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
    setQuery('');
  };

  const handleDeleteNote = () => {
    if (!selectedNote) {
      return;
    }

    setNotes((prev) => prev.filter((note) => note.id !== selectedNote.id));

    const remaining = notes.filter((note) => note.id !== selectedNote.id);
    setSelectedId(remaining[0]?.id ?? '');
  };

  return (
    <div className="notes-shell">
      <div className="notes-window">
        <aside className="sidebar">
          <div className="brand-row">
            <h1>메모</h1>
            <button type="button" className="icon-btn primary" onClick={handleAddNote} aria-label="새 메모 생성">
              <Plus size={18} />
            </button>
          </div>

          <label className="search-box" htmlFor="note-search">
            <Search size={16} />
            <input
              id="note-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="메모 검색"
            />
          </label>

          <div className="note-list" aria-label="메모 목록">
            {filteredNotes.length === 0 && <p className="empty-list">검색 결과가 없어요.</p>}

            {filteredNotes.map((note) => (
              <button
                key={note.id}
                type="button"
                className={`note-item ${note.id === selectedId ? 'active' : ''}`}
                onClick={() => setSelectedId(note.id)}
              >
                <div className="note-item-title-row">
                  <strong>{note.title || '제목 없음'}</strong>
                  {note.pinned && <Pin size={14} />}
                </div>
                <p>{note.content || '내용 없음'}</p>
                <span>{formatKoreanDate(note.updatedAt)}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="editor">
          {selectedNote ? (
            <>
              <div className="editor-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => updateSelectedNote({ pinned: !selectedNote.pinned })}
                >
                  {selectedNote.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                  {selectedNote.pinned ? '고정 해제' : '상단 고정'}
                </button>

                <button type="button" className="icon-btn danger" onClick={handleDeleteNote}>
                  <Trash2 size={16} /> 삭제
                </button>
              </div>

              <input
                className="title-input"
                value={selectedNote.title}
                onChange={(event) => updateSelectedNote({ title: event.target.value })}
                placeholder="제목"
              />

              <textarea
                className="content-input"
                value={selectedNote.content}
                onChange={(event) => updateSelectedNote({ content: event.target.value })}
                placeholder="여기에 메모를 작성하세요"
              />

              <footer className="editor-footer">최근 수정: {formatKoreanDate(selectedNote.updatedAt)}</footer>
            </>
          ) : (
            <div className="empty-state">
              <FileText size={40} />
              <p>왼쪽 + 버튼으로 첫 메모를 만들어보세요.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
