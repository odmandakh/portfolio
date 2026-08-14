import React from 'react';
import { motion, useDragControls } from 'motion/react';
import { X, Minus, Maximize2, Minimize2, GripHorizontal } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isFocused: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  subtitle?: string;
  defaultWidth?: string;
  defaultHeight?: string;
}

export const Window: React.FC<WindowProps> = ({
  title,
  icon,
  isOpen,
  isFocused,
  onClose,
  onFocus,
  children,
  subtitle,
  defaultWidth = 'max-w-4xl',
  defaultHeight = 'max-h-[85vh]'
}) => {
  const [isMaximized, setIsMaximized] = React.useState(false);
  const dragControls = useDragControls();

  if (!isOpen) return null;

  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if (!isMaximized) {
      dragControls.start(e);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center p-2 sm:p-6">
      <motion.div
        drag={!isMaximized}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0.05}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={onFocus}
        className={`pointer-events-auto flex flex-col bg-[#073642]/90 backdrop-blur-2xl border border-[#2aa198]/30 rounded-2xl shadow-2xl text-[#839496] overflow-hidden ${
          isMaximized 
            ? 'fixed inset-3 z-40 max-w-none max-h-none' 
            : `${defaultWidth} w-full ${defaultHeight}`
        } ${
          isFocused ? 'ring-1 ring-[#2aa198]/40 border-[#2aa198]/40 shadow-[#001f27]' : 'opacity-95'
        }`}
      >
        {/* macOS Window Header (Draggable Handle) */}
        <div 
          onPointerDown={handlePointerDownHeader}
          className={`h-10 px-4 bg-[#073642] border-b border-[#2aa198]/20 flex items-center justify-between select-none shrink-0 backdrop-blur-md ${
            isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          {/* Left Traffic Lights */}
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-[#dc322f] flex items-center justify-center group transition-transform active:scale-90 cursor-pointer shadow-sm"
              title="Close"
            >
              <X className="w-2 h-2 text-[#002b36] opacity-0 group-hover:opacity-100 transition-opacity font-bold" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-[#b58900] flex items-center justify-center group transition-transform active:scale-90 cursor-pointer shadow-sm"
              title="Minimize"
            >
              <Minus className="w-2 h-2 text-[#002b36] opacity-0 group-hover:opacity-100 transition-opacity font-bold" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-[#859900] flex items-center justify-center group transition-transform active:scale-90 cursor-pointer shadow-sm"
              title="Toggle Fullscreen"
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 text-[#002b36] opacity-0 group-hover:opacity-100 transition-opacity font-bold" />
              ) : (
                <Maximize2 className="w-2 h-2 text-[#002b36] opacity-0 group-hover:opacity-100 transition-opacity font-bold" />
              )}
            </button>
          </div>

          {/* Title & Icon */}
          <div className="flex items-center space-x-2 text-[13px] font-medium text-[#eee8d5] truncate pointer-events-none">
            {icon && <span className="text-[#2aa198]">{icon}</span>}
            <span className="truncate font-semibold">{title}</span>
            {subtitle && (
              <span className="text-[11px] text-[#2aa198] font-mono hidden sm:inline truncate">
                — {subtitle}
              </span>
            )}
          </div>

          {/* Right Action / Window Status & Drag Grip Hint */}
          <div className="flex items-center space-x-2 text-[11px] text-[#586e75] font-mono pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#859900]" />
            {!isMaximized && (
              <GripHorizontal className="w-4 h-4 text-[#586e75] ml-1 hidden sm:inline" />
            )}
          </div>
        </div>

        {/* Window Body Container */}
        <div className="flex-1 min-h-0 flex flex-col overflow-y-auto custom-scrollbar bg-[#002b36] backdrop-blur-xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
