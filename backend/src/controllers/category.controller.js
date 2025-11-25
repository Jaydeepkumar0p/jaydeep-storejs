import Category from "../models/category.model.js";
import asyncHandler from "../config/asyncHandler.js";

// ✅ Create Category
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(409).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });
  return res
    .status(201)
    .json({ message: "Category created successfully", category });
});

// ✅ Get All Categories
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  return res.status(200).json({ categories });
});

// ✅ Get Category by ID
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.status(200).json({ category });
});

// ✅ Update Category
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res
    .status(200)
    .json({ message: "Category updated successfully", category });
});

// ✅ Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  return res.status(200).json({ message: "Category deleted successfully" });
});
