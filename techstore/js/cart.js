const Cart = {
  KEY: 'techstore_cart',

  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
    window.dispatchEvent(new CustomEvent('cart-updated'));
  },

  add(productId, qty = 1) {
    const items = this.get();
    const existing = items.find(i => i.id === productId);
    if (existing) existing.qty += qty;
    else items.push({ id: productId, qty });
    this.save(items);
  },

  remove(productId) {
    this.save(this.get().filter(i => i.id !== productId));
  },

  updateQty(productId, qty) {
    const items = this.get();
    const item = items.find(i => i.id === productId);
    if (!item) return;
    if (qty <= 0) this.remove(productId);
    else { item.qty = qty; this.save(items); }
  },

  clear() { this.save([]); },

  count() { return this.get().reduce((s, i) => s + i.qty, 0); },

  total() {
    return this.get().reduce((sum, item) => {
      const p = PRODUCTS.find(p => p.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  },

  updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(el => {
      const count = this.count();
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });
  }
};

window.Cart = Cart;
