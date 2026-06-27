import { useState } from "react";
import api from "../services/api";

function UserForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update input values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Basic validation
    if (!formData.full_name || !formData.email) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/users", formData);

      setMessage(response.data.message);

      // Clear form
      setFormData({
        full_name: "",
        email: "",
      });

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl rounded-2xl p-8 mt-10 border border-blue-500/30 animate-fadeIn relative overflow-hidden">
      {/* Animated Golden Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-shimmer"></div>
      
      {/* Decorative Golden Dots */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-700"></div>

      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-4 shadow-lg shadow-blue-500/30 animate-bounce-slow">
          <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
          Register User
        </h2>
        <p className="text-gray-400 text-sm mt-1 animate-fadeInUp">
          Create a new user account
        </p>
      </div>

      {message && (
        <div className="bg-blue-900/30 border-l-4 border-blue-400 text-blue-300 p-4 rounded-lg mb-4 flex items-center animate-slideDown">
          <svg className="w-5 h-5 mr-2 text-blue-400 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border-l-4 border-red-500 text-red-300 p-4 rounded-lg mb-4 flex items-center animate-shake">
          <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="mb-5 animate-fadeInUp delay-100">
          <label className="block text-blue-300 font-semibold mb-2 text-sm tracking-wide">
            Full Name
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 placeholder-gray-500 hover:border-blue-500/50"
              placeholder="John Doe"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 group-focus-within:w-full transition-all duration-500"></div>
          </div>
        </div>

        <div className="mb-6 animate-fadeInUp delay-200">
          <label className="block text-blue-300 font-semibold mb-2 text-sm tracking-wide">
            Email Address
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-200 placeholder-gray-500 hover:border-blue-500/50"
              placeholder="you@example.com"
            />
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-400 group-focus-within:w-full transition-all duration-500"></div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center group relative overflow-hidden animate-fadeInUp delay-300"
        >
          {/* Golden shimmer on button */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Registering...
            </>
          ) : (
            <>
              <span className="relative z-10">Register User</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center relative z-10">
        <p className="text-xs text-gray-500 animate-fadeInUp delay-400">
          <span className="text-blue-400">✦</span> By registering, you agree to our terms 
          <span className="text-yellow-400"> ✦</span>
        </p>
        <div className="flex justify-center gap-2 mt-3">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-400"></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-600"></span>
        </div>
      </div>
    </div>
  );
}

export default UserForm;