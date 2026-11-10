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
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('main-nav');

if (btn && nav) {
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  btn.addEventListener('click', () => {
    setOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setOpen(false);
  });
} else {
  console.error('Mobile menu: button or navigation element not found.');
}


// Projects Section //

/* ===== Projects showcase ===== */
(function () {
  const CONFIG = {
    heading: "Projects",
    projects: [
      {
        id: "layoffs-cleaning",
        title: "Layoffs Data Cleaning in MySQL",
        category: "Data Cleaning Project",
        date: "2026",
        description: "Cleaned a raw layoffs CSV in MySQL using a staging table, window functions, string and date functions, and a self-join, producing an analysis-ready table.",
        images: [
          { src: "projects/layoffs_sql/initial data.png", alt: "Preview of the raw layoffs CSV", caption: "Raw CSV preview" },
          { src: "projects/layoffs_sql/row_num.png", alt: "Duplicate check using ROW_NUMBER", caption: "Duplicate detection" },
          { src: "projects/layoffs_sql/final data.png", alt: "Cleaned layoffs table", caption: "Cleaned output" }
        ],
        metrics: [
          { value: "2,361", label: "Raw rows" },
          { value: "5", label: "Duplicates removed" },
          { value: "4", label: "Cleaning stages" }
        ],
        tech: ["MySQL", "Window functions", "Self-join", "STR_TO_DATE"],
        link: { href: "https://github.com/irfanmohammed004/", label: "View project on GitHub" },
        overview: {
          summary: "A step-by-step cleaning workflow on a public layoffs dataset, documented query by query with the reasoning behind each decision.",
          sections: [
            { title: "The problem", text: "The raw CSV held 2,361 rows across 9 columns. It had 5 exact duplicate rows, company names with stray spaces, the same industry and country under different labels, dates stored as text, missing industry values, and rows with no layoff figures at all." },
            { title: "My approach", text: "I worked on a staging copy as a failsafe. ROW_NUMBER() OVER (PARTITION BY ...) across every column flagged duplicates. TRIM(), LIKE 'Crypto%' and TRIM(TRAILING '.') standardized the text, and STR_TO_DATE() with ALTER TABLE converted the date column. A self-join on company filled missing industries from other rows of the same company." },
            { title: "A judgement call", text: "Rows missing both total_laid_off and percentage_laid_off were deleted, because neither figure could be recovered from the table. Rows with only one of the two were kept." },
            { title: "The result", text: "A deduplicated table with consistent labels, a true DATE column and no rows without layoff figures, with the original table left untouched." }
          ]
        }
      },
      /* Placeholder: replace this entry with your next project. */
      {
        id: "next-project",
        title: "Your Next Project",
        category: "Project Category",
        date: "Year",
        description: "One or two sentences on what you built and the problem it solved.",
        images: [
          { src: "photos/next-1.png", alt: "Describe the first image", caption: "First image caption" },
          { src: "photos/next-2.png", alt: "Describe the second image", caption: "Second image caption" }
        ],
        metrics: [
          { value: "00", label: "Metric one" },
          { value: "00", label: "Metric two" },
          { value: "00", label: "Metric three" }
        ],
        tech: ["Tool one", "Tool two", "Tool three"],
        link: { href: "https://github.com/irfanmohammed004/", label: "View project" },
        overview: {
          summary: "A short framing sentence for the detailed overview.",
          sections: [
            { title: "The problem", text: "What was wrong or missing." },
            { title: "My approach", text: "What you did and why." },
            { title: "The result", text: "What changed because of it." }
          ]
        }
      }
    ]
  };

  /* ---------- helpers ---------- */
  const stage = document.getElementById("ps-stage");
  if (!stage) return;
  const projects = CONFIG.projects, n = projects.length;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const svg = (inner, w) => `<svg viewBox="0 0 24 24" width="${w || 18}" height="${w || 18}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const I = {
    up: svg('<polyline points="18 15 12 9 6 15"/>'),
    down: svg('<polyline points="6 9 12 15 18 9"/>'),
    arrow: svg('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'),
    ext: svg('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),
    expand: svg('<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>', 14),
    undo: svg('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>')
  };
  const FALLBACK = "linear-gradient(135deg,#1f4a7a,#0D9488)";   /* shows if an image file is missing */
  const bg = (src) => `background-image:url('${esc(src)}'),${FALLBACK}`;

  const heading = document.querySelector("#projects > h2");
  if (heading) heading.textContent = CONFIG.heading;

  /* ---------- markup for one project ---------- */
  function slideHTML(p) {
    const imgs = p.images.map((im, k) =>
      `<div class="ps-img" role="img" aria-label="${esc(im.alt)}"${k ? ' aria-hidden="true"' : ""} style="${bg(im.src)}"></div>`).join("");
    const arrows = p.images.length > 1
      ? `<div class="ps-updown">
           <button type="button" class="ps-round ps-round--dark" data-img="-1" aria-label="Previous image">${I.up}</button>
           <button type="button" class="ps-round ps-round--dark" data-img="1" aria-label="Next image">${I.down}</button>
         </div>` : "";
    const metrics = p.metrics.map((m) => `<div><dt>${esc(m.label)}</dt><dd>${esc(m.value)}</dd></div>`).join("");
    const tags = p.tech.map((t) => `<li>${esc(t)}</li>`).join("");
    const secs = p.overview.sections.map((s, k) =>
      `<div class="ps-sec ps-reveal" style="--i:${k + 3}"><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join("");

    return `
    <article class="ps-card">
      <div class="ps-pic">
        <div class="ps-view" role="group" aria-roledescription="carousel" aria-label="${esc(p.title)} images" tabindex="0">
          <div class="ps-track">${imgs}</div>
          ${arrows}
          <span class="ps-count"></span>
        </div>
        <div class="ps-cap">
          <span class="ps-cap-text" aria-live="polite"></span>
          <button type="button" class="ps-chip" data-inspect>${I.expand} Quick Inspect</button>
        </div>
        <dialog class="ps-dialog" aria-label="${esc(p.title)} image preview">
          <div class="ps-dialog-img" role="img"></div>
          <div class="ps-cap"><span class="ps-dialog-cap"></span><button type="button" class="ps-chip" data-close>Close</button></div>
        </dialog>
      </div>

      <div class="ps-flip"><div class="ps-flip-inner">
        <div class="ps-face ps-front">
          <div class="ps-top"><span class="ps-cat">${esc(p.category)}</span><span class="ps-date">${esc(p.date)}</span></div>
          <h3 class="ps-title">${esc(p.title)}</h3>
          <p class="ps-desc">${esc(p.description)}</p>
          <dl class="ps-metrics">${metrics}</dl>
          <ul class="ps-tags">${tags}</ul>
          <div class="ps-actions">
            <button type="button" class="ps-pill" data-explore aria-expanded="false">Explore Interactive Case Study ${I.arrow}</button>
            <a class="ps-round" href="${esc(p.link.href)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.link.label)} (opens in a new tab)">${I.ext}</a>
          </div>
        </div>

        <div class="ps-face ps-back" inert aria-hidden="true">
          <div class="ps-back-top">
            <span class="ps-kicker ps-reveal" style="--i:0">Case study</span>
            <button type="button" class="ps-chip" data-back>${I.undo} Back to summary</button>
          </div>
          <h3 class="ps-title ps-reveal" style="--i:1">${esc(p.title)}</h3>
          <p class="ps-lead ps-reveal" style="--i:2">${esc(p.overview.summary)}</p>
          ${secs}
        </div>
      </div></div>
    </article>`;
  }

  /* ---------- behaviour for one project ---------- */
  function wire(card, p) {
    const q = (s) => card.querySelector(s);
    const imgCount = p.images.length;
    const track = q(".ps-track"), imgs = [...track.children];
    const view = q(".ps-view"), count = q(".ps-count"), capText = q(".ps-cap-text");
    const dlg = q(".ps-dialog"), dlgImg = q(".ps-dialog-img"), dlgCap = q(".ps-dialog-cap");
    let i = 0;

    function setImg(v) {                      /* image scroller (wraps around) */
      i = (v + imgCount) % imgCount;
      track.style.transform = `translateY(-${i * 100}%)`;
      imgs.forEach((el, k) => el.setAttribute("aria-hidden", String(k !== i)));
      count.textContent = `${i + 1} / ${imgCount}`;
      capText.textContent = p.images[i].caption;
    }
    setImg(0);

    card.querySelectorAll("[data-img]").forEach((b) =>
      b.addEventListener("click", () => setImg(i + Number(b.dataset.img))));
    view.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setImg(i + 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); setImg(i - 1); }
    });

    q("[data-inspect]").addEventListener("click", () => {   /* Quick Inspect */
      dlgImg.style.cssText = bg(p.images[i].src);
      dlgImg.setAttribute("aria-label", p.images[i].alt);
      dlgCap.textContent = p.images[i].caption;
      dlg.showModal();
    });
    q("[data-close]").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });

    /* 3D flip: only the description part */
    const inner = q(".ps-flip-inner"), front = q(".ps-front"), back = q(".ps-back");
    const explore = q("[data-explore]"), backBtn = q("[data-back]");
    function setFlip(flipped) {
      inner.classList.toggle("is-flipped", flipped);
      front.inert = flipped; back.inert = !flipped;                 /* hide the turned-away face from keyboard */
      front.setAttribute("aria-hidden", String(flipped));
      back.setAttribute("aria-hidden", String(!flipped));
      explore.setAttribute("aria-expanded", String(flipped));
      (flipped ? backBtn : explore).focus({ preventScroll: true });
    }
    explore.addEventListener("click", () => setFlip(true));
    backBtn.addEventListener("click", () => setFlip(false));

    /* hover glow follows the pointer */
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });


/* Mobile swipe navigation */
let touchStartX = 0;
let touchStartY = 0;
let swipeAllowed = false;

card.addEventListener("touchstart", (e) => {
  if (e.touches.length !== 1) return;

  /* Do not trigger swipes from buttons or links */
  swipeAllowed = !e.target.closest("button, a");

  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

card.addEventListener("touchend", (e) => {
  if (!swipeAllowed || !e.changedTouches.length) return;

  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  /* Ignore short gestures and vertical scrolling */
  if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.25) {
    return;
  }

  idx = (idx + (dx < 0 ? 1 : -1) + n) % n;
  show(dx < 0 ? 1 : -1);

  swipeAllowed = false;
}, { passive: true });

  }

  /* ---------- project slider ---------- */
  let idx = 0;
  const counter = document.getElementById("ps-count");
  const live = document.getElementById("ps-live");

  function show(dir) {                        /* rebuilding resets image index and un-flips the card */
    const p = projects[idx];
    stage.innerHTML = `<div class="ps-slide-in"${dir ? ` data-dir="${dir > 0 ? "next" : "prev"}"` : ""}>${slideHTML(p)}</div>`;
    wire(stage.querySelector(".ps-card"), p);
    if (counter) counter.textContent = `${idx + 1} / ${n}`;
    if (live) live.textContent = `Project ${idx + 1} of ${n}: ${p.title}`;
  }

  document.querySelectorAll("[data-ps-go]").forEach((b) =>
    b.addEventListener("click", () => {
      const d = Number(b.dataset.psGo);
      idx = (idx + d + n) % n;
      show(d);
    }));

  show(0);
})();

/* Projects: section height = viewport minus header */
(function(){
  const h=document.querySelector('header');
  const set=()=>document.documentElement.style.setProperty('--ps-header',h.offsetHeight+'px');
  set(); window.addEventListener('resize',set);
})();