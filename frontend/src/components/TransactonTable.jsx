import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async (currentPage = 1) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/transactions?page=${currentPage}&limit=5`
      );

      setTransactions(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setError("");
    } catch (err) {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent bg-[length:200%] animate-[gradient_3s_ease_infinite]">
              Transaction Ledger
            </h2>
            <p className="text-gray-400 text-sm">Historical stock changes</p>
          </div>
        </div>
        
        {/* Transaction Count Badge */}
        <div className="bg-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-lg">
          <span className="text-blue-300 text-sm font-medium">
            Total: <span className="text-yellow-400 font-bold">{transactions.length}</span>
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
          <p className="text-gray-400 mt-4 text-sm">Loading transactions...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && transactions.length === 0 && (
        <div className="text-center py-12 relative z-10">
          <div className="w-20 h-20 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg">No transactions found</p>
          <p className="text-gray-500 text-sm mt-1">Transactions will appear when you update stock</p>
        </div>
      )}

      {/* Transaction Table */}
      {!loading && transactions.length > 0 && (
        <div className="overflow-x-auto relative z-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border-b border-blue-500/20">
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Product</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Type</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Change</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Previous</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">New</th>
                <th className="p-3 text-left text-xs font-semibold text-blue-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr 
                  key={t.id} 
                  className="border-b border-gray-700/50 hover:bg-blue-600/5 transition-colors duration-200 group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Product Name */}
                  <td className="p-3">
                    <span className="text-gray-200 font-medium">
                      {t.product_name}
                    </span>
                  </td>
                  
                  {/* Type Badge */}
                  <td className="p-3">
                    {t.type === "INCREASE" || t.change_amount > 0 ? (
                      <span className="inline-flex items-center px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-green-400 text-xs font-bold">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                        + IN
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-red-400 text-xs font-bold">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></span>
                        - OUT
                      </span>
                    )}
                  </td>
                  
                  {/* Change Amount */}
                  <td className="p-3">
                    <span className={`font-bold ${
                      t.change_amount > 0 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {t.change_amount > 0 ? '+' : ''}{t.change_amount}
                    </span>
                  </td>
                  
                  {/* Previous Quantity */}
                  <td className="p-3 text-gray-400">
                    {t.previous_quantity || t.new_quantity - t.change_amount}
                  </td>
                  
                  {/* New Quantity */}
                  <td className="p-3">
                    <span className="text-yellow-400 font-bold">
                      {t.new_quantity}
                    </span>
                  </td>
                  
                  {/* Date */}
                  <td className="p-3 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(t.created_at || t.timestamp).toLocaleString()}</span>
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
                Showing <span className="text-blue-400 font-medium">{transactions.length}</span> transactions
              </span>
            </div>
            <div className="text-xs text-gray-500">
              <span className="text-yellow-400">✦</span> Page {page} of {totalPages}
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && transactions.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6 relative z-10">
          <button
            onClick={prevPage}
            disabled={page <= 1}
            className={`
              px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2
              ${page <= 1 
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95'
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Prev</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="text-gray-400 text-sm">Page</span>
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => fetchTransactions(pageNum)}
                    className={`
                      w-9 h-9 rounded-lg text-sm font-medium transition-all duration-300
                      ${page === pageNum 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-110' 
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && page < totalPages - 2 && (
                <>
                  <span className="text-gray-500">...</span>
                  <button
                    onClick={() => fetchTransactions(totalPages)}
                    className={`
                      w-9 h-9 rounded-lg text-sm font-medium transition-all duration-300
                      ${page === totalPages 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-110' 
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                      }
                    `}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <span className="text-gray-400 text-sm">of {totalPages}</span>
          </div>

          <button
            onClick={nextPage}
            disabled={page >= totalPages}
            className={`
              px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2
              ${page >= totalPages 
                ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95'
              }
            `}
          >
            <span>Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default TransactionTable;