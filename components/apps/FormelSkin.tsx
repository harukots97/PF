import ProjectApp from './ProjectApp';
export default function FormelSkin() {
  return (
    <ProjectApp
      title="Formel Skin"
      subtitle="Personalised skincare e-commerce"
      accentColor="#3b82f6"
      gradient="from-blue-600 to-blue-800"
      tags={['Branding', 'Web Design', 'E-commerce']}
      iconImage="/icons/formel.png"
      description="Formel Skin is a German DTC skincare brand offering personalised routines built around a skin quiz. I designed the complete brand identity and digital storefront, creating a clinical-yet-warm aesthetic that builds trust while driving conversion."
      role="Brand identity, design system, and full e-commerce UX from concept to launch. Designed the onboarding quiz flow, product recommendation algorithm display, subscription management, and checkout optimisation. Built component library in Figma for the development team."
      outcome="Launched to 10k+ customers in the first quarter. The quiz completion rate reached 82%, and the personalised recommendation page converted at 3.4x the rate of the generic category pages."
    />
  );
}
