import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { filterMenuByRole } from "../utils/roleUtils";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;
  const menuItems = filterMenuByRole(user.role);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* === Mobile Toggle Button === */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          {isOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* === Sidebar === */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 p-6 lg:static lg:translate-x-0"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  Navigation
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Role: {user.role}
                </p>
              </div>

              {/* Close button for mobile */}
              <button
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* === Navigation Links === */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)} // Auto-close on mobile
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* === Sidebar always visible on large screens === */}
      <div className="hidden lg:block">
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Navigation
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Role: {user.role}
            </p>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </>
  );
};
