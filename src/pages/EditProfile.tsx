import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { id } = useParams();
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (user && String(user.id) === id) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
      });
      setPreview(user.avatar); // for preview
    } else {
      navigate("/login");
    }
  }, [user, id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setForm((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, ...form }),
    });

    const updated = await res.json();
    login(updated);
    navigate(`/user/${id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center text-reactblue">✏️ Edit Profile</h2>

      {["name", "email", "phone"].map((field) => (
        <input
          key={field}
          className="w-full p-2 border rounded mb-3"
          type="text"
          name={field}
          placeholder={field}
          value={(form as any)[field]}
          onChange={handleChange}
        />
      ))}

      <div className="mb-3">
        <label className="block mb-1 font-medium">Avatar</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover border" />}
      </div>

      <button onClick={handleSave} className="w-full bg-reactblue text-white py-2 rounded">
        💾 Save Changes
      </button>
    </div>
  );
}
