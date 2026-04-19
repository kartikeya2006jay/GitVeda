export default function Button({ children, ...props }) {
  return (
    <button className="gy-btn" {...props}>
      {children}
    </button>
  );
}
