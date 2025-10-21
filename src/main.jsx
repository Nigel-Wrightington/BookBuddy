// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css"; // <- make sure the case matches the real filename
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
