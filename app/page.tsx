"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const STORAGE_KEY = "simple-todos";

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTodos(JSON.parse(saved) as Todo[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const remaining = useMemo(() => todos.filter((todo) => !todo.done).length, [todos]);

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearDone = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  return (
    <main className="mx-auto min-h-[70vh] max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold">📝 간단한 투두 리스트</h1>
      <p className="mt-2 text-slate-400">할 일을 추가하고 완료 체크해보세요.</p>

      <form onSubmit={addTodo} className="mt-6 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="예: 운동 30분 하기"
          className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white outline-none focus:border-rose-400"
        />
        <button type="submit" className="rounded-lg bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-400">
          추가
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
        <span>남은 할 일: {remaining}개</span>
        <button onClick={clearDone} className="text-rose-400 hover:text-rose-300">
          완료 항목 지우기
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {todos.length === 0 ? (
          <li className="rounded-lg border border-dashed border-slate-600 p-4 text-slate-400">아직 할 일이 없어요!</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-900 p-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} className="h-4 w-4" />
                <span className={todo.done ? "text-slate-500 line-through" : "text-white"}>{todo.text}</span>
              </label>
              <button onClick={() => removeTodo(todo.id)} className="text-sm text-red-400 hover:text-red-300">
                삭제
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
