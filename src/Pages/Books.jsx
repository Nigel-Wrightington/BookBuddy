// export default function homePage() {
//   return <h1>Welcome to BookBuddy!</h1>;
// }

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Home() {
  const { verified, logout } = useAuth();
  const navigate = useNavigate();

  return (
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
  );
}
