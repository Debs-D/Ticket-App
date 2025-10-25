"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Ticket, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-hot-toast";

const navItems = [
  { id: "overview", title: "Overview", icon: LayoutDashboard },
  { id: "tickets", title: "My Tickets", icon: Ticket },
  { id: "profile", title: "Profile", icon: User },
];

export default function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userTickets, setUserTickets] = useState([]);

  const handleLogout = () => {
    logout();
    toast.success("You’ve been logged out successfully.");
    navigate("/auth/login");
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tickets") || "[]");
    if (user?.email) {
      const filtered = stored.filter((t) => t.userEmail === user.email);
      setUserTickets(filtered);
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1 mt-16">
        <aside className="hidden md:flex flex-col justify-between w-64 bg-white border-r shadow-sm p-6 sticky top-16 h-[calc(100vh-4rem)]">
          <div>
            <h2 className="text-xl font-bold mb-6 text-[#E040FB]">Dashboard</h2>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center w-full gap-3 px-4 py-2 rounded-lg transition-all ${
                    activeView === item.id
                      ? "bg-[#E040FB] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-[#E040FB]/90 px-4 py-2 rounded-full text-white hover:bg-[#E040FB] shadow-sm transition"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="relative w-64 bg-white h-full shadow-xl p-6 flex flex-col justify-between animate-slide-in-left">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#E040FB]">Menu</h2>
                  <X
                    className="h-6 w-6 text-gray-600 cursor-pointer"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all ${
                        activeView === item.id
                          ? "bg-[#E040FB] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </button>
                  ))}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 bg-[#E040FB]/90 px-4 py-2 rounded-full text-white hover:bg-[#E040FB] shadow-sm transition"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </aside>
          </div>
        )}

        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-b shadow-sm flex items-center justify-between px-4 py-3 z-30">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <h2 className="text-lg font-semibold text-[#E040FB]">Dashboard</h2>
          <div className="w-6" />
        </div>

        <main className="flex-1 p-8 md:ml-0 bg-gray-50 min-h-[calc(100vh-8rem)] mt-14 md:mt-0">
          {activeView === "overview" && (
            <section>
              <h1 className="text-3xl font-bold text-[#E040FB] mb-6">
                Welcome, {user?.firstName || "User"} 👋
              </h1>
              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                {[ 
                  { label: "Total Tickets", value: 42 },
                  { label: "Open Tickets", value: 15 },
                  { label: "Resolved Tickets", value: 27 },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all text-center"
                  >
                    <p className="text-3xl font-bold text-[#E040FB]">
                      {stat.value}
                    </p>
                    <p className="text-gray-700 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/tickets"
                className="bg-[#E040FB] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-pink-500 transition"
              >
                Manage Tickets
              </Link>
            </section>
          )}

          {activeView === "tickets" && (
            <section>
              <h1 className="text-2xl font-semibold text-[#E040FB] mb-6">
                My Tickets
              </h1>

              {userTickets.length === 0 ? (
                <p className="text-gray-500">
                  You have no tickets yet.{" "}
                  <Link to="/tickets" className="text-[#E040FB] hover:underline">
                    Create one here.
                  </Link>
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userTickets.map((ticket, i) => {
                    const statusColor = {
                      open: "bg-green-100 text-green-700",
                      in_progress: "bg-amber-100 text-amber-700",
                      closed: "bg-gray-200 text-gray-700",
                    };

                    return (
                      <div
                        key={i}
                        className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all relative"
                      >
                        <span
                          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            statusColor[ticket.status] || "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {ticket.status?.replace("_", " ") || "unknown"}
                        </span>
                        <h3 className="mt-4 font-bold text-xl text-gray-800">
                          {ticket.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-2 min-h-[60px]">
                          {ticket.description || "No description provided."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {activeView === "profile" && (
            <section>
              <h1 className="text-2xl font-semibold text-[#E040FB] mb-4">
                Profile
              </h1>
              <div className="bg-white p-6 rounded-xl shadow-sm max-w-lg space-y-3">
                <p>
                  <strong>Name:</strong> {user?.firstName || "User"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "N/A"}
                </p>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
