import { create } from "zustand";
import { axiosInstanceCategory } from "../zustand/api/apiSlice";

export const useCategoryStore = create((set) => ({
  categories: [],
  isLoadingCategories: false,
  isCreatingCategory: false,
  isUpdatingCategory: false,
  isDeletingCategory: false,
  isGettingCategoryById: false,
  error: null,

  getAllCategories: async () => {
    set({ isLoadingCategories: true, error: null });
    try {
      const res = await axiosInstanceCategory.get("/getallCategories");
      set({ categories: res.data.categories });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ isLoadingCategories: false });
    }
  },

  getCategoryById: async (id) => {
    set({ isGettingCategoryById: true, error: null });
    try {
      const res = await axiosInstanceCategory.get(`/${id}`);
      return res.data.category; 
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isGettingCategoryById: false });
    }
  },

  createCategory: async (categoryData) => {
    set({ isCreatingCategory: true, error: null });
    try {
      const res = await axiosInstanceCategory.post("/createCategory", categoryData);
      set((state) => ({
        categories: [...state.categories, res.data.category],
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ isCreatingCategory: false });
    }
  },

  updateCategory: async (id, updateData) => {
    set({ isUpdatingCategory: true, error: null });
    try {
      const res = await axiosInstanceCategory.put(`/${id}`, updateData);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? res.data.category : cat
        ),
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ isUpdatingCategory: false });
    }
  },

  deleteCategory: async (id) => {
    set({ isDeletingCategory: true, error: null });
    try {
      await axiosInstanceCategory.delete(`/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ isDeletingCategory: false });
    }
  },
}));

export default useCategoryStore