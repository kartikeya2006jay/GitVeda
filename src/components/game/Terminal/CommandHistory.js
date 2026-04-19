export function getSuggestion(input) {
  const cmds = ["git init", "git add", "git commit -m \"msg\"", "git branch", "git checkout", "git status", "git log"];
  return cmds.find((c) => c.startsWith(input)) || null;
}
