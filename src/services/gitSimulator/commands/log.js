export function runLog(state) {
  if (!state.commits.length) return "No commits yet.";
  return [...state.commits]
    .reverse()
    .map((c) => `commit ${c.id}\nAuthor: learner\n\n    ${c.message}`)
    .join("\n\n");
}
