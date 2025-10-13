import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function AccountPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {isLoggedIn() ? (
        <p>ACCOUNT PAGE WORKS!</p>
      ) : (
        <>
          <p>Please login to access your account!</p>
          <button type="button" onClick={() => navigate("/login")}>
            Log in
          </button>
        </>
      )}
    </div>
  );
}
