// src/Pages/BookDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchBookById, reserveBook, returnBook } from "../API/api";

export default function BookDetails() {
  const { id } = useParams(); // Get book ID from URL
  const { token } = useAuth(); // Access user token
  const [book, setBook] = useState(null); // Book info
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch book details when the page loads or ID changes
  useEffect(() => {
    async function loadBook() {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setMessage("Could not load book details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadBook();
  }, [id]);

  // Reserve a book
  async function handleReserve() {
    if (!token) {
      setMessage("You must be logged in to reserve a book.");
      return;
    }
    try {
      const result = await reserveBook(book.id, token);
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage("Book reserved successfully!");
        const updated = await fetchBookById(id); // Refresh book status
        setBook(updated);
      }
    } catch (error) {
      console.error("Error reserving book:", error);
      setMessage("Something went wrong while reserving.");
    }
  }

  // Return a reserved book
  async function handleReturn() {
    if (!token) {
      setMessage("You must be logged in to return a book.");
      return;
    }
    try {
      const result = await returnBook(book.reservationId, token);
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage("Book returned successfully!");
        const updated = await fetchBookById(id); // Refresh book status
        setBook(updated);
      }
    } catch (error) {
      console.error("Error returning book:", error);
      setMessage("Something went wrong while returning.");
    }
  }

  // === Display states ===
  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  // === Page layout ===
  return (
    <div className="book-details">
      <h2>{book.title}</h2>

      {book.coverimage && (
        <img
          src={book.coverimage}
          alt={book.title}
          width="200"
          height="300"
          className="book-cover"
        />
      )}

      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Available:</strong> {book.available ? "Yes" : "No"}
      </p>

      {book.available ? (
        <button
          onClick={handleReserve}
          disabled={!token}
          className="reserve-btn"
        >
          {token ? "Reserve Book" : "Log in to reserve"}
        </button>
      ) : (
        <button onClick={handleReturn} disabled={!token} className="return-btn">
          {token ? "Return Book" : "Log in to return"}
        </button>
      )}

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}
