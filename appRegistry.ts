export interface AppDef {
  id: string;
  title: string;
  defaultSize: { width: number; height: number };
  iconGradient: string;
  iconImage?: string;
  tags?: string[];
  accentColor?: string;
}

export const APP_REGISTRY: Record<string, AppDef> = {
  about: {
    id: 'about',
    title: 'About Me',
    defaultSize: { width: 580, height: 420 },
    iconGradient: 'from-indigo-500 to-purple-600',
    accentColor: '#6366f1',
  },
  textkernel: {
    id: 'textkernel',
    title: 'Textkernel Match',
    defaultSize: { width: 760, height: 520 },
    iconGradient: 'from-slate-800 to-slate-950',
    iconImage: '/icons/Frame 3.png',
    tags: ['UX Research', 'UI Design', 'B2B SaaS'],
    accentColor: '#f97316',
  },
  pathe: {
    id: 'pathe',
    title: 'Pathè Alert',
    defaultSize: { width: 760, height: 520 },
    iconGradient: 'from-yellow-400 to-yellow-500',
    iconImage: '/icons/Pathè.png',
    tags: ['Mobile App', 'Notifications', 'Consumer'],
    accentColor: '#eab308',
  },
  formel: {
    id: 'formel',
    title: 'Formel Skin',
    defaultSize: { width: 760, height: 520 },
    iconGradient: 'from-blue-600 to-blue-800',
    iconImage: '/icons/Formelskin.png',
    tags: ['Branding', 'Web Design', 'E-commerce'],
    accentColor: '#2563eb',
  },
  lun: {
    id: 'lun',
    title: 'Lun Misto',
    defaultSize: { width: 760, height: 520 },
    iconGradient: 'from-orange-400 to-orange-600',
    iconImage: '/icons/Lun.png',
    tags: ['Mobile App', 'Maps', 'PropTech'],
    accentColor: '#f97316',
  },
  chess: {
    id: 'chess',
    title: 'Chess',
    defaultSize: { width: 540, height: 580 },
    iconGradient: 'from-stone-700 to-stone-900',
    accentColor: '#78716c',
  },
};

export const DOCK_APPS = ['about', 'textkernel', 'pathe', 'formel', 'lun', 'chess'];

export const DESKTOP_ICONS: Array<{ appId: string; position: { x: number; y: number } }> = [
  { appId: 'about',      position: { x: 80, y: 120 } },
  { appId: 'textkernel', position: { x: 200, y: 200 } },
  { appId: 'pathe',      position: { x: 120, y: 350 } },
  { appId: 'formel',     position: { x: 900, y: 150 } },
  { appId: 'lun',        position: { x: 850, y: 320 } },
  { appId: 'chess',      position: { x: 500, y: 80 } },
];
