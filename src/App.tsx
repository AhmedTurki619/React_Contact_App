import { Routes, Route } from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import UserProfile from "./pages/UserProfile";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Login from "./Login"; // make sure this path matches your file structure
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:id/edit" element={<EditProfile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
