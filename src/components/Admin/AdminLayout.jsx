import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarContent = <AdminSidebar closeSidebar={toggleSidebar} />;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:block bg-gray-900 w-64 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Header and Main Content */}
      <div className="flex-grow flex flex-col">
        <header className="flex lg:hidden items-center justify-between p-4 bg-gray-900 text-white">
          <h1 className="text-xl font-medium">Admin Dashboard</h1>
          <button onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
        </header>
        <main className="flex-grow p-6 bg-gray-100 overflow-auto">
          <Outlet />
        </main>
      </div>
      
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={toggleSidebar}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bg-gray-900 w-64 h-full text-white z-40 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;