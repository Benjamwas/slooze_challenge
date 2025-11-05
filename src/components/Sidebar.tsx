import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { filterMenuByRole } from '../utils/roleUtils';
import { motion } from 'framer-motion';
export const Sidebar: React.FC = () => {
  const {
    user
  } = useAuth();
  const location = useLocation();
  if (!user) return null;
  const menuItems = filterMenuByRole(user.role);
  return <motion.aside initial={{
    x: -20,
    opacity: 0
  }} animate={{
    x: 0,
    opacity: 1
  }} className="w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Navigation
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Role: {user.role}
          </p>
        </div>
        <nav className="space-y-2">
          {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return <Link key={item.path} to={item.path} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>;
        })}
        </nav>
      </div>
    </motion.aside>;
};