import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

import { useAuthStore } from "./store/UserAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export default function App() {
  const authUser = useAuthStore((state) => state.authUser);
  const isCheckAuth = useAuthStore((state) => state.isCheckAuth);
  const CheckAuth = useAuthStore((state) => state.CheckAuth);

  useEffect(() => {
    CheckAuth(); // 🚨 Never put CheckAuth in dependency array
  }, []);

  console.log("⏳ App Rendered: isCheckAuth =", isCheckAuth, "authUser =", authUser);

  // ✅ Show loader while auth is being checked
  if (isCheckAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to="/login"></Navigate>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={!authUser?<SignUpPage />:<Navigate to="/"></Navigate>} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={authUser?<ProfilePage /> : <Navigate to="/login" ></Navigate>} />
      </Routes>
    </div>
  );
}