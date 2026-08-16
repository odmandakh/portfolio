import React, { useState, useRef } from 'react';
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
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState<{ width: number | null; height: number | null }>({
    width: null,
    height: null
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  if (!isOpen) return null;

  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if (!isMaximized) {
      dragControls.start(e);
    }
  };

  const handleDoubleClickHeader = () => {
    setIsMaximized(!isMaximized);
  };

  const handleResizeStart = (e: React.PointerEvent, handle: 'e' | 's' | 'w' | 'se' | 'sw') => {
    e.stopPropagation();
    e.preventDefault();
    if (isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const container = containerRef.current;
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
        newWidth = Math.max(340, Math.min(window.innerWidth - 32, startWidth + deltaX));
      } else if (handle.includes('w')) {
        newWidth = Math.max(340, Math.min(window.innerWidth - 32, startWidth - deltaX));
      }

      if (handle.includes('s')) {
        newHeight = Math.max(260, Math.min(window.innerHeight - 32, startHeight + deltaY));
      }

      setSize({ width: newWidth, height: newHeight });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center p-2 sm:p-6">
      <motion.div
        ref={containerRef}
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
        style={{
          width: isMaximized ? '100%' : size.width ? `${size.width}px` : undefined,
          height: isMaximized ? '100%' : size.height ? `${size.height}px` : undefined,
        }}
        className={`pointer-events-auto relative flex flex-col min-w-0 bg-[#073642]/90 backdrop-blur-2xl border border-[#2aa198]/30 rounded-2xl shadow-2xl text-[#839496] overflow-hidden ${
          isMaximized
            ? 'fixed inset-3 z-40 max-w-none max-h-none'
            : `${size.width ? '' : defaultWidth} w-full ${size.height ? '' : defaultHeight}`
        } ${
          isFocused ? 'ring-1 ring-[#2aa198]/40 border-[#2aa198]/40 shadow-[#001f27]' : 'opacity-95'
        }`}
      >
        {/* macOS Window Header (Draggable Handle) */}
        <div 
          onPointerDown={handlePointerDownHeader}
          onDoubleClick={handleDoubleClickHeader}
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
            {title && <span className="truncate font-semibold">{title}</span>}
            {subtitle && (
              <span className="text-[11px] text-[#2aa198] font-mono hidden sm:inline truncate">
                — {subtitle}
              </span>
            )}
          </div>

          {/* Right Action / Drag Grip Hint */}
          <div className="flex items-center space-x-2 text-[11px] text-[#586e75] font-mono pointer-events-none">
            {!isMaximized && (
              <GripHorizontal className="w-4 h-4 text-[#586e75] ml-1 hidden sm:inline" />
            )}
          </div>
        </div>

        {/* Window Body Container */}
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto custom-scrollbar bg-[#002b36] backdrop-blur-xl relative">
          {children}
        </div>

        {/* Resizable Handles (Edge & Corner Dragging) */}
        {!isMaximized && (
          <>
            {/* Right Border Handle */}
            <div
              onPointerDown={(e) => handleResizeStart(e, 'e')}
              className="absolute top-0 right-0 w-2.5 h-full cursor-e-resize z-30 hover:bg-[#2aa198]/20 transition-colors"
              title="Drag to resize width"
            />
            {/* Bottom Border Handle */}
            <div
              onPointerDown={(e) => handleResizeStart(e, 's')}
              className="absolute bottom-0 left-0 h-2.5 w-full cursor-s-resize z-30 hover:bg-[#2aa198]/20 transition-colors"
              title="Drag to resize height"
            />
            {/* Left Border Handle */}
            <div
              onPointerDown={(e) => handleResizeStart(e, 'w')}
              className="absolute top-0 left-0 w-2.5 h-full cursor-w-resize z-30 hover:bg-[#2aa198]/20 transition-colors"
              title="Drag to resize width"
            />
            {/* Bottom-Right Corner Handle with visual resize grip */}
            <div
              onPointerDown={(e) => handleResizeStart(e, 'se')}
              className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-40 flex items-center justify-center group"
              title="Drag to resize window"
            >
              <div className="w-3 h-3 border-r-2 border-b-2 border-[#2aa198]/60 group-hover:border-[#2aa198] transition-colors rounded-br-sm" />
            </div>
            {/* Bottom-Left Corner Handle */}
            <div
              onPointerDown={(e) => handleResizeStart(e, 'sw')}
              className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize z-40 flex items-center justify-center group"
              title="Drag to resize window"
            >
              <div className="w-3 h-3 border-l-2 border-b-2 border-[#2aa198]/60 group-hover:border-[#2aa198] transition-colors rounded-bl-sm" />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
