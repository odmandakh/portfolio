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
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto text-[#93a1a1]">
      {/* Top Experience Stats Summary */}
      <div className="p-6 rounded-2xl bg-[#073642] border border-[#2aa198]/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-[#002b36] border border-[#2aa198]/40 text-[#268bd2]">
            <Briefcase className="w-8 h-8 text-[#268bd2]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#eee8d5] tracking-tight">
              Career Timeline & Growth
            </h2>
            <p className="text-xs text-[#2aa198]">
              {experienceWidgetSummary.totalYears}+ Years in Software Engineering & Architecture
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-[#002b36] border border-[#2aa198]/40 text-[#2aa198] text-xs font-mono font-bold text-center">
          Current: {experienceWidgetSummary.currentTitle}
        </div>
      </div>

      {/* Career Timeline Listing */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#2aa198] before:via-[#268bd2] before:to-[#073642]">
        {experienceData.map((entry) => (
          <div key={entry.id} className="relative group">
            {/* Timeline Node Dot */}
            <div className={`absolute -left-[29px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#002b36] transition-colors ${
              entry.current 
                ? 'border-[#2aa198] bg-[#2aa198] shadow-md shadow-[#2aa198]/50' 
                : 'border-[#2aa198]/40 group-hover:border-[#2aa198]'
            }`} />

            {/* Entry Card */}
            <div className="p-5 rounded-2xl bg-[#073642]/80 hover:bg-[#073642] border border-[#2aa198]/30 transition-all duration-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono">
                    {entry.period}
                  </span>
                  <h3 className="text-lg font-bold text-[#eee8d5]">
                    {entry.role}
                  </h3>
                  <p className="text-xs text-[#2aa198] font-medium flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#2aa198]" />
                    <span>{entry.company}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 text-[#2aa198]" />
                    <span>{entry.location}</span>
                  </p>
                </div>

                {entry.impactMetric && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#002b36] border border-[#859900]/40 text-[#859900] text-xs font-semibold h-fit font-mono">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{entry.impactMetric}</span>
                  </span>
                )}
              </div>

              {/* Bullet highlights */}
              <ul className="space-y-1.5 text-xs text-[#93a1a1] pl-1">
                {entry.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2aa198] mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="pt-2 border-t border-[#2aa198]/20 flex flex-wrap gap-1">
                {entry.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-[#002b36] text-[10px] font-mono text-[#2aa198] border border-[#2aa198]/30"
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
