import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById, reserveBook, returnBook } from "../API/api";
import { useAuth } from "../context/AuthContext";

export default function BookDetails() {
  // Get the book ID from the URL (e.g., /books/:id)
  const { id } = useParams();

  // Access user token from context
  const { token } = useAuth();

  // Local state for book data, status messages, and loading
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Load book details when the page first renders or ID changes
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

  // Handle book reservation
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

        // Refresh the book data to reflect new availability
        const updated = await fetchBookById(id);
        setBook(updated);
      }
    } catch (error) {
      console.error("Error reserving book:", error);
      setMessage("Something went wrong while reserving.");
    }
  }

  // Handle book return
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

        // Refresh the book info after returning
        const updated = await fetchBookById(id);
        setBook(updated);
      }
    } catch (error) {
      console.error("Error returning book:", error);
      setMessage("Something went wrong while returning.");
    }
  }

  // Display loading or error states
  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-details">
      {/* Title and image */}
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

      {/* Book info */}
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Available:</strong> {book.available ? "Yes" : "No"}
      </p>

      {/* Action buttons */}
      {book.available ? (
        <button
          onClick={handleReserve}
          disabled={!token}
          className="reserve-btn"
        >
          {token ? "Reserve Book" : "Log in to reserve"}
        </button>
      ) : (
        <button
          onClick={handleReturn}
          disabled={!token}
          className="return-btn"
        >
          {token ? "Return Book" : "Log in to return"}
        </button>
      )}

      {/* Display status message (success/error) */}
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}
