/* eslint-disable no-irregular-whitespace */
import { useState } from "react";
import { NavLink } from "react-router-dom";
// Importing Lucide icons for visual consistency with the main Navigation
import { 
  X, 
  Menu, 
  LayoutDashboard, 
  Tag, 
  Users, 
  Box, 
  Settings, 
  ShoppingBag 
} from "lucide-react";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 1. Mapped menu items to use Lucide icons for design consistency
  const menuItems = [
    { label: "Manage Products", path: "/admin/productlist", icon: ShoppingBag },
    { label: "Create Category", path: "/admin/category", icon: Tag },
    { label: "All Products List", path: "/admin/allproductslist", icon: Settings },
    { label: "Manage Orders", path: "/admin/orderlist", icon: Box },
    { label: "Manage Users", path: "/admin/userlist", icon: Users },
  ];

  // 2. Custom NavLink Component using the new design style
  const AdminNavItem = ({ item }) => {
    const IconComponent = item.icon;
    
    return (
        <NavLink
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
            // Applying the complex gradient, border, and hover styles from the main Navigation
            className={({ isActive }) => `
                group relative flex items-center gap-4 px-4 py-3 rounded-xl
                text-gray-300 transition-all duration-300 font-medium
                ${
                    isActive
                        ? "text-orange-400 bg-gradient-to-r from-orange-600/30 to-orange-600/20 border border-orange-500/50"
                        : "text-gray-300 hover:text-orange-400 hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-orange-600/10 hover:border hover:border-orange-500/30"
                }
            `}
        >
            <div className={`
                ${item.path === "/admin/updateProduct" || item.path === "/admin/allproductslist" ? "text-gray-400" : "text-orange-400"}
                group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300
            `}>
                <IconComponent size={20} />
            </div>
            <span className="text-sm font-medium opacity-100 group-hover:translate-x-1 transition-transform duration-300">
                {item.label}
            </span>
            {/* Active state indicator glow */}
            {/* <div className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-300 -z-10"></div> */}
        </NavLink>
    );
};

  return (
    <>
      {/* 3. UPDATED Toggle Button Style */}
      <button
        className={`fixed ${
          isMenuOpen ? "top-4 right-4" : "top-5 right-7"
        } bg-black/50 border border-orange-900/50 p-3 rounded-full 
        shadow-2xl shadow-black/70 z-50 transition-all duration-300 hover:scale-110`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <X color="#fb923c" size={24} /> // Orange-400
        ) : (
          <Menu color="#fb923c" size={24} /> // Orange-400
        )}
      </button>

      {/* 4. UPDATED Sidebar Section Style (Same as main Navigation) */}
      <section
        className={`fixed top-0 right-0 h-full w-64
        bg-gradient-to-b from-black via-black to-orange-950/20
        backdrop-blur-xl shadow-2xl border-l border-orange-900/40 
        p-6 flex flex-col transform transition-transform duration-300 ease-out z-40
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-center text-orange-400 text-2xl font-black tracking-wider mb-8 pt-2 border-b border-orange-900/30 pb-4">
          👑 ADMIN PANEL
        </h2>

        {/* 5. Applying updated item component */}
        <ul className="list-none flex flex-col gap-3 overflow-y-auto custom-scrollbar-orange-v3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <AdminNavItem item={item} />
            </li>
          ))}
        </ul>

        {/* Scrollbar style enhancement for consistency */}
        <style jsx="true">{`
          .custom-scrollbar-orange-v3::-webkit-scrollbar {
            width: 8px; 
          }
          .custom-scrollbar-orange-v3::-webkit-scrollbar-thumb {
            background-color: #f97316; /* orange-600 for thumb */
            border-radius: 4px;
          }
          .custom-scrollbar-orange-v3::-webkit-scrollbar-track {
            background: #1f2937; /* gray-800 track */
            border-radius: 4px;
          }
        `}</style>
      </section>
    </>
  );
};

export default AdminMenu;