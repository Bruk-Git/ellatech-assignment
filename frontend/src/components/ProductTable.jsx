import { useEffect, useState } from "react";
import api from "../services/api";
import InventoryButtons from "./InventoryButtons";
function ProductTable() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    setProducts(res.data);
  } catch (err) {
    setError("Failed to load products");
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Product Dashboard
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-700">
                
                <th className="p-3">SKU</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
  {products.map((product) => (
    <tr key={product.id} className="border-b hover:bg-gray-50">
      <td className="p-3">{product.sku}</td>
      <td className="p-3">{product.name}</td>
      <td className="p-3">${product.price}</td>
      <td className="p-3 font-bold">{product.quantity}</td>
      <td className="p-3 text-sm text-gray-500">
        {product.last_updated}
      </td>

      <td className="p-3">
        <InventoryButtons
          productId={product.id}
          refreshProducts={fetchProducts}
        />
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductTable;