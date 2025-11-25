import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Keeping original AI icons as requested for core functionality consistency
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineDashboard,
  AiOutlineTag,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineCrown,
  AiOutlineOrderedList,
} from "react-icons/ai";
// Assuming useAuthStore is available at this path:
import { useAuthStore } from "../../zustand/authStore"; 
// Importing the necessary Lucide-like visual helper icons for the new design look (only if they are used visually, but we'll stick to AI icons for consistency)
// NOTE: I am using your original AI icons for the NavItem component, but I will map the styling to look like the new design.


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // 1. UPDATED NavItemComponent with new design styles
  const NavItem = ({ to, icon: Icon, label, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`group relative flex items-center gap-4 px-4 py-3 rounded-xl
      text-gray-300 hover:text-orange-400 transition-all duration-300
      hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-orange-600/10
      hover:border hover:border-orange-500/30`}
    >
      {/* Icon Styling adapted from new design */}
      <Icon
        size={24}
        className="text-orange-400 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300"
      />
      {isOpen && (
        <span className="text-sm font-medium opacity-100 group-hover:translate-x-1 transition-transform duration-300">
          {label}
        </span>
      )}
      {/* Background glow effect from new design */}
      <div className="absolute inset-0 rounded-xl bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-300 -z-10"></div>
    </Link>
  );

  return (
    // 2. UPDATED Sidebar Container with new design styles (Gradient, Blur, Shadow)
    <div
      className={`h-screen fixed top-0 left-0
      bg-gradient-to-b from-black via-black to-orange-950/20
      backdrop-blur-xl shadow-2xl border-r border-orange-900/40
      transition-all duration-300 ease-out flex flex-col z-50
      ${isOpen ? "w-64" : "w-20"}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setAdminOpen(false);
      }}
    >
      {/* 3. UPDATED LOGO SECTION with new design styles */}
      <div className="relative flex items-center justify-center py-8 border-b border-orange-900/30 group">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <div className="text-white font-bold relative">
            {isOpen ? (
              <div className="flex items-center gap-2">
                <AiOutlineShoppingCart className="w-6 h-6 text-orange-500" /> {/* Replaced Lucide ShoppingCart with AiOutlineShoppingCart */}
                <span className="text-xl font-black tracking-wider">
                  <span className="text-orange-500">Cyber</span>
                  <span className="text-gray-300">Shop</span>
                </span>
              </div>
            ) : (
              <div className="text-3xl text-orange-500 group-hover:scale-110 transition-transform duration-300">
                🛒
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN NAV LINKS (Using original AiOutlines and updated NavItem component) */}
      <div className="flex flex-col gap-3 px-3 mt-6">
        <NavItem to="/" icon={AiOutlineHome} label="Home" />
        <NavItem to="/shop" icon={AiOutlineShopping} label="Shop" />
        <NavItem to="/cart" icon={AiOutlineShoppingCart} label="Cart" />
        <NavItem to="/mineorders" icon={AiOutlineOrderedList} label="My Orders" />
      </div>

      {/* 4. UPDATED USER AVATAR with new design styles */}
      {user && (
        <div className="mt-8 px-4 group">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-600/10 to-orange-600/5 border border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg
            flex items-center justify-center text-black font-bold text-lg group-hover:shadow-orange-500/50 transition-all duration-300">
              {user.username.charAt(0).toUpperCase()}
            </div>

            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {user.username}
                </p>
                <p className="text-xs text-orange-400/70">Welcome back</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. UPDATED ADMIN PANEL DROPDOWN with new design styles */}
      {user?.isAdmin && (
        <div className="mt-8 px-3">
          <button
            onClick={() => setAdminOpen(!adminOpen)}
            // Updated Button Styling
            className="flex items-center justify-between w-full px-4 py-3
            rounded-xl text-gray-300 hover:text-orange-400
            bg-gradient-to-r from-transparent to-orange-600/0
            hover:from-orange-600/20 hover:to-orange-600/10
            hover:border hover:border-orange-500/30
            transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <AiOutlineCrown size={24} className="text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              {isOpen && (
                <span className="font-bold text-sm">Admin Panel</span>
              )}
            </div>

            {/* Replaced '▶' with Tailwind-styled chevron look */}
            {isOpen && (
              <span
                className={`text-orange-500 transition-transform duration-300 ${
                  adminOpen ? "rotate-90" : ""
                }`}
              >
                {/* Visual representation of a right chevron */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            )}
          </button>

          {/* Admin Dropdown Menu - Styling adapted for slide-down and border */}
          <div
            className={`transition-all overflow-hidden duration-300 ${
              adminOpen ? "max-h-80 mt-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-2 ml-2 border-l-2 border-orange-500/30 pl-4 py-2">
              <NavItem to="/admin/dashboard" icon={AiOutlineDashboard} label="Dashboard" />
              <NavItem to="/admin/productlist" icon={AiOutlineTag} label="Products" />
              <NavItem to="/admin/category" icon={AiOutlineSetting} label="Categories" />
              <NavItem to="/admin/orderlist" icon={AiOutlineContainer} label="Orders" />
              <NavItem to="/admin/userlist" icon={AiOutlineTeam} label="Users" />
            </div>
          </div>
        </div>
      )}

      {/* 6. UPDATED BOTTOM NAV with new design styles */}
      <div className="mt-auto mb-6 px-3 flex flex-col gap-3 pb-4 border-t border-orange-900/30 pt-4">
        {user ? (
          <>
            <NavItem to="/profile" icon={AiOutlineUserAdd} label="Profile" />

            {/* UPDATED Logout Button Styling for the new design */}
            <button
              onClick={handleLogout}
              className="group flex items-center gap-4 px-4 py-3 rounded-xl
              text-gray-300 hover:text-red-400 transition-all duration-300
              hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-600/10
              hover:border hover:border-red-500/30"
            >
              <AiOutlineLogout size={24} className="text-red-500 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
              {isOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </>
        ) : (
          <>
            <NavItem to="/login" icon={AiOutlineLogin} label="Login" />
            <NavItem to="/register" icon={AiOutlineUserAdd} label="Register" />
          </>
        )}
      </div>

      {/* 7. Added TOGGLE HINT from new design */}
      {!isOpen && (
        <div className="absolute left-full ml-2 bottom-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          <div className="bg-orange-600/90 text-white text-xs font-bold px-3 py-2 rounded-lg">
            Hover to expand
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;