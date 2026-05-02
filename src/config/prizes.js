// ── Real-world prizes ─────────────────────────────────────────────────────
// These are the things players can ACTUALLY win when they open a pack.
// The final ("walkout") card in each pack is drawn from this list.
//
// Tiers control card visuals AND draw weight:
//   bronze  → most common, lowest OVR range
//   silver  → uncommon
//   gold    → rare
//   icon    → epic, glowing card
//   special → 1-of-1 walkout, holographic
//
// To swap a prize: edit the row. To add one: copy a row and tweak.
// Probabilities are auto-normalized so weights don't have to sum to 1.
// ──────────────────────────────────────────────────────────────────────────

export const TIERS = {
  bronze:  { label: 'BRONZE',  ovrRange: [60, 69] },
  silver:  { label: 'SILVER',  ovrRange: [70, 79] },
  gold:    { label: 'GOLD',    ovrRange: [80, 86] },
  icon:    { label: 'ICON',    ovrRange: [87, 92] },
  special: { label: 'SPECIAL', ovrRange: [93, 99] },
};

export const PRIZES = [
  // ── BRONZE: snacks (most common) ────────────────────────────────────────
  { id: 'daim',     name: 'DAIM',          emoji: '🍫', position: 'ST', nation: '🇸🇪', tier: 'bronze',  weight: 32 },
  { id: 'kinder',   name: 'KINDER',        emoji: '🍫', position: 'ST', nation: '🇮🇹', tier: 'bronze',  weight: 32 },

  // ── SILVER: better snacks / drinks ──────────────────────────────────────
  { id: 'redbull',  name: 'RED BULL',      emoji: '🐂', position: 'CAM', nation: '🇦🇹', tier: 'silver',  weight: 14 },
  { id: 'bar',      name: 'BAR',           emoji: '🍫', position: 'ST',  nation: '🇸🇪', tier: 'silver',  weight: 14 },

  // ── GOLD: AIS merch ─────────────────────────────────────────────────────
  { id: 'sticker',  name: 'AIS STICKER',   emoji: '🏷️', position: 'CB',  nation: '🇸🇪', tier: 'gold',    weight: 5 },
  { id: 'pin',      name: 'AIS PIN',       emoji: '📌', position: 'CB',  nation: '🇸🇪', tier: 'gold',    weight: 2 },

  // ── ICON: hoodie / event entry ──────────────────────────────────────────
  { id: 'hoodie',   name: 'AIS HOODIE',    emoji: '👕', position: 'CM',  nation: '🇸🇪', tier: 'icon',    weight: 0.8 },
  { id: 'event',    name: 'EVENT TICKET',  emoji: '🎟️', position: 'CM',  nation: '🇸🇪', tier: 'icon',    weight: 0.15 },

  // ── SPECIAL: legendary walkout (the dream pull) ─────────────────────────
  { id: 'board',    name: 'BOARD COFFEE',  emoji: '☕', position: 'GK',  nation: '🇸🇪', tier: 'special', weight: 0.05 },
];

export function drawPrize() {
  const total = PRIZES.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const p of PRIZES) {
    r -= p.weight;
    if (r <= 0) return p;
  }
  return PRIZES[0];
}

export function ovrFor(tier) {
  const [lo, hi] = TIERS[tier].ovrRange;
  return Math.floor(lo + Math.random() * (hi - lo + 1));
}
