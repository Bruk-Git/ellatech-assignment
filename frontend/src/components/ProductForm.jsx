import { useState } from "react";
import api from "../services/api";

function ProductForm() {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // validation
    if (!formData.sku || !formData.name || !formData.price || !formData.quantity) {
      setError("All fields are required.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (Number(formData.quantity) < 0) {
      setError("Quantity cannot be negative.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/products", {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      setMessage(response.data.message || "✅ Product added successfully!");

      setFormData({
        sku: "",
        name: "",
        price: "",
        quantity: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl rounded-2xl p-8 mt-6 border border-blue-500/30 relative overflow-hidden">
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-[shimmer_3s_infinite] pointer-events-none"></div>
      
      {/* Decorative Dots */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-700 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-4 shadow-lg shadow-blue-500/30 animate-[bounce-slow_2s_ease-in-out_infinite]">
          <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%] animate-[gradient_3s_ease_infinite]">
          Register Product
        </h2>
        <p className="text-gray-400 text-sm mt-1">Add new product to inventory</p>
      </div>

      {/* Messages */}
      {message && (
        <div className="bg-blue-900/30 border-l-4 border-blue-400 text-blue-300 p-4 rounded-lg mb-4 flex items-center animate-[slideDown_0.4s_ease-out] relative z-10">
          <svg className="w-5 h-5 mr-2 text-blue-400 animate-[spinSlow_3s_linear_infinite]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border-l-4 border-red-500 text-red-300 p-4 rounded-lg mb-4 flex items-center animate-[shake_0.5s_ease-out] relative z-10">
          <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* SKU Field */}
        <div className="group">
          <label className="block text-blue-300 font-semibold mb-2 text-sm tracking-wide">
            SKU Code
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </span>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="e.g. P001"
              className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 placeholder-gray-500 hover:border-blue-500/50"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 group-focus-within:w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Product Name Field */}
        <div className="group">
          <label className="block text-blue-300 font-semibold mb-2 text-sm tracking-wide">
            Product Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 placeholder-gray-500 hover:border-blue-500/50"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 group-focus-within:w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Price Field */}
        <div className="group">
          <label className="block text-blue-300 font-semibold mb-2 text-sm tracking-wide">
            Price ($)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 9v-1m0 1h.01M12 16v-1m0 1h.01" />
              </svg>
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 placeholder-gray-500 hover:border-blue-500/50"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 group-focus-within:w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Quantity Field */}
        <div className="group">
          <label className="block text-blue-300 font-semibold mb-2 text-sm tracking-wide">
            Initial Quantity
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 4v16" />
              </svg>
            </span>
            <input
              type="number"
              min="0"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 placeholder-gray-500 hover:border-blue-500/50"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 group-focus-within:w-full transition-all duration-500"></div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-3.5 rounded-lg font-bold hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group relative overflow-hidden"
        >
          {/* Button Shimmer */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding Product...
            </>
          ) : (
            <>
              <span className="relative z-10">Add Product</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center relative z-10">
        <div className="flex justify-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-400"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-600"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></span>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          <span className="text-blue-400">✦</span> Fill in all fields to add a new product 
          <span className="text-yellow-400"> ✦</span>
        </p>
      </div>
    </div>
  );
}

export default ProductForm;