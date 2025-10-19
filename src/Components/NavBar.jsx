import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  // Access user info and logout function from context
  const { user, logout } = useAuth();

  return (
    <nav className="nav">
      {/* === Navigation Links === */}
      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* If logged in, show account + logout options */}
        {user ? (
          <>
            <Link to="/account">My Account</Link>
            <button onClick={logout} className="logout-btn">
              Log Out
            </button>
          </>
        ) : (
          /* If not logged in, show login/register options */
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
