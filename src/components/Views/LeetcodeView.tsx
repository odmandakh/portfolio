import React from 'react';
import { 
  Code, 
  Trophy, 
  Flame, 
  Award, 
  CheckCircle2, 
  Clock, 
  Zap,
  Target
} from 'lucide-react';
import { leetcodeData } from '../../data/leetcode';

export const LeetcodeView: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto text-zinc-200">
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

        <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
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

      {/* Recent Submissions Feed */}
      <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-3">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Recent Problem Submissions</span>
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

              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                sub.difficulty === 'Easy' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : sub.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {sub.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
