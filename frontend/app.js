const API_URL = "/api/products";

document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
  document.getElementById("addBtn").addEventListener("click", addProduct);
});

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const list = document.getElementById("productList");
    list.innerHTML = "";
    
    data.forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${p.name} - $${p.price} 
        <button onclick="editProduct(${p.id}, '${p.name}', ${p.price})">✏️</button> 
        <button onclick="deleteProduct(${p.id})">❌</button>
      `;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
  }
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  
  if (!name || !price) return alert("Nhập đầy đủ thông tin!");

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    fetchProducts();
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
}

async function deleteProduct(id) {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
}

function editProduct(id, oldName, oldPrice) {
  const newName = prompt("Nhập tên mới:", oldName);
  const newPrice = prompt("Nhập giá mới:", oldPrice);
  
  if (newName && newPrice) {
    updateProduct(id, newName, newPrice);
  }
}

async function updateProduct(id, name, price) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    fetchProducts();
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
  }
}
