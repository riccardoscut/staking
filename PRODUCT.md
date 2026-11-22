# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences with equal weight (confirmed 2026-11-22):

- **ADA holders choosing a pool.** They already own ADA and are comparing Cardano stake pools to decide where to delegate. They want to check that the pool is alive, reliable, cheap, and run by real people.
- **Newcomers to Cardano.** They do not own ADA yet, or have never delegated. The site walks them from buying ADA on an exchange, to installing a wallet, to finding the ticker [SIGN] and delegating.

## Product Purpose

staking.da-sign.com is the public home of the Cardano stake pool **Signature Staking**, ticker **[SIGN]**. Its job is to win and keep delegations: explain what staking is, prove the pool is trustworthy and active, and make delegating to SIGN easy. Success means a visitor delegates their ADA to SIGN, or comes back to check that the pool is still healthy.

## Positioning

Three confirmed differentiators, in no fixed order:

1. **Longevity.** On Cardano's Incentivized Testnet since January 2020, live on Mainnet since 30 July 2020, first Mainnet block in epoch 212: one of the first pools on the network.
2. **Verifiable transparency.** Every KES key rotation and maintenance event is published in the Updates log with its on-chain evidence (operational certificate number, epoch), and visitors are pointed to independent explorers (Cexplorer, PoolTool) to verify blocks, stake and delegators.
3. **Minimal cost.** 0% margin and a fixed cost of 170 ADA per epoch, the protocol minimum.

"Education" appears in the on-chain pool metadata (`poolMetaData.json`) but was **not** selected as a positioning point.

## Operating Context

- Visitors usually arrive with a Cardano wallet (Lace, Eternl, Daedalus) or an exchange account open in another tab, and cross-check the pool on Cexplorer or PoolTool.
- Delegation happens in the visitor's wallet, never on this site. The site informs and links; it does not hold funds or connect wallets.
- Cardano facts the copy relies on: 5-day epochs, delegation active after 2 epochs, first rewards about 15–20 days after delegating, refundable 2 ADA stake-key deposit, no lock-up.
- Pool ID: `pool1h0prd5vcdv6uk7hglztdcqfp5czjqxdydxkxkdhg8rrk22mr4ym`.

## Capabilities and Constraints

- Static site on GitHub Pages, served from the `main` branch of `riccardoscut/staking`. No framework, no build step: `index.html`, `board.css` (all styles, dark and light theme), `script.js`, `contents.js`, `snarkdown`. Fonts: Barlow Condensed and Barlow from Google Fonts. Analytics: GoatCounter.
- Content lives in `contents.js` and is rendered by `script.js`. The static copy in `index.html` (for search engines and no-JS visitors) is refreshed with `node tools/build-index.js` after every content change; team names and roles also go in the schema.org JSON-LD by hand.
- Sections: hero departure board (ticker, status, computed epoch, Mainnet since, margin, fixed cost, latest update, copyable pool ID, explorer links), intro, how-to (4 steps), Updates log (sorted by date, types KES / Software / Hardware / Pool / Team), Pool details, team ("Signature team"), FAQ.
- Wallets recommended in the guide: Lace (IOG) and Eternl as light wallets, Daedalus (IOG) via its official GitHub releases page. Yoroi/EMURGO and Binance are deliberately not referenced (decision 2026-11-22).
- The unused `benefits` and `tagline` entries in `contents.js` are not shown anywhere.
- `poolMetaData.json` and `sign-metadata-extended.json` are on-chain pool metadata, referenced by URL from the blockchain: changing them affects the registered pool, not just the site.
- The how-to step 1 contains Riccardo's exchange referral links (Crypto.com, Coinbase, KuCoin).
- Language: the site is currently English only. Whether to add Spanish is **undecided**.
- Must stay clearly separate from Riccardo's other site (healingtouch, reflexology): different audience and tone.

## Brand Commitments

- Name **Signature Staking**, ticker **[SIGN]** (always written with square brackets in copy).
- Tagline: "...simple as a [SIGN], powerful as a Signature."
- Visual identity (chosen 2026-11-22): the "departure board" world documented in `DESIGN.md`: split-flap tiles, charcoal and board black (plus a light theme), signal yellow #FFC20E, Barlow Condensed + Barlow. Must never read as a casino or as crypto hype.
- Logo `[./']` with the apostrophe always in signal yellow; clicking it goes to the top and switches dark/light (a padlock can lock the theme).
- Assets: `logo.png`, `sign.jpeg`, `sign-logo-small.png`, favicon set, team photos `riccardo.png` and `claudio.png` (150×150).
- Team (confirmed 2026-11-22): Riccardo, Linux server Administrator, "Data Scientist | AI Modeler | Cognitive Psychologist | Reflexologist", Barcelona-based. Claudio, "AI Systems & Digital Innovation", "Software Developer | Data & AI Specialist", "LLM Research | AI Infrastructure", Rome-based. Massimo Testa is no longer on the team.

## Evidence on Hand

- Updates log in `contents.js`: 33 dated entries from January 2020 to November 2026, including 28 KES rotations each with operational certificate number and epoch.
- Independent verification links: Cexplorer and PoolTool pool pages (on the board, in Pool details and in the FAQ).
- Fee facts: 0% margin, 170 ADA fixed cost (verified on-chain via Koios on 2026-11-22; 170 ADA is the protocol minimum at epoch 669).
- **Not on hand, must not be invented:** delegator testimonials, live stake/delegator/block counts on the site itself, ROI or performance figures, awards or partnerships.

## Product Principles

1. **Never promise returns.** Staking rewards are probabilistic and vary by epoch. No "guaranteed" yields or fixed ROI figures anywhere (copy, meta tags, schema.org). Generic wording like "enjoy your rewards" is the standard (decision 2026-11-22).
2. **Proof over claims.** Every trust statement should point to something checkable: an on-chain event, an explorer link, a dated update.
3. **Your ADA never leave your wallet.** Say plainly that delegation has no lock-up and the operator never touches funds; this is the main fear of newcomers.
4. **Serve both audiences without slowing either.** A pool-comparer should find fees, history and verification links fast; a newcomer should be able to follow the guide step by step.
5. **Keep it light and static.** No wallet connection, no backend, no heavy framework without an approved reason.
