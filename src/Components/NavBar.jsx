import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // From Context //

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!token; // Boolean value T or F //

  return (
    <header>
      <nav className="navbar">
        {/* Home */}
        <NavLink to="/books" className="brand">
          Book Buddy - Home
        </NavLink>

        {!isLoggedIn ? (
          <>
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/account" className="nav-link">
              Account
            </NavLink>
            <button
              className="nav-button"
              onClick={() => {
                logout();
                navigate("/books");
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
