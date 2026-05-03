"use client";

import { FormEvent, useEffect, useState } from "react";

type Post = {
  id: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
};

const STORAGE_KEY = "mj-fan-board-posts";

export function BoardSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    setPosts(JSON.parse(raw));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nickname.trim() || !title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      nickname: nickname.trim(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toLocaleString("ko-KR"),
    };

    setPosts((prev) => [newPost, ...prev]);
    setNickname("");
    setTitle("");
    setContent("");
  };

  return (
    <section id="board" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Free Board</h2>
        <p className="text-sm text-slate-400">로그인 없이 닉네임으로 자유롭게 글을 남겨보세요.</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-4">
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임 / 아이디"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          placeholder="응원 메시지 또는 자유 글"
          className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        />
        <button className="rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold hover:bg-rose-400">게시하기</button>
      </form>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="text-sm text-slate-400">첫 게시글을 작성해보세요.</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span>@{post.nickname}</span>
                <span>{post.createdAt}</span>
              </div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{post.content}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
