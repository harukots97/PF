'use client';

interface ProjectAppProps {
  title: string;
  subtitle: string;
  accentColor: string;
  tags: string[];
  description: string;
  role: string;
  outcome: string;
  iconImage?: string;
  gradient: string;
}

export default function ProjectApp({ title, subtitle, accentColor, tags, description, role, outcome, iconImage, gradient }: ProjectAppProps) {
  return (
    <div className="text-white p-8 min-h-full">
      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <div
          className={`w-16 h-16 rounded-2xl flex-shrink-0 bg-gradient-to-br ${gradient} shadow-xl overflow-hidden flex items-center justify-center`}
        >
          {iconImage ? (
            <img src={iconImage} alt={title} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-white/50 text-sm mt-1">{subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${accentColor}30`, color: accentColor, border: `1px solid ${accentColor}50` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Overview</h2>
          <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        </section>
        <div className="w-full h-px bg-white/10" />
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>My Role</h2>
          <p className="text-white/70 text-sm leading-relaxed">{role}</p>
        </section>
        <div className="w-full h-px bg-white/10" />
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accentColor }}>Outcome</h2>
          <p className="text-white/70 text-sm leading-relaxed">{outcome}</p>
        </section>
      </div>
    </div>
  );
}
