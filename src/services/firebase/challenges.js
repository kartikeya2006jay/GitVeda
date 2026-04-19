import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./client";

export async function listChallenges() {
  if (!db) return { data: [], error: null };
  try {
    const q = query(collection(db, "challenges"), orderBy("level_required", "asc"));
    const snap = await getDocs(q);
    return { data: snap.docs.map((d) => ({ id: d.id, ...d.data() })), error: null };
  } catch (error) {
    return { data: [], error };
  }
}

