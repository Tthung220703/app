const pool = require("../db");

// Tạo bảng nếu chưa có
const createTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )
  `);
};
createTable();

// Thêm sản phẩm
const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const result = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tìm kiếm sản phẩm theo tên
const searchProduct = async (req, res) => {
  try {
    const { name } = req.query;
    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1",
      [`%${name}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật sản phẩm theo ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Thiếu tên hoặc giá sản phẩm" });
    }

    const result = await pool.query(
      "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
      [name, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa sản phẩm theo ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }

    res.json({ message: "Sản phẩm đã được xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addProduct, searchProduct, getAllProducts, updateProduct, deleteProduct };
