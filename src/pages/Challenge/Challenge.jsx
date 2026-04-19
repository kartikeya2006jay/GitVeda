import Terminal from "../../components/game/Terminal/Terminal";
import RepositoryVisualizer from "../../components/game/RepositoryVisualizer/RepositoryVisualizer";

export default function Challenge() {
  return (
    <main className="gy-grid gy-grid-2">
      <Terminal />
      <RepositoryVisualizer />
    </main>
  );
}
