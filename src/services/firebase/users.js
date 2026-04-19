import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./client";

export async function getProfile(userId) {
  if (!db) return { data: null, error: new Error("Firebase not configured") };
  try {
    const ref = doc(db, "profiles", userId);
    const snap = await getDoc(ref);
    return { data: snap.exists() ? { id: snap.id, ...snap.data() } : null, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function upsertProfile({ id, username, firstName, lastName }) {
  if (!db) return { data: null, error: new Error("Firebase not configured") };
  try {
    const ref = doc(db, "profiles", id);
    const payload = {
      username,
      first_name: firstName,
      last_name: lastName,
      updated_at: serverTimestamp(),
    };
    await setDoc(ref, payload, { merge: true });
    return { data: { id, ...payload }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

