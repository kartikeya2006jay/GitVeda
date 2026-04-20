import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="gy-grid" style={{ gap: '4rem', padding: '2rem 0' }}>
      <section className="gy-home-hero" style={{ textAlign: 'center', position: 'relative', padding: '6rem 0' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
          zIndex: -1, borderRadius: '50%', filter: 'blur(60px)'
        }}></div>

        <p className="gy-kicker" style={{ letterSpacing: '0.6em', color: 'var(--gy-primary)', fontWeight: 800 }}>NEURAL PROTOCOL ACTIVE</p>
        <h1 style={{ fontSize: '5.5rem', fontWeight: 900, lineHeight: 1, marginBottom: '1.5rem', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master the <br /> <span style={{ color: 'var(--gy-primary)', textShadow: '0 0 40px rgba(99, 102, 241, 0.5)' }}>Git Multiverse</span>
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--gy-muted)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          The world's most advanced interactive Git training simulator. Deploy your skills, conquer missions, and become a legendary workflow architect.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link to="/challenges" className="gy-btn" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>GO TO CHALLENGE</Link>
          <Link to="/git-cheat-notes" className="gy-btn" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--gy-glass-border)', padding: '1.25rem 3rem', fontSize: '1.1rem' }}>REVISE CONCEPT</Link>
        </div>
      </section>

      <div className="gy-grid gy-grid-3" style={{ gap: '2rem' }}>
        <article className="gy-card" style={{ borderTop: '4px solid var(--gy-primary)' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Instant Mastery</h3>
          <p className="gy-muted">Simulate real-world scenarios in a risk-free neural environment. Learn by doing, not just reading.</p>
        </article>
        <article className="gy-card" style={{ borderTop: '4px solid var(--gy-accent)' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Gamified Path</h3>
          <p className="gy-muted">30 levels of increasing complexity. Earn XP, unlock badges, and track your daily streak.</p>
        </article>
        <article className="gy-card" style={{ borderTop: '4px solid var(--gy-secondary)' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛠️</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Advanced Intel</h3>
          <p className="gy-muted">Deep technical documentation for every command at your fingertips. No more guessing.</p>
        </article>
      </div>
    </main>
  );
}
