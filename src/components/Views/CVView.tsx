import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  PanelLeft, 
  Search, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Award, 
  Check
} from 'lucide-react';
import { resumeData } from '../../data/cv';

export const CVView: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const totalPages = 2;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);

    const content = `
===================================================================
${resumeData.fullName.toUpperCase()} — ${resumeData.title.toUpperCase()}
Email: ${resumeData.email} | Location: ${resumeData.location}
Website: ${resumeData.website} | GitHub: ${resumeData.github} | LinkedIn: ${resumeData.linkedin}
===================================================================

SUMMARY
-------------------------------------------------------------------
${resumeData.summary}

PROFESSIONAL EXPERIENCE
-------------------------------------------------------------------
${resumeData.experience.map(e => `
* ${e.role} @ ${e.company} (${e.period} | ${e.location})
${e.bullets.map(b => `  - ${b}`).join('\n')}
`).join('\n')}

EDUCATION
-------------------------------------------------------------------
${resumeData.education.map(ed => `* ${ed.degree} — ${ed.institution} (${ed.period})
  ${ed.honors}`).join('\n')}

CERTIFICATIONS
-------------------------------------------------------------------
${resumeData.certifications.map(c => `* ${c}`).join('\n')}

TECHNICAL SKILLS
-------------------------------------------------------------------
${resumeData.coreSkills.map(cs => `* ${cs.category}: ${cs.items.join(', ')}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV_Odmandakh_2026.pdf.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 15, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 15, 70));
  };

  const scrollToPage = (pageNum: number) => {
    setCurrentPage(pageNum);
    const element = document.getElementById(`pdf-page-${pageNum}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-zinc-100 font-sans overflow-hidden min-h-[520px]">
      {/* macOS Preview Toolbar */}
      <div className="bg-[#2a2a2a] border-b border-zinc-700/80 px-3 py-2 flex flex-wrap items-center justify-between gap-2 select-none text-xs text-zinc-300 shrink-0">
        {/* Left Toolbar Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              showThumbnails ? 'bg-zinc-700 text-white' : 'hover:bg-zinc-700/60 text-zinc-400'
            }`}
            title="Toggle Sidebar Thumbnails"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-zinc-700" />

          {/* Page Navigation */}
          <div className="flex items-center space-x-1 bg-zinc-800/80 rounded-md px-2 py-1 border border-zinc-700">
            <button
              onClick={() => scrollToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1 text-zinc-200">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => scrollToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-zinc-700 hidden sm:block" />

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center space-x-1 bg-zinc-800/80 rounded-md px-2 py-1 border border-zinc-700">
            <button
              onClick={handleZoomOut}
              className="hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1.5 min-w-[42px] text-center text-zinc-200">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="text-[10px] text-zinc-400 hover:text-white ml-1 px-1 py-0.5 rounded bg-zinc-700/50 cursor-pointer"
              title="Reset Zoom"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Center Title Badge */}
        <div className="hidden md:flex items-center space-x-1.5 font-medium text-zinc-200">
          <FileText className="w-4 h-4 text-zinc-400" />
          <span>CV_Odmandakh_2026.pdf</span>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center space-x-2">
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-zinc-900 border border-zinc-700 rounded-md px-2 py-1 space-x-1.5 w-36 focus-within:w-48 transition-all">
            <Search className="w-3 h-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Search PDF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-[11px] text-zinc-200 focus:outline-none w-full placeholder-zinc-500"
            />
          </div>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-md hover:bg-zinc-700/60 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Print Document"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownload}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              downloaded 
                ? 'bg-zinc-800 text-white border border-zinc-700' 
                : 'bg-zinc-100 hover:bg-white text-zinc-900 shadow-sm'
            }`}
            title="Download PDF File"
          >
            {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Downloaded' : 'Download'}</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 flex overflow-hidden relative bg-[#121212]">
        {/* Left Thumbnails Sidebar */}
        {showThumbnails && (
          <div className="w-40 bg-[#1a1a1a] border-r border-zinc-800 p-3 overflow-y-auto shrink-0 hidden md:flex flex-col space-y-4 select-none custom-scrollbar">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-1">
              Page Thumbnails
            </div>

            {/* Thumbnail Page 1 */}
            <div 
              onClick={() => scrollToPage(1)}
              className={`group cursor-pointer space-y-1 p-1 rounded-lg transition-all ${
                currentPage === 1 ? 'ring-2 ring-zinc-500 bg-zinc-800/50' : 'hover:bg-white/5'
              }`}
            >
              <div className="w-full aspect-[1/1.4] bg-white rounded shadow-md p-2 text-[4px] leading-[5px] text-zinc-800 overflow-hidden relative select-none pointer-events-none">
                <div className="font-bold text-[6px] text-black border-b pb-0.5 mb-1">{resumeData.fullName}</div>
                <div className="text-zinc-600 mb-1">{resumeData.title}</div>
                <div className="space-y-0.5 text-zinc-600">
                  <div className="bg-zinc-200 h-1 w-full rounded" />
                  <div className="bg-zinc-200 h-1 w-3/4 rounded" />
                  <div className="bg-zinc-200 h-1 w-5/6 rounded" />
                </div>
              </div>
              <div className="text-center text-[10px] font-mono text-zinc-400 group-hover:text-white">
                Page 1
              </div>
            </div>

            {/* Thumbnail Page 2 */}
            <div 
              onClick={() => scrollToPage(2)}
              className={`group cursor-pointer space-y-1 p-1 rounded-lg transition-all ${
                currentPage === 2 ? 'ring-2 ring-zinc-500 bg-zinc-800/50' : 'hover:bg-white/5'
              }`}
            >
              <div className="w-full aspect-[1/1.4] bg-white rounded shadow-md p-2 text-[4px] leading-[5px] text-zinc-800 overflow-hidden relative select-none pointer-events-none">
                <div className="font-bold text-[5px] text-zinc-800 border-b pb-0.5 mb-1">Education & Skills</div>
                <div className="space-y-0.5 text-zinc-600">
                  <div className="bg-zinc-200 h-1 w-full rounded" />
                  <div className="bg-zinc-200 h-1 w-2/3 rounded" />
                  <div className="bg-zinc-200 h-1 w-4/5 rounded" />
                </div>
              </div>
              <div className="text-center text-[10px] font-mono text-zinc-400 group-hover:text-white">
                Page 2
              </div>
            </div>
          </div>
        )}

        {/* PDF Document Canvas Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center space-y-8 custom-scrollbar">
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 flex flex-col items-center space-y-8 w-full max-w-3xl"
          >
            {/* PAGE 1 */}
            <div 
              id="pdf-page-1"
              className="w-full bg-white text-zinc-900 rounded-sm shadow-2xl p-8 sm:p-12 relative min-h-[900px] flex flex-col justify-between border border-zinc-300 select-text"
            >
              <div className="space-y-6">
                {/* PDF Header */}
                <div className="border-b border-zinc-200 pb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight text-zinc-950 font-serif">
                        {resumeData.fullName}
                      </h1>
                      <p className="text-sm font-semibold text-zinc-700 mt-1 uppercase tracking-wide">
                        {resumeData.title}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded">
                      PAGE 1
                    </span>
                  </div>

                  {/* Contact Info Bar */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 mt-4 pt-3 border-t border-zinc-100 font-mono">
                    <span className="flex items-center">
                      <Mail className="w-3 h-3 mr-1 text-zinc-700 shrink-0" />
                      {resumeData.email}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-zinc-500 shrink-0" />
                      {resumeData.location}
                    </span>
                    <span className="flex items-center">
                      <Github className="w-3 h-3 mr-1 text-zinc-800 shrink-0" />
                      {resumeData.github}
                    </span>
                    <span className="flex items-center">
                      <Linkedin className="w-3 h-3 mr-1 text-zinc-700 shrink-0" />
                      {resumeData.linkedin}
                    </span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 font-mono">
                    Executive Summary
                  </h2>
                  <p className="text-xs text-zinc-700 leading-relaxed font-sans">
                    {resumeData.summary}
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-4">
                  <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 font-mono">
                    Professional Experience
                  </h2>

                  <div className="space-y-5">
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-xs font-bold text-zinc-950">
                            {exp.role} — <span className="text-zinc-800 font-semibold">{exp.company}</span>
                          </h3>
                          <span className="text-[11px] font-mono text-zinc-500">
                            {exp.period} | {exp.location}
                          </span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs text-zinc-700 leading-relaxed pl-1 marker:text-zinc-700">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Page Footer */}
              <div className="pt-6 border-t border-zinc-200 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>Curriculum Vitae • {resumeData.fullName}</span>
                <span>Page 1 of 2</span>
              </div>
            </div>

            {/* PAGE BREAK INDICATOR */}
            <div className="flex items-center space-x-3 text-xs font-mono text-zinc-500 select-none py-2">
              <span className="w-12 h-px bg-zinc-700" />
              <span>PAGE 2 BREAK</span>
              <span className="w-12 h-px bg-zinc-700" />
            </div>

            {/* PAGE 2 */}
            <div 
              id="pdf-page-2"
              className="w-full bg-white text-zinc-900 rounded-sm shadow-2xl p-8 sm:p-12 relative min-h-[900px] flex flex-col justify-between border border-zinc-300 select-text"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                  <h2 className="text-sm font-bold tracking-tight text-zinc-950 uppercase font-mono">
                    {resumeData.fullName} — Resume (Cont.)
                  </h2>
                  <span className="text-[10px] font-mono text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded">
                    PAGE 2
                  </span>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 font-mono">
                    Education & Credentials
                  </h2>
                  {resumeData.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-start text-xs">
                      <div>
                        <h3 className="font-bold text-zinc-950">{edu.degree}</h3>
                        <p className="text-zinc-600">{edu.institution}</p>
                        <p className="text-[11px] text-zinc-700 font-medium mt-0.5">{edu.honors}</p>
                      </div>
                      <span className="font-mono text-zinc-500 text-[11px]">{edu.period}</span>
                    </div>
                  ))}
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 font-mono">
                    Industry Certifications
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-zinc-800">
                    {resumeData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-2 p-2 bg-zinc-50 rounded border border-zinc-200">
                        <Award className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span className="font-medium text-[11px]">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills Matrix */}
                <div className="space-y-3">
                  <h2 className="text-xs font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-200 pb-1 font-mono">
                    Core Engineering Competencies
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    {resumeData.coreSkills.map((sk, idx) => (
                      <div key={idx} className="p-3 bg-zinc-50 rounded border border-zinc-200 space-y-1">
                        <span className="text-[11px] font-bold text-zinc-900 block uppercase font-mono">
                          {sk.category}
                        </span>
                        <p className="text-zinc-700 font-mono text-[11px] leading-relaxed">
                          {sk.items.join(' • ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Page 2 Footer */}
              <div className="pt-6 border-t border-zinc-200 flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>Curriculum Vitae • {resumeData.fullName}</span>
                <span>Page 2 of 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

