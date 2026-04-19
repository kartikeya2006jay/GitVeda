import { useGameContext } from "../context";
import { executeGitCommand } from "../services/gitSimulator/GitEngine";

export function useGitEngine() {
  const { gitState, gitDispatch } = useGameContext();

  const run = (input) => executeGitCommand(input, gitState, gitDispatch);
  return { gitState, run };
}
