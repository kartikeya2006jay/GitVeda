import { useNavigate } from "react-router-dom";
import { easyLevels, hardLevels, mediumLevels, gameLevels } from "../../data/levels";
import { useGameContext } from "../../context";

function LevelCard({ level, isLocked }) {
  const navigate = useNavigate();
  const difficultyColor =
    level.difficulty === "Easy" ? "var(--gy-success)" :
      level.difficulty === "Medium" ? "var(--gy-accent)" :
        "var(--gy-danger)";

  return (
    <article
      className="gy-card"
      onClick={() => !isLocked && navigate(`/challenge/${level.id}`)}
      style={{
        position: 'relative',
        cursor: isLocked ? 'not-allowed' : 'pointer',
        opacity: isLocked ? 0.4 : 1,
        border: isLocked ? '1px solid var(--gy-glass-border)' : `1px solid ${difficultyColor}`,
        background: isLocked ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.03)',
        padding: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.7rem', color: isLocked ? 'var(--gy-muted)' : difficultyColor, fontWeight: 800 }}>
          {level.difficulty.toUpperCase()} MISSION
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--gy-muted)' }}>Lvl {level.level}</span>
      </div>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--gy-font-mono)' }}>{level.title}</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--gy-muted)', lineHeight: 1.4 }}>{level.mission}</p>

      {isLocked && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(1px)' }}>
          <span style={{ fontSize: '1.5rem' }}>🔒</span>
        </div>
      )}

      {!isLocked && (
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--gy-primary)' }}>+ {level.xpReward} XP</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>READY →</span>
        </div>
      )}
    </article>
  );
}

export default function Challenges() {
  const { progress } = useGameContext();

  return (
    <main className="gy-grid" style={{ gap: '2rem' }}>
      <section className="gy-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(15, 23, 42, 0.9))',
        padding: '2.5rem'
      }}>
        <p className="gy-kicker" style={{ color: 'var(--gy-primary)' }}>OPERATIONAL MAP</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>The 30-Mission Git Campaign</h1>
        <p style={{ maxWidth: '700px', color: 'var(--gy-muted)' }}>
          Unlock the full spectrum of Git operations. Progress from basic survival to
          advanced architectural manipulation. Complete levels to earn XP and unlock the next stage.
        </p>

        <div className="gy-pill-row" style={{ marginTop: '1.5rem' }}>
          <span className="gy-pill" style={{ borderColor: 'var(--gy-success)', color: 'var(--gy-success)' }}>1-10: Bootcamp</span>
          <span className="gy-pill" style={{ borderColor: 'var(--gy-accent)', color: 'var(--gy-accent)' }}>11-20: Advanced Workflows</span>
          <span className="gy-pill" style={{ borderColor: 'var(--gy-danger)', color: 'var(--gy-danger)' }}>21-30: Shadow Protocols</span>
        </div>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--gy-success)' }}>Stage 01:</span> Core Foundations
          </h2>
          <div className="gy-grid gy-grid-3">
            {easyLevels.map(level => (
              <LevelCard key={level.id} level={level} isLocked={progress.level < level.level} />
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--gy-accent)' }}>Stage 02:</span> Battlefield Collaboration
          </h2>
          <div className="gy-grid gy-grid-3">
            {mediumLevels.map(level => (
              <LevelCard key={level.id} level={level} isLocked={progress.level < level.level} />
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--gy-danger)' }}>Stage 03:</span> Advanced Recovery
          </h2>
          <div className="gy-grid gy-grid-3">
            {hardLevels.map(level => (
              <LevelCard key={level.id} level={level} isLocked={progress.level < level.level} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
