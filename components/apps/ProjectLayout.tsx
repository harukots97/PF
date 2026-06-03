'use client';

interface Section {
  heading: string;
  body: string;
}

interface ProjectLayoutProps {
  title: string;
  subtitle: string;
  accentColor: string;
  tags: string[];
  sections: Section[];
  gradient: string;
}

export default function ProjectLayout({ title, subtitle, accentColor, tags, sections, gradient }: ProjectLayoutProps) {
  return (
    <div className="p-8 text-white min-h-full">
      <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 mb-8`}>
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        <p className="text-white/70 text-base">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: accentColor + '33', color: accentColor, border: `1px solid ${accentColor}55` }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="space-y-8">
        {sections.map(s => (
          <div key={s.heading}>
            <h2 className="text-lg font-semibold mb-2 text-white/90">{s.heading}</h2>
            <p className="text-white/60 leading-relaxed text-sm">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
