
(function(){
  const grid = document.getElementById('projectsGrid');
  const filters = document.querySelectorAll('.filter');
  const searchInput = document.getElementById('searchInput');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (optional)
  document.querySelector('.theme-toggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
  });

  let activeFilter = 'all';
  let query = '';

  function renderCards(){
    const q = query.trim().toLowerCase();

    const filtered = (window.projectsData||[]).filter(p => {
      const matchCat = activeFilter === 'all' || p.category === activeFilter;
      const matchQuery = !q || p.title.toLowerCase().includes(q) || (p.tags||[]).some(t => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });

    grid.innerHTML = '';

    filtered.forEach(p => {
      const a = document.createElement('a');
      a.href = `project.html?project=${encodeURIComponent(p.slug)}`;
      a.className = 'card';
      a.setAttribute('aria-label', `${p.title} – Open project`);
      a.innerHTML = `
        <div class="card-media">
          <img src="${p.cover}" alt="Cover image for ${p.title}">
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <div class="card-meta">
            <span class="badge">${labelFromCategory(p.category)}</span>
            <span>${p.year ?? ''}</span>
          </div>
        </div>
      `;
      grid.appendChild(a);
    });

    if(filtered.length === 0){
      const empty = document.createElement('p');
      empty.style.color = 'var(--muted)';
      empty.textContent = 'No projects match your filters.';
      grid.appendChild(empty);
    }
  }

  function labelFromCategory(cat){
    switch(cat){
      case 'product-design': return 'Product Design';
      case 'ui-ux': return 'UI/UX';
      case 'packaging': return 'Packaging';
      case 'automotive-3d': return 'Automotive/3D';
      case 'Branding': return 'Branding';
      default: return cat;
    }
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      activeFilter = btn.dataset.filter;
      renderCards();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    query = e.target.value;
    renderCards();
  });

  renderCards();
})();
