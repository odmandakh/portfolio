import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { TopBar } from './components/Desktop/TopBar';
import { DesktopIcon } from './components/Desktop/DesktopIcon';
import { ExperienceWidget } from './components/Widgets/ExperienceWidget';
import { GithubWidget } from './components/Widgets/GithubWidget';
import { LeetcodeWidget } from './components/Widgets/LeetcodeWidget';
import { Window } from './components/Common/Window';

import { AboutView } from './components/Views/AboutView';
import { ProjectsView } from './components/Views/ProjectsView';
import { SkillsView } from './components/Views/SkillsView';
import { CertificatesView } from './components/Views/CertificatesView';
import { CVView } from './components/Views/CVView';
import { ExperienceView } from './components/Views/ExperienceView';
import { GithubView } from './components/Views/GithubView';
import { LeetcodeView } from './components/Views/LeetcodeView';
import { ContactView } from './components/Views/ContactView';

import { desktopItems } from './data/desktopItems';
import { DesktopWindowId } from './types/portfolio';

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
    const item = desktopItems.find(i => i.id === activeWindow);
    return {
      title: item ? item.title : 'Desktop',
      subtitle: item ? item.description : undefined
    };
  };

  const renderActiveView = () => {
    switch (activeWindow) {
      case 'about':
        return <AboutView />;
      case 'projects':
        return <ProjectsView />;
      case 'skills':
        return <SkillsView />;
      case 'certificates':
        return <CertificatesView />;
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
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#2aa198]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-[#268bd2]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[250px] bg-[#6c71c4]/10 rounded-full blur-[160px]" />
      </div>

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
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 items-start">
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
        <div className="bg-[#073642]/80 backdrop-blur-2xl border border-[#2aa198]/30 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl shadow-[#001f27]">
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
          className="group relative p-3.5 rounded-full bg-[#859900] hover:bg-[#859900]/90 text-[#002b36] shadow-2xl shadow-[#859900]/30 backdrop-blur-xl border border-[#859900]/60 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
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
      >
        {renderActiveView()}
      </Window>


    </div>
  );
}
