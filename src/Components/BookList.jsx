import { useEffect, useState } from "react";
import { fetchBooks } from "../api";
import { Link } from "react-router-dom";

export default function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const allBooks = await fetchBooks();
      setBooks(allBooks);
    }
    getBooks();
  }, []);

  return (
    <div className="books-list">
      <h1>Book Buddy Library</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <p>Author: {book.author}</p>
            <p>Available: {book.available ? "Y" : "N"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
