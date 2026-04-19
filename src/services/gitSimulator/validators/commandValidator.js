const GIT_CMD = /^git\s+[a-z]+(\s+.*)?$/;

export function validateCommand(input) {
  if (!input.trim()) return { valid: false, reason: "Empty command" };
  if (!GIT_CMD.test(input.trim())) return { valid: false, reason: "Use format: git <command>" };
  return { valid: true };
}
