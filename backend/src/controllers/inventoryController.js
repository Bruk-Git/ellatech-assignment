const db = require("../db");

// INCREASE STOCK
const increaseStock = (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      error: "Quantity must be greater than 0"
    });
  }

  db.get(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, product) => {
      if (err || !product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const newQuantity = product.quantity + quantity;

      db.run(
        `UPDATE products 
         SET quantity = ?, last_updated = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [newQuantity, productId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Save transaction
          db.run(
            `INSERT INTO transactions 
            (product_id, type, quantity_change, previous_quantity, new_quantity)
            VALUES (?, 'INCREASE', ?, ?, ?)`,
            [productId, quantity, product.quantity, newQuantity]
          );

          res.json({
            message: "Stock increased successfully",
            oldQuantity: product.quantity,
            newQuantity
          });
        }
      );
    }
  );
};

// DECREASE STOCK
const decreaseStock = (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      error: "Quantity must be greater than 0"
    });
  }

  db.get(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, product) => {
      if (err || !product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({
          error: "Cannot reduce stock below zero"
        });
      }

      const newQuantity = product.quantity - quantity;

      db.run(
        `UPDATE products 
         SET quantity = ?, last_updated = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [newQuantity, productId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Save transaction
          db.run(
            `INSERT INTO transactions 
            (product_id, type, quantity_change, previous_quantity, new_quantity)
            VALUES (?, 'DECREASE', ?, ?, ?)`,
            [productId, quantity, product.quantity, newQuantity]
          );

          res.json({
            message: "Stock decreased successfully",
            oldQuantity: product.quantity,
            newQuantity
          });
        }
      );
    }
  );
};

module.exports = {
  increaseStock,
  decreaseStock
};