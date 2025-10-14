import { useEffect, useState } from "react";
import { fetchUserProfile, returnBook } from "../API/api";

export default function Account({ token }) {
  // === State ===
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  // === Fetch user profile ===
  const loadProfile = async () => {
    if (!token) return;

    try {
      const profile = await fetchUserProfile(token);
      setUser(profile);
      setMessage(""); // clear old messages on successful load
    } catch (error) {
      console.error("Error loading profile:", error);
      setMessage("Failed to load account information.");
    }
  };

  // === Handle book return ===
  const handleReturn = async (reservationId) => {
    if (!token) return;

    try {
      const result = await returnBook(reservationId, token);

      if (result.error) {
        setMessage(`${result.error}`);
      } else {
        setMessage("Book returned successfully!");
        await loadProfile(); // refresh reservation list
      }
    } catch (error) {
      console.error("Error returning book:", error);
      setMessage("Something went wrong while returning the book.");
    }
  };

  // === Load profile when token changes ===
  useEffect(() => {
    loadProfile();
  }, [token]);

  // === Conditional Rendering ===
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
