import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader2, ArrowRight, Zap, Sparkles } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) return setError("Session ID missing");

        await axios.post(
          import.meta.env.MODE === "development" 
            ? "http://localhost:5000/api/order/mark-paid" 
            : "/api/order/mark-paid",
          { sessionId },
          { withCredentials: true }
        );
      } catch (err) {
        console.error(err);
        setError("Failed to verify payment");
      } finally {
        setLoading(false);
      }
    };
    verifyPayment();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-orange-950 to-black px-4 py-8">
      <div className="max-w-lg w-full animate-fade-in-up">
        
        {/* Loading State */}
        {loading && (
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-orange-500/30 p-8 sm:p-12 text-center hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20">
            <div className="relative inline-block mb-6">
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
              <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-orange-400 mb-4 tracking-wide">
              Processing Payment
            </h2>
            <p className="text-gray-400 text-lg mb-2">
              Verifying your transaction...
            </p>
            <p className="text-gray-500 text-sm">
              Please wait while we confirm your payment
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-red-500/30 p-8 sm:p-12 text-center hover:border-red-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 animate-fade-in">
            <div className="relative inline-block mb-6">
              <XCircle className="w-20 h-20 text-red-500 drop-shadow-lg" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-red-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-red-400 mb-4 tracking-wide">
              Payment Verification Failed
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {error}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 border border-red-400/50 w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Try Again
              </span>
            </button>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-orange-500/30 p-8 sm:p-12 text-center hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in">
            <div className="relative inline-block mb-6">
              <CheckCircle className="w-20 h-20 text-orange-500 drop-shadow-lg" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-orange-400 animate-pulse" />
              </div>
              {/* Animated Rings */}
              <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-2 border-orange-400/40 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-orange-500 mb-4 tracking-wide leading-tight">
              Payment Successful!
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-gray-300 text-lg leading-relaxed">
                Thank you for your purchase. Your order has been successfully processed.
              </p>
              <p className="text-gray-400 text-sm">
                Order confirmation and tracking details will be sent to your email.
              </p>
            </div>

            {/* Success Details */}
            <div className="bg-gradient-to-br from-orange-900/30 to-black/50 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-orange-500/20">
              <div className="flex items-center justify-center gap-2 text-orange-400 text-sm">
                <Zap className="w-4 h-4" />
                <span>Transaction Verified</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <button
              onClick={() => navigate("/shop")}
              className="group relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 border border-orange-300/50"
            >
              <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                Continue Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            {/* Additional Options */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/mineorders")}
                className="text-orange-400 hover:text-orange-300 transition-colors duration-300 text-sm font-medium group flex items-center gap-2 justify-center"
              >
                View Order Details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;