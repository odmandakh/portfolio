import { useEffect, useState } from 'react';
import { LeetcodeStats } from '../types/portfolio';
import { readSessionCache, writeSessionCache } from '../utils/sessionCache';

const CACHE_TTL_MS = 15 * 60 * 1000;

interface LeetcodeApiResponse {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  totalSubmissions: { difficulty: string; count: number; submissions: number }[];
  submissionCalendar: Record<string, number>;
  recentSubmissions: { title: string; timestamp: string; lang: string }[];
}

const DAY_SECONDS = 86400;

function computeStreakDays(calendar: Record<string, number>): number {
  const todayStart = Math.floor(Date.now() / 1000 / DAY_SECONDS) * DAY_SECONDS;
  let streak = 0;
  let day = todayStart;
  while ((calendar[day] ?? 0) > 0) {
    streak++;
    day -= DAY_SECONDS;
  }
  return streak;
}

function timeAgo(timestampSeconds: number): string {
  const diffMs = Date.now() - timestampSeconds * 1000;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function useLeetcodeStats(username: string) {
  const [data, setData] = useState<LeetcodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `leetcode-stats:${username}`;

    async function load() {
      const fresh = readSessionCache<LeetcodeStats>(cacheKey, CACHE_TTL_MS);
      if (fresh) {
        setData(fresh);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        if (!res.ok) throw new Error('LeetCode data source failed to respond.');
        const json: LeetcodeApiResponse = await res.json();

        const allSubs = json.totalSubmissions.find((s) => s.difficulty === 'All');
        const acceptanceRate =
          allSubs && allSubs.submissions > 0
            ? `${((allSubs.count / allSubs.submissions) * 100).toFixed(1)}%`
            : 'N/A';

        const result: LeetcodeStats = {
          username,
          totalSolved: json.totalSolved,
          totalQuestions: json.totalQuestions,
          easySolved: json.easySolved,
          easyTotal: json.totalEasy,
          mediumSolved: json.mediumSolved,
          mediumTotal: json.totalMedium,
          hardSolved: json.hardSolved,
          hardTotal: json.totalHard,
          acceptanceRate,
          ranking: `#${json.ranking.toLocaleString()}`,
          streakDays: computeStreakDays(json.submissionCalendar),
          recentSubmissions: json.recentSubmissions.slice(0, 4).map((s) => ({
            title: s.title,
            timeAgo: timeAgo(Number(s.timestamp)),
            lang: s.lang
          }))
        };

        writeSessionCache(cacheKey, result);
        if (!cancelled) setData(result);
      } catch (err) {
        const stale = readSessionCache<LeetcodeStats>(cacheKey);
        if (!cancelled) {
          if (stale) {
            setData(stale);
          } else {
            setError(err instanceof Error ? err.message : 'Failed to load LeetCode data');
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, loading, error };
}
