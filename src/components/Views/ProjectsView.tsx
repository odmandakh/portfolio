import React, { useEffect, useState } from 'react';
import {
  Folder,
  Search,
  ArrowLeft,
  ArrowRight,
  Grid,
  List as ListIcon,
  ChevronRight,
  HardDrive,
  Tag,
  Layers,
  Award
} from 'lucide-react';
import { projectsData, projectFolders } from '../../data/projects';
import { Project, ProjectFolderId, DesktopWindowId } from '../../types/portfolio';
import { FolderFiles, FolderFile, readmeFile, linkFile } from '../Common/FolderFiles';
import { ProjectReadme, ProjectInfo } from './ProjectReadme';

interface ProjectsViewProps {
  onNavigate?: (id: DesktopWindowId) => void;
}

const STATUS_CONFIG: Record<Project['status'], { label: string; dot: string }> = {
  done: { label: 'Done', dot: 'bg-[#859900]' },
  ongoing: { label: 'Ongoing', dot: 'bg-[#b58900]' },
  planned: { label: 'Planned', dot: 'bg-[#586e75]' },
  disbanded: { label: 'Cancelled', dot: 'bg-[#dc322f]' }
};

const STATUS_ORDER: Project['status'][] = ['done', 'ongoing', 'planned', 'disbanded'];

// Shared column template so header and rows line up; minmax(0, …) lets cells truncate instead of overlapping
const LIST_COLUMNS = 'grid grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1.4fr)] gap-x-3';
const FOLDER_LIST_COLUMNS = 'grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.6fr)_minmax(0,3fr)] gap-x-3';

const folderName = (id: ProjectFolderId) => projectFolders.find((f) => f.id === id)?.name ?? id;
const folderItemCount = (id: ProjectFolderId) => projectsData.filter((p) => p.folder === id).length;

// What sits inside a project's folder: its README, plus a shortcut for each link it has
const projectFiles = (project: Project): FolderFile[] => [
  readmeFile,
  ...(project.demoUrl ? [linkFile('site', project.demoUrl)] : []),
  ...(project.githubUrl ? [linkFile('repo', project.githubUrl, 'GitHub')] : [])
];

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onNavigate }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentFolder, setCurrentFolder] = useState<ProjectFolderId | null>(null);
  // Which file in the open project is shown in the preview pane; nothing selected shows the project's info
  const [previewFileId, setPreviewFileId] = useState<string | null>(null);

  useEffect(() => {
    setPreviewFileId(null);
  }, [selectedProject?.id]);
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tags = ['All', ...Array.from(new Set(projectsData.map((p) => p.tag)))];

  // At the Projects root, searching or picking a tag looks across every folder, like Finder search
  const isFiltering = searchQuery !== '' || selectedTag !== 'All';
  const showFolders = currentFolder === null && !isFiltering;

  const openFolder = (id: ProjectFolderId | null) => {
    setSelectedProject(null);
    setCurrentFolder(id);
  };

  const goBack = () => {
    if (selectedProject) setSelectedProject(null);
    else setCurrentFolder(null);
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = currentFolder === null || project.folder === currentFolder;
    const matchesTag = selectedTag === 'All' || project.tag === selectedTag;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  }).sort((a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status));

  const isListView = viewMode === 'list';
  const files = selectedProject ? projectFiles(selectedProject) : [];


  return (
    <div className="flex flex-col h-full min-h-[520px] bg-[#002b36] text-[#93a1a1] overflow-hidden select-none font-sans">
      {/* macOS Finder Top Toolbar */}
      <div className="bg-[#073642] border-b border-[#2aa198]/20 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button 
              disabled={!selectedProject && !currentFolder}
              onClick={goBack}
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
            <button
              onClick={() => openFolder(null)}
              className="text-[#eee8d5] font-bold flex items-center gap-1 cursor-pointer hover:text-[#2aa198]"
            >
              <Folder className="w-3 h-3 text-[#268bd2] fill-[#268bd2]/20" />
              Projects
            </button>
            {currentFolder && (
              <>
                <ChevronRight className="w-3 h-3 text-[#586e75]" />
                <button
                  onClick={() => openFolder(currentFolder)}
                  className="text-[#eee8d5] font-bold cursor-pointer hover:text-[#2aa198] whitespace-nowrap"
                >
                  {folderName(currentFolder)}
                </button>
              </>
            )}
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
            {/* Locations Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>Locations</span>
                <HardDrive className="w-3 h-3 text-[#2aa198]" />
              </div>
              <button
                onClick={() => openFolder(null)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40"
              >
                <Folder className="w-3.5 h-3.5 text-[#268bd2] fill-[#268bd2]/20" />
                <span className="truncate">Projects</span>
              </button>
              <button
                onClick={() => onNavigate?.('certificates')}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]"
              >
                <Award className="w-3.5 h-3.5 text-[#b58900]" />
                <span className="truncate">Certificates</span>
              </button>
            </div>

            {/* Folders Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>Folders</span>
                <Layers className="w-3 h-3 text-[#2aa198]" />
              </div>
              {projectFolders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => openFolder(folder.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                    currentFolder === folder.id ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                  }`}
                >
                  <Folder className="w-3.5 h-3.5 shrink-0 text-[#268bd2] fill-[#268bd2]/20" />
                  <span className="truncate flex-1">{folder.name}</span>
                  <span className="text-[10px] font-mono text-[#586e75]">{folderItemCount(folder.id)}</span>
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
            <div>
              {selectedProject
                ? `${files.length} items`
                : showFolders ? `${projectFolders.length} folders` : `${filteredProjects.length} items`}
            </div>
          </div>
        </div>

        {/* Finder Content Area, with a preview pane on the right once a project is open */}
        <div className="flex-1 min-w-0 flex flex-col md:flex-row overflow-hidden">
        <div
          onClick={() => setPreviewFileId(null)}
          className={`flex-1 min-w-0 min-h-0 bg-[#002b36] custom-scrollbar ${
            isListView ? 'overflow-auto' : 'p-4 sm:p-6 overflow-y-auto'
          }`}
        >
          {selectedProject ? (
            /* Inside a project folder: README.md and link shortcuts */
            <FolderFiles
              files={files}
              viewMode={viewMode}
              selectedId={previewFileId}
              onSelect={(file) => setPreviewFileId((current) => (current === file.id ? null : file.id))}
            />
          ) : showFolders ? (
            viewMode === 'grid' ? (
              /* Projects root: one folder per kind of project */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                {projectFolders.map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => openFolder(folder.id)}
                    title={folder.description}
                    className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#073642]/60 transition-all cursor-pointer space-y-2 border border-transparent hover:border-[#2aa198]/30"
                  >
                    <Folder className="w-20 h-20 text-[#268bd2] fill-[#268bd2]/25 group-hover:scale-105 transition-transform" strokeWidth={1.25} />
                    <div>
                      <h3 className="text-xs font-bold text-[#eee8d5] group-hover:text-[#2aa198] transition-colors line-clamp-1">
                        {folder.name}
                      </h3>
                      <p className="text-[10px] text-[#839496] mt-0.5 font-mono">
                        {folderItemCount(folder.id)} items
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-w-[480px] text-xs">
                <div className={`${FOLDER_LIST_COLUMNS} sticky top-0 z-10 px-4 py-2 bg-[#073642] border-b border-[#2aa198]/30 text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono`}>
                  <span>Name</span>
                  <span>Items</span>
                  <span>Description</span>
                </div>
                {projectFolders.map((folder) => (
                  <div
                    key={folder.id}
                    onClick={() => openFolder(folder.id)}
                    className={`${FOLDER_LIST_COLUMNS} px-4 py-2.5 items-center odd:bg-[#073642]/30 hover:bg-[#2aa198]/15 transition-colors cursor-pointer text-[#eee8d5]`}
                  >
                    <div className="flex items-center space-x-2 font-semibold min-w-0">
                      <Folder className="w-4 h-4 shrink-0 text-[#268bd2] fill-[#268bd2]/20" />
                      <span className="truncate">{folder.name}</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#839496]">{folderItemCount(folder.id)}</div>
                    <div className="min-w-0 truncate text-[#839496]" title={folder.description}>{folder.description}</div>
                  </div>
                ))}
              </div>
            )
          ) : viewMode === 'grid' ? (
            /* Finder Icon Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#073642]/60 transition-colors cursor-pointer space-y-1.5"
                >
                  <Folder className="w-16 h-16 text-[#268bd2] fill-[#268bd2]/25" strokeWidth={1.25} />
                  <div className="min-w-0 max-w-full">
                    <h3 className="text-xs font-medium text-[#eee8d5] flex items-center justify-center gap-1.5">
                      <span className="truncate">{project.title}</span>
                      <span
                        className={`w-1.5 h-1.5 shrink-0 rounded-full ${STATUS_CONFIG[project.status].dot}`}
                        title={STATUS_CONFIG[project.status].label}
                      />
                    </h3>
                    <p className="text-[10px] text-[#839496] line-clamp-1 mt-0.5">
                      {project.technologies.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Finder Detailed List View — edge-to-edge like a real Finder window */
            <div className="min-w-[640px] text-xs">
              <div className={`${LIST_COLUMNS} sticky top-0 z-10 px-4 py-2 bg-[#073642] border-b border-[#2aa198]/30 text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono`}>
                <span>Name</span>
                <span>Folder</span>
                <span>Kind</span>
                <span>Date</span>
                <span className="text-right">Tech Stack</span>
              </div>

              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`${LIST_COLUMNS} px-4 py-2.5 items-center odd:bg-[#073642]/30 hover:bg-[#2aa198]/15 transition-colors cursor-pointer text-[#eee8d5]`}
                >
                  <div className="flex items-center space-x-2 font-semibold min-w-0">
                    <Folder className="w-4 h-4 shrink-0 text-[#268bd2] fill-[#268bd2]/20" />
                    <span className="truncate">{project.title}</span>
                    <span
                      className={`w-1.5 h-1.5 shrink-0 rounded-full ${STATUS_CONFIG[project.status].dot}`}
                      title={STATUS_CONFIG[project.status].label}
                    />
                  </div>
                  <div className="min-w-0 truncate text-[#839496]" title={folderName(project.folder)}>
                    {folderName(project.folder)}
                  </div>
                  <div className="min-w-0 truncate text-[#839496]" title={project.tag}>
                    {project.tag}
                  </div>
                  <div className="min-w-0 truncate font-mono text-[11px] text-[#839496]" title={project.date}>
                    {project.date}
                  </div>
                  <div className="min-w-0 truncate text-right font-mono text-[10px] text-[#839496]" title={project.technologies.join(', ')}>
                    {project.technologies.slice(0, 2).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showFolders && !selectedProject && filteredProjects.length === 0 && (
            <div className="p-12 text-center text-[#586e75] text-xs font-mono">
              {isFiltering ? 'No projects match your search or tag filter.' : 'This folder is empty.'}
            </div>
          )}
        </div>

        {selectedProject && (
          <aside className="md:w-1/2 shrink-0 min-h-0 max-h-[55%] md:max-h-none flex flex-col border-t md:border-t-0 md:border-l border-[#2aa198]/20 bg-[#002b36]">
            {previewFileId === 'readme' ? (
              <ProjectReadme project={selectedProject} />
            ) : (
              <ProjectInfo project={selectedProject} />
            )}
          </aside>
        )}
        </div>
      </div>
    </div>
  );
};
