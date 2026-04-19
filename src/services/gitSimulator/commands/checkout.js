export function runCheckout(state, dispatch, args) {
  if (!state.initialized) return "Run git init first.";
  const name = args[0];
  if (!name) return "Specify branch name.";
  if (!state.branches[name]) return `Branch ${name} not found.`;
  dispatch({ type: "CHECKOUT", payload: { name } });
  return `Switched to branch '${name}'`;
}
