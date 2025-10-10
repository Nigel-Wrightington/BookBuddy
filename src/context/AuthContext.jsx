import { createContext, useState, useContext } from "react";
import { register, authenticate } from "../API/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(""); //use to display error messages

  async function registerUser(firstName, lastName, email, password) {
    setError("");
    try {
      const { token } = await register(firstName, lastName, email, password);
      setToken(token);
      localStorage.setItem("token", token);
      setVerified(false); // User needs to verify after registration
    } catch (error) {
      setError(error.message || "Registration failed");
      throw error;
    }
  }

  async function authenticateUser() {
    setError("");
    try {
      if (!token) {
        throw new Error("No token found! Please log in.");
      }
      await authenticate(token);
      setVerified(true);
    } catch (error) {
      setError(error.message || "Authentication failed");
    }
  }

  async function logout() {
    setToken(null);
    setVerified(false);
    localStorage.removeItem("token");
    setError("");
  }

  return (
    <AuthContext.Provider
      value={{ token, verified, error, registerUser, authenticateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be within <AuthProvider>");
  }
  return context;
}
