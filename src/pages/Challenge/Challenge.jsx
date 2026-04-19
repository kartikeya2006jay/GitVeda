import { useState } from "react";
import Terminal from "../../components/game/Terminal/Terminal";
import RepositoryVisualizer from "../../components/game/RepositoryVisualizer/RepositoryVisualizer";
import { gameLevels } from "../../data/levels";
import { useGameContext } from "../../context";

export default function Challenge() {
  const { progress, progressDispatch } = useGameContext();
  const [answer, setAnswer] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const currentLevel = gameLevels[Math.max(progress.level - 1, 0)] || gameLevels[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() === currentLevel.answer) {
      setIsSuccess(true);
      progressDispatch({
        type: "COMPLETE_LEVEL",
        payload: { level: currentLevel.level, xp: currentLevel.xpReward }
      });
      progressDispatch({ type: "UPDATE_STREAK" });
      setAnswer("");
    } else {
      alert("INCORRECT PROTOCOL. PLEASE RE-EVALUATE.");
    }
  };

  return (
    <main className="gy-grid">
      {isSuccess && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.9)',
          backdropFilter: 'blur(10px)', zIndex: 1000,
          display: 'grid', placeItems: 'center', animation: 'gy-fade-in 0.5s ease'
        }}>
          <div className="gy-card" style={{ textAlign: 'center', padding: '3rem', border: '1px solid var(--gy-success)', boxShadow: '0 0 50px rgba(16, 185, 129, 0.2)' }}>
            <p className="gy-kicker" style={{ color: 'var(--gy-success)' }}>MISSION SUCCESSFUL</p>
            <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>PROTOCOL VALIDATED</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Reward: +{currentLevel.xpReward} XP | Streak Updated 🔥</p>
            <button className="gy-btn" onClick={() => setIsSuccess(false)}>CONTINUE TO NEXT MISSION</button>
          </div>
        </div>
      )}

      <section className="gy-card gy-challenge-hero" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(0,0,0,0.5))' }}>
        <p className="gy-kicker" style={{ letterSpacing: '0.3em' }}>MISSION CONTROL</p>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>LEVEL {currentLevel.level} - {currentLevel.command}</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--gy-muted)' }}>{currentLevel.mission}</p>
        <div className="gy-pill-row" style={{ marginTop: '1.5rem' }}>
          <span className="gy-pill">DIFFICULTY: {currentLevel.difficulty}</span>
          <span className="gy-pill" style={{ color: 'var(--gy-accent)' }}>REWARD: +{currentLevel.xpReward} XP</span>
        </div>
      </section>

      <section className="gy-grid gy-grid-2 gy-challenge-layout">
        <Terminal />
        <section className="gy-grid gy-grid-challenge-side">
          <article className="gy-card gy-question-card" style={{ border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <p className="gy-kicker">MISSION PROTOCOL</p>
            <h3 style={{ marginBottom: '1rem' }}>Scenario Objective</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{currentLevel.question}</p>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
              <input
                type="text"
                placeholder="Enter command to execute..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--gy-glass-border)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '1.1rem',
                  fontFamily: 'var(--gy-font-mono)',
                  marginBottom: '1rem'
                }}
              />
              <button type="submit" className="gy-btn" style={{ width: '100%' }}>SUBMIT PROTOCOL</button>
            </form>
          </article>
          <RepositoryVisualizer />
        </section>
      </section>
    </main>
  );
}
