import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
    const data = await res.json();
    if (data.length > 0) {
      login(data[0]);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4 text-center text-reactblue font-bold">Login</h2>
      <input className="w-full p-2 border rounded mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-2 border rounded mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="w-full bg-reactblue text-white py-2 rounded">Login</button>
    </div>
  );
}
