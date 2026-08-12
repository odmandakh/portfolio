import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2,
  Building2,
  Clock
} from 'lucide-react';
import { experienceData, experienceWidgetSummary } from '../../data/experience';

export const ExperienceView: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto text-zinc-200">
      {/* Top Experience Stats Summary */}
      <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Career Timeline & Growth
            </h2>
            <p className="text-xs text-zinc-400">
              {experienceWidgetSummary.totalYears}+ Years in Software Engineering & Architecture
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold text-center">
          Current: {experienceWidgetSummary.currentTitle}
        </div>
      </div>

      {/* Career Timeline Listing */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-indigo-500 before:to-zinc-800">
        {experienceData.map((entry) => (
          <div key={entry.id} className="relative group">
            {/* Timeline Node Dot */}
            <div className={`absolute -left-[29px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full border-2 bg-zinc-950 transition-colors ${
              entry.current 
                ? 'border-blue-400 bg-blue-500 shadow-md shadow-blue-500/50' 
                : 'border-zinc-600 group-hover:border-zinc-400'
            }`} />

            {/* Entry Card */}
            <div className="p-5 rounded-2xl bg-zinc-950/50 hover:bg-zinc-900/80 border border-zinc-800 transition-all duration-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                    {entry.period}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {entry.role}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{entry.company}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{entry.location}</span>
                  </p>
                </div>

                {entry.impactMetric && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold h-fit">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{entry.impactMetric}</span>
                  </span>
                )}
              </div>

              {/* Bullet highlights */}
              <ul className="space-y-1.5 text-xs text-zinc-300 pl-1">
                {entry.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="pt-2 border-t border-zinc-800 flex flex-wrap gap-1">
                {entry.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-zinc-900 text-[10px] font-mono text-zinc-400 border border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
