'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { User, Layers, Bell, Sparkles, Map, Crown, Folder, Trash2 } from 'lucide-react';
import { useWindowManager } from './WindowManager';

const ICON_SIZE = 52;

interface DockApp {
  id: string;
  label: string;
  icon: React.ReactNode;
  gradient: string;
  appId?: string;
}

const dockApps: DockApp[] = [
  { id: 'about', label: 'About', icon: <User size={26} color="white" />, gradient: 'from-blue-500 to-purple-600', appId: 'about' },
  { id: 'textkernel', label: 'TK Match', icon: <Layers size={26} color="white" />, gradient: 'from-slate-800 to-orange-500', appId: 'textkernel' },
  { id: 'pathe', label: 'Pathè', icon: <Bell size={26} color="white" />, gradient: 'from-yellow-400 to-yellow-600', appId: 'pathe' },
  { id: 'formel', label: 'Formel', icon: <Sparkles size={26} color="white" />, gradient: 'from-blue-600 to-blue-800', appId: 'formel' },
  { id: 'lun', label: 'Lun Misto', icon: <Map size={26} color="white" />, gradient: 'from-orange-500 to-red-600', appId: 'lun' },
  { id: 'chess', label: 'Chess', icon: <Crown size={26} color="white" />, gradient: 'from-gray-700 to-gray-900', appId: 'chess' },
];

const separator = { id: 'sep', label: '', icon: null, gradient: '' };

const systemApps: DockApp[] = [
  { id: 'finder', label: 'Finder', icon: <Folder size={26} color="white" />, gradient: 'from-blue-400 to-blue-600' },
  { id: 'trash', label: 'Trash', icon: <Trash2 size={26} color="white" />, gradient: 'from-gray-400 to-gray-600' },
];

function DockIcon({ app, mouseX }: { app: DockApp; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { windows, openWindow } = useWindowManager();
  const isOpen = windows.some(w => w.appId === app.appId && !w.isMinimized);

  const distance = useMotionValue(Infinity);

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.5, 1]);
  const y = useTransform(distance, [-150, 0, 150], [0, -12, 0]);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center cursor-pointer"
      style={{ scale, y }}
      onHoverStart={() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          distance.set(mouseX.get() - center);
        }
      }}
      onMouseMove={() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const center = rect.left + rect.width / 2;
          distance.set(mouseX.get() - center);
        }
      }}
      onHoverEnd={() => distance.set(Infinity)}
      onClick={() => app.appId && openWindow(app.appId)}
      whileTap={{ scale: 0.9 }}
    >
      <div
        className={`bg-gradient-to-br ${app.gradient} rounded-xl flex items-center justify-center shadow-lg`}
        style={{ width: ICON_SIZE, height: ICON_SIZE }}
      >
        {app.icon}
      </div>
      {isOpen && (
        <div className="absolute -bottom-1.5 w-1 h-1 bg-white rounded-full opacity-80" />
      )}
    </motion.div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center" style={{ zIndex: 9998 }}>
      <motion.div
        className="flex items-end gap-2 px-3 py-2 rounded-2xl border border-white/30"
        style={{ backdropFilter: 'blur(30px)', background: 'rgba(255,255,255,0.15)' }}
        onMouseMove={e => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockApps.map(app => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} />
        ))}
        <div className="w-px mx-1 self-stretch bg-white/30" />
        {systemApps.map(app => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}
