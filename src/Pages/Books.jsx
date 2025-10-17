import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";

export default function Home() {
  const { verified, logout } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // === Fetch all books on mount ===
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        const result = await response.json();
        console.log("Fetched books:", result);
        setBooks(result.books || []);
        setFiltered(result.books || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  // === Debounced search ===
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
    }, 300);

    return () => clearTimeout(timer);
  }, [query, books]);

  // === Loading & error states ===
  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
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

        {filtered.length === 0 && query && (
          <p>No results found for "{query}".</p>
        )}

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
      <div>
        {verified ? (
          <>
            <h1>Welcome to the website!</h1>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => navigate("/login")}>
              Log in
            </button>
            <h1>Please log in to access the app.</h1>
          </>
        )}
      </div>
    </>
  );
}
