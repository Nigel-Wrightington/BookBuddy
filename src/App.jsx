import { Routes, Route } from "react-router";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/RegisterPage";
import Home from "./Pages/Books";
import AccountPage from "./Pages/Account";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
}
