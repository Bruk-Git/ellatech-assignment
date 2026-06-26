const db = require("../db");

// GET TRANSACTIONS WITH PAGINATION
const getTransactions = (req, res) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) as count FROM transactions`;

  db.get(countQuery, [], (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const total = countResult.count;

    const sql = `
      SELECT 
        t.id,
        t.product_id,
        p.name as product_name,
        t.type,
        t.quantity_change,
        t.previous_quantity,
        t.new_quantity,
        t.created_at
      FROM transactions t
      JOIN products p ON t.product_id = p.id
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `;

    db.all(sql, [limit, offset], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        page,
        limit,
        totalRecords: total,
        totalPages: Math.ceil(total / limit),
        data: rows
      });
    });
  });
};

module.exports = {
  getTransactions
};