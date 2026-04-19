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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
      {/* Floating 3D orbs */}
      <span className="gy-orb gy-orb-1" />
      <span className="gy-orb gy-orb-2" />
      <span className="gy-orb gy-orb-3" />
      <span className="gy-orb gy-orb-4" />
      <span className="gy-orb gy-orb-5" />

      <form
        className="gy-login-card"
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
        <h2 className="gy-login-title">LOGIN</h2>

        {urlError ? <p className="gy-alert">{urlError}</p> : null}
        {error ? <p className="gy-alert">{error}</p> : null}
        {message ? <p className="gy-success">{message}</p> : null}

        <div className="gy-field-group">
          <label className="gy-field-label">Email address</label>
          <input
            className="gy-field-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
            placeholder=""
            type="email"
            required
          />
        </div>

        <div className="gy-field-group">
          <label className="gy-field-label">Password</label>
          <div className="gy-input-wrapper">
            <input
              className="gy-field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              aria-label="password"
              placeholder=""
              required
            />
            <button
              type="button"
              className="gy-eye-btn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="gy-login-row">
          <label className="gy-remember-label">
            <input
              type="checkbox"
              className="gy-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <Link to="/auth/forgot-password" className="gy-forgot-link">Forgot password?</Link>
        </div>

        <button className="gy-signin-btn" type="submit" disabled={loading}>
          {loading ? "Signing in…" : "SIGN IN"}
        </button>

        {error === "Your email is not verified yet." ? (
          <button
            className="gy-btn gy-btn-light"
            style={{ width: "100%", marginTop: "0.5rem" }}
            type="button"
            onClick={async () => {
              setMessage("");
              const { error: resendError } = await resendVerification(email.trim());
              if (resendError) { setError(resendError.message); return; }
              setMessage("Verification email resent. Please check inbox/spam.");
            }}
            disabled={loading || !email.trim()}
          >
            Resend verification email
          </button>
        ) : null}

        <button
          className="gy-google-btn"
          type="button"
          onClick={async () => {
            setError("");
            const { error: err } = await loginWithGoogle();
            if (err) setError(prettyOAuthError(err.message));
          }}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <p className="gy-login-footer">
          New here? <Link to="/auth/signup">Create account</Link>
        </p>
      </form>
    </main>
  );
}
