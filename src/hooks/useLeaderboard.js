import { useEffect, useMemo, useState } from "react";
import { getLeaderboard } from "../services/firebase/leaderboard";

export function useLeaderboard() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getLeaderboard().then(({ data }) => setRows(data || []));
  }, []);

  const sorted = useMemo(() => [...rows].sort((a, b) => (b.xp || 0) - (a.xp || 0)), [rows]);
  return sorted;
}
