import { createContext, useContext, useMemo, useReducer } from "react";
import { gitEngineReducer, initialGitState, initialUserProgress, userProgressReducer } from "../reducers";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [gitState, gitDispatch] = useReducer(gitEngineReducer, initialGitState);
  const [progress, progressDispatch] = useReducer(userProgressReducer, initialUserProgress);

  const value = useMemo(() => ({ gitState, gitDispatch, progress, progressDispatch }), [gitState, progress]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used in GameProvider");
  return ctx;
}
