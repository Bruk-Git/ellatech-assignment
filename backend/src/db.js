
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create database file
const db = new sqlite3.Database(
  path.resolve(__dirname, "database.db"),
  (err) => {
    if (err) {
      console.error("Database connection error:", err.message);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);

// Create tables
db.serialize(() => {
  // USERS
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // PRODUCTS
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sku TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price > 0),
      quantity INTEGER NOT NULL DEFAULT 0 CHECK(quantity >= 0),
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // TRANSACTIONS
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('INCREASE', 'DECREASE')),
      quantity_change INTEGER NOT NULL,
      previous_quantity INTEGER NOT NULL,
      new_quantity INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);
});

module.exports = db;