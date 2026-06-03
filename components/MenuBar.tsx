'use client';

import { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

export default function MenuBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 text-white text-sm font-medium select-none"
      style={{ height: 28, zIndex: 9999, backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.15)' }}
    >
      <div className="flex items-center gap-4">
        <svg width="14" height="14" viewBox="0 0 814 1000" fill="white">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-109.7c-52.2-76.5-107.4-196.5-107.4-305.8 0-197.1 127.9-301.3 254.3-301.3 90 0 154.8 60.4 206.7 60.4 50.5 0 123.7-64 224.2-64 36.2 0 130.4 3.2 196.1 87.1zm-234.9-181.5c33.1-39.5 56.2-95.2 56.2-150.9 0-7.7-.6-15.4-1.9-21.7-53.1 2-116.1 35.2-153.6 79.7-29.1 33.9-57.8 89.7-57.8 146.2 0 8.3 1.3 16.6 1.9 19.2 3.2.6 8.4 1.3 13.6 1.3 47.8 0 108.1-31.9 141.6-73.8z"/>
        </svg>
        {['Finder', 'File', 'Edit', 'View', 'Go', 'Window', 'Help'].map(label => (
          <span key={label} className="opacity-90 hover:opacity-100 cursor-default">{label}</span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Wifi size={14} />
        <Battery size={16} />
        <span>{time}</span>
      </div>
    </div>
  );
}
