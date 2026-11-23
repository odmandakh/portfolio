import React from 'react';
import { Briefcase, MapPin, Building2, TrendingUp } from 'lucide-react';
import { experienceData, experienceWidgetSummary } from '../../data/experience';

// Same look as the Experience widget: Solarized panels with violet accents
export const ExperienceView: React.FC = () => {
  const { currentRole, progression, totalYears } = experienceWidgetSummary;

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto text-[#93a1a1]">
      {/* Summary card, laid out like the widget */}
      <div className="p-5 rounded-2xl bg-[#073642]/80 border border-[#6c71c4]/30 shadow-xl shadow-[#001f27] space-y-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#6c71c4]/20 border border-[#6c71c4]/40">
              <Briefcase className="w-4 h-4 text-[#6c71c4]" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6c71c4] font-mono">Experience</span>
          </div>
          <span className="text-xs text-[#2aa198] font-mono font-bold">{totalYears} YOE</span>
        </div>

        {currentRole && (
          <div>
            <p className="text-2xl font-bold text-[#eee8d5] tracking-tight leading-snug">{currentRole.role}</p>
            <p className="text-sm text-[#93a1a1] font-medium mt-0.5">
              @ <span className="text-[#268bd2] font-semibold">{currentRole.company}</span>
            </p>
          </div>
        )}

        {/* Career progression, the widget's timeline bars with their roles */}
        <div className="pt-3 border-t border-[#2aa198]/20 w-full">
          {currentRole && (
            <div className="flex items-center justify-between text-[11px] text-[#93a1a1] mb-2 font-mono">
              <span className="text-[#859900] font-medium">{currentRole.impactMetric}</span>
              <span className="text-[#586e75]">{currentRole.period}</span>
            </div>
          )}
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${progression.length}, minmax(0, 1fr))` }}>
            {progression.map((step, idx) => {
              const isCurrent = idx === progression.length - 1;
              return (
                <div key={step.year} className="flex flex-col items-center text-center">
                  <div className={`w-full h-1 rounded-full ${isCurrent ? 'bg-[#6c71c4] shadow-sm shadow-[#6c71c4]' : 'bg-[#002b36]'}`} />
                  <span className="text-[10px] text-[#586e75] mt-1 font-mono">{step.year}</span>
                  <span className={`text-[10px] leading-tight mt-0.5 ${isCurrent ? 'text-[#eee8d5]' : 'text-[#839496]'}`}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Career timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#6c71c4] before:to-[#073642]">
        {experienceData.map((entry) => (
          <div key={entry.id} className="relative group">
            <div
              className={`absolute -left-[29px] sm:-left-[37px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors ${
                entry.current ? 'border-[#6c71c4] bg-[#6c71c4] shadow-md shadow-[#6c71c4]/50' : 'border-[#6c71c4]/40 bg-[#002b36] group-hover:border-[#6c71c4]'
              }`}
            />

            <div className="p-5 rounded-2xl bg-[#073642]/80 hover:bg-[#073642] border border-[#6c71c4]/30 hover:border-[#6c71c4]/60 transition-all duration-300 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6c71c4] font-mono">{entry.period}</span>
                  <h3 className="text-lg font-bold text-[#eee8d5] tracking-tight leading-snug group-hover:text-[#2aa198] transition-colors">
                    {entry.role}
                  </h3>
                  <p className="text-xs text-[#93a1a1] font-medium flex flex-wrap items-center gap-x-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#268bd2]" />
                    <span className="text-[#268bd2] font-semibold">{entry.company}</span>
                    <span className="text-[#586e75]">•</span>
                    <MapPin className="w-3.5 h-3.5 text-[#586e75]" />
                    <span>{entry.location}</span>
                  </p>
                </div>

                {entry.impactMetric && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#859900] font-mono font-medium h-fit">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {entry.impactMetric}
                  </span>
                )}
              </div>

              {entry.highlights.length > 0 && (
                <ul className="space-y-1.5 text-xs text-[#93a1a1] pl-1">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6c71c4] mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {entry.technologies.length > 0 && (
                <div className="pt-2 border-t border-[#2aa198]/20 flex flex-wrap gap-1">
                  {entry.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-[#002b36] text-[10px] font-mono text-[#93a1a1] border border-[#6c71c4]/30">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
