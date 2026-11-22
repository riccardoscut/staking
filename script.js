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
  function flip (tile, delay) {
    const final = tile.dataset.final;
    const steps = 3 + Math.floor(Math.random() * 4);
    let n = 0;
    setTimeout(function tick () {
      if (n < steps) {
        tile.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        tile.classList.remove("is-turning"); void tile.offsetWidth; tile.classList.add("is-turning");
        n++;
        setTimeout(tick, 55);
      } else {
        tile.textContent = final;
        tile.classList.remove("is-turning");
      }
    }, delay);
  }
  const boardTiles = [];
  document.querySelectorAll("#board [data-flap]").forEach(el => boardTiles.push(...splitFlaps(el)));
  document.querySelectorAll(".platform__no[data-flap]").forEach(splitFlaps);
  // ?still shows the board already settled (screenshots, previews)
  const still = new URLSearchParams(location.search).has("still");
  if (!reduceMotion && !still) boardTiles.forEach((t, i) => flip(t, 120 + i * 28));
});
