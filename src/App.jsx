// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import Books from "./Pages/Books.jsx";
import AccountPage from "./Pages/Account.jsx";
import NotFound from "./Pages/NotFound.jsx";
import BookDetails from "./Pages/BookDetails.jsx"; // make sure the file is under Pages
import NavBar from "./Components/NavBar.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
