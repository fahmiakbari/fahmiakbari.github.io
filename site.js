(() => {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = [...navLinks.querySelectorAll('a')];
  const filters = [...document.querySelectorAll('.filter')];
  const projects = [...document.querySelectorAll('.project')];
  const mobile = window.matchMedia('(max-width: 900px)');
  document.getElementById('filterStatus').textContent = `${projects.length} ${projects.length === 1 ? 'project' : 'projects'} shown`;

  document.getElementById('year').textContent = new Date().getFullYear();
  // About is the opening introduction; Background contains both resume sections.
  // Skills and Approach have no dedicated primary navigation item.
  const sectionGroups = [
    ['home', '#home'], ['projects', '#projects'], ['skills', null],
    ['approach', null], ['background', '#background'],
    ['certificates', '#certificates'], ['contact', '#contact'],
  ].map(([id, hash]) => ({ element: document.getElementById(id), hash }));
  let navigationFrame = 0;
  const updateNavigation = () => {
    navigationFrame = 0;
    const readingLine = header.getBoundingClientRect().height + 32;
    let activeHash = null;
    sectionGroups.forEach(({ element, hash }) => {
      if (element.getBoundingClientRect().top <= readingLine) activeHash = hash;
    });
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) activeHash = '#contact';
    navAnchors.forEach(link => {
      const active = link.hash === activeHash;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    header.classList.toggle('scrolled', window.scrollY > 18);
  };
  const scheduleNavigation = () => {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
  };
  const measureHeader = () => {
    const height = `${header.getBoundingClientRect().height}px`;
    if (document.documentElement.style.getPropertyValue('--header-height') !== height) {
      document.documentElement.style.setProperty('--header-height', height);
    }
    scheduleNavigation();
  };
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', measureHeader);
  window.addEventListener('hashchange', scheduleNavigation);
  if ('ResizeObserver' in window) {
    new ResizeObserver(measureHeader).observe(header);
    new ResizeObserver(scheduleNavigation).observe(document.body);
  }
  measureHeader();

  const setMenu = open => {
    navLinks.classList.toggle('open', open);
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navAnchors.forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const target = document.querySelector(link.hash);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setMenu(false);
  });
  header.addEventListener('focusout', event => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
  });
  mobile.addEventListener('change', () => setMenu(false));

  document.querySelectorAll('.project-details').forEach(details => {
    details.addEventListener('toggle', () => {
      details.querySelector('.details-label').textContent = details.open ? 'Hide details' : 'View details';
      scheduleNavigation();
    });
  });

  filters.forEach(button => button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projects.forEach(project => {
      const show = value === 'all' || project.dataset.category.split(/\s+/).includes(value);
      project.hidden = !show;
      project.classList.toggle('hidden', !show);
      if (show) count++;
    });
    document.getElementById('filterStatus').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown`;
    scheduleNavigation();
  }));
  // One cover expands into the stage; the next covers remain available as buttons.
  const gallery = document.getElementById('gallery');
  const controls = gallery.querySelector('.gallery-controls');
  const strip = controls.querySelector('.upcoming');
  let pool = projects.slice(), selected = 0, flight;
  const redraw = (index, origin, refocus=false) => {
    flight?.remove(); flight=null;
    selected=(index+pool.length)%pool.length;
    const current=pool[selected];
    projects.forEach(p=>{p.hidden=p!==current; if(p!==current) p.querySelector('details').open=false;});
    strip.replaceChildren();
    for(let n=1;n<pool.length;n++){
      const item=pool[(selected+n)%pool.length], b=document.createElement('button');
      b.type='button'; b.className='cover-button';
      const img=item.querySelector('.scene-image').cloneNode(); img.className='';
      const name=item.querySelector('h3').textContent;
      b.append(img,document.createTextNode(name));
      b.setAttribute('aria-label','Show '+name);
      b.onclick=()=>redraw(pool.indexOf(item),b.getBoundingClientRect(),true);
      strip.append(b);
    }
    controls.hidden=false;
    for(const id of ['previous','next'])document.getElementById(id).disabled=pool.length<2;
    document.getElementById('slideNumber').textContent=String(selected+1).padStart(2,'0')+' / '+String(pool.length).padStart(2,'0');
    if(refocus)strip.querySelector('button')?.focus({preventScroll:true});
    if(origin && !matchMedia('(prefers-reduced-motion: reduce)').matches){
      const end=current.getBoundingClientRect(),clone=current.querySelector('.scene-image').cloneNode();
      clone.className='scene-flight';gallery.prepend(clone);flight=clone;
      clone.style.height=end.height+'px';
      const anim=clone.animate([{transform:`translate(${origin.left-end.left}px,${origin.top-end.top}px) scale(${origin.width/end.width},${origin.height/end.height})`,opacity:1},{transform:'none',opacity:0}],{duration:460,easing:'cubic-bezier(.22,.72,.22,1)'});
      anim.onfinish=()=>clone.remove();
    }
  };
  const advance=dir=>{if(pool.length>1) redraw(selected+dir,(dir>0?strip.firstElementChild:strip.lastElementChild)?.getBoundingClientRect());};
  document.getElementById('next').onclick=()=>advance(1);
  document.getElementById('previous').onclick=()=>advance(-1);
  gallery.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const lost=strip.contains(document.activeElement);advance(e.key==='ArrowRight'?1:-1);if(lost)strip.firstElementChild?.focus({preventScroll:true});}});
  let touch;
  gallery.addEventListener('touchstart',e=>{touch=e.touches[0]}, {passive:true});
  gallery.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.clientX,dy=e.changedTouches[0].clientY-touch.clientY;if(Math.abs(dx)>65 && Math.abs(dx)>2*Math.abs(dy))advance(dx<0?1:-1);touch=null},{passive:true});
  filters.forEach(b=>b.addEventListener('click',()=>{pool=projects.filter(p=>b.dataset.filter==='all'||p.dataset.category.split(/\s+/).includes(b.dataset.filter));redraw(0);}));
  redraw(0);
  const certificates = [...document.querySelectorAll('.certificate-item')];
  const certificateControls = document.getElementById('certificateControls');
  const certificateMore = document.getElementById('certificateMore');
  const certificateStatus = document.getElementById('certificateStatus');
  const pageSize = 6;
  let visibleCertificates = Math.min(pageSize, certificates.length);

  const updateCertificates = () => {
    certificates.forEach((item, index) => { item.hidden = index >= visibleCertificates; });
    certificateStatus.textContent = `Showing ${visibleCertificates} of ${certificates.length} entries`;
    certificateMore.textContent = visibleCertificates < certificates.length
      ? 'Show more certificates' : 'Show fewer certificates';
    certificateMore.setAttribute('aria-expanded', String(visibleCertificates > pageSize));
  };
  if (certificates.length > pageSize) {
    certificateControls.hidden = false;
    updateCertificates();
    certificateMore.addEventListener('click', () => {
      visibleCertificates = visibleCertificates < certificates.length
        ? Math.min(visibleCertificates + pageSize, certificates.length)
        : pageSize;
      updateCertificates();
    });
  }
})();

