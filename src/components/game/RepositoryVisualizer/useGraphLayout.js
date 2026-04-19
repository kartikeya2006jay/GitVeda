import { useMemo } from "react";
import { commitsToNodes } from "../../../services/gitSimulator/utils/graphUtils";

export function useGraphLayout(commits) {
  return useMemo(() => commitsToNodes(commits), [commits]);
}
