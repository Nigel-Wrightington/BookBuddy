import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBookById } from "../api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function getBook() {
      const data = await fetchBookById(id);
      setBook(data);
    }
    getBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Available:</strong> {book.available ? "Yes" : "No"}</p>
      <button disabled={!book.available}>Reserve</button>
    </div>
  );
}
