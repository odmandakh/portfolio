import { useEffect, useState } from 'react';
import { GithubStats, GithubDay } from '../types/portfolio';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Go: '#00add8',
  Python: '#3572A5',
  Rust: '#dea584',
  Shell: '#89e051',
  PHP: '#4F5D95',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Ruby: '#701516'
};
const DEFAULT_LANGUAGE_COLOR = '#8b949e';

interface GithubApiUser {
  public_repos: number;
}

interface GithubApiRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  fork: boolean;
}

interface ContributionsApiResponse {
  total: Record<string, number>;
  contributions: GithubDay[];
}

function computeCurrentStreak(days: GithubDay[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}

export function useGithubStats(username: string) {
  const [data, setData] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [userRes, reposRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
        ]);

        if (!userRes.ok || !reposRes.ok || !contribRes.ok) {
          throw new Error('One or more GitHub data sources failed to respond.');
        }

        const user: GithubApiUser = await userRes.json();
        const repos: GithubApiRepo[] = await reposRes.json();
        const contrib: ContributionsApiResponse = await contribRes.json();

        const ownRepos = repos.filter((r) => !r.fork);
        const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

        const featuredRepos = [...ownRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3)
          .map((r) => ({
            name: r.name,
            description: r.description ?? '',
            stars: r.stargazers_count,
            language: r.language ?? 'Unknown',
            url: r.html_url
          }));

        const languageCounts = new Map<string, number>();
        ownRepos.forEach((r) => {
          if (!r.language) return;
          languageCounts.set(r.language, (languageCounts.get(r.language) ?? 0) + 1);
        });
        const totalWithLanguage = Array.from(languageCounts.values()).reduce((a, b) => a + b, 0);
        const topLanguages = Array.from(languageCounts.entries())
          .map(([name, count]) => ({
            name,
            percentage: totalWithLanguage > 0 ? Math.round((count / totalWithLanguage) * 100) : 0,
            color: LANGUAGE_COLORS[name] ?? DEFAULT_LANGUAGE_COLOR
          }))
          .sort((a, b) => b.percentage - a.percentage);

        const contributionCalendar = contrib.contributions;
        const totalContributionsYear = contrib.total.lastYear ?? 0;

        if (!cancelled) {
          setData({
            username,
            totalContributionsYear,
            currentStreakDays: computeCurrentStreak(contributionCalendar),
            publicRepos: user.public_repos,
            totalStars,
            topLanguages,
            contributionCalendar,
            featuredRepos
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
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
