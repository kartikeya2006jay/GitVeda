import { Link } from "react-router-dom";
import { easyLevels, mediumLevels, hardLevels } from "../../data/levels";

export default function Home() {
  return (
    <main className="gy-grid">
      <section className="gy-hero gy-card gy-hero-game" style={{
        padding: '3.5rem 2.5rem',
        background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15), transparent 40%), var(--gy-glass)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Animated Background Elements */}
        <div className="gy-orb gy-orb-1" style={{ top: '-10%', right: '-5%', opacity: 0.4 }}></div>
        <div className="gy-orb gy-orb-2" style={{ bottom: '10%', left: '-5%', opacity: 0.3 }}></div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <p className="gy-kicker" style={{ color: 'var(--gy-accent)', fontWeight: 800 }}>Missions Initialized // GitVeda Quest</p>
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 800, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Level Up Your <br /> Git Intelligence.
          </h1>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'var(--gy-muted)', marginBottom: '2rem' }}>
            Interactive command-line mastery through 30 high-stakes missions.
            From beginner init to advanced rebase rescues.
          </p>
          <div className="gy-hero-actions" style={{ gap: '1rem' }}>
            <Link className="gy-btn" to="/challenges" style={{ padding: '1rem 2rem' }}>Launch Level Map</Link>
            <Link className="gy-btn gy-btn-ghost" to="/dashboard" style={{ padding: '1rem 2rem' }}>Mission Control</Link>
          </div>

          <div className="gy-pill-row" style={{ marginTop: '2.5rem' }}>
            <span className="gy-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--gy-success)', color: 'var(--gy-success)' }}>10 Easy</span>
            <span className="gy-pill" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'var(--gy-accent)', color: 'var(--gy-accent)' }}>10 Medium</span>
            <span className="gy-pill" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--gy-danger)', color: 'var(--gy-danger)' }}>10 Hard</span>
            <span className="gy-pill" style={{ opacity: 0.8 }}>+ Practice Arena</span>
          </div>
        </div>
      </section>

      <section className="gy-grid gy-grid-3">
        <article className="gy-card" style={{ borderLeft: '4px solid var(--gy-success)' }}>
          <h3 style={{ color: 'var(--gy-success)' }}>Bootcamp Stage</h3>
          <p>Master {easyLevels.length} foundational commands like init, add, and commit.</p>
          <div className="gy-kicker" style={{ marginTop: '1rem' }}>REWARD: +800 XP</div>
        </article>
        <article className="gy-card" style={{ borderLeft: '4px solid var(--gy-accent)' }}>
          <h3 style={{ color: 'var(--gy-accent)' }}>Workflow Arena</h3>
          <p>Collaborate with {mediumLevels.length} scenarios involving remotes, branches, and stashes.</p>
          <div className="gy-kicker" style={{ marginTop: '1rem' }}>REWARD: +1200 XP</div>
        </article>
        <article className="gy-card" style={{ borderLeft: '4px solid var(--gy-danger)' }}>
          <h3 style={{ color: 'var(--gy-danger)' }}>Rescue Protocol</h3>
          <p>Survive {hardLevels.length} advanced missions: bisect, reflog, and interactive rebase.</p>
          <div className="gy-kicker" style={{ marginTop: '1rem' }}>REWARD: +1700 XP</div>
        </article>
      </section>

      <div style={{ textAlign: 'center', margin: '3rem 0 1rem' }}>
        <p className="gy-kicker">FEATURED COMMANDS</p>
      </div>

      <section className="gy-grid gy-grid-3" style={{ marginBottom: '2rem' }}>
        {easyLevels.slice(0, 3).map((level) => (
          <article className="gy-card" key={level.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gy-primary)', fontWeight: 700 }}>LEVEL {level.level}</span>
            <code style={{ fontSize: '1.2rem', color: '#fff', fontFamily: 'var(--gy-font-mono)' }}>{level.command}</code>
            <p className="gy-muted" style={{ fontSize: '0.85rem' }}>{level.mission}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
