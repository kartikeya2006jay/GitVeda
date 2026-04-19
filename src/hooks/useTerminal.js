import { useCallback, useMemo, useReducer, useRef } from "react";

const initialTerminal = {
  input: "",
  lines: ["Welcome to GitVeda terminal. Type: git init"],
  history: [],
  historyIndex: -1,
};

function terminalReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "PUSH_LINE":
      return { ...state, lines: [...state.lines, action.payload] };
    case "SAVE_HISTORY":
      return { ...state, history: [...state.history, action.payload], historyIndex: state.history.length + 1 };
    case "HISTORY_UP": {
      const next = Math.max(0, state.historyIndex - 1);
      return { ...state, historyIndex: next, input: state.history[next] || "" };
    }
    case "HISTORY_DOWN": {
      const next = Math.min(state.history.length, state.historyIndex + 1);
      return { ...state, historyIndex: next, input: state.history[next] || "" };
    }
    default:
      return state;
  }
}

export function useTerminal(onCommand) {
  const [state, dispatch] = useReducer(terminalReducer, initialTerminal);
  const outputRef = useRef(null);

  const submit = useCallback(() => {
    if (!state.input.trim()) return;
    const cmd = state.input.trim();
    dispatch({ type: "PUSH_LINE", payload: `$ ${cmd}` });
    dispatch({ type: "SAVE_HISTORY", payload: cmd });
    dispatch({ type: "SET_INPUT", payload: "" });
    const result = onCommand(cmd);
    dispatch({ type: "PUSH_LINE", payload: result });
    queueMicrotask(() => {
      if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
    });
  }, [state.input, onCommand]);

  const controls = useMemo(
    () => ({
      onInput: (v) => dispatch({ type: "SET_INPUT", payload: v }),
      onUp: () => dispatch({ type: "HISTORY_UP" }),
      onDown: () => dispatch({ type: "HISTORY_DOWN" }),
      submit,
    }),
    [submit]
  );

  return { state, controls, outputRef };
}
