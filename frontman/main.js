const API_PRODUCTS = 'http://localhost:4000/api/products/flagship/all';
const API_COUNTER = 'http://localhost:4000/api/counter';
const container = document.getElementById('flagship-container');

// ✅ ดึงข้อมูลสินค้า Flagship จาก backend
async function loadFlagship() {
  const res = await fetch(API_PRODUCTS);
  const data = await res.json();
  renderFlagship(data);
}

// ✅ แสดงสินค้าแบบ Grid
function renderFlagship(products) {
  container.innerHTML = '';
  products.forEach(p => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top" alt="${p.model}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.model}</h5>
            <p class="text-muted">${p.brand}</p>
            <p>${p.description}</p>
            <p class="fw-bold text-primary">฿${p.price.toLocaleString()}</p>
          </div>
        </div>
      </div>`;
  });
}

// ✅ นับจำนวนผู้เข้าชม (1 IP ต่อวัน)
async function countVisitor() {
  await fetch(API_COUNTER, { method: 'POST' });
}

loadFlagship();
countVisitor();