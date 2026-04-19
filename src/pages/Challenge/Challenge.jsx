import Terminal from "../../components/game/Terminal/Terminal";
import RepositoryVisualizer from "../../components/game/RepositoryVisualizer/RepositoryVisualizer";
import { gameLevels } from "../../data/levels";
import { useGameContext } from "../../context";

export default function Challenge() {
  const { progress } = useGameContext();
  const currentLevel = gameLevels[Math.max(progress.level - 1, 0)] || gameLevels[0];

  return (
    <main className="gy-grid">
      <section className="gy-card gy-challenge-hero">
        <p className="gy-kicker">MISSION CONTROL</p>
        <h2>Level {currentLevel.level} - {currentLevel.command}</h2>
        <p>{currentLevel.mission}</p>
        <div className="gy-pill-row">
          <span className="gy-pill">Difficulty: {currentLevel.difficulty}</span>
          <span className="gy-pill">Reward: +{currentLevel.xpReward} XP</span>
        </div>
      </section>

      <section className="gy-grid gy-grid-2 gy-challenge-layout">
        <Terminal />
        <section className="gy-grid gy-grid-challenge-side">
          <article className="gy-card gy-question-card">
            <h3>Mission Question</h3>
            <p>{currentLevel.question}</p>
            <div className="gy-option-list">
              {currentLevel.options.map((option) => (
                <p className="gy-option" key={option}>{option}</p>
              ))}
            </div>
            <p className="gy-kicker">Correct answer: {currentLevel.answer}</p>
          </article>
          <RepositoryVisualizer />
        </section>
      </section>
    </main>
  );
}
