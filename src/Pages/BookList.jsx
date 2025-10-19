import { useEffect, useState } from "react";
import { fetchBooks } from "../API/api";
import { Link } from "react-router-dom";

export default function BookList() {
  // Store all books fetched from the API
  const [books, setBooks] = useState([]);

  // Load all books when the page first opens
  useEffect(() => {
    async function loadBooks() {
      const result = await fetchBooks();

      // If successful, store books in state
      if (!result.error) setBooks(result);
      else console.error(result.error);
    }

    loadBooks();
  }, []); // Empty dependency array = run only once

  return (
    <div className="books-list">
      <h1>Book Buddy Library</h1>

      {/* Display books in a responsive grid layout */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {/* Link to the details page for each book */}
            <Link to={`/books/${book.id}`}>
              {/* Show book cover image if available */}
              {book.coverimage && (
                <img
                  src={book.coverimage}
                  alt={book.title}
                  style={{
                    width: "100px",
                    height: "auto",
                    borderRadius: "6px",
                    marginBottom: "0.5rem",
                  }}
                />
              )}

              <h3>{book.title}</h3>
            </Link>

            {/* Show basic book info */}
            <p>Author: {book.author}</p>
            <p>Available: {book.available ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
