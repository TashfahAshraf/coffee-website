/* =========================================================
   BREW & BLOOM — cart.js
   A real shopping cart: add / remove / qty +- / subtotal /
   total, persisted to localStorage, with a slide-out panel.

   NOTE on Phase 2+: once the backend exists, checkout should
   POST this cart's contents to /api/orders. For now the
   "Proceed to Checkout" button just explains that's next.
========================================================= */
(function () {
  const STORAGE_KEY = 'bb-cart';
  const DELIVERY_FEE = 0; // not charged yet — set once checkout/delivery logic exists

  /** @type {{name:string, price:number, qty:number, img:string}[]} */
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      /* storage unavailable — cart still works for this session */
    }
  }

  function addItem(name, price, img) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price: Number(price) || 0, qty: 1, img: img || '' });
    }
    saveCart();
    render();
  }

  function removeItem(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
    render();
  }

  function changeQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeItem(name);
      return;
    }
    saveCart();
    render();
  }

  function getSubtotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getItemCount() {
    return cart.reduce((sum, i) => sum + i.qty, 0);
  }

  function money(n) {
    return `$${n.toFixed(2)}`;
  }

  /* ---------------- rendering ---------------- */

  function render() {
    renderBadge();
    renderPanel();
  }

  function renderBadge() {
    const count = getItemCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = String(count);
    });
    document.querySelectorAll('#cart-toggle, #cart-toggle-mobile').forEach(btn => {
      btn.classList.toggle('has-items', count > 0);
    });
  }

  function renderPanel() {
    const itemsEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    if (!itemsEl || !subtotalEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <span class="cart-empty-icon" aria-hidden="true">☕</span>
          <p>Your cart is empty.<br>Add something delicious from the menu.</p>
        </div>`;
    } else {
      itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item" data-name="${escapeHtml(item.name)}">
          ${item.img ? `<div class="cart-item-img" style="background-image:url('${item.img}')"></div>` : ''}
          <div class="cart-item-body">
            <div class="cart-item-top">
              <h4>${escapeHtml(item.name)}</h4>
              <button class="cart-item-remove" data-action="remove" aria-label="Remove ${escapeHtml(item.name)}">✕</button>
            </div>
            <div class="cart-item-bottom">
              <div class="qty-stepper">
                <button data-action="decrease" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button data-action="increase" aria-label="Increase quantity">+</button>
              </div>
              <span class="cart-item-price">${money(item.price * item.qty)}</span>
            </div>
          </div>
        </div>
      `).join('');
    }

    const subtotal = getSubtotal();
    subtotalEl.textContent = money(subtotal + DELIVERY_FEE);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------- panel open/close ---------------- */

  function setPanelOpen(open) {
    const panel = document.getElementById('cart-panel');
    const overlay = document.getElementById('cart-overlay');
    const toggle = document.getElementById('cart-toggle');
    if (!panel || !overlay) return;
    panel.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    panel.setAttribute('aria-hidden', String(!open));
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  /* ---------------- toast (reuses existing #order-toast) ---------------- */

  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById('order-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ---------------- wire up events ---------------- */

  document.addEventListener('DOMContentLoaded', () => {
    render();

    // Add to cart — delegated, works for featured cards + dynamic menu grid
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add');
      if (addBtn) {
        const name = addBtn.dataset.name || 'Item';
        const price = parseFloat(addBtn.dataset.price) || 0;
        const img = addBtn.dataset.img || '';
        addItem(name, price, img);
        showToast(`☕ ${name} added to your order`);
        return;
      }

      const cartItemBtn = e.target.closest('.cart-item [data-action]');
      if (cartItemBtn) {
        const row = cartItemBtn.closest('.cart-item');
        const name = row?.dataset.name;
        if (!name) return;
        const action = cartItemBtn.dataset.action;
        if (action === 'increase') changeQty(name, 1);
        if (action === 'decrease') changeQty(name, -1);
        if (action === 'remove') removeItem(name);
        return;
      }
    });

    document.getElementById('cart-toggle')?.addEventListener('click', () => setPanelOpen(true));
    document.getElementById('cart-toggle-mobile')?.addEventListener('click', () => setPanelOpen(true));
    document.getElementById('cart-close')?.addEventListener('click', () => setPanelOpen(false));
    document.getElementById('cart-overlay')?.addEventListener('click', () => setPanelOpen(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setPanelOpen(false);
    });

    document.getElementById('cart-checkout')?.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty — add something first ☕');
        return;
      }
      showToast('Checkout, guest orders & accounts are coming in the next build phase!');
    });
  });

  // Small public API in case other scripts (or future api.js) need it
  window.BBCart = { addItem, removeItem, changeQty, getSubtotal, getItemCount };
})();
