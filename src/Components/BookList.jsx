import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books on mount
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        const result = await response.json();
        setBooks(result.books || []);
        setFiltered(result.books || []);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // Debounced search // 300 mil sec debounce option to wait //
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setFiltered(books);
      } else {
        const results = books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(results);
      }
    }, 300); // 300 mil sec debounce option to wait //

    return () => clearTimeout(timer);
  }, [query, books]);

  // Loading state //
  if (loading) return <p>Loading books...</p>;

  // Error state Debounce //
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Book Catalog</h1>

      <div>
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <button onClick={() => setQuery("")}>Clear</button>}
      </div>

      {filtered.length === 0 && query && <p>No results found for "{query}".</p>}

      <ul>
        {filtered.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              <strong>{book.title}</strong> — {book.author}
            </Link>
            <p>{book.available ? "Available" : "Checked Out"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
