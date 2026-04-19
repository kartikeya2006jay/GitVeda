export function commitsToNodes(commits) {
  return commits.map((c, i) => ({ ...c, x: 80 + i * 120, y: 80 }));
}
