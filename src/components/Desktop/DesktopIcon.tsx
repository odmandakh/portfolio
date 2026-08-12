import React from 'react';
import { 
  FolderGit2, 
  Award, 
  UserCheck, 
  Network, 
  FileText, 
  MessageSquare, 
  Folder
} from 'lucide-react';
import { DesktopItem } from '../../types/portfolio';

interface DesktopIconProps {
  item: DesktopItem;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  item,
  isSelected,
  onSelect,
  onOpen
}) => {
  const getIconConfig = () => {
    switch (item.id) {
      case 'projects':
        return {
          icon: <FolderGit2 className="w-8 h-8 text-[#268bd2] group-hover:scale-110 transition-transform" />,
          bg: 'bg-gradient-to-br from-[#268bd2]/20 to-[#2aa198]/20 border-[#268bd2]/40',
          badgeBg: 'bg-[#268bd2]/20 text-[#268bd2] border-[#268bd2]/40'
        };
      case 'certificates':
        return {
          icon: <Award className="w-8 h-8 text-[#b58900] group-hover:scale-110 transition-transform" />,
          bg: 'bg-gradient-to-br from-[#b58900]/20 to-[#cb4b16]/20 border-[#b58900]/40',
          badgeBg: 'bg-[#b58900]/20 text-[#b58900] border-[#b58900]/40'
        };
      case 'about':
        return {
          icon: <UserCheck className="w-8 h-8 text-[#2aa198] group-hover:scale-110 transition-transform" />,
          bg: 'bg-gradient-to-br from-[#2aa198]/20 to-[#268bd2]/20 border-[#2aa198]/40',
          badgeBg: 'bg-[#2aa198]/20 text-[#2aa198] border-[#2aa198]/40'
        };
      case 'skills':
        return {
          icon: <Network className="w-8 h-8 text-[#6c71c4] group-hover:scale-110 transition-transform" />,
          bg: 'bg-gradient-to-br from-[#6c71c4]/20 to-[#d33682]/20 border-[#6c71c4]/40',
          badgeBg: 'bg-[#6c71c4]/20 text-[#6c71c4] border-[#6c71c4]/40'
        };
      case 'cv':
        return {
          icon: <FileText className="w-8 h-8 text-[#cb4b16] group-hover:scale-110 transition-transform" />,
          bg: 'bg-gradient-to-br from-[#cb4b16]/20 to-[#dc322f]/20 border-[#cb4b16]/40',
          badgeBg: 'bg-[#cb4b16]/20 text-[#cb4b16] border-[#cb4b16]/40'
        };
      case 'contact':
        return {
          icon: <MessageSquare className="w-8 h-8 text-[#859900] group-hover:scale-110 transition-transform" />,
          bg: 'bg-gradient-to-br from-[#859900]/20 to-[#2aa198]/20 border-[#859900]/40',
          badgeBg: 'bg-[#859900]/20 text-[#859900] border-[#859900]/40'
        };
      default:
        return {
          icon: <Folder className="w-8 h-8 text-[#2aa198] group-hover:scale-110 transition-transform" />,
          bg: 'bg-gradient-to-br from-[#073642] to-[#002b36] border-[#2aa198]/30',
          badgeBg: 'bg-[#2aa198]/20 text-[#2aa198] border-[#2aa198]/30'
        };
    }
  };

  const config = getIconConfig();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer select-none transition-all duration-200 text-center w-28 sm:w-32 ${
        isSelected 
          ? 'bg-[#073642]/90 border border-[#2aa198]/60 shadow-xl backdrop-blur-md scale-105' 
          : 'hover:bg-[#073642]/50 hover:border hover:border-[#073642]'
      }`}
    >
      {/* Icon Frame - Solarized Custom Accent Plate */}
      <div className={`relative w-16 h-16 rounded-2xl ${config.bg} border flex items-center justify-center backdrop-blur-md mb-2 shadow-lg transition-transform duration-200 group-hover:scale-105 group-active:scale-95`}>
        {config.icon}
        {item.badge && (
          <span className={`absolute -top-1.5 -right-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border shadow-sm ${config.badgeBg}`}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md max-w-full truncate tracking-wide ${
        isSelected 
          ? 'bg-[#eee8d5] text-[#002b36] font-bold shadow-sm' 
          : 'text-[#93a1a1] group-hover:text-[#eee8d5]'
      }`}>
        {item.title}
      </span>
    </div>
  );
};

