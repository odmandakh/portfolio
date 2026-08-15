interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

export function readSessionCache<T>(key: string, maxAgeMs?: number): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (maxAgeMs !== undefined && Date.now() - entry.fetchedAt > maxAgeMs) return null;
    return entry.data;
  } catch {
    return null;
  }
}

export function writeSessionCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { data, fetchedAt: Date.now() };
    sessionStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // sessionStorage unavailable or quota exceeded — caching is a non-critical optimization
  }
}
