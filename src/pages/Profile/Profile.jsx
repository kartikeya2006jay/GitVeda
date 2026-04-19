import { useAuth } from "../../hooks";
import { useGameContext } from "../../context";

export default function Profile() {
  const { user } = useAuth();
  const { progress } = useGameContext();

  const rank = progress.level <= 10 ? "Novice Commit-er" : progress.level <= 20 ? "Workflow Architect" : "Git Legend";
  const badges = [
    { name: "First Commit", icon: "🌱", earned: true, color: "var(--gy-success)" },
    { name: "Branch Explorer", icon: "🌿", earned: progress.level > 10, color: "var(--gy-primary)" },
    { name: "Conflict Resolver", icon: "⚔️", earned: progress.level > 15, color: "var(--gy-danger)" },
    { name: "Reflog Time-Traveler", icon: "⏳", earned: progress.level > 25, color: "var(--gy-accent)" },
    { name: "Git Master", icon: "👑", earned: progress.level >= 30, color: "#fff" },
  ];

  return (
    <main className="gy-grid" style={{ gap: '3rem' }}>
      <header style={{ textAlign: 'center' }}>
        <p className="gy-kicker" style={{ color: 'var(--gy-primary)', fontWeight: 800, letterSpacing: '0.4em' }}>OPERATOR DOSSIER</p>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {user?.displayName || "Kartikeya Yadav"}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <span className="gy-pill" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--gy-primary)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>{rank}</span>
          <span className="gy-pill" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--gy-accent)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>STREAK: {progress.streakDays} DAYS</span>
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
              <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>{progress.level - 1} / 30</span>
            </div>
          </div>
        </section>

        <section className="gy-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'var(--gy-primary)' }}>Achievement</span> Hall
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1.25rem' }}>
            {badges.map((badge, i) => (
              <div key={i} style={{
                padding: '1.5rem 1rem',
                borderRadius: '24px',
                background: badge.earned ? 'rgba(99, 102, 241, 0.1)' : 'rgba(0,0,0,0.3)',
                border: badge.earned ? `1px solid ${badge.color}` : '1px solid var(--gy-glass-border)',
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.2,
                transition: 'all 0.3s ease',
                boxShadow: badge.earned ? `0 0 20px ${badge.color}22` : 'none'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', filter: badge.earned ? 'none' : 'grayscale(1)' }}>{badge.icon}</div>
                <p style={{ fontSize: '0.8rem', fontWeight: 800, color: badge.earned ? '#fff' : 'var(--gy-muted)' }}>{badge.name}</p>
              </div>
            ))}
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
            <p className="gy-kicker" style={{ color: 'var(--gy-success)' }}>ACTIVE STREAK</p>
            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--gy-success)' }}>{progress.streakDays}🔥</p>
          </div>
        </div>
      </section>
    </main>
  );
}
