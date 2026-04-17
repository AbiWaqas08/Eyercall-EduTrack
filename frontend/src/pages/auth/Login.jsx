import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

import {
  EnvelopeIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  //  Handle login
  const onSubmit = async (data) => {
  try {
    const res = await loginUser(data);

    login(
      res.data.access_token,
      res.data.role,
      res.data.name,
      res.data.email
    );

    //  ROLE BASED REDIRECT
    if (res.data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }

  } catch (error) {
    alert("Invalid credentials");
  }
};

  // 🎨 Input wrapper
  const InputField = ({ icon: Icon, children }) => (
    <div className="flex items-center border border-border rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-primary transition">
      <Icon className="w-5 h-5 text-secondary mr-2" />
      {children}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-border space-y-6">

        {/* 🔝 Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-primary">
            Welcome to Eyercall EduTrack
          </h2>
          
        </div>

        {/* 📋 Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <InputField icon={EnvelopeIcon}>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full outline-none bg-transparent"
            />
          </InputField>

          {/* Password */}
          <InputField icon={LockClosedIcon}>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full outline-none bg-transparent"
            />
          </InputField>

          {/* Info */}
          <div className="text-xs text-center text-secondary">
            Accounts are created by admin. Contact your institute for credentials.
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 text-white py-2.5 rounded-lg transition"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Login
          </button>

        </form>

        {/* Footer */}
        <div className="text-center text-xs text-secondary">
          © 2026 Eyercall EduTrack
        </div>

      </div>
    </div>
  );
};

export default Login;