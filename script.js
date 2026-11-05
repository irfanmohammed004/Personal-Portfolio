/* Scalloped badge icons */
try {
document.querySelectorAll('.badge').forEach(svg=>{
  const n=48,pts=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,r=i%2?44:48;pts.push((50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1))}
  const icons={
    cursor:'<path d="M38 28v38l9-8 6 14 7-3-6-13h12z"/>',
    heart:'<path d="M50 70C32 58 30 48 30 43c0-7 5-11 10-11 4 0 8 3 10 6 2-3 6-6 10-6 5 0 10 4 10 11 0 5-2 15-20 27z"/>',
    people:'<circle cx="50" cy="36" r="6" fill="currentColor"/><circle cx="38" cy="42" r="5" fill="currentColor"/><circle cx="62" cy="42" r="5" fill="currentColor"/><path d="M30 66c0-9 6-14 8-14h24c2 0 8 5 8 14z" fill="currentColor"/>',  
    risk:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    resolve:'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    process:'<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    verify:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    comply:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>',
    analyze:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    experience:'<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'
  };
  svg.innerHTML =
    '<polygon points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width=".9"/>' +
    '<g transform="translate(26 26) scale(2)" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">' +
    icons[svg.dataset.icon] + '</g>';
});

/* Scroll reveal */
(function(){
  const targets = document.querySelectorAll(
    'main section:not(.slider) > *:not(.cards):not(.faq-grid):not(.quote-row), .cards > *, .faq-grid > *, .quote-row > *, .slider'
  );

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);          /* animate once only */
      }
    });
  },{threshold:.15, rootMargin:'0px 0px -40px 0px'});

  targets.forEach(el=>{
    const i = [...el.parentElement.children].indexOf(el);
    el.style.transitionDelay = Math.min(i,5)*120 + 'ms';   /* stagger siblings */
    el.classList.add('reveal');
    io.observe(el);
  });
})
  ();
} catch (err) { console.error("script.js part 1:", err); }

/* Keep scroll offset equal to the real header height */
try {
(function(){
  const header = document.querySelector('header');
  const set = () => document.documentElement.style.scrollPaddingTop = header.offsetHeight + 'px';
  set();
  window.addEventListener('resize', set);
})();
} catch (err) { console.error("script.js part 2:", err); }

 /*==Send me a message script==*/
try {
document.getElementById('contact-form').addEventListener('submit', async function(e){
  e.preventDefault();
  const form = e.target, status = document.getElementById('form-status');
  const btn = form.querySelector('button');
  btn.disabled = true; btn.textContent = 'Sending...'; status.textContent = '';

  try{
    const res = await fetch('https://api.web3forms.com/submit', {
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const data = await res.json();
    if(data.success){
      form.reset();
      status.textContent = 'Thanks! Your message has been sent.';
    }else{
      status.textContent = 'Something went wrong. Please try again or email me directly.';
    }
  }catch(err){
    status.textContent = 'Network error. Please try again later.';
  }
  btn.disabled = false; btn.textContent = 'Send Message';
});
} catch (err) { console.error("script.js part 3:", err); }

/* ===== Mobile Header Menu ===== */
try {
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('main-nav');
  const setOpen = open => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) setOpen(false); });
} catch (err) { console.error("mobile menu:", err); }
