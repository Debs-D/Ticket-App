"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Tickets() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "open" });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  // Load tickets for this user
  useEffect(() => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const userTickets = allTickets.filter((t) => t.userEmail === user?.email);
    setTickets(userTickets);
  }, [user]);

  // Save all tickets (including other users)
  const saveTickets = (newUserTickets) => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");

    // Remove old tickets of this user
    const otherUsersTickets = allTickets.filter((t) => t.userEmail !== user?.email);

    // Save combined updated tickets
    const updatedAll = [...otherUsersTickets, ...newUserTickets];
    localStorage.setItem("tickets", JSON.stringify(updatedAll));
  };

  const validate = () => {
    if (!form.title.trim()) {
      toast.error("Title is required!");
      return false;
    }
    if (!["open", "in_progress", "closed"].includes(form.status)) {
      toast.error("Invalid status!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTickets = [...tickets];
    const ticketData = { ...form, userEmail: user?.email };

    if (editIndex !== null) {
      newTickets[editIndex] = ticketData;
      toast.success("Ticket updated successfully!");
      setEditIndex(null);
    } else {
      newTickets.push(ticketData);
      toast.success("Ticket created successfully!");
    }

    setTickets(newTickets);
    saveTickets(newTickets);
    setForm({ title: "", description: "", status: "open" });
  };

  const handleEdit = (index) => {
    setForm(tickets[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const newTickets = tickets.filter((_, i) => i !== index);
      setTickets(newTickets);
      saveTickets(newTickets);
      toast.success("Ticket deleted!");
    }
  };

  const statusColor = {
    open: "bg-green-100 text-green-700",
    in_progress: "bg-amber-100 text-amber-700",
    closed: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter text-gray-800">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#E040FB]">Manage Your Tickets</h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-white border border-[#E040FB] text-[#E040FB] px-5 py-2 rounded-full hover:bg-[#E040FB] hover:text-white transition shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md mb-10 border border-gray-100">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border p-3 rounded-md w-full focus:ring-2 focus:ring-[#E040FB] outline-none"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="border p-3 rounded-md w-full focus:ring-2 focus:ring-[#E040FB] outline-none"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-3 rounded-md w-full mt-4 h-28 resize-none focus:ring-2 focus:ring-[#E040FB] outline-none"
          />

          <button
            type="submit"
            className="mt-6 bg-[#E040FB] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-pink-500 transition"
          >
            {editIndex !== null ? "Update Ticket" : "Create Ticket"}
          </button>
        </form>

        {tickets.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No tickets yet — create one above!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all relative"
              >
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColor[ticket.status]}`}
                >
                  {ticket.status.replace("_", " ")}
                </span>

                <h3 className="mt-4 font-bold text-xl text-gray-800">{ticket.title}</h3>
                <p className="text-gray-600 text-sm mt-2 min-h-[60px]">
                  {ticket.description || "No description provided."}
                </p>

                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    onClick={() => handleEdit(i)}
                    className="flex items-center gap-1 text-[#E040FB] hover:underline font-medium"
                  >
                    <Edit className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="flex items-center gap-1 text-red-500 hover:underline font-medium"
                  >
                    <Trash2 className="h-4 w-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
