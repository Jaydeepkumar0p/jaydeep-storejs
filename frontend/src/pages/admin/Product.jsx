import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCategoryStore } from "../../zustand/category";
import { useProductStore } from "../../zustand/product";
import AdminMenu from "../admin/AdminMenu";
import {
  Package,
  List,
  DollarSign,
  Zap,
  Tag,
  Hash,
  Layers,
  Save,
  Loader2,
} from "lucide-react";

// --- Framer Motion Variants (Simple Slide/Fade for fields) ---
const itemAnimation = (delay) => ({
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay, duration: 0.5 },
});

// Main container animation (for the whole form card)
const containerAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};
// --------------------------------------------------------

const Product = () => {
  const { categories, getAllCategories } = useCategoryStore();
  const { createProduct, isCreatingProduct } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Limit to a reasonable number of images (e.g., 5)
    const filesToUse = files.slice(0, 5);
    setImages(filesToUse);
    const previews = filesToUse.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price) {
      alert("Please fill in Name, Price, and Category.");
      return;
    }

    try {
      const base64Images = await Promise.all(
        images.map((file) => convertToBase64(file))
      );

      // Ensure price and quantity are sent as numbers
      const productData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity) || 0, // Default to 0 if quantity is missing
        images: base64Images,
      };

      await createProduct(productData);

      // Clear form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        quantity: "",
      });

      setImages([]);
      setImagePreviews([]);
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to create product");
    }
  };

  return (
    // 1. Background (Consistent Gradient)
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white p-6 md:p-10 pt-20 overflow-hidden">
      <AdminMenu />

      <motion.div
        {...containerAnimation} // Apply main container animation
        className="w-full max-w-6xl mx-auto space-y-10"
      >
        <header className="text-center mb-8">
          {/* Title (Consistent with About section styling) */}
          <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-4 drop-shadow-lg">
            ⚡ PRODUCT WIZARD
          </h1>
          <div className="h-1 w-24 bg-orange-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">Create a new item for your MERN e-commerce store.</p>
        </header>

        {/* 2. Form Section (Consistent Card Styling) */}
        <section
          className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm 
                     border border-orange-500/30 rounded-2xl p-6 lg:p-10 shadow-2xl shadow-orange-900/50"
        >
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            {/* CORE DETAILS (GRID) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Name */}
              <motion.div {...itemAnimation(0.1)}>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><Package className="w-4 h-4 mr-2 text-orange-400" />Product Name<span className="text-red-500 ml-1">*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name (Required)"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isCreatingProduct}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200 shadow-inner"
                />
              </motion.div>

              {/* Brand */}
              <motion.div {...itemAnimation(0.2)}>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><Zap className="w-4 h-4 mr-2 text-orange-400" />Brand</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={handleChange}
                  disabled={isCreatingProduct}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200 shadow-inner"
                />
              </motion.div>
              
              {/* Category Dropdown */}
              <motion.div {...itemAnimation(0.3)}>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><Tag className="w-4 h-4 mr-2 text-orange-400" />Category<span className="text-red-500 ml-1">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  disabled={isCreatingProduct}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200 shadow-inner appearance-none"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id} className="bg-gray-900 text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Price */}
              <motion.div {...itemAnimation(0.4)}>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><DollarSign className="w-4 h-4 mr-2 text-orange-400" />Price<span className="text-red-500 ml-1">*</span></label>
                <input
                  type="number"
                  name="price"
                  placeholder="Price (Required)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  disabled={isCreatingProduct}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200 shadow-inner"
                />
              </motion.div>

              {/* Quantity */}
              <motion.div {...itemAnimation(0.5)}>
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center"><Hash className="w-4 h-4 mr-2 text-orange-400" />Stock Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Stock Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  disabled={isCreatingProduct}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200 shadow-inner"
                />
              </motion.div>
            </div>

            {/* DESCRIPTION */}
            <motion.div {...itemAnimation(0.6)}>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <List className="w-4 h-4 mr-2 text-orange-400" />
                Detailed Product Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your product's features, materials, and benefits..."
                value={formData.description}
                onChange={handleChange}
                rows="6"
                disabled={isCreatingProduct}
                className="w-full p-4 rounded-xl bg-black/50 text-white border border-orange-800 
                           focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                           outline-none transition duration-200 shadow-inner resize-y"
              />
            </motion.div>

            {/* IMAGE UPLOAD & PREVIEWS */}
            <motion.div
              {...itemAnimation(0.7)}
              className="border border-dashed border-orange-500/50 p-6 rounded-2xl bg-black/30"
            >
              <label className="block text-orange-400 text-xl font-medium mb-4 flex items-center">
                <Layers className="w-6 h-6 mr-3" /> Visual Assets (Max 5 Images)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                disabled={isCreatingProduct}
                // Custom file input styling to match theme
                className="w-full text-sm text-gray-300
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-orange-600 file:text-black
                          hover:file:bg-orange-500 transition duration-300
                          bg-orange-950/50 rounded-lg p-2 border border-orange-800"
              />

              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6 justify-center p-4 bg-black/20 rounded-xl border border-orange-900/50">
                  {imagePreviews.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      alt={`preview ${i + 1}`}
                      initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 10, delay: i * 0.05 }}
                      className="w-24 h-24 object-cover rounded-xl border-4 border-orange-400 shadow-lg shadow-orange-900/70"
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* SUBMIT BUTTON */}
            <motion.button
              {...itemAnimation(0.8)} // Added a sequential delay to the button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isCreatingProduct}
              // Consistent Gradient/Shadow button style
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-black 
                         py-4 rounded-xl font-bold text-xl shadow-2xl shadow-orange-500/50 
                         transition-all duration-300 hover:from-orange-500 hover:to-orange-600 
                         disabled:from-gray-600 disabled:to-gray-500 disabled:shadow-none
                         flex items-center justify-center gap-3 mt-10"
            >
              {isCreatingProduct ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" /> PROCESSING DATA...
                </>
              ) : (
                <>
                  <Save className="w-6 h-6" /> ADD PRODUCT TO INVENTORY
                </>
              )}
            </motion.button>
          </form>
        </section>
      </motion.div>
    </div>
  );
};

export default Product;