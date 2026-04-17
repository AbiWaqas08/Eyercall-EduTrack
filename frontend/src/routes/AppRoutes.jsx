import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateStudent from "../pages/admin/CreateStudent";
import CreateCourse from "../pages/admin/CreateCourse";
import CreateBatch from "../pages/admin/CreateBatch"
import LandingPage from "../LandingPage"

const AppRoutes = () => {
  const user = { role: "admin" }; // test

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage/>} />

        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="create-student" element={<CreateStudent />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="create-student" element={<CreateBatch />} />
          </Route>
        )}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;