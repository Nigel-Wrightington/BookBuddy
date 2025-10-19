import { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser, authenticate } from "../API/api";

// Create a shared context to store authentication info
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Store token and user info
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Register new user
  async function handleRegister(firstname, lastname, email, password) {
    const result = await registerUser(firstname, lastname, email, password);
    if (result.error) setError(result.error);
    return result;
  }

  // Log in existing user
  async function handleLogin(email, password) {
    const result = await loginUser(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      localStorage.setItem("token", result.token);
      setToken(result.token);
      setError("");
    }
    return result;
  }

  // Verify token and fetch user info
  async function verifyUser() {
    if (!token) return;
    const result = await authenticate(token);
    if (result.error) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } else {
      setUser(result);
    }
  }

  // Log out and clear saved data
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  // Automatically verify user when app loads
  useEffect(() => {
    verifyUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        error,
        handleRegister,
        handleLogin,
        verifyUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access authentication state from any component
export function useAuth() {
  return useContext(AuthContext);
}
