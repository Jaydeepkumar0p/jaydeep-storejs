import React, { useEffect, useState } from "react";
import { useProductStore } from "../../zustand/product";
import { useCategoryStore } from "../../zustand/category";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../admin/AdminMenu";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    getProductById,
    updateProduct,
    isUpdatingProduct,
    currentProduct,
  } = useProductStore();

  const { categories, getAllCategories } = useCategoryStore();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [photo, setPhoto] = useState(null);

  // Load product + categories
  useEffect(() => {
    getProductById(id);
    getAllCategories();
  }, [id, getProductById, getAllCategories]);

  // Populate form once product is loaded
  useEffect(() => {
    if (currentProduct) {
      setData({
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        category: currentProduct.category,
      });
    }
  }, [currentProduct]);

  // Handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", data.name);
    form.append("description", data.description);
    form.append("price", data.price);
    form.append("category", data.category);
    if (photo) form.append("photo", photo);

    const success = await updateProduct(id, form);

    if (success) {
      navigate("/dashboard/admin/all-products");
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <AdminMenu />

      <div className="container mx-auto px-6 pt-20 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-green-400">Edit Product</h1>

        {/* If product is still loading */}
        {!currentProduct && <p className="text-gray-400">Loading product...</p>}

        {currentProduct && (
          <form onSubmit={handleSubmit} className="space-y-4 bg-[#1a1a1a] p-6 rounded-xl">

            {/* Name */}
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-3 rounded-lg bg-[#222] text-white"
              required
            />

            {/* Description */}
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-full p-3 rounded-lg bg-[#222] text-white"
              rows={4}
              required
            ></textarea>

            {/* Price */}
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-3 rounded-lg bg-[#222] text-white"
              required
            />

            {/* Category */}
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#222] text-white"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Photo Upload */}
            <div>
              <label className="block mb-2">Product Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full"
              />
            </div>

            {/* Show existing image */}
            {currentProduct.photo && (
              <img
                src={currentProduct.photo}
                alt="product"
                className="w-32 h-32 object-cover rounded-lg mt-2"
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUpdatingProduct}
              className="w-full p-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-400 transition"
            >
              {isUpdatingProduct ? "Updating..." : "Update Product"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
