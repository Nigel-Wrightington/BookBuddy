// src/Pages/Books.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../API/api";

// A simple placeholder image (you can swap this URL anytime)
const PLACEHOLDER = "https://via.placeholder.com/600x900?text=No+Cover";

function getCoverUrl(book) {
  // Try multiple likely keys from the API/data
  let url =
    book.coverimage || book.coverImage || book.image || book.cover || "";

  // If empty or not a string, return placeholder
  if (!url || typeof url !== "string") return PLACEHOLDER;

  // Force https to avoid mixed-content blocks
  if (url.startsWith("http://")) {
    url = "https://" + url.slice(7);
  }

  return url;
}

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // === Fetch all books on mount ===
  useEffect(() => {
    async function loadBooks() {
      try {
        const result = await fetchBooks();
        const list = result?.books ?? result ?? [];
        setBooks(list);
        setFiltered(list);
        // Debug one item to ensure keys look right:
        if (list?.length)
          console.log("Sample book keys:", Object.keys(list[0]));
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  // === Debounced search ===
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setFiltered(books);
      } else {
        const q = query.toLowerCase();
        setFiltered(
          books.filter((b) => (b.title || "").toLowerCase().includes(q))
        );
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, books]);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="books-list">
      <h1>Book Buddy Library</h1>

      {/* Search */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "60%",
            maxWidth: "400px",
            marginRight: "0.5rem",
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{
              padding: "0.5rem 0.75rem",
              border: "none",
              borderRadius: "6px",
              background: "#0b63d1",
              color: "white",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 && query && <p>No results found for “{query}”.</p>}

      {/* Books grid */}
      <ul>
        {filtered.map((book) => {
          const img = getCoverUrl(book);
          return (
            <li key={book.id}>
              <Link to={`/books/${book.id}`} className="book-card">
                {/* Cover image (with robust fallbacks) */}
                <img
                  className="book-thumb"
                  src={img}
                  alt={book.title || "Book cover"}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== PLACEHOLDER) {
                      e.currentTarget.src = PLACEHOLDER;
                    }
                  }}
                />

                {/* Card content */}
                <div className="book-meta">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <span className="badge">
                    {book.available ? "Available" : "Checked Out"}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
