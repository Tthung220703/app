const express = require("express");
const {
  addProduct,
  searchProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/controller");

const router = express.Router();

router.post("/products", addProduct); // Thêm sản phẩm
router.get("/products", getAllProducts); // Lấy tất cả sản phẩm
router.get("/products/search", searchProduct); // Tìm sản phẩm theo tên
router.put("/products/:id", updateProduct); // Cập nhật sản phẩm theo ID
router.delete("/products/:id", deleteProduct); // Xóa sản phẩm theo ID

module.exports = router;
