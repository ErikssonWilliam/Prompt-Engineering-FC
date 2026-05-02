// One-off helper: probes each player's sofifaId across a few FIFA versions,
// reports which one returns a real PNG (>5KB). Use the output to fill in
// `fifaVersion` per player in src/config/players.js.

import { PLAYERS } from '../src/config/players.js';

const VERSIONS = [17, 16, 15, 14, 13, 12, 11, 10];
const SIZE = 240;

function url(id, ver) {
  const padded = String(id).padStart(6, '0');
  return `https://cdn.sofifa.net/players/${padded.slice(0, 3)}/${padded.slice(3)}/${ver}_${SIZE}.png`;
}

async function head(u) {
  try {
    const r = await fetch(u, { method: 'HEAD' });
    if (!r.ok) return 0;
    return Number(r.headers.get('content-length') ?? 0);
  } catch {
    return 0;
  }
}

const results = [];
for (const p of PLAYERS) {
  if (!p.sofifaId) { results.push({ name: p.name, status: 'no-id' }); continue; }
  let best = null;
  for (const v of VERSIONS) {
    const len = await head(url(p.sofifaId, v));
    if (len > 5000) { best = { ver: v, len }; break; }
  }
  if (best) results.push({ name: p.name, id: p.sofifaId, ver: best.ver, kb: Math.round(best.len / 1024) });
  else      results.push({ name: p.name, id: p.sofifaId, status: 'all-versions-failed' });
}

const ok = results.filter((r) => r.ver);
const bad = results.filter((r) => !r.ver);
for (const r of ok)  console.log(`OK  ${r.name.padEnd(14)} id=${r.id} ver=${r.ver} (${r.kb}KB)`);
for (const r of bad) console.log(`BAD ${r.name.padEnd(14)} id=${r.id ?? '-'} ${r.status}`);
console.log(`\n${ok.length} ok / ${bad.length} bad / ${results.length} total`);
