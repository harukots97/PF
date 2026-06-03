'use client';

import { useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowState } from './WindowManager';

interface WindowProps {
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onUpdatePosition: (pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export default function Window({ windowState, onClose, onMinimize, onMaximize, onFocus, onUpdatePosition, children }: WindowProps) {
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const { isMaximized, position, size, zIndex, title } = windowState;

  const style = isMaximized
    ? { top: 28, left: 0, width: '100vw', height: 'calc(100vh - 28px)' }
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    onFocus();
    e.preventDefault();
  }, [isMaximized, position.x, position.y, onFocus]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      onUpdatePosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onUpdatePosition]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed rounded-xl overflow-hidden shadow-2xl flex flex-col"
        style={{ ...style, zIndex }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onMouseDown={onFocus}
      >
        {/* Title bar */}
        <div
          className="flex items-center h-10 px-3 rounded-t-xl border-b border-white/10 flex-shrink-0 cursor-grab active:cursor-grabbing"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.12)' }}
          onMouseDown={handleMouseDown}
          onDoubleClick={onMaximize}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2 z-10" onMouseDown={e => e.stopPropagation()}>
            <TrafficLight color="#FF5F57" hoverIcon="✕" onClick={onClose} />
            <TrafficLight color="#FEBC2E" hoverIcon="−" onClick={onMinimize} />
            <TrafficLight color="#28C840" hoverIcon="+" onClick={onMaximize} />
          </div>
          {/* Title */}
          <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-white/80 text-sm font-medium">{title}</span>
          </div>
        </div>
        {/* Content */}
        <div
          className="flex-1 overflow-auto"
          style={{ backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.45)' }}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function TrafficLight({ color, hoverIcon, onClick }: { color: string; hoverIcon: string; onClick: () => void }) {
  return (
    <button
      className="group relative flex items-center justify-center rounded-full text-transparent hover:text-black/70 transition-colors"
      style={{ width: 12, height: 12, background: color, fontSize: 9, lineHeight: 1, fontWeight: 700 }}
      onClick={onClick}
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity select-none" style={{ fontSize: 8 }}>
        {hoverIcon}
      </span>
    </button>
  );
}
