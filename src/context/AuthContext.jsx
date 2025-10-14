import { createContext, useState, useContext, useEffect } from "react";
import { registerUser, loginUser, authenticate } from "../API/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // === State ===
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  // === REGISTER ===
  const handleRegister = async (firstname, lastname, email, password) => {
    setError("");
    try {
      const result = await registerUser(firstname, lastname, email, password);
      if (result.error) throw new Error(result.error);
      return result;
    } catch (err) {
      const msg = err.message || "Registration failed.";
      console.error("Register error:", msg);
      setError(msg);
      throw err;
    }
  };

  // === LOGIN ===
  const handleLogin = async (email, password) => {
    setError("");
    try {
      const result = await loginUser(email, password);
      if (result.error || !result.token)
        throw new Error(result.error || "Login failed.");

      setToken(result.token);
      localStorage.setItem("token", result.token);
      setVerified(true);
      return result.token;
    } catch (err) {
      const msg = err.message || "Login failed.";
      console.error("Login error:", msg);
      setError(msg);
      throw err;
    }
  };

  // === AUTHENTICATE TOKEN ===
  const verifyToken = async () => {
    if (!token) return;
    setError("");

    try {
      const result = await authenticate(token);
      if (result.error) throw new Error(result.error);
      setVerified(true);
    } catch (err) {
      const msg = err.message || "Authentication failed.";
      console.error("Auth error:", msg);
      setError(msg);
      setVerified(false);
    }
  };

  // === LOGOUT ===
  const logout = () => {
    setToken(null);
    setVerified(false);
    localStorage.removeItem("token");
    setError("");
  };

  // === STATUS ===
  const isLoggedIn = () => !!token && verified;

  // === Auto-verify on load ===
  useEffect(() => {
    if (token) verifyToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        verified,
        error,
        handleRegister,
        handleLogin,
        verifyToken,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// === Custom hook ===
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
