import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryStore } from "../../zustand/category";
import AdminMenu from "../admin/AdminMenu";
import { LayoutGrid, Search, Plus, Tag, Pencil, Trash2, X } from "lucide-react"; // Import Lucide Icons

const CategoryList = () => {
  const {
    categories,
    getAllCategories,
    deleteCategory,
    updateCategory,
    createCategory,
  } = useCategoryStore();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Enter category name");

    await createCategory({ name });
    setName("");
    getAllCategories();
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setUpdateName(cat.name);
    setModalVisible(true);
  };
  
  // IMPROVEMENT: Added explicit refresh after update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateName.trim()) return alert("Category name cannot be empty");
    try {
        await updateCategory(selectedCategory._id, { name: updateName });
        setModalVisible(false);
        // Force refresh to update the list immediately
        getAllCategories(); 
    } catch (error) {
        console.error("Error updating category:", error);
    }
  };
  
  // IMPROVEMENT: Added explicit refresh after delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? This cannot be undone.")) {
      try {
        await deleteCategory(id);
        // Force refresh to update the list immediately
        getAllCategories(); 
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };


  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    // 1. Theme Change: Primary background is the gradient
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white p-6 md:p-10 pt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AdminMenu />

        {/* Page Title: Consistent with About/Product Section Style */}
        <header className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-orange-500 mb-4 drop-shadow-lg"
          >
            <LayoutGrid className="inline w-8 h-8 md:w-10 md:h-10 mr-3 align-text-bottom" />
            CATEGORY MANAGEMENT
          </motion.h1>
          <div className="h-1 w-32 bg-orange-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-lg">Organize and manage your product catalog structure.</p>
        </header>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Add Category Box: Gradient accents, dark background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm 
                        p-8 rounded-2xl shadow-2xl border border-orange-500/30 w-full lg:col-span-1
                        shadow-orange-900/50 h-fit sticky top-24" // Added sticky for better UX
          >
            <h2 className="text-2xl font-bold text-orange-300 mb-6 flex items-center gap-3">
              <Plus className="w-6 h-6 text-orange-500" /> Create New Category
            </h2>

            <form onSubmit={handleCreate} className="flex flex-col gap-6">
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 pointer-events-none" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200 shadow-inner"
                />
              </div>
              
              {/* IMPROVED Button Design */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-black 
                            py-3 rounded-xl font-extrabold text-lg shadow-xl shadow-orange-500/40 
                            transition-all duration-300 hover:from-orange-500 hover:to-red-500 hover:shadow-orange-400/60"
              >
                <Plus className="inline w-5 h-5 mr-2" /> Submit Category
              </motion.button>
            </form>
          </motion.div>

          {/* Category List: Gradient accents, dark background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: 0.1 }}
            className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm 
                        p-8 rounded-2xl shadow-2xl border border-orange-500/30 w-full lg:col-span-2
                        shadow-orange-900/50"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-orange-300 flex items-center gap-3">
                <LayoutGrid className="w-6 h-6 text-orange-500" /> Total Categories ({filteredCategories.length})
              </h2>
              
              {/* Search Bar: Updated style */}
              <motion.div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-black/50 text-white 
                              border border-orange-800 focus:ring-2 focus:ring-orange-500 
                              focus:border-orange-500 outline-none transition duration-200 shadow-inner"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
              </motion.div>
            </div>

            {/* List Container: Orange accents on items and scrollbar */}
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-3 custom-scrollbar-orange">
              <AnimatePresence>
                {filteredCategories.map((cat, index) => (
                  <motion.div
                    key={cat._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: "tween", duration: 0.3, delay: index * 0.04 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 8px 25px rgba(251, 146, 60, 0.4)",
                      backgroundColor: "rgba(44, 44, 44, 0.9)"
                    }}
                    className="flex justify-between items-center bg-[#2c2c2c]/70 p-4 
                                 rounded-xl shadow-lg border-l-4 border-orange-500 transition-all text-lg group"
                  >
                    <span className="text-white font-medium tracking-wide flex items-center gap-2">
                        <Tag className="w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors" />
                        {cat.name}
                    </span>

                    <div className="flex gap-3">
                      {/* IMPROVED Edit Button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(cat)}
                        className="flex items-center bg-orange-500/20 text-orange-300 hover:bg-orange-500 hover:text-black 
                                    shadow-md px-4 py-2 rounded-lg font-medium transition duration-200 text-sm border border-orange-500/50"
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </motion.button>

                      {/* IMPROVED Delete Button */}
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(cat._id)} // Changed to use the new handleDelete
                        className="flex items-center bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white 
                                    shadow-md px-4 py-2 rounded-lg font-medium transition duration-200 text-sm border border-red-600/50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredCategories.length === 0 && (
                <p className="text-gray-400 text-center py-12 text-lg border border-dashed border-orange-900 rounded-xl mt-4">No categories defined yet. Use the panel on the left to create one.</p>
              )}
            </div>
            
            {/* Scrollbar style with orange (kept for self-containment) */}
            <style jsx="true">{`
              .custom-scrollbar-orange::-webkit-scrollbar {
                width: 10px; 
              }
              .custom-scrollbar-orange::-webkit-scrollbar-thumb {
                background-color: #f97316; /* orange-600 */
                border-radius: 5px;
              }
              .custom-scrollbar-orange::-webkit-scrollbar-track {
                background: #1a1a1a; /* dark grey track */
                border-radius: 5px;
              }
            `}</style>
          </motion.div>
        </div>

        {/* Edit Modal (Orange accents) */}
        <AnimatePresence>
          {modalVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="bg-gradient-to-br from-orange-900/30 to-black/50 p-8 rounded-2xl border border-orange-500/50
                            shadow-2xl w-full max-w-lg shadow-orange-500/30 relative"
              >
                {/* Close Button */}
                <motion.button 
                    onClick={() => setModalVisible(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-red-600/30 hover:bg-red-600 text-white transition"
                >
                    <X className="w-5 h-5" />
                </motion.button>

                <h2 className="text-2xl text-orange-300 font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Pencil className="w-5 h-5" /> Update Category Name
                </h2>

                <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 text-white border border-orange-800 
                               focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                               outline-none transition duration-200 shadow-inner"
                  />

                  <div className="flex gap-4">
                    {/* IMPROVED Modal Save Button */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-extrabold py-3 rounded-xl text-lg shadow-lg shadow-orange-500/30 transition"
                    >
                      Save Changes
                    </motion.button>

                    {/* IMPROVED Modal Cancel Button */}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setModalVisible(false)}
                      className="flex-1 bg-black/40 border border-gray-600 text-gray-200 hover:bg-black/60 font-bold py-3 rounded-xl text-lg transition shadow-md hover:border-orange-500"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoryList;