import { useCallback } from "react";
import { useGitEngine, useTerminal } from "../../../hooks";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";

export default function Terminal() {
  const { run } = useGitEngine();
  const onCommand = useCallback((cmd) => run(cmd), [run]);
  const { state, controls, outputRef } = useTerminal(onCommand);

  return (
    <section className="gy-card">
      <h3>Terminal</h3>
      <TerminalOutput lines={state.lines} outputRef={outputRef} />
      <TerminalInput
        value={state.input}
        onChange={(e) => controls.onInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") controls.submit();
          if (e.key === "ArrowUp") controls.onUp();
          if (e.key === "ArrowDown") controls.onDown();
        }}
      />
    </section>
  );
}
