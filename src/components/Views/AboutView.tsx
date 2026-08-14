import React, { useState } from 'react';
import { 
  User, 
  Laptop, 
  HardDrive, 
  Info, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Heart
} from 'lucide-react';
import { profileData } from '../../data/profile';

interface SkillItem {
  name: string;
  level: 'Expert' | 'Experienced' | 'Skillful';
  color: string;
  percentage: number;
}

interface SkillGroup {
  id: string;
  title: string;
  driveName: string;
  totalCapacity: string;
  skills: SkillItem[];
}

export const AboutView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'skills'>('overview');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillGroups: SkillGroup[] = [
    {
      id: 'languages',
      title: '1. Programming Languages',
      driveName: 'Primary Core Languages',
      totalCapacity: '',
      skills: [
        { name: 'Java', level: 'Expert', color: '#859900', percentage: 30 },
        { name: 'Python', level: 'Experienced', color: '#b58900', percentage: 20 },
        { name: 'PHP', level: 'Experienced', color: '#d33682', percentage: 10 },
        { name: 'C++', level: 'Experienced', color: '#dc322f', percentage: 10 },
        { name: 'Go', level: 'Experienced', color: '#268bd2', percentage: 5 },
        { name: 'Javascript', level: 'Skillful', color: '#cb4b16', percentage: 5 },
        { name: 'Others (System & Learning)', level: 'Skillful', color: '#586e75', percentage: 20 },
      ]
    },
    {
      id: 'frameworks',
      title: '2. Frameworks & Tools',
      driveName: 'Frameworks & Infrastructure',
      totalCapacity: '',
      skills: [
        { name: 'Symfony Framework', level: 'Expert', color: '#859900', percentage: 22 },
        { name: 'Spring Boot Framework', level: 'Expert', color: '#2aa198', percentage: 22 },
        { name: 'Quarkus Framework', level: 'Expert', color: '#d33682', percentage: 22 },
        { name: 'Microservices', level: 'Expert', color: '#6c71c4', percentage: 18 },
        { name: 'Amazon Web Service (AWS)', level: 'Experienced', color: '#cb4b16', percentage: 10 },
        { name: 'NodeJS, ReactJS', level: 'Skillful', color: '#b58900', percentage: 6 },
      ]
    },
    {
      id: 'softskills',
      title: '3. Soft Skills & Leadership',
      driveName: 'Leadership & Competencies',
      totalCapacity: '',
      skills: [
        { name: 'Team Lead', level: 'Expert', color: '#859900', percentage: 35 },
        { name: 'Competitive Programming', level: 'Experienced', color: '#268bd2', percentage: 35 },
        { name: 'Project Management', level: 'Experienced', color: '#b58900', percentage: 30 },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full min-h-[520px] bg-[#002b36] text-[#93a1a1] overflow-hidden select-none font-sans">
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Finder Sidebar */}
        <div className="w-48 bg-[#073642]/80 border-r border-[#2aa198]/20 p-3 flex flex-col justify-between shrink-0 hidden sm:flex font-sans overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>System Info</span>
                <Laptop className="w-3 h-3 text-[#2aa198]" />
              </div>

              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40'
                    : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#2aa198]" />
                <span className="truncate">Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                  activeTab === 'report'
                    ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40'
                    : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                }`}
              >
                <Info className="w-3.5 h-3.5 text-[#268bd2]" />
                <span className="truncate">Technical report</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                  activeTab === 'skills'
                    ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40'
                    : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5 text-[#b58900]" />
                <span className="truncate">Skills storage</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Canvas */}
        <div className="flex-1 bg-[#002b36] p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          {activeTab === 'overview' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Section 1: Photo & Header */}
              <div className="flex flex-col items-center text-center space-y-3 py-2">
                <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 shadow-lg">
                  <img
                    src={profileData.avatarUrl}
                    alt="Odmandakh Battulga"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-black text-[#eee8d5] tracking-tight">
                    Odmandakh Battulga
                  </h1>
                  <p className="text-xs font-semibold text-[#2aa198] font-mono">
                    Senior Back-End Engineer
                  </p>
                </div>
              </div>

              {/* Section 2: Details Grid */}
              <div className="p-5 rounded-2xl bg-[#073642]/60 border border-[#2aa198]/30 space-y-3 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono border-b border-[#2aa198]/20 pb-2">
                  Developer Profile
                </div>
                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20">
                    <User className="w-4 h-4 text-[#2aa198] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#586e75] font-mono block">Nickname</span>
                      <span className="font-bold text-[#eee8d5]">Dom</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20">
                    <MapPin className="w-4 h-4 text-[#268bd2] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#586e75] font-mono block">Location</span>
                      <span className="font-bold text-[#eee8d5]">Ulaanbaatar, Mongolia</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20">
                    <Briefcase className="w-4 h-4 text-[#859900] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#586e75] font-mono block">Work</span>
                      <span className="font-bold text-[#eee8d5]">ex AND</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20">
                    <GraduationCap className="w-4 h-4 text-[#b58900] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#586e75] font-mono block">Education</span>
                      <span className="font-bold text-[#eee8d5]">National University of Mongolia (NUM)</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20 sm:col-span-2">
                    <Heart className="w-4 h-4 text-[#cb4b16] shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#586e75] font-mono block">Hobbies & Interests</span>
                      <span className="font-bold text-[#eee8d5]">Competitive Programming, Boardgame , Basketball, Computer Game</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Action Buttons */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <a
                  href={profileData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#073642] hover:bg-[#073642]/80 text-[#eee8d5] text-xs font-bold transition-all border border-[#2aa198]/40 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-[#268bd2]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#073642] hover:bg-[#073642]/80 text-[#eee8d5] text-xs font-bold transition-all border border-[#2aa198]/40 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <Github className="w-4 h-4 text-[#2aa198]" />
                  <span>GitHub</span>
                </a>

                <a
                  href={`mailto:${profileData.email}`}
                  className="py-2.5 px-3 rounded-xl bg-[#073642] hover:bg-[#073642]/80 text-[#eee8d5] text-xs font-bold transition-all border border-[#2aa198]/40 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <Mail className="w-4 h-4 text-[#859900]" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="flex items-center space-x-2 border-b border-[#2aa198]/20 pb-3">
                <Info className="w-5 h-5 text-[#268bd2]" />
                <h2 className="text-lg font-bold text-[#eee8d5]">Technical report</h2>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono block">
                  Engineering Highlights
                </span>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  {profileData.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#073642]/80 border border-[#2aa198]/30 space-y-1 shadow-md">
                      <span className="text-[10px] text-[#586e75] uppercase font-mono block">{stat.label}</span>
                      <span className="text-xl font-bold text-[#b58900] font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical System Capabilities */}
              <div className="p-5 rounded-2xl bg-[#073642]/60 border border-[#2aa198]/30 space-y-3 text-xs font-sans">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono border-b border-[#2aa198]/20 pb-2">
                  System Architecture & Technical Focus
                </div>
                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20 space-y-1">
                    <span className="text-[11px] font-bold text-[#eee8d5] block">Backend Architecture</span>
                    <span className="text-[#839496] text-[11px]">Distributed systems, microservices, serverless on AWS</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20 space-y-1">
                    <span className="text-[11px] font-bold text-[#eee8d5] block">Machine Learning Solutions</span>
                    <span className="text-[#839496] text-[11px]">Model integration, scalable pipelines, optimization</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20 space-y-1">
                    <span className="text-[11px] font-bold text-[#eee8d5] block">Algorithmic Excellence</span>
                    <span className="text-[#839496] text-[11px]">Competitive programming foundation, problem solving</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#002b36]/60 border border-[#2aa198]/20 space-y-1">
                    <span className="text-[11px] font-bold text-[#eee8d5] block">Security & Performance</span>
                    <span className="text-[#839496] text-[11px]">High-throughput systems, secure API design, monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-[#2aa198]/20 pb-3">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-[#b58900]" />
                  <h2 className="text-lg font-bold text-[#eee8d5]">Skills storage</h2>
                </div>
                <span className="text-xs font-mono text-[#586e75]">System Memory Allocation</span>
              </div>

              {/* macOS System Settings Storage Bars */}
              <div className="space-y-6">
                {skillGroups.map((group) => (
                  <div 
                    key={group.id} 
                    className="p-5 rounded-2xl bg-[#073642]/90 border border-[#2aa198]/30 shadow-lg space-y-4 font-sans"
                  >
                    {/* macOS Storage Bar Header */}
                    <div className="flex justify-between items-baseline">
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-[#eee8d5] tracking-wide">{group.title}</h3>
                        <p className="text-[11px] font-mono text-[#586e75]">{group.driveName}</p>
                      </div>
                    </div>

                    {/* macOS Storage Bar Visualization */}
                    <div className="relative">
                      <div className="h-5 w-full bg-[#002b36] rounded-lg p-0.5 border border-[#2aa198]/20 flex overflow-hidden gap-0.5 shadow-inner">
                        {group.skills.map((skill, sIdx) => {
                          const isHovered = hoveredSkill === `${group.id}-${skill.name}`;
                          return (
                            <div
                              key={sIdx}
                              onMouseEnter={() => setHoveredSkill(`${group.id}-${skill.name}`)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              style={{ 
                                width: `${skill.percentage}%`,
                                backgroundColor: skill.color
                              }}
                              className={`h-full transition-all duration-200 cursor-pointer relative ${
                                isHovered ? 'brightness-125 scale-y-110 z-10 rounded-sm shadow-md' : 'opacity-90 hover:opacity-100'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Legend & Hover Info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1 border-t border-[#2aa198]/10 text-xs">
                      {group.skills.map((skill, sIdx) => {
                        const isHovered = hoveredSkill === `${group.id}-${skill.name}`;
                        return (
                          <div
                            key={sIdx}
                            onMouseEnter={() => setHoveredSkill(`${group.id}-${skill.name}`)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className={`flex items-center space-x-1.5 px-2 py-1 rounded-md transition-all cursor-pointer ${
                              isHovered 
                                ? 'bg-[#002b36] text-[#eee8d5] border border-[#2aa198]/40 shadow-sm' 
                                : 'text-[#839496] hover:text-[#eee8d5]'
                            }`}
                          >
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" 
                              style={{ backgroundColor: skill.color }}
                            />
                            <span className="font-semibold text-[11px]">{skill.name}</span>
                            
                            {/* Hover Badge showing Proficiency Level */}
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold transition-opacity ${
                              isHovered 
                                ? 'bg-[#2aa198]/20 text-[#2aa198] border border-[#2aa198]/30 opacity-100' 
                                : 'text-[#586e75] opacity-70'
                            }`}>
                              {skill.level}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
