import { memo } from "react";

function CommitNode({ node }) {
  return (
    <g>
      <circle cx={node.x} cy={node.y} r="16" fill="#8b5cf6" />
      <text x={node.x} y={node.y + 36} textAnchor="middle" fill="#fff" fontSize="11">
        {node.id}
      </text>
    </g>
  );
}

export default memo(CommitNode);
