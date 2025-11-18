// This file handles the main page functionality, including navigation, displaying flagship products, and visitor counting.

// API endpoints for fetching flagship products and visitor counter
const API_PRODUCTS = '/api/products/flagship/all';
const API_COUNTER = '/api/counter';
const API_COUNTER_TOTAL = '/api/counter/total';

// DOM elements for rendering products
const container = document.getElementById('flagship-container');
const carouselInner = document.querySelector('.carousel-inner');

// Function to load flagship products from the backend.
// It fetches data and renders both the flagship grid and carousel.
// Usage: Called automatically when the main page loads.
async function loadFlagship() {
  const res = await fetch(API_PRODUCTS);
  const data = await res.json();
  renderFlagship(data);
  renderCarousel(data);
}

// Function to render the flagship products in a grid layout.
// It clears the container HTML and generates cards for each product.
// Usage: Called by loadFlagship with the fetched data.
function renderFlagship(products) {
  container.innerHTML = '';
  products.forEach(p => {
    const imageSrc = p.image;
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="${imageSrc}" class="card-img-top" alt="${p.model}">
          <div class="card-body text-center">
            <h5 class="card-title">${p.model}</h5>
            <p class="text-muted">${p.brand}</p>
            <p>${p.description}</p>
            <p class="fw-bold text-primary">฿${parseFloat(p.price).toLocaleString()}</p>
          </div>
        </div>
      </div>`;
  });
}

// Function to render the flagship products in a carousel.
// It clears the carousel inner HTML and generates carousel items.
// Usage: Called by loadFlagship with the fetched data.
function renderCarousel(products) {
  if (!carouselInner) return;
  carouselInner.innerHTML = '';
  products.forEach((p, index) => {
    const activeClass = index === 0 ? 'active' : '';
    const imageSrc = p.image;
    carouselInner.innerHTML += `
      <div class="carousel-item ${activeClass}">
        <img src="${imageSrc}" class="d-block w-100" alt="${p.model}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${p.model}</h5>
          <p>${p.description}</p>
          <p class="fw-bold text-primary">฿${parseFloat(p.price).toLocaleString()}</p>
        </div>
      </div>`;
  });
}

// Function to render the navigation bar based on login status.
// It checks localStorage for user data and updates the nav menu accordingly.
// Usage: Called when the page loads.
function renderNavbar() {
  const navMenu = document.getElementById('nav-menu');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!navMenu) return; // If navbar is not present on some pages

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

// Function to protect pages that require login.
// It checks if the current page is protected and redirects to login if not logged in.
// Usage: Called when the page loads.
function protectPages() {
  const protectedPages = ['apple.html', 'garmin.html', 'huawei.html'];
  const path = window.location.pathname.split('/').pop();
  const user = JSON.parse(localStorage.getItem('user'));

  if (protectedPages.includes(path) && !user) {
    alert('❌ โปรดเข้าสู่ระบบก่อนเข้าชมหน้านี้');
    window.location.href = 'login.html';
  }
}

// Render navbar and protect pages on load
renderNavbar();
protectPages();

// Function to count visitors (one per IP per day).
// It sends a POST request to the counter API.
// Usage: Called automatically when the page loads.
async function countVisitor() {
  await fetch(API_COUNTER, { method: 'POST' });
}

// Function to display the total visitor count in the footer.
// It fetches the total count and updates the footer text.
// Usage: Called automatically when the page loads.
async function displayVisitorCount() {
  const res = await fetch(API_COUNTER_TOTAL);
  const data = await res.json();
  const footer = document.querySelector('footer small');
  if (footer) {
    footer.innerHTML = `© 2025 Smartwatch Promotion | Powered by Node.js + MySQL | ผู้เข้าชม: ${data.total}`;
  }
}

// Load flagship products, count visitor, and display visitor count on page load
loadFlagship();
countVisitor();
displayVisitorCount();
