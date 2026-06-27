import { useState } from "react";
import api from "../services/api";

function InventoryButtons({ productId, refreshProducts }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const increaseStock = async () => {
    setLoading(true);
    setMessage("");

    try {
      await api.put(`/inventory/increase/${productId}`, {
        quantity: Number(quantity),
      });

      setMessage("Stock increased");
      refreshProducts();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error increasing stock");
    }

    setLoading(false);
  };

  const decreaseStock = async () => {
    setLoading(true);
    setMessage("");

    try {
      await api.put(`/inventory/decrease/${productId}`, {
        quantity: Number(quantity),
      });

      setMessage("Stock decreased");
      refreshProducts();
    } catch (err) {
      setMessage(err.response?.data?.error || "Error decreasing stock");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border rounded px-2 py-1 w-20"
      />

      <div className="flex gap-2">
        <button
          onClick={increaseStock}
          disabled={loading}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          + Add
        </button>

        <button
          onClick={decreaseStock}
          disabled={loading}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          - Remove
        </button>
      </div>

      {message && (
        <p className="text-xs text-gray-600">{message}</p>
      )}
    </div>
  );
}

export default InventoryButtons;