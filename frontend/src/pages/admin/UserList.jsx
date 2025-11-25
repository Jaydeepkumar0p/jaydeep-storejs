import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaUserShield, FaUser } from "react-icons/fa";
import { useAuthStore } from "../../zustand/authStore";
import AdminMenu from "../admin/AdminMenu";

const UserList = () => {
  // --- FUNCTIONAL LOGIC (IMPROVED FOR RELIABLE RE-RENDER) ---
  const { AppUser, getAllUsers, deleteUser, updateUser } = useAuthStore();
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    // Initial fetch of users
    getAllUsers();
  }, [getAllUsers]);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedData({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditedData({});
  };

  // 1. IMPROVEMENT: Call getAllUsers() after saving to force a fresh data fetch.
  const handleSave = async (id) => {
    try {
      await updateUser(id, editedData);
      setEditingUserId(null);
      setEditedData({});
      // Force refresh data from the server
      getAllUsers(); 
      console.log(`User ${id} updated successfully and list refreshed.`);
    } catch (error) {
      console.error("Error saving user:", error);
      // Optional: Add a UI notification for error here
    }
  };

  // 2. IMPROVEMENT: Call getAllUsers() after deleting to force a fresh data fetch.
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        // Force refresh data from the server
        getAllUsers(); 
        console.log(`User ${id} deleted successfully and list refreshed.`);
      } catch (error) {
        console.error("Error deleting user:", error);
        // Optional: Add a UI notification for error here
      }
    }
  };
  // ------------------------------------------

  return (
    // THEME/STYLE REMAINS THE CYBER-JUNGLE VERSION
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950/70 to-black text-white p-4 sm:p-6 md:ml-20 transition-all duration-300">
      <AdminMenu />

      <div className="max-w-7xl mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
        <div className="relative bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl shadow-orange-900/50 border border-orange-500/30 p-5 sm:p-8 transition-all duration-500 hover:border-orange-500/50">

          {/* Title Section */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center 
            bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-8 tracking-wider">
            User Access Matrix 🛡️
          </h1>

          {/* Table Section */}
          <div className="overflow-x-auto rounded-xl shadow-inner shadow-orange-900/50 border border-orange-500/10">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-900/30 text-orange-200 text-xs sm:text-sm uppercase tracking-wide border-b border-orange-500/20">
                  <th className="px-4 py-4 text-left">User ID</th>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">Email</th>
                  <th className="px-4 py-4 text-left">Role</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {AppUser && AppUser.length > 0 ? (
                  AppUser.map((user, idx) => (
                    <tr
                      key={user._id}
                      className="border-b border-orange-900/50 hover:bg-orange-900/50 transition-all duration-200 group animate-fade-in-up"
                      style={{ animationDelay: `${150 + idx * 50}ms` }}
                    >
                      {/* ID */}
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-500 font-mono">
                        {user._id.slice(0, 6)}...
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3 text-sm font-medium">
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            value={editedData.username || ""}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                username: e.target.value,
                              })
                            }
                            className="px-3 py-2 w-full bg-black/50 border border-orange-700 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm outline-none transition-all"
                          />
                        ) : (
                          <span className="text-gray-200 flex items-center gap-2">
                             <FaUser size={10} className="text-orange-400"/> {user.username}
                          </span>
                        )}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-sm">
                        {editingUserId === user._id ? (
                          <input
                            type="email"
                            value={editedData.email || ""}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                email: e.target.value,
                              })
                            }
                            className="px-3 py-2 w-full bg-black/50 border border-orange-700 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm outline-none transition-all"
                          />
                        ) : (
                          <span className="text-gray-400">{user.email}</span>
                        )}
                      </td>

                      {/* ROLE (Admin/User) */}
                      <td className="px-4 py-3 text-sm">
                        {editingUserId === user._id ? (
                          <select
                            value={editedData.isAdmin ? "true" : "false"}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                isAdmin: e.target.value === "true",
                              })
                            }
                            className="px-3 py-2 bg-black/50 border border-orange-700 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm outline-none transition-all text-white"
                          >
                            <option value="false">User</option>
                            <option value="true">Admin</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                              user.isAdmin
                                ? "bg-orange-600/40 text-orange-200 border border-orange-500/50"
                                : "bg-gray-600/40 text-gray-300 border border-gray-500/50"
                            }`}
                          >
                            {user.isAdmin ? <FaUserShield size={12}/> : <FaUser size={12} />}
                            {user.isAdmin ? "Access Granted" : "Standard User"}
                          </span>
                        )}
                      </td>

                      {/* ACTION BUTTONS */}
                      <td className="px-4 py-3">
                        <div className="flex justify-center items-center space-x-2">
                          {editingUserId === user._id ? (
                            <>
                              <button
                                onClick={() => handleSave(user._id)}
                                className="p-2.5 bg-orange-600 hover:bg-orange-500 text-black rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 transform group-hover:scale-105"
                                title="Save changes"
                              >
                                <FaCheck size={14} />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="p-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 transform group-hover:scale-105"
                                title="Cancel editing"
                              >
                                <FaTimes size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditClick(user)}
                                className="p-2.5 bg-orange-700/30 hover:bg-orange-700/50 text-orange-400 border border-orange-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                title="Edit user"
                              >
                                <FaEdit size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(user._id)}
                                className="p-2.5 bg-red-700/30 hover:bg-red-700/50 text-red-400 border border-red-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                title="Delete user"
                              >
                                <FaTrash size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500 text-sm sm:text-lg"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FaUser size={30} className="text-orange-900"/>
                        <p>No user accounts found in the database.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;