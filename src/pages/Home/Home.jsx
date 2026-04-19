import { Link } from "react-router-dom";
import { easyLevels, endgameTracks, gameLevels, hardLevels, mediumLevels } from "../../data/levels";

export default function Home() {
  const featured = gameLevels.slice(0, 3);

  return (
    <main className="gy-grid">
      <section className="gy-hero gy-card gy-hero-game">
        <p className="gy-kicker">WELCOME TO GITVEDA QUEST MODE</p>
        <h1>Master Git through 30 playable command levels.</h1>
        <p>
          Start with fundamentals, unlock medium workflow missions, survive hard debugging rounds,
          and finish with final revision and open practice.
        </p>
        <div className="gy-hero-actions">
          <Link className="gy-btn" to="/learn">Enter Level Map</Link>
          <Link className="gy-btn gy-btn-ghost" to="/challenge">Start Current Mission</Link>
        </div>
        <div className="gy-pill-row">
          <span className="gy-pill">30 Total Levels</span>
          <span className="gy-pill">10 Easy</span>
          <span className="gy-pill">10 Medium</span>
          <span className="gy-pill">10 Hard</span>
          <span className="gy-pill">Revision + Practice</span>
        </div>
      </section>

      <section className="gy-grid gy-grid-3">
        <article className="gy-card gy-stage-card">
          <h3>Easy Command Bootcamp</h3>
          <p>Build confidence with {easyLevels.length} core commands and instant quiz checks.</p>
        </article>
        <article className="gy-card gy-stage-card">
          <h3>Medium Workflow Arena</h3>
          <p>Work through {mediumLevels.length} collaboration scenarios: remotes, merges, and stashes.</p>
        </article>
        <article className="gy-card gy-stage-card">
          <h3>Hard Rescue Missions</h3>
          <p>Complete {hardLevels.length} advanced recovery tasks like reflog, bisect, and interactive rebase.</p>
        </article>
      </section>

      <section className="gy-grid gy-grid-3">
        {featured.map((level) => (
          <article className="gy-card gy-level-preview" key={level.id}>
            <p className="gy-level-chip">Level {level.level}</p>
            <h3>{level.command}</h3>
            <p>{level.mission}</p>
            <p className="gy-muted">Quiz: {level.question}</p>
          </article>
        ))}
      </section>

      <section className="gy-grid gy-grid-2">
        {endgameTracks.map((track) => (
          <article className="gy-card gy-endgame" key={track.id}>
            <h3>{track.title}</h3>
            <p>{track.description}</p>
            <p className="gy-kicker">Reward: {track.reward}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
