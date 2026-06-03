'use client';

import { useState } from 'react';
import { User, Layers, Bell, Sparkles, Map, Crown } from 'lucide-react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import { WindowManagerProvider, useWindowManager } from './WindowManager';
import About from './apps/About';
import TextkernelMatch from './apps/TextkernelMatch';
import PatheAlert from './apps/PatheAlert';
import FormelSkin from './apps/FormelSkin';
import LunMisto from './apps/LunMisto';
import Chess from './apps/Chess';
import { DESKTOP_ICONS, APP_REGISTRY } from '@/appRegistry';

const APP_ICONS: Record<string, React.ReactNode> = {
  about: <User size={28} color="white" />,
  textkernel: <Layers size={28} color="white" />,
  pathe: <Bell size={28} color="white" />,
  formel: <Sparkles size={28} color="white" />,
  lun: <Map size={28} color="white" />,
  chess: <Crown size={28} color="white" />,
};

const APP_CONTENT: Record<string, React.ReactNode> = {
  about: <About />,
  textkernel: <TextkernelMatch />,
  pathe: <PatheAlert />,
  formel: <FormelSkin />,
  lun: <LunMisto />,
  chess: <Chess />,
};

function DesktopInner() {
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updatePosition } = useWindowManager();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden select-none"
      style={{
        backgroundImage: 'url("/Desktop Template.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      <MenuBar />

      {/* Desktop icons */}
      <div className="absolute inset-0 pt-7">
        {DESKTOP_ICONS.map(({ appId, position }) => {
          const app = APP_REGISTRY[appId];
          return (
            <DesktopIcon
              key={appId}
              id={appId}
              label={app.title}
              icon={APP_ICONS[appId]}
              gradient={app.iconGradient}
              position={position}
              onOpen={() => openWindow(appId)}
              isSelected={selectedIcon === appId}
              onSelect={() => setSelectedIcon(appId)}
            />
          );
        })}
      </div>

      {/* Windows */}
      {windows.filter(w => w.isOpen && !w.isMinimized).map(w => (
        <Window
          key={w.id}
          windowState={w}
          onClose={() => closeWindow(w.id)}
          onMinimize={() => minimizeWindow(w.id)}
          onMaximize={() => maximizeWindow(w.id)}
          onFocus={() => focusWindow(w.id)}
          onUpdatePosition={(pos) => updatePosition(w.id, pos)}
        >
          {APP_CONTENT[w.appId]}
        </Window>
      ))}

      <Dock />
    </div>
  );
}

export default function Desktop() {
  return (
    <WindowManagerProvider>
      <DesktopInner />
    </WindowManagerProvider>
  );
}
