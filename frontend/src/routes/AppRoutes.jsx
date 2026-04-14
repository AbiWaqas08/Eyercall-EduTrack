import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Pages
import Login from "../pages/auth/Login";
import LandingPage from "../LandingPage"

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>

        {/* 🔓 Public Route */}
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Admin Route */}
        <Route
          path="/admin"
          element={
            user ? (
              user.role === "admin" ? (
                <h1>Admin Dashboard</h1> // simple for phase 1
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔐 Protected User Route */}
        <Route
          path="/user"
          element={
            user ? (
              user.role === "user" ? (
                <h1>User Dashboard</h1> // simple for phase 1
              ) : (
                <Navigate to="/admin" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔁 Default Redirect */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user
                  ? user.role === "admin"
                    ? "/admin"
                    : "/user"
                  : "/login"
              }
            />
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;