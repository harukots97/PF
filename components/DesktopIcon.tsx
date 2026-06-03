'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  position: { x: number; y: number };
  onOpen: () => void;
  isSelected: boolean;
  onSelect: () => void;
}

export default function DesktopIcon({ label, icon, gradient, position, onOpen, isSelected, onSelect }: DesktopIconProps) {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 2) {
      onOpen();
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 500);
  };

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1 cursor-pointer select-none"
      style={{ left: position.x, top: position.y, width: 80 }}
      onClick={handleClick}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <div
        className={`bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-xl transition-all duration-150 ${isSelected ? 'ring-2 ring-white/60 ring-offset-1 ring-offset-transparent' : ''}`}
        style={{ width: 56, height: 56 }}
      >
        {icon}
      </div>
      <span
        className="text-white text-center leading-tight px-1 py-0.5 rounded"
        style={{
          fontSize: 11,
          textShadow: '0 1px 4px rgba(0,0,0,0.9)',
          background: isSelected ? 'rgba(100,120,255,0.5)' : 'transparent',
          maxWidth: 80,
          wordBreak: 'break-word',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
