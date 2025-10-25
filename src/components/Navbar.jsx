import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/80 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-[#E040FB]">
          🎟️ TicketApp
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li><a href="#features" className="hover:text-[#E040FB]">Features</a></li>
          <li><a href="#about" className="hover:text-[#E040FB]">About</a></li>
          <li><a href="#faq" className="hover:text-[#E040FB]">FAQs</a></li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:text-[#E040FB] transition"
            >
              <User className="h-5 w-5 text-gray-800" />
              <span className="font-medium">Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="bg-[#E040FB] text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-500 transition"
            >
              Log in / Register
            </Link>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-inner">
          <ul className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
            <li><a href="#features" onClick={() => setOpen(false)}>Features</a></li>
            <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
            <li><a href="#faq" onClick={() => setOpen(false)}>FAQs</a></li>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 hover:text-[#E040FB]"
              >
                <User className="h-5 w-5" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/auth/login"
                onClick={() => setOpen(false)}
                className="bg-[#E040FB] text-white px-6 py-2 rounded-md hover:bg-pink-500 transition"
              >
                Log in / Register
              </Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
