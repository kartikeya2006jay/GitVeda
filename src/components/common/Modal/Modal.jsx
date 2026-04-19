export default function Modal({ open, title, children }) {
  if (!open) return null;
  return (
    <div className="gy-modal">
      <div className="gy-card">
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}
