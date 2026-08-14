import React, { useState } from 'react';
import { 
  Folder, 
  Search, 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  ArrowRight, 
  Grid, 
  List as ListIcon, 
  ChevronRight, 
  HardDrive, 
  Star, 
  Tag, 
  Calendar, 
  Activity, 
  Terminal, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  X,
  FileCode,
  Info
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types/portfolio';

export const ProjectsView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Personal Project', 'Open Source', 'Professional'];
  const tags = ['All', 'Web Development', 'Backend Service', 'Data Science & ML', 'Automation & Scraping'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesTag = selectedTag === 'All' || project.tag === selectedTag;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full min-h-[520px] bg-[#002b36] text-[#93a1a1] overflow-hidden select-none font-sans">
      {/* macOS Finder Top Toolbar */}
      <div className="bg-[#073642] border-b border-[#2aa198]/20 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button 
              disabled={!selectedProject}
              onClick={() => setSelectedProject(null)}
              className="p-1.5 rounded-md hover:bg-zinc-700 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
              title="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-zinc-300" />
            </button>
            <button 
              disabled
              className="p-1.5 rounded-md opacity-30 cursor-not-allowed"
              title="Forward"
            >
              <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
            </button>
          </div>

          <div className="h-4 w-px bg-zinc-700" />

          {/* Breadcrumb Path */}
          <div className="flex items-center space-x-1 font-mono text-[11px] text-[#839496] bg-[#002b36] px-2 py-1 rounded-md border border-[#2aa198]/30">
            <span>odmandakh</span>
            <ChevronRight className="w-3 h-3 text-[#586e75]" />
            <span className="text-[#eee8d5] font-bold flex items-center gap-1">
              <Folder className="w-3 h-3 text-[#268bd2] fill-[#268bd2]/20" />
              Projects
            </span>
            {selectedProject && (
              <>
                <ChevronRight className="w-3 h-3 text-[#586e75]" />
                <span className="text-[#2aa198] font-bold">{selectedProject.title}</span>
              </>
            )}
          </div>
        </div>

        {/* View Toggles & Search */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-[#002b36] rounded-md p-0.5 border border-[#2aa198]/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#2aa198]/20 text-[#2aa198] shadow-sm font-bold' : 'text-[#586e75] hover:text-[#eee8d5]'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#2aa198]/20 text-[#2aa198] shadow-sm font-bold' : 'text-[#586e75] hover:text-[#eee8d5]'
              }`}
              title="List View"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-40 sm:w-52">
            <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#2aa198]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in Projects..."
              className="w-full pl-7 pr-2 py-1 rounded-md bg-[#002b36] border border-[#2aa198]/30 text-[11px] text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Main Finder Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Finder Sidebar */}
        <div className="w-48 bg-[#073642]/80 border-r border-[#2aa198]/20 p-3 flex flex-col justify-between shrink-0 hidden sm:flex font-sans overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {/* Categories Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>Categories</span>
                <Layers className="w-3 h-3 text-[#2aa198]" />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedProject(null);
                    setSelectedCategory(cat);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                    selectedCategory === cat ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${cat === 'All' ? 'bg-[#2aa198]' : 'bg-[#b58900]'}`} />
                  <span className="truncate">{cat === 'All' ? 'All Categories' : cat}</span>
                </button>
              ))}
            </div>

            {/* Tags Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>Tags</span>
                <Tag className="w-3 h-3 text-[#2aa198]" />
              </div>
              {tags.map((tg) => (
                <button
                  key={tg}
                  onClick={() => {
                    setSelectedProject(null);
                    setSelectedTag(tg);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                    selectedTag === tg ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tg === 'All' ? 'bg-[#2aa198]' : 'bg-[#268bd2]'}`} />
                  <span className="truncate">{tg === 'All' ? 'All Tags' : tg}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-2 bg-[#002b36] rounded-xl border border-[#2aa198]/20 text-[10px] text-[#586e75] font-mono">
            <div>{filteredProjects.length} items</div>
          </div>
        </div>

        {/* Finder Content Area */}
        <div className="flex-1 bg-[#002b36] p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          {selectedProject ? (
            /* Selected Project Inspector Detail View */
            <div className="space-y-6 text-[#93a1a1] animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-[#2aa198]/20">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-3 py-1 rounded-lg bg-[#073642] hover:bg-[#073642]/80 text-xs font-semibold text-[#2aa198] border border-[#2aa198]/30 flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Projects Folder</span>
                </button>

                <div className="flex items-center space-x-2">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#073642] hover:bg-[#073642]/80 text-xs font-semibold text-[#eee8d5] border border-[#2aa198]/30 flex items-center space-x-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-[#2aa198]" />
                      <span>Code Repo</span>
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#2aa198] hover:bg-[#2aa198]/90 text-[#002b36] text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Project Title Card */}
              <div className="p-6 rounded-2xl bg-[#073642] border border-[#2aa198]/30 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-[#002b36] border border-[#2aa198]/40 text-[#268bd2]">
                    <Folder className="w-8 h-8 fill-[#268bd2]/20" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#002b36] text-[#2aa198] border border-[#2aa198]/30 font-mono">
                        {selectedProject.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#002b36] text-[#268bd2] border border-[#268bd2]/30 font-mono">
                        {selectedProject.tag}
                      </span>
                      <span className="text-xs text-[#839496] font-mono flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-[#2aa198]" />
                        {selectedProject.date}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-[#eee8d5] tracking-tight mt-1">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs text-[#93a1a1] leading-relaxed pt-2">
                  {selectedProject.fullDescription}
                </p>

                {selectedProject.metrics && (
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#002b36] border border-[#2aa198]/30 text-[#859900] text-xs font-semibold">
                    <Activity className="w-4 h-4 text-[#859900]" />
                    <span>{selectedProject.metrics}</span>
                  </div>
                )}
              </div>

              {/* Tech Stack */}
              <div className="p-4 rounded-xl bg-[#073642] border border-[#2aa198]/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] block font-mono">
                  Tech Stack & Infrastructure
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-[#002b36] text-xs text-[#2aa198] font-mono border border-[#2aa198]/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Problem vs Solution */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#073642] border border-[#2aa198]/30 space-y-2">
                  <h3 className="text-xs font-bold text-[#cb4b16] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>The Problem</span>
                  </h3>
                  <p className="text-xs text-[#93a1a1] leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#073642] border border-[#2aa198]/30 space-y-2">
                  <h3 className="text-xs font-bold text-[#859900] uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineered Solution</span>
                  </h3>
                  <p className="text-xs text-[#93a1a1] leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            /* Finder Icon Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#073642]/60 transition-all cursor-pointer space-y-2 border border-transparent hover:border-[#2aa198]/30"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-[#073642] border border-[#2aa198]/30 flex items-center justify-center text-[#268bd2] group-hover:scale-105 group-hover:border-[#2aa198]/60 transition-transform shadow-md">
                      <Folder className="w-9 h-9 fill-[#268bd2]/20 text-[#268bd2]" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#002b36] border border-[#2aa198]/30 text-[#2aa198]">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#eee8d5] group-hover:text-[#2aa198] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-[10px] text-[#839496] line-clamp-1 mt-0.5 font-mono">
                      {project.technologies.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Finder Detailed List View */
            <div className="bg-[#073642]/60 rounded-xl border border-[#2aa198]/30 overflow-hidden divide-y divide-[#2aa198]/20 text-xs">
              <div className="grid grid-cols-12 px-4 py-2 bg-[#073642] text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono">
                <span className="col-span-4">Name</span>
                <span className="col-span-3">Category</span>
                <span className="col-span-2">Tag</span>
                <span className="col-span-1">Date</span>
                <span className="col-span-2 text-right">Tech Stack</span>
              </div>

              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="grid grid-cols-12 px-4 py-3 items-center hover:bg-[#002b36]/60 transition-colors cursor-pointer text-[#eee8d5]"
                >
                  <div className="col-span-4 flex items-center space-x-2 font-semibold">
                    <Folder className="w-4 h-4 text-[#268bd2] shrink-0 fill-[#268bd2]/20" />
                    <span className="truncate">{project.title}</span>
                  </div>
                  <div className="col-span-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#002b36] border border-[#2aa198]/30 text-[#2aa198]">
                      {project.category}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#002b36] border border-[#268bd2]/30 text-[#268bd2]">
                      {project.tag}
                    </span>
                  </div>
                  <div className="col-span-1 font-mono text-[11px] text-[#839496]">
                    {project.date}
                  </div>
                  <div className="col-span-2 text-right font-mono text-[10px] text-[#839496] truncate">
                    {project.technologies.slice(0, 2).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="p-12 text-center text-[#586e75] text-xs font-mono">
              Folder is empty. No projects match your search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
