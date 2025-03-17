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

// Tìm kiếm sản phẩm
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

module.exports = { addProduct, searchProduct };
