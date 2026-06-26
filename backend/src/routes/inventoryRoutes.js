const express = require("express");
const router = express.Router();

const {
  increaseStock,
  decreaseStock
} = require("../controllers/inventoryController");

router.put("/increase/:id", increaseStock);
router.put("/decrease/:id", decreaseStock);

module.exports = router;