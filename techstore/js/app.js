// Форматирование цены
function formatPrice(n) {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}

// Звёздный рейтинг
function renderRating(rating, reviews) {
  const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  return `<span class="product-rating">${stars} <span>(${reviews})</span></span>`;
}

// Карточка товара
function renderProductCard(p) {
  const oldPrice = p.oldPrice ? `<span class="product-price-old">${formatPrice(p.oldPrice)}</span>` : '';
  const badge = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';
  return `
    <a href="product.html?id=${p.id}" class="product-card">
      <div class="product-image">
        ${badge}
        <span>${p.icon}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        ${renderRating(p.rating, p.reviews)}
        <div class="product-price-row">
          <div>
            <span class="product-price">${formatPrice(p.price)}</span>
            ${oldPrice}
          </div>
          <button class="btn-add" data-add="${p.id}" title="В корзину">+</button>
        </div>
      </div>
    </a>
  `;
}

// Toast уведомления
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '!'}</span> ${message}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Мобильное меню
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Делегирование: добавление в корзину
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(btn.dataset.add);
      Cart.add(id);
      const p = PRODUCTS.find(p => p.id === id);
      showToast(`«${p.name}» добавлен в корзину`);
    }
  });
});
