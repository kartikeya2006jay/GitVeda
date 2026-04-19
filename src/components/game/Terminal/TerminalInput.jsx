export default function TerminalInput({ value, onChange, onKeyDown }) {
  return <input aria-label="Terminal input" className="gy-term-input" value={value} onChange={onChange} onKeyDown={onKeyDown} />;
}
