import React, { useState, Suspense, lazy } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { TopBar } from './components/Desktop/TopBar';
import { DesktopIcon } from './components/Desktop/DesktopIcon';
import { ExperienceWidget } from './components/Widgets/ExperienceWidget';
import { GithubWidget } from './components/Widgets/GithubWidget';
import { LeetcodeWidget } from './components/Widgets/LeetcodeWidget';
import { Window } from './components/Common/Window';

const AboutView = lazy(() => import('./components/Views/AboutView').then((m) => ({ default: m.AboutView })));
const ProjectsView = lazy(() => import('./components/Views/ProjectsView').then((m) => ({ default: m.ProjectsView })));
const SkillsView = lazy(() => import('./components/Views/SkillsView').then((m) => ({ default: m.SkillsView })));
const CertificatesView = lazy(() => import('./components/Views/CertificatesView').then((m) => ({ default: m.CertificatesView })));
const CVView = lazy(() => import('./components/Views/CVView').then((m) => ({ default: m.CVView })));
const ExperienceView = lazy(() => import('./components/Views/ExperienceView').then((m) => ({ default: m.ExperienceView })));
const GithubView = lazy(() => import('./components/Views/GithubView').then((m) => ({ default: m.GithubView })));
const LeetcodeView = lazy(() => import('./components/Views/LeetcodeView').then((m) => ({ default: m.LeetcodeView })));
const ContactView = lazy(() => import('./components/Views/ContactView').then((m) => ({ default: m.ContactView })));

import { desktopItems } from './data/desktopItems';
import { DesktopWindowId } from './types/portfolio';

// Default window size per app, in px; windows shrink to fit smaller screens
const WINDOW_SIZES: Record<DesktopWindowId, { width: number; height: number }> = {
  projects: { width: 1000, height: 640 },
  certificates: { width: 1000, height: 640 },
  about: { width: 920, height: 640 },
  skills: { width: 1120, height: 720 },
  cv: { width: 860, height: 900 },
  experience: { width: 760, height: 720 },
  github: { width: 900, height: 760 },
  leetcode: { width: 900, height: 760 },
  contact: { width: 820, height: 580 }
};

export default function App() {
  const [activeWindow, setActiveWindow] = useState<DesktopWindowId | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleOpenWindow = (id: DesktopWindowId) => {
    setActiveWindow(id);
    setSelectedIcon(id);
  };

  const handleCloseWindow = () => {
    setActiveWindow(null);
  };

  const getActiveWindowMeta = () => {
    if (!activeWindow) return { title: 'Desktop', icon: null };
    if (activeWindow === 'cv') {
      return {
        title: 'Curriculum Vitae / Resume',
        subtitle: undefined
      };
    }
    if (activeWindow === 'contact') {
      return {
        title: 'Message',
        subtitle: undefined
      };
    }
    const item = desktopItems.find(i => i.id === activeWindow);
    return {
      title: item ? item.title : 'Desktop',
      subtitle: item && item.description !== item.title ? item.description : undefined
    };
  };

  const renderActiveView = () => {
    switch (activeWindow) {
      case 'about':
        return <AboutView />;
      case 'projects':
        return <ProjectsView onNavigate={(id) => handleOpenWindow(id)} />;
      case 'skills':
        return <SkillsView />;
      case 'certificates':
        return <CertificatesView onNavigate={(id) => handleOpenWindow(id)} />;
      case 'cv':
        return <CVView />;
      case 'experience':
        return <ExperienceView />;
      case 'github':
        return <GithubView />;
      case 'leetcode':
        return <LeetcodeView />;
      case 'contact':
        return <ContactView />;
      default:
        return null;
    }
  };

  const activeMeta = getActiveWindowMeta();

  return (
    <div 
      onClick={() => setSelectedIcon(null)}
      className="relative min-h-screen w-full bg-[#002b36] text-[#839496] flex flex-col overflow-x-hidden font-sans select-none antialiased"
      style={{
        background: 'radial-gradient(ellipse at top, #073642 0%, #002b36 60%, #001f27 100%)'
      }}
    >
      {/* Background Decorative Ambient Solarized Cyan & Blue Glows */}
      {/* Rendered with radial gradients instead of filter: blur() — large blurs are very expensive on iOS Safari */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: [
            'radial-gradient(ellipse 600px 320px at 35% 0%, rgba(42, 161, 152, 0.10), transparent 70%)',
            'radial-gradient(ellipse 520px 320px at 70% 45%, rgba(38, 139, 210, 0.10), transparent 70%)',
            'radial-gradient(ellipse 620px 280px at 50% 100%, rgba(108, 113, 196, 0.10), transparent 70%)',
          ].join(', '),
        }}
      />

      {/* macOS Top Menu Bar */}
      <TopBar
        activeWindowName={activeMeta.title}
        onOpenAbout={() => handleOpenWindow('about')}
        onResetDesktop={handleCloseWindow}
        onOpenWindow={(id) => handleOpenWindow(id)}
      />

      {/* Primary Desktop Canvas Surface */}
      <main className="relative z-10 flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 items-start justify-between">
        {/* Desktop Objects Grid */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 items-start justify-items-center">
          {/* Folders, Files, & Apps */}
          {desktopItems.filter(i => i.type !== 'widget').map((item) => (
            <DesktopIcon
              key={item.id}
              item={item}
              isSelected={selectedIcon === item.id}
              onSelect={() => setSelectedIcon(item.id)}
              onOpen={() => handleOpenWindow(item.id)}
            />
          ))}
        </div>

        {/* Responsive Widgets Container */}
        <div className="w-full lg:w-80 grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col gap-4 shrink-0">
          <ExperienceWidget onClick={() => handleOpenWindow('experience')} />
          <GithubWidget onClick={() => handleOpenWindow('github')} />
          <LeetcodeWidget onClick={() => handleOpenWindow('leetcode')} />
        </div>
      </main>

      {/* macOS Floating Dock Bar - Balanced Solarized Glass */}
      <nav className="relative z-20 py-3 flex items-center justify-center">
        <div className="bg-[#073642] sm:bg-[#073642]/80 sm:backdrop-blur-2xl border border-[#2aa198]/30 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl shadow-[#001f27]">
          {desktopItems.filter(i => i.type !== 'widget').map((item) => {
            const getDockColor = () => {
              switch (item.id) {
                case 'projects': return 'bg-[#268bd2]/20 border-[#268bd2]/40 text-[#268bd2]';
                case 'certificates': return 'bg-[#b58900]/20 border-[#b58900]/40 text-[#b58900]';
                case 'about': return 'bg-[#2aa198]/20 border-[#2aa198]/40 text-[#2aa198]';
                case 'skills': return 'bg-[#6c71c4]/20 border-[#6c71c4]/40 text-[#6c71c4]';
                case 'cv': return 'bg-[#cb4b16]/20 border-[#cb4b16]/40 text-[#cb4b16]';
                case 'contact': return 'bg-[#859900]/20 border-[#859900]/40 text-[#859900]';
                default: return 'bg-[#073642] border-[#2aa198]/30 text-[#2aa198]';
              }
            };
            const colorClass = getDockColor();

            return (
              <button
                key={item.id}
                onClick={() => handleOpenWindow(item.id)}
                title={item.title}
                className={`group relative p-2 rounded-xl transition-all duration-200 hover:scale-125 hover:-translate-y-2 cursor-pointer ${
                  activeWindow === item.id 
                    ? 'bg-[#002b36] border border-[#2aa198]/50 shadow-md ring-1 ring-[#2aa198]/30' 
                    : 'hover:bg-[#002b36]/60'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold font-mono ${colorClass}`}>
                    {item.id === 'about' && 'O'}
                    {item.id === 'projects' && 'P'}
                    {item.id === 'skills' && 'S'}
                    {item.id === 'certificates' && 'C'}
                    {item.id === 'cv' && 'CV'}
                    {item.id === 'contact' && '@'}
                  </div>
                </div>

                {/* Tooltip on hover */}
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#073642] border border-[#2aa198]/30 text-[#eee8d5] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                  {item.title}
                </span>

                {/* Active Dot */}
                {activeWindow === item.id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#2aa198] shadow-sm shadow-[#2aa198]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Contact Action Button (Icon Only) */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => handleOpenWindow('contact')}
          className="group relative p-3.5 rounded-full bg-[#859900] hover:bg-[#859900]/90 text-[#002b36] shadow-2xl shadow-[#859900]/30 border border-[#859900]/60 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Contact Me"
        >
          <MessageSquare className="w-5 h-5 text-[#002b36] group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Desktop Window Modal Container */}
      <Window
        id={activeWindow || 'none'}
        title={activeMeta.title}
        subtitle={activeMeta.subtitle}
        isOpen={activeWindow !== null}
        isFocused={true}
        onClose={handleCloseWindow}
        onFocus={() => {}}
        defaultWidth={activeWindow ? WINDOW_SIZES[activeWindow].width : undefined}
        defaultHeight={activeWindow ? WINDOW_SIZES[activeWindow].height : undefined}
      >
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center min-h-[400px] text-[#586e75] gap-2 text-sm font-mono">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading...</span>
            </div>
          }
        >
          {renderActiveView()}
        </Suspense>
      </Window>


    </div>
  );
}
