import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import { useGameContext } from "../../context";

export default function Dashboard() {
  const { progress, gitState } = useGameContext();
  return (
    <main className="gy-grid">
      <section className="gy-grid gy-grid-3">
        <StatsCard label="Level" value={progress.level} />
        <StatsCard label="XP" value={progress.xp} />
        <StatsCard label="Commits" value={gitState.commits.length} />
      </section>

      <section className="gy-grid gy-grid-2">
        <article className="gy-card">
          <h3>Today&apos;s Focus</h3>
          <p>Complete one branching challenge and one merge challenge to gain +120 XP.</p>
        </article>
        <article className="gy-card">
          <h3>Recent Momentum</h3>
          <p>{gitState.commits.length ? `You have made ${gitState.commits.length} commits in simulator.` : "Start with your first commit mission."}</p>
        </article>
      </section>
    </main>
  );
}
