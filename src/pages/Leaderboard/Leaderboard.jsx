import { useLeaderboard } from "../../hooks";

export default function Leaderboard() {
  const rows = useLeaderboard();

  return (
    <main className="gy-card">
      <h2>Leaderboard</h2>
      {!rows.length ? <p>No leaderboard data yet.</p> : null}
      {rows.length ? (
        <div className="gy-table-wrap">
          <table className="gy-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>XP</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.id || idx}>
                  <td>#{idx + 1}</td>
                  <td>{r.username || "Anonymous"}</td>
                  <td>{r.xp ?? 0}</td>
                  <td>{r.level ?? 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </main>
  );
}
