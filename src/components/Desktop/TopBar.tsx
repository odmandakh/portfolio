import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Sun, 
  CloudSun, 
  Info, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Command,
  ExternalLink
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { DesktopWindowId } from '../../types/portfolio';

interface TopBarProps {
  activeWindowName: string | null;
  onOpenAbout: () => void;
  onResetDesktop: () => void;
  onOpenWindow?: (id: DesktopWindowId) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeWindowName,
  onOpenAbout,
  onResetDesktop,
  onOpenWindow
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [showAppleMenu, setShowAppleMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-50 h-8 w-full bg-[#002b36]/80 backdrop-blur-md border-b border-[#2aa198]/20 text-[13px] font-medium flex items-center justify-between px-4 select-none text-[#93a1a1]">
      {/* Left Menu Items */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <button
            onClick={() => setShowAppleMenu(!showAppleMenu)}
            className="flex items-center gap-1.5 hover:text-[#eee8d5] transition-colors font-bold text-[#eee8d5] cursor-pointer whitespace-nowrap shrink-0"
            title="Odmandakh OS Menu"
          >
            <span>Odmandakh OS</span>
          </button>

          {/* Apple Menu Dropdown */}
          {showAppleMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowAppleMenu(false)} 
              />
              <div className="absolute left-0 mt-1 w-56 bg-[#073642]/95 backdrop-blur-xl border border-[#2aa198]/30 rounded-xl shadow-2xl shadow-[#001f27] z-50 py-1 text-[#93a1a1]">
                <div className="px-3 py-2 border-b border-[#2aa198]/20">
                  <p className="font-semibold text-[#eee8d5]">{profileData.name}</p>
                  <p className="text-[11px] text-[#2aa198] truncate font-mono">{profileData.title}</p>
                </div>

                <button
                  onClick={() => {
                    setShowAppleMenu(false);
                    onOpenAbout();
                  }}
                  className="w-full text-left px-3 py-1.5 flex items-center space-x-2 hover:bg-[#2aa198]/20 hover:text-[#eee8d5] transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#2aa198]" />
                  <span>About Odmandakh OS</span>
                </button>

                <button
                  onClick={() => {
                    setShowAppleMenu(false);
                    onResetDesktop();
                  }}
                  className="w-full text-left px-3 py-1.5 flex items-center space-x-2 hover:bg-[#2aa198]/20 hover:text-[#eee8d5] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#b58900]" />
                  <span>Close All Windows</span>
                </button>

                <div className="my-1 border-t border-[#2aa198]/20" />

                <a
                  href={profileData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#2aa198]/20 hover:text-[#eee8d5] transition-colors"
                  onClick={() => setShowAppleMenu(false)}
                >
                  <span className="flex items-center space-x-2">
                    <Command className="w-3.5 h-3.5 text-[#268bd2]" />
                    <span>View GitHub Profile</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#586e75]" />
                </a>
              </div>
            </>
          )}
        </div>

        {activeWindowName && activeWindowName !== 'Desktop' && (
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2aa198]/15 border border-[#2aa198]/30 text-[#2aa198] font-mono font-bold ml-1 whitespace-nowrap truncate max-w-[35vw] sm:max-w-none">
            {activeWindowName}
          </span>
        )}
      </div>

      {/* Right status indicators */}
      <div className="flex items-center gap-4 text-xs font-medium">
        {/* Availability Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#859900]/15 border border-[#859900]/30 text-[#859900] text-[11px] font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#859900] animate-pulse" />
          <span>Available for hire</span>
        </div>

        {/* Time & Date */}
        <div className="flex items-center gap-3 font-mono text-[11px] whitespace-nowrap shrink-0">
          <span className="hidden sm:inline text-[#586e75]">{date}</span>
          <span className="text-[#eee8d5] font-semibold">{time}</span>
        </div>
      </div>
    </header>
  );
};
