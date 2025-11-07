import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PackageIcon, AlertTriangleIcon, TrendingUpIcon, DollarSignIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  // Calculate stats dynamically
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock < 10);
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const categories = [...new Set(products.map(p => p.category))];

  const categoryData = categories.map(cat => ({
    name: cat,
    value: products.filter(p => p.category === cat).length,
  }));

  const lowStockData = lowStock.map(p => ({
    name: p.name,
    count: p.stock,
  }));

  const stats = [
    { label: 'Total Products', value: totalProducts.toString(), icon: PackageIcon, color: 'blue' },
    { label: 'Low Stock Alerts', value: lowStock.length.toString(), icon: AlertTriangleIcon, color: 'red' },
    { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSignIcon, color: 'green' },
    { label: 'Growth Rate', value: '+12.5%', icon: TrendingUpIcon, color: 'yellow' }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          {getGreeting()}, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here is your commodities overview for today
        </p>
      </motion.div>

      {/* === Stats Cards === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* === Charts === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Product Distribution by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3B82F6', '#FBBF24', '#10B981', '#EF4444', '#8B5CF6'][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Low Stock Items
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lowStockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }} />
              <Bar dataKey="count" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};
