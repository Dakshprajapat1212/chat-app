import React from 'react';
import { useAuthStore } from '../store/UserAuthStore';
import { User, Eye, MessageSquare } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Make sure this import exists

const SettingsPage = () => {
  const { Logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const success = await Logout();
      if (success) {
        toast.success("You have been logged out"); // Additional feedback
        navigate('/login');
      }
    } catch (error) {
      // Error is already handled in the store
    }
  };

  return (
    <div className="flex flex-col gap-6 p-10">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <div className="flex gap-6 text-blue-600 text-3xl">
        <User />
        <Eye />
        <MessageSquare />
      </div>
      
      <button 
        onClick={handleLogout}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;