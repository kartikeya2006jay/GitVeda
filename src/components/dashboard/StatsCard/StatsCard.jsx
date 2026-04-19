export default function StatsCard({ label, value }) {
  return (
    <article className="gy-card">
      <p>{label}</p>
      <h3>{value}</h3>
    </article>
  );
}
