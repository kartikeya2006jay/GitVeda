export function runAdd(state, dispatch, args) {
  if (!state.initialized) return "Run git init first.";
  if (!args.length) return "Nothing specified, nothing added.";
  dispatch({ type: "ADD", payload: { files: args } });
  return `Staged: ${args.join(", ")}`;
}
