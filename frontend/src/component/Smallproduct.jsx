import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Eye, Zap, ArrowRight, Sparkles } from 'lucide-react';

const SmallProduct = ({ product, categoryName }) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-orange-900/20 via-black/40 to-orange-950/30 
        backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden 
        border border-orange-500/20 hover:border-orange-400/60
        transition-all duration-500 md:duration-700 
        hover:shadow-lg md:hover:shadow-2xl hover:shadow-orange-500/20 md:hover:shadow-orange-500/30 
        hover:-translate-y-1 md:hover:-translate-y-2 lg:hover:-translate-y-3
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 
        before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500
        w-full max-w-xs mx-auto sm:max-w-none"
    >
      {/* Animated Background Glow - Hidden on mobile for performance */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-600/0 
        opacity-0 md:group-hover:opacity-100 transition-all duration-1000 pointer-events-none hidden sm:block">
        <div className="absolute top-0 left-0 w-24 md:w-32 h-24 md:h-32 bg-orange-500/10 rounded-full blur-lg md:blur-xl -translate-x-1/2 -translate-y-1/2 
          md:group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="absolute bottom-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-orange-600/10 rounded-full blur-lg md:blur-xl translate-x-1/2 translate-y-1/2 
          md:group-hover:scale-150 transition-transform duration-1000"></div>
      </div>
      
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-40 xs:h-44 sm:h-48 md:h-52 object-cover 
            transition-transform duration-500 md:duration-700 group-hover:scale-105 md:group-hover:scale-110"
        />

        {/* Premium Badge */}
        {product.rating >= 4.5 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-yellow-500 to-yellow-600 
            text-black text-xs font-black px-2 sm:px-2.5 py-1 rounded-full 
            flex items-center gap-1 shadow-lg sm:shadow-2xl shadow-yellow-500/50
            border border-yellow-300/50 z-20
            transition-all duration-300 group-hover:scale-105 md:group-hover:scale-110">
            <Sparkles className="w-3 h-3" />
            <span className="hidden xs:inline">Premium</span>
          </div>
        )}

        {/* Rating Badge */}
        <div
          className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-orange-500 to-orange-600 
            text-black text-xs sm:text-sm font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
            flex items-center gap-1 shadow-lg sm:shadow-2xl shadow-orange-500/50
            border border-orange-300/50 z-20
            transition-all duration-300 group-hover:scale-105 md:group-hover:scale-110 md:group-hover:rotate-12"
        >
          <FaStar className="text-yellow-300 drop-shadow w-2 h-2 sm:w-3 sm:h-3" />
          {product.rating?.toFixed(1) || "N/A"}
        </div>

        {/* Hover Overlay - Enhanced for touch devices */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 md:from-orange-900/80 via-orange-500/10 to-transparent 
          opacity-0 md:group-hover:opacity-100 
          transition-all duration-500 flex items-end justify-center pb-4 md:pb-6 z-10
          active:opacity-100 md:active:opacity-0">
          <div className="transform translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 md:duration-700 flex items-center gap-2">
            <Eye className="w-4 h-4 md:w-5 md:h-5 text-orange-300 drop-shadow-lg" />
            <span className="text-orange-200 font-bold text-xs md:text-sm hidden sm:block">Quick View</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 md:p-6 relative z-20 bg-gradient-to-b from-transparent to-black/20">
        {/* Category Tag */}
        <div className="mb-3 sm:mb-4">
          <span className="inline-block bg-gradient-to-r from-orange-900/50 to-black/60 
            backdrop-blur-md text-orange-300 text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full 
            border border-orange-500/40 group-hover:border-orange-400/60
            transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/20
            max-w-full truncate">
            {categoryName}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-orange-400 font-black text-base sm:text-lg md:text-xl mb-2 sm:mb-3 line-clamp-2 leading-tight 
          group-hover:text-orange-300 transition-colors duration-300 group-hover:drop-shadow-lg
          min-h-[2.5rem] sm:min-h-[3rem] flex items-center">
          {product.name}
        </h3>

        {/* Brand */}
        <p className="text-gray-400 text-xs sm:text-sm font-semibold mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2 
          group-hover:text-gray-300 transition-colors duration-300">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 group-hover:text-orange-400 transition-colors duration-300 flex-shrink-0" />
          <span className="truncate">{product.brand}</span>
        </p>

        {/* Price + View Button */}
        <div className="flex justify-between items-center mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-orange-500/20 group-hover:border-orange-400/40 transition-colors duration-300">
          <div className="flex flex-col min-w-0 flex-1 mr-3">
            <span className="text-orange-500 font-black text-xl sm:text-2xl tracking-tight drop-shadow-lg truncate">
              ₹{product.price}
            </span>
            <span className="text-gray-500 text-xs font-medium group-hover:text-gray-400 transition-colors duration-300 hidden sm:block">
              EXCLUSIVE PRICE
            </span>
          </div>

          <Link
            to={`/product/${product._id}`}
            className="group/btn relative inline-flex items-center justify-center 
              bg-gradient-to-r from-orange-500 to-orange-600 
              hover:from-orange-400 hover:to-orange-500
              text-black text-xs sm:text-sm font-black py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl 
              transition-all duration-300 
              hover:shadow-lg sm:hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95
              border border-orange-300/60 hover:border-orange-200/80
              overflow-hidden flex-shrink-0
              min-w-[80px] sm:min-w-[100px]"
          >
            {/* Button Shine Effect - Hidden on mobile for performance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              -skew-x-12 translate-x-[-100%] md:group-hover/btn:translate-x-[100%] transition-transform duration-1000 hidden sm:block"></div>
            
            <span className="relative flex items-center gap-1 sm:gap-2">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="hidden xs:inline">Explore</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/btn:translate-x-1 hidden sm:block" />
            </span>
          </Link>
        </div>
      </div>

      {/* Animated Corner Accents - Hidden on mobile for performance */}
      <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-orange-400/60 
        rounded-tl-2xl sm:rounded-tl-3xl opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:duration-700 
        md:group-hover:scale-150 hidden sm:block"></div>
      <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-orange-400/60 
        rounded-tr-2xl sm:rounded-tr-3xl opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:duration-700 
        md:group-hover:scale-150 hidden sm:block"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-orange-400/60 
        rounded-bl-2xl sm:rounded-bl-3xl opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:duration-700 
        md:group-hover:scale-150 hidden sm:block"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-orange-400/60 
        rounded-br-2xl sm:rounded-br-3xl opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:duration-700 
        md:group-hover:scale-150 hidden sm:block"></div>

      {/* Pulse Effect - Hidden on mobile for performance */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-orange-400/0 
        md:group-hover:border-orange-400/30 md:group-hover:animate-pulse-slow transition-all duration-500 pointer-events-none hidden sm:block"></div>

      {/* Touch Feedback for Mobile */}
      <div className="absolute inset-0 bg-white/5 opacity-0 active:opacity-100 transition-opacity duration-200 md:hidden rounded-2xl"></div>
    </div>
  );
};

export default SmallProduct;