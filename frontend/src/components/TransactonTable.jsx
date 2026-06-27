import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const fetchTransactions = async (currentPage = 1) => {
    try {
      const res = await api.get(
        `/transactions?page=${currentPage}&limit=5`
      );

      setTransactions(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to load transactions");
    }
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const nextPage = () => {
    if (page < totalPages) {
      fetchTransactions(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      fetchTransactions(page - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-2xl font-bold mb-6">
        Transaction Ledger
      </h2>

      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Type</th>
              <th className="p-3">Change</th>
              <th className="p-3">Previous</th>
              <th className="p-3">New</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.product_name}</td>

                <td className="p-3">
                  {t.type === "INCREASE" ? (
                    <span className="text-green-600 font-bold">+ IN</span>
                  ) : (
                    <span className="text-red-600 font-bold">- OUT</span>
                  )}
                </td>

                <td className="p-3">{t.quantity_change}</td>
                <td className="p-3">{t.previous_quantity}</td>
                <td className="p-3">{t.new_quantity}</td>

                <td className="p-3 text-sm text-gray-500">
                  {new Date(t.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prevPage}
          className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>

        <span className="py-1">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionTable;