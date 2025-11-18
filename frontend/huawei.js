const API = '/api/products/Huawei';

// ✅ ดึงข้อมูลสินค้าจากฐานข้อมูล
async function loadHuaweiProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderCarousel(data);
  } catch (err) {
    console.error('Error loading Huawei products:', err);
  }
}

// ✅ แสดง Carousel จากข้อมูลฐานข้อมูล
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

loadHuaweiProducts();
