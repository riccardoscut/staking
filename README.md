# Signature Staking [SIGN]

Website of the Cardano stake pool **Signature Staking**, ticker **[SIGN]**: https://staking.da-sign.com

A single static page, served by GitHub Pages from the `main` branch. No framework and no build step.

## Files

| File | What it is |
|---|---|
| `index.html` | The page. It also contains a static copy of every text, for search engines and visitors without JavaScript. |
| `contents.js` | **The content to edit**: intro, the 4 delegation steps, team, updates log, FAQ. |
| `script.js` | Renders `contents.js` into the page and runs the departure board (split-flap tiles, theme switch, copy pool ID). |
| `board.css` | All the styles (dark and light theme). |
| `DESIGN.md` | The design system: colours, type, the split-flap tile, the yellow rule. Read it before changing the look. |
| `snarkdown-2.0.0.min.js` | Tiny markdown parser used for the texts in `contents.js`. |
| `tools/build-index.js` | Refreshes the static copy of the texts in `index.html` from `contents.js` (see below). |
| `riccardo.png`, `claudio.png` | Team photos (150 × 150). |
| `favicon*`, `apple-touch-icon.png`, `web-app-manifest-*.png`, `site.webmanifest`, `logo.png` | Icons and logo. |
| `poolMetaData.json`, `sign-metadata-extended.json`, `sign-logo-small.png` | **On-chain pool metadata**, read by the Cardano blockchain through the pool registration. Do not rename or move them; changing them changes what wallets show for the pool. |
| `CNAME` | Custom domain for GitHub Pages. |

## Editing content

Edit `contents.js`; markdown is allowed in the texts (`[text](https://...)`, `**bold**`).

- **Updates**: add one line to `"updates"`, newest anywhere (the page sorts by date). Fields: `date` (`YYYY-MM-DD`), `type` (`KES`, `Software`, `Hardware`, `Pool` or `Team`), `title`, `text`. The "Latest update" date on the board follows automatically.
- **FAQ**: each entry has `question` and `answer`; an optional `id` (e.g. `"faq-fees"`) gives it an anchor, and a link to `#that-id` opens the question. The board's Margin and Fixed cost labels link to `#faq-fees`: keep that id.
- **Team**: edit `contents.js`, run the refresh script below, and update the schema.org block in `index.html` by hand when names or roles change.
- **Never promise returns**: no fixed or guaranteed yields anywhere (texts, meta tags, schema.org).
- Write the ticker as **[SIGN]**, with brackets.

### After every change to `contents.js`: refresh the static copy

Visitors see the new texts at once (the page renders `contents.js`), but search engines and visitors without JavaScript read the static copy inside `index.html`. Refresh it from the `staking` folder:

```sh
node tools/build-index.js
```

The script only rewrites what sits between the `<!-- build:NAME -->` and `<!-- /build:NAME -->` markers in `index.html` (intro, steps, latest 6 updates, team, FAQ) and bumps the `?v=` cache stamp of `contents.js` and `script.js`, so browsers load the fresh files. Nothing else in `index.html` is touched; do not remove the markers. It needs only Node.js, no installs. Then preview and publish as usual.

## Preview and publishing

1. Double-click `~/Desktop/riccardoscut/anteprima.command` and open http://localhost:8001.
2. Useful URL options: `?still` shows the board already settled; `?theme=light` opens the light theme without saving it.
3. Publish with `~/Desktop/riccardoscut/pubblica-staking.command` (pushes `main`; online in 1-2 minutes).

## Behaviour worth knowing

- Clicking the logo goes back to the top, refreshes the board and switches dark/light, unless the padlock next to it is closed. The choice is saved in the browser.
- Board tiles light up when hovered; clicking a tile spins it. The small labels above the tiles are links: Ticker, Status and On Mainnet since go to Pool details, Margin and Fixed cost to the fees question in the FAQ, Latest update to Updates.
- On phones the board shows Ticker beside Status and Margin beside Fixed cost, with smaller tiles.
- Reduced-motion settings are respected: no spinning, instant theme switch.
- Analytics: GoatCounter (`staking.goatcounter.com`).
