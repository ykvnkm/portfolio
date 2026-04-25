/* ykvnkm — portfolio 2026 / vanilla JS */
(() => {
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- scrolled nav state --------------------------- */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 20);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- burger + popup menu -------------------------- */
  const burger = $('#burger');
  const menu   = $('#menu');
  const toggleMenu = (state) => {
    if (!menu || !burger) return;
    const open = state ?? !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
  };
  if (burger && menu) {
    burger.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    $$('#menu a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== burger) toggleMenu(false);
    });
  }

  /* --- brief popup ("Вкратце") ---------------------- */
  const brief = $('.brief');
  if (brief) {
    const briefBtn = $('.brief__btn', brief);
    const toggleBrief = (state) => {
      const open = state ?? !brief.classList.contains('is-open');
      brief.classList.toggle('is-open', open);
      briefBtn.setAttribute('aria-expanded', open);
    };
    briefBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleBrief(); });
    document.addEventListener('click', (e) => {
      if (!brief.contains(e.target)) toggleBrief(false);
    });
    addEventListener('keydown', e => { if (e.key === 'Escape') toggleBrief(false); });
  }

  addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

  /* --- custom cursor -------------------------------- */
  const cursor = $('.cursor');
  if (cursor) {
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
      const hovers = 'a, button, [data-magnetic], [data-project], .foot__link, .brief__btn, .brief__icon-link';
      $$(hovers).forEach(el => {
        el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
        el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
      });
    } else {
      cursor.style.display = 'none';
    }
  }

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

  /* --- decks carousel: two opposite lanes + drag ---- */
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

    const baseSpeed = 0.58;
    const tracks = [
      { el: track,       direction: -1, x: 0, speed: 0, targetSpeed: 0 },
      { el: secondTrack, direction:  1, x: 0, speed: 0, targetSpeed: 0 },
    ];

    tracks.forEach(t => {
      [...t.el.children].forEach(c => t.el.appendChild(c.cloneNode(true)));
      t.speed = reduced ? 0 : baseSpeed;
      t.targetSpeed = t.speed;
      t.hovering = false;
      t.dragging = false;
      t.activePointer = null;
      t.lastX = 0; t.downX = 0; t.downY = 0; t.lastT = 0;
      t.velocity = 0; t.axisLocked = false; t.axisIsX = false;
    });

    const wrap = (val, mod) => mod ? ((val % mod) + mod) % mod : 0;
    const updateTargets = () => {
      tracks.forEach(t => {
        const paused = t.hovering || t.dragging;
        t.targetSpeed = (reduced || paused) ? 0 : baseSpeed;
      });
    };

    /* --- per-track hover + drag --- */
    tracks.forEach(t => {
      t.el.style.touchAction = 'pan-y';

      t.el.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse') { t.hovering = true; updateTargets(); }
      });
      t.el.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'mouse') { t.hovering = false; updateTargets(); }
      });

      t.el.addEventListener('pointerdown', (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        t.activePointer = e.pointerId;
        t.dragging = true;
        t.axisLocked = false; t.axisIsX = false;
        t.lastX = t.downX = e.clientX;
        t.downY = e.clientY;
        t.lastT = performance.now();
        t.velocity = 0;
        t.el.classList.add('is-dragging');
        try { t.el.setPointerCapture(e.pointerId); } catch (_){}
        updateTargets();
      });

      t.el.addEventListener('pointermove', (e) => {
        if (!t.dragging || e.pointerId !== t.activePointer) return;
        const dx = e.clientX - t.lastX;
        if (!t.axisLocked) {
          const totalX = Math.abs(e.clientX - t.downX);
          const totalY = Math.abs(e.clientY - t.downY);
          if (totalX < 6 && totalY < 6) return;
          t.axisIsX = totalX > totalY;
          t.axisLocked = true;
          if (!t.axisIsX) {
            t.dragging = false;
            t.el.classList.remove('is-dragging');
            try { t.el.releasePointerCapture(e.pointerId); } catch (_){}
            updateTargets();
            return;
          }
        }
        if (!t.axisIsX) return;
        e.preventDefault();
        t.x += dx * t.direction;
        const now = performance.now();
        const dt = Math.max(now - t.lastT, 1);
        t.velocity = dx / dt;
        t.lastX = e.clientX;
        t.lastT = now;
      });

      const release = (e) => {
        if (e.pointerId !== t.activePointer) return;
        t.dragging = false;
        t.activePointer = null;
        t.el.classList.remove('is-dragging');
        try { t.el.releasePointerCapture(e.pointerId); } catch (_){}
        if (t.axisIsX && Math.abs(t.velocity) > 0.05) {
          let v = t.velocity * 16;
          let frame = 0;
          const decay = () => {
            if (++frame > 80 || Math.abs(v) < 0.02 || t.dragging) return;
            t.x += v * t.direction;
            v *= 0.94;
            requestAnimationFrame(decay);
          };
          requestAnimationFrame(decay);
        }
        updateTargets();
      };
      t.el.addEventListener('pointerup',     release);
      t.el.addEventListener('pointercancel', release);

      t.el.addEventListener('click', (e) => {
        if (Math.abs(e.clientX - t.downX) > 6) { e.preventDefault(); e.stopPropagation(); }
      }, true);
    });

    /* keyboard a11y: focus pauses everything */
    carousel?.addEventListener('focusin',  () => { tracks.forEach(t => t.hovering = true);  updateTargets(); });
    carousel?.addEventListener('focusout', () => { tracks.forEach(t => t.hovering = false); updateTargets(); });

    const animateDecks = () => {
      tracks.forEach(t => {
        const loopWidth = t.el.scrollWidth / 2;
        t.speed += (t.targetSpeed - t.speed) * 0.06;
        if (!t.dragging) t.x += t.speed;
        t.x = wrap(t.x, loopWidth);
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
