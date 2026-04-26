type Entry = { count: number; expiresAt: number };

const store = new Map<string, Entry>();

export function applyRateLimit(key: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.expiresAt) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;

  current.count += 1;
  store.set(key, current);
  return true;
}
