import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="gy-grid">
      <section className="gy-hero gy-card">
        <p className="gy-kicker">WELCOME TO GITYATRA</p>
        <h1>Learn Git by doing real workflows.</h1>
        <p>
          Practice commands in a live terminal, see branch graphs update instantly,
          and grow with missions that mirror real team collaboration.
        </p>
        <div className="gy-hero-actions">
          <Link className="gy-btn" to="/challenge">Start Mission</Link>
          <Link className="gy-btn gy-btn-ghost" to="/dashboard">View Dashboard</Link>
        </div>
      </section>

      <section className="gy-grid gy-grid-3">
        <article className="gy-card"><h3>Terminal First</h3><p>Command parsing, history, and realistic feedback.</p></article>
        <article className="gy-card"><h3>Visual Branching</h3><p>Understand commits and branches with live graph updates.</p></article>
        <article className="gy-card"><h3>Progression</h3><p>Track XP, levels, streaks, and achievements over time.</p></article>
      </section>
    </main>
  );
}
