import React, { useEffect, useState } from "react";
import axios from "axios";
import { Package, Truck, CheckCircle, XCircle, Calendar, MapPin, CreditCard, User, Clock, ArrowRight } from 'lucide-react';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
  setLoading(true);
  setError(null);
  try {
    const { data } = await axios.get(
      import.meta.env.MODE === "development" 
        ? "http://localhost:5000/api/order/mine" 
        : "/api/order/mine", 
      {
        withCredentials: true,
      }
    );
    setOrders(data);
  } catch (err) {
    setError(err.response?.data?.message || err.message);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Cloudinary image optimization - handles the populated product images
  const optimizeImage = (orderItem) => {
    // Check if we have populated product data with images array
    if (orderItem.product && orderItem.product.images && Array.isArray(orderItem.product.images) && orderItem.product.images.length > 0) {
      const imageUrl = orderItem.product.images[0];
      
      // If it's a Cloudinary URL, optimize it
      if (imageUrl.includes('cloudinary.com')) {
        return imageUrl.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto,f_auto/');
      }
      
      return imageUrl;
    }
    
    // Fallback to item.image (direct image field) or placeholder
    if (orderItem.image) {
      const imageUrl = orderItem.image;
      if (imageUrl.includes('cloudinary.com')) {
        return imageUrl.replace('/upload/', '/upload/w_400,h_400,c_fill,q_auto,f_auto/');
      }
      return imageUrl;
    }
    
    return "https://via.placeholder.com/300x300/1a1a1a/666666?text=No+Image";
  };

  // Get product name from populated data or fallback
  const getProductName = (orderItem) => {
    return orderItem.product?.name || orderItem.name || "Unknown Product";
  };

  // Get product brand from populated data or fallback
  const getProductBrand = (orderItem) => {
    return orderItem.product?.brand || orderItem.brand || null;
  };

  // Get product price from populated data or fallback
  const getProductPrice = (orderItem) => {
    return orderItem.product?.price || orderItem.price || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-slide-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl border border-orange-500/30">
              <Package className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-orange-500 mb-2 tracking-tight">
                My Orders
              </h1>
              <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-400 text-lg pl-14">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl p-12 border-2 border-orange-500/30 text-center animate-fade-in">
            <div className="relative inline-block mb-4">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-orange-400 text-xl font-bold">Loading your orders...</p>
            <p className="text-gray-400 mt-2">Please wait while we fetch your order history</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-lg rounded-3xl p-6 border-2 border-red-500/30 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <p className="text-red-400 font-medium">{error}</p>
            </div>
            <button
              onClick={fetchOrders}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-6 animate-fade-in-up">
            {orders.map((order, orderIndex) => (
              <div
                key={order._id}
                className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in-up"
                style={{ animationDelay: `${orderIndex * 100}ms` }}
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-orange-900/30 to-black/50 backdrop-blur-sm rounded-t-3xl p-6 border-b border-orange-500/20">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl border border-orange-500/30">
                        <Package className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-orange-400">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Compact Status Section - Made smaller */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Payment Status - Extra Compact */}
                      <div className="flex items-center gap-1 bg-gradient-to-br from-orange-900/20 to-black/40 px-2 py-1 rounded-full border border-orange-500/20">
                        {order.isPaid ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 font-bold text-xs">Paid</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-400" />
                            <span className="text-red-400 font-bold text-xs">Unpaid</span>
                          </>
                        )}
                      </div>

                      {/* Delivery Status - Extra Compact */}
                      <div className="flex items-center gap-1 bg-gradient-to-br from-orange-900/20 to-black/40 px-2 py-1 rounded-full border border-orange-500/20">
                        {order.isDelivered ? (
                          <>
                            <Truck className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 font-bold text-xs">Delivered</span>
                          </>
                        ) : order.isPaid ? (
                          <>
                            <Clock className="w-3 h-3 text-blue-400" />
                            <span className="text-blue-400 font-bold text-xs">Shipped</span>
                          </>
                        ) : (
                          <>
                            <Package className="w-3 h-3 text-orange-400" />
                            <span className="text-orange-400 font-bold text-xs">Processing</span>
                          </>
                        )}
                      </div>

                      {/* Total Price - Extra Compact */}
                      <div className="text-lg font-black text-orange-500 bg-orange-900/20 px-2 py-1 rounded-full border border-orange-500/30">
                        ${order.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div className="mb-6 p-4 bg-gradient-to-br from-orange-900/15 to-black/30 rounded-2xl border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-5 h-5 text-orange-400" />
                        <h4 className="text-lg font-bold text-orange-300">Shipping Address</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-200 font-semibold">{order.shippingAddress.name}</p>
                          <p className="text-gray-400">{order.shippingAddress.address}</p>
                          <p className="text-gray-400">
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                          </p>
                          <p className="text-gray-400">{order.shippingAddress.country}</p>
                        </div>
                        {order.shippingAddress.email && (
                          <div>
                            <p className="text-gray-200 font-semibold">Contact</p>
                            <p className="text-gray-400">{order.shippingAddress.email}</p>
                            {order.shippingAddress.phone && (
                              <p className="text-gray-400">{order.shippingAddress.phone}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  {order.paymentMethod && (
                    <div className="mb-6 p-4 bg-gradient-to-br from-orange-900/15 to-black/30 rounded-2xl border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard className="w-5 h-5 text-orange-400" />
                        <h4 className="text-lg font-bold text-orange-300">Payment Method</h4>
                      </div>
                      <p className="text-gray-200 font-semibold capitalize">{order.paymentMethod}</p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-orange-400" />
                      <h4 className="text-lg font-bold text-orange-300">
                        Order Items ({order.orderItems.length})
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {order.orderItems.map((item, itemIndex) => (
                        <div
                          key={item.product?._id || itemIndex}
                          className="group bg-gradient-to-br from-orange-900/15 to-black/30 rounded-2xl p-4 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105"
                        >
                          {/* Product Image with Cloudinary optimization */}
                          <div className="relative mb-3 overflow-hidden rounded-xl">
                            <img
                              src={optimizeImage(item)}
                              alt={getProductName(item)}
                              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/300x300/1a1a1a/666666?text=No+Image";
                              }}
                            />
                            <div className="absolute top-2 right-2 bg-orange-500 text-black text-xs font-black px-2 py-1 rounded-full border border-orange-300/50">
                              Qty: {item.qty}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="space-y-2">
                            <h5 className="text-gray-200 font-bold text-sm line-clamp-2 leading-tight">
                              {getProductName(item)}
                            </h5>
                            <p className="text-orange-400 font-black text-lg">
                              ${getProductPrice(item).toFixed(2)}
                            </p>
                            <p className="text-gray-400 text-xs">
                              Subtotal: ${(getProductPrice(item) * item.qty).toFixed(2)}
                            </p>
                            {getProductBrand(item) && (
                              <p className="text-gray-500 text-xs">Brand: {getProductBrand(item)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Delivery Status Section */}
                  <div className="mt-6 pt-4 border-t border-orange-500/20">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                      <div className="text-center p-2 bg-gradient-to-br from-orange-900/10 to-black/20 rounded-xl border border-orange-500/10">
                        <p className="text-gray-400 text-xs">Order Placed</p>
                        <p className="text-gray-200 font-semibold text-xs">{formatDate(order.createdAt)}</p>
                      </div>
                      
                      {order.paidAt && (
                        <div className="text-center p-2 bg-gradient-to-br from-orange-900/10 to-black/20 rounded-xl border border-orange-500/10">
                          <p className="text-gray-400 text-xs">Payment Date</p>
                          <p className="text-gray-200 font-semibold text-xs">{formatDate(order.paidAt)}</p>
                        </div>
                      )}
                      
                      {/* Delivery Status Timeline */}
                      <div className="text-center p-2 bg-gradient-to-br from-orange-900/10 to-black/20 rounded-xl border border-orange-500/10">
                        <p className="text-gray-400 text-xs">Delivery Status</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {order.isDelivered ? (
                            <>
                              <Truck className="w-3 h-3 text-green-400" />
                              <span className="text-green-400 font-bold text-xs">Delivered</span>
                            </>
                          ) : order.isPaid ? (
                            <>
                              <Clock className="w-3 h-3 text-blue-400" />
                              <span className="text-blue-400 font-bold text-xs">Shipped</span>
                            </>
                          ) : (
                            <>
                              <Package className="w-3 h-3 text-orange-400" />
                              <span className="text-orange-400 font-bold text-xs">Processing</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {order.deliveredAt && (
                        <div className="text-center p-2 bg-gradient-to-br from-orange-900/10 to-black/20 rounded-xl border border-orange-500/10">
                          <p className="text-gray-400 text-xs">Delivery Date</p>
                          <p className="text-gray-200 font-semibold text-xs">{formatDate(order.deliveredAt)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl p-12 border-2 border-orange-500/30 text-center animate-fade-in hover:border-orange-500/60 transition-all duration-500">
            <Package className="w-24 h-24 text-orange-500/50 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-orange-400 mb-4">No Orders Yet</h3>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your order history here!
            </p>
            <button
              onClick={() => window.location.href = '/shop'}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-full overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center gap-3">
                Start Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;