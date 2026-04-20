import { Link } from "react-router-dom";
import { useGameContext } from "../../context";
import { gameLevels } from "../../data/levels";

export default function Dashboard() {
  const { progress } = useGameContext();

  return (
    <main className="gy-grid" style={{ gap: '2.5rem' }}>
      <header>
        <p className="gy-kicker" style={{ color: 'var(--gy-primary)', fontWeight: 800, letterSpacing: '0.4em' }}>COMMAND CENTER</p>
        <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>Mission Control Console</h1>
      </header>

      <div className="gy-grid gy-grid-2" style={{ alignItems: 'start', gap: '2rem' }}>
        <section className="gy-card" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(0,0,0,0.6))',
          padding: '2.5rem',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Operational Progress</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="gy-muted">CAMPAIGN COMPLETION</span>
                <span style={{ fontWeight: 800 }}>{Math.round(((progress.level - 1) / 30) * 100)}%</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${((progress.level - 1) / 30) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--gy-primary), var(--gy-secondary))', borderRadius: 'inherit', boxShadow: '0 0 15px var(--gy-primary)' }}></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--gy-glass-border)' }}>
                <p className="gy-kicker" style={{ color: 'var(--gy-primary)' }}>XP BALANCE</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 900 }}>{progress.xp.toLocaleString()}</p>
              </div>
              <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid var(--gy-glass-border)' }}>
                <p className="gy-kicker" style={{ color: 'var(--gy-success)' }}>MISSIONS COMPLETED</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 900 }}>{Object.keys(progress.missionPerformance || {}).length} MISSIONS ✅</p>
              </div>
            </div>
          </div>
        </section>

        <section className="gy-card" style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(0,0,0,0.6))',
          padding: '2.5rem',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          <p className="gy-kicker" style={{ color: 'var(--gy-accent)' }}>NEXT OBJECTIVE</p>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Initiate Mission {progress.level}</h3>
          <p className="gy-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            System state suggests current protocol mastery is
            {progress.level <= 10 ? " foundational" : progress.level <= 20 ? " advanced" : " expert"}.
            Prepare for next synchronization.
          </p>
          <Link to="/challenges" className="gy-btn" style={{ width: '100%', textAlign: 'center' }}>GO TO CHALLENGE</Link>
        </section>
      </div>

      <section className="gy-card">
        <h3 style={{ marginBottom: '2rem' }}>Protocol History</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(progress.missionPerformance || {}).length > 0 ? (
            Object.entries(progress.missionPerformance)
              .sort(([idA], [idB]) => parseInt(idB) - parseInt(idA)) // Most recent first
              .map(([levelId, stats]) => {
                const mission = gameLevels.find(l => l.id === parseInt(levelId));
                return (
                  <div key={levelId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--gy-glass-border)' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <span style={{ padding: '0.5rem 0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--gy-success)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>COMPLETED</span>
                      <div>
                        <p style={{ fontWeight: 800, margin: 0 }}>MISSION {levelId.padStart(2, '0')} VALIDATED</p>
                        <p className="gy-muted" style={{ fontSize: '0.8rem', margin: 0 }}>
                          {mission?.title}: Breakthrough at Attempt #{stats.breakthrough}
                        </p>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gy-muted)' }}>Trials: {stats.trials}</span>
                    </div>
                  </div>
                );
              })
          ) : (
            <div style={{ padding: '3rem', textAlign: 'center', background: 'rgba(255,255,255,0.01)', borderRadius: '16px', border: '1px dashed var(--gy-glass-border)' }}>
              <p className="gy-muted">No historical data available. Deploy to the arena to begin neural mapping.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
