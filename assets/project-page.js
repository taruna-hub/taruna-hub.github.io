
(function(){
  const params=new URLSearchParams(location.search); const slug=params.get('project');
  const root=document.getElementById('projectRoot'); const yearEl=document.getElementById('year'); if(yearEl) yearEl.textContent=new Date().getFullYear();
  const project=(window.projectsData||[]).find(p=>p.slug===slug);
  if(!project){ root.innerHTML='<section><h1>Project Not Found</h1><p>We couldn’t find that project. <a href="index.html">Go back</a>.</p></section>'; document.title='Project Not Found — Tarun Aggarwal'; return; }
  document.title = `${project.title} — Tarun Aggarwal`;

  // Set brand name from config
  (function(){ const sc=window.siteConfig||{site:{}}; document.querySelectorAll('.brand-text').forEach(n=> n.textContent=(sc.site&&sc.site.displayName)||''); })();

  root.innerHTML = `
    <section class="project-head">
      <div>
        <h1 class="project-title">${project.title}</h1>
        <p class="project-sub">${project.summary??''}</p>
        <div class="project-tags">${(project.tags||[]).map(t=>`<span class="badge">${t}</span>`).join('')}</div>
      </div>
      <div>
        <div class="project-meta">
          <span><strong>Categories:</strong> ${(Array.isArray(project.categories)?project.categories:(project.category?[project.category]:[])).map(c=>c.replace(/[-_]/g,' ').replace(/\w/g,m=>m.toUpperCase())).join(', ')}</span>
          <span><strong>Year:</strong> ${project.year??''}</span>
        </div>
      </div>
    </section>
    ${renderVideo(project)}
    <section class="gallery" aria-label="Project gallery">${renderImages(project.images||[])}</section>
  `;

  function renderImages(images){ if(!images.length) return `<p style="color:var(--muted)">No images available.</p>`; return images.map(img=>`<figure><img src="${img.src}" alt="${img.alt||''}"></figure>`).join(''); }
  function renderVideo(p){ if(!p.video||!Array.isArray(p.video.sources)||p.video.sources.length===0) return ''; const sources=p.video.sources.map(s=>`<source src="${s.src}" type="${s.type||''}">`).join(''); const poster=p.video.poster?` poster="${p.video.poster}"`:''; return `<div class="video-wrap" aria-label="Project video"><video controls preload="metadata"${poster} autoplay muted loop playsinline>${sources}Your browser does not support HTML5 video.</video></div>`; }
})();
