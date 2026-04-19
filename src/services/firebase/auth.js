import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "./client";

export async function signUp({ email, password, firstName, lastName, username }) {
  if (!auth) return { data: null, error: new Error("Firebase not configured") };
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = `${firstName} ${lastName}`.trim();
    await updateProfile(cred.user, { displayName });
    await sendEmailVerification(cred.user);
    return {
      data: {
        user: {
          id: cred.user.uid,
          email: cred.user.email,
          emailVerified: cred.user.emailVerified,
          user_metadata: { first_name: firstName, last_name: lastName, username },
        },
        session: cred.user.emailVerified ? { user: cred.user } : null,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signIn(email, password) {
  if (!auth) return { data: null, error: new Error("Firebase not configured") };
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (!cred.user.emailVerified) {
      await sendEmailVerification(cred.user);
      await firebaseSignOut(auth);
      return { data: null, error: new Error("Email not confirmed") };
    }
    return { data: { user: cred.user }, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function resendSignupVerification() {
  if (!auth) return { data: null, error: new Error("Firebase not configured") };
  if (!auth.currentUser) return { data: null, error: new Error("No active user session to resend verification.") };
  try {
    await sendEmailVerification(auth.currentUser);
    return { data: true, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function signInWithGoogle() {
  if (!auth) return { data: null, error: new Error("Firebase not configured") };
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    return { data: { user: cred.user }, error: null };
  } catch (error) {
    const code = String(error?.code || "");
    if (
      code === "auth/popup-blocked" ||
      code === "auth/popup-closed-by-user" ||
      code === "auth/cancelled-popup-request"
    ) {
      await signInWithRedirect(auth, googleProvider);
      return { data: { redirect: true }, error: null };
    }
    return { data: null, error };
  }
}

export async function getSession() {
  if (!auth) return { data: { session: null }, error: null };
  return { data: { session: auth.currentUser ? { user: auth.currentUser } : null }, error: null };
}

export function onAuthStateChange(callback) {
  if (!auth) return { data: { subscription: { unsubscribe: () => {} } } };
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback("AUTH_STATE_CHANGE", user ? { user } : null);
  });
  return { data: { subscription: { unsubscribe } } };
}

export async function signOut() {
  if (!auth) return { error: null };
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error };
  }
}
