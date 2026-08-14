import React, { useState } from 'react';
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
  Star, 
  Tag, 
  FileText, 
  X,
  CheckCircle2
} from 'lucide-react';
import { certificatesData, certificateCategories } from '../../data/certificates';
import { Certificate } from '../../types/portfolio';

export const CertificatesView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCerts = certificatesData.filter((cert) => {
    const matchesCategory = activeCategory === 'all' || cert.categoryId === activeCategory;
    const matchesSearch = searchQuery === '' || 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full min-h-[520px] bg-[#002b36] text-[#93a1a1] overflow-hidden select-none font-sans">
      {/* macOS Finder Top Toolbar */}
      <div className="bg-[#073642] border-b border-[#2aa198]/20 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
        {/* Navigation & Path Breadcrumb */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <button 
              disabled
              className="p-1.5 rounded-md opacity-30 cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#586e75]" />
            </button>
            <button 
              disabled
              className="p-1.5 rounded-md opacity-30 cursor-not-allowed"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#586e75]" />
            </button>
          </div>

          <div className="h-4 w-px bg-[#2aa198]/20" />

          {/* Breadcrumb Path */}
          <div className="flex items-center space-x-1 font-mono text-[11px] text-[#839496] bg-[#002b36] px-2 py-1 rounded-md border border-[#2aa198]/30">
            <HardDrive className="w-3 h-3 text-[#268bd2]" />
            <span>Macintosh HD</span>
            <ChevronRight className="w-3 h-3 text-[#586e75]" />
            <span>Users</span>
            <ChevronRight className="w-3 h-3 text-[#586e75]" />
            <span>odmandakh</span>
            <ChevronRight className="w-3 h-3 text-[#586e75]" />
            <span className="text-[#eee8d5] font-bold flex items-center gap-1">
              <Folder className="w-3 h-3 text-[#b58900]" />
              Certificates
            </span>
          </div>
        </div>

        {/* View Mode & Search */}
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
        <div className="w-48 bg-[#073642]/80 border-r border-[#2aa198]/20 p-3 flex flex-col justify-between shrink-0 hidden sm:flex font-sans">
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>All Documents</span>
                <Award className="w-3 h-3 text-[#b58900]" />
              </div>
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  activeCategory === 'all' ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Folder className="w-3.5 h-3.5 text-[#b58900]" />
                  <span>All Certificates</span>
                </div>
                <span className="text-[10px] font-mono text-[#2aa198]">{certificatesData.length}</span>
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#2aa198] px-2 py-1 flex items-center justify-between font-mono">
                <span>Categories</span>
                <Tag className="w-3 h-3 text-[#2aa198]" />
              </div>
              {certificateCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors cursor-pointer ${
                    activeCategory === cat.id ? 'bg-[#002b36] text-[#eee8d5] font-semibold border border-[#2aa198]/40' : 'text-[#839496] hover:bg-[#002b36]/50 hover:text-[#eee8d5]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#b58900]" />
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-2 bg-[#002b36] rounded-xl border border-[#2aa198]/20 text-[10px] text-[#586e75] font-mono">
            <div>Verified Credentials: {filteredCerts.length}</div>
            <div className="text-[#859900]">Status: 100% Valid</div>
          </div>
        </div>

        {/* Finder Content Canvas */}
        <div className="flex-1 bg-[#002b36] p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#073642]/60 transition-all cursor-pointer space-y-2 border border-transparent hover:border-[#2aa198]/30"
                >
                  <div className="relative">
                    <div className="w-16 h-20 rounded-xl bg-[#073642] border border-[#2aa198]/30 p-2 flex flex-col justify-between items-center group-hover:scale-105 group-hover:border-[#2aa198]/60 transition-transform shadow-md">
                      <FileText className="w-8 h-8 text-[#b58900]" />
                      <span className="text-[8px] font-mono font-bold text-[#2aa198] uppercase truncate w-full text-center">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="absolute -top-1 -right-1 p-0.5 rounded-full bg-[#002b36] text-[#859900] border border-[#2aa198]/30 shadow">
                      <ShieldCheck className="w-3 h-3" />
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
                <span className="col-span-2">Issue Date</span>
                <span className="col-span-2 text-right">Status</span>
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
                  <div className="col-span-2 font-mono text-[11px] text-[#839496]">
                    {cert.issueDate}
                  </div>
                  <div className="col-span-2 text-right font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-[#002b36] text-[#859900] border border-[#2aa198]/30 font-bold">
                      Verified
                    </span>
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
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#073642] border border-[#2aa198]/40 rounded-2xl p-6 shadow-2xl space-y-5 text-[#eee8d5] relative font-sans"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#002b36] hover:bg-[#002b36]/80 text-[#839496] hover:text-[#eee8d5] transition-colors cursor-pointer border border-[#2aa198]/30"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-[#002b36] border border-[#2aa198]/40 text-[#b58900]">
                <Award className="w-8 h-8 text-[#b58900]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2aa198] uppercase tracking-wider block font-mono">
                  Verified Credential
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
                <span className="text-[#586e75]">Issue Date:</span>
                <span className="text-[#eee8d5]">{selectedCert.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#586e75]">Credential ID:</span>
                <span className="text-[#2aa198] font-bold">{selectedCert.credentialId}</span>
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
          </div>
        </div>
      )}
    </div>
  );
};
