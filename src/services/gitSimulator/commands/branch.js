export function runBranch(state, dispatch, args) {
  if (!state.initialized) return "Run git init first.";
  if (!args.length) return Object.keys(state.branches).map((b) => (b === state.currentBranch ? `* ${b}` : `  ${b}`)).join("\n");
  const name = args[0];
  if (state.branches[name]) return `Branch ${name} already exists.`;
  dispatch({ type: "BRANCH", payload: { name } });
  return `Created branch ${name}`;
}
