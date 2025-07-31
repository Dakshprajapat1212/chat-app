import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckAuth: true,
  isSignning: false,
  isLogging: false,
  isUpdatingProfile: false,
onlineUsers: [],
  CheckAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
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
      set({ authUser: res.data.user });
      toast.success("Account created successfully!");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Signup failed."
      );
      throw error;
    } finally {
      set({ isSignning: false });
    }
  },

  Login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLogging: false });
    }
  },

  Logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Try again."
      );
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data.user });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile."
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));