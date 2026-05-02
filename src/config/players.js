// ── Filler cards: nostalgic FIFA 10–17 era players ────────────────────────
// These are the cards revealed BEFORE the prize card in each pack.
// Pure nostalgia — they don't affect what you win, just make the pack
// opening feel like vintage FIFA. Free to add/remove/reorder.
//
// Tier here only controls card art. Bronze/silver/gold/icon → look only.
// ──────────────────────────────────────────────────────────────────────────

export const PLAYERS = [
  // ── BRONZE-era nostalgia (FIFA 10–13 role players) ──────────────────────
  { name: 'PARK',        position: 'RM',  nation: '🇰🇷', club: 'Man Utd',     ovr: 79, tier: 'bronze' },
  { name: 'BERBATOV',    position: 'ST',  nation: '🇧🇬', club: 'Man Utd',     ovr: 84, tier: 'silver' },
  { name: 'CROUCH',      position: 'ST',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Stoke',       ovr: 77, tier: 'bronze' },
  { name: 'MILITO',      position: 'ST',  nation: '🇦🇷', club: 'Inter',       ovr: 84, tier: 'silver' },
  { name: 'MAICON',      position: 'RB',  nation: '🇧🇷', club: 'Inter',       ovr: 87, tier: 'gold' },
  { name: 'SNEIJDER',    position: 'CAM', nation: '🇳🇱', club: 'Inter',       ovr: 87, tier: 'gold' },
  { name: 'PUYOL',       position: 'CB',  nation: '🇪🇸', club: 'Barcelona',   ovr: 85, tier: 'silver' },
  { name: 'VAN DER SAR', position: 'GK',  nation: '🇳🇱', club: 'Man Utd',     ovr: 86, tier: 'gold' },
  { name: 'VIDIC',       position: 'CB',  nation: '🇷🇸', club: 'Man Utd',     ovr: 87, tier: 'gold' },
  { name: 'TEVEZ',       position: 'ST',  nation: '🇦🇷', club: 'Man City',    ovr: 86, tier: 'gold' },
  { name: 'FORLÁN',      position: 'ST',  nation: '🇺🇾', club: 'Atlético',    ovr: 84, tier: 'silver' },
  { name: 'DROGBA',      position: 'ST',  nation: '🇨🇮', club: 'Chelsea',     ovr: 88, tier: 'gold' },
  { name: 'LAMPARD',     position: 'CM',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Chelsea',     ovr: 87, tier: 'gold' },
  { name: 'GERRARD',     position: 'CM',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Liverpool',   ovr: 87, tier: 'gold' },
  { name: 'TORRES',      position: 'ST',  nation: '🇪🇸', club: 'Liverpool',   ovr: 86, tier: 'gold' },
  { name: 'ROONEY',      position: 'ST',  nation: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', club: 'Man Utd',     ovr: 88, tier: 'gold' },
  { name: 'KAKÁ',        position: 'CAM', nation: '🇧🇷', club: 'Real Madrid', ovr: 86, tier: 'gold' },
  { name: 'PIRLO',       position: 'CM',  nation: '🇮🇹', club: 'Juventus',    ovr: 87, tier: 'gold' },
  { name: 'XAVI',        position: 'CM',  nation: '🇪🇸', club: 'Barcelona',   ovr: 89, tier: 'icon' },
  { name: 'INIESTA',     position: 'CM',  nation: '🇪🇸', club: 'Barcelona',   ovr: 89, tier: 'icon' },
  { name: 'HENRY',       position: 'ST',  nation: '🇫🇷', club: 'Barcelona',   ovr: 87, tier: 'gold' },
  { name: 'RONALDINHO',  position: 'CAM', nation: '🇧🇷', club: 'Milan',       ovr: 88, tier: 'icon' },
  { name: 'BUFFON',      position: 'GK',  nation: '🇮🇹', club: 'Juventus',    ovr: 88, tier: 'icon' },
  { name: 'CASILLAS',    position: 'GK',  nation: '🇪🇸', club: 'Real Madrid', ovr: 87, tier: 'gold' },
  { name: 'NEUER',       position: 'GK',  nation: '🇩🇪', club: 'Bayern',      ovr: 89, tier: 'icon' },
  { name: 'RIBÉRY',      position: 'LM',  nation: '🇫🇷', club: 'Bayern',      ovr: 89, tier: 'icon' },
  { name: 'ROBBEN',      position: 'RM',  nation: '🇳🇱', club: 'Bayern',      ovr: 88, tier: 'gold' },
  { name: 'LAHM',        position: 'RB',  nation: '🇩🇪', club: 'Bayern',      ovr: 88, tier: 'gold' },
  { name: 'YAYA TOURÉ',  position: 'CM',  nation: '🇨🇮', club: 'Man City',    ovr: 87, tier: 'gold' },
  { name: 'AGÜERO',      position: 'ST',  nation: '🇦🇷', club: 'Man City',    ovr: 89, tier: 'icon' },
  { name: 'D. SILVA',    position: 'CAM', nation: '🇪🇸', club: 'Man City',    ovr: 86, tier: 'gold' },
  { name: 'VAN PERSIE',  position: 'ST',  nation: '🇳🇱', club: 'Man Utd',     ovr: 87, tier: 'gold' },
  { name: 'BALE',        position: 'LW',  nation: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', club: 'Real Madrid', ovr: 88, tier: 'gold' },
  { name: 'HAZARD',      position: 'LW',  nation: '🇧🇪', club: 'Chelsea',     ovr: 88, tier: 'gold' },
  { name: 'ÖZIL',        position: 'CAM', nation: '🇩🇪', club: 'Arsenal',     ovr: 86, tier: 'gold' },
  { name: 'SUÁREZ',      position: 'ST',  nation: '🇺🇾', club: 'Barcelona',   ovr: 89, tier: 'icon' },
  { name: 'KROOS',       position: 'CM',  nation: '🇩🇪', club: 'Real Madrid', ovr: 88, tier: 'gold' },
  { name: 'MODRIĆ',      position: 'CM',  nation: '🇭🇷', club: 'Real Madrid', ovr: 88, tier: 'gold' },
  { name: 'RAMOS',       position: 'CB',  nation: '🇪🇸', club: 'Real Madrid', ovr: 87, tier: 'gold' },
  { name: 'LEWANDOWSKI', position: 'ST',  nation: '🇵🇱', club: 'Bayern',      ovr: 89, tier: 'icon' },
  { name: 'MÜLLER',      position: 'CF',  nation: '🇩🇪', club: 'Bayern',      ovr: 87, tier: 'gold' },
  { name: 'POGBA',       position: 'CM',  nation: '🇫🇷', club: 'Juventus',    ovr: 86, tier: 'gold' },
  { name: 'REUS',        position: 'LW',  nation: '🇩🇪', club: 'Dortmund',    ovr: 86, tier: 'gold' },
  { name: 'AUBAMEYANG',  position: 'ST',  nation: '🇬🇦', club: 'Dortmund',    ovr: 86, tier: 'gold' },
  { name: 'GRIEZMANN',   position: 'CF',  nation: '🇫🇷', club: 'Atlético',    ovr: 86, tier: 'gold' },

  // ── ICON / SPECIAL nostalgia walkouts (rarer in fillers) ────────────────
  { name: 'ZLATAN',      position: 'ST',  nation: '🇸🇪', club: 'PSG',         ovr: 90, tier: 'icon' },
  { name: 'MESSI',       position: 'RW',  nation: '🇦🇷', club: 'Barcelona',   ovr: 94, tier: 'special' },
  { name: 'RONALDO',     position: 'LW',  nation: '🇵🇹', club: 'Real Madrid', ovr: 93, tier: 'special' },
];

// Pick `count` random distinct players for the filler portion of a pack.
export function drawPlayers(count) {
  const pool = [...PLAYERS];
  const out = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}
