import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./client";

export async function getLeaderboard() {
  if (!db) return { data: [], error: null };
  try {
    const q = query(collection(db, "profiles"), orderBy("xp", "desc"), limit(100));
    const snap = await getDocs(q);
    const data = snap.docs.map((d, idx) => ({ id: d.id, rank: idx + 1, ...d.data() }));
    return { data, error: null };
  } catch (error) {
    return { data: [], error };
  }
}

