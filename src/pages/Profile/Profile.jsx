import { useAuth } from "../../hooks";
import { useGameContext } from "../../context";

export default function Profile() {
  const { user } = useAuth();
  const { progress } = useGameContext();
  const completedLevels = Math.max(0, progress.level - 1);
  const totalLevels = 30;
  const completionPercent = Math.min(100, Math.round((completedLevels / totalLevels) * 100));

  const rank = progress.level <= 10 ? "Novice Commit-er" : progress.level <= 20 ? "Workflow Architect" : "Git Legend";
  const badges = [
    { name: "First Commit", icon: "🌱", unlockLevel: 1, color: "var(--gy-success)", description: "Awarded when you complete Level 1." },
    { name: "Branch Explorer", icon: "🌿", unlockLevel: 10, color: "var(--gy-primary)", description: "Awarded when you clear Easy tier at Level 10." },
    { name: "Conflict Resolver", icon: "⚔️", unlockLevel: 15, color: "var(--gy-danger)", description: "Awarded when you pass Level 15 merge missions." },
    { name: "Reflog Time-Traveler", icon: "⏳", unlockLevel: 25, color: "var(--gy-accent)", description: "Awarded when you survive Level 25 hard recovery drills." },
    { name: "Git Master", icon: "👑", unlockLevel: 30, color: "#fff", description: "Awarded when you complete all 30 levels." },
  ];
  const nextBadge = badges.find((badge) => progress.level < badge.unlockLevel);

  return (
    <main className="gy-grid" style={{ gap: '3rem' }}>
      <header style={{ textAlign: 'center' }}>
        <p className="gy-kicker" style={{ color: 'var(--gy-primary)', fontWeight: 800, letterSpacing: '0.4em' }}>OPERATOR DOSSIER</p>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {user?.displayName || "Kartikeya Yadav"}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <span className="gy-pill" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--gy-primary)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>{rank}</span>
          <span className="gy-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--gy-success)', border: '1px solid rgba(16, 185, 129, 0.35)' }}>LEVELS COMPLETED: {completedLevels}/{totalLevels}</span>
        </div>
      </header>

      <div className="gy-grid gy-grid-2" style={{ alignItems: 'start', gap: '2rem' }}>
        <section className="gy-card" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(0,0,0,0.6))',
          padding: '2.5rem'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '35px',
            background: 'linear-gradient(135deg, var(--gy-primary), var(--gy-secondary))',
            display: 'grid',
            placeItems: 'center',
            fontSize: '3.5rem',
            margin: '0 auto',
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}>
            {user?.photoURL ? <img src={user.photoURL} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} /> : "👨‍🚀"}
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.email || "kartikeya2006jay@gmail.com"}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '15px' }}>
              <span className="gy-muted">ACCUMULATED XP</span>
              <span style={{ fontWeight: 900, color: 'var(--gy-accent)', fontSize: '1.1rem' }}>{progress.xp.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '15px' }}>
              <span className="gy-muted">MISSIONS COMPLETED</span>
              <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>{completedLevels} / {totalLevels}</span>
            </div>
            <div style={{ display: 'grid', gap: '0.55rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '15px' }}>
              <span className="gy-muted">CAMPAIGN PROGRESS</span>
              <div style={{ height: '10px', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--gy-glass-border)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${completionPercent}%`, background: 'linear-gradient(90deg, #22d3ee, #3b82f6, #10b981)' }} />
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1' }}>{completionPercent}% campaign completion</p>
            </div>
          </div>
        </section>

        <section className="gy-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'var(--gy-primary)' }}>Achievement</span> Hall
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1.25rem' }}>
            {badges.map((badge, i) => (
              (() => {
                const earned = progress.level >= badge.unlockLevel;
                return (
              <div key={i} style={{
                padding: '1.5rem 1rem',
                borderRadius: '24px',
                background: earned ? 'rgba(99, 102, 241, 0.1)' : 'rgba(0,0,0,0.3)',
                border: earned ? `1px solid ${badge.color}` : '1px solid var(--gy-glass-border)',
                textAlign: 'center',
                opacity: earned ? 1 : 0.28,
                transition: 'all 0.3s ease',
                boxShadow: earned ? `0 0 20px ${badge.color}22` : 'none'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', filter: earned ? 'none' : 'grayscale(1)' }}>{badge.icon}</div>
                <p style={{ fontSize: '0.8rem', fontWeight: 800, color: earned ? '#fff' : 'var(--gy-muted)', marginBottom: '0.45rem' }}>{badge.name}</p>
                <p style={{ margin: 0, fontSize: '0.67rem', color: earned ? '#cbd5e1' : '#94a3b8', lineHeight: 1.5 }}>
                  {earned ? `Unlocked at Level ${badge.unlockLevel}` : `Unlocks when you pass Level ${badge.unlockLevel}`}
                </p>
              </div>
              );
              })()
            ))}
          </div>
          <div style={{ marginTop: '1.25rem', padding: '0.95rem 1rem', borderRadius: '12px', border: '1px solid var(--gy-glass-border)', background: 'rgba(15, 23, 42, 0.45)' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1' }}>
              {nextBadge
                ? `Next achievement: ${nextBadge.name}. Pass Level ${nextBadge.unlockLevel} to unlock it.`
                : "All achievements unlocked. You completed the full legend path."}
            </p>
          </div>
        </section>
      </div>

      <section className="gy-card" style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(15, 23, 42, 0.9))',
        padding: '3rem'
      }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>Operational Telemetry</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          <div className="telemetry-item">
            <p className="gy-kicker" style={{ color: 'var(--gy-secondary)' }}>COMMITS</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900 }}>{Math.floor(progress.xp / 100)}</p>
          </div>
          <div className="telemetry-item">
            <p className="gy-kicker" style={{ color: 'var(--gy-primary)' }}>PULL REQUESTS</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900 }}>{Math.floor(progress.level / 2)}</p>
          </div>
          <div className="telemetry-item">
            <p className="gy-kicker" style={{ color: 'var(--gy-accent)' }}>MERGE CONFLICTS</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900 }}>{Math.floor(progress.level / 3)}</p>
          </div>
          <div className="telemetry-item">
            <p className="gy-kicker" style={{ color: 'var(--gy-success)' }}>LEVELS COMPLETED</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gy-success)' }}>{completedLevels}/{totalLevels}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
