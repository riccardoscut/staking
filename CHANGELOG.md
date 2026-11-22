# Changelog

All notable changes to staking.da-sign.com. Newest first. Each entry: date, what, why, commit.

## 2026-11-22

### Content and trust
- **Removed promised returns.** "Guaranteed 4% ROI" (intro, meta, Open Graph, schema.org) and "Earn 5.5% yearly" (step 4) replaced with "enjoy your rewards" / "staking rewards". *Why:* staking rewards are probabilistic; the FAQ already said so. `b587c1e`, `0c14c87`
- **Step 4 title** is now "Enjoy your rewards while doing simply nothing" (was truncated "simply n..."). `b14a730`
- **Links reviewed.** Binance (referral and plain), Yoroi and EMURGO removed; FAQ no longer names Yoroi. Step 2 now recommends Lace (IOG) and Eternl, and Daedalus via its official GitHub releases page instead of hard-coded 7.1.0 binaries. KuCoin referral moved to the referral list; IOHK renamed IOG; Twitter link renamed X. *Why:* owner decision; outdated and redirecting links. `4fcb20e`
- **Team:** Claudio added, Riccardo's description updated, Massimo removed; section renamed "Signature team". `74d2a31`, `30c182b`
- **Updates log and FAQ** sections added (33 dated entries, 28 KES rotations; 10 questions with FAQPage schema). `42acfb4`
- Fixed "[SIGN]" in markdown rendering as links to "undefined"; Claudio added to the Organization JSON-LD. `b14a730`

### Design
- **New identity: departure board.** Split-flap tiles, charcoal and board black, signal yellow #FFC20E only where it means something, Barlow Condensed + Barlow, stroked SVG pictograms. Replaces the neon/glass look and Tailwind CDN with a single `board.css`. Documented in `DESIGN.md`. *Why:* calmer, more professional, product-specific; reusable by future SIGN products. `b14a730`
- **Hero board** with ticker, status, computed epoch, Mainnet since, 0% margin, 170 ADA fixed cost (verified on-chain), latest update, copyable pool ID and explorer links (earlier as an "at a glance" panel). `fc7486c`, `b14a730`
- **Light theme** (whole board inverted, same yellow); clicking the logo goes to the top, refreshes the board, spins the `[./']` mark and switches theme unless the padlock is closed; `?theme=light`, `?still` URL options. `30c182b`
- **Board animation:** tiles flip into place on load and on every logo click, each tile settling at its own random moment; hovering a tile shows a faint fading halo (stadium wave), clicking spins just that tile at a random speed. `30c182b`, `633e8c4`
- Sticky top bar that compacts on scroll; logo grows slightly on hover; footer logo fixed and links to the top. `30c182b`
- Yellow accents: logo apostrophe, "SIGN" in the title, every A of section headings, the "4" and step numbers, [SIGN] in Pool details; Updates rows, Pool details cells, team cards, step rows and FAQ questions light up yellow on hover. `48e7f68`, `30c182b`, `89c75f5`, `bee4807`
- Fixed: card padding (`@apply` never processed), cards hidden until scrolled, benefits rendered into the team grid. `e8a1465`

### Maintenance
- Removed unused files of the old design (Tailwind CSS files and config, theme toggle, demo/test pages, package.json); README rewritten. `97def36`
- Added `tools/build-index.js` to refresh the static HTML copy of the texts from `contents.js`. `dca5b35`
