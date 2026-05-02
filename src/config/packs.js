// ── Pack ─────────────────────────────────────────────────────────────────
// One pack, one set of odds. Edit `prizeDist` to change the rarity curve.
// Values must sum to 1.0 (each entry is the probability of the prize tier
// for the walkout card).
// ────────────────────────────────────────────────────────────────────────

export const PACK = {
  id: 'standard',
  name: 'AIS Pack',
  tier: 'gold',
  prizeDist: { bronze: 0.55, silver: 0.30, gold: 0.10, icon: 0.04, special: 0.01 },
};
