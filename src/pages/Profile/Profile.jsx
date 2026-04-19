import { useAuth } from "../../hooks";
import { useGameContext } from "../../context";
import { gameLevels } from "../../data/levels";

export default function Profile() {
  const { user } = useAuth();
  const { progress } = useGameContext();

  const rank = progress.level <= 10 ? "Novice Commit-er" : progress.level <= 20 ? "Workflow Architect" : "Git Legend";
  const badges = [
    { name: "First Commit", icon: "🌱", earned: true },
    { name: "Branch Explorer", icon: "🌿", earned: progress.level > 10 },
    { name: "Conflict Resolver", icon: "⚔️", earned: progress.level > 15 },
    { name: "Reflog Time-Traveler", icon: "⏳", earned: progress.level > 25 },
    { name: "Git Master", icon: "👑", earned: progress.level >= 30 },
  ];

  return (
    <main className="gy-grid" style={{ gap: '2rem' }}>
      <header>
        <p className="gy-kicker" style={{ color: 'var(--gy-primary)' }}>OPERATOR PROFILE</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{user?.displayName || "Git Enthusiast"}</h1>
      </header>

      <div className="gy-grid gy-grid-2" style={{ alignItems: 'start' }}>
        <section className="gy-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, var(--gy-primary), var(--gy-secondary))', display: 'grid', placeItems: 'center', fontSize: '2.5rem' }}>
            {user?.photoURL ? <img src={user.photoURL} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} /> : "👨‍🚀"}
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user?.email || "anonymous@gitveda.dev"}</h2>
            <p className="gy-muted" style={{ fontWeight: 600, color: 'var(--gy-primary)' }}>{rank}</p>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid var(--gy-glass-border)', margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total XP:</span>
            <span style={{ fontWeight: 800, color: 'var(--gy-accent)' }}>{progress.xp.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Missions Completed:</span>
            <span style={{ fontWeight: 800 }}>{progress.level - 1} / 30</span>
          </div>
        </section>

        <section className="gy-card">
          <h3 style={{ marginBottom: '1.5rem' }}>Achievement Hall</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {badges.map((badge, i) => (
              <div key={i} style={{
                padding: '1rem',
                borderRadius: '16px',
                background: badge.earned ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)',
                border: badge.earned ? '1px solid var(--gy-primary)' : '1px solid transparent',
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.3
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{badge.icon}</div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700 }}>{badge.name}</p>
                {badge.earned && <p style={{ fontSize: '0.6rem', color: 'var(--gy-success)', marginTop: '0.2rem' }}>EARNED</p>}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="gy-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(15, 23, 42, 0.8))' }}>
        <h3>Operational Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <p className="gy-kicker">COMMITS</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{Math.floor(progress.xp / 100)}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p className="gy-kicker">PRs</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{Math.floor(progress.level / 2)}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p className="gy-kicker">MERGES</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{Math.floor(progress.level / 3)}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p className="gy-kicker">STREAK</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>4 Days</p>
          </div>
        </div>
      </section>
    </main>
  );
}
