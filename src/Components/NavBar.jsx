import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* === Left side: Home === */}
        <div className="nav-left">
          <NavLink to="/" end className="brand">
            <strong>Book Buddy</strong>
          </NavLink>
          {user && (
            <NavLink to="/account" className="nav-link">
              My Account
            </NavLink>
          )}
        </div>

        {/* === Right side: Auth links === */}
        <div className="nav-right">
          {user ? (
            <button onClick={logout} className="logout-btn">
              Log Out
            </button>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Log In
              </NavLink>
              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
