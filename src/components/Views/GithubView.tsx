import React from 'react';
import { 
  Github, 
  GitCommit, 
  Star, 
  GitFork, 
  Flame, 
  ExternalLink,
  Code2,
  Calendar
} from 'lucide-react';
import { githubData } from '../../data/github';

export const GithubView: React.FC = () => {
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-950/80 border border-emerald-800/40';
      case 2: return 'bg-emerald-700/80';
      case 3: return 'bg-emerald-500';
      case 4: return 'bg-emerald-300 shadow-sm shadow-emerald-400/50';
      default: return 'bg-zinc-800/60';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto text-zinc-200">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Github className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>@{githubData.username}</span>
              <span className="text-xs font-mono font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                {githubData.publicRepos} Repositories
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Open source software development & system utilities
            </p>
          </div>
        </div>

        <a
          href={`https://github.com/${githubData.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition-colors"
        >
          <span>View GitHub Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* GitHub Key Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
            Contributions (Year)
          </span>
          <span className="text-2xl font-black text-white tracking-tight">
            {githubData.totalContributionsYear.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
            Current Streak
          </span>
          <span className="text-2xl font-black text-amber-400 tracking-tight flex items-center gap-1">
            <Flame className="w-5 h-5 fill-amber-400" />
            {githubData.currentStreakDays} days
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
            Total Stars Earned
          </span>
          <span className="text-2xl font-black text-emerald-400 tracking-tight">
            {githubData.totalStars.toLocaleString()}+
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
            Public Repos
          </span>
          <span className="text-2xl font-black text-blue-400 tracking-tight">
            {githubData.publicRepos}
          </span>
        </div>
      </div>

      {/* Full 52-Week Heatmap Graph */}
      <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3 overflow-x-auto">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>2,482 contributions in the last year</span>
          </span>
          <div className="flex items-center space-x-1 text-[10px] text-zinc-500">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950/80" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700/80" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-300" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid Matrix */}
        <div className="grid grid-rows-7 grid-flow-col gap-1 w-max pt-2">
          {githubData.contributionCalendar.map((day, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-[2px] transition-colors ${getLevelColor(day.level)}`}
              title={`${day.date}: ${day.count} commits`}
            />
          ))}
        </div>
      </div>

      {/* Featured Repositories Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Featured Repositories</span>
        </h3>

        <div className="grid sm:grid-cols-3 gap-3">
          {githubData.featuredRepos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-zinc-950/50 hover:bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 transition-all duration-200 space-y-2 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors truncate">
                    {repo.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 shrink-0" />
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
                <span className="text-emerald-400 font-semibold">{repo.language}</span>
                <span className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 mr-1 fill-amber-400" />
                  {repo.stars}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
