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

    try {
      const response = await api.post("/products", {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });

      setMessage(response.data.message);

      setFormData({
        sku: "",
        name: "",
        price: "",
        quantity: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
        Register Product
      </h2>

      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          placeholder="SKU (e.g. P001)"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Initial Quantity"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;