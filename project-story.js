(() => {
  const header = document.querySelector('.story-header');
  const links = [...document.querySelectorAll('.chapter-nav a')];
  const sections = links.map(a => document.querySelector(a.hash));
  const progress = document.querySelector('.reading-track span');
  let frame;
  const update = () => {
    frame = null;
    let active = -1;
    sections.forEach((section,i) => { if (section.getBoundingClientRect().top <= header.offsetHeight+60) active=i; });
    links.forEach((link,i) => {
      if (i===active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform='scaleX('+Math.max(0,Math.min(1,max>0?scrollY/max:0))+')';
  };
  const schedule = () => {if (!frame) frame=requestAnimationFrame(update);};
  addEventListener('scroll',schedule,{passive:true});
  const measureHeader=()=>{
    document.documentElement.style.setProperty('--header',header.offsetHeight+'px');
    schedule();
  };
  addEventListener('resize',measureHeader);
  if ('ResizeObserver' in window) new ResizeObserver(measureHeader).observe(header);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  links.forEach(link=>link.addEventListener('click',()=>{
    const target=document.querySelector(link.hash);
    target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});
  }));
  const nav=document.querySelector('.method-navigation');
  nav.setAttribute('role','tablist');
  nav.setAttribute('aria-orientation','vertical');
  const tabs=[...nav.querySelectorAll('button')];
  const panels=tabs.map(t=>document.getElementById(t.dataset.panel));
  const select = index => {
    tabs.forEach((tab,i)=>{
      tab.setAttribute('role','tab');tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;
      panels[i].setAttribute('role','tabpanel');panels[i].tabIndex=0;panels[i].hidden=i!==index;
    });
    schedule();
  };
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>select(i));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowDown')next=(i+1)%tabs.length;
      if(event.key==='ArrowUp')next=(i-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();select(next);tabs[next].focus();}
    });
  });
  select(0);measureHeader();update();
})();
