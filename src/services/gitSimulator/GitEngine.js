import { runInit } from "./commands/init";
import { runAdd } from "./commands/add";
import { runCommit } from "./commands/commit";
import { runBranch } from "./commands/branch";
import { runCheckout } from "./commands/checkout";
import { runStatus } from "./commands/status";
import { runLog } from "./commands/log";

export function executeGitCommand(input, state, dispatch) {
  const [cmd, ...args] = input.trim().split(/\s+/);
  if (cmd !== "git") return "Only git commands are supported.";

  const sub = args[0];
  switch (sub) {
    case "init":
      return runInit(state, dispatch);
    case "add":
      return runAdd(state, dispatch, args.slice(1));
    case "commit":
      return runCommit(state, dispatch, args.slice(1));
    case "branch":
      return runBranch(state, dispatch, args.slice(1));
    case "checkout":
      return runCheckout(state, dispatch, args.slice(1));
    case "status":
      return runStatus(state);
    case "log":
      return runLog(state);
    default:
      return `Unsupported git command: ${sub || ""}`;
  }
}
