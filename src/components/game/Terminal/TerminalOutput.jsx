export default function TerminalOutput({ lines, outputRef }) {
  return (
    <div className="gy-term-out" ref={outputRef}>
      {lines.map((line, idx) => (
        <pre key={`${line}-${idx}`}>{line}</pre>
      ))}
    </div>
  );
}
