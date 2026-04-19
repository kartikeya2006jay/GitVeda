import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

function prettyOAuthError(message) {
  if (!message) return "";
  const msg = message.toLowerCase();
  if (msg.includes("auth/configuration-not-found")) {
    return "Google auth config not found. In Firebase Console: Authentication -> Sign-in method -> enable Google, set project support email, and save.";
  }
  if (message.toLowerCase().includes("operation-not-allowed")) {
    return "Google sign-in is disabled in Firebase. Enable Google provider in Firebase Console -> Authentication -> Sign-in method.";
  }
  if (msg.includes("auth/unauthorized-domain")) {
    return "This domain is not authorized. Add localhost to Firebase Authentication -> Settings -> Authorized domains.";
  }
  return message;
}

export default function Login() {
  const { login, loginWithGoogle, resendVerification, user, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const urlError = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return prettyOAuthError(params.get("error_description") || params.get("error") || "");
  }, []);

  useEffect(() => {
    if (user) nav("/dashboard", { replace: true });
  }, [user, nav]);

  return (
    <main className="gy-auth gy-auth-scene">
      <span className="gy-orb gy-orb-1" />
      <span className="gy-orb gy-orb-2" />
      <span className="gy-orb gy-orb-3" />
      <span className="gy-orb gy-orb-4" />

      <form
        className="gy-card gy-auth-card gy-auth-glass gy-auth-centered"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setMessage("");
          const { error: err } = await login(email, password);
          if (err) {
            if (String(err.message).toLowerCase().includes("email not confirmed")) {
              setError("Your email is not verified yet.");
              return;
            }
            return setError(err.message);
          }
          nav("/dashboard", { replace: true });
        }}
      >
        <h2 className="gy-auth-title gy-auth-title-clean">LOGIN</h2>
        <p className="gy-muted">Sign in to continue your GitYatra journey.</p>

        {urlError ? <p className="gy-alert">{urlError}</p> : null}
        {error ? <p className="gy-alert">{error}</p> : null}
        {message ? <p className="gy-success">{message}</p> : null}

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="email"
          placeholder="you@example.com"
          type="email"
          required
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          aria-label="password"
          placeholder="Enter password"
          required
        />

        <button className="gy-btn gy-btn-auth" type="submit" disabled={loading}>Login</button>
        {error === "Your email is not verified yet." ? (
          <button
            className="gy-btn gy-btn-light"
            type="button"
            onClick={async () => {
              setMessage("");
              const { error: resendError } = await resendVerification(email.trim());
              if (resendError) {
                setError(resendError.message);
                return;
              }
              setMessage("Verification email resent. Please check inbox/spam.");
            }}
            disabled={loading || !email.trim()}
          >
            Resend verification email
          </button>
        ) : null}
        <button
          className="gy-btn gy-btn-light gy-btn-auth"
          type="button"
          onClick={async () => {
            setError("");
            const { error: err } = await loginWithGoogle();
            if (err) setError(prettyOAuthError(err.message));
          }}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="gy-auth-links">
          New here? <Link to="/auth/signup">Create account</Link>
        </p>
      </form>
    </main>
  );
}
