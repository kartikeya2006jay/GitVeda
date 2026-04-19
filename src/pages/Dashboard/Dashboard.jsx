import { Link } from "react-router-dom";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import { endgameTracks, gameLevels, hardLevels, mediumLevels } from "../../data/levels";
import { useGameContext } from "../../context";

export default function Dashboard() {
  const { progress, gitState } = useGameContext();
  const currentLevel = gameLevels[Math.max(progress.level - 1, 0)] || gameLevels[0];
  const completion = Math.min(100, Math.round((progress.level / gameLevels.length) * 100));

  return (
    <main className="gy-grid">
      <section className="gy-grid gy-grid-3">
        <StatsCard label="Player Level" value={progress.level} />
        <StatsCard label="Total XP" value={progress.xp} />
        <StatsCard label="Simulator Commits" value={gitState.commits.length} />
      </section>

      <section className="gy-card gy-progress-panel">
        <div>
          <p className="gy-kicker">CAMPAIGN PROGRESS</p>
          <h3>Level {currentLevel.level}: {currentLevel.command}</h3>
          <p>{currentLevel.mission}</p>
        </div>
        <p className="gy-progress-text">{completion}% of core campaign completed</p>
        <div className="gy-progress-track">
          <div className="gy-progress-fill" style={{ width: `${completion}%` }} />
        </div>
        <div className="gy-pill-row">
          <span className="gy-pill">Easy: 10 levels</span>
          <span className="gy-pill">Medium: {mediumLevels.length} levels</span>
          <span className="gy-pill">Hard: {hardLevels.length} levels</span>
        </div>
      </section>

      <section className="gy-grid gy-grid-2">
        <article className="gy-card">
          <h3>Current Mission Question</h3>
          <p>{currentLevel.question}</p>
          <p className="gy-kicker">Target command: {currentLevel.command}</p>
          <Link className="gy-btn" to="/challenge">Attempt Mission</Link>
        </article>

        <article className="gy-card">
          <h3>Endgame Unlocks</h3>
          {endgameTracks.map((track) => (
            <p key={track.id}><strong>{track.title}:</strong> {track.description}</p>
          ))}
          <Link className="gy-btn gy-btn-light" to="/learn">Open Full Level Map</Link>
        </article>
      </section>
    </main>
  );
}
