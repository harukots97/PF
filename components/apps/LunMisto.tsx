import ProjectApp from './ProjectApp';
export default function LunMisto() {
  return (
    <ProjectApp
      title="Lun Misto"
      subtitle="Ukrainian real estate & city guide"
      accentColor="#f97316"
      gradient="from-orange-400 to-orange-600"
      tags={['Mobile App', 'Maps', 'PropTech']}
      iconImage="/icons/lun.png"
      description="Lun Misto is Ukraine's leading real estate super-app, combining property search with neighbourhood exploration, public transport maps, and city infrastructure data. I worked on the core map experience and the property listing detail pages."
      role="Designed the unified map layer system that lets users toggle between property pins, transit stops, schools, and amenities without cognitive overload. Also led the property detail page redesign focused on mobile-first browsing and quick-contact flows."
      outcome="Map feature engagement increased by 41% post-launch. The redesigned listing page reduced bounce rate by 18% and increased agent contact requests by 27% on mobile."
    />
  );
}
