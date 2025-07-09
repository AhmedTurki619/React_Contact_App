import { useParams } from "react-router-dom";
import type { User } from "../types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EmailComposer from "../components/EmailComposer";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComposer, setShowComposer] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching user with ID:", id); // Debug log
        
        const response = await fetch(`http://localhost:3000/users/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        console.log("Fetched user data:", userData); // Debug log
        
        setUser(userData);
      } catch (err) {
        console.error("Failed to load user:", err);
        setError(err instanceof Error ? err.message : "Failed to load user");
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // User not found
  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const handleEmail = () => {
    setShowComposer(true);
  };

  const handleWhatsApp = () => {
    if (!user.phone) {
      toast.error("No phone number available");
      return;
    }
    
    const phone = user.phone.replace(/\D/g, '');
    toast.info(`Opening WhatsApp`);
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-lg rounded-3xl mt-10 relative">
      <div className="flex flex-col items-center text-center">
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={user.name || 'User'} 
          className="w-32 h-32 rounded-full mb-4 border-4 border-blue-300 object-cover"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = 'https://via.placeholder.com/128x128/3B82F6/FFFFFF?text=User';
          }}
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name || 'Unknown User'}</h2>
        <p className="text-gray-600">📧 {user.email || 'No email'}</p>
        <p className="text-gray-600 mb-4">📞 {user.phone || 'No phone'}</p>
        
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleEmail}
            className="px-4 py-2 bg-reactblue hover:bg-[#4ecde9] text-white rounded-full text-sm"
            disabled={!user.email}
          >
            Send Email
          </button>
          
          <button 
            onClick={handleWhatsApp} 
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm"
            disabled={!user.phone}
          >
            WhatsApp
          </button>
        </div>
      </div>

      {showComposer && user && (
        <EmailComposer
          toName={user.name}
          toEmail={user.email}
          onClose={() => setShowComposer(false)}
        />
      )}
    </div>
  );
}

export default UserProfile;