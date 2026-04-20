import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { upsertProfile } from "../../services/firebase/users";

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

export default function Signup() {
  const { register, loginWithGoogle, resendVerification, user, loading } = useAuth();
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [verificationPending, setVerificationPending] = useState(false);

  useEffect(() => {
    if (user) nav("/dashboard", { replace: true });
  }, [user, nav]);

  return (
    <main className="gy-auth gy-auth-scene">
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

          const cleanUsername = username.trim().toLowerCase();
          if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {
            setError("Username must be 3-20 chars using lowercase letters, numbers, or underscore.");
            return;
          }

          const { data, error: err } = await register({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: cleanUsername,
            email: email.trim(),
            password,
          });

          if (err) return setError(err.message);

          const createdUser = data?.user;
          if (createdUser?.id) {
            await upsertProfile({
              id: createdUser.id,
              username: cleanUsername,
              firstName: firstName.trim(),
              lastName: lastName.trim(),
            });
          }

          if (data?.session) {
            nav("/dashboard", { replace: true });
            return;
          }

          setVerificationPending(true);
          setMessage("Account created. Verification email sent. Please verify your email, then sign in.");
        }}
      >
        <h2 className="gy-login-title">SIGN UP</h2>
        <p className="gy-muted" style={{ textAlign: 'center', fontSize: '0.85rem', marginBottom: '1.5rem', opacity: 0.8 }}>
          Get access to challenges, XP tracking, and live progress.
        </p>

        {error ? <p className="gy-alert">{error}</p> : null}
        {message ? <p className="gy-success">{message}</p> : null}

        {verificationPending ? (
          <button
            className="gy-btn gy-btn-light"
            style={{ width: "100%", marginBottom: "1rem" }}
            type="button"
            onClick={async () => {
              setError("");
              const { error: resendError } = await resendVerification(email.trim());
              if (resendError) {
                setError(resendError.message);
                return;
              }
              setMessage("Verification email resent. Please check inbox/spam.");
            }}
            disabled={loading}
          >
            Resend verification email
          </button>
        ) : null}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="gy-field-group">
            <label className="gy-field-label">First Name</label>
            <input
              className="gy-field-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
            />
          </div>
          <div className="gy-field-group">
            <label className="gy-field-label">Last Name</label>
            <input
              className="gy-field-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div className="gy-field-group">
          <label className="gy-field-label">Username</label>
          <input
            className="gy-field-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="username"
            placeholder="e.g. kartikeya_2006"
            required
          />
        </div>

        <div className="gy-field-group">
          <label className="gy-field-label">Email</label>
          <input
            className="gy-field-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="email"
            placeholder="you@example.com"
            type="email"
            required
          />
        </div>

        <div className="gy-field-group">
          <label className="gy-field-label">Password</label>
          <input
            className="gy-field-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            aria-label="password"
            placeholder="Minimum 6 characters"
            minLength={6}
            required
          />
        </div>

        <button className="gy-signin-btn" style={{ marginTop: '1rem' }} type="submit" disabled={loading}>
          {loading ? "CREATING..." : "CREATE ACCOUNT"}
        </button>

        <button
          className="gy-google-btn"
          type="button"
          onClick={async () => {
            setError("");
            const { error: oauthErr } = await loginWithGoogle();
            if (oauthErr) setError(prettyOAuthError(oauthErr.message));
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
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
}
