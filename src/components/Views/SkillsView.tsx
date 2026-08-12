import React, { useState } from 'react';
import { 
  Network, 
  Search, 
  Code2, 
  Sparkles, 
  Folder, 
  ChevronRight, 
  Cpu, 
  Layers, 
  Terminal, 
  Zap, 
  CheckCircle2, 
  Info,
  Circle,
  Activity,
  Award
} from 'lucide-react';
import { skillNodes, skillCategories } from '../../data/skills';
import { projectsData } from '../../data/projects';
import { SkillNode } from '../../types/portfolio';

export const SkillsView: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(skillNodes[0]);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSkills = skillNodes.filter((skill) => {
    const matchesCat = activeCategory === 'All' || skill.category === activeCategory;
    const matchesQuery = searchQuery === '' || 
      skill.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const activeFocusSkill = hoveredSkill || selectedSkill;

  // Find related skills for the currently focused skill
  const relatedSkills = activeFocusSkill 
    ? skillNodes.filter(s => activeFocusSkill.relatedSkillIds.includes(s.id))
    : [];

  // Find linked projects for the currently focused skill
  const linkedProjects = activeFocusSkill
    ? projectsData.filter(p => activeFocusSkill.projectIds.includes(p.id))
    : [];

  return (
    <div className="flex flex-col h-full min-h-[520px] bg-[#002b36] text-[#93a1a1] overflow-hidden font-sans select-none relative">
      {/* App Header Bar */}
      <div className="bg-[#073642] border-b border-[#2aa198]/20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-[#2aa198]/20 border border-[#2aa198]/40 text-[#2aa198]">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#eee8d5] tracking-wide">
                SkillTree Matrix
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#002b36] text-[#2aa198] border border-[#2aa198]/30 font-bold">
                interactive
              </span>
            </div>
            <p className="text-[10px] text-[#2aa198]">Hover or click nodes to trace competency trees</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1 bg-[#002b36] p-1 rounded-xl border border-[#2aa198]/30 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-[#2aa198] text-[#002b36] shadow-sm font-black'
                : 'text-[#839496] hover:text-[#eee8d5]'
            }`}
          >
            All Clusters
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#2aa198] text-[#002b36] shadow-sm font-black'
                  : 'text-[#839496] hover:text-[#eee8d5]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-36 sm:w-48">
          <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2aa198]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Nodes..."
            className="w-full pl-7 pr-2 py-1 rounded-lg bg-[#002b36] border border-[#2aa198]/30 text-xs text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198] font-mono"
          />
        </div>
      </div>

      {/* Main Interactive Skill Canvas & Inspector */}
      <div className="flex-1 grid lg:grid-cols-3 overflow-hidden">
        {/* Interactive Tree View Canvas Area */}
        <div className="lg:col-span-2 bg-[#002b36] p-4 sm:p-6 overflow-y-auto relative flex flex-col justify-between custom-scrollbar border-r border-[#2aa198]/20">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#2aa198_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

          {/* Node Matrix Cards */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.id === skill.id;
              const isHovered = hoveredSkill?.id === skill.id;
              const isRelated = activeFocusSkill?.relatedSkillIds.includes(skill.id);

              return (
                <div
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(skill)}
                  className={`relative p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-32 cursor-pointer group overflow-hidden ${
                    isSelected
                      ? 'bg-[#073642] border-[#2aa198] text-[#eee8d5] shadow-xl scale-[1.02] ring-2 ring-[#2aa198]/40'
                      : isHovered
                      ? 'bg-[#073642]/90 border-[#268bd2] text-[#eee8d5] scale-[1.02]'
                      : isRelated
                      ? 'bg-[#073642]/70 border-[#b58900]/60 text-[#eee8d5]'
                      : 'bg-[#073642]/50 hover:bg-[#073642] border-[#2aa198]/20 text-[#839496]'
                  }`}
                >
                  {/* Top Header */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#2aa198] bg-[#002b36] px-2 py-0.5 rounded-md border border-[#2aa198]/30">
                      {skill.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#b58900]">
                      {skill.years}
                    </span>
                  </div>

                  {/* Node Label & Level */}
                  <div className="relative z-10">
                    <h3 className={`font-black text-sm tracking-tight transition-colors ${
                      isSelected || isHovered ? 'text-[#eee8d5]' : 'text-[#eee8d5]/80'
                    }`}>
                      {skill.label}
                    </h3>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <div className="flex-1 h-1.5 bg-[#002b36] rounded-full overflow-hidden border border-[#2aa198]/20">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isSelected || isHovered ? 'bg-[#859900]' : 'bg-[#2aa198]'
                          }`}
                          style={{ width: `${skill.level === 'Expert' ? 95 : skill.level === 'Proficient' ? 85 : 70}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-[#859900] font-bold">
                        {skill.level}
                      </span>
                    </div>
                  </div>

                  {/* Connected Badge */}
                  {isRelated && (
                    <div className="absolute bottom-2 right-2 flex items-center space-x-1 text-[9px] font-mono text-[#b58900] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b58900]" />
                      <span>Linked</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#2aa198]/20 flex justify-between items-center text-[10px] font-mono text-[#586e75]">
            <span>Graph Nodes Loaded: {filteredSkills.length}</span>
            <span className="flex items-center text-[#2aa198]">
              <Zap className="w-3 h-3 mr-1 text-[#859900]" /> Active Mastery Matrix
            </span>
          </div>
        </div>

        {/* Skill Detail Inspector Panel */}
        <div className="bg-[#073642] p-5 overflow-y-auto space-y-5 custom-scrollbar border-t lg:border-t-0 border-[#2aa198]/20 font-sans text-[#93a1a1]">
          {activeFocusSkill ? (
            <>
              {/* Header Inspector */}
              <div className="space-y-1.5 pb-4 border-b border-[#2aa198]/20">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono bg-[#002b36] text-[#2aa198] border border-[#2aa198]/30">
                    {activeFocusSkill.category}
                  </span>
                  <span className="text-xs font-mono text-[#b58900] font-bold">
                    {activeFocusSkill.years} Experience
                  </span>
                </div>

                <h2 className="text-2xl font-black text-[#eee8d5] tracking-tight pt-1">
                  {activeFocusSkill.label}
                </h2>

                <div className="flex items-center space-x-2 text-xs text-[#859900] font-semibold font-mono">
                  <Award className="w-4 h-4 text-[#859900]" />
                  <span>Proficiency Level: {activeFocusSkill.level}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] block font-mono">
                  Competency Overview
                </span>
                <p className="text-xs text-[#eee8d5] leading-relaxed bg-[#002b36] p-3 rounded-xl border border-[#2aa198]/30">
                  {activeFocusSkill.description}
                </p>
              </div>

              {/* Connected Tree Nodes */}
              <div className="space-y-2 pt-2 border-t border-[#2aa198]/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] block font-mono">
                  Connected Skill Branches ({relatedSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {relatedSkills.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => setSelectedSkill(rel)}
                      className="px-2.5 py-1 rounded-lg bg-[#002b36] hover:bg-[#002b36]/80 border border-[#2aa198]/30 text-xs text-[#2aa198] font-mono transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-[#2aa198]" />
                      <span>{rel.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Linked Projects */}
              <div className="space-y-2 pt-2 border-t border-[#2aa198]/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#268bd2] block font-mono">
                  Applied in Real-World Projects ({linkedProjects.length})
                </span>
                <div className="space-y-2">
                  {linkedProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 rounded-xl bg-[#002b36] border border-[#2aa198]/30 text-xs space-y-1"
                    >
                      <div className="font-bold text-[#eee8d5] flex items-center space-x-1.5">
                        <Folder className="w-3.5 h-3.5 text-[#268bd2]" />
                        <span>{proj.title}</span>
                      </div>
                      <p className="text-[11px] text-[#93a1a1] line-clamp-1 leading-relaxed">
                        {proj.shortDescription}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-[#586e75] text-xs font-mono">
              Hover or click any node on the tree matrix to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
