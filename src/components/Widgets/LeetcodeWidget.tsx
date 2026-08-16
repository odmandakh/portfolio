import React from 'react';
import { Trophy, ChevronRight, Flame, Loader2 } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useLeetcodeStats } from '../../hooks/useLeetcodeStats';

interface LeetcodeWidgetProps {
  onClick: () => void;
}

export const LeetcodeWidget: React.FC<LeetcodeWidgetProps> = ({ onClick }) => {
  const { data: leetcodeData, loading, error } = useLeetcodeStats(profileData.leetcodeUsername);

  const easyRatio = leetcodeData && leetcodeData.totalSolved > 0 ? leetcodeData.easySolved / leetcodeData.totalSolved : 0;
  const mediumRatio = leetcodeData && leetcodeData.totalSolved > 0 ? leetcodeData.mediumSolved / leetcodeData.totalSolved : 0;
  const hardRatio = leetcodeData && leetcodeData.totalSolved > 0 ? leetcodeData.hardSolved / leetcodeData.totalSolved : 0;

  const strokeDasharray = 150.8; // 2 * PI * 24
  const easyDash = strokeDasharray * easyRatio;
  const mediumDash = strokeDasharray * mediumRatio;
  const hardDash = strokeDasharray * hardRatio;

  return (
    <button
      onClick={onClick}
      className="group text-left w-full h-full p-4 rounded-2xl bg-[#1a1a1a] hover:bg-[#282828] border border-[#3e3e3e] hover:border-[#ffa116]/60 shadow-xl shadow-black/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      {/* Official LeetCode Top Header */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[#2a2a2a] border border-[#ffa116]/40 text-[#ffa116]">
            {/* LeetCode Custom SVG Emblem */}
            <svg className="w-4 h-4 fill-current text-[#ffa116]" viewBox="0 0 24 24">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.457 5.279 5.279 0 0 0 1.01 2.213l.022.028a5.26 5.26 0 0 0 2.052 1.583 5.334 5.334 0 0 0 2.484.285 5.267 5.267 0 0 0 2.247-.834l4.137-2.923a1.373 1.373 0 0 0 .393-1.892 1.375 1.375 0 0 0-1.89-.396l-4.138 2.924a2.53 2.53 0 0 1-1.082.401 2.562 2.562 0 0 1-1.2-.138 2.527 2.527 0 0 1-.989-.762 2.538 2.538 0 0 1-.487-1.066 2.57 2.57 0 0 1 .06-1.18 2.53 2.53 0 0 1 .581-1.01l3.856-4.128 5.405-5.789a1.374 1.374 0 0 0-.961-2.316zm7.228 10.876a1.374 1.374 0 0 0-1.374 1.374 1.374 1.374 0 0 0 .402.971l3.411 3.411a1.374 1.374 0 0 0 1.943-1.943l-3.411-3.411a1.374 1.374 0 0 0-.971-.402zM12.22 17.065a1.374 1.374 0 0 0-.972.402l-2.072 2.072a1.374 1.374 0 1 0 1.943 1.943l2.072-2.072a1.374 1.374 0 0 0-.971-2.345z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-[#eff1f6] group-hover:text-[#ffa116] transition-colors font-sans">
                @{profileData.leetcodeUsername}
              </span>
            </div>
            <span className="text-[10px] text-[#8a8a8a] font-mono block -mt-0.5">LeetCode Profile</span>
          </div>
        </div>

        {leetcodeData && (
          <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#ffa116]/10 border border-[#ffa116]/30 text-[#ffa116] text-[11px] font-mono font-bold">
            <Trophy className="w-3 h-3 text-[#ffa116]" />
            <span>{leetcodeData.ranking}</span>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex-1 flex items-center justify-center py-6 text-[#8a8a8a] gap-2 text-xs font-mono">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading live LeetCode data...</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex-1 flex items-center justify-center py-6 text-[#ff2d55] text-xs font-mono text-center px-2">
          Unable to load live LeetCode data
        </div>
      )}

      {!loading && leetcodeData && (
        <>
          {/* Center Donut Gauge + Difficulty Breakdown */}
          <div className="my-2 z-10 flex items-center justify-between gap-3">
            {/* Official Donut Progress Ring */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 60 60">
                {/* Track Circle */}
                <circle cx="30" cy="30" r="24" className="stroke-[#2a2a2a]" strokeWidth="5" fill="transparent" />
                {/* Easy Arc */}
                <circle
                  cx="30" cy="30" r="24"
                  className="stroke-[#00b8a3] transition-all duration-500"
                  strokeWidth="5" fill="transparent"
                  strokeDasharray={`${easyDash} ${strokeDasharray - easyDash}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />
                {/* Medium Arc */}
                <circle
                  cx="30" cy="30" r="24"
                  className="stroke-[#ffb800] transition-all duration-500"
                  strokeWidth="5" fill="transparent"
                  strokeDasharray={`${mediumDash} ${strokeDasharray - mediumDash}`}
                  strokeDashoffset={`-${easyDash}`}
                  strokeLinecap="round"
                />
                {/* Hard Arc */}
                <circle
                  cx="30" cy="30" r="24"
                  className="stroke-[#ff2d55] transition-all duration-500"
                  strokeWidth="5" fill="transparent"
                  strokeDasharray={`${hardDash} ${strokeDasharray - hardDash}`}
                  strokeDashoffset={`-${easyDash + mediumDash}`}
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Solved Count */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-[#eff1f6] group-hover:text-[#ffa116] transition-colors leading-none font-mono">
                  {leetcodeData.totalSolved}
                </span>
                <span className="text-[9px] text-[#8a8a8a] font-medium leading-tight">Solved</span>
              </div>
            </div>

            {/* Right Difficulty Breakdown Stack */}
            <div className="flex-1 space-y-1.5 font-mono text-[11px]">
              {/* Easy */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00b8a3]" />
                  <span className="text-[#00b8a3] font-bold">Easy</span>
                </div>
                <span className="text-[#eff1f6] font-bold">{leetcodeData.easySolved}<span className="text-[#666] font-normal text-[10px]">/{leetcodeData.easyTotal}</span></span>
              </div>

              {/* Medium */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ffb800]" />
                  <span className="text-[#ffb800] font-bold">Medium</span>
                </div>
                <span className="text-[#eff1f6] font-bold">{leetcodeData.mediumSolved}<span className="text-[#666] font-normal text-[10px]">/{leetcodeData.mediumTotal}</span></span>
              </div>

              {/* Hard */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff2d55]" />
                  <span className="text-[#ff2d55] font-bold">Hard</span>
                </div>
                <span className="text-[#eff1f6] font-bold">{leetcodeData.hardSolved}<span className="text-[#666] font-normal text-[10px]">/{leetcodeData.hardTotal}</span></span>
              </div>
            </div>
          </div>

          {/* Official Footer */}
          <div className="z-10 pt-2 border-t border-[#3e3e3e] w-full flex items-center justify-between text-[10px] text-[#8a8a8a] font-mono">
            <div className="flex items-center space-x-2">
              <span
                className="flex items-center text-[#ffb800] font-bold"
                title="Consecutive days with any LeetCode submission — not LeetCode's Daily Challenge streak"
              >
                <Flame className="w-3 h-3 mr-0.5 fill-[#ffb800]" />
                {leetcodeData.streakDays}d
              </span>
              <span className="text-[#3e3e3e]">•</span>
              <span className="text-[#00b8a3] font-bold">{leetcodeData.acceptanceRate} pass</span>
            </div>

            <span className="text-[#ffa116] font-bold flex items-center group-hover:translate-x-0.5 transition-transform">
              View Profile <ChevronRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </>
      )}
    </button>
  );
};
