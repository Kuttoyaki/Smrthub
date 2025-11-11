const API = 'http://localhost:4000/api/products/Garmin';
const container = document.getElementById('garmin-products');

// ✅ โหลดข้อมูลสินค้าจาก Backend
async function loadGarminProducts() {
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
              <li>GPS: มีระบบ Multi-Band GNSS</li>
              <li>เซ็นเซอร์: วัดชีพจร / ความดัน / SpO₂</li>
              <li>กันน้ำ: 100 เมตร</li>
              <li>วัสดุ: กระจก Sapphire / ตัวเรือนไทเทเนียม</li>
            </ul>
            <p class="fw-bold text-primary text-center">฿${p.price.toLocaleString()}</p>
          </div>
        </div>
      </div>`;
  });
}

loadGarminProducts();