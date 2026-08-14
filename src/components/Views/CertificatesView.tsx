import React, { useState, useEffect } from 'react';
import {
  Folder,
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Grid,
  List as ListIcon,
  ChevronRight,
  HardDrive,
  Tag,
  FileText,
  X,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { certificatesData, certificateCategories } from '../../data/certificates';
import { Certificate, DesktopWindowId } from '../../types/portfolio';

interface CertificatesViewProps {
  onNavigate?: (id: DesktopWindowId) => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [modalSize, setModalSize] = useState<{ width: number | null; height: number | null }>({
    width: null,
    height: null
  });
  const [copiedCredentialId, setCopiedCredentialId] = useState(false);

  const modalRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCopiedCredentialId(false);
  }, [selectedCert?.id]);

  const handleCopyCredentialId = () => {
    if (!selectedCert) return;
    navigator.clipboard.writeText(selectedCert.credentialId);
    setCopiedCredentialId(true);
    setTimeout(() => setCopiedCredentialId(false), 1500);
  };

  const handleModalResizeStart = (e: React.PointerEvent, handle: 'e' | 's' | 'se' | 'sw' | 'w') => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;

    const container = modalRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const startWidth = rect.width;
    const startHeight = rect.height;

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (handle.includes('e')) {
        newWidth = Math.max(320, Math.min(window.innerWidth - 32, startWidth + deltaX));
      } else if (handle.includes('w')) {
        newWidth = Math.max(320, Math.min(window.innerWidth - 32, startWidth - deltaX));
      }

      if (handle.includes('s')) {
        newHeight = Math.max(260, Math.min(window.innerHeight - 32, startHeight + deltaY));
      }

      setModalSize({ width: newWidth, height: newHeight });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const tags = ['All', 'AWS', 'CKA', 'SymfonyCasts'];

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
    <div className="flex flex-col h-full min-h-[520px] bg-[#002b36] text-[#93a1a1] overflow-hidden select-none font-sans">
      {/* macOS Finder Top Toolbar */}
      <div className="bg-[#073642] border-b border-[#2aa198]/20 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button 
              disabled={!selectedCert}
              onClick={() => setSelectedCert(null)}
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
              <Folder className="w-3 h-3 text-[#b58900]" />
              Certificates
            </span>
            {selectedCert && (
              <>
                <ChevronRight className="w-3 h-3 text-[#586e75]" />
                <span className="text-[#2aa198] font-bold">{selectedCert.title}</span>
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

        {/* Finder Content Canvas */}
        <div className="flex-1 bg-[#002b36] p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#073642]/60 transition-all cursor-pointer space-y-2 border border-transparent hover:border-[#2aa198]/30"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-[#073642] border border-[#2aa198]/30 flex items-center justify-center text-[#b58900] group-hover:scale-105 group-hover:border-[#2aa198]/60 transition-transform shadow-md">
                      <FileText className="w-10 h-10 text-[#b58900]" />
                    </div>
                    <span className={`absolute -top-1 -right-1 p-0.5 rounded-full bg-[#002b36] border shadow ${
                      cert.outdated ? 'text-[#cb4b16] border-[#cb4b16]/40' : 'text-[#859900] border-[#2aa198]/30'
                    }`}>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#eee8d5] group-hover:text-[#2aa198] transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-[10px] text-[#839496] font-mono mt-0.5">
                      {cert.issueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-[#073642]/60 rounded-xl border border-[#2aa198]/30 overflow-hidden divide-y divide-[#2aa198]/20 text-xs">
              <div className="grid grid-cols-12 px-4 py-2 bg-[#073642] text-[10px] font-bold uppercase tracking-wider text-[#2aa198] font-mono">
                <span className="col-span-5">Certificate Name</span>
                <span className="col-span-3">Issuer</span>
                <span className="col-span-2">Status</span>
                <span className="col-span-2 text-right">Issue Date</span>
              </div>

              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="grid grid-cols-12 px-4 py-3 items-center hover:bg-[#002b36]/60 transition-colors cursor-pointer text-[#eee8d5]"
                >
                  <div className="col-span-5 flex items-center space-x-2 font-semibold">
                    <FileText className="w-4 h-4 text-[#b58900] shrink-0" />
                    <span className="truncate">{cert.title}</span>
                  </div>
                  <div className="col-span-3 text-[#2aa198] font-medium truncate">
                    {cert.issuer}
                  </div>
                  <div className="col-span-2 font-mono text-[10px]">
                    {cert.outdated ? (
                      <span className="px-2 py-0.5 rounded bg-[#cb4b16]/20 text-[#cb4b16] border border-[#cb4b16]/30 font-bold">
                        Expired
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-[#859900]/20 text-[#859900] border border-[#859900]/30 font-bold">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-right font-mono text-[11px] text-[#839496]">
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
      </div>

      {/* QuickLook Inspection Overlay */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 bg-[#002b36]/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: modalSize.width ? `${modalSize.width}px` : undefined,
              height: modalSize.height ? `${modalSize.height}px` : undefined,
            }}
            className={`bg-[#073642] border border-[#2aa198]/40 rounded-2xl p-6 shadow-2xl space-y-5 text-[#eee8d5] relative font-sans overflow-y-auto max-h-[90vh] ${
              modalSize.width ? '' : 'w-full max-w-lg'
            }`}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#002b36] hover:bg-[#002b36]/80 text-[#839496] hover:text-[#eee8d5] transition-colors cursor-pointer border border-[#2aa198]/30 z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-2xl bg-[#002b36] border ${
                selectedCert.outdated ? 'border-[#cb4b16]/40 text-[#cb4b16]' : 'border-[#2aa198]/40 text-[#b58900]'
              }`}>
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block font-mono ${
                  selectedCert.outdated ? 'text-[#cb4b16]' : 'text-[#2aa198]'
                }`}>
                  {selectedCert.outdated ? 'Legacy Credential' : 'Verified Credential'}
                </span>
                <h2 className="text-xl font-black text-[#eee8d5] tracking-tight">
                  {selectedCert.title}
                </h2>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#002b36] border border-[#2aa198]/30 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#586e75]">Issuer:</span>
                <span className="text-[#eee8d5] font-semibold">{selectedCert.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#586e75]">Status:</span>
                <span className={`font-bold ${selectedCert.outdated ? 'text-[#cb4b16]' : 'text-[#859900]'}`}>
                  {selectedCert.outdated ? 'Expired / Legacy' : 'Verified & Active'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#586e75]">Issue Date:</span>
                <span className="text-[#eee8d5]">{selectedCert.issueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#586e75]">Credential ID:</span>
                <button
                  onClick={handleCopyCredentialId}
                  className="text-[#2aa198] font-bold flex items-center gap-1.5 hover:text-[#eee8d5] transition-colors cursor-pointer"
                  title="Copy credential ID"
                >
                  <span>{selectedCert.credentialId}</span>
                  {copiedCredentialId ? (
                    <Check className="w-3 h-3 text-[#859900]" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-[#93a1a1] leading-relaxed font-sans">
              {selectedCert.description}
            </p>

            <div className="pt-3 border-t border-[#2aa198]/20 flex justify-end">
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#2aa198] hover:bg-[#2aa198]/90 text-xs font-bold text-[#002b36] flex items-center space-x-2 shadow-md transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Credential Online</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>

            {/* Resize Handles */}
            <div
              onPointerDown={(e) => handleModalResizeStart(e, 'e')}
              className="absolute top-0 right-0 w-2.5 h-full cursor-e-resize z-30 hover:bg-[#2aa198]/20 transition-colors"
              title="Drag to resize width"
            />
            <div
              onPointerDown={(e) => handleModalResizeStart(e, 's')}
              className="absolute bottom-0 left-0 h-2.5 w-full cursor-s-resize z-30 hover:bg-[#2aa198]/20 transition-colors"
              title="Drag to resize height"
            />
            <div
              onPointerDown={(e) => handleModalResizeStart(e, 'w')}
              className="absolute top-0 left-0 w-2.5 h-full cursor-w-resize z-30 hover:bg-[#2aa198]/20 transition-colors"
              title="Drag to resize width"
            />
            <div
              onPointerDown={(e) => handleModalResizeStart(e, 'se')}
              className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-40 flex items-center justify-center group"
              title="Drag to resize window"
            >
              <div className="w-3 h-3 border-r-2 border-b-2 border-[#2aa198]/60 group-hover:border-[#2aa198] transition-colors rounded-br-sm" />
            </div>
            <div
              onPointerDown={(e) => handleModalResizeStart(e, 'sw')}
              className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize z-40 flex items-center justify-center group"
              title="Drag to resize window"
            >
              <div className="w-3 h-3 border-l-2 border-b-2 border-[#2aa198]/60 group-hover:border-[#2aa198] transition-colors rounded-bl-sm" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
