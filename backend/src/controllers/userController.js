const db = require("../db");

// Create user
const createUser = (req, res) => {
  const { full_name, email } = req.body;

  if (!full_name || !email) {
    return res.status(400).json({ error: "Full name and email are required" });
  }

  const sql = `
    INSERT INTO users (full_name, email)
    VALUES (?, ?)
  `;

  db.run(sql, [full_name, email], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.json({
      message: "User created successfully",
      userId: this.lastID
    });
  });
};

// Get all users
const getUsers = (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
};

module.exports = {
  createUser,
  getUsers
};