import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tickets from "./pages/Tickets/Tickets";

export default function App() {
  const isAuthenticated = localStorage.getItem("ticketapp_session");

  return (
    <div className="max-w-[1440px] mx-auto">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/tickets"
          element={isAuthenticated ? <Tickets /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </div>
  );
}
