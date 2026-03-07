
(function(){
  const grid = document.getElementById('projectsGrid');
  const filtersWrap = document.querySelector('.filters');
  const searchInput = document.getElementById('searchInput');
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (persisted, default dark)
  (function(){
    const btn = document.querySelector('.theme-toggle');
    const apply = (mode) => {
      document.documentElement.classList.toggle('light', mode==='light');
      if (btn){ btn.textContent = (mode==='light') ? '☀️' : '🌙'; btn.setAttribute('aria-pressed', (mode==='light').toString()); }
    };
    const stored = localStorage.getItem('theme');
    const mode = stored || 'dark';
    apply(mode);
    btn?.addEventListener('click', ()=>{ const now = document.documentElement.classList.contains('light') ? 'dark' : 'light'; localStorage.setItem('theme', now); apply(now); });
  })();

  // Hero video init
  (function(){ const sc=window.siteConfig||{}; const hv=sc.heroVideo||{}; const v=document.getElementById('heroVideo'); if(!v) return; if(hv.poster) v.setAttribute('poster', hv.poster); ['muted','loop','autoplay','playsinline'].forEach(a=>{ if(hv[a]!==false) v.setAttribute(a,''); }); if(Array.isArray(hv.sources)&&hv.sources.length){ hv.sources.forEach(s=>{ const src=document.createElement('source'); src.src=s.src; src.type=s.type||''; v.appendChild(src); }); const p=v.play(); if(p&&p.catch) p.catch(()=>{}); } else { const m=document.querySelector('.hero-media'); if(m) m.style.display='none'; } })();

  // Scroll cue
  (function(){ const cue=document.querySelector('.scroll-cue'); if(!cue) return; const hero=document.querySelector('.hero'); function onScroll(){ const h=hero?hero.clientHeight:300; const t=Math.min(1, window.scrollY/(h*0.6)); cue.style.opacity=String(1-t); cue.style.pointerEvents=(t>0.95)?'none':'auto'; } window.addEventListener('scroll', onScroll, {passive:true}); cue.addEventListener('click', ()=>{ window.scrollTo({ top:(hero?.clientHeight||400)-60, behavior:'smooth' }); }); onScroll(); })();

  // Site name + LinkedIn from config
  (function(){ const sc=window.siteConfig||{site:{}}; document.querySelectorAll('.brand-text').forEach(n=> n.textContent = (sc.site&&sc.site.displayName)||''); const li=document.getElementById('ctaLinkedIn'); if(li&&sc.site&&sc.site.linkedin) li.href=sc.site.linkedin; })();

  // Dynamic categories (multi-select)
  const data = window.projectsData || [];
  const cats = Array.from(new Set(data.flatMap(p => Array.isArray(p.categories) ? p.categories : (p.category?[p.category]:[])))).filter(Boolean).sort();
  if (filtersWrap){ filtersWrap.innerHTML = [ `<button class="filter" data-filter="all" aria-pressed="true">All</button>`, ...cats.map(c=>`<button class="filter" data-filter="${c}" aria-pressed="false">${c.replace(/[-_]/g,' ').replace(/\w/g,m=>m.toUpperCase())}</button>`) ].join(''); }
  const selected = new Set(); let query='';

  function renderCards(){ const filtered=data.filter(p=>{ const pc=Array.isArray(p.categories)?p.categories:(p.category?[p.category]:[]); const matchCat=(selected.size===0)||pc.some(c=>selected.has(c)); const q=query.trim().toLowerCase(); const matchQuery=!q||p.title.toLowerCase().includes(q)||(p.tags||[]).some(t=>t.toLowerCase().includes(q)); return matchCat&&matchQuery; }); grid.innerHTML=''; filtered.forEach(p=>{ const badges=(Array.isArray(p.categories)?p.categories:(p.category?[p.category]:[])).map(c=>`<span class="badge">${c.replace(/[-_]/g,' ').replace(/\w/g,m=>m.toUpperCase())}</span>`).join(''); const a=document.createElement('a'); a.href=`project.html?project=${encodeURIComponent(p.slug)}`; a.className='card'; a.setAttribute('aria-label',`${p.title} – Open project`); a.innerHTML=`<div class="card-media"><img src="${p.cover}" alt="Cover image for ${p.title}"></div><div class="card-body"><h3 class="card-title">${p.title}</h3><div class="card-meta">${badges}<span>${p.year??''}</span></div></div>`; grid.appendChild(a); }); if(filtered.length===0){ const p=document.createElement('p'); p.style.color='var(--muted)'; p.textContent='No projects match your filters.'; grid.appendChild(p);} }
  function bindFilterEvents(){ const btnAll=document.querySelector('.filter[data-filter="all"]'); const catBtns=Array.from(document.querySelectorAll('.filter')).filter(b=>b.dataset.filter!=='all'); btnAll?.addEventListener('click',()=>{ selected.clear(); document.querySelectorAll('.filter').forEach(b=>{ b.setAttribute('aria-pressed', b.dataset.filter==='all'?'true':'false'); b.classList.remove('active');}); renderCards(); }); catBtns.forEach(btn=>btn.addEventListener('click',()=>{ const key=btn.dataset.filter; if(selected.has(key)){ selected.delete(key); btn.setAttribute('aria-pressed','false'); btn.classList.remove('active'); } else { selected.add(key); btn.setAttribute('aria-pressed','true'); btn.classList.add('active'); } const any=selected.size>0; if(btnAll) btnAll.setAttribute('aria-pressed', any?'false':'true'); renderCards(); })); }
  bindFilterEvents(); searchInput?.addEventListener('input',e=>{ query=e.target.value; renderCards(); }); renderCards();

  // Anti-download deterrents
  document.addEventListener('contextmenu', e=>e.preventDefault());
  document.addEventListener('dragstart', e=>{ if(e.target && e.target.tagName==='IMG') e.preventDefault(); });
})();
