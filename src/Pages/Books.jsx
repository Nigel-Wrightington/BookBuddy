import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, returnBook } from "../API/api";

export default function Account() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // === Fetch user profile ===
  const loadProfile = async () => {
    if (!token) return;
    try {
      const profile = await fetchUserProfile(token);
      setUser(profile);
      setMessage("");
    } catch (err) {
      console.error("Error loading profile:", err);
      setError("Failed to load account information.");
    } finally {
      setLoading(false);
    }
  };

  // === Handle book return ===
  const handleReturn = async (reservationId) => {
    if (!token) return;
    try {
      const result = await returnBook(reservationId, token);
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage("Book returned successfully!");
        await loadProfile();
      }
    } catch (err) {
      console.error("Error returning book:", err);
      setMessage("Something went wrong while returning the book.");
    }
  };

  // === Load profile or redirect if not logged in ===
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      loadProfile();
    }
  }, [token, navigate]);

  // === Conditional rendering ===
  if (loading) return <p>Loading account info...</p>;
  if (error) return <p>{error}</p>;
  if (!token) return <p>Please log in to view your account.</p>;
  if (!user) return <p>Loading your account...</p>;

  const reservations = user.reservations || [];

  return (
    <div className="account-page">
      <header>
        <h2>
          Welcome, {user.firstname} {user.lastname}
        </h2>
        <p>Email: {user.email}</p>
      </header>

      <section className="reservations">
        <h3>My Reservations</h3>
        {reservations.length === 0 ? (
          <p>You have no reservations.</p>
        ) : (
          <ul className="reservation-list">
            {reservations.map(({ id, coverimage, title, author }) => (
              <li key={id} className="reservation-item">
                {coverimage && (
                  <img
                    src={coverimage}
                    alt={title || "Book cover"}
                    width="100"
                    height="150"
                  />
                )}
                <div className="reservation-info">
                  <h4>{title}</h4>
                  <p>{author}</p>
                  <button onClick={() => handleReturn(id)}>Return</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}
