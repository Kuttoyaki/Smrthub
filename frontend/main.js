const API_PRODUCTS = '/api/products/flagship/all';
const API_COUNTER = '/api/counter';
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

// ✅ ฟังก์ชันแสดง Navbar ตามสถานะ Login
function renderNavbar() {
  const navMenu = document.getElementById('nav-menu');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!navMenu) return; // ถ้าไม่มี navbar ในบางหน้า

  navMenu.innerHTML = `
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="apple.html">Apple</a></li>
    <li class="nav-item"><a class="nav-link" href="garmin.html">Garmin</a></li>
    <li class="nav-item"><a class="nav-link" href="huawei.html">Huawei</a></li>
    ${user
      ? `<li class="nav-item"><span class="nav-link text-info">👋 ${user.fullname}</span></li>
         <li class="nav-item"><a class="nav-link text-danger" href="#" id="logoutBtn">ออกจากระบบ</a></li>`
      : `<li class="nav-item"><a class="nav-link" href="register.html">ลงทะเบียนสมาชิก</a></li>
         <li class="nav-item"><a class="nav-link" href="login.html">เข้าสู่ระบบ</a></li>`}
  `;

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
  }
}

// ✅ จำกัดการเข้าหน้า Apple / Garmin / Huawei
function protectPages() {
  const protectedPages = ['apple.html', 'garmin.html', 'huawei.html'];
  const path = window.location.pathname.split('/').pop();
  const user = JSON.parse(localStorage.getItem('user'));

  if (protectedPages.includes(path) && !user) {
    alert('❌ โปรดเข้าสู่ระบบก่อนเข้าชมหน้านี้');
    window.location.href = 'login.html';
  }
}

renderNavbar();
protectPages();

// ✅ นับจำนวนผู้เข้าชม (1 IP ต่อวัน)
async function countVisitor() {
  await fetch(API_COUNTER, { method: 'POST' });
}

loadFlagship();
countVisitor();
