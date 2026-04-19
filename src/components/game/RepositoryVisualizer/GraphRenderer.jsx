import BranchLine from "./BranchLine";
import CommitNode from "./CommitNode";

export default function GraphRenderer({ nodes }) {
  return (
    <svg width="100%" height="220" viewBox="0 0 900 220">
      {nodes.length > 1 ? <BranchLine fromX={nodes[0].x} toX={nodes[nodes.length - 1].x} y={80} /> : null}
      {nodes.map((node) => (
        <CommitNode key={node.id} node={node} />
      ))}
    </svg>
  );
}
