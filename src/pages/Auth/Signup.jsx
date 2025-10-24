import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, password } = formData;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password)
      return toast.error("All fields are required.");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Enter a valid email address.");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters.");

    // Save to localStorage
    const userData = { firstName, lastName, email, phone };
    localStorage.setItem("ticketapp_session", JSON.stringify(userData));
    login(userData);
    toast.success("Account created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="grid md:grid-cols-2 min-h-screen bg-linear-to-r from-[#E040FB] to-[#FFC2FF]">
      {/* IMAGE SIDE */}
      <div className="hidden md:flex items-center justify-center">
        <img
          src="https://framerusercontent.com/images/f5N8nV6VGKRyj6jWBs2dAj8tjo.png"
          alt="Signup Illustration"
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
            Create Your Account
          </h2>
          <p className="text-gray-500 text-center">
            Join and start managing your tickets effortlessly.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              icon={<User size={18} />}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              icon={<User size={18} />}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            icon={<Mail size={18} />}
            onChange={handleChange}
          />

          <InputField
            label="Phone"
            name="phone"
            type="text"
            icon={<Phone size={18} />}
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
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-[#E040FB] to-[#FFC2FF] text-white rounded-full font-semibold hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-[#E040FB] font-semibold hover:underline"
            >
              Login here
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
