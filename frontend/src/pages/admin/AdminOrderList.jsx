import React, { useEffect, useState } from "react";
import { useOrderStore } from "../../zustand/AdminOrder";
import { Package, Truck, CheckCircle, XCircle, Trash2, RotateCcw, Zap, Filter, User, Search, Mail } from 'lucide-react';
import AdminMenu from "../admin/AdminMenu";

const AdminOrderList = () => {
  const {
    orders,
    fetchAllOrders,
    markOrderDelivered,
    markOrderPaid,
    deleteOrder,
    loading,
    error,
  } = useOrderStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Enhanced filter function focusing on user data
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOrders(orders);
    } else {
      const searchLower = searchTerm.toLowerCase().trim();
      const filtered = orders.filter(order => {
        // Focus on user data only
        const userName = order.user?.name || "";
        const userUsername = order.user?.username || "";
        const userEmail = order.user?.email || "";
        
        // Check if any user field matches
        const userMatch = 
          userName.toLowerCase().includes(searchLower) ||
          userUsername.toLowerCase().includes(searchLower) ||
          userEmail.toLowerCase().includes(searchLower);

        // Check order ID
        const orderIdMatch = order._id.toLowerCase().includes(searchLower);

        // Check total price
        const priceMatch = order.totalPrice.toString().includes(searchLower);

        // Check if it's a status search
        const statusMatch = 
          (searchLower === 'paid' && order.isPaid) ||
          (searchLower === 'unpaid' && !order.isPaid) ||
          (searchLower === 'delivered' && order.isDelivered) ||
          (searchLower === 'pending' && !order.isDelivered);

        return userMatch || orderIdMatch || priceMatch || statusMatch;
      });
      setFilteredOrders(filtered);
    }
  }, [orders, searchTerm]);

  const displayOrders = searchTerm ? filteredOrders : orders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white p-4 sm:p-6 lg:p-8">
      <AdminMenu/>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-slide-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl border border-orange-500/30">
              <Package className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-orange-500 mb-2 tracking-tight">
                Admin Orders
              </h1>
              <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-400 text-lg pl-14">
            Manage and track all customer orders
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in">
          <div className="relative max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-2xl blur-sm group-hover:blur transition-all duration-300"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by user name, user email, order ID, amount, or status..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl 
                  bg-gradient-to-br from-orange-900/30 to-black/50 
                  backdrop-blur-lg text-gray-200 placeholder-gray-400
                  border border-orange-500/40 focus:border-orange-500/80
                  focus:outline-none focus:ring-2 focus:ring-orange-500/30 
                  transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20
                  font-medium"
              />
            </div>
          </div>
          
          {/* Search Tips */}
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              User Name
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              User Email
            </span>
            <span className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              Order ID
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Amount
            </span>
          </div>

          {searchTerm && (
            <p className="text-orange-400 text-sm mt-2 animate-fade-in">
              Found {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </p>
          )}
        </div>

        {/* Debug Info - Remove this in production */}
       

        {/* Loading State */}
        {loading && (
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl p-12 border-2 border-orange-500/30 text-center animate-fade-in">
            <div className="relative inline-block mb-4">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-orange-400 text-xl font-bold">Loading orders...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-lg rounded-3xl p-6 border-2 border-red-500/30 mb-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {!loading && displayOrders.length > 0 && (
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-orange-500/30 hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 animate-fade-in-up overflow-hidden">
            
            {/* Table Header */}
            <div className="bg-gradient-to-r from-orange-900/30 to-black/50 backdrop-blur-sm border-b border-orange-500/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-orange-400" />
                  <h2 className="text-xl font-black text-orange-400">Order Management</h2>
                </div>
                <span className="text-orange-300 font-bold bg-orange-900/30 px-3 py-1 rounded-full border border-orange-500/30">
                  {displayOrders.length} order{displayOrders.length !== 1 ? 's' : ''}
                  {searchTerm && " found"}
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-orange-500/20">
                    {['Order ID', 'User Name', 'User Email', 'Paid', 'Delivered', 'Total', 'Actions'].map((header) => (
                      <th
                        key={header}
                        className="px-4 sm:px-6 py-4 text-left text-sm font-black text-orange-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-500/10">
                  {displayOrders.map((order, idx) => (
                    <tr 
                      key={order._id} 
                      className="group hover:bg-orange-500/5 transition-all duration-300 animate-fade-in-up"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      {/* Order ID */}
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-mono font-bold text-gray-200 bg-black/30 px-2 py-1 rounded border border-orange-500/20">
                            {order._id.slice(-8).toUpperCase()}
                          </span>
                        </div>
                      </td>

                      {/* User Name */}
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-orange-900/30 to-black/40 rounded-xl border border-orange-500/20">
                            <User className="w-4 h-4 text-orange-400" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-200 truncate">
                              {order.user?.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {order.user?.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* User Email - Only user email */}
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 bg-gradient-to-br from-orange-900/30 to-black/40 rounded-xl border border-orange-500/20">
                            <Mail className="w-4 h-4 text-orange-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-200 truncate">
                              {order.user?.email || "No user email"}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              User ID: {order.user?._id?.slice(-6) || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Paid Status */}
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          {order.isPaid ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 font-bold text-sm">Paid</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span className="text-red-400 font-bold text-sm">Unpaid</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Delivered Status */}
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          {order.isDelivered ? (
                            <>
                              <Truck className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 font-bold text-sm">Delivered</span>
                            </>
                          ) : (
                            <>
                              <Package className="w-4 h-4 text-orange-400" />
                              <span className="text-orange-400 font-bold text-sm">Pending</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="px-4 sm:px-6 py-4">
                        <span className="text-lg font-black text-orange-500 bg-orange-900/20 px-3 py-1 rounded-full border border-orange-500/30">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {/* Mark as Paid */}
                          {!order.isPaid && (
                            <button
                              onClick={() => markOrderPaid(order._id)}
                              className="group/paid flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white text-xs font-bold rounded-xl border border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                            >
                              <Zap className="w-3 h-3" />
                              Mark Paid
                            </button>
                          )}

                          {/* Mark Delivered */}
                          {!order.isDelivered && (
                            <button
                              onClick={() => markOrderDelivered(order._id)}
                              className="group/delivered flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-black text-xs font-bold rounded-xl border border-orange-300/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30"
                            >
                              <Truck className="w-3 h-3" />
                              Deliver
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="group/delete flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold rounded-xl border border-red-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                            >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && displayOrders.length === 0 && (
          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl p-12 border-2 border-orange-500/30 text-center animate-fade-in hover:border-orange-500/60 transition-all duration-500">
            <Package className="w-16 h-16 text-orange-500/50 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-orange-400 mb-2">
              {searchTerm ? "No Matching Orders Found" : "No Orders Found"}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm 
                ? `No orders found matching "${searchTerm}". Try searching by user name, user email, or order ID.`
                : "There are no orders to display at the moment."
              }
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 mb-4"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={fetchAllOrders}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-orange-400 font-bold rounded-xl border border-orange-500/30 transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOrderList;