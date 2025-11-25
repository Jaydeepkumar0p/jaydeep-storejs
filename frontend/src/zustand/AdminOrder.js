import { create } from "zustand";
import axios from "axios";

export const useOrderStore = create((set, get) => ({
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,

  // Fetch all orders (admin)
  fetchAllOrders: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        import.meta.env.MODE === "development" 
          ? "http://localhost:5000/api/order" 
          : "/api/order", 
        {
          withCredentials: true,
        }
      );
      set({ orders: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  // Fetch single order by ID
  fetchOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        import.meta.env.MODE === "development" 
          ? `http://localhost:5000/api/order/${id}`
          : `/api/order/${id}`,
        {
          withCredentials: true,
        }
      );
      set({ selectedOrder: data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  // Mark order as paid (admin)
  markOrderPaid: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(
        import.meta.env.MODE === "development" 
          ? `http://localhost:5000/api/order/${orderId}/pay`
          : `/api/order/${orderId}/pay`,
        {},
        { withCredentials: true }
      );
      // Update orders list locally
      const orders = get().orders.map((order) =>
        order._id === data._id ? data : order
      );
      set({ orders, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  // Mark order as delivered (admin)
  markOrderDelivered: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(
        import.meta.env.MODE === "development" 
          ? `http://localhost:5000/api/order/${orderId}/deliver`
          : `/api/order/${orderId}/deliver`,
        {},
        { withCredentials: true }
      );
      const orders = get().orders.map((order) => 
        order._id === data._id ? data : order
      );
      set({ orders, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  // Delete order (admin)
  deleteOrder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(
        import.meta.env.MODE === "development" 
          ? `http://localhost:5000/api/order/${orderId}`
          : `/api/order/${orderId}`,
        {
          withCredentials: true,
        }
      );
      const orders = get().orders.filter((order) => order._id !== orderId);
      set({ orders, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Clear selected order
  clearSelectedOrder: () => set({ selectedOrder: null }),
}));