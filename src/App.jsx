import { Suspense, lazy } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Loading from "./components/common/Loading/Loading";
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./hooks";

const Home = lazy(() => import("./pages/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Challenges = lazy(() => import("./pages/Learn/Learn")); // Using Learn as Challenges for now
const GitCheatNotes = lazy(() => import("./pages/CheatNotes/CheatNotes"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const ChallengeRunner = lazy(() => import("./pages/Challenge/Challenge"));

function Private({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      {user ? (
        <header className="gy-topbar">
          <Link className="gy-brand" to="/">
            <span className="gy-brand-badge">GY</span>
            <span>GitVeda</span>
          </Link>
          <nav className="gy-nav">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/challenges">Challenges</NavLink>
            <NavLink to="/git-cheat-notes">Git Cheat Notes</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </nav>
          <button className="gy-btn gy-btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', textTransform: 'none' }} onClick={logout} type="button">Logout</button>
        </header>
      ) : null}

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<Private><Home /></Private>} />
          <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
          <Route path="/challenges" element={<Private><Challenges /></Private>} />
          <Route path="/git-cheat-notes" element={<Private><GitCheatNotes /></Private>} />
          <Route path="/profile" element={<Private><Profile /></Private>} />
          <Route path="/challenge/:id" element={<Private><ChallengeRunner /></Private>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
