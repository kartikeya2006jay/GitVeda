export default function Card({ title, children }) {
  return (
    <section className="gy-card">
      {title ? <h3>{title}</h3> : null}
      {children}
    </section>
  );
}
