import React from 'react'
import { useAuthStore } from '../store/UserAuthStore'

const HomePage = () => {
  const { setAuthUser } = useAuthStore();

  const handleLogout = () => {
    // Clear auth user and force logout
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAuthUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Hello, you're logged in ✅</h1>
      
      <button 
        onClick={handleLogout} 
        className="btn btn-error"
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;