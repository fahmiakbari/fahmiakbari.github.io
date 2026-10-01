(() => {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = [...navLinks.querySelectorAll('a')];
  const filters = [...document.querySelectorAll('.filter')];
  const projects = [...document.querySelectorAll('.project')];
  const mobile = window.matchMedia('(max-width: 1150px)');

  document.getElementById('year').textContent = new Date().getFullYear();
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const setMenu = open => {
    navLinks.classList.toggle('open', open);
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navAnchors.forEach(link => link.addEventListener('click', () => setMenu(false)));
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

  // Content stays visible even when observers or JavaScript are unavailable.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }

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
  }));
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
