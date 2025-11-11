const API = 'http://localhost:4000/api/products/Apple';
const container = document.getElementById('apple-products');

// ✅ โหลดข้อมูลสินค้าจาก Backend
async function loadAppleProducts() {
  const res = await fetch(API);
  const data = await res.json();
  renderProducts(data);
}

// ✅ แสดงสินค้าใน Grid
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
              <li>ระบบปฏิบัติการ: watchOS</li>
              <li>กันน้ำ: 50 เมตร</li>
              <li>เซ็นเซอร์: วัดชีพจร / GPS / SpO2</li>
            </ul>
            <p class="fw-bold text-primary text-center">฿${p.price.toLocaleString()}</p>
          </div>
        </div>
      </div>`;
  });
}

loadAppleProducts();