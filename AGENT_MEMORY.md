# Agent memory: staking.da-sign.com

Working notes for the next agent session. Stable business facts live in the parent `CLAUDE.md` (`~/Desktop/riccardoscut/CLAUDE.md`); product truth in `PRODUCT.md`; the design system in `DESIGN.md`; history in `CHANGELOG.md`. Keep this file under ~150 lines and summarise old entries. Note: this repo is public and served by GitHub Pages, so never write anything private here.

_Last updated: 2026-11-22._

## State
- `main` = GitHub = live site, last published commit `bee4807` (plus this memory/changelog commit when published).
- Live and verified on 2026-11-22: departure-board design, light theme, logo vortex + padlock, random board refresh, tile halo/click spin, sticky compact bar, yellow accents, link review (no Binance/Yoroi/EMURGO), cleanup, `tools/build-index.js`.

## Workflow (decided by Riccardo)
- Work directly on `main`, small commits. Nothing goes online without Riccardo's "ok" after a local preview.
- Preview: `~/Desktop/riccardoscut/anteprima.command` serves staking on http://localhost:8001. `?still` = board settled (use for screenshots), `?theme=light` = light theme.
- Publish: the agent commits, then rewrites the comment line of `~/Desktop/riccardoscut/pubblica-staking.command`; Riccardo double-clicks it (it fetches, lists the commits not yet on GitHub, asks `s/n`, pushes). The agent's shell has no GitHub credentials.
- After publishing, verify on the live site (GitHub Pages takes ~30 s to 2 min; `cache-control: max-age=600`).
- Files are never deleted: move them to `~/Desktop/riccardoscut/_da_cancellare/` and let Riccardo empty it.
- Talk to Riccardo in Italian, plain language; code, comments and commits in English.
- Private material never goes in this repo: it lives outside, in the local `privato/` folder next to the repos. Inside the repo only `_privato/` (git-ignored, with `.claude/` and `.impeccable/`). Check `git status` before every commit.

## Conventions
- Content changes: edit `contents.js`, then `node tools/build-index.js` to refresh the static copy in `index.html` (it only touches the `<!-- build:NAME -->` regions and bumps the `?v=` stamp of contents.js/script.js). When `board.css` changes, bump `board.css?v=N` in `index.html` by hand.
- Team changes also go in the schema.org JSON-LD in `index.html`.
- Never promise returns (no fixed or guaranteed %). Ticker always `[SIGN]`.
- Yellow #FFC20E only where it means something (see `DESIGN.md`, Signal Rule and the list of accents); Riccardo accepted yellow letters on light tiles despite low contrast (fallback: hairline dark outline).
- Board tiles: grouped per word (never break mid-word); every tile settles at its own random moment; hover = faint halo only, click = spin one tile.
- Riccardo's description everywhere: "Data Scientist | AI Modeler | Cognitive Psychologist | Reflexologist"; on this site his role is "Linux server Administrator".

## Do not redo
- Do not reintroduce: neon/glow/glass look, Tailwind CDN, the sun/moon toggle, yields in %, Binance, Yoroi or EMURGO links, a forced reorder of the pool ID row on mobile (it stays last).
- Do not touch `poolMetaData.json`, `sign-metadata-extended.json`, `sign-logo-small.png` (on-chain metadata).
- `sign.jpeg` is kept on purpose (old public URL, maybe linked externally).

## Known limits of the agent environment
- daedaluswallet.io does not answer from the agent's shell; Cexplorer and the Coinbase referral answer 403 to automated checks. Check them in a browser.
- The agent cannot hover, click or scroll in screenshots: interactive effects must be tested by Riccardo.

## Open items
- Spanish version: undecided.
- `benefits` and `tagline` in `contents.js` are unused (keep, drop or show: to decide, probably with the redesign below).
- Scroll-told story (block, chain, exchange, wallet, signing the delegation, rewards) drawn in SVG in the board style: idea approved in principle, not started; start with a scene/copy plan for approval.
- `_da_cancellare/staking-pulizia-2026-11-22/` waiting for Riccardo to empty it.
