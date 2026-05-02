// ── Filler cards: nostalgic FIFA-era players ──────────────────────────────
// Each entry has a verified `sofifaId` and the FIFA version where the
// portrait actually exists. Images are downloaded ahead of time to
// /public/players/<id>.png by `npm run fetch-images` so the app never
// hotlinks at runtime.
//
// To add a player:
//   1. Find them on sofifa.com — their numeric id is in the URL.
//   2. Add a row below with `sofifaId` and the FIFA version that has them.
//   3. Run `npm run fetch-images` to pull the portrait.
// ──────────────────────────────────────────────────────────────────────────

export const PLAYERS = [
  { name: 'LAMPARD',     position: 'CM',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Chelsea',     ovr: 87, tier: 'gold',   sofifaId: 5471,   fifaVersion: 17 },
  { name: 'NEUER',       position: 'GK',  nation: '🇩🇪', club: 'Bayern',      ovr: 89, tier: 'icon',   sofifaId: 167495, fifaVersion: 17 },
  { name: 'RIBÉRY',      position: 'LM',  nation: '🇫🇷', club: 'Bayern',      ovr: 89, tier: 'icon',   sofifaId: 156616, fifaVersion: 17 },
  { name: 'AGÜERO',      position: 'ST',  nation: '🇦🇷', club: 'Man City',    ovr: 89, tier: 'icon',   sofifaId: 153079, fifaVersion: 17 },
  { name: 'D. SILVA',    position: 'CAM', nation: '🇪🇸', club: 'Man City',    ovr: 86, tier: 'gold',   sofifaId: 168542, fifaVersion: 17 },
  { name: 'BALE',        position: 'LW',  nation: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', club: 'Real Madrid', ovr: 88, tier: 'gold',   sofifaId: 173731, fifaVersion: 17 },
  { name: 'HAZARD',      position: 'LW',  nation: '🇧🇪', club: 'Chelsea',     ovr: 88, tier: 'gold',   sofifaId: 183277, fifaVersion: 17 },
  { name: 'SUÁREZ',      position: 'ST',  nation: '🇺🇾', club: 'Barcelona',   ovr: 89, tier: 'icon',   sofifaId: 176580, fifaVersion: 17 },
  { name: 'KROOS',       position: 'CM',  nation: '🇩🇪', club: 'Real Madrid', ovr: 88, tier: 'gold',   sofifaId: 182521, fifaVersion: 17 },
  { name: 'MODRIĆ',      position: 'CM',  nation: '🇭🇷', club: 'Real Madrid', ovr: 88, tier: 'gold',   sofifaId: 177003, fifaVersion: 17 },
  { name: 'RAMOS',       position: 'CB',  nation: '🇪🇸', club: 'Real Madrid', ovr: 87, tier: 'gold',   sofifaId: 155862, fifaVersion: 17 },
  { name: 'LEWANDOWSKI', position: 'ST',  nation: '🇵🇱', club: 'Bayern',      ovr: 89, tier: 'icon',   sofifaId: 188545, fifaVersion: 17 },
  { name: 'MÜLLER',      position: 'CF',  nation: '🇩🇪', club: 'Bayern',      ovr: 87, tier: 'gold',   sofifaId: 189596, fifaVersion: 17 },
  { name: 'POGBA',       position: 'CM',  nation: '🇫🇷', club: 'Juventus',    ovr: 86, tier: 'gold',   sofifaId: 195864, fifaVersion: 17 },
  { name: 'REUS',        position: 'LW',  nation: '🇩🇪', club: 'Dortmund',    ovr: 86, tier: 'gold',   sofifaId: 188350, fifaVersion: 17 },
  { name: 'AUBAMEYANG',  position: 'ST',  nation: '🇬🇦', club: 'Dortmund',    ovr: 86, tier: 'gold',   sofifaId: 188567, fifaVersion: 17 },
  { name: 'GRIEZMANN',   position: 'CF',  nation: '🇫🇷', club: 'Atlético',    ovr: 86, tier: 'gold',   sofifaId: 194765, fifaVersion: 17 },
  { name: 'ZLATAN',      position: 'ST',  nation: '🇸🇪', club: 'Man Utd',     ovr: 90, tier: 'icon',    sofifaId: 41236,  fifaVersion: 17 },
  { name: 'MESSI',       position: 'RW',  nation: '🇦🇷', club: 'Barcelona',   ovr: 94, tier: 'special', sofifaId: 158023, fifaVersion: 17 },
  { name: 'RONALDO',     position: 'LW',  nation: '🇵🇹', club: 'Real Madrid', ovr: 93, tier: 'special', sofifaId: 20801,  fifaVersion: 17 },
];

// Each player's portrait is downloaded to /public/players/<id>.png by the
// fetch-images script, then served as a same-origin asset.
PLAYERS.forEach((p) => { p.image = `/players/${p.sofifaId}.png`; });

export function drawPlayers(count) {
  const pool = [...PLAYERS];
  const out = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}
