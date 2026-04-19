import { useReducer } from "react";
import { challengeReducer, initialChallengeState } from "../reducers";

export function useChallenge() {
  const [state, dispatch] = useReducer(challengeReducer, initialChallengeState);
  return { state, dispatch };
}
