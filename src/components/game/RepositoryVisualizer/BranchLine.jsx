export default function BranchLine({ fromX, toX, y }) {
  return <line x1={fromX} y1={y} x2={toX} y2={y} stroke="#3b82f6" strokeWidth="2" />;
}
