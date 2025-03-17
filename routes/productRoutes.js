const express = require("express");
const router = express.Router();
const { addProduct, searchProduct } = require("../controllers/productController");

router.post("/products", addProduct);
router.get("/products", searchProduct);

module.exports = router;
