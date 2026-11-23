import React from 'react';
import { Trophy, Flame, ChevronRight, Loader2, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLeetcodeStats, timeAgo } from '../../hooks/useLeetcodeStats';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Same difficulty colours and donut geometry as the LeetCode widget
const EASY = '#00b8a3';
const MEDIUM = '#ffb800';
const HARD = '#ff2d55';
const RING_RADIUS = 24;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

// Submission calendar in the widget's palette: empty track, then deepening LeetCode orange
const LEVEL_COLORS = ['#2a2a2a', '#ffa11640', '#ffa11673', '#ffa116b3', '#ffa116'];

const LeetcodeIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.457 5.279 5.279 0 0 0 1.01 2.213l.022.028a5.26 5.26 0 0 0 2.052 1.583 5.334 5.334 0 0 0 2.484.285 5.267 5.267 0 0 0 2.247-.834l4.137-2.923a1.373 1.373 0 0 0 .393-1.892 1.375 1.375 0 0 0-1.89-.396l-4.138 2.924a2.53 2.53 0 0 1-1.082.401 2.562 2.562 0 0 1-1.2-.138 2.527 2.527 0 0 1-.989-.762 2.538 2.538 0 0 1-.487-1.066 2.57 2.57 0 0 1 .06-1.18 2.53 2.53 0 0 1 .581-1.01l3.856-4.128 5.405-5.789a1.374 1.374 0 0 0-.961-2.316zm7.228 10.876a1.374 1.374 0 0 0-1.374 1.374 1.374 1.374 0 0 0 .402.971l3.411 3.411a1.374 1.374 0 0 0 1.943-1.943l-3.411-3.411a1.374 1.374 0 0 0-.971-.402zM12.22 17.065a1.374 1.374 0 0 0-.972.402l-2.072 2.072a1.374 1.374 0 1 0 1.943 1.943l2.072-2.072a1.374 1.374 0 0 0-.971-2.345z" />
  </svg>
);

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`p-4 rounded-2xl bg-[#1a1a1a] border border-[#3e3e3e] ${className}`}>{children}</div>
);

export const LeetcodeView: React.FC = () => {
  const { data: leetcodeData, loading, error } = useLeetcodeStats(profileData.leetcodeUsername);

  if (loading) {
    return (
      <div className="min-h-full bg-[#1a1a1a] flex items-center justify-center min-h-[400px] text-[#8a8a8a] gap-2 text-xs font-mono">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading live LeetCode data...</span>
      </div>
    );
  }

  if (error || !leetcodeData) {
    return (
      <div className="min-h-full bg-[#1a1a1a] flex items-center justify-center min-h-[400px] text-[#ff2d55] text-xs font-mono text-center px-4">
        Unable to load live LeetCode data
      </div>
    );
  }

  const difficulties = [
    { label: 'Easy', solved: leetcodeData.easySolved, total: leetcodeData.easyTotal, color: EASY },
    { label: 'Medium', solved: leetcodeData.mediumSolved, total: leetcodeData.mediumTotal, color: MEDIUM },
    { label: 'Hard', solved: leetcodeData.hardSolved, total: leetcodeData.hardTotal, color: HARD }
  ];

  // Donut arcs: each difficulty's share of everything solved, laid end to end like the widget
  let offset = 0;
  const arcs = difficulties.map((d) => {
    const length = leetcodeData.totalSolved > 0 ? (d.solved / leetcodeData.totalSolved) * RING_LENGTH : 0;
    const arc = { color: d.color, length, offset };
    offset += length;
    return arc;
  });

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

  const contestStats = [
    { label: 'Rating', value: leetcodeData.contestRating.toLocaleString() },
    { label: 'Global rank', value: `#${leetcodeData.contestGlobalRanking.toLocaleString()}` },
    { label: 'Top', value: `${leetcodeData.contestTopPercentage.toFixed(2)}%` },
    { label: 'Attended', value: leetcodeData.contestsAttended.toLocaleString() }
  ];

  return (
    <div className="min-h-full bg-[#1a1a1a] text-[#8a8a8a]">
      <div className="p-4 sm:p-6 space-y-5 max-w-4xl mx-auto">
        {/* Header, as on the widget */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#2a2a2a] border border-[#ffa116]/40">
              <LeetcodeIcon className="w-6 h-6 fill-[#ffa116]" />
            </div>
            <div>
              <span className="text-base font-bold text-[#eff1f6] block">@{leetcodeData.username}</span>
              <span className="text-[11px] text-[#8a8a8a] font-mono block -mt-0.5">LeetCode Profile</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#ffa116]/10 border border-[#ffa116]/30 text-[#ffa116] text-xs font-mono font-bold">
            <Trophy className="w-3.5 h-3.5 text-[#ffa116]" />
            <span>{leetcodeData.ranking}</span>
          </div>
        </div>

        {/* Donut and difficulty breakdown, as on the widget */}
        <Card className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-36 h-36 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r={RING_RADIUS} className="stroke-[#2a2a2a]" strokeWidth="5" fill="transparent" />
              {arcs.map((arc) => (
                <circle
                  key={arc.color}
                  cx="30"
                  cy="30"
                  r={RING_RADIUS}
                  stroke={arc.color}
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={`${arc.length} ${RING_LENGTH - arc.length}`}
                  strokeDashoffset={-arc.offset}
                  strokeLinecap="round"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#eff1f6] font-mono leading-none">{leetcodeData.totalSolved}</span>
              <span className="text-[11px] text-[#8a8a8a] font-medium mt-1">Solved</span>
            </div>
          </div>

          <div className="flex-1 w-full space-y-3 font-mono text-xs">
            {difficulties.map((d) => (
              <div key={d.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="font-bold" style={{ color: d.color }}>{d.label}</span>
                  </span>
                  <span className="text-[#eff1f6] font-bold">
                    {d.solved}
                    <span className="text-[#666] font-normal text-[11px]">/{d.total}</span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#2a2a2a] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.total > 0 ? (d.solved / d.total) * 100 : 0}%`, backgroundColor: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Footer row from the widget: streak, acceptance, profile link */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8a8a8a] font-mono pb-4 border-b border-[#3e3e3e]">
          <div className="flex items-center space-x-2">
            <span
              className="flex items-center text-[#ffb800] font-bold"
              title="Consecutive days with any LeetCode submission — not LeetCode's Daily Challenge streak"
            >
              <Flame className="w-3.5 h-3.5 mr-1 fill-[#ffb800]" />
              {leetcodeData.streakDays}d streak
            </span>
            <span className="text-[#3e3e3e]">•</span>
            <span className="font-bold" style={{ color: EASY }}>{leetcodeData.acceptanceRate} pass</span>
            <span className="text-[#3e3e3e]">•</span>
            <span>{leetcodeData.totalSubmissions.toLocaleString()} submissions</span>
          </div>
          <a
            href={`https://leetcode.com/u/${leetcodeData.username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-[#ffa116] font-bold flex items-center"
          >
            View Profile <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Contests */}
        {leetcodeData.contestsAttended > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] text-[#8a8a8a] font-mono block">Contests</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {contestStats.map((stat) => (
                <Card key={stat.label} className="space-y-1">
                  <span className="text-[10px] text-[#8a8a8a] font-mono block">{stat.label}</span>
                  <span className="text-xl font-black text-[#eff1f6] font-mono">{stat.value}</span>
                </Card>
              ))}
            </div>
            {leetcodeData.contestHistory.length > 0 && (
              <div className="rounded-2xl border border-[#3e3e3e] overflow-hidden divide-y divide-[#3e3e3e] text-xs">
                {leetcodeData.contestHistory.map((c) => (
                  <div key={`${c.title}-${c.date}`} className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-[#282828] transition-colors">
                    <div className="min-w-0">
                      <span className="font-bold text-[#eff1f6] block truncate">{c.title}</span>
                      <span className="text-[10px] text-[#8a8a8a] font-mono">
                        {c.date} • Rank #{c.ranking.toLocaleString()} • {c.problemsSolved}/{c.totalProblems} solved
                      </span>
                    </div>
                    <span className="flex items-center gap-1 font-mono font-bold shrink-0" style={{ color: c.trendDirection === 'UP' ? EASY : HARD }}>
                      {c.trendDirection === 'UP' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {c.rating}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submission calendar */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11px] font-mono">
            <span className="text-[#eff1f6] font-bold">{submissionsInPastYear.toLocaleString()} submissions in the past year</span>
            <span>
              Active days <span className="text-[#eff1f6] font-bold">{leetcodeData.activeDays}</span> • Max streak{' '}
              <span className="text-[#eff1f6] font-bold">{leetcodeData.longestStreak}</span>
            </span>
          </div>
          <Card className="overflow-x-auto">
            <div className="flex gap-2.5 w-max">
              {monthGroups.map((group) => (
                <div key={group.key} className="flex flex-col items-center gap-1">
                  <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
                    {group.days.map((day) => (
                      <div
                        key={day.date}
                        className="w-2.5 h-2.5 rounded-[2px]"
                        style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                        title={`${day.date}: ${day.count} submissions`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-[#8a8a8a] font-mono">{group.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent accepted submissions */}
        {leetcodeData.recentSubmissions.length > 0 && (
          <div className="space-y-2">
            <span className="text-[11px] text-[#8a8a8a] font-mono block">Recent AC</span>
            <div className="rounded-2xl border border-[#3e3e3e] overflow-hidden divide-y divide-[#3e3e3e] text-xs">
              {leetcodeData.recentSubmissions.map((sub) => (
                <div key={`${sub.title}-${sub.timestamp}`} className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-[#282828] transition-colors">
                  <span className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: EASY }} />
                    <span className="font-bold text-[#eff1f6] truncate">{sub.title}</span>
                  </span>
                  <span className="text-[10px] text-[#8a8a8a] font-mono shrink-0">
                    {sub.lang} • {timeAgo(sub.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
