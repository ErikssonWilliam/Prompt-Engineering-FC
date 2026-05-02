# LiU AI Society — Pack Opener

A FIFA-style pack-opening mini game for LiU AI Society. Click the pack, watch nostalgic FIFA 10–17 era players reveal one by one, and the final "walkout" card is the actual prize you win.

Built as a sibling to [`liuais-bandit`](https://github.com/Bergqvist22/liuais-bandit) — same React + Vite stack, same lunch-event vibe.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Configure prizes & filler cards

Two config files, both pure JS — no rebuild logic needed beyond saving the file:

- **`src/config/prizes.js`** — the real-world rewards (snacks, swag, event tickets). Each row has a `tier` (`bronze`/`silver`/`gold`/`icon`/`special`) and a `weight` controlling draw odds. Weights auto-normalize, so they don't have to sum to 1. Edit the rows to swap snacks, change rarity, or add new prizes.
- **`src/config/players.js`** — the nostalgic FIFA filler cards shown before the prize. Pure aesthetic — they don't affect what you win. Add or remove players freely.

The number of filler cards per pack is `FILLERS_PER_PACK` in `src/hooks/usePackOpen.js` (default: 4, so each pack shows 4 player cards + 1 prize walkout).

## Re-skinning to AIS branding

All colors live as CSS variables at the top of `src/index.css` (`--primary`, `--accent`, etc.). Logo wordmark is in `src/App.jsx` (the "AIS" in `.header__logo`) and `public/favicon.svg`. Drop in a real SVG logo if you have one.

## Deploy free on Vercel

1. Push this folder to a GitHub repo (e.g. `liuais-walkout`).
2. Go to [vercel.com](https://vercel.com), click **Add New → Project**, import the repo.
3. Vercel auto-detects Vite. Click **Deploy**. Done.

`vercel.json` is already included so the build settings are correct out of the box. Custom domain (e.g. `walkout.liuais.com`) can be added under the project's **Settings → Domains**.

Alternatives that work the same way: **Netlify**, **Cloudflare Pages**, **GitHub Pages** (set `base` in `vite.config.js` if hosting under a subpath).
