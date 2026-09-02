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
   NOTE: "Add to Order" clicks (toast + adding to the cart)
   are now handled in cart.js, since the cart needs to own
   that click to update its state and badge count too.
========================================================= */

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

/* =========================================================
   RESERVATION FORM VALIDATION
   (Frontend-only for now — no backend to save to yet. See
   the footnote under the form and the Phase 7 roadmap item.)
========================================================= */
(function(){
  const form = document.getElementById('reserve-form');
  const msg = document.getElementById('reserve-msg');
  if(!form) return;

  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('reserve-name');
    const email = document.getElementById('reserve-email');
    const phone = document.getElementById('reserve-phone');
    const guests = document.getElementById('reserve-guests');
    const date = document.getElementById('reserve-date');
    const time = document.getElementById('reserve-time');

    const fields = [name, email, phone, guests, date, time];
    const firstEmpty = fields.find(f => !f.value.trim());

    if(firstEmpty){
      msg.textContent = 'Please fill in every field to reserve your table.';
      msg.style.color = '#E07A5F';
      firstEmpty.focus();
      return;
    }
    if(!isValidEmail(email.value.trim())){
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#E07A5F';
      email.focus();
      return;
    }
    if(Number(guests.value) < 1 || Number(guests.value) > 12){
      msg.textContent = 'Guests should be between 1 and 12 — call us directly for larger groups.';
      msg.style.color = '#E07A5F';
      guests.focus();
      return;
    }

    msg.textContent = `Thanks, ${name.value.trim()}! We've noted your table for ${guests.value} on ${date.value} at ${time.value}.`;
    msg.style.color = '#B87941';
    form.reset();
  });
})();
