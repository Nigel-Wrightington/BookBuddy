import { Routes, Route, Link } from "react-router-dom";
import BooksList from "./Pages/BookList";
import BookDetails from "./Pages/BookDetails";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/RegisterPage";

export default function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/account">Account</Link>
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}
