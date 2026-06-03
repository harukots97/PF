'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Desktop = dynamic(() => import('@/components/Desktop'), { ssr: false });
const IPhoneView = dynamic(() => import('@/components/iPhone/IPhoneView'), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  return isMobile ? <IPhoneView /> : <Desktop />;
}
