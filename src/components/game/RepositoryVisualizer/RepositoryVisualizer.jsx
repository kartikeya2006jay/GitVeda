import { useGameContext } from "../../../context";
import GraphRenderer from "./GraphRenderer";
import { useGraphLayout } from "./useGraphLayout";

export default function RepositoryVisualizer() {
  const { gitState } = useGameContext();
  const nodes = useGraphLayout(gitState.commits);

  return (
    <section className="gy-card">
      <h3>Repository Visualizer</h3>
      {nodes.length ? <GraphRenderer nodes={nodes} /> : <p>No commits yet.</p>}
    </section>
  );
}
