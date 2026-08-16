import React from 'react';
import {
  Code,
  Flame,
  CheckCircle2,
  Clock,
  Loader2,
  Calendar,
  Info,
  Trophy,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLeetcodeStats } from '../../hooks/useLeetcodeStats';

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function getLevelColor(level: number): string {
  switch (level) {
    case 1: return 'bg-amber-950/80 border border-amber-800/40';
    case 2: return 'bg-amber-700/80';
    case 3: return 'bg-amber-500';
    case 4: return 'bg-amber-300 shadow-sm shadow-amber-400/50';
    default: return 'bg-zinc-800/60';
  }
}

export const LeetcodeView: React.FC = () => {
  const { data: leetcodeData, loading, error } = useLeetcodeStats(profileData.leetcodeUsername);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[400px] text-zinc-400 gap-2 text-sm font-mono">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading live LeetCode data...</span>
      </div>
    );
  }

  if (error || !leetcodeData) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[400px] text-rose-400 text-sm font-mono text-center">
        Unable to load live LeetCode data right now. Please try again later.
      </div>
    );
  }

  const monthGroups: { key: string; label: string; days: typeof leetcodeData.submissionCalendarDays }[] = [];
  leetcodeData.submissionCalendarDays.forEach((day) => {
    const monthKey = day.date.slice(0, 7);
    const lastGroup = monthGroups[monthGroups.length - 1];
    if (lastGroup && lastGroup.key === monthKey) {
      lastGroup.days.push(day);
    } else {
      monthGroups.push({ key: monthKey, label: MONTH_LABELS[Number(monthKey.slice(5, 7)) - 1], days: [day] });
    }
  });

  const submissionsInPastYear = leetcodeData.submissionCalendarDays.reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto text-zinc-200">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Code className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>@{leetcodeData.username}</span>
              <span className="text-xs font-mono font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                {leetcodeData.ranking}
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Algorithmic problem solving & data structure practice
            </p>
          </div>
        </div>

        <div
          className="flex items-center space-x-2 text-xs font-mono text-amber-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800"
          title="Consecutive days with any LeetCode submission — not LeetCode's Daily Challenge streak"
        >
          <Flame className="w-4 h-4 fill-amber-400" />
          <span>{leetcodeData.streakDays} Days Active Streak</span>
        </div>
      </div>

      {/* Main Problems Solved Dashboard Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Easy Solved */}
        <div className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>Easy</span>
            <span>{leetcodeData.easySolved} / {leetcodeData.easyTotal}</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${(leetcodeData.easySolved / leetcodeData.easyTotal) * 100}%` }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
          <p className="text-[11px] text-zinc-500 font-mono text-right">
            {((leetcodeData.easySolved / leetcodeData.easyTotal) * 100).toFixed(1)}% Completed
          </p>
        </div>

        {/* Medium Solved */}
        <div className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Medium</span>
            <span>{leetcodeData.mediumSolved} / {leetcodeData.mediumTotal}</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${(leetcodeData.mediumSolved / leetcodeData.mediumTotal) * 100}%` }}
              className="h-full bg-amber-500 rounded-full"
            />
          </div>
          <p className="text-[11px] text-zinc-500 font-mono text-right">
            {((leetcodeData.mediumSolved / leetcodeData.mediumTotal) * 100).toFixed(1)}% Completed
          </p>
        </div>

        {/* Hard Solved */}
        <div className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-400">
            <span>Hard</span>
            <span>{leetcodeData.hardSolved} / {leetcodeData.hardTotal}</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${(leetcodeData.hardSolved / leetcodeData.hardTotal) * 100}%` }}
              className="h-full bg-rose-500 rounded-full"
            />
          </div>
          <p className="text-[11px] text-zinc-500 font-mono text-right">
            {((leetcodeData.hardSolved / leetcodeData.hardTotal) * 100).toFixed(1)}% Completed
          </p>
        </div>
      </div>

      {/* Contest Stats */}
      {leetcodeData.contestsAttended > 0 && (
        <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Contest Stats</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Rating</span>
              <span className="text-lg font-black text-white">{leetcodeData.contestRating}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Global Rank</span>
              <span className="text-lg font-black text-amber-400">#{leetcodeData.contestGlobalRanking.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Top</span>
              <span className="text-lg font-black text-emerald-400">{leetcodeData.contestTopPercentage.toFixed(2)}%</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider block">Attended</span>
              <span className="text-lg font-black text-white">{leetcodeData.contestsAttended}</span>
            </div>
          </div>

          {leetcodeData.contestHistory.length > 0 && (
            <div className="space-y-2">
              {leetcodeData.contestHistory.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-white block">{c.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {c.date} • Rank #{c.ranking.toLocaleString()} • {c.problemsSolved}/{c.totalProblems} solved
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1 font-mono font-bold ${
                      c.trendDirection === 'UP' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {c.trendDirection === 'UP' ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {c.rating}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submission Timeline */}
      <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3 overflow-x-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{submissionsInPastYear.toLocaleString()} submissions in the past one year</span>
            <Info className="w-3.5 h-3.5 text-zinc-600" />
          </span>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-mono">
            <span>Total active days: <span className="text-zinc-200 font-bold">{leetcodeData.activeDays}</span></span>
            <span>Max streak: <span className="text-zinc-200 font-bold">{leetcodeData.longestStreak}</span></span>
          </div>
        </div>

        <div className="flex gap-2.5 pt-2 w-max">
          {monthGroups.map((group) => (
            <div key={group.key} className="flex flex-col items-center gap-1">
              <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
                {group.days.map((day, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-[1px] transition-colors ${getLevelColor(day.level)}`}
                    title={`${day.date}: ${day.count} submissions`}
                  />
                ))}
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">{group.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent AC Feed */}
      {leetcodeData.recentSubmissions.length > 0 && (
        <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Recent AC</span>
          </h3>

          <div className="space-y-2">
            {leetcodeData.recentSubmissions.map((sub, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">{sub.title}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{sub.timeAgo} • Language: {sub.lang}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
