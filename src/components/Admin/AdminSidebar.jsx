import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice"; // Import the logout action
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Home,
  LogOut,
  X,
} from "lucide-react";
import { clearCart } from "../../redux/slice/cartSlice";

const adminNavLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Shop", href: "/", icon: Home },
];

const AdminSidebar = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    if (closeSidebar) closeSidebar();
    navigate("/login");
  };

  const baseLinkClass =
    "flex items-center px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors";
  const activeLinkClass = "bg-gray-700 text-white font-semibold";

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center justify-between mb-8">
        <Link to="/admin" className="text-2xl font-bold text-white">
          Admin
        </Link>
        <button
          onClick={closeSidebar}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-grow">
        <ul className="space-y-2">
          {adminNavLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                end={link.href === "/admin"}
                onClick={() => closeSidebar?.()}
                className={({ isActive }) =>
                  `${baseLinkClass} ${isActive ? activeLinkClass : ""}`
                }
              >
                <link.icon className="mr-3 h-5 w-5" />
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ✅ Logout Button Section */}
      <div className="mt-auto border-t border-gray-700 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
