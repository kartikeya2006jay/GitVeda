export const initialChallengeState = {
  challenge: null,
  attempts: 0,
  status: "not_started",
  hintsUsed: 0,
};

export function challengeReducer(state, action) {
  switch (action.type) {
    case "SET_CHALLENGE":
      return { ...state, challenge: action.payload, status: "in_progress" };
    case "ATTEMPT":
      return { ...state, attempts: state.attempts + 1 };
    case "COMPLETE":
      return { ...state, status: "completed" };
    case "HINT":
      return { ...state, hintsUsed: state.hintsUsed + 1 };
    case "RESET":
      return initialChallengeState;
    default:
      return state;
  }
}
