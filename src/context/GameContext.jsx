import { createContext, useContext, useMemo, useReducer, useEffect } from "react";
import { gitEngineReducer, initialGitState, initialUserProgress, userProgressReducer } from "../reducers";

const GameContext = createContext(null);

const STORAGE_KEY_PROGRESS = "gitveda_user_progress";
const STORAGE_KEY_GIT = "gitveda_git_state";

export function GameProvider({ children }) {
  // Initialize with persisted state if available
  const [gitState, gitDispatch] = useReducer(gitEngineReducer, initialGitState, (initial) => {
    const saved = localStorage.getItem(STORAGE_KEY_GIT);
    return saved ? JSON.parse(saved) : initial;
  });

  const [progress, progressDispatch] = useReducer(userProgressReducer, initialUserProgress, (initial) => {
    const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
    return saved ? JSON.parse(saved) : initial;
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_GIT, JSON.stringify(gitState));
  }, [gitState]);

  const value = useMemo(() => ({ gitState, gitDispatch, progress, progressDispatch }), [gitState, progress]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameContext must be used in GameProvider");
  return ctx;
}
