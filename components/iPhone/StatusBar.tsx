'use client';

import { useState, useEffect } from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

export default function StatusBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-white" style={{ height: 48 }}>
      <span className="text-[15px] font-semibold">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={16} />
      </div>
    </div>
  );
}
