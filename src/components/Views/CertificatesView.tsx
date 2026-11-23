import React, { useState } from 'react';
import {
  Folder,
  Award,
  Search,
  ArrowLeft,
  ArrowRight,
  Grid,
  List as ListIcon,
  ChevronRight,
  HardDrive,
  Tag,
  Layers,
  FileText
} from 'lucide-react';
import { certificatesData, certificateCategories, isCertificateExpired } from '../../data/certificates';
import { Certificate, DesktopWindowId } from '../../types/portfolio';
import { CertificateInfo } from './CertificateInfo';

// Shared column template so header and rows line up; minmax(0, …) lets cells truncate instead of overlapping
const LIST_COLUMNS = 'grid grid-cols-[minmax(0,2.5fr)_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-3';

interface CertificatesViewProps {
  onNavigate?: (id: DesktopWindowId) => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tags = ['All', ...Array.from(new Set(certificatesData.flatMap((c) => (c.tag ? [c.tag] : []))))];

  const filteredCerts = certificatesData.filter((cert) => {
    const matchesCategory = activeCategory === 'all' || cert.categoryId === activeCategory;
    const matchesTag = selectedTag === 'All' || cert.tag === selectedTag;
    const matchesSearch = searchQuery === '' || 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.tag && cert.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesTag && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#002b36] text-[#93a1a1] overflow-hidden select-none font-sans">
      {/* macOS Finder Top Toolbar */}
      <div className="bg-[#073642] border-b border-[#2aa198]/20 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button 
              disabled
              className="p-1.5 rounded-md opacity-30 cursor-not-allowed"
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
              Certificates
            </span>
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
              placeholder="Search Certificates..."
              className="w-full pl-7 pr-2 py-1 rounded-md bg-[#002b36] border border-[#2aa198]/30 text-[11px] text-[#eee8d5] placeholder-[#586e75] focus:outline-none focus:border-[#2aa198] font-mono"
            />
          </div>
        </div>
      </div>

      {/* Main Finder Layout */}
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
                onClick={() => onNavigate?.('projects')}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]"
              >
                <Folder className="w-3.5 h-3.5 text-[#268bd2] fill-[#268bd2]/20" />
                <span className="truncate">Projects</span>
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40"
              >
                <Award className="w-3.5 h-3.5 text-[#b58900]" />
                <span className="truncate">Certificates</span>
              </button>
            </div>

            {/* Categories Group */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>Categories</span>
                <Layers className="w-3 h-3 text-[#2aa198]" />
              </div>
              <button
                onClick={() => {
                  setSelectedCert(null);
                  setActiveCategory('all');
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                  activeCategory === 'all' ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#2aa198]" />
                <span className="truncate">All Categories</span>
              </button>
              {certificateCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCert(null);
                    setActiveCategory(cat.id);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeCategory === cat.id ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#b58900]" />
                  <span className="truncate">{cat.name}</span>
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
                    setSelectedCert(null);
                    setSelectedTag(tg);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                    selectedTag === tg ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${tg === 'All' ? 'bg-[#2aa198]' : 'bg-[#b58900]'}`} />
                  <span className="truncate">{tg === 'All' ? 'All Tags' : tg}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-2 bg-[#002b36] rounded-xl border border-[#2aa198]/20 text-[10px] text-[#586e75] font-mono">
            <div>{filteredCerts.length} items</div>
          </div>
        </div>

        {/* Finder Content Canvas, with a preview pane on the right for the selected certificate */}
        <div className="flex-1 min-w-0 flex flex-col md:flex-row overflow-hidden">
        <div
          onClick={() => setSelectedCert(null)}
          className={`flex-1 min-w-0 min-h-0 bg-[#002b36] custom-scrollbar ${
            viewMode === 'list' ? 'overflow-auto' : 'p-4 sm:p-6 overflow-y-auto'
          }`}
        >
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-3">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert((current) => (current?.id === cert.id ? null : cert));
                  }}
                  className={`group flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#073642]/60 transition-colors cursor-pointer space-y-1.5 ${
                    selectedCert?.id === cert.id ? 'bg-[#2aa198]/20' : ''
                  }`}
                >
                  <FileText className="w-14 h-14 text-[#b58900]" strokeWidth={1.25} />

                  <div className="min-w-0 max-w-full">
                    <h3 className="text-xs font-medium text-[#eee8d5] flex items-center justify-center gap-1.5">
                      <span className="line-clamp-2">{cert.title}</span>
                      <span
                        className={`w-1.5 h-1.5 shrink-0 rounded-full ${isCertificateExpired(cert) ? 'bg-[#cb4b16]' : 'bg-[#859900]'}`}
                        title={isCertificateExpired(cert) ? 'Expired' : 'Valid'}
                      />
                    </h3>
                    <p className="text-[10px] text-[#839496] font-mono mt-0.5">
                      {cert.issueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View — edge-to-edge like a real Finder window */
            <div className="min-w-[560px] text-xs">
              <div className={`${LIST_COLUMNS} sticky top-0 z-10 px-4 py-2 bg-[#073642] border-b border-[#2aa198]/30 text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono`}>
                <span>Certificate Name</span>
                <span>Issuer</span>
                <span>Status</span>
                <span className="text-right">Issue Date</span>
              </div>

              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert((current) => (current?.id === cert.id ? null : cert));
                  }}
                  className={`${LIST_COLUMNS} px-4 py-2.5 items-center odd:bg-[#073642]/30 hover:bg-[#2aa198]/15 transition-colors cursor-pointer text-[#eee8d5] ${
                    selectedCert?.id === cert.id ? '!bg-[#2aa198]/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2 font-semibold min-w-0">
                    <FileText className="w-4 h-4 shrink-0 text-[#b58900]" />
                    <span className="truncate" title={cert.title}>{cert.title}</span>
                  </div>
                  <div className="min-w-0 truncate text-[#839496]" title={cert.issuer}>
                    {cert.issuer}
                  </div>
                  <div className="min-w-0 text-[11px]">
                    <span className="flex items-center gap-1.5 text-[#839496]">
                      <span className={`w-1.5 h-1.5 rounded-full ${isCertificateExpired(cert) ? 'bg-[#cb4b16]' : 'bg-[#859900]'}`} />
                      {isCertificateExpired(cert) ? 'Expired' : 'Valid'}
                    </span>
                  </div>
                  <div className="min-w-0 truncate text-right font-mono text-[11px] text-[#839496]">
                    {cert.issueDate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredCerts.length === 0 && (
            <div className="p-12 text-center text-[#586e75] text-xs font-mono">
              No certificates match your filter criteria.
            </div>
          )}
        </div>

        {selectedCert && (
          <aside className="md:w-1/2 shrink-0 min-h-0 max-h-[55%] md:max-h-none flex flex-col border-t md:border-t-0 md:border-l border-[#2aa198]/20 bg-[#002b36]">
            <CertificateInfo certificate={selectedCert} />
          </aside>
        )}
        </div>
      </div>

    </div>
  );
};
