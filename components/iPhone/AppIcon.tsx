'use client';

import { motion } from 'framer-motion';

interface AppIconProps {
  label: string;
  gradient: string;
  icon: React.ReactNode;
  iconImage?: string;
  onTap: () => void;
}

export default function AppIcon({ label, gradient, icon, iconImage, onTap }: AppIconProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 cursor-pointer"
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={onTap}
    >
      <div
        className={`rounded-[18px] bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg overflow-hidden`}
        style={{ width: 60, height: 60 }}
      >
        {iconImage
          ? <img src={iconImage} alt={label} className="w-full h-full object-cover" />
          : icon
        }
      </div>
      <span className="text-white text-[11px] text-center" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)', maxWidth: 72 }}>
        {label}
      </span>
    </motion.div>
  );
}
