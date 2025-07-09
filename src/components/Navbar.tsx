import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation(); // 👈 get current route
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (location.pathname === "/login") return null; // ✅ Don't show on login

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-reactblue">
        ReactUserApp
      </Link>

      {user && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={user.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
            <span className="font-medium text-gray-700">{user.name}</span>
            <svg
              className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
             
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate(`/user/${user.id}/edit`)}
              >
                ✏️ Edit Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                onClick={handleLogout}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
