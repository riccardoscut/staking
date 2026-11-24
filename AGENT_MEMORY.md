# Agent memory: staking.da-sign.com

Working notes for the next agent session. Stable business facts live in the parent `CLAUDE.md` (`~/Desktop/riccardoscut/CLAUDE.md`); product truth in `PRODUCT.md`; the design system in `DESIGN.md`; history in `CHANGELOG.md`. Keep this file under ~150 lines and summarise old entries. Note: this repo is public and served by GitHub Pages, so never write anything private here.

_Last updated: 2026-11-24._

## State
- Published on GitHub (2026-11-24): up to `a27da2a` (board labels as links, open FAQ question yellow, Accent Light Rule, phone board with pairs and smaller tiles, 0% in yellow, footer without Reddit and GitHub to riccardoscut/staking), plus this docs commit once published.
- Live and verified on 2026-11-22: departure-board design, light theme, logo vortex + padlock, random board refresh, tile halo/click spin, sticky compact bar, yellow accents, link review (no Binance/Yoroi/EMURGO), cleanup, `tools/build-index.js`.
- 2026-11-23/24: Impeccable audit (14/20, report in `.impeccable/audit/`, git-ignored). Riccardo's rulings on it are under Conventions; do not re-raise them.

## Workflow (decided by Riccardo)
- Work directly on `main`, small commits. Nothing goes online without Riccardo's "ok" after a local preview.
- Preview: `~/Desktop/riccardoscut/anteprima.command` serves staking on http://localhost:8001. `?still` = board settled (use for screenshots), `?theme=light` = light theme.
- Publish: the agent commits, then rewrites the comment line of `~/Desktop/riccardoscut/pubblica-staking.command`; Riccardo double-clicks it (it fetches, lists the commits not yet on GitHub, asks `s/n`, pushes). The agent's shell has no GitHub credentials.
- After publishing, verify on the live site (GitHub Pages takes ~30 s to 2 min; `cache-control: max-age=600`).
- Files are never deleted: move them to `~/Desktop/riccardoscut/_da_cancellare/` and let Riccardo empty it.
- Commits are signed `Riccardo <43741111+riccardoscut@users.noreply.github.com>` (set per repo on 2026-11-24 in staking, healingtouch, da-sign.com). Never commit with another author email.
- Talk to Riccardo in Italian, plain language; code, comments and commits in English.
- Private material never goes in this repo: it lives outside, in the local `privato/` folder next to the repos. Inside the repo only `_privato/` (git-ignored, with `.claude/` and `.impeccable/`). Check `git status` before every commit.

## Conventions
- Content changes: edit `contents.js`, then `node tools/build-index.js` to refresh the static copy in `index.html` (it only touches the `<!-- build:NAME -->` regions and bumps the `?v=` stamp of contents.js/script.js). When `board.css` changes, bump `board.css?v=N` in `index.html` by hand.
- Team changes also go in the schema.org JSON-LD in `index.html`.
- Never promise returns (no fixed or guaranteed %). Ticker always `[SIGN]`.
- Yellow #FFC20E only where it means something (see `DESIGN.md`, Signal Rule and the list of accents): IN SERVICE, EPOCH, 0% margin, logo apostrophe, interaction feedback. Riccardo finds yellow letters on light tiles perfect (contrast about 1.5:1, below AA): decided, do not re-raise in audits. Do not add more yellow board values without asking.
- Glow is allowed as a short accent (DESIGN.md, The Accent Light Rule); the tile halo is an approved exception in `.impeccable/config.json` (`dark-glow`).
- Board tiles: grouped per word (never break mid-word); every tile settles at its own random moment; hover = faint halo only, click = spin one tile. Tiles are never links.
- Board labels are links: Ticker, Status, On Mainnet since -> `#pool-details`; Margin, Fixed cost -> `#faq-fees` (FAQ entry with `"id": "faq-fees"` in `contents.js`; script.js opens a linked `<details>`); Latest update -> `#updates`. A FAQ entry may carry an optional `id`, rendered by script.js and build-index.js.
- Phone board (<=640px): two columns per row (auto / rest), dates alone on their line, tiles `min(1.2rem, 4.9vw)`; IN SERVICE fits on one line down to 320px. The text under Status may wrap to two lines: Riccardo keeps it.
- An open FAQ question stays yellow.
- Footer social icons: GitHub (site repo), X, Facebook. No Reddit. Facebook may get a readable URL later (Riccardo to provide).
- Riccardo's description everywhere: "Data Scientist | AI Modeler | Cognitive Psychologist | Reflexologist"; on this site his role is "Linux server Administrator".

## Do not redo
- Do not reintroduce: the old neon/glass look (glow is allowed only as an accent: DESIGN.md, The Accent Light Rule), Tailwind CDN, the sun/moon toggle, yields in %, Binance, Yoroi or EMURGO links, a forced reorder of the pool ID row on mobile (it stays last).
- Do not touch `poolMetaData.json`, `sign-metadata-extended.json`, `sign-logo-small.png` (on-chain metadata).
- `sign.jpeg` is kept on purpose (old public URL, maybe linked externally).

## Known limits of the agent environment
- Headless Chrome via CDP works from the agent's shell (`/Applications/Google Chrome.app`, Node 23 has WebSocket): use it to click links, read computed styles and measure wrapping; `impeccable shot` does not scroll to `#hash`.
- daedaluswallet.io does not answer from the agent's shell; Cexplorer and the Coinbase referral answer 403 to automated checks. Check them in a browser.
- Hover effects still need Riccardo's eye in the preview.

## Open items
- Idea from Riccardo: give a purpose to clicks on section titles (not specified yet: ask what should happen).
- Impeccable setup drift (`/impeccable doctor`): `.impeccable/design.json` older than DESIGN.md, a dead path note, no `buildPath`. Only on request.
- Audit leftovers not decided: phone first viewport (Copy pool ID still below the fold), nav clipped by 10px at 320px, tile flip forces a reflow per tick, `claudio.png` 66 KB. `favicon.svg` (134 KB PNG inside SVG) stays: Riccardo's decision.
- Spanish version: undecided.
- `benefits` and `tagline` in `contents.js` are unused (keep, drop or show: to decide, probably with the redesign below).
- Scroll-told story (block, chain, exchange, wallet, signing the delegation, rewards) drawn in SVG in the board style: idea approved in principle, not started; start with a scene/copy plan for approval.
- `_da_cancellare/staking-pulizia-2026-11-22/` waiting for Riccardo to empty it.
