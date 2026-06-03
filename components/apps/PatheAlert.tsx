import ProjectApp from './ProjectApp';
export default function PatheAlert() {
  return (
    <ProjectApp
      title="Pathè Alert"
      subtitle="Cinema notifications & seat alerts"
      accentColor="#eab308"
      gradient="from-yellow-400 to-yellow-600"
      tags={['Mobile App', 'Notifications', 'Consumer']}
      iconImage="/icons/pathe.png"
      description="Pathè Alert is a companion app that lets cinema-goers set alerts for specific films, screenings, and seat availability at Pathè theaters. The challenge was designing a notification system that felt personal and timely without becoming intrusive noise."
      role="Full product design ownership: user journey mapping, notification taxonomy design, iOS & Android native UI, and motion design for the alert feedback system. Ran A/B testing on notification copy and timing with 500+ beta users."
      outcome="Push notification opt-in rate reached 78% — well above the industry average of 46%. Average session length increased by 2.1 minutes as users explored upcoming releases through the alert discovery flow."
    />
  );
}
