import React from "react";
import { useState, useEffect } from "react";
import AdminMenu from "../admin/AdminMenu";
import { useProductStore } from "../../zustand/product";
import { useCategoryStore } from "../../zustand/category";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListChecks,
  Search,
  Tag,
  Zap,
  Package,
  DollarSign,
  Hash,
  Layers,
  Save,
  Loader2,
  X,
  Pencil,
  Trash2,
  Filter, // New icon for filtering section
  ChevronDown, // New icon for select dropdown
} from "lucide-react";

const Allproduct = () => {
  const {
    getAllProducts,
    products,
    isLoadingProducts,
    deleteProduct,
    updateProduct,
  } = useProductStore();
  const { categories, getAllCategories } = useCategoryStore();

  const [editingProduct, setEditingProduct] = useState(null);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchBrand, setSearchBrand] = useState("");

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
    getAllProducts();
    getAllCategories();
  }, [getAllProducts, getAllCategories]);

  // ⭐ Combined Search Filters
  const filteredProducts = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = searchCategory ? p.category === searchCategory : true;

    const matchesBrand = searchBrand
      ? p.brand?.toLowerCase().includes(searchBrand.toLowerCase())
      : true;

    return matchesName && matchesCategory && matchesBrand;
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price?.toString() || "",
      category: product.category || "",
      brand: product.brand || "",
      quantity: product.quantity?.toString() || "",
    });

    setImages([]);
    const initialImg =
      product.photo || product.image || product.images?.[0] || null;
    setImagePreviews(initialImg ? [initialImg] : []);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Name, Price, Category required!");
      return;
    }

    let base64Images = imagePreviews;

    if (images.length > 0) {
      base64Images = await Promise.all(
        images.map((file) => convertToBase64(file))
      );
    }

    const updatedData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity) || 0,
      images: base64Images,
    };

    await updateProduct(editingProduct._id, updatedData);

    setEditingProduct(null);
    setImages([]);
    setImagePreviews([]);
    getAllProducts();
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setImages([]);
    setImagePreviews([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?"))
      await deleteProduct(id);
  };

  const getImage = (product) => {
    return (
      product.photo ||
      product.image ||
      product.imageUrl ||
      product.images?.[0] ||
      null
    );
  };

  const getCategoryName = (categoryId) => {
    const found = categories.find((cat) => cat._id === categoryId);
    return found ? found.name : "N/A";
  };

  // --- Framer Motion Variants ---
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  // ------------------------------

  return (
    // 1. Theme Change: Primary background is the gradient
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white p-6 md:p-10 pt-20 overflow-hidden">
      <AdminMenu />

      <div className="container mx-auto px-4 sm:px-6 pt-4 max-w-7xl">
        {/* Page Title: Consistent Style */}
        <header className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-orange-500 mb-4 drop-shadow-lg"
          >
            <ListChecks className="inline w-8 h-8 md:w-10 md:h-10 mr-3 align-text-bottom" />
            INVENTORY LIST
          </motion.h1>
          <div className="h-1 w-28 bg-orange-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">Inventory Overview: Edit, Delete, and Filter products.</p>
        </header>

        {/* 🔍 SEARCH FILTERS SECTION (IMPROVED LAYOUT) */}
        <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="mb-10 p-6 bg-gradient-to-br from-orange-900/20 to-black/40 border border-orange-500/30 rounded-2xl shadow-xl shadow-orange-900/30"
        >
          <h3 className="text-xl font-semibold text-orange-300 mb-5 flex items-center gap-2">
            <Filter className="w-5 h-5 text-orange-500" /> Advanced Filter
          </h3>
          {/* Use a clear grid layout for better structure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* NAME SEARCH */}
            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                placeholder="Search product name..."
                className="w-full px-4 py-3 pl-10 rounded-xl bg-black/50 text-white border border-orange-800 
                          focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200 shadow-inner"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* CATEGORY SEARCH */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 pointer-events-none" />
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-xl bg-black/50 text-white border border-orange-800 
                          focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200 shadow-inner appearance-none"
              >
                <option value="">Filter by Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id} className="bg-gray-900">
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 pointer-events-none" />
            </div>

            {/* BRAND SEARCH */}
            <div className="relative">
              <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                placeholder="Search by brand..."
                className="w-full px-4 py-3 pl-10 rounded-xl bg-black/50 text-white border border-orange-800 
                          focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition duration-200 shadow-inner"
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
              />
            </div>
          </div>
        </motion.div>
        
        {/* EDIT FORM (Modal/Section) */}
        <AnimatePresence>
          {editingProduct && (
            <motion.section
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-gradient-to-br from-orange-900/30 to-black/50 border border-orange-500/50 rounded-2xl p-6 shadow-2xl mb-8"
            >
              <h2 className="text-2xl font-semibold text-orange-400 mb-5 text-center flex items-center justify-center gap-3">
                <Pencil className="w-6 h-6" /> Editing: {editingProduct.name}
              </h2>

              <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                onSubmit={handleUpdate}
              >
                {/* Inputs (No change needed, inputs match theme) */}
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 focus:ring-orange-500 focus:border-orange-500 shadow-inner"
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 focus:ring-orange-500 focus:border-orange-500 shadow-inner"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 focus:ring-orange-500 focus:border-orange-500 shadow-inner"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Stock"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 focus:ring-orange-500 focus:border-orange-500 shadow-inner"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 focus:ring-orange-500 focus:border-orange-500 shadow-inner appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id} className="bg-gray-900">
                      {cat.name}
                    </option>
                  ))}
                </select>

                <textarea
                  name="description"
                  value={formData.description}
                  placeholder="Description"
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-4 rounded-xl bg-black/50 text-white border border-orange-800 focus:ring-orange-500 focus:border-orange-500 shadow-inner resize-y md:col-span-2 lg:col-span-3"
                />
                
                {/* Image Upload */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-orange-400" /> Change Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-300
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-orange-600 file:text-black
                              hover:file:bg-orange-500 transition duration-300
                              bg-orange-950/50 rounded-lg p-2 border border-orange-800"
                  />
                  {imagePreviews.length > 0 && (
                    <div className="flex gap-3 mt-3 flex-wrap justify-center">
                      {imagePreviews.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`preview ${i + 1}`}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-orange-400"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons (IMPROVED DESIGN) */}
                <div className="md:col-span-2 lg:col-span-3 flex gap-4 mt-4">
                  {/* Save Button (Stronger Glow/Hover) */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex-1 flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-500 text-black 
                               py-3 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/50 transition-all hover:from-orange-500 hover:to-orange-600 hover:shadow-orange-400/60"
                  >
                    <Save className="w-5 h-5 mr-2" /> Save Changes
                  </motion.button>
                  {/* Cancel Button (Muted, High-Contrast Border) */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex-1 flex items-center justify-center bg-black/40 border border-gray-600 text-gray-200 hover:bg-black/60 font-bold py-3 rounded-xl text-lg transition shadow-md hover:border-orange-500"
                  >
                    <X className="w-5 h-5 mr-2" /> Cancel Edit
                  </motion.button>
                </div>
              </form>
            </motion.section>
          )}
        </AnimatePresence>

        {/* PRODUCT LIST */}
        {isLoadingProducts && (
          <p className="text-xl text-orange-300 animate-pulse mt-8 flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin" /> Loading products...
          </p>
        )}

        {!isLoadingProducts && filteredProducts.length === 0 && (
          <p className="text-xl text-gray-400 mt-8 py-10 text-center border border-dashed border-orange-700 rounded-2xl bg-black/20">
            No products match your filter criteria.
          </p>
        )}

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8"
        >
          {filteredProducts.map((product, index) => {
            const img = getImage(product);
            const category = getCategoryName(product.category);

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: index * 0.04 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(251, 146, 60, 0.4)" }}
                className="group bg-gradient-to-br from-orange-900/10 to-black/50 p-4 rounded-xl shadow-lg border border-orange-800/50 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Image */}
                {img ? (
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-36 object-cover rounded-lg mb-3 border-2 border-orange-700/50 transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-36 bg-black/70 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-sm border-2 border-orange-700/50">
                    No Image
                  </div>
                )}

                {/* Details */}
                <h2 className="text-lg font-bold mb-1 text-orange-300 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-400 text-xs mb-2 h-8 overflow-hidden">
                  {product.description?.slice(0, 60)}...
                </p>

                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-orange-400 text-xl font-extrabold flex items-center">
                      <DollarSign size={18} className="text-orange-600 mr-0.5"/> {product.price}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Stock: <span className={`font-semibold ${product.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>{product.quantity || 0}</span>
                    </p>
                  </div>

                  <span className="text-xs font-medium bg-orange-700/60 text-white px-3 py-1 rounded-full border border-orange-600 shadow-sm">
                    {category}
                  </span>
                </div>

                {/* Actions (IMPROVED DESIGN) */}
                <div className="flex gap-2 pt-3 border-t border-orange-700/50">
                  {/* Edit Button (Orange accent, solid fill on hover) */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="flex-1 flex items-center justify-center bg-orange-500/20 text-orange-300 font-semibold p-2 rounded-lg hover:bg-orange-500 hover:text-black text-sm transition-all duration-200 border border-orange-500/50"
                    onClick={() => handleEditClick(product)}
                  >
                    <Pencil size={14} className="mr-1" /> Edit
                  </motion.button>

                  {/* Delete Button (Red accent, solid fill on hover) */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="flex-1 flex items-center justify-center bg-red-600/20 text-red-300 font-semibold p-2 rounded-lg hover:bg-red-600 hover:text-white text-sm transition-all duration-200 border border-red-600/50"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash2 size={14} className="mr-1" /> Delete
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Allproduct;