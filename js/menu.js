/* =========================================================
   MENU DATA + FILTERING
========================================================= */
(function(){
  const MENU_ITEMS = [
    { name:"Espresso", desc:"Bold, concentrated, and rich.", price:"$3.25", category:"coffee",
      img:"https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=200&q=80" },
    { name:"Cappuccino", desc:"Espresso, steamed milk, thick foam.", price:"$4.50", category:"coffee",
      img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&q=80" },
    { name:"Latte", desc:"Smooth espresso with silky steamed milk.", price:"$4.75", category:"coffee",
      img:"https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=200&q=80" },
    { name:"Americano", desc:"Espresso lengthened with hot water.", price:"$3.75", category:"coffee",
      img:"https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&w=200&q=80" },
    { name:"Mocha", desc:"Espresso, chocolate, steamed milk.", price:"$5.00", category:"coffee",
      img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=200&q=80" },
    { name:"Cold Brew", desc:"Slow-steeped for 18 hours, smooth and bold.", price:"$4.50", category:"cold",
      img:"https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=200&q=80" },
    { name:"Iced Latte", desc:"Chilled espresso and cold milk over ice.", price:"$4.75", category:"cold",
      img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=200&q=80" },
    { name:"Caramel Frappe", desc:"Blended coffee, caramel, whipped cream.", price:"$5.50", category:"cold",
      img:"https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=200&q=80" },
    { name:"Vanilla Cold Coffee", desc:"Chilled coffee, vanilla, milk.", price:"$4.90", category:"cold",
      img:"https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=200&q=80" },
    { name:"Ceremonial Matcha", desc:"Stone-ground green tea, oat milk.", price:"$5.25", category:"tea",
      img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=200&q=80" },
    { name:"Chai Latte", desc:"Spiced black tea, steamed milk.", price:"$4.60", category:"tea",
      img:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=200&q=80" },
    { name:"Chamomile Bloom", desc:"Calming chamomile with honey.", price:"$4.00", category:"tea",
      img:"https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=200&q=80" },
    { name:"Chocolate Brownie", desc:"Dense, fudgy, dark chocolate.", price:"$4.25", category:"desserts",
      img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=200&q=80" },
    { name:"Tiramisu", desc:"Espresso-soaked layers, mascarpone.", price:"$5.75", category:"desserts",
      img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=200&q=80" },
    { name:"Cinnamon Roll", desc:"Warm, soft, glazed.", price:"$4.50", category:"desserts",
      img:"https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=200&q=80" },
    { name:"Croissant", desc:"Buttery, flaky, baked fresh daily.", price:"$3.75", category:"desserts",
      img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&q=80" }
  ];

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
            <button class="btn-add" data-name="${item.name}">Add</button>
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
