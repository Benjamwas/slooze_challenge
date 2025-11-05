import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MoonIcon, SunIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const Navbar: React.FC = () => {
  const {
    user,
    theme,
    logout,
    toggleTheme
  } = useAuth();
  return <motion.nav initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              CMS
            </h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Commodities Management System
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-gray-700 rounded-lg">
              <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
              <span className="text-xs px-2 py-1 bg-yellow-400 dark:bg-yellow-500 text-gray-900 rounded-full font-semibold">
                {user?.role}
              </span>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle theme">
              {theme === 'light' ? <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <SunIcon className="w-5 h-5 text-yellow-400" />}
            </button>
            <button onClick={logout} className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
              <LogOutIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>;
};