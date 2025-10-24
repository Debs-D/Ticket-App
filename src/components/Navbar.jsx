import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="text-2xl font-bold text-[#E040FB]">
          🎟️ TicketApp
        </a>

        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li><a href="#features" className="hover-[#FFC2FF]">Features</a></li>
          <li><a href="#how" className="hover:text-blue-600">How It Works</a></li>
          <li><a href="#faq" className="hover:text-blue-600">FAQs</a></li>
        </ul>

        <div className="hidden md:flex">
          <a
            href="/auth/signup"
            className="bg-[#E040FB] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </a>
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
            <li><a href="#how" onClick={() => setOpen(false)}>How It Works</a></li>
            <li><a href="#faq" onClick={() => setOpen(false)}>FAQs</a></li>
            <li>
              <a
                href="/auth/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
