import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password)
      return toast.error("Please fill in all fields.");

    const user = JSON.parse(localStorage.getItem("ticketapp_session"));

    if (!user) return toast.error("No user found. Please sign up first.");
    if (user.email !== email)
      return toast.error("Invalid email. Please try again.");

    if (password.length < 6)
      return toast.error("Invalid password format.");

    login(user);
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen bg-linear-to-r from-[#E040FB] to-[#FFC2FF]">
      {/* IMAGE SIDE */}
      <div className="hidden md:flex items-center justify-center">
        <img
          src="https://framerusercontent.com/images/f5N8nV6VGKRyj6jWBs2dAj8tjo.png"
          alt="Login Illustration"
          className="w-[85%] drop-shadow-2xl"
        />
      </div>

      {/* FORM SIDE */}
      <div className="bg-white rounded-l-3xl flex items-center justify-center p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 font-inter"
        >
          <h2 className="text-3xl font-bold text-[#E040FB] text-center">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center">
            Login to manage your event tickets easily.
          </p>

          <InputField
            label="Email"
            name="email"
            type="email"
            icon={<Mail size={18} />}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            icon={<Lock size={18} />}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-[#E040FB] to-[#FFC2FF] text-white rounded-full font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-[#E040FB] font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, icon, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      <div className="flex items-center border border-gray-200 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#E040FB]">
        <span className="text-gray-400">{icon}</span>
        <input
          className="ml-2 w-full outline-none placeholder-gray-400"
          {...props}
        />
      </div>
    </div>
  );
}
