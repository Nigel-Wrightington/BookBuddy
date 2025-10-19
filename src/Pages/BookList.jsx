import { useEffect, useState } from "react";
import { fetchBooks } from "../API/api";
import { Link } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);

  // Load all books once when the page mounts
  useEffect(() => {
    async function loadBooks() {
      const result = await fetchBooks();
      if (!result.error) setBooks(result);
      else console.error(result.error);
    }
    loadBooks();
  }, []);

  return (
    <div className="books-list">
      <h1>Book Buddy Library</h1>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {/* ✅ Correct route link */}
            <Link to={`/books/${book.id}`}>
              {book.coverimage && (
                <img
                  src={book.coverimage}
                  alt={book.title}
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "6px",
                    marginBottom: "0.5rem",
                  }}
                />
              )}
              <h3>{book.title}</h3>
            </Link>

            <p>Author: {book.author}</p>
            <p>Available: {book.available ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
