import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Terminal from "../../components/game/Terminal/Terminal";
import { gameLevels } from "../../data/levels";
import { useGameContext } from "../../context";
import { getMissionHint } from "../../services/api/aiHints";

export default function Challenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, progressDispatch } = useGameContext();
  const [answer, setAnswer] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [aiHint, setAiHint] = useState(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [hintError, setHintError] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  // High-level mission data based on URL ID
  const levelId = parseInt(id) || 1;
  const currentLevel = gameLevels.find(l => l.id === levelId) || gameLevels[0];

  // Track attempts for the current mission
  // Seed with previous session stats if available
  const historicalStats = progress.missionPerformance?.[levelId] || { trials: 0, breakthrough: null };
  const [attempts, setAttempts] = useState(historicalStats.trials);
  const [breakthroughAttempt, setBreakthroughAttempt] = useState(historicalStats.breakthrough);

  // Sync state if mission ID changes via navigation
  useEffect(() => {
    const stats = progress.missionPerformance?.[levelId] || { trials: 0, breakthrough: null };
    setAttempts(stats.trials);
    setBreakthroughAttempt(stats.breakthrough);
    setIsSuccess(false);
    setShowHint(false);
    setAiHint(null);
    setHintError("");
    setIsHintLoading(false);
    setShowExplanation(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setAnswer("");
  }, [levelId, progress.missionPerformance]);

  const handleHintRequest = async () => {
    if (isHintLoading) return;

    setShowHint(true);
    setHintError("");
    setIsHintLoading(true);

    try {
      const result = await getMissionHint({
        mission: currentLevel.mission,
        question: currentLevel.question,
        answer: currentLevel.answer,
        command: currentLevel.command,
      });
      setAiHint(result);
      setShowExplanation(false);
    } catch (error) {
      setAiHint(null);
      setHintError(
        "AI hint is currently unavailable. Please connect an OpenAI backend endpoint and try again."
      );
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleSpeakExplanation = () => {
    if (!aiHint?.explanation) return;

    setShowExplanation(true);

    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(aiHint.explanation);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentAttemptNumber = attempts + 1;
    setAttempts(currentAttemptNumber);

    if (answer.trim().toLowerCase() === currentLevel.answer.toLowerCase()) {
      if (!breakthroughAttempt) {
        setBreakthroughAttempt(currentAttemptNumber);
      }
      setIsSuccess(true);
    } else {
      alert("INCORRECT PROTOCOL. PLEASE RE-EVALUATE.");
    }
  };

  const handleContinue = () => {
    // Save performance to global state
    progressDispatch({
      type: "SAVE_MISSION_STATS",
      payload: {
        levelId: currentLevel.id,
        trials: attempts,
        breakthrough: breakthroughAttempt
      }
    });

    // Award XP/Level only if this was the latest unlocked level
    if (currentLevel.level === progress.level) {
      progressDispatch({
        type: "COMPLETE_LEVEL",
        payload: { level: currentLevel.level, xp: currentLevel.xpReward }
      });
      progressDispatch({ type: "UPDATE_STREAK" });
    }

    setIsSuccess(false);

    // Auto-navigate to next mission if it exists
    const nextLevel = gameLevels.find(l => l.level === (currentLevel.level + 1));
    if (nextLevel) {
      navigate(`/challenge/${nextLevel.id}`);
    } else {
      navigate('/challenges');
    }
  };

  return (
    <main style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
      {isSuccess && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.9)',
          backdropFilter: 'blur(10px)', zIndex: 1000,
          display: 'grid', placeItems: 'center', animation: 'gy-fade-in 0.5s ease'
        }}>
          <div className="gy-card" style={{ textAlign: 'center', padding: '3rem', border: '1px solid var(--gy-success)', boxShadow: '0 0 50px rgba(16, 185, 129, 0.2)' }}>
            <p className="gy-kicker" style={{ color: 'var(--gy-success)' }}>MISSION SUCCESSFUL</p>
            <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>PROTOCOL VALIDATED</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--gy-muted)' }}>Command Mastered: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{currentLevel.command}</code></p>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Reward: +{currentLevel.xpReward} XP | Streak Updated 🔥</p>
            <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--gy-success)' }}>Breakthrough achieved on <strong>Attempt #{breakthroughAttempt}</strong></p>
            </div>
            <button className="gy-btn" onClick={handleContinue}>CONTINUE TO NEXT MISSION</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '1.5rem', minHeight: 0 }}>
        {/* LEFT SIDE: THE WORKSPACE */}
        <section style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: '1rem', minHeight: 0 }}>
          <div className="gy-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--gy-glass-border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--gy-glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--gy-muted)', fontFamily: 'var(--gy-font-mono)' }}>NEURAL_TERMINAL_v1.0.4</span>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <Terminal />
            </div>
          </div>

          <div className="gy-card" style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.3)' }}>
            <p className="gy-kicker" style={{ marginBottom: '0.75rem', color: 'var(--gy-primary)' }}>INPUT CONSOLE</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Enter Git command to execute mission..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                  flex: 1,
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--gy-glass-border)',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '1rem',
                  fontFamily: 'var(--gy-font-mono)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                }}
              />
              <button type="submit" className="gy-btn" style={{ padding: '0 2rem' }}>VALIDATE</button>
            </form>
          </div>
        </section>

        {/* RIGHT SIDE: MISSION CONTROL */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <section className="gy-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(0,0,0,0.4))', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <p className="gy-kicker" style={{ color: 'var(--gy-primary)', letterSpacing: '0.4em' }}>MISSION CONTROL</p>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '0.25rem' }}>LEVEL {currentLevel.level}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="gy-pill" style={{ fontSize: '0.65rem', marginBottom: '0.4rem' }}>{currentLevel.difficulty.toUpperCase()}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--gy-primary)', fontWeight: 800 }}>+{currentLevel.xpReward} XP</p>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p className="gy-muted" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--gy-primary)' }}>Objective</p>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>{currentLevel.mission}</h4>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="gy-muted" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>QUERY TARGET</p>
              <p style={{ fontSize: '1rem', margin: 0, color: '#e2e8f0' }}>{currentLevel.question}</p>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {!showHint ? (
                <button
                  onClick={handleHintRequest}
                  style={{ background: 'none', border: 'none', color: 'var(--gy-muted)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <span>💡</span> Need Intel? (Ask AI Hint)
                </button>
              ) : (
                <div style={{ background: 'rgba(245, 158, 11, 0.05)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  {isHintLoading && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--gy-accent)', margin: 0 }}>
                      Generating AI hint...
                    </p>
                  )}

                  {hintError && (
                    <p style={{ fontSize: '0.8rem', color: '#fca5a5', margin: 0 }}>{hintError}</p>
                  )}

                  {!isHintLoading && !hintError && aiHint && (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--gy-accent)', margin: 0 }}>
                        <strong>Hint:</strong> {aiHint.hint}
                      </p>
                      <button
                        onClick={handleSpeakExplanation}
                        type="button"
                        style={{
                          justifySelf: 'start',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#e2e8f0',
                          borderRadius: '8px',
                          padding: '0.35rem 0.65rem',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        🔊 Explain
                      </button>
                      {showExplanation && (
                        <p style={{ fontSize: '0.8rem', color: '#fde68a', margin: 0 }}>
                          <strong>Explanation:</strong> {aiHint.explanation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* MISSION PERFORMANCE INSTEAD OF REPO VISUALIZER */}
          <section className="gy-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minHeight: '220px' }}>
            <p className="gy-kicker" style={{ marginBottom: '0.5rem', color: 'var(--gy-primary)' }}>MISSION PERFORMANCE</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--gy-glass-border)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--gy-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Trials</p>
                <p style={{ fontSize: '2rem', fontWeight: 900, margin: 0, color: 'var(--gy-primary)' }}>{attempts}</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--gy-glass-border)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--gy-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Success Point</p>
                <p style={{ fontSize: '2rem', fontWeight: 900, margin: 0, color: breakthroughAttempt ? 'var(--gy-success)' : 'var(--gy-muted)' }}>
                  {breakthroughAttempt || '--'}
                </p>
              </div>
            </div>

            <div style={{ flex: 1, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,0.1)', borderRadius: '12px', border: '1px dashed var(--gy-glass-border)', marginTop: '0.5rem' }}>
              {!isSuccess ? (
                <div style={{ textAlign: 'center', opacity: 0.5 }}>
                  <p style={{ fontSize: '0.8rem', margin: 0 }}>MISSION IN PROGRESS</p>
                  <p style={{ fontSize: '0.7rem' }}>Deploy protocol to evaluate performance</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', animation: 'gy-fade-in 0.3s ease' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gy-success)', fontWeight: 800 }}>ANALYSIS COMPLETE</p>
                  <p style={{ fontSize: '0.7rem' }}>Breakthrough at attempt {breakthroughAttempt}</p>
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
