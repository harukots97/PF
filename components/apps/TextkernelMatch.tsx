import ProjectApp from './ProjectApp';
export default function TextkernelMatch() {
  return (
    <ProjectApp
      title="Textkernel Match"
      subtitle="AI-powered talent matching platform"
      accentColor="#f97316"
      gradient="from-slate-800 to-slate-950"
      tags={['UX Research', 'UI Design', 'B2B SaaS']}
      iconImage="/icons/textkernel.png"
      description="Textkernel Match is an AI-driven recruitment platform that connects candidates to roles with semantic search and skill-based matching. I redesigned the core search and results experience to reduce time-to-shortlist for recruiters while surfacing meaningful candidate insights."
      role="Led end-to-end product design: discovery interviews with 12 enterprise recruiters, information architecture, interactive prototyping, and design system contribution. Collaborated closely with ML engineers to translate model outputs into interpretable UI patterns."
      outcome="The redesigned matching workflow reduced average shortlisting time by 34% in usability testing. The new candidate card component became a design system standard adopted across three product lines."
    />
  );
}
