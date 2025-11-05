import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldOffIcon, ArrowLeftIcon } from 'lucide-react';
export const Unauthorized: React.FC = () => {
  return <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} className="text-center">
        <motion.div initial={{
        y: -20
      }} animate={{
        y: 0
      }} className="inline-block p-6 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <ShieldOffIcon className="w-20 h-20 text-red-600 dark:text-red-400" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          You do not have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>
        <Link to="/login" className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors shadow-lg">
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-semibold">Back to Login</span>
        </Link>
      </motion.div>
    </div>;
};