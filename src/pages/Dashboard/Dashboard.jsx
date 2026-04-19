import { Link } from "react-router-dom";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import { gameLevels, hardLevels, mediumLevels, easyLevels } from "../../data/levels";
import { useGameContext } from "../../context";

export default function Dashboard() {
  const { progress, gitState } = useGameContext();
  const currentLevel = gameLevels[Math.min(progress.level - 1, gameLevels.length - 1)] || gameLevels[0];
  const completion = Math.min(100, Math.round((progress.level / gameLevels.length) * 100));

  return (
    <main className="gy-grid" style={{ gap: '2rem' }}>
      <header>
        <p className="gy-kicker" style={{ color: 'var(--gy-primary)', fontWeight: 700 }}>PLAYER COMMAND CENTER</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Welcome back, Operator.</h1>
      </header>

      <section className="gy-grid gy-grid-3">
        <StatsCard label="MISSION RANK" value={`Level ${progress.level}`} />
        <StatsCard label="TOTAL XP" value={`${progress.xp.toLocaleString()} XP`} />
        <StatsCard label="GIT LOGS" value={gitState.commits.length} />
      </section>

      <section className="gy-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(15, 23, 42, 0.9))',
        border: '1px solid rgba(99, 102, 241, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <div>
            <p className="gy-kicker" style={{ color: 'var(--gy-secondary)' }}>CAMPAIGN PROGRESS</p>
            <h2 style={{ fontSize: '1.8rem' }}>{completion}% Mastery</h2>
          </div>
          <p style={{ color: 'var(--gy-muted)', fontSize: '0.9rem' }}>{progress.level} / {gameLevels.length} Missions Completed</p>
        </div>

        <div className="gy-progress-track" style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
          <div className="gy-progress-fill" style={{
            width: `${completion}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--gy-primary), var(--gy-secondary))',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
          }} />
        </div>

        <div className="gy-pill-row" style={{ marginTop: '1.5rem' }}>
          <span className="gy-pill" style={{ opacity: progress.level > 10 ? 1 : 0.5 }}>Easy: 10/10</span>
          <span className="gy-pill" style={{ opacity: progress.level > 20 ? 1 : 0.5 }}>Medium: {Math.max(0, Math.min(10, progress.level - 10))}/10</span>
          <span className="gy-pill" style={{ opacity: progress.level > 30 ? 1 : 0.5 }}>Hard: {Math.max(0, progress.level - 20)}/10</span>
        </div>
      </section>

      <section className="gy-grid gy-grid-2">
        <article className="gy-card" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <span className="gy-pill" style={{ background: 'var(--gy-primary)', color: '#fff', border: 'none' }}>CURRENT TARGET</span>
          </div>
          <p className="gy-kicker">MISSION {currentLevel.level}</p>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{currentLevel.command}</h3>
          <p className="gy-muted" style={{ marginBottom: '1.5rem' }}>{currentLevel.mission}</p>

          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--gy-accent)' }}>INTELLIGENCE BRIEF:</p>
            <p style={{ fontSize: '0.9rem' }}>{currentLevel.question}</p>
          </div>

          <Link className="gy-btn" to={`/challenge/${currentLevel.id}`} style={{ width: '100%', textAlign: 'center' }}>Deploy to Terminal</Link>
        </article>

        <article className="gy-card">
          <h3>Neural Unlocks</h3>
          <p className="gy-muted" style={{ marginBottom: '1.5rem' }}>Advance your rank to unlock advanced training tracks.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ opacity: 0.5, padding: '0.75rem', border: '1px dashed var(--gy-glass-border)', borderRadius: '10px' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Locked: Final Revision Track</p>
              <p style={{ fontSize: '0.8rem' }}>Requires Level 30</p>
            </div>
            <div style={{ opacity: 0.5, padding: '0.75rem', border: '1px dashed var(--gy-glass-border)', borderRadius: '10px' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>Locked: Practice Arena</p>
              <p style={{ fontSize: '0.8rem' }}>Requires Level 10</p>
            </div>
          </div>

          <Link className="gy-btn gy-btn-ghost" to="/challenges" style={{ width: '100%', textAlign: 'center', marginTop: '1.5rem' }}>View Full Operational Map</Link>
        </article>
      </section>
    </main>
  );
}
