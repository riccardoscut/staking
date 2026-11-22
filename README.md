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
| `riccardo.png`, `claudio.png` | Team photos (150 × 150). |
| `favicon*`, `apple-touch-icon.png`, `web-app-manifest-*.png`, `site.webmanifest`, `logo.png` | Icons and logo. |
| `poolMetaData.json`, `sign-metadata-extended.json`, `sign-logo-small.png` | **On-chain pool metadata**, read by the Cardano blockchain through the pool registration. Do not rename or move them; changing them changes what wallets show for the pool. |
| `CNAME` | Custom domain for GitHub Pages. |

## Editing content

Edit `contents.js`; markdown is allowed in the texts (`[text](https://...)`, `**bold**`).

- **Updates**: add one line to `"updates"`, newest anywhere (the page sorts by date). Fields: `date` (`YYYY-MM-DD`), `type` (`KES`, `Software`, `Hardware`, `Pool` or `Team`), `title`, `text`. The "Latest update" date on the board follows automatically.
- **Team**: every change goes in `contents.js` **and** in the static HTML of `index.html` (and in the schema.org block in `index.html` when names or roles change).
- **Never promise returns**: no fixed or guaranteed yields anywhere (texts, meta tags, schema.org).
- Write the ticker as **[SIGN]**, with brackets.

After changing `contents.js`, the static copy of the texts in `index.html` should be refreshed too, so that search engines read the same content.

## Preview and publishing

1. Double-click `~/Desktop/riccardoscut/anteprima.command` and open http://localhost:8001.
2. Useful URL options: `?still` shows the board already settled; `?theme=light` opens the light theme without saving it.
3. Publish with `~/Desktop/riccardoscut/pubblica-staking.command` (pushes `main`; online in 1-2 minutes).

## Behaviour worth knowing

- Clicking the logo goes back to the top, refreshes the board and switches dark/light, unless the padlock next to it is closed. The choice is saved in the browser.
- Board tiles light up when hovered; clicking a tile spins it.
- Reduced-motion settings are respected: no spinning, instant theme switch.
- Analytics: GoatCounter (`staking.goatcounter.com`).
