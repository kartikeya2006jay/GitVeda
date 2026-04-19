export default function StatsCard({ label, value }) {
  return (
    <article className="gy-card gy-stat-card">
      <p className="gy-muted">{label}</p>
      <h3>{value}</h3>
    </article>
  );
}
