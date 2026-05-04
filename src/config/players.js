// ── Filler cards: LiU AI Society board & founders ─────────────────────────
// Each entry has a `slug` matching its image file in /public/players/ais/.
// Tier reflects role hierarchy (special > icon > gold), position is themed
// to the member's section (Dev = defensive midfield/back, Business = strikers,
// Comms = wingers, Education = central, Treasurer = keeper).
// ──────────────────────────────────────────────────────────────────────────

export const PLAYERS = [
  // Presidency — special editions
  { name: 'N. ALENÄS',     position: 'CAM', nation: '🇸🇪', club: 'LiU AIS',      ovr: 94, tier: 'special', slug: 'nils-alenas',          ext: 'jpeg' },
  { name: 'P. HEDMAN',     position: 'CB',  nation: '🇸🇪', club: 'LiU AIS',      ovr: 91, tier: 'special', slug: 'pontus-hedman',        ext: 'jpeg' },

  // Founders — icons
  { name: 'WRETBLAD',      position: 'ST',  nation: '🇸🇪', club: 'Founders',     ovr: 92, tier: 'icon',    slug: 'niklas-wretblad',      ext: 'jpeg' },
  { name: 'F. GORDH',      position: 'CAM', nation: '🇸🇪', club: 'Founders',     ovr: 91, tier: 'icon',    slug: 'fredrik-gordh',        ext: 'jpeg' },
  { name: 'E. LARSSON',    position: 'CF',  nation: '🇸🇪', club: 'Founders',     ovr: 90, tier: 'icon',    slug: 'erik-larsson',         ext: 'jpeg' },
  { name: 'WIKSÄTER',      position: 'LW',  nation: '🇸🇪', club: 'Founders',     ovr: 90, tier: 'icon',    slug: 'axel-wiksater',        ext: 'jpeg' },

  // Treasurer — icon GK (guards the funds)
  { name: 'HARRYSSON',     position: 'GK',  nation: '🇸🇪', club: 'Treasury',     ovr: 89, tier: 'icon',    slug: 'simon-harrysson',      ext: 'jpeg' },

  // Business — strikers
  { name: 'WALKER TUNEK',  position: 'ST',  nation: '🇸🇪', club: 'Business',     ovr: 86, tier: 'gold',    slug: 'daniel-walker-tunek',  ext: 'jpeg' },
  { name: 'HULTGREN',      position: 'ST',  nation: '🇸🇪', club: 'Business',     ovr: 85, tier: 'gold',    slug: 'johan-hultgren',       ext: 'png'  },

  // Education — central mid
  { name: 'BERGQVIST',     position: 'CM',  nation: '🇸🇪', club: 'Education',    ovr: 87, tier: 'gold',    slug: 'emil-bergqvist',       ext: 'jpeg' },

  // Communication — wingers / wide mids
  { name: 'AVENDAÑO',      position: 'RW',  nation: '🇸🇪', club: 'Comms',        ovr: 87, tier: 'gold',    slug: 'veronica-avendano',    ext: 'jpeg' },
  { name: 'GALLARBO',      position: 'LW',  nation: '🇸🇪', club: 'Comms',        ovr: 86, tier: 'gold',    slug: 'karl-henrik-gallarbo', ext: 'jpeg' },
  { name: 'HALLBÄCK',      position: 'RM',  nation: '🇸🇪', club: 'Comms',        ovr: 85, tier: 'gold',    slug: 'martin-hallback',      ext: 'png'  },
  { name: 'HULTMAN',       position: 'LM',  nation: '🇸🇪', club: 'Comms',        ovr: 85, tier: 'gold',    slug: 'joel-hultman',         ext: 'png'  },

  // Development — backbone (CDM/CB)
  { name: 'W. ERIKSSON',   position: 'CDM', nation: '🇸🇪', club: 'Development',  ovr: 99, tier: 'legend',  slug: 'william-eriksson',     ext: 'jpeg' },
  { name: 'BERGLIND',      position: 'CDM', nation: '🇸🇪', club: 'Development',  ovr: 87, tier: 'gold',    slug: 'tobias-berglind',      ext: 'jpeg' },
  { name: 'BERTMAR',       position: 'CB',  nation: '🇸🇪', club: 'Development',  ovr: 87, tier: 'gold',    slug: 'emma-bertmar',         ext: 'png'  },
  { name: 'KÄMMERLING',    position: 'CDM', nation: '🇸🇪', club: 'Development',  ovr: 86, tier: 'gold',    slug: 'fredrik-kammerling',   ext: 'png'  },
  { name: 'ENGSTRÖM',      position: 'CB',  nation: '🇸🇪', club: 'Development',  ovr: 86, tier: 'gold',    slug: 'gabriel-engstrom',     ext: 'png'  },
];

PLAYERS.forEach((p) => { p.image = `/players/ais/${p.slug}.${p.ext}`; });

export function drawPlayers(count) {
  const pool = [...PLAYERS];
  const out = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}
