---
name: Signature Staking
description: The [SIGN] stake pool as a European station departure board, posted since 2020.
colors:
  hall: "#1C1D1F"
  hall-raised: "#232427"
  board: "#0E0E0F"
  flap: "#262729"
  flap-upper: "#2E2F32"
  hinge: "#0A0A0B"
  rule: "#2C2D30"
  ink: "#F2F2F2"
  ink-2: "#C3C6CA"
  ink-3: "#9EA2A8"
  signal: "#FFC20E"
  signal-lit: "#FFD24D"
  signal-ink: "#141414"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 7vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.15
  flap:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  flap-md:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  button:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    letterSpacing: "0.03em"
  nav:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    letterSpacing: "0.04em"
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    letterSpacing: "0.1em"
  board-head:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  body:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-strong:
    fontFamily: "Barlow, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.6
  mono:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "1.0625rem"
    fontWeight: 400
rounded:
  flap: "0.12em"
  chip: "0.15rem"
  plate: "0.2rem"
  button: "0.25rem"
  photo: "0.35rem"
  panel: "0.5rem"
spacing:
  flap-gap: "0.2rem"
  row: "0.75rem"
  gutter: "1.5rem"
  panel-x: "2rem"
  panel-x-mobile: "1.1rem"
  section: "5rem"
  section-mobile: "3.5rem"
  wrap: "72rem"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.signal-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-signal-hover:
    backgroundColor: "{colors.signal-lit}"
    textColor: "{colors.signal-ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0 1.6rem"
    height: "3.25rem"
  button-line-hover:
    textColor: "{colors.signal}"
  button-small:
    rounded: "{rounded.button}"
    padding: "0 1rem"
    height: "2.5rem"
  button-done:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.signal-ink}"
  flap-tile:
    backgroundColor: "{colors.flap}"
    textColor: "{colors.ink}"
    typography: "{typography.flap}"
    rounded: "{rounded.flap}"
    padding: "0 0.08em"
    height: "1.28em"
    width: "0.78em"
  flap-tile-signal:
    backgroundColor: "{colors.flap}"
    textColor: "{colors.signal}"
  board-panel:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "0.5rem 2rem 1.25rem"
  departure-chip:
    backgroundColor: "{colors.flap}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "0.15rem 0.55rem"
  member-card:
    backgroundColor: "{colors.hall-raised}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.panel}"
    padding: "1.5rem"
  nav-link:
    textColor: "{colors.ink-2}"
    typography: "{typography.nav}"
    padding: "0.25rem 0"
  nav-link-hover:
    textColor: "{colors.ink}"
---

# Design System: Signature Staking

## Overview

**Creative North Star: "The Departure Board"**

The pool is posted like a train on a European station board: [SIGN] has been on the board since 2020, every epoch is a scheduled departure, every KES key rotation is a posted line. The world is a dim charcoal hall around matte board-black panels, with white characters on dark split-flap tiles cut by a hinge. One signal yellow marks what is live and what to do next. Nothing glows, nothing floats; information is mechanical, dated and checkable, which is the opposite of the neon crypto hero with stat cards.

Density is that of real signage: condensed uppercase type at board scale for data and headings, a quiet humanist sans for reading, hairline rules between rows instead of boxes. Board panels hold data (pool status, departures, details); the hall holds prose (intro, guide, FAQ). Motion is a single mechanical event: the board's flaps flip once into place on load, staggered, under a second, and never under reduced motion.

This identity is the reusable core for the Signature Staking family, including the separate free game "Signature Staking Service" (split-flap reels the player clicks to stop, 90s station-board look). The game inherits the flap tile, the hall/board/flap surfaces, the signal rule, the Barlow Condensed / Barlow pairing and the stroked pictograms unchanged. It must read as a station board, never as a slot machine or crypto hype.

**Key Characteristics:**
- Charcoal hall, board-black panels, dark flap tiles with a hairline hinge.
- Signal yellow reserved for status, the primary action, and interaction feedback.
- Barlow Condensed for board and headings, Barlow for reading, system mono for pool IDs.
- Hairline rules between rows; no cards-in-cards, no glow, no glass.
- One mechanical flip on load; static text is always the source.
- Brand marks written as text: logo `[./']`, ticker always `[SIGN]` in brackets.

## Colors

A near-monochrome hall of warm-neutral blacks and greys with one signal yellow.

### Primary
- **Signal Yellow** (#FFC20E): the status flaps ("IN SERVICE"), the current-epoch readout, the primary button ("Copy pool ID"), and feedback for interaction: link and nav hover, focus outline, text selection. Its scarcity is what makes "in service" read as a live state.
- **Signal Lit** (#FFD24D): hover state of the signal button only.
- **Signal Ink** (#141414): text on any signal-yellow fill.

### Neutral
- **Station Hall** (#1C1D1F): page background, the space around the boards.
- **Hall Raised** (#232427): team cards, the one raised surface on the hall.
- **Board Black** (#0E0E0F): data panels (pool board, departures list, pool details).
- **Flap** (#262729): lower half of a flap tile, departure type chips, unsplit flap fallback.
- **Flap Upper** (#2E2F32): upper half of a flap tile, giving the hard two-tone split.
- **Hinge** (#0A0A0B): the 2px line across the middle of every tile.
- **Rule** (#2C2D30): hairline row dividers, section borders, social button outlines.
- **Flap White** (#F2F2F2): primary text, flap characters, line-button outline.
- **Platform Grey** (#C3C6CA): reading text, nav at rest, pictograms.
- **Platform Grey Dim** (#9EA2A8): labels, column heads, metadata, link underlines (6.9:1 on the hall, AA for body text).

### Named Rules
**The Signal Rule.** Yellow is for status and the primary action, plus hover, focus and selection feedback. One signal-filled button per view. Never a decorative fill, never on headings, never a background area. The single brand exception is the apostrophe of the logo [./'], always signal yellow (`.brand__tick`); no other decorative yellow.

**The Two-Ground Rule.** Data sits on Board Black; prose sits on the Hall. Don't put reading paragraphs on a board panel or board data loose on the hall.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif), weights 600/700/800
**Body Font:** Barlow (with Helvetica Neue, Arial, sans-serif), weights 400/500/600
**Label/Mono Font:** ui-monospace (SF Mono, Menlo, Consolas) for pool IDs and hex only

**Character:** Barlow Condensed is the voice of the board: compact, uppercase, engineered, built for signage. Barlow is its reading companion from the same family, calm and legible at paragraph length.

### Hierarchy
- **Display** (800, clamp 3.25–5.25rem, 0.92, uppercase): the page h1 only.
- **Headline** (800, clamp 2.25–3.5rem, 1.0, uppercase): section titles.
- **Title** (700, 1.625rem, 1.15; 1.875rem on guide steps): sub-heads, team names, step titles.
- **Flap** (800, 2.5rem / 1.85rem medium, 1.0, uppercase, tabular figures): characters on split-flap tiles. Mobile 1.9rem / 1.45rem.
- **Board head / Label** (700 1.125rem 0.12em; 600 0.9375rem 0.1em, uppercase, Platform Grey Dim): column heads and field labels, as printed on a board.
- **Button / Nav** (700 1.375rem 0.03em; 600 1.125rem 0.04em uppercase).
- **Body** (400, 1.0625rem, 1.6): reading text, max 34–46em per block.
- **Mono** (1.0625rem): pool ID (bech32 and hex), broken anywhere.

### Named Rules
**The Board Voice Rule.** Condensed uppercase belongs to the board: labels, heads, flaps, buttons, nav, headings. Paragraphs, FAQ questions and update titles are Barlow in sentence case.

**The Tabular Rule.** Every figure on a flap or a date column uses tabular numerals so columns hold their width.

## Layout

A single centered column (max 72rem, 1.5rem side padding). The hero leads with the full-width board, then a two-column intro (h1 left, text and actions right, ratio 1.1:1). Sections are separated by a hairline top rule and 5rem padding (3.5rem on mobile). Board rows are three-column grids (1.15fr / 1.6fr / 1fr) with 1.5rem gaps and 0.75rem row padding; the departures list uses fixed columns (8.5rem date / 7rem type / remaining text). The guide uses a 9rem plate column beside the content.

Breakpoints: at 900px board rows drop to two columns and the intro and team stack; at 640px everything is one column, the nav becomes a horizontally scrolling strip, board panels tighten to 1.1rem side padding, the departures header hides, and the board reorders so status and pool ID come first.

## Elevation & Depth

Flat by construction. Depth comes from tonal grounds (Hall, Board Black, Hall Raised) and from the flap tile's own two-tone split and hinge. The only shadow is an ambient lift under the hero board, which makes the board read as a mounted object in the hall.

### Shadow Vocabulary
- **Board lift** (`box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35)`): hero pool board only.
- **Outlined chip** (`box-shadow: inset 0 0 0 1px #9EA2A8`): the KES departure chip, an outline instead of a fill.

### Named Rules
**The Hinge Rule.** Every flap tile is split hard at 50% (Flap Upper above, Flap below) with a 2px Hinge line across. That hard split is the world's only gradient; soft gradients, glow and glass are not part of it.

## Shapes

Small, mechanical corners. Flap tiles round at 0.12em, chips at 0.15rem, plates at 0.2rem, buttons at 0.25rem, photos at 0.35rem, panels and cards at 0.5rem. Dividers are 1px hairlines in Rule; the guide list opens with a 2px Flap White rule. Pictograms are stroked line drawings on a 24 viewBox, 1.6 stroke, round caps and joins, no fill, colored by currentColor (Platform Grey at rest, signal on hover where interactive). Social brand marks are the only filled icons.

### Named Rules
**The Pictogram Rule.** Icons are simple stroked pictograms: 24×24 viewBox, stroke-width 1.6, round caps and joins, fill none, currentColor. No glyph icons, emoji or icon fonts.

## Components

### Buttons
Engraved and direct, like a station ticket machine.
- **Shape:** gently squared (0.25rem), 3.25rem tall (2.5rem small), 2px border.
- **Primary (signal):** Signal Yellow fill, Signal Ink text, Barlow Condensed 700. Hover lifts to Signal Lit. Only one per view.
- **Line:** transparent with a 2px Flap White outline; hover turns border and text to signal.
- **Done state:** after copying, the button flips to Flap White fill with Signal Ink text.
- **Focus:** 2px signal outline, 3px offset (global).
- Transitions 0.2s on color, background and border with the ease-out curve.

### Split-flap tile (signature)
The reusable core of the identity, shared with the game's reels.
- **Tile:** min width 0.78em, height 1.28em, Flap/Flap Upper split, 2px Hinge line, 0.12em corners, 0.2rem gap between tiles; spaces become narrow empty slots (0.35em) with no tile.
- **Characters:** Flap White (Signal Yellow for status rows), uppercase, tabular.
- **Source:** the text lives in the static HTML; script splits it into tiles and keeps a screen-reader copy. Unsplit text falls back to one flap-colored plate.
- **Motion:** on load each tile cycles 3–6 random glyphs from A–Z 0–9 at 55ms each, staggered 28ms per tile from 120ms, every cycle a 70ms linear squash (scaleY 0.82). Under reduced motion, or with `?still`, tiles appear settled.

### Board panel
- Board Black, 0.5rem corners, 2rem side padding; header row of condensed labels with the epoch in signal on the right; rows divided by Rule hairlines; field labels above flap values; metadata in Platform Grey Dim below.

### Departure row and chips
- Date in condensed 700 tabular, type chip, Barlow 600 title with dim description. Chips: condensed label type on a Flap fill (0.15rem corners); KES chips are outlined instead of filled.

### Cards / Containers
- **Team card:** Hall Raised fill, 1px Rule border, 0.5rem corners, 1.5rem padding; photo 6.5rem square, 0.35rem corners, slightly desaturated (grayscale 0.15).

### Navigation
- Condensed 600 uppercase, Platform Grey at rest; hover goes to Flap White with a 2px signal underline. Brand at left: `[./']` in Condensed 600 plus "SIGN" in 800. Mobile: horizontal scroll strip under the brand.

### FAQ disclosure
- Hairline-separated rows; question in Barlow 600 1.125rem; a stroked plus pictogram rotates 45° when open (0.25s); hover turns question and icon signal.

## Do's and Don'ts

### Do:
- **Do** keep yellow (#FFC20E) to status, the primary action and interaction feedback (The Signal Rule).
- **Do** build every flap with the hard 50% split and 2px hinge, and keep its text in the static HTML.
- **Do** write the ticker as `[SIGN]` and the logo as `[./']`, set in Barlow Condensed.
- **Do** put data on Board Black panels with hairline rows, and prose on the Hall.
- **Do** use stroked pictograms: 24 viewBox, 1.6 stroke, round caps and joins.
- **Do** make the flip a single mechanical event under a second, static under reduced motion.

### Don't:
- **Don't** use soft gradients, glow, neon, glass or blur; the flap's hard split is the only gradient.
- **Don't** make the split-flap reels read as a slot machine: no fruit, coins, jackpot gold, red lights or flashing win effects; the flap glyph set is A–Z and 0–9.
- **Don't** add a second accent color or use yellow for headings, backgrounds or decoration.
- **Don't** set paragraphs in condensed uppercase.
- **Don't** use filled, glyph or emoji icons for interface pictograms.

## Light theme and theme switch (added 2026-11-22)

The light theme inverts the whole board (`:root[data-theme="light"]` in board.css): hall #EDEDEA, hall-raised #E4E4E0, board #F8F8F6, flap #E1E1DD / flap-upper #EBEBE7, hinge #C4C4BF, rule #D3D3CE, ink #141414 / #3A3C40 / #5C6066. The same vivid yellow **#FFC20E** is used in both themes. On the board the yellow stays as letters (IN SERVICE tiles, EPOCH n) and on the logo apostrophe, an owner decision (2026-11-22) accepting low contrast on light tiles (about 1.5:1); the fallback, if legibility becomes a problem, is a hairline dark outline on those letters. Controls in light use yellow as a fill or underline with dark ink: closed padlock and hovered buttons get a yellow fill, link hover is a thick yellow underline under dark text, and the focus ring turns ink.

Board refresh: on load and on every logo click the board updates like a real departure board: all tiles start together (jitter up to 0.15 s) and each runs fully on its own, 5-28 turns at 58-76 ms per turn, so they settle one here, one there across the whole board and the last tile to stop can be any letter in any cell (about 2 s in all). Switching: clicking the logo takes the visitor to the top of the page, refreshes the board and, unless the padlock beside it is closed, spins the `[./']` mark like a vortex (0.75s, rotate 720deg with a 0.55 scale dip; colours swap at the midpoint over 0.45s) and toggles dark/light. The padlock (stroked pictogram, open/closed shackle, `aria-pressed`) locks the theme so the logo only goes home. Choice and lock persist in localStorage (`sign-theme`, `sign-theme-lock`); first visit is dark. `?theme=light` forces the light theme without saving it. Reduced motion: no spin, instant switch. The theme is applied by an inline script in `<head>` before first paint.


Top bar: sticky at the top on every page width, solid hall background (no blur), it compacts after 48 px of scroll (back under 8 px): height 4.5rem to 2.5rem, logo 1.75rem to 1.1rem, nav 1.125rem to 0.875rem (0.8125rem on phones), padlock 2.25rem to 1.75rem, plus a soft shadow; sections keep scroll-margin-top so anchored headings are not hidden.

Team cards: on hover the card border, the name and the location turn signal yellow. Updates rows and each Pool details cell (ticker, network, testnet, mainnet, pool IDs, links) light up yellow one at a time on hover. Footer logo: same mark as the header (yellow apostrophe), a link back to the top of the page (no theme switch).

Meaningful yellow touches (owner request, 2026-11-22): "SIGN" in yellow inside the all-caps h1 (SIGNATURE STAKING), every letter A of each section heading (How to delegAte, UpdAtes, Pool detAils, SignAture teAm, FAQ) plus the "4" of the steps heading, the step numbers on the platform plates, the [SIGN] ticker in Pool details, and the FAQ icon of an open answer. Add new ones only where the yellow means something (status, the brand's SIGN, the next/newest item, the active state); never as a decorative stripe or fill.

Guide steps: on hover a step row gets a raised-hall background, its heading a 2px yellow underline (as the nav tabs) and its pictogram turns yellow.
