// Downloads each player's sofifa.com portrait to /public/players/<id>.png.
// Run once after editing src/config/players.js.
//
//   npm run fetch-images
//
// Idempotent — already-downloaded files are skipped. Failures are reported
// at the end so you can fix the sofifaId or fifaVersion and re-run.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PLAYERS } from '../src/config/players.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public', 'players');
const SIZE = 240;

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

function url(id, ver) {
  const padded = String(id).padStart(6, '0');
  return `https://cdn.sofifa.net/players/${padded.slice(0, 3)}/${padded.slice(3)}/${ver}_${SIZE}.png`;
}

await mkdir(OUT, { recursive: true });

const failures = [];
let downloaded = 0;
let skipped = 0;

for (const p of PLAYERS) {
  if (!p.sofifaId) { failures.push({ name: p.name, reason: 'no sofifaId' }); continue; }
  const out = resolve(OUT, `${p.sofifaId}.png`);
  if (await exists(out)) { skipped++; continue; }
  const u = url(p.sofifaId, p.fifaVersion ?? 17);
  try {
    const r = await fetch(u);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 5000) throw new Error('placeholder image (too small)');
    await writeFile(out, buf);
    console.log(`✓ ${p.name.padEnd(14)} ${p.sofifaId} (${Math.round(buf.length / 1024)}KB)`);
    downloaded++;
  } catch (e) {
    failures.push({ name: p.name, id: p.sofifaId, reason: e.message });
  }
}

console.log(`\n${downloaded} downloaded, ${skipped} skipped, ${failures.length} failed`);
if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) console.log(`  - ${f.name} ${f.id ?? ''} → ${f.reason}`);
  process.exitCode = 1;
}
