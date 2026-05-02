// ── Real-world prizes ─────────────────────────────────────────────────────
// These are the things players can ACTUALLY win when they open a pack.
// The final ("walkout") card in each pack is drawn from this list, biased
// by whichever pack the user chose to open (see config/packs.js).
//
// Tiers control card visuals AND draw weight within the pack's tier roll:
//   bronze  → most common, lowest OVR range
//   silver  → uncommon
//   gold    → rare
//   icon    → epic, glowing card
//   special → 1-of-1 walkout, holographic
//
// To swap a prize: edit the row. To add one: copy a row and tweak.
// `weight` only matters relative to other prizes of the SAME tier.
// ──────────────────────────────────────────────────────────────────────────

export const TIERS = {
  bronze:  { label: 'BRONZE',  ovrRange: [60, 69] },
  silver:  { label: 'SILVER',  ovrRange: [70, 79] },
  gold:    { label: 'GOLD',    ovrRange: [80, 86] },
  icon:    { label: 'ICON',    ovrRange: [87, 92] },
  special: { label: 'SPECIAL', ovrRange: [93, 99] },
};

export const PRIZES = [
  // ── BRONZE: snacks ──────────────────────────────────────────────────────
  { id: 'daim',     name: 'DAIM',          emoji: '🍫', position: 'ST',  nation: '🇸🇪', tier: 'bronze',  weight: 1 },
  { id: 'kinder',   name: 'KINDER',        emoji: '🍫', position: 'ST',  nation: '🇮🇹', tier: 'bronze',  weight: 1 },

  // ── SILVER: better snacks / drinks ──────────────────────────────────────
  { id: 'redbull',  name: 'RED BULL',      emoji: '🐂', position: 'CAM', nation: '🇦🇹', tier: 'silver',  weight: 1 },
  { id: 'bar',      name: 'BAR',           emoji: '🍫', position: 'ST',  nation: '🇸🇪', tier: 'silver',  weight: 1 },

  // ── GOLD: AIS merch ─────────────────────────────────────────────────────
  { id: 'sticker',  name: 'AIS STICKER',   emoji: '🏷️', position: 'CB',  nation: '🇸🇪', tier: 'gold',    weight: 3 },
  { id: 'pin',      name: 'AIS PIN',       emoji: '📌', position: 'CB',  nation: '🇸🇪', tier: 'gold',    weight: 1 },

  // ── ICON: hoodie / event entry ──────────────────────────────────────────
  { id: 'hoodie',   name: 'AIS HOODIE',    emoji: '👕', position: 'CM',  nation: '🇸🇪', tier: 'icon',    weight: 4 },
  { id: 'event',    name: 'EVENT TICKET',  emoji: '🎟️', position: 'CM',  nation: '🇸🇪', tier: 'icon',    weight: 1 },

  // ── SPECIAL: legendary walkout ──────────────────────────────────────────
  { id: 'board',    name: 'BOARD COFFEE',  emoji: '☕', position: 'GK',  nation: '🇸🇪', tier: 'special', weight: 1 },
];

// Roll a tier from the pack's distribution, then weight-sample within it.
export function drawPrize(pack) {
  const dist = pack.prizeDist;
  let r = Math.random();
  let chosen = null;
  for (const [tier, p] of Object.entries(dist)) {
    r -= p;
    if (r <= 0) { chosen = tier; break; }
  }
  if (!chosen) chosen = 'bronze';

  let candidates = PRIZES.filter((p) => p.tier === chosen);
  if (candidates.length === 0) {
    // Fall back to any tier with prizes if the pack ever specifies an empty tier.
    candidates = PRIZES;
  }
  const total = candidates.reduce((s, p) => s + p.weight, 0);
  let rr = Math.random() * total;
  for (const p of candidates) {
    rr -= p.weight;
    if (rr <= 0) return p;
  }
  return candidates[0];
}

export function ovrFor(tier) {
  const [lo, hi] = TIERS[tier].ovrRange;
  return Math.floor(lo + Math.random() * (hi - lo + 1));
}
