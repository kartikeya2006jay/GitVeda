import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./client";

export async function getProgress(userId) {
  if (!db) return { data: [], error: null };
  try {
    const q = query(collection(db, "user_progress"), where("user_id", "==", userId));
    const snap = await getDocs(q);
    return { data: snap.docs.map((d) => ({ id: d.id, ...d.data() })), error: null };
  } catch (error) {
    return { data: [], error };
  }
}

