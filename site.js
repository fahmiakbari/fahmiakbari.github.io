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

