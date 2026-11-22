// Signature Staking: renders contents.js into the page and runs the departure board.
// The static HTML already contains every text (for search engines and no-JS visitors);
// this script refreshes it from contents.js, which is the place to edit content.
document.addEventListener("DOMContentLoaded", function () {
  const C = window.pageContent || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function markdownToHtml (markdown) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = window.snarkdown(markdown);
    wrapper.querySelectorAll("a").forEach(a => {
      // "[SIGN]" without a URL is the ticker, not a link
      const href = a.getAttribute("href");
      if (!href || href === "undefined") { a.replaceWith(`[${a.textContent}]`); return; }
      a.setAttribute("rel", "nofollow noopener noreferrer");
      a.setAttribute("target", "_blank");
    });
    return wrapper.innerHTML;
  }
  const inline = md => markdownToHtml(md).replace(/^<p>|<\/p>$/g, "");
  const boardDate = d => d.split("-").reverse().join(".");

  // Intro
  const intro = document.querySelector(".intro-text");
  if (intro && Array.isArray(C["intro-text"])) {
    intro.innerHTML = C["intro-text"].map(t => `<p>${t}</p>`).join("");
  }

  // How to delegate: 4 steps, set as platform rows with a stroked pictogram
  const ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const STEP_ICONS = {
    1: '<path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"/>',
    2: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M15.5 14.5h2.5"/>',
    3: '<path d="M4 20h16M14.5 4.5l4 4L9 18H5v-4z"/>',
    4: '<ellipse cx="12" cy="6" rx="7" ry="2.75"/><path d="M5 6v5.5c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75V6M5 11.5V17c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75v-5.5"/>'
  };
  const PLUS_ICON = `<svg ${ICON_ATTRS}><path d="M12 5v14M5 12h14"/></svg>`;
  const stepMarkup = s => `<article class="platform">
      <div class="platform__plate"><span class="platform__no flaps" data-flap data-spoken="Step ${s.number}">${s.number}</span>${STEP_ICONS[s.number] ? `<svg class="platform__icon" ${ICON_ATTRS}>${STEP_ICONS[s.number]}</svg>` : ""}</div>
      <div class="platform__main"><h3>${s.title}</h3><div class="platform__body">BODY</div></div>
  </article>`;
  const howto = document.getElementById("howto-list");
  if (howto && Array.isArray(C.howto)) {
    howto.innerHTML = C.howto.map(s => stepMarkup(s).replace("BODY", () => markdownToHtml(s.contents))).join("");
  }

  // Team
  const team = document.getElementById("team-list");
  if (team && Array.isArray(C.team)) {
    team.innerHTML = C.team.map(m => `
      <article class="member">
        <img src="${m.image}" alt="${m.name}, ${m.details[0]}" width="104" height="104" loading="lazy">
        <div>
          <h3>${m.name}</h3>
          ${m.details.map(d => `<p>${d}</p>`).join("")}
          <p class="member__place">${m.location}</p>
        </div>
      </article>`).join("");
  }

  // Updates: newest first, latest few visible, the rest behind a toggle
  const list = document.getElementById("updates-list");
  if (list && Array.isArray(C.updates) && C.updates.length) {
    const VISIBLE = 6;
    const updates = [...C.updates].sort((a, b) => b.date.localeCompare(a.date));
    list.innerHTML = updates.map((u, i) => `
      <li class="departure"${i >= VISIBLE ? " hidden" : ""}>
        <time datetime="${u.date}">${boardDate(u.date)}</time>
        <span class="departure__type departure__type--${u.type.toLowerCase()}">${u.type}</span>
        <div><p class="departure__title">${u.title}</p><p class="departure__text">${inline(u.text)}</p></div>
      </li>`).join("");

    const toggle = document.getElementById("updates-toggle");
    if (toggle && updates.length > VISIBLE) {
      const showAll = `Show full history (${updates.length})`;
      toggle.textContent = showAll;
      toggle.hidden = false;
      toggle.addEventListener("click", function () {
        const expanded = this.getAttribute("aria-expanded") === "true";
        list.querySelectorAll(".departure").forEach((li, i) => { if (i >= VISIBLE) li.hidden = expanded; });
        this.setAttribute("aria-expanded", String(!expanded));
        this.textContent = expanded ? showAll : "Show latest only";
      });
    }

    const latestEl = document.getElementById("pool-latest-update");
    if (latestEl) {
      latestEl.setAttribute("datetime", updates[0].date);
      latestEl.textContent = boardDate(updates[0].date);
    }
  }

  // FAQ + schema.org FAQPage
  const faq = document.getElementById("faq-list");
  if (faq && Array.isArray(C.faq)) {
    faq.innerHTML = C.faq.map(f => `
      <details class="faq-item">
        <summary class="faq-question"><span>${f.question}</span>${PLUS_ICON}</summary>
        <div class="faq-answer">${markdownToHtml(f.answer)}</div>
      </details>`).join("");

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": C.faq.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": window.snarkdown(f.answer) }
      }))
    });
    document.head.appendChild(schema);
  }

  // Current Cardano epoch: epoch 208 started 2020-07-29 21:44:51 UTC, epochs last 5 days
  const epochEl = document.getElementById("current-epoch");
  if (epochEl) {
    const start = Date.UTC(2020, 6, 29, 21, 44, 51);
    epochEl.textContent = 208 + Math.floor((Date.now() - start) / 432e6);
  }

  // Colour theme: clicking the logo takes you home (top of the page) and, unless the
  // padlock is closed, spins the mark like a vortex and switches dark / light.
  const root = document.documentElement;
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const paintThemeColor = () => { if (themeColor) themeColor.content = root.dataset.theme === "light" ? "#EDEDEA" : "#1C1D1F"; };
  paintThemeColor();
  const lock = document.querySelector(".theme-lock");
  const brand = document.querySelector(".topbar .brand");
  const brandMark = brand && brand.querySelector(".brand__mark");
  const isLocked = () => store.get("sign-theme-lock") === "1";
  const paintLock = () => {
    if (!lock) return;
    const locked = isLocked();
    lock.setAttribute("aria-pressed", String(locked));
    lock.title = locked ? "Theme locked: click to let the logo switch light / dark again" : "Lock the theme: the logo will only take you home";
    if (brand) {
      brand.title = locked ? "Home" : "Home · also switches light / dark";
      brand.setAttribute("aria-label", locked ? "Signature Staking, home" : "Signature Staking, home (also switches light and dark theme)");
    }
  };
  if (lock) {
    lock.hidden = false;
    paintLock();
    lock.addEventListener("click", () => { store.set("sign-theme-lock", isLocked() ? "0" : "1"); paintLock(); });
  }
  function switchTheme () {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.classList.add("theme-switching");
    root.dataset.theme = next;
    store.set("sign-theme", next);
    paintThemeColor();
    setTimeout(() => root.classList.remove("theme-switching"), 500);
  }
  if (brand) {
    brand.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // new tab etc.
      if (location.pathname !== "/" && location.pathname !== "/index.html") return; // real navigation
      e.preventDefault();
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      refreshBoard();
      if (isLocked()) return;
      if (reduceMotion || !brandMark) { switchTheme(); return; }
      brandMark.classList.remove("is-spinning"); void brandMark.offsetWidth;
      brandMark.classList.add("is-spinning");
      setTimeout(switchTheme, 320); // swap colours at the eye of the vortex
      brandMark.addEventListener("animationend", () => brandMark.classList.remove("is-spinning"), { once: true });
    });
  }

  // Footer logo: back to the top of the page
  const footerLogo = document.querySelector(".footer__logo");
  if (footerLogo) {
    footerLogo.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (location.pathname !== "/" && location.pathname !== "/index.html") return;
      e.preventDefault();
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // Top bar stays pinned and shrinks a little once the page scrolls
  // (two thresholds so it does not flicker while its own height changes)
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (y > 48) topbar.classList.add("is-compact");
      else if (y < 8) topbar.classList.remove("is-compact");
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // Copy pool ID buttons (stay hidden without JS or clipboard access)
  document.querySelectorAll("[data-copy-target]").forEach(button => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target || !navigator.clipboard) return;
    const label = button.textContent;
    let timer;
    button.hidden = false;
    button.addEventListener("click", () => {
      navigator.clipboard.writeText(target.textContent.trim()).then(() => {
        button.textContent = "Copied";
        button.dataset.state = "done";
      }, () => {
        button.textContent = "Copy failed: select the ID";
      }).finally(() => {
        clearTimeout(timer);
        timer = setTimeout(() => { button.textContent = label; delete button.dataset.state; }, 2000);
      });
    });
  });

  // Split-flap board: each value is split into tiles that flip once into place.
  // The text is always present first; reduced motion keeps the tiles static.
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  function splitFlaps (el) {
    if (el.classList.contains("is-split")) return [];
    const host = el.querySelector("time") || el;
    const text = host.textContent.trim();
    const spoken = el.dataset.spoken || text;
    host.textContent = "";
    const sr = document.createElement("span");
    sr.className = "sr-only";
    sr.textContent = spoken;
    host.appendChild(sr);
    // tiles are grouped per word, so a value only wraps between words, never inside one
    const tiles = [];
    text.split(/\s+/).forEach(word => {
      const group = document.createElement("span");
      group.className = "flap-word";
      group.setAttribute("aria-hidden", "true");
      [...word].forEach(ch => {
        const t = document.createElement("span");
        t.className = "flap";
        t.textContent = ch;
        t.dataset.final = ch;
        group.appendChild(t);
        tiles.push(t);
      });
      host.appendChild(group);
    });
    el.classList.add("is-split");
    return tiles;
  }
  // A board refresh: every word stops at its own random moment, every tile turns a
  // random number of times, like a real departure board updating (about 1.5-2 s).
  let boardGeneration = 0;
  function flip (tile, delay, steps, gen, minMs = 58, spreadMs = 18) {
    const final = tile.dataset.final;
    let n = 0;
    tile.dataset.busy = "1";
    setTimeout(function tick () {
      if (tile.dataset.gen !== String(gen)) return; // a newer spin took over
      if (n < steps) {
        tile.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        tile.classList.remove("is-turning"); void tile.offsetWidth; tile.classList.add("is-turning");
        n++;
        setTimeout(tick, minMs + Math.random() * spreadMs);
      } else {
        tile.textContent = final;
        tile.classList.remove("is-turning");
        delete tile.dataset.busy;
      }
    }, delay);
  }
  // Board cells (ticker, status, dates, margin, cost): on every refresh each tile
  // settles at its own random moment, in no particular order.
  const boardCells = [];
  document.querySelectorAll("#board [data-flap]").forEach(el => {
    splitFlaps(el);
    boardCells.push([...el.querySelectorAll(".flap")]);
  });
  document.querySelectorAll(".platform__no[data-flap]").forEach(splitFlaps);
  function refreshBoard () {
    if (reduceMotion || !boardCells.length) return;
    const gen = ++boardGeneration;
    // every tile on the board runs on its own: they all start together and each one
    // stops after its own random number of turns, so the last tile can be any letter
    boardCells.flat().forEach(tile => {
      tile.dataset.gen = String(gen);
      flip(tile, Math.random() * 150, 5 + Math.floor(Math.random() * 24), gen);
    });
  }
  // Single tiles: hovering only lights a faint halo that fades out slowly (sweeping the
  // pointer leaves a stadium "wave", in CSS); clicking spins just that tile at a random
  // speed (fast, medium or slow) before it settles back on its own letter.
  const SPEEDS = [
    { turns: [6, 9], min: 40, spread: 12 },    // fast
    { turns: [9, 13], min: 70, spread: 20 },   // medium
    { turns: [12, 17], min: 110, spread: 40 }  // slow
  ];
  let tileGeneration = 0;
  const spinTile = (tile, turns, min, spread) => {
    const gen = "t" + (++tileGeneration);
    tile.dataset.gen = gen;
    flip(tile, 0, turns, gen, min, spread);
  };
  boardCells.flat().forEach(tile => {
    tile.classList.add("flap--toy");
    if (reduceMotion) return;
    tile.addEventListener("click", e => {
      e.preventDefault(); // the latest-update tiles sit inside a link
      e.stopPropagation();
      const speed = SPEEDS[Math.floor(Math.random() * SPEEDS.length)];
      const turns = speed.turns[0] + Math.floor(Math.random() * (speed.turns[1] - speed.turns[0] + 1));
      spinTile(tile, turns, speed.min, speed.spread);
    });
  });

  // ?still shows the board already settled (screenshots, previews)
  const still = new URLSearchParams(location.search).has("still");
  if (!still) refreshBoard();
});
