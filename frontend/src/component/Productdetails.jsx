import React, { useState } from "react";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import { useProductStore } from "../zustand/product";
import { useCartStore } from "../zustand/cart";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingBag, Zap, ArrowRight } from 'lucide-react';

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products } = useProductStore();
  const { addToCart } = useCartStore();

  const [showReviews, setShowReviews] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-orange-950 to-black text-orange-500 text-2xl">
        <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 text-center">
          Product not found.
        </div>
      </div>
    );
  }

  // ADD TO CART HANDLER
  const handleAddToCart = () => {
    addToCart({ ...product, qty: 1 });
    alert("Added to cart!");
  };

  // BUY NOW HANDLER
  const handleBuyNow = () => {
    addToCart({ ...product, qty: 1 });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white px-4 md:px-8 lg:px-16 py-12 relative">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 bg-gradient-to-br from-orange-900/20 to-black/40 
                   backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/60 
                   text-orange-400 p-4 rounded-full shadow-lg 
                   hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 
                   group animate-fade-in"
      >
        <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 animate-fade-in-up">

        {/* LEFT : IMAGES */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-80 md:h-96 object-cover rounded-xl shadow-lg transition-all duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black/20">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                    idx === selectedImage 
                      ? "ring-2 ring-orange-500 scale-105" 
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={img}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT : DETAILS */}
        <div className="flex flex-col justify-center space-y-6 animate-slide-left">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-orange-500 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-orange-900/30 to-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-500/30">
                <span className="text-orange-300 font-bold text-sm">
                  Brand: {product.brand}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-gradient-to-r from-orange-900/30 to-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-orange-500/30">
                <FaStar className="text-orange-400 text-xl" />
                <span className="text-lg font-bold text-orange-300">
                  {product.rating?.toFixed(1) || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed text-lg md:text-xl">
            {product.description}
          </p>

          <div className="space-y-2">
            <p className="text-5xl md:text-6xl font-black text-orange-500 mb-2 drop-shadow-lg">
              ₹{product.price}
            </p>
            <div className="h-1 w-16 bg-orange-500"></div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-full overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </span>
            </button>

            <button
              onClick={handleBuyNow}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-orange-300 bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-full border border-orange-500/30 hover:border-orange-500/60 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Buy Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          <button
            onClick={() => setShowReviews(true)}
            className="text-orange-400 hover:text-orange-300 text-lg font-medium transition-colors duration-300 group flex items-center gap-2 w-fit"
          >
            Read All Reviews ({product.reviews?.length || 0})
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* REVIEWS MODAL */}
      {showReviews && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center p-4 z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl shadow-orange-500/20 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-orange-400">
                Customer Reviews
              </h2>
              <button
                onClick={() => setShowReviews(false)}
                className="text-orange-400 hover:text-orange-300 transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            {product.reviews?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 text-lg">No reviews yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {product.reviews?.map((review, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-orange-900/15 to-black/30 backdrop-blur-sm border border-orange-500/25 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-xl font-bold text-orange-300">
                        {review.user?.name || review.user?.username || review.name || "Anonymous"}
                      </p>
                      <div className="flex items-center gap-1 text-orange-400">
                        {Array.from({ length: review.rating }).map((_, idx) => (
                          <FaStar key={idx} className="w-4 h-4" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowReviews(false)}
              className="mt-8 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Close Reviews
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productdetails;