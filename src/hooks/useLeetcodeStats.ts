import { useEffect, useState } from 'react';
import { LeetcodeStats, GithubDay } from '../types/portfolio';
import { readLocalCache, writeLocalCache } from '../utils/localCache';

const CACHE_TTL_MS = 60 * 60 * 1000;
const STALE_FALLBACK_MAX_AGE_MS = 24 * 60 * 60 * 1000;
const DAY_SECONDS = 86400;

interface LeetcodeStatsApiResponse {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  submissionCalendar: Record<string, number>;
}

interface LeetcodeProfileApiResponse {
  submitStats: {
    totalSubmissionNum: { difficulty: string; count: number; submissions: number }[];
  };
  recentSubmissions: {
    title: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }[];
}

interface LeetcodeContestsApiResponse {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  topPercentage: number;
  contestHistory: {
    attended: boolean;
    rating: number;
    ranking: number;
    trendDirection: 'UP' | 'DOWN';
    problemsSolved: number;
    totalProblems: number;
    contest: { title: string; startTime: number };
  }[];
}

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

function computeActiveDays(calendar: Record<string, number>): number {
  return Object.values(calendar).filter((count) => count > 0).length;
}

function computeLongestStreak(calendar: Record<string, number>): number {
  const activeDaySeconds = Object.keys(calendar)
    .map(Number)
    .filter((day) => calendar[day] > 0)
    .sort((a, b) => a - b);

  let longest = 0;
  let current = 0;
  let prevDay: number | null = null;

  for (const day of activeDaySeconds) {
    if (prevDay !== null && day - prevDay === DAY_SECONDS) {
      current++;
    } else {
      current = 1;
    }
    longest = Math.max(longest, current);
    prevDay = day;
  }

  return longest;
}

function levelForCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

function buildCalendarDays(calendar: Record<string, number>): GithubDay[] {
  const todayStart = Math.floor(Date.now() / 1000 / DAY_SECONDS) * DAY_SECONDS;
  const days: GithubDay[] = [];

  for (let i = 364; i >= 0; i--) {
    const daySeconds = todayStart - i * DAY_SECONDS;
    const count = calendar[daySeconds] ?? 0;
    days.push({
      date: new Date(daySeconds * 1000).toISOString().split('T')[0],
      count,
      level: levelForCount(count)
    });
  }

  return days;
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
      const fresh = readLocalCache<LeetcodeStats>(cacheKey, CACHE_TTL_MS);
      if (fresh) {
        setData(fresh);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const [statsRes, profileRes, contestsRes] = await Promise.all([
          fetch(`https://leetcode-stats.tashif.codes/${username}`),
          fetch(`https://leetcode-stats.tashif.codes/${username}/profile`),
          fetch(`https://leetcode-stats.tashif.codes/${username}/contests`)
        ]);

        if (!statsRes.ok || !profileRes.ok || !contestsRes.ok) {
          throw new Error('LeetCode data source failed to respond.');
        }

        const json: LeetcodeStatsApiResponse = await statsRes.json();
        const profile: LeetcodeProfileApiResponse = await profileRes.json();
        const contests: LeetcodeContestsApiResponse = await contestsRes.json();

        const allSubmissions = profile.submitStats.totalSubmissionNum.find(
          (s) => s.difficulty === 'All'
        );

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
          acceptanceRate: `${json.acceptanceRate.toFixed(2)}%`,
          ranking: `#${json.ranking.toLocaleString()}`,
          streakDays: computeStreakDays(json.submissionCalendar),
          attempting: allSubmissions ? Math.max(allSubmissions.count - json.totalSolved, 0) : 0,
          totalSubmissions: allSubmissions ? allSubmissions.submissions : 0,
          activeDays: computeActiveDays(json.submissionCalendar),
          longestStreak: computeLongestStreak(json.submissionCalendar),
          submissionCalendarDays: buildCalendarDays(json.submissionCalendar),
          recentSubmissions: profile.recentSubmissions
            .filter((s) => s.statusDisplay === 'Accepted')
            .slice(0, 6)
            .map((s) => ({
              title: s.title,
              timeAgo: timeAgo(Number(s.timestamp)),
              lang: s.lang
            })),
          contestsAttended: contests.attendedContestsCount,
          contestRating: Math.round(contests.rating),
          contestGlobalRanking: contests.globalRanking,
          contestTopPercentage: contests.topPercentage,
          contestHistory: contests.contestHistory
            .filter((c) => c.attended)
            .map((c) => ({
              title: c.contest.title,
              date: new Date(c.contest.startTime * 1000).toISOString().split('T')[0],
              rating: Math.round(c.rating),
              ranking: c.ranking,
              problemsSolved: c.problemsSolved,
              totalProblems: c.totalProblems,
              trendDirection: c.trendDirection
            }))
            .reverse()
        };

        writeLocalCache(cacheKey, result);
        if (!cancelled) setData(result);
      } catch (err) {
        const stale = readLocalCache<LeetcodeStats>(cacheKey, STALE_FALLBACK_MAX_AGE_MS);
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
