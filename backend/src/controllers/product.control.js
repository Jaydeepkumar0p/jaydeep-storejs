import Product from "../models/productModel.js";
import asyncHandler from "../config/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (img) => {
  const result = await cloudinary.uploader.upload(img, {
    folder: "product_images",
    resource_type: "auto",
  });
  return result.secure_url;
};

export const addproduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, brand, quantity, images } = req.body;
    if (!name || !description || !price || !category || !brand || !quantity)
      return res.status(400).json({ message: "All fields are required" });

    let uploadedImages = [];
    if (images && images.length > 0) {
      for (const img of images) uploadedImages.push(await uploadToCloudinary(img));
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      quantity,
      images: uploadedImages,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const fetchproducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .populate("category", "name");
    res.status(200).json({ products, page: 1, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, brand, quantity, images } = req.body;
    if (!name || !description || !price || !category || !brand || !quantity)
      return res.status(400).json({ message: "All fields are required" });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let uploadedImages = product.images;
    if (images && images.length > 0) {
      uploadedImages = [];
      for (const img of images) uploadedImages.push(await uploadToCloudinary(img));
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.quantity = quantity;
    product.images = uploadedImages;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const getProductbyId = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const fetchAllproducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const addproductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) return res.status(400).json({ message: "Product already reviewed" });

    const review = { name: req.user.username, rating: Number(rating), comment, user: req.user._id };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const topProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(5);
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const newProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export const uploadProductImage = asyncHandler(async (req, res) => {
  try {
    const { images } = req.body;
    const productId = req.params.id;
    if (!images || images.length === 0) return res.status(400).json({ message: "No images provided" });

    const uploadedImages = [];
    for (const img of (Array.isArray(images) ? images : [images])) {
      uploadedImages.push(await uploadToCloudinary(img));
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { images: { $each: uploadedImages } } },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Image(s) uploaded successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error during image upload", error: err.message });
  }
});
