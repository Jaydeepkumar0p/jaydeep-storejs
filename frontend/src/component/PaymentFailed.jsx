import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, AlertTriangle, RotateCcw, Zap, ArrowRight } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-black px-4 py-8">
      <div className="max-w-md w-full animate-fade-in-up">
        <div className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-red-500/30 p-8 sm:p-12 text-center hover:border-red-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
          
          {/* Error Icon */}
          <div className="relative inline-block mb-6">
            <XCircle className="w-20 h-20 text-red-500 drop-shadow-lg" />
            <div className="absolute -top-2 -right-2">
              <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
            </div>
            {/* Animated Rings */}
            <div className="absolute inset-0 border-4 border-red-500/20 rounded-full animate-ping"></div>
            <div className="absolute inset-2 border-2 border-red-400/30 rounded-full animate-pulse"></div>
          </div>
          
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl font-black text-red-500 mb-4 tracking-wide leading-tight">
            Payment Failed
          </h1>
          
          {/* Description */}
          <div className="space-y-3 mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">
              Your payment was not completed. Please try again.
            </p>
            <p className="text-gray-400 text-sm">
              Check your payment details and ensure sufficient funds.
            </p>
          </div>

          {/* Status Indicator */}
          <div className="bg-gradient-to-br from-red-900/30 to-black/50 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-red-500/20">
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>Transaction Declined</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 border border-red-400/50 mb-4"
          >
            <span className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-3">
              <RotateCcw className="w-5 h-5" />
              Try Again
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          {/* Secondary Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/cart")}
              className="text-red-400 hover:text-red-300 transition-colors duration-300 text-sm font-medium group flex items-center gap-2 justify-center"
            >
              Review Cart
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <span className="text-gray-600 hidden sm:inline">•</span>
            
            <button
              onClick={() => navigate("/shop")}
              className="text-gray-400 hover:text-gray-300 transition-colors duration-300 text-sm font-medium group flex items-center gap-2 justify-center"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Support Text */}
          <div className="mt-6 pt-4 border-t border-red-500/20">
            <p className="text-gray-500 text-xs">
              Need help? Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;