import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { authenticate } from "../API/api";

export default function AccountPage() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchUserData() {
      try {
        const data = await authenticate(token);
        setUser(data);
      } catch (e) {
        setError(e.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [token, navigate]);

  if (loading) {
    return <p>Loading account info...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>
        <span>Welcome to your account page, </span>
        {user.firstname} {user.lastname}
      </h1>
      <p>
        The email you have on file with us is: <span>{user.email}</span>
      </p>
    </div>
  );
}
