import { endgameTracks, easyLevels, hardLevels, mediumLevels } from "../../data/levels";

function LevelGroup({ title, levels, tone }) {
  return (
    <section className={`gy-card gy-level-group gy-level-group-${tone}`}>
      <h2>{title}</h2>
      <p className="gy-muted">{levels.length} missions</p>
      <div className="gy-level-list">
        {levels.map((level) => (
          <article className="gy-level-item" key={level.id}>
            <p className="gy-level-chip">Level {level.level}</p>
            <h3>{level.command}</h3>
            <p>{level.mission}</p>
            <p className="gy-muted">Question: {level.question}</p>
            <p className="gy-kicker">XP Reward: +{level.xpReward}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Learn() {
  return (
    <main className="gy-grid">
      <section className="gy-card gy-learning-header">
        <p className="gy-kicker">LEVEL MAP</p>
        <h1>30 levels from beginner to advanced Git operator.</h1>
        <p>
          Complete all easy, medium, and hard missions in sequence, then finish the final revision
          and practice arena to lock in real command confidence.
        </p>
      </section>

      <LevelGroup title="Easy Command Levels (1-10)" levels={easyLevels} tone="easy" />
      <LevelGroup title="Medium Workflow Levels (11-20)" levels={mediumLevels} tone="medium" />
      <LevelGroup title="Hard Recovery Levels (21-30)" levels={hardLevels} tone="hard" />

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
