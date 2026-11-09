(function() {
      'use strict';

      const searchInput = document.getElementById('searchInput');
      const categorySelect = document.getElementById('categorySelect');
      const conditionSelect = document.getElementById('conditionSelect');
      const searchOrbBtn = document.getElementById('searchOrbBtn');
      const categoryTabs = document.querySelectorAll('.category-tab');
      const emptyState = document.getElementById('emptyState');
      const cards = Array.from(document.querySelectorAll('.property-card'));

      function applyAllFilters() {
        const query = (searchInput.value || '').toLowerCase().trim();
        const selectedCat = categorySelect ? categorySelect.value : 'semua';
        const selectedCond = conditionSelect ? conditionSelect.value : 'semua';

        let matchCount = 0;

        cards.forEach(card => {
          const name = (card.getAttribute('data-name') || '').toLowerCase();
          const cat = card.getAttribute('data-category');
          const cond = card.getAttribute('data-condition');

          const matchQuery = !query || name.includes(query) || cat.toLowerCase().includes(query);
          const matchCategory = selectedCat === 'semua' || cat === selectedCat;
          const matchCondition = selectedCond === 'semua' || cond === selectedCond;

          if (matchQuery && matchCategory && matchCondition) {
            card.style.display = 'flex';
            matchCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (matchCount === 0) {
          emptyState.classList.add('empty-state--visible');
        } else {
          emptyState.classList.remove('empty-state--visible');
        }
      }

      searchInput.addEventListener('input', applyAllFilters);

      if (categorySelect) {
        categorySelect.addEventListener('change', function() {
          categoryTabs.forEach(t => {
            if (t.getAttribute('data-cat') === categorySelect.value) {
              t.classList.add('category-tab--active');
            } else {
              t.classList.remove('category-tab--active');
            }
          });
          applyAllFilters();
        });
      }

      if (conditionSelect) {
        conditionSelect.addEventListener('change', applyAllFilters);
      }

      searchOrbBtn.addEventListener('click', applyAllFilters);

      categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          categoryTabs.forEach(t => t.classList.remove('category-tab--active'));
          this.classList.add('category-tab--active');
          const cat = this.getAttribute('data-cat');
          if (categorySelect) {
            categorySelect.value = cat;
          }
          applyAllFilters();
        });
      });
    })();
