/* =========================================================
   NAVBAR SCROLL STATE
========================================================= */
(function(){
  const navbar = document.getElementById('navbar');
  if(!navbar) return;
  function onScroll(){
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* =========================================================
   MOBILE MENU
========================================================= */
(function(){
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if(!hamburger || !mobileMenu) return;

  function toggle(open){
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    toggle(!mobileMenu.classList.contains('open'));
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => toggle(false));
  });
})();

/* =========================================================
   DAY / NIGHT CAFÉ MODE
========================================================= */
(function(){
  const toggle = document.getElementById('cafe-mode-toggle');
  if(!toggle) return;
  const icon = toggle.querySelector('.mode-icon');

  const saved = localStorage.getItem('bb-cafe-mode');
  if(saved === 'night'){
    document.body.classList.add('night-mode');
    icon.textContent = '🌙';
    toggle.setAttribute('aria-pressed', 'true');
  }

  toggle.addEventListener('click', () => {
    const isNight = document.body.classList.toggle('night-mode');
    icon.textContent = isNight ? '🌙' : '☀️';
    toggle.setAttribute('aria-pressed', String(isNight));
    localStorage.setItem('bb-cafe-mode', isNight ? 'night' : 'day');
  });
})();

/* =========================================================
   ORDER INTERACTION (event delegation — works for menu.js items too)
========================================================= */
(function(){
  const toast = document.getElementById('order-toast');
  if(!toast) return;
  let toastTimer;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add');
    if(!btn) return;
    const name = btn.dataset.name || 'Item';
    toast.textContent = `☕ ${name} added to your order`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  });
})();

/* =========================================================
   NEWSLETTER FORM VALIDATION
========================================================= */
(function(){
  const form = document.getElementById('newsletter-form');
  const msg = document.getElementById('newsletter-msg');
  if(!form) return;

  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    const value = input.value.trim();

    if(!isValidEmail(value)){
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#E07A5F';
      input.focus();
      return;
    }
    msg.textContent = 'You\'re in the bloom — welcome!';
    msg.style.color = '#B87941';
    form.reset();
  });
})();
