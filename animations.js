/* =========================================================
   SCROLL-TRIGGERED REVEALS, PARALLAX, COUNTERS
========================================================= */
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setupReveals(){
    const targets = document.querySelectorAll('[data-fade], [data-fade-right], [data-reveal]');
    if(reduceMotion){
      targets.forEach(el => el.classList.add('in-view'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

    targets.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 90}ms`;
      io.observe(el);
    });
  }

  function setupJourneyLine(){
    const line = document.querySelector('.journey-line');
    if(!line) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          line.classList.add('filled');
          io.unobserve(line);
        }
      });
    }, { threshold: 0.4 });
    io.observe(line);
  }

  function setupParallax(){
    if(reduceMotion) return;
    const storyImg = document.querySelector('[data-parallax] img');
    const sigBg = document.querySelector('[data-parallax-bg]');
    let ticking = false;

    function update(){
      const scY = window.scrollY;
      if(storyImg){
        const rect = storyImg.closest('[data-parallax]').getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * 0.06;
        storyImg.style.transform = `translateY(${Math.max(-30, Math.min(30, offset - 30))}px)`;
      }
      if(sigBg){
        const rect = sigBg.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        sigBg.style.transform = `scale(${1 + Math.max(0, Math.min(0.15, progress * 0.15))})`;
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    });
    update();
  }

  function setupCounters(){
    const nums = document.querySelectorAll('.stat-num');
    if(!nums.length) return;

    function animateCount(el){
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isDecimal = el.dataset.decimal === 'true';
      const duration = 1400;
      const start = performance.now();

      function tick(now){
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
        if(progress < 1) requestAnimationFrame(tick);
      }
      if(reduceMotion){
        el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
      } else {
        requestAnimationFrame(tick);
      }
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    nums.forEach(n => io.observe(n));
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupReveals();
    setupJourneyLine();
    setupParallax();
    setupCounters();
  });
})();

