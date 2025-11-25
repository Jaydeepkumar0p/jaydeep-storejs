import { create } from "zustand";
import { axiosInstance } from "../zustand/api/apiSlice";

const EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const getInitialState = () => {
  const storedData = localStorage.getItem("user");
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    if (parsedData.expiry && Date.now() < parsedData.expiry) {
      return parsedData.user;
    } else {
      localStorage.removeItem("user");
    }
  }
  return null;
};

const initialState = getInitialState();

export const authStore = create((set) => ({
  // States
  isLogoutting: false,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  user: initialState,
  error: null,
  isUpdatingUser: false,
  isGettingUserProfile: false,
  AppUser: [],
  isGettingAllUsers: false,
  isDeletingUser: false,

  // Helper to persist user
  _persistUser: (userData) => {
    const expiryTime = Date.now() + EXPIRATION_MS;
    const dataToStore = {
      user: userData,
      expiry: expiryTime,
    };
    localStorage.setItem("user", JSON.stringify(dataToStore));
  },

  // Signup
  signup: async (userData) => {
    set({ isSigningUp: true, error: null });
    try {
      const res = await axiosInstance.post("/", userData);
      authStore.getState()._persistUser(res.data);
      set({ user: res.data });
    } catch (err) {
      console.error("Signup failed:", err);
      set({ error: err.response?.data?.message || "Signup failed" });
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login
  Login: async (loginData) => {
    set({ isLoggingIn: true, error: null });
    try {
      const res = await axiosInstance.post("/login", loginData);
      authStore.getState()._persistUser(res.data);
      set({ user: res.data });
    } catch (err) {
      console.error("Login failed:", err);
      set({ error: err.response?.data?.message || "Login failed" });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Logout
  logout: async () => {
    set({ isLogoutting: true, error: null });
    try {
      await axiosInstance.post("/Logout");
      localStorage.removeItem("user");
      set({ user: null });
    } catch (err) {
      console.error("Logout failed:", err);
      set({ error: err.response?.data?.message || "Logout failed" });
    }
    finally{
      set({ isLogoutting: false });
    }
  },

  // Update Profile
  updateProfile: async (upData) => {
    set({ isUpdatingProfile: true, error: null });
    try {
      const res = await axiosInstance.put("/profile", upData);
      set({ user: res.data });
      authStore.getState()._persistUser(res.data);
    } catch (err) {
      console.error("Profile update failed:", err);
      set({ error: err.response?.data?.message || "Profile update failed" });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  visitProfile:async()=>{
    try{
      const res = await axiosInstance.get("/profile");
      set({ user: res.data });
    }
    catch(err){
      console.error("Visit profile failed:", err);
      set({ error: err.response?.data?.message || "Visit profile failed" });
    }
  },

  // Update User by (Admin)
  updateUser: async (id, upData) => {
    set({ isUpdatingUser: true, error: null });
    try {
      const res = await axiosInstance.put(`/${id}`, upData);
      set({ AppUser: res.data });
    } catch (err) {
      console.error("User update failed:", err);
      set({ error: err.response?.data?.message || "User update failed" });
    } finally {
      set({ isUpdatingUser: false });
    }
  },

  // Get Profile by ID
  getUserProfile: async (id) => {
    set({ isGettingUserProfile: true, error: null });
    try {
      const res = await axiosInstance.get(`/${id}`);
      set({ AppUser: res.data });
    } catch (err) {
      console.error("Get user profile failed:", err);
      set({ error: err.response?.data?.message || "Get user profile failed" });
    } finally {
      set({ isGettingUserProfile: false });
    }
  },

  // Get All Users
  getAllUsers: async () => {
    set({ isGettingAllUsers: true, error: null });
    try {
      const res = await axiosInstance.get("/all");
      set({ AppUser: res.data.users });
    } catch (err) {
      console.error("Get all users failed:", err);
      set({ error: err.response?.data?.message || "Get all users failed" });
    } finally {
      set({ isGettingAllUsers: false });
    }
  },

  // Delete User
  deleteUser: async (id) => {
    set({ isDeletingUser: true, error: null });
    try {
      await axiosInstance.delete(`/${id}`);
      const updatedUsers = authStore.getState().AppUser.filter((u) => u._id !== id);
      set({ AppUser: updatedUsers });
    } catch (err) {
      console.error("Delete user failed:", err);
      set({ error: err.response?.data?.message || "Delete user failed" });
    } finally {
      set({ isDeletingUser: false });
    }
  },
}));

// optional hook-style export
export const useAuthStore = authStore;
