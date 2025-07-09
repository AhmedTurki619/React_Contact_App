import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import type { User } from "../types";
import { useAuth } from "../context/AuthContext";

function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  // ✅ Fix: Always call hooks first — move condition below
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Failed to fetch users:", err));
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-reactblue">👤 User Directory</h1>

      <input
        type="text"
        placeholder="Search by name..."
        className="w-full max-w-md mx-auto block mb-8 px-4 py-2 border rounded-md shadow-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
