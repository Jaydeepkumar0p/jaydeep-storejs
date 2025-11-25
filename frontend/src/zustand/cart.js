import { create } from "zustand";
import { axiosInstanceCart } from "./api/apiSlice";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  shippingAddress: null,

  addToCart: (product, qty = 1) => {
    set((state) => {
      const exist = state.cartItems.find((i) => i._id === product._id);
      if (exist) {
        return {
          cartItems: state.cartItems.map((i) =>
            i._id === product._id ? { ...i, qty: i.qty + qty } : i
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...product, qty }] };
      }
    });
  },

  removeFromCart: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i._id !== id),
    })),

  updateQty: (id, qty) =>
    set((state) => ({
      cartItems: state.cartItems.map((i) =>
        i._id === id ? { ...i, qty } : i
      ),
    })),

  setShippingAddress: (address) => set({ shippingAddress: address }),

  clearCart: () => set({ cartItems: [] }),

  createCheckoutSession: async () => {
    const { cartItems, shippingAddress } = get();
    if (!cartItems.length) throw new Error("Cart is empty");
    if (!shippingAddress) throw new Error("Shipping address required");

    const { data } = await axiosInstanceCart.post("/stripe-checkout", {
      items: cartItems,
      shippingAddress,
    });

    return data; // { id, url }
  },
}));
