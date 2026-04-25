/* ykvnkm — portfolio 2026 / vanilla JS */
(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- scrolled nav state --------------------------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 20);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* --- burger + popup menu -------------------------- */
  const burger = $('#burger');
  const menu   = $('#menu');
  const toggle = (state) => {
    const open = state ?? !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  };
  burger.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
  $$('#menu a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== burger) toggle(false);
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  /* --- custom cursor -------------------------------- */
  const cursor = $('.cursor');
  let cx = innerWidth/2, cy = innerHeight/2, tx = cx, ty = cy;
  if (!reduced && matchMedia('(hover:hover)').matches) {
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    const render = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(render);
    };
    render();
    const hovers = 'a, button, [data-magnetic], [data-project], .foot__link';
    $$(hovers).forEach(el => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
    });
  } else {
    cursor.style.display = 'none';
  }

  /* magnetic buttons removed per user request */

  /* --- reveal on scroll ----------------------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  $$('[data-reveal], [data-project], [data-row]').forEach(el => io.observe(el));

  $$('.hero__title .word, .foot__title .word').forEach((w, i) => {
    w.style.transitionDelay = `${i * 90 + 150}ms`;
  });

  const heroTitle = $('.hero__title');
  if (heroTitle) {
    const words = $$('.word', heroTitle);
    let done = 0;
    words.forEach(w => {
      w.addEventListener('animationend', () => {
        done += 1;
        if (done === words.length) heroTitle.classList.add('is-revealed');
      }, { once: true });
    });
  }

  const footTitle = $('.foot__title');
  if (footTitle) {
    const footIo = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          $$('.word', en.target).forEach(w => w.classList.add('is-in'));
          footIo.unobserve(en.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    footIo.observe(footTitle);
  }

  /* --- decks carousel: two smooth opposite lanes ------ */
  const track = $('#decksTrack');
  if (track) {
    const carousel = track.closest('.decks__carousel');
    const slides = [...track.children];
    const secondTrack = track.cloneNode(false);
    secondTrack.removeAttribute('id');
    carousel?.appendChild(secondTrack);

    slides.forEach((slide, i) => {
      (i % 2 === 0 ? track : secondTrack).appendChild(slide);
    });

    const tracks = [
      { el: track, direction: -1, x: 0, speed: 0, targetSpeed: 0 },
      { el: secondTrack, direction: 1, x: 0, speed: 0, targetSpeed: 0 },
    ];
    const baseSpeed = 0.58;
    tracks.forEach(t => {
      [...t.el.children].forEach(c => t.el.appendChild(c.cloneNode(true)));
      t.speed = reduced ? 0 : baseSpeed;
      t.targetSpeed = t.speed;
    });

    const setPaused = (paused) => {
      tracks.forEach(t => { t.targetSpeed = paused ? 0 : baseSpeed; });
    };

    carousel?.addEventListener('pointerenter', () => setPaused(true));
    carousel?.addEventListener('pointerleave', () => setPaused(false));
    carousel?.addEventListener('focusin', () => setPaused(true));
    carousel?.addEventListener('focusout', () => setPaused(false));

    const animateDecks = () => {
      tracks.forEach(t => {
        const loopWidth = t.el.scrollWidth / 2;
        t.speed += (t.targetSpeed - t.speed) * 0.06;
        t.x = loopWidth ? (t.x + t.speed) % loopWidth : 0;
        const offset = t.direction === -1 ? -t.x : t.x - loopWidth;
        t.el.style.transform = `translate3d(${offset}px, 0, 0)`;
      });
      requestAnimationFrame(animateDecks);
    };
    animateDecks();
  }

  /* --- anchor smooth-scroll with nav offset --------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
