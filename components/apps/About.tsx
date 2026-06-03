'use client';

import { ExternalLink, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-10 text-white">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold mb-6 shadow-lg">
        D
      </div>
      <h1 className="text-5xl font-bold mb-2">Dima</h1>
      <p className="text-white/60 text-xl mb-6">Product Designer</p>
      <p className="text-white/70 text-center max-w-sm leading-relaxed mb-8">
        I craft thoughtful digital products that balance clarity with delight.
        Currently focused on B2B SaaS, consumer apps, and design systems that scale.
      </p>
      <div className="flex items-center gap-3 mb-8 flex-wrap justify-center">
        {[
          { href: 'https://github.com', label: 'GitHub' },
          { href: 'https://dribbble.com', label: 'Dribbble' },
          { href: 'https://linkedin.com', label: 'LinkedIn' },
        ].map(({ href, label }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-xl text-sm font-medium">
            <ExternalLink size={14} /> {label}
          </a>
        ))}
      </div>
      <a
        href="mailto:dima@onplia.com"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 transition px-6 py-3 rounded-xl font-semibold text-sm shadow-lg"
      >
        <Mail size={16} /> Get in touch
      </a>
    </div>
  );
}
