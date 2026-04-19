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

      <form
        className="gy-card gy-auth-card gy-auth-glass gy-auth-centered"
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
        <h2 className="gy-auth-title gy-auth-title-clean">SIGN UP</h2>
        <p className="gy-muted">Get access to challenges, XP tracking, and live progress.</p>

        {error ? <p className="gy-alert">{error}</p> : null}
        {message ? <p className="gy-success">{message}</p> : null}
        {verificationPending ? (
          <button
            className="gy-btn gy-btn-light"
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

        <label>First Name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />

        <label>Last Name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />

        <label>Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="username"
          placeholder="e.g. kartikeya_2006"
          required
        />

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
          placeholder="Minimum 6 characters"
          minLength={6}
          required
        />

        <button className="gy-btn gy-btn-auth" type="submit" disabled={loading}>Create account</button>
        <button
          className="gy-btn gy-btn-light gy-btn-auth"
          type="button"
          onClick={async () => {
            setError("");
            const { error: oauthErr } = await loginWithGoogle();
            if (oauthErr) setError(prettyOAuthError(oauthErr.message));
          }}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="gy-auth-links">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>
    </main>
  );
}
