/* =========================================================
   BREW & BLOOM — interactions.js
   Two small pieces of "editorial" interactivity:
   1. Category browser — clicking a category pill swaps a
      large image + tagline stage above the menu grid.
      (Filtering the actual grid is still handled by the
      existing setupFilter() in menu.js — both listen for
      clicks on the same .menu-tab buttons independently.)
   2. Coffee process — clicking a step swaps the large
      image + tagline next to the step list.

   Note: the nav mega-panel is pure CSS (:hover / :focus-within
   in redesign.css) and needs no JS — it's a desktop-only
   enhancement that's hidden once the nav collapses to the
   hamburger menu at 900px.
========================================================= */
(function () {
  function setupCategoryStage() {
    const pills = document.querySelectorAll('.category-pill');
    const stage = document.getElementById('category-stage');
    const stageImg = document.getElementById('category-stage-img');
    const stageLabel = document.getElementById('category-stage-label');
    const stageTagline = document.getElementById('category-stage-tagline');
    if (!pills.length || !stage || !stageImg || !stageLabel || !stageTagline) return;

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const isAll = pill.dataset.category === 'all';
        const img = pill.dataset.stageImg;

        if (isAll || !img) {
          stage.hidden = true;
          return;
        }

        stageImg.style.backgroundImage = `url('${img}')`;
        stageLabel.textContent = pill.textContent.trim();
        stageTagline.textContent = pill.dataset.stageTagline || '';
        stage.hidden = false;
      });
    });
  }

  function setupProcessStage() {
    const steps = document.querySelectorAll('.process-step');
    const stageImg = document.getElementById('process-stage-img');
    const stageTagline = document.getElementById('process-stage-tagline');
    if (!steps.length || !stageImg || !stageTagline) return;

    steps.forEach(step => {
      step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('is-active'));
        step.classList.add('is-active');
        stageImg.style.backgroundImage = `url('${step.dataset.img}')`;
        stageTagline.textContent = step.dataset.tagline || '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupCategoryStage();
    setupProcessStage();
  });
})();
