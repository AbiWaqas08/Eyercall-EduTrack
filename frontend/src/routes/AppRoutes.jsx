import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import CreateCourse from "../pages/admin/CreateCourse";
import CreateBatch from "../pages/admin/CreateBatch";
import StudentDashboard from "../pages/student/StudentDashboard";
import LandingPage from "../LandingPage";

import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth(); // ✅ real auth user

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* 🟣 ADMIN ROUTES */}
        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="create-student" element={<CreateStudent />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="create-batch" element={<CreateBatch />} />
          </Route>
        )}

        {/* 🟢 STUDENT ROUTE */}
        {user?.role === "student" && (
          <Route path="/student" element={<StudentDashboard />} />
        )}

        {/* 🔐 PROTECTED FALLBACK */}
        <Route
          path="*"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/student" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;