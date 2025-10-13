import { createContext, useState, useContext, useEffect } from "react";
import { register, login, authenticate } from "../API/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  // REGISTER
  async function registerUser(firstName, lastName, email, password) {
    setError("");
    try {
      await register(firstName, lastName, email, password);
    } catch (error) {
      setError(error.message || "Registration failed");
      throw error;
    }
  }

  // LOGIN
  async function loginUser(email, password) {
    setError("");
    try {
      const { token } = await login(email, password);
      setToken(token);
      localStorage.setItem("token", token);
      setVerified(true);
    } catch (error) {
      setError(error.message || "Login failed");
      throw error;
    }
  }

  // AUTHENTICATE TOKEN
  async function authenticateUser() {
    setError("");
    try {
      if (!token) throw new Error("No token found. Please log in.");
      await authenticate(token);
      setVerified(true);
    } catch (error) {
      setError(error.message || "Authentication failed");
      setVerified(false);
    }
  }

  // CHECK IF USER IS LOGGED IN LOGIC
  function isLoggedIn() {
    return !!token && verified;
  }

  // LOGOUT
  function logout() {
    setToken(null);
    setVerified(false);
    localStorage.removeItem("token");
    setError("");
  }

  // Auto-verify token on page reload
  useEffect(() => {
    if (token) {
      authenticateUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        verified,
        error,
        registerUser,
        loginUser,
        isLoggedIn,
        authenticateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
