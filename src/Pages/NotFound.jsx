import { Link } from "react-router-dom";
// for instant navbar navigation //

export default function NotFound() {
  return (
    <div ClassName="notfound">
      {/* for css ; "notfound" */}
      <h1>Error 404 - Page Not Found</h1>
      <p className="error"> The page you're looking for does not exist!</p>
      {/* for css ; "error" */}

      <Link to="/books">
        {/* link tags for react components instead if html <a> */}
        <button ClassName="return-btn">Return to Book Buddy</button>
      </Link>
    </div>
  );
}
