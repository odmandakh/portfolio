import React from 'react';
import { Github, Star, ExternalLink, Loader2, BookMarked } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useGithubStats, LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from '../../hooks/useGithubStats';

// GitHub's contribution greens; the empty cell is blended with the OS surface
const LEVEL_COLORS = ['#0e2832', '#0e4429', '#006d32', '#26a641', '#39d353'];

export const GithubView: React.FC = () => {
  const { data: githubData, loading, error } = useGithubStats(profileData.githubUsername);

  if (loading) {
    return (
      <div className="min-h-full bg-[#061e26] p-4 sm:p-6 flex items-center justify-center min-h-[400px] text-[#87949a] gap-2 text-sm">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading live GitHub data...</span>
      </div>
    );
  }

  if (error || !githubData) {
    return (
      <div className="min-h-full bg-[#061e26] p-4 sm:p-6 flex items-center justify-center min-h-[400px] text-[#f85149] text-sm text-center">
        Unable to load live GitHub data right now. Please try again later.
      </div>
    );
  }

  const stats = [
    { label: 'Contributions (last year)', value: githubData.totalContributionsYear.toLocaleString() },
    { label: 'Current streak', value: `${githubData.currentStreakDays} days` },
    { label: 'Stars earned', value: githubData.totalStars.toLocaleString() },
    { label: 'Public repositories', value: githubData.publicRepos.toLocaleString() }
  ];

  return (
    <div className="min-h-full bg-[#061e26] text-[#bcc7ca]">
      <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#264a4f]">
          <div className="flex items-center gap-3">
            <Github className="w-10 h-10 text-[#efefe8]" />
            <div>
              <h2 className="text-xl font-semibold text-[#efefe8] flex items-center gap-2">
                {githubData.username}
                <span className="px-2 py-0.5 rounded-full bg-[#264a4f] text-xs font-medium text-[#bcc7ca]">
                  {githubData.publicRepos}
                </span>
              </h2>
              <p className="text-sm text-[#87949a]">Open source software development & system utilities</p>
            </div>
          </div>

          <a
            href={`https://github.com/${githubData.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#142e38] hover:bg-[#1a3a45] border border-[#264a4f] hover:border-[#2aa198]/60 text-xs font-semibold text-[#efefe8] flex items-center gap-2 transition-colors"
          >
            View profile
            <ExternalLink className="w-3.5 h-3.5 text-[#2aa198]" />
          </a>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#0e2832]/60 border border-[#264a4f] divide-x divide-y sm:divide-y-0 divide-[#264a4f]">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 space-y-1">
              <span className="text-xs text-[#87949a] block">{stat.label}</span>
              <span className="text-2xl font-semibold text-[#efefe8] tabular-nums">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Contribution graph */}
        <div className="space-y-2">
          <h3 className="text-base font-normal text-[#efefe8]">
            {githubData.totalContributionsYear.toLocaleString()} contributions in the last year
          </h3>
          <div className="rounded-xl bg-[#0e2832]/60 border border-[#264a4f] p-4 space-y-3 overflow-x-auto">
            <div className="grid grid-rows-7 grid-flow-col gap-[3px] w-max">
              {githubData.contributionCalendar.map((day, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-[2px]"
                  style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
            <div className="flex items-center justify-end gap-1 text-xs text-[#87949a]">
              <span className="mr-1">Less</span>
              {LEVEL_COLORS.map((color) => (
                <span key={color} className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: color }} />
              ))}
              <span className="ml-1">More</span>
            </div>
          </div>
        </div>

        {/* Popular repositories */}
        {githubData.featuredRepos.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-base font-normal text-[#efefe8]">Popular repositories</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {githubData.featuredRepos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#0e2832]/60 hover:bg-[#0e2832] border border-[#264a4f] hover:border-[#2aa198]/50 transition-colors duration-200 flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1.5 min-w-0">
                    <span className="flex items-center gap-2 min-w-0">
                      <BookMarked className="w-4 h-4 shrink-0 text-[#87949a]" />
                      <span className="font-semibold text-sm text-[#358fe5] group-hover:underline truncate">{repo.name}</span>
                    </span>
                    {repo.description && (
                      <p className="text-xs text-[#87949a] line-clamp-2 leading-relaxed">{repo.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#87949a]">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? DEFAULT_LANGUAGE_COLOR }}
                      />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {repo.stars}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
