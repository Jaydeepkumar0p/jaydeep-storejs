import React from "react";
import { useCartStore } from "../zustand/cart";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import { ShoppingCart, ArrowRight, Zap, Crosshair } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQty } = useCartStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  if (!cartItems.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-orange-950 to-black text-white p-6">
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl p-12 border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-500 mb-8">
            <ShoppingCart className="w-24 h-24 text-orange-500/50 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-4 tracking-wide">
              Cart Empty
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Your cyber gear collection awaits. Explore our premium products.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-full overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                <FaShoppingBag className="w-5 h-5" />
                Explore Products
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-slide-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl border border-orange-500/30">
              <ShoppingCart className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-orange-500 mb-2 tracking-tight">
                Shopping Cart
              </h1>
              <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-400 text-lg pl-14">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>

        {/* Cart Container */}
        <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in-up">
          
          {/* Cart Items */}
          <div className="p-6 sm:p-8">
            {cartItems.map((item, idx) => (
              <div
                key={item._id}
                className="group flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-b border-orange-500/20 last:border-b-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* LEFT — IMAGE + INFO */}
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                  <div className="relative">
                    <img
                      src={(item.images && item.images[0]) || item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border-2 border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black text-xs font-black px-2 py-1 rounded-full border border-orange-300/50">
                      {item.qty}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-black text-orange-300 mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
                      {item.name}
                    </h2>
                    <p className="text-orange-500 font-bold text-lg mb-3">
                      ₹{item.price}
                    </p>

                    {/* QTY BUTTONS */}
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 bg-gradient-to-br from-orange-900/30 to-black/50 backdrop-blur-sm rounded-xl border border-orange-500/30 hover:border-orange-500/60 hover:scale-110 transition-all duration-300 group/btn"
                        onClick={() =>
                          updateQty(item._id, Math.max(1, item.qty - 1))
                        }
                      >
                        <FaMinus className="w-3 h-3 text-orange-400 group-hover/btn:text-orange-300" />
                      </button>

                      <span className="px-4 py-2 bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-xl border border-orange-500/20 min-w-12 text-center font-bold text-orange-300">
                        {item.qty}
                      </span>

                      <button
                        className="p-2 bg-gradient-to-br from-orange-900/30 to-black/50 backdrop-blur-sm rounded-xl border border-orange-500/30 hover:border-orange-500/60 hover:scale-110 transition-all duration-300 group/btn"
                        onClick={() => updateQty(item._id, item.qty + 1)}
                      >
                        <FaPlus className="w-3 h-3 text-orange-400 group-hover/btn:text-orange-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT — PRICE + DELETE */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-2xl font-black text-orange-500 bg-gradient-to-r from-orange-900/20 to-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-orange-500/30">
                    ₹{item.qty * item.price}
                  </span>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="group/delete p-3 bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-sm rounded-xl border border-red-500/30 hover:border-red-500/60 hover:scale-110 transition-all duration-300"
                  >
                    <FaTrash className="w-4 h-4 text-red-400 group-hover/delete:text-red-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUBTOTAL & BUTTONS */}
          <div className="bg-gradient-to-r from-orange-900/30 to-black/50 backdrop-blur-lg border-t border-orange-500/20 rounded-b-3xl p-6 sm:p-8">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-8 p-4 bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl border border-orange-500/30">
              <div className="flex items-center gap-3">
                <Crosshair className="w-6 h-6 text-orange-400" />
                <span className="text-xl font-bold text-orange-300">Subtotal:</span>
              </div>
              <span className="text-3xl font-black text-orange-500">₹{subtotal}</span>
            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/checkout")}
                className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 border border-orange-300/50"
              >
                <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button
                onClick={() => navigate("/shop")}
                className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-orange-300 bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl border border-orange-500/30 hover:border-orange-500/60 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-105"
              >
                <span className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-3">
                  <FaArrowLeft className="w-5 h-5" />
                  Continue Shopping
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;