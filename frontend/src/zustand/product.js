import { create } from "zustand";
import { axiosInstanceProduct } from "../zustand/api/apiSlice";

export const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,
  isLoadingProducts: false,
  isCreatingProduct: false,
  isUpdatingProduct: false,
  isDeletingProduct: false,
  isGettingProductById: false,
  isReviewingProduct: false,
  isgettingallproducts:false,
  error: null,

  // Fetch all products (admin)
  getAllProducts: async () => {
    set({ isLoadingProducts: true, error: null });
    try {
      const res = await axiosInstanceProduct.get("/fetchallproducts");
      set({ products: res.data.products });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
    } finally {
      set({ isLoadingProducts: false });
    }
  },

  // Fetch product by ID
  getProductById: async (id) => {
    set({ isGettingProductById: true, error: null });
    try {
      const res = await axiosInstanceProduct.get(`/getproductbyid/${id}`);
      set({ selectedProduct: res.data.product });
      return res.data.product;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isGettingProductById: false });
    }
  },

  // Create product
  createProduct: async (productData) => {
  set({ isCreatingProduct: true, error: null });
  try {
    const res = await axiosInstanceProduct.post(
      "/addproduct",
      productData,
      {
        headers: { "Content-Type": "application/json" }, // important for base64
      }
    );
    set((state) => ({
      products: [...state.products, res.data.product],
    }));
    return res.data.product;
  } catch (err) {
    set({ error: err.response?.data?.message || err.message });
    throw err;
  } finally {
    set({ isCreatingProduct: false });
  }
},



  // Update product
  updateProduct: async (id, updateData) => {
    set({ isUpdatingProduct: true, error: null });
    try {
      const res = await axiosInstanceProduct.put(`/updateproduct/${id}`, updateData);
      set((state) => ({
        products: state.products.map((prod) =>
          prod._id === id ? res.data.product : prod
        ),
        selectedProduct: res.data.product,
      }));
      return res.data.product;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isUpdatingProduct: false });
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    set({ isDeletingProduct: true, error: null });
    try {
      await axiosInstanceProduct.delete(`/deleteproduct/${id}`);
      set((state) => ({
        products: state.products.filter((prod) => prod._id !== id),
      }));
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isDeletingProduct: false });
    }
  },

  // Add product review
  addProductReview: async (id, reviewData) => {
    set({ isReviewingProduct: true, error: null });
    try {
      const res = await axiosInstanceProduct.post(`/${id}/review`, reviewData);
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isReviewingProduct: false });
    }
  },

  // Fetch products with optional keyword / params
  fetchProducts: async (params = {}) => {
    set({ isLoadingProducts: true, error: null });
    try {
      const res = await axiosInstanceProduct.get("/fetchproducts", { params });
      set({ products: res.data.products });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isLoadingProducts: false });
    }
  },

  // Fetch top-rated products
  fetchTopProducts: async () => {
    set({ isLoadingProducts: true, error: null });
    try {
      const res = await axiosInstanceProduct.get("/top");
      return res.data.products;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isLoadingProducts: false });
    }
  },

  // Fetch newest products
  fetchNewProducts: async () => {
    set({ isLoadingProducts: true, error: null });
    try {
      const res = await axiosInstanceProduct.get("/new");
      return res.data.products;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    } finally {
      set({ isLoadingProducts: false });
    }
  },
  fetchAllproducts: async () => {
  set({ isgettingallproducts: true, error: null });
  try {
    const res = await axiosInstanceProduct.get("/fetchallproducts");
    // Update products in store
    set({ products: res.data.products });
    return res.data.products;
  } catch (err) {
    set({ error: err.response?.data?.message || err.message });
    throw err;
  } finally {
    set({ isgettingallproducts: false });
  }
},


  // Upload image(s) for a product
  uploadImage: async (productId, images) => {
    try {
      // Ensure images is array or single base64
      const imageArray = Array.isArray(images) ? images : [images];

      const res = await axiosInstanceProduct.post(
        `/uploadimage/${productId}`,
        { images: imageArray }
      );

      // Returns updated product
      return res.data.product;
    } catch (err) {
      set({ error: err.response?.data?.message || err.message });
      throw err;
    }
  },
}));
