import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckAuth: true,
  isSignning: false,
  
  CheckAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (err) {
      set({ authUser: null });
      toast.error("Session expired. Please login again.");
    } finally {
      set({ isCheckAuth: false });
    }
  },
  
  Signup: async (data) => {
    try {
      set({ isSignning: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Signup failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isSignning: false });
    }
  },


Logout: async () => {
  try {
    await axiosInstance.post("/auth/logout");
    set({ authUser: null });
    toast.success("Logged out successfully!");
    return true;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       "Logout failed. Please try again.";
    toast.error(errorMessage);
    return false;
  }
}

}));