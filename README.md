# Brew & Bloom

A premium, animated coffee-shop web experience — being converted from a static
site into a full-stack (MERN-style) ordering platform.

## Project structure

```
brew-and-bloom/
├── client/          # Frontend (static for now — HTML/CSS/JS)
│   ├── index.html
│   ├── css/
│   │   ├── style.css       # design tokens, base layout, shared sections
│   │   ├── redesign.css    # mega nav, editorial cards, process/category browsers, reservations
│   │   ├── cart.css
│   │   └── responsive.css
│   └── js/
│       ├── menu.js          # menu data + category filtering
│       ├── cart.js          # cart state, persistence, drawer UI
│       ├── interactions.js  # category browser + process section stage swaps
│       ├── animations.js    # scroll reveals, parallax, counters
│       └── main.js          # navbar, mobile menu, day/night toggle, newsletter, reservations
├── server/          # Backend (Node/Express/MongoDB — Phase 2+)
└── README.md
```

## Roadmap

- [x] **Phase 1 — Frontend restructure + real cart**
      client/ folder layout, working shopping cart (add/remove/qty/subtotal,
      persisted to localStorage, cart badge + slide-out drawer), dead code
      (unused intro sequence) removed.
- [x] **Frontend redesign — "Premium Artisan Coffee Experience"**
      Mega-menu nav with category preview, minimal full-bleed hero, editorial
      menu cards with hover reveal, interactive horizontal category browser,
      interactive Source→Roast→Brew→Enjoy process section, reservations
      section (frontend-only form for now), updated light/dark color system
      with contrast-checked text on every background.
- [ ] **Phase 2 — Backend setup** — Node.js, Express, MongoDB connection, env vars.
- [ ] **Phase 3 — Menu API** — products served from MongoDB via `GET /api/menu`.
- [ ] **Phase 4 — Authentication** — register/login/profile, bcrypt + JWT.
- [ ] **Phase 5 — Orders** — real checkout (guest + account), saved orders, order tracking.
- [ ] **Phase 6 — Admin dashboard** — manage products/orders/reservations.
- [ ] **Phase 7 — Extras** — newsletter persistence, table reservations, order status tracking.

## Running the frontend right now
