import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Access auth functions and state from context
  const { handleLogin, error } = useAuth();

  // Hook to navigate after successful login
  const navigate = useNavigate();

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await handleLogin(email, password);

    // If login succeeded, go to account page
    if (!result.error) {
      navigate("/account");
    } else {
      console.error("Login failed:", result.error);
    }
  }

  return (
    <div className="form-container">
      <h2>Log In</h2>

      {/* Show error message if login fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>
      </form>

      {/* Optional quick link to registration */}
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            border: "none",
            background: "none",
            color: "#0077cc",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Register
        </button>
      </p>
    </div>
  );
}
