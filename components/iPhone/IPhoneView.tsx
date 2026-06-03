'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Layers, Bell, Sparkles, Map, Crown, ChevronDown } from 'lucide-react';
import StatusBar from './StatusBar';
import AppIcon from './AppIcon';
import About from '../apps/About';
import TextkernelMatch from '../apps/TextkernelMatch';
import PatheAlert from '../apps/PatheAlert';
import FormelSkin from '../apps/FormelSkin';
import LunMisto from '../apps/LunMisto';
import Chess from '../apps/Chess';
import { APP_REGISTRY } from '@/appRegistry';

const APPS = [
  { id: 'textkernel', icon: <Layers size={28} color="white" /> },
  { id: 'pathe',      icon: <Bell size={28} color="white" /> },
  { id: 'lun',        icon: <Map size={28} color="white" /> },
  { id: 'formel',     icon: <Sparkles size={28} color="white" /> },
  { id: 'about',      icon: <User size={28} color="white" /> },
  { id: 'chess',      icon: <Crown size={28} color="white" /> },
];

const DOCK_APPS = ['textkernel', 'pathe', 'lun', 'formel'];

const APP_CONTENT: Record<string, React.ReactNode> = {
  about: <About />,
  textkernel: <TextkernelMatch />,
  pathe: <PatheAlert />,
  formel: <FormelSkin />,
  lun: <LunMisto />,
  chess: <Chess />,
};

export default function IPhoneView() {
  const [openApp, setOpenApp] = useState<string | null>(null);

  const mainApps = APPS.filter(a => !DOCK_APPS.includes(a.id));
  const dockApps = APPS.filter(a => DOCK_APPS.includes(a.id));

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundImage: 'url("/Desktop Template.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <StatusBar />

      {/* App grid */}
      <div className="px-6 pt-4 pb-8">
        <div className="grid grid-cols-4 gap-5">
          {APPS.map(app => {
            const def = APP_REGISTRY[app.id];
            return (
              <AppIcon
                key={app.id}
                label={def.title}
                gradient={def.iconGradient}
                icon={app.icon}
                iconImage={def.iconImage}
                onTap={() => setOpenApp(app.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Dock */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center" style={{ zIndex: 100 }}>
        <div
          className="flex items-center gap-4 px-5 py-3 rounded-[24px] border border-white/20"
          style={{ backdropFilter: 'blur(30px)', background: 'rgba(255,255,255,0.15)' }}
        >
          {dockApps.map(app => {
            const def = APP_REGISTRY[app.id];
            return (
              <AppIcon
                key={app.id}
                label=""
                gradient={def.iconGradient}
                icon={app.icon}
                iconImage={def.iconImage}
                onTap={() => setOpenApp(app.id)}
              />
            );
          })}
        </div>
      </div>

      {/* App sheet */}
      <AnimatePresence>
        {openApp && (
          <motion.div
            className="fixed inset-0 flex flex-col overflow-hidden"
            style={{ zIndex: 200, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Handle + close */}
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <button
                onClick={() => setOpenApp(null)}
                className="flex items-center gap-1 text-white/50 hover:text-white/80 transition text-sm py-1 px-3"
              >
                <ChevronDown size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              {APP_CONTENT[openApp]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
