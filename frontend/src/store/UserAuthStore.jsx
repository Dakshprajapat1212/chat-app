import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckAuth: true,
  isSignning:false,
  CheckAuth: async () => {


    console.log("👉 Starting auth check...");
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("✅ Auth response:", res.data);
      set({ authUser: res.data });
    } catch (err) {
      console.log("❌ Auth error:", err);
      set({ authUser: null });
    } finally {
      console.log("✅ Auth check complete");
      set({ isCheckAuth: false });
    }
  },
  Signup:async()=>{

  }
  
}));