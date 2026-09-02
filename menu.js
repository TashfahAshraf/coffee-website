/* =========================================================
   MENU DATA + FILTERING
========================================================= */
(function(){
  const MENU_ITEMS = [
    { name:"Espresso", desc:"Bold, concentrated, and rich.", price:"$3.25", category:"coffee",
      img:"https://images.pexels.com/photos/9050518/pexels-photo-9050518.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Cappuccino", desc:"Espresso, steamed milk, thick foam.", price:"$4.50", category:"coffee",
      img:"https://images.pexels.com/photos/13623762/pexels-photo-13623762.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Latte", desc:"Smooth espresso with silky steamed milk.", price:"$4.75", category:"coffee",
      img:"https://images.pexels.com/photos/13623762/pexels-photo-13623762.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Americano", desc:"Espresso lengthened with hot water.", price:"$3.75", category:"coffee",
      img:"https://images.pexels.com/photos/9050518/pexels-photo-9050518.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Mocha", desc:"Espresso, chocolate, steamed milk.", price:"$5.00", category:"coffee",
      img:"https://images.pexels.com/photos/691169/pexels-photo-691169.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Cold Brew", desc:"Slow-steeped for 18 hours, smooth and bold.", price:"$4.50", category:"cold",
      img:"https://images.pexels.com/photos/11100423/pexels-photo-11100423.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Iced Latte", desc:"Chilled espresso and cold milk over ice.", price:"$4.75", category:"cold",
      img:"https://images.pexels.com/photos/11100423/pexels-photo-11100423.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Caramel Frappe", desc:"Blended coffee, caramel, whipped cream.", price:"$5.50", category:"cold",
      img:"https://images.pexels.com/photos/11100423/pexels-photo-11100423.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Vanilla Cold Coffee", desc:"Chilled coffee, vanilla, milk.", price:"$4.90", category:"cold",
      img:"https://images.pexels.com/photos/11100423/pexels-photo-11100423.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Ceremonial Matcha", desc:"Stone-ground green tea, oat milk.", price:"$5.25", category:"tea",
      img:"https://images.pexels.com/photos/8634757/pexels-photo-8634757.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Chai Latte", desc:"Spiced black tea, steamed milk.", price:"$4.60", category:"tea",
      img:"https://images.pexels.com/photos/33789289/pexels-photo-33789289.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Chamomile Bloom", desc:"Calming chamomile with honey.", price:"$4.00", category:"tea",
      img:"https://images.pexels.com/photos/6962419/pexels-photo-6962419.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Chocolate Brownie", desc:"Dense, fudgy, dark chocolate.", price:"$4.25", category:"desserts",
      img:"https://images.pexels.com/photos/25595974/pexels-photo-25595974.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Tiramisu", desc:"Espresso-soaked layers, mascarpone.", price:"$5.75", category:"desserts",
      img:"https://images.pexels.com/photos/13177921/pexels-photo-13177921.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Cinnamon Roll", desc:"Warm, soft, glazed.", price:"$4.50", category:"desserts",
      img:"https://images.pexels.com/photos/9443534/pexels-photo-9443534.jpeg?auto=compress&cs=tinysrgb&w=200" },
    { name:"Croissant", desc:"Buttery, flaky, baked fresh daily.", price:"$3.75", category:"desserts",
      img:"https://images.pexels.com/photos/19296861/pexels-photo-19296861.jpeg?auto=compress&cs=tinysrgb&w=200" }
  ];

  // Expose menu data globally so cart.js (and a future api.js) can read it.
  // In Phase 3 this array gets replaced by a fetch('/api/menu') call —
  // keeping it on window.BB_MENU_ITEMS now means that swap won't touch any other file.
  window.BB_MENU_ITEMS = MENU_ITEMS;

  function priceToNumber(priceStr){
    return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
  }

  function renderMenu(){
    const grid = document.getElementById('menu-grid');
    if(!grid) return;
    grid.innerHTML = MENU_ITEMS.map(item => `
      <div class="menu-item" data-category="${item.category}">
        <div class="menu-item-img" style="background-image:url('${item.img}')"></div>
        <div class="menu-item-body">
          <h4>${item.name}</h4>
          <p>${item.desc}</p>
          <div class="menu-item-footer">
            <span class="price">${item.price}</span>
            <button class="btn-add" data-name="${item.name}" data-price="${priceToNumber(item.price)}" data-img="${item.img}">Add</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function setupFilter(){
    const tabs = document.querySelectorAll('.menu-tab');
    const items = () => document.querySelectorAll('.menu-item');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected','true');

        const cat = tab.dataset.category;
        items().forEach(item => {
          const match = cat === 'all' || item.dataset.category === cat;
          item.classList.toggle('hide', !match);
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupFilter();
  });
})();
