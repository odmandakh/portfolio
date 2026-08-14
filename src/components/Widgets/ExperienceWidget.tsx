import React from 'react';
import { Briefcase, ChevronRight, Award } from 'lucide-react';
import { experienceWidgetSummary, experienceData } from '../../data/experience';

interface ExperienceWidgetProps {
  onClick: () => void;
}

export const ExperienceWidget: React.FC<ExperienceWidgetProps> = ({ onClick }) => {
  const currentRole = experienceData[0];

  return (
    <button
      onClick={onClick}
      className="group text-left w-full h-full p-4 rounded-2xl bg-[#073642]/80 hover:bg-[#073642] backdrop-blur-md border border-[#6c71c4]/30 hover:border-[#6c71c4]/60 shadow-xl shadow-[#001f27] transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between z-10 w-full">
        <div className="flex items-center space-x-2 text-[#93a1a1]">
          <div className="p-1.5 rounded-lg bg-[#6c71c4]/20 border border-[#6c71c4]/40">
            <Briefcase className="w-4 h-4 text-[#6c71c4]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6c71c4] font-mono">Experience</span>
        </div>
        <div className="flex items-center text-xs text-[#2aa198] group-hover:translate-x-0.5 transition-transform font-mono font-bold">
          <span>{experienceWidgetSummary.totalYears}+ YOE</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-[#2aa198]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="my-2 z-10">
        <p className="text-lg font-bold text-[#eee8d5] tracking-tight leading-snug group-hover:text-[#2aa198] transition-colors">
          {experienceWidgetSummary.currentTitle}
        </p>
        <p className="text-xs text-[#93a1a1] font-medium mt-0.5">
          @ <span className="text-[#268bd2] font-semibold">{experienceWidgetSummary.currentCompany}</span>
        </p>
      </div>

      {/* Progression Indicator Timeline */}
      <div className="z-10 pt-2 border-t border-[#2aa198]/20 w-full">
        <div className="flex items-center justify-between text-[11px] text-[#93a1a1] mb-1.5 font-mono">
          <span className="flex items-center text-[#859900] font-medium">
            {currentRole.impactMetric}
          </span>
          <span className="text-[#586e75]">{currentRole.period}</span>
        </div>

        {/* Minimal Timeline Dots */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {experienceWidgetSummary.progression.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div 
                className={`w-full h-1 rounded-full ${
                  idx === experienceWidgetSummary.progression.length - 1 
                    ? 'bg-[#6c71c4] shadow-sm shadow-[#6c71c4]' 
                    : 'bg-[#002b36]'
                }`} 
              />
              <span className="text-[9px] text-[#586e75] mt-1 truncate w-full text-center font-mono">
                {step.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
};
