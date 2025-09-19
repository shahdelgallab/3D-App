import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShoppingBag, Menu, X, LogIn } from "lucide-react";

import CartDrawer from "../Layout/CartDrawer";
import SearchBar from "./SearchBar";

const navLinks = [
  { name: "Gallery", href: "/collections" },
  { name: "Workshop", href: "/workshop" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
        {/* The main <nav> element is now relative */}
        <nav className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 relative">
          {/* Left Side: Logo & Mobile Menu */}
          <div className="flex items-center gap-2 lg:w-1/4">
            <button
              onClick={() => setIsNavOpen(true)}
              className="lg:hidden p-2"
            >
              <Menu size={22} />
            </button>
            <Link to="/" className="text-2xl font-bold text-gray-900">
              3D App
            </Link>
          </div>

          {/* Center: Desktop Navigation (Absolutely Centered) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-gray-900 ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center justify-end gap-2 lg:w-1/4">
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="block bg-black px-2 rounded text-sm text-white"
              >
                Admin
              </Link>
            )}
            <SearchBar />
            {user ? (
              <Link
                to="/profile"
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <User size={22} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <LogIn size={22} />
              </Link>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <ShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <Dialog
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
            />
            <div className="fixed inset-0 flex justify-end">
              <Dialog.Panel
                as={motion.div}
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-md bg-white"
              >
                <CartDrawer closeCart={() => setIsCartOpen(false)} />
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isNavOpen && (
          <Dialog
            open={isNavOpen}
            onClose={() => setIsNavOpen(false)}
            className="relative z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
            />
            <div className="fixed inset-0 flex">
              <Dialog.Panel
                as={motion.div}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-xs bg-white p-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="text-xl font-bold">
                    3D App
                  </Link>
                  <button onClick={() => setIsNavOpen(false)} className="p-1">
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsNavOpen(false)}
                      className="text-lg font-medium text-gray-700 hover:text-gray-900"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
