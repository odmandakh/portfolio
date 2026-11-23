import { useCallback, useEffect, useRef, useState } from 'react';

export interface PanZoomView {
  x: number;
  y: number;
  scale: number;
}

interface Options {
  width: number;
  height: number;
  minScale?: number;
  maxScale?: number;
}

const OVERSCROLL = 120;
const DRAG_THRESHOLD = 4;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// Drag / scroll to pan, pinch or cmd/ctrl + scroll to zoom, for a fixed-size canvas inside a viewport
export function usePanZoom({ width, height, minScale = 0.3, maxScale = 1.8 }: Options) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<PanZoomView>({ x: 0, y: 0, scale: 1 });
  // Smoothly animate button-driven moves (zoom buttons, centring); direct gestures follow the pointer
  const [animated, setAnimated] = useState(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: 0, pinchDistance: 0 });
  const dragged = useRef(false);

  // Keep at least part of the canvas on screen
  const clampView = useCallback(
    (next: PanZoomView): PanZoomView => {
      const viewport = viewportRef.current;
      if (!viewport) return next;
      const scale = clamp(next.scale, minScale, maxScale);
      const xRange = [viewport.clientWidth - width * scale - OVERSCROLL, OVERSCROLL];
      const yRange = [viewport.clientHeight - height * scale - OVERSCROLL, OVERSCROLL];
      return {
        scale,
        x: clamp(next.x, Math.min(...xRange), Math.max(...xRange)),
        y: clamp(next.y, Math.min(...yRange), Math.max(...yRange))
      };
    },
    [width, height, minScale, maxScale]
  );

  // Fit the canvas width (never above 100%) and start at the top
  const fit = useCallback((smooth = false) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scale = clamp((viewport.clientWidth - 32) / width, minScale, 1);
    setAnimated(smooth);
    setView({ scale, x: Math.max(16, (viewport.clientWidth - width * scale) / 2), y: 16 });
  }, [width, minScale]);

  const zoomAt = useCallback(
    (factor: number, originX: number, originY: number, smooth = false) => {
      setAnimated(smooth);
      setView((current) => {
        const scale = clamp(current.scale * factor, minScale, maxScale);
        const ratio = scale / current.scale;
        return clampView({ scale, x: originX - (originX - current.x) * ratio, y: originY - (originY - current.y) * ratio });
      });
    },
    [clampView, minScale, maxScale]
  );

  const zoomBy = useCallback(
    (factor: number) => {
      const viewport = viewportRef.current;
      if (viewport) zoomAt(factor, viewport.clientWidth / 2, viewport.clientHeight / 2, true);
    },
    [zoomAt]
  );

  // Move so a canvas point sits in the middle of the viewport, zooming in to at least `minFocusScale`
  const centerOn = useCallback(
    (x: number, y: number, minFocusScale = 0.9) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      setAnimated(true);
      setView((current) => {
        const scale = Math.max(current.scale, minFocusScale);
        return clampView({ scale, x: viewport.clientWidth / 2 - x * scale, y: viewport.clientHeight / 2 - y * scale });
      });
    },
    [clampView]
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const rect = viewport.getBoundingClientRect();
        zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - rect.left, e.clientY - rect.top);
      } else {
        setAnimated(false);
        setView((current) => clampView({ ...current, x: current.x - e.deltaX, y: current.y - e.deltaY }));
      }
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [zoomAt, clampView]);

  const pinchDistance = () => {
    const [a, b] = Array.from(pointers.current.values());
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    gesture.current.moved = 0;
    dragged.current = false;
    if (pointers.current.size === 2) gesture.current.pinchDistance = pinchDistance();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const previous = pointers.current.get(e.pointerId);
    if (!previous) return;
    const point = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, point);

    if (pointers.current.size === 2) {
      const distance = pinchDistance();
      const rect = viewportRef.current!.getBoundingClientRect();
      const [a, b] = Array.from(pointers.current.values());
      if (gesture.current.pinchDistance > 0) {
        zoomAt(distance / gesture.current.pinchDistance, (a.x + b.x) / 2 - rect.left, (a.y + b.y) / 2 - rect.top);
      }
      gesture.current.pinchDistance = distance;
      dragged.current = true;
      return;
    }

    const dx = point.x - previous.x;
    const dy = point.y - previous.y;
    gesture.current.moved += Math.abs(dx) + Math.abs(dy);
    if (gesture.current.moved > DRAG_THRESHOLD) {
      // Only capture once it's clearly a drag, so plain clicks still reach the nodes
      if (!dragged.current) viewportRef.current?.setPointerCapture(e.pointerId);
      dragged.current = true;
      setAnimated(false);
      setView((current) => clampView({ ...current, x: current.x + dx, y: current.y + dy }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current.pinchDistance = 0;
  };

  return {
    viewportRef,
    view,
    animated,
    fit,
    zoomBy,
    centerOn,
    // True if the last pointer gesture was a drag or pinch, so it shouldn't count as a click
    wasDrag: () => dragged.current,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp }
  };
}
