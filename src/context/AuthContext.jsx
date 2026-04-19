import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSession, onAuthStateChange, resendSignupVerification, signIn, signInWithGoogle, signOut, signUp } from "../services/firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data?.session?.user ?? null);
      setLoading(false);
    });

    const { data } = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      data?.subscription?.unsubscribe?.();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async login(email, password) {
        setLoading(true);
        const out = await signIn(email, password);
        setLoading(false);
        return out;
      },
      async register(payload) {
        setLoading(true);
        const out = await signUp(payload);
        setLoading(false);
        return out;
      },
      async loginWithGoogle() {
        setLoading(true);
        const out = await signInWithGoogle();
        setLoading(false);
        return out;
      },
      async resendVerification(email) {
        setLoading(true);
        const out = await resendSignupVerification(email);
        setLoading(false);
        return out;
      },
      async logout() {
        setLoading(true);
        await signOut();
        setUser(null);
        setLoading(false);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used in AuthProvider");
  return ctx;
}
