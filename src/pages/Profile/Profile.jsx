import { useAuth } from "../../hooks";

export default function Profile() {
  const { user } = useAuth();
  return (
    <main className="gy-grid gy-grid-2">
      <section className="gy-card">
        <h2>Profile</h2>
        <p className="gy-muted">Signed in as</p>
        <p>{user?.email || "Anonymous"}</p>
      </section>
      <section className="gy-card">
        <h3>Next Milestone</h3>
        <p>Complete 3 branch challenges to unlock Branch Master badge.</p>
      </section>
    </main>
  );
}
