import React, { useState, useRef, useEffect } from 'react';
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
  // Preferred size in px; it shrinks to fit smaller screens
  defaultWidth?: number;
  defaultHeight?: number;
}

type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

const MIN_WIDTH = 340;
const MIN_HEIGHT = 260;

// Invisible hit areas along each edge and corner, like a native window: only the cursor changes
const RESIZE_HANDLES: { handle: ResizeHandle; className: string }[] = [
  { handle: 'n', className: 'top-0 left-3 right-3 h-1.5 cursor-ns-resize' },
  { handle: 's', className: 'bottom-0 left-3 right-3 h-1.5 cursor-ns-resize' },
  { handle: 'e', className: 'right-0 top-3 bottom-3 w-1.5 cursor-ew-resize' },
  { handle: 'w', className: 'left-0 top-3 bottom-3 w-1.5 cursor-ew-resize' },
  { handle: 'ne', className: 'top-0 right-0 w-3 h-3 cursor-nesw-resize' },
  { handle: 'sw', className: 'bottom-0 left-0 w-3 h-3 cursor-nesw-resize' },
  { handle: 'nw', className: 'top-0 left-0 w-3 h-3 cursor-nwse-resize' },
  { handle: 'se', className: 'bottom-0 right-0 w-3 h-3 cursor-nwse-resize' }
];

export const Window: React.FC<WindowProps> = ({
  title,
  icon,
  isOpen,
  isFocused,
  onClose,
  onFocus,
  children,
  subtitle,
  id,
  defaultWidth = 960,
  defaultHeight = 640
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [size, setSize] = useState<{ width: number | null; height: number | null }>({
    width: null,
    height: null
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Each window opens at its own default size, not wherever the previous one was resized to
  useEffect(() => {
    setSize({ width: null, height: null });
    setIsMaximized(false);
  }, [id]);

  if (!isOpen) return null;

  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if (!isMaximized) {
      dragControls.start(e);
    }
  };

  const handleDoubleClickHeader = () => {
    setIsMaximized(!isMaximized);
  };

  const handleResizeStart = (e: React.PointerEvent, handle: ResizeHandle) => {
    e.stopPropagation();
    e.preventDefault();
    if (isMaximized) return;

    const container = containerRef.current;
    const area = container?.parentElement;
    if (!container || !area) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const rect = container.getBoundingClientRect();
    const areaStyle = getComputedStyle(area);
    const maxWidth = area.clientWidth - parseFloat(areaStyle.paddingLeft) - parseFloat(areaStyle.paddingRight);
    const maxHeight = area.clientHeight - parseFloat(areaStyle.paddingTop) - parseFloat(areaStyle.paddingBottom);

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveEvent.preventDefault();
      // The window stays centred, so it grows on both sides: double the delta to keep the dragged edge under the cursor
      const deltaX = (moveEvent.clientX - startX) * 2;
      const deltaY = (moveEvent.clientY - startY) * 2;

      let width = rect.width;
      let height = rect.height;
      if (handle.includes('e')) width += deltaX;
      if (handle.includes('w')) width -= deltaX;
      if (handle.includes('s')) height += deltaY;
      if (handle.includes('n')) height -= deltaY;

      setSize({
        width: Math.max(MIN_WIDTH, Math.min(maxWidth, width)),
        height: Math.max(MIN_HEIGHT, Math.min(maxHeight, height))
      });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center px-2 pt-10 pb-20 sm:px-6 sm:pt-12 sm:pb-24">
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
          width: isMaximized ? '100%' : `min(${size.width ?? defaultWidth}px, 100%)`,
          height: isMaximized ? '100%' : `min(${size.height ?? defaultHeight}px, 100%)`
        }}
        className={`pointer-events-auto relative flex flex-col min-w-0 bg-[#073642] sm:bg-[#073642]/90 sm:backdrop-blur-2xl border border-[#2aa198]/30 rounded-2xl shadow-2xl text-[#839496] overflow-hidden ${
          isMaximized
            ? 'fixed inset-3 z-40 max-w-none max-h-none'
            : ''
        } ${
          isFocused ? 'ring-1 ring-[#2aa198]/40 border-[#2aa198]/40 shadow-[#001f27]' : 'opacity-95'
        }`}
      >
        {/* macOS Window Header (Draggable Handle) */}
        <div 
          onPointerDown={handlePointerDownHeader}
          onDoubleClick={handleDoubleClickHeader}
          className={`h-10 px-4 bg-[#073642] border-b border-[#2aa198]/20 flex items-center justify-between select-none shrink-0 ${
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
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto custom-scrollbar bg-[#002b36] relative">
          {children}
        </div>

        {/* Resize edges and corners (not on phones, where windows fill the screen) */}
        {!isMaximized &&
          RESIZE_HANDLES.map(({ handle, className }) => (
            <div
              key={handle}
              onPointerDown={(e) => handleResizeStart(e, handle)}
              className={`absolute z-40 hidden sm:block ${className}`}
              aria-hidden="true"
            />
          ))}
      </motion.div>
    </div>
  );
};
