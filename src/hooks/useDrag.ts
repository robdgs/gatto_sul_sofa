"use client";

import { useRef, useCallback } from "react";

interface DragState {
  isDragging: boolean;
  startX: number;
  currentX: number;
}

interface UseDragOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onDragMove?: (deltaX: number) => void;
  onDragEnd?: () => void;
  threshold?: number;
}

export function useDrag({
  onSwipeLeft,
  onSwipeRight,
  onDragMove,
  onDragEnd,
  threshold = 100,
}: UseDragOptions) {
  const state = useRef<DragState>({ isDragging: false, startX: 0, currentX: 0 });
  const locked = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (locked.current) return;
    state.current = { isDragging: true, startX: e.clientX, currentX: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!state.current.isDragging || locked.current) return;
      const deltaX = e.clientX - state.current.startX;
      state.current.currentX = deltaX;
      onDragMove?.(deltaX);
    },
    [onDragMove]
  );

  const onPointerUp = useCallback(() => {
    if (!state.current.isDragging || locked.current) return;
    state.current.isDragging = false;
    const { currentX } = state.current;

    if (currentX < -threshold) {
      locked.current = true;
      onSwipeLeft();
      setTimeout(() => { locked.current = false; }, 400);
    } else if (currentX > threshold) {
      locked.current = true;
      onSwipeRight();
      setTimeout(() => { locked.current = false; }, 400);
    } else {
      onDragEnd?.();
    }
    state.current.currentX = 0;
  }, [onSwipeLeft, onSwipeRight, onDragEnd, threshold]);

  return { onPointerDown, onPointerMove, onPointerUp };
}
