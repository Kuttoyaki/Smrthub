const API = 'http://localhost:4000/api/products/Huawei';
const container = document.getElementById('huawei-products');

// ✅ ดึงข้อมูลสินค้าจากฐานข้อมูล
async function loadHuaweiProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    console.error('Error loading Huawei products:', err);
  }
}

// ✅ แสดงข้อมูลสินค้าในรูปแบบ Grid
function renderProducts(products) {
  container.innerHTML = '';
  products.forEach(p => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top" alt="${p.model}">
          <div class="card-body">
            <h5 class="card-title text-center">${p.model}</h5>
            <p class="text-muted text-center">${p.brand}</p>
            <p>${p.description}</p>
            <ul>
              <li>หน้าจอ AMOLED 1.5”</li>
              <li>แบตเตอรี่สูงสุด 14 วัน</li>
              <li>เซ็นเซอร์วัดชีพจร / SpO₂ / ความเครียด</li>
              <li>รองรับ Huawei Health</li>
            </ul>
            <p class="fw-bold text-primary text-center">฿${p.price.toLocaleString()}</p>
          </div>
        </div>
      </div>`;
  });
}

loadHuaweiProducts();