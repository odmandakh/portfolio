interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

export function readLocalCache<T>(key: string, maxAgeMs?: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (maxAgeMs !== undefined && Date.now() - entry.fetchedAt > maxAgeMs) return null;
    return entry.data;
  } catch {
    return null;
  }
}

export function writeLocalCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, fetchedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage unavailable or quota exceeded — caching is a non-critical optimization
  }
}
