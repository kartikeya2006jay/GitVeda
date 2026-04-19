export function runInit(state, dispatch) {
  if (state.initialized) return "Repository already initialized.";
  dispatch({ type: "INIT" });
  return "Initialized empty GitYatra repository.";
}
