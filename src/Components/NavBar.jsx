import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* === Left side === */}
        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          {user && <NavLink to="/account">My Account</NavLink>}
        </div>

        {/* === Right side === */}
        <div className="nav-actions">
          {user ? (
            <button onClick={logout} className="logout-btn">
              Log Out
            </button>
          ) : (
            <>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
