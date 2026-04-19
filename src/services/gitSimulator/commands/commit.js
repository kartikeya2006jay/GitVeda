function parseMessage(args) {
  const idx = args.findIndex((x) => x === "-m");
  if (idx === -1 || !args[idx + 1]) return null;
  return args.slice(idx + 1).join(" ").replace(/^"|"$/g, "");
}

export function runCommit(state, dispatch, args) {
  if (!state.initialized) return "Run git init first.";
  if (!state.staged.length) return "No changes added to commit.";
  const message = parseMessage(args);
  if (!message) return "Please provide commit message: git commit -m \"message\"";
  const id = Math.random().toString(16).slice(2, 9);
  dispatch({ type: "COMMIT", payload: { commit: { id, message, branch: state.currentBranch, ts: Date.now() } } });
  return `[${state.currentBranch} ${id}] ${message}`;
}
