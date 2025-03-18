const API_URL = "/api/products";

document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();

  document.getElementById("addBtn").addEventListener("click", addProduct);
});

async function fetchProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const list = document.getElementById("productList");
  list.innerHTML = "";
  data.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p.name} - $${p.price}`;
    list.appendChild(li);
  });
}

async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  if (!name || !price) return alert("Nhập đầy đủ thông tin");

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price }),
  });

  fetchProducts();
}
