import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  // State for form fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Access registration logic and errors from context
  const { handleRegister, error } = useAuth();

  // Used to navigate after successful registration
  const navigate = useNavigate();

  // Handle registration form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const result = await handleRegister(firstname, lastname, email, password);

    // If registration worked, go to login page
    if (!result.error) {
      navigate("/login");
    } else {
      console.error("Registration failed:", result.error);
    }
  }

  return (
    <div className="form-container">
      <h2>Register</h2>

      {/* Show an error message if registration fails */}
      {error && <p className="error-message">{error}</p>}

      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>
      </form>

      {/* Link to login page */}
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            border: "none",
            background: "none",
            color: "#0077cc",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Log in
        </button>
      </p>
    </div>
  );
}
