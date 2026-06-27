import { useEffect, useState } from "react";
import api from "../services/api";
import InventoryButtons from "./InventoryButtons";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl rounded-2xl p-6 border border-blue-500/30 relative overflow-hidden">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent animate-[shimmer_3s_infinite] pointer-events-none"></div>
      
      {/* Decorative Dots */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%] animate-[gradient_3s_ease_infinite]">
              Product Dashboard
            </h2>
            <p className="text-gray-400 text-sm">Manage your inventory products</p>
          </div>
        </div>
        
        {/* Product Count Badge */}
        <div className="bg-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-lg">
          <span className="text-blue-300 text-sm font-medium">
            Total: <span className="text-yellow-400 font-bold">{products.length}</span>
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border-l-4 border-red-500 text-red-300 p-4 rounded-lg mb-4 flex items-center animate-[shake_0.5s_ease-out] relative z-10">
          <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 relative z-10">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-yellow-400 rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4 text-sm">Loading products...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12 relative z-10">
          <div className="w-20 h-20 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg">No products found</p>
          <p className="text-gray-500 text-sm mt-1">Start by adding your first product</p>
        </div>
      )}

      {/* Product Table */}
      {!loading && products.length > 0 && (
        <div className="overflow-x-auto relative z-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-b border-blue-500/20">
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">SKU</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Name</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Price</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Quantity</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Last Updated</th>
                <th className="p-3 text-center text-xs font-semibold text-blue-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr 
                  key={product.id} 
                  className="border-b border-gray-700/50 hover:bg-blue-600/5 transition-colors duration-200 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* SKU */}
                  <td className="p-3">
                    <span className="inline-block px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded text-blue-300 text-xs font-mono font-bold">
                      {product.sku}
                    </span>
                  </td>
                  
                  {/* Name */}
                  <td className="p-3 text-gray-200 font-medium">
                    {product.name}
                  </td>
                  
                  {/* Price */}
                  <td className="p-3">
                    <span className="text-yellow-400 font-bold">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </td>
                  
                  {/* Quantity */}
                  <td className="p-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                      product.quantity === 0 
                        ? 'bg-red-900/30 text-red-400 border border-red-500/30' 
                        : product.quantity < 5 
                        ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                        : 'bg-green-900/30 text-green-400 border border-green-500/30'
                    }`}>
                      {product.quantity === 0 ? (
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5 animate-pulse"></span>
                      ) : product.quantity < 5 ? (
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></span>
                      ) : (
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                      )}
                      {product.quantity}
                    </span>
                  </td>
                  
                  {/* Last Updated */}
                  <td className="p-3 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{product.last_updated || new Date().toLocaleString()}</span>
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="p-3">
                    <div className="flex justify-center">
                      <InventoryButtons
                        productId={product.id}
                        refreshProducts={fetchProducts}
                        currentQuantity={product.quantity}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table Footer with Golden Line */}
          <div className="mt-4 pt-4 border-t border-blue-500/20 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-400"></span>
              </div>
              <span className="text-xs text-gray-500">
                Showing <span className="text-blue-400 font-medium">{products.length}</span> products
              </span>
            </div>
            <div className="text-xs text-gray-500">
              <span className="text-yellow-400">✦</span> Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductTable;