import React from 'react';
import { ExternalLink, Loader2, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLeetcodeStats, timeAgo } from '../../hooks/useLeetcodeStats';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// LeetCode's submission greens; the empty cell is blended with the OS surface
const LEVEL_COLORS = ['#20383e', '#0e4429', '#006d32', '#26a641', '#39d353'];

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const LeetcodeIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.457 5.279 5.279 0 0 0 1.01 2.213l.022.028a5.26 5.26 0 0 0 2.052 1.583 5.334 5.334 0 0 0 2.484.285 5.267 5.267 0 0 0 2.247-.834l4.137-2.923a1.373 1.373 0 0 0 .393-1.892 1.375 1.375 0 0 0-1.89-.396l-4.138 2.924a2.53 2.53 0 0 1-1.082.401 2.562 2.562 0 0 1-1.2-.138 2.527 2.527 0 0 1-.989-.762 2.538 2.538 0 0 1-.487-1.066 2.57 2.57 0 0 1 .06-1.18 2.53 2.53 0 0 1 .581-1.01l3.856-4.128 5.405-5.789a1.374 1.374 0 0 0-.961-2.316zm7.228 10.876a1.374 1.374 0 0 0-1.374 1.374 1.374 1.374 0 0 0 .402.971l3.411 3.411a1.374 1.374 0 0 0 1.943-1.943l-3.411-3.411a1.374 1.374 0 0 0-.971-.402zM12.22 17.065a1.374 1.374 0 0 0-.972.402l-2.072 2.072a1.374 1.374 0 1 0 1.943 1.943l2.072-2.072a1.374 1.374 0 0 0-.971-2.345z" />
  </svg>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm font-semibold text-[#eeece6]">{children}</h3>
);

export const LeetcodeView: React.FC = () => {
  const { data: leetcodeData, loading, error } = useLeetcodeStats(profileData.leetcodeUsername);

  if (loading) {
    return (
      <div className="min-h-full bg-[#0d2228] p-4 sm:p-6 flex items-center justify-center min-h-[400px] text-[#eeece6]/60 gap-2 text-sm">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading live LeetCode data...</span>
      </div>
    );
  }

  if (error || !leetcodeData) {
    return (
      <div className="min-h-full bg-[#0d2228] p-4 sm:p-6 flex items-center justify-center min-h-[400px] text-[#ef4743] text-sm text-center">
        Unable to load live LeetCode data right now. Please try again later.
      </div>
    );
  }

  // LeetCode's own difficulty colours
  const difficulties = [
    { label: 'Easy', solved: leetcodeData.easySolved, total: leetcodeData.easyTotal, color: '#00b8a3' },
    { label: 'Medium', solved: leetcodeData.mediumSolved, total: leetcodeData.mediumTotal, color: '#ffc01e' },
    { label: 'Hard', solved: leetcodeData.hardSolved, total: leetcodeData.hardTotal, color: '#ff375f' }
  ];

  // Ring segments: each difficulty's share of all questions, laid end to end
  let ringOffset = 0;
  const ringSegments = difficulties.map((d) => {
    const length = leetcodeData.totalQuestions > 0 ? (d.solved / leetcodeData.totalQuestions) * RING_CIRCUMFERENCE : 0;
    const segment = { color: d.color, length, offset: ringOffset };
    ringOffset += length;
    return segment;
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
    { label: 'Contest rating', value: leetcodeData.contestRating.toLocaleString() },
    { label: 'Global ranking', value: `#${leetcodeData.contestGlobalRanking.toLocaleString()}` },
    { label: 'Top', value: `${leetcodeData.contestTopPercentage.toFixed(2)}%` },
    { label: 'Attended', value: leetcodeData.contestsAttended.toLocaleString() }
  ];

  return (
    <div className="min-h-full bg-[#0d2228] text-[#eeece6]/75">
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#2e4e50]">
        <div className="flex items-center gap-3">
          <LeetcodeIcon className="w-10 h-10 fill-[#ffa116]" />
          <div>
            <h2 className="text-xl font-semibold text-[#eeece6]">{leetcodeData.username}</h2>
            <p className="text-sm text-[#eeece6]/60">Rank {leetcodeData.ranking}</p>
          </div>
        </div>

        <a
          href={`https://leetcode.com/u/${leetcodeData.username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-[#182f35] hover:bg-[#1f3a40] border border-[#2e4e50] hover:border-[#ffa116]/60 text-xs font-semibold text-[#eeece6] flex items-center gap-2 transition-colors"
        >
          View profile
          <ExternalLink className="w-3.5 h-3.5 text-[#ffa116]" />
        </a>
      </div>

      {/* Solved problems: ring plus per-difficulty progress, like LeetCode's profile card */}
      <div className="rounded-xl bg-[#182f35] p-5 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={RING_RADIUS} fill="none" stroke="#1f343a" strokeWidth="6" />
            {ringSegments.map((seg) => (
              <circle
                key={seg.color}
                cx="60"
                cy="60"
                r={RING_RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth="6"
                strokeDasharray={`${seg.length} ${RING_CIRCUMFERENCE - seg.length}`}
                strokeDashoffset={-seg.offset}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-[#eeece6] tabular-nums">{leetcodeData.totalSolved}</span>
            <span className="text-[11px] text-[#eeece6]/60">/ {leetcodeData.totalQuestions.toLocaleString()} solved</span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-3">
          {difficulties.map((d) => (
            <div key={d.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: d.color }} className="font-medium">{d.label}</span>
                <span className="tabular-nums">
                  <span className="text-[#eeece6]">{d.solved}</span>
                  <span className="text-[#eeece6]/40"> / {d.total}</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[#1f343a] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${d.total > 0 ? (d.solved / d.total) * 100 : 0}%`, backgroundColor: d.color }}
                />
              </div>
            </div>
          ))}
          <p className="text-[11px] text-[#eeece6]/40 pt-1">
            Acceptance {leetcodeData.acceptanceRate} · {leetcodeData.totalSubmissions.toLocaleString()} submissions
          </p>
        </div>
      </div>

      {/* Contests */}
      {leetcodeData.contestsAttended > 0 && (
        <div className="space-y-2">
          <SectionTitle>Contests</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-xl bg-[#182f35] divide-x divide-y sm:divide-y-0 divide-[#2e4e50]">
            {contestStats.map((stat) => (
              <div key={stat.label} className="p-4 space-y-1">
                <span className="text-xs text-[#eeece6]/60 block">{stat.label}</span>
                <span className="text-xl font-semibold text-[#eeece6] tabular-nums">{stat.value}</span>
              </div>
            ))}
          </div>

          {leetcodeData.contestHistory.length > 0 && (
            <div className="rounded-xl overflow-hidden bg-[#182f35] divide-y divide-[#2e4e50] text-xs">
              {leetcodeData.contestHistory.map((c) => (
                <div key={`${c.title}-${c.date}`} className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-[#1f3a40] transition-colors duration-200">
                  <div className="min-w-0">
                    <span className="text-[#eeece6] block truncate">{c.title}</span>
                    <span className="text-[11px] text-[#eeece6]/40">
                      {c.date} · Rank #{c.ranking.toLocaleString()} · {c.problemsSolved}/{c.totalProblems} solved
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1 tabular-nums shrink-0 ${
                      c.trendDirection === 'UP' ? 'text-[#2cbb5d]' : 'text-[#ef4743]'
                    }`}
                  >
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
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <SectionTitle>{submissionsInPastYear.toLocaleString()} submissions in the past year</SectionTitle>
          <span
            className="text-[11px] text-[#eeece6]/60"
            title="Streaks count days with any LeetCode submission, not LeetCode's Daily Challenge"
          >
            Active days {leetcodeData.activeDays} · Max streak {leetcodeData.longestStreak} · Current streak {leetcodeData.streakDays}
          </span>
        </div>
        <div className="rounded-xl bg-[#182f35] p-4 overflow-x-auto">
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
                <span className="text-[10px] text-[#eeece6]/40">{group.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent accepted submissions */}
      {leetcodeData.recentSubmissions.length > 0 && (
        <div className="space-y-2">
          <SectionTitle>Recent AC</SectionTitle>
          <div className="rounded-xl overflow-hidden bg-[#182f35] divide-y divide-[#2e4e50] text-xs">
            {leetcodeData.recentSubmissions.map((sub) => (
              <div key={`${sub.title}-${sub.timestamp}`} className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-[#1f3a40] transition-colors duration-200">
                <span className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#00b8a3]" />
                  <span className="text-[#eeece6] truncate">{sub.title}</span>
                </span>
                <span className="text-[11px] text-[#eeece6]/40 shrink-0">
                  {sub.lang} · {timeAgo(sub.timestamp)}
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
