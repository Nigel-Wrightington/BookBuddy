import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <h1>404 — Page not found</h1>
      <p className="muted">The page you were looking for doesn’t exist.</p>
      <Link to="/books">
        <button>Back to Book Buddy</button>
      </Link>
    </div>
  );
}
