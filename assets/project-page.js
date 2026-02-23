
(function(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('project');
  const root = document.getElementById('projectRoot');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const project = (window.projectsData || []).find(p => p.slug === slug);

  if(!project){
    root.innerHTML = `
      <section>
        <h1>Project Not Found</h1>
        <p>We couldn’t find that project. <a href="index.html">Go back</a>.</p>
      </section>
    `;
    document.title = "Project Not Found — Tarun Aggarwal";
    return;
  }

  document.title = `${project.title} — Tarun Aggarwal`;

  root.innerHTML = `
    <section class="project-head">
      <div>
        <h1 class="project-title">${project.title}</h1>
        <p class="project-sub">${project.summary ?? ''}</p>
        <div class="project-tags">
          ${(project.tags||[]).map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
      </div>
      <div>
        <div class="project-meta">
          <span><strong>Category:</strong> ${labelFromCategory(project.category)}</span>
          <span><strong>Year:</strong> ${project.year ?? ''}</span>
        </div>
      </div>
    </section>

    ${renderVideo(project)}

    <section class="gallery" aria-label="Project gallery">
      ${renderImages(project.images || [])}
    </section>

    <nav class="controls" aria-label="Project navigation">
      ${renderPrevNext(slug)}
    </nav>
  `;

  function labelFromCategory(cat){
    switch(cat){
      case 'product-design': return 'Product Design';
      case 'ui-ux': return 'UI/UX';
      case 'packaging': return 'Packaging';
      case 'automotive-3d': return 'Automotive/3D';
      default: return cat;
    }
  }

  function renderImages(images){
    if(!images.length) return `<p style="color:var(--muted)">No images available.</p>`;
    return images.map(img => `
      <figure>
        <img src="${img.src}" alt="${img.alt || ''}">
        ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ''}
      </figure>
    `).join('');
  }

  function renderVideo(p){
    // You can embed either YouTube (youtubeId) or local file (videoSrc)
    if(p.youtubeId){
      // Responsive iframe in a .video-wrap container
      return `
        <div class="video-wrap" aria-label="Project video">
          <iframe src="https://www.youtube-nocookie.com/embed/${p.youtubeId}" title="Project video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
    }
    if(p.videoSrc){
      return `
        <div class="video-wrap" aria-label="Project video">
          <video controls preload="metadata" poster="${p.cover}">
            <source src="${p.videoSrc}" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      `;
    }
    return '';
  }

  function renderPrevNext(currentSlug){
    const list = window.projectsData;
    const idx = list.findIndex(p => p.slug === currentSlug);
    const prev = list[idx - 1];
    const next = list[idx + 1];
    return `
      <div class="filters">
        ${prev ? `<a class="btn" href="project.html?project=${encodeURIComponent(prev.slug)}">← ${prev.title}</a>` : ''}
        <a class="btn" href="index.html">All Projects</a>
        ${next ? `<a class="btn" href="project.html?project=${encodeURIComponent(next.slug)}">${next.title} →</a>` : ''}
      </div>
    `;
  }
})();
