// This file handles loading and displaying Huawei products on the Huawei page.
// It fetches the first 3 Huawei products from the database and displays them in a carousel.

// API endpoint for fetching Huawei products from the backend
const API = '/api/products/Huawei';

// Function to load Huawei products from the backend API.
// It fetches data, handles errors with try-catch, and renders the carousel.
// Usage: Called automatically when the page loads.
async function loadHuaweiProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderCarousel(data);
  } catch (err) {
    console.error('Error loading Huawei products:', err);
  }
}

// Function to render the carousel with the first 3 products.
// It clears the carousel inner HTML, slices the products array to 3, and generates HTML for each carousel item.
// Usage: Called by loadHuaweiProducts with the fetched data.
function renderCarousel(products) {
  const carouselInner = document.querySelector('#huaweiCarousel .carousel-inner');
  if (!carouselInner) return;
  carouselInner.innerHTML = '';
  products.slice(0, 3).forEach((p, index) => {
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

// Load Huawei products when the page loads
loadHuaweiProducts();
