import React from 'react';
import { Github, Flame, ChevronRight, Star, GitBranch, Loader2, BookMarked } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useGithubStats, LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from '../../hooks/useGithubStats';

// Same contribution cells as the GitHub widget
const getLevelColor = (level: number) => {
  switch (level) {
    case 1: return 'bg-[#0e4429] border border-[#006d32]/30';
    case 2: return 'bg-[#006d32] border border-[#26a641]/30';
    case 3: return 'bg-[#26a641]';
    case 4: return 'bg-[#39d353]';
    default: return 'bg-[#161b22] border border-[#21262d]';
  }
};

export const GithubView: React.FC = () => {
  const { data: githubData, loading, error } = useGithubStats(profileData.githubUsername);

  if (loading) {
    return (
      <div className="min-h-full bg-[#0d1117] flex items-center justify-center min-h-[400px] text-[#8b949e] gap-2 text-xs font-mono">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading live GitHub data...</span>
      </div>
    );
  }

  if (error || !githubData) {
    return (
      <div className="min-h-full bg-[#0d1117] flex items-center justify-center min-h-[400px] text-[#f85149] text-xs font-mono text-center px-4">
        Unable to load live GitHub data
      </div>
    );
  }

  const stats = [
    { label: 'Contributions (last year)', value: githubData.totalContributionsYear.toLocaleString() },
    { label: 'Current streak', value: `${githubData.currentStreakDays}d` },
    { label: 'Stars earned', value: githubData.totalStars.toLocaleString() },
    { label: 'Public repos', value: githubData.publicRepos.toLocaleString() }
  ];

  return (
    <div className="min-h-full bg-[#0d1117] text-[#8b949e]">
      <div className="p-4 sm:p-6 space-y-5 max-w-4xl mx-auto">
        {/* Header, as on the widget */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#21262d] border border-[#30363d] text-[#f0f6fc]">
              <Github className="w-6 h-6 text-[#f0f6fc]" />
            </div>
            <div>
              <span className="text-base font-bold text-[#f0f6fc] block">@{githubData.username}</span>
              <span className="text-[11px] text-[#8b949e] font-mono block -mt-0.5">GitHub Activity</span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#f0883e]/10 border border-[#f0883e]/30 text-[#f0883e] text-xs font-mono font-bold">
            <Flame className="w-3.5 h-3.5 fill-[#f0883e]" />
            <span>{githubData.currentStreakDays}d streak</span>
          </div>
        </div>

        {/* Headline number with repos and stars, as on the widget */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b border-[#30363d]">
          <div>
            <span className="text-4xl font-black text-[#f0f6fc] tracking-tight font-mono">
              {githubData.totalContributionsYear.toLocaleString()}
            </span>
            <span className="text-sm text-[#8b949e] font-medium ml-2">contributions in the last year</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-[#8b949e] font-mono">
            <span className="flex items-center"><GitBranch className="w-4 h-4 mr-1 text-[#3fb950]" />{githubData.publicRepos}</span>
            <span className="flex items-center text-[#e3b341]"><Star className="w-4 h-4 mr-1 fill-[#e3b341]" />{githubData.totalStars}</span>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-1">
              <span className="text-[10px] text-[#8b949e] font-mono block">{stat.label}</span>
              <span className="text-xl font-black text-[#f0f6fc] font-mono">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Full-year heatmap */}
        <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2 overflow-x-auto">
          <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
            {githubData.contributionCalendar.map((day) => (
              <div
                key={day.date}
                className={`w-2.5 h-2.5 rounded-[2px] ${getLevelColor(day.level)}`}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-[#8b949e] font-mono pt-1">
            <a
              href={`https://github.com/${githubData.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-[#3fb950] font-semibold flex items-center"
            >
              View Profile <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <div className="flex items-center space-x-1">
              <span>Less</span>
              <span className="w-2 h-2 rounded-[1px] bg-[#161b22] border border-[#21262d]" />
              <span className="w-2 h-2 rounded-[1px] bg-[#0e4429]" />
              <span className="w-2 h-2 rounded-[1px] bg-[#006d32]" />
              <span className="w-2 h-2 rounded-[1px] bg-[#26a641]" />
              <span className="w-2 h-2 rounded-[1px] bg-[#39d353]" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Popular repositories */}
        {githubData.featuredRepos.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] text-[#8b949e] font-mono block">Popular repositories</span>
            <div className="grid sm:grid-cols-3 gap-3">
              {githubData.featuredRepos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-[#0d1117] hover:bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]/60 transition-all duration-300 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5 min-w-0">
                    <span className="flex items-center gap-2 min-w-0">
                      <BookMarked className="w-4 h-4 shrink-0 text-[#8b949e]" />
                      <span className="text-sm font-bold text-[#f0f6fc] group-hover:text-[#3fb950] transition-colors truncate">{repo.name}</span>
                    </span>
                    {repo.description && <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed">{repo.description}</p>}
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-[#8b949e] font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? DEFAULT_LANGUAGE_COLOR }} />
                      {repo.language}
                    </span>
                    <span className="flex items-center text-[#e3b341]">
                      <Star className="w-3 h-3 mr-1 fill-[#e3b341]" />
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
