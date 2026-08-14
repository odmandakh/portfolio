import React from 'react';
import { Github, Flame, ChevronRight, Star, GitBranch, Loader2 } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useGithubStats } from '../../hooks/useGithubStats';

interface GithubWidgetProps {
  onClick: () => void;
}

export const GithubWidget: React.FC<GithubWidgetProps> = ({ onClick }) => {
  const { data: githubData, loading, error } = useGithubStats(profileData.githubUsername);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-[#0e4429] border border-[#006d32]/30';
      case 2: return 'bg-[#006d32] border border-[#26a641]/30';
      case 3: return 'bg-[#26a641]';
      case 4: return 'bg-[#39d353] shadow-sm shadow-[#39d353]/50';
      default: return 'bg-[#161b22] border border-[#21262d]';
    }
  };

  const recentDays = githubData?.contributionCalendar.slice(-112) ?? [];

  return (
    <button
      onClick={onClick}
      className="group text-left w-full h-full p-4 rounded-2xl bg-[#0d1117] hover:bg-[#161b22] border border-[#30363d] hover:border-[#8b949e]/60 shadow-xl shadow-black/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      {/* GitHub Official Top Header */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#21262d] border border-[#30363d] text-[#f0f6fc]">
            <Github className="w-4 h-4 text-[#f0f6fc]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-[#f0f6fc] group-hover:text-[#3fb950] transition-colors font-sans">
                @{profileData.githubUsername}
              </span>
            </div>
            <span className="text-[10px] text-[#8b949e] font-mono block -mt-0.5">GitHub Activity</span>
          </div>
        </div>

        {githubData && (
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-[#f0883e]/10 border border-[#f0883e]/30 text-[#f0883e] text-[11px] font-mono font-bold">
            <Flame className="w-3 h-3 fill-[#f0883e]" />
            <span>{githubData.currentStreakDays}d streak</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center py-6 text-[#8b949e] gap-2 text-xs font-mono">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading live GitHub data...</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex-1 flex items-center justify-center py-6 text-[#f85149] text-xs font-mono text-center px-2">
          Unable to load live GitHub data
        </div>
      )}

      {!loading && githubData && (
        <>
          {/* Main Contribution Stats */}
          <div className="my-2 z-10 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-[#f0f6fc] tracking-tight group-hover:text-[#3fb950] transition-colors font-mono">
                {githubData.totalContributionsYear.toLocaleString()}
              </span>
              <span className="text-xs text-[#8b949e] font-medium ml-1.5">contributions</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-[#8b949e] font-mono">
              <span className="flex items-center"><GitBranch className="w-3 h-3 mr-0.5 text-[#3fb950]" />{githubData.publicRepos}</span>
              <span className="flex items-center text-[#e3b341]"><Star className="w-3 h-3 mr-0.5 fill-[#e3b341]" />{githubData.totalStars}</span>
            </div>
          </div>

          {/* Official Heatmap Matrix */}
          <div className="z-10 pt-2 border-t border-[#30363d] w-full space-y-1.5">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-full justify-between">
              {recentDays.map((day, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-200 ${getLevelColor(day.level)}`}
                  title={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>

            {/* GitHub Contribution Legend */}
            <div className="flex items-center justify-between text-[10px] text-[#8b949e] font-mono pt-0.5">
              <span className="text-[#3fb950] font-semibold flex items-center">
                View Profile <ChevronRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
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
        </>
      )}
    </button>
  );
};
