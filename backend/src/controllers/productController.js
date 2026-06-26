const db = require("../db");

// CREATE PRODUCT
const createProduct = (req, res) => {
  const { sku, name, price, quantity } = req.body;

  // validation
  if (!sku || !name || price == null || quantity == null) {
    return res.status(400).json({
      error: "SKU, name, price, and quantity are required"
    });
  }

  if (price <= 0) {
    return res.status(400).json({
      error: "Price must be greater than 0"
    });
  }

  if (quantity < 0) {
    return res.status(400).json({
      error: "Quantity cannot be negative"
    });
  }

  const sql = `
    INSERT INTO products (sku, name, price, quantity)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [sku, name, price, quantity], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.json({
      message: "Product created successfully",
      productId: this.lastID
    });
  });
};

// GET ALL PRODUCTS
const getProducts = (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

module.exports = {
  createProduct,
  getProducts
};