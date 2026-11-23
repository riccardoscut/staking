#!/usr/bin/env node
// Refreshes the static copy of the texts in index.html from contents.js.
//
// The page renders contents.js with JavaScript, but search engines and visitors
// without JavaScript read the static HTML. Run this after every change to
// contents.js so both say the same thing:
//
//   node tools/build-index.js        (from the staking folder)
//
// It only rewrites what sits between the <!-- build:NAME --> and
// <!-- /build:NAME --> markers in index.html (intro, steps, updates, team, faq)
// and bumps the ?v= cache stamp of contents.js and script.js. Nothing else in
// index.html is touched. No dependencies: plain Node.js.

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");

// Load snarkdown and contents.js the same way the browser does
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, "snarkdown-2.0.0.min.js"), "utf8"), sandbox);
vm.runInContext(fs.readFileSync(path.join(root, "contents.js"), "utf8"), sandbox);
const snarkdown = sandbox.window.snarkdown || sandbox.snarkdown;
const C = sandbox.window.pageContent;
if (!snarkdown || !C) {
  console.error("Could not load snarkdown or contents.js");
  process.exit(1);
}

// Markdown to HTML; "[SIGN]" without a URL stays text, real links open in a new tab
const md = s => snarkdown(s)
  .replace(/<a href="(undefined)?">([^<]*)<\/a>/g, "[$2]")
  .replace(/<a href=/g, '<a rel="nofollow noopener noreferrer" target="_blank" href=');
const inline = s => md(s).replace(/^<p>|<\/p>$/g, "");
const amp = s => s.replace(/&(?!amp;)/g, "&amp;");
const boardDate = d => d.split("-").reverse().join(".");

// Same pictograms as script.js
const ICON_ATTRS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const STEP_ICONS = {
  1: '<path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"/>',
  2: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M15.5 14.5h2.5"/>',
  3: '<path d="M4 20h16M14.5 4.5l4 4L9 18H5v-4z"/>',
  4: '<ellipse cx="12" cy="6" rx="7" ry="2.75"/><path d="M5 6v5.5c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75V6M5 11.5V17c0 1.5 3.1 2.75 7 2.75s7-1.25 7-2.75v-5.5"/>'
};
const PLUS_ICON = `<svg ${ICON_ATTRS}><path d="M12 5v14M5 12h14"/></svg>`;

const blocks = {
  intro: () => C["intro-text"].map(t => `<p>${t}</p>`).join("\n"),

  steps: () => C.howto.map(s => `<article class="platform">
    <div class="platform__plate"><span class="platform__no flaps" data-flap data-spoken="Step ${s.number}">${s.number}</span>${STEP_ICONS[s.number] ? `<svg class="platform__icon" ${ICON_ATTRS}>${STEP_ICONS[s.number]}</svg>` : ""}</div>
    <div class="platform__main"><h3>${s.title}</h3><div class="platform__body">${md(s.contents)}</div></div>
</article>`).join("\n"),

  // only the latest 6 are static; script.js renders the full history
  updates: () => [...C.updates].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map(u => `<li class="departure">
    <time datetime="${u.date}">${boardDate(u.date)}</time>
    <span class="departure__type departure__type--${u.type.toLowerCase()}">${u.type}</span>
    <div><p class="departure__title">${u.title}</p><p class="departure__text">${inline(u.text)}</p></div>
</li>`).join("\n"),

  team: () => C.team.map(m => `<article class="member">
    <img src="${m.image}" alt="${m.name}, ${amp(m.details[0])}" width="104" height="104" loading="lazy">
    <div>
        <h3>${m.name}</h3>
        ${m.details.map(d => `<p>${amp(d)}</p>`).join("\n        ")}
        <p class="member__place">${m.location}</p>
    </div>
</article>`).join("\n"),

  faq: () => C.faq.map(f => `<details class="faq-item"${f.id ? ` id="${f.id}"` : ""}>
    <summary class="faq-question"><span>${f.question}</span>${PLUS_ICON}</summary>
    <div class="faq-answer">${md(f.answer)}</div>
</details>`).join("\n")
};

let html = fs.readFileSync(indexPath, "utf8");
for (const [name, render] of Object.entries(blocks)) {
  const re = new RegExp(`([ \\t]*)(<!-- build:${name}\\b[^>]*-->)[\\s\\S]*?(<!-- /build:${name} -->)`);
  const match = html.match(re);
  if (!match) {
    console.error(`Marker <!-- build:${name} --> not found in index.html`);
    process.exit(1);
  }
  const pad = match[1];
  const body = render().split("\n").map(line => pad + line).join("\n");
  html = html.replace(re, () => `${pad}${match[2]}\n${body}\n${pad}${match[3]}`);
}

// new cache stamp so browsers fetch the fresh contents.js / script.js
const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
html = html.replace(/(contents\.js|script\.js)\?v=[0-9a-z]+/g, `$1?v=${stamp}`);

fs.writeFileSync(indexPath, html);
console.log(`index.html refreshed from contents.js (cache stamp ${stamp})`);
