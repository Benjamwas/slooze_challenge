import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AddProductModal } from '../components/AddProductModal';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { PlusIcon, SearchIcon, EditIcon, TrashIcon } from 'lucide-react';
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}
const mockProducts: Product[] = [{
  id: '1',
  name: 'Laptop Dell XPS',
  category: 'Electronics',
  price: 1299.99,
  stock: 15
}, {
  id: '2',
  name: 'Office Chair',
  category: 'Furniture',
  price: 249.99,
  stock: 8
}, {
  id: '3',
  name: 'Cotton T-Shirt',
  category: 'Clothing',
  price: 19.99,
  stock: 50
}, {
  id: '4',
  name: 'Rice 5kg',
  category: 'Food',
  price: 12.99,
  stock: 3
}, {
  id: '5',
  name: 'Power Drill',
  category: 'Tools',
  price: 89.99,
  stock: 20
}, {
  id: '6',
  name: 'Wireless Mouse',
  category: 'Electronics',
  price: 29.99,
  stock: 35
}];
export const Products: React.FC = () => {
  const {
    user
  } = useAuth();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  const handleAddProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...product,
        id: editingProduct.id
      } : p));
    } else {
      setProducts(prev => [...prev, {
        ...product,
        id: Date.now().toString()
      }]);
    }
    setEditingProduct(undefined);
  };
  const handleEdit = (product: Product) => {
    if (user?.role !== 'Manager') {
      toast.error('Only managers can edit products');
      return;
    }
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  const handleDelete = (id: string) => {
    if (user?.role !== 'Manager') {
      toast.error('Only managers can delete products');
      return;
    }
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted successfully');
  };
  const categories = ['Electronics', 'Furniture', 'Clothing', 'Food', 'Tools'];
  return <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Products Inventory
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your commodities and stock levels
            </p>
          </div>
          {user?.role === 'Manager' && <button onClick={() => {
          setEditingProduct(undefined);
          setIsModalOpen(true);
        }} className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors shadow-lg">
              <PlusIcon className="w-5 h-5" />
              <span className="font-semibold">Add Product</span>
            </button>}
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>
                {cat}
              </option>)}
          </select>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Stock
                  </th>
                  {user?.role === 'Manager' && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product, index) => <motion.tr key={product.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.05
              }} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.stock < 10 ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    {user?.role === 'Manager' && <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button onClick={() => handleEdit(product)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>}
                  </motion.tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
      <AddProductModal isOpen={isModalOpen} onClose={() => {
      setIsModalOpen(false);
      setEditingProduct(undefined);
    }} onSubmit={handleAddProduct} product={editingProduct} />
    </div>;
};