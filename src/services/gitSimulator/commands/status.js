export function runStatus(state) {
  if (!state.initialized) return "Not a git repository.";
  return [
    `On branch ${state.currentBranch}`,
    state.staged.length ? `Changes to be committed: ${state.staged.join(", ")}` : "No changes staged for commit.",
  ].join("\n");
}
