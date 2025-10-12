// import Login from "./Pages/Login";
// import { Routes, Route } from "react-router-dom";
// import RegisterPage from "./Pages/RegisterPage";
// import Books from "./Pages/Books";

// import RegisterPage from "./Pages/RegisterPage";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<Books />} />
//       <Route path="/register" element={<RegisterPage />} />
//     </Routes>
//   );
// }

// export default function App() {
// //   return <RegisterPage />;
// // }

import { Routes, Route } from "react-router";
import Login from "./Pages/Login";
import RegisterPage from "./Pages/RegisterPage";
import Home from "./Pages/Books";
// import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <Home />
          // {/* </ProtectedRoute> */}
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
