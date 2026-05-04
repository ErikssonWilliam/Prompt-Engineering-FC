// ── Formations + position chemistry ──────────────────────────────────────
// Each formation has 11 slots positioned on a 0-100 pitch grid where
// y=0 is the attacking edge (top) and y=100 is the goal-line (bottom).
// `pos` is the slot's "true" position used to score chemistry against the
// player placed there.
// ────────────────────────────────────────────────────────────────────────

export const POSITION_CHEM = {
  GK:  { accepts: ['GK'],  partial: [] },
  CB:  { accepts: ['CB'],  partial: ['LB', 'RB', 'CDM'] },
  LB:  { accepts: ['LB'],  partial: ['CB', 'LM', 'LWB'] },
  RB:  { accepts: ['RB'],  partial: ['CB', 'RM', 'RWB'] },
  CDM: { accepts: ['CDM'], partial: ['CM', 'CB'] },
  CM:  { accepts: ['CM'],  partial: ['CDM', 'CAM'] },
  CAM: { accepts: ['CAM'], partial: ['CM', 'CF'] },
  LM:  { accepts: ['LM'],  partial: ['LW', 'LB', 'CM'] },
  RM:  { accepts: ['RM'],  partial: ['RW', 'RB', 'CM'] },
  LW:  { accepts: ['LW'],  partial: ['LM', 'CF', 'ST'] },
  RW:  { accepts: ['RW'],  partial: ['RM', 'CF', 'ST'] },
  ST:  { accepts: ['ST'],  partial: ['CF', 'LW', 'RW'] },
  CF:  { accepts: ['CF'],  partial: ['ST', 'CAM'] },
};

export function chemFor(slotPos, playerPos) {
  if (!slotPos || !playerPos) return 0;
  const rule = POSITION_CHEM[slotPos];
  if (!rule) return 0;
  if (rule.accepts.includes(playerPos)) return 3;
  if (rule.partial.includes(playerPos)) return 1;
  return 0;
}

export const FORMATIONS = {
  '4-3-3': [
    { id: 's0',  pos: 'GK',  x: 50, y: 92 },
    { id: 's1',  pos: 'LB',  x: 12, y: 72 },
    { id: 's2',  pos: 'CB',  x: 35, y: 76 },
    { id: 's3',  pos: 'CB',  x: 65, y: 76 },
    { id: 's4',  pos: 'RB',  x: 88, y: 72 },
    { id: 's5',  pos: 'CM',  x: 22, y: 48 },
    { id: 's6',  pos: 'CM',  x: 50, y: 52 },
    { id: 's7',  pos: 'CM',  x: 78, y: 48 },
    { id: 's8',  pos: 'LW',  x: 14, y: 18 },
    { id: 's9',  pos: 'ST',  x: 50, y: 14 },
    { id: 's10', pos: 'RW',  x: 86, y: 18 },
  ],
  '4-4-2': [
    { id: 's0',  pos: 'GK',  x: 50, y: 92 },
    { id: 's1',  pos: 'LB',  x: 12, y: 72 },
    { id: 's2',  pos: 'CB',  x: 35, y: 76 },
    { id: 's3',  pos: 'CB',  x: 65, y: 76 },
    { id: 's4',  pos: 'RB',  x: 88, y: 72 },
    { id: 's5',  pos: 'LM',  x: 12, y: 46 },
    { id: 's6',  pos: 'CM',  x: 38, y: 50 },
    { id: 's7',  pos: 'CM',  x: 62, y: 50 },
    { id: 's8',  pos: 'RM',  x: 88, y: 46 },
    { id: 's9',  pos: 'ST',  x: 35, y: 16 },
    { id: 's10', pos: 'ST',  x: 65, y: 16 },
  ],
  '4-2-3-1': [
    { id: 's0',  pos: 'GK',  x: 50, y: 92 },
    { id: 's1',  pos: 'LB',  x: 12, y: 74 },
    { id: 's2',  pos: 'CB',  x: 35, y: 78 },
    { id: 's3',  pos: 'CB',  x: 65, y: 78 },
    { id: 's4',  pos: 'RB',  x: 88, y: 74 },
    { id: 's5',  pos: 'CDM', x: 35, y: 58 },
    { id: 's6',  pos: 'CDM', x: 65, y: 58 },
    { id: 's7',  pos: 'CAM', x: 18, y: 32 },
    { id: 's8',  pos: 'CAM', x: 50, y: 36 },
    { id: 's9',  pos: 'CAM', x: 82, y: 32 },
    { id: 's10', pos: 'ST',  x: 50, y: 12 },
  ],
  '3-5-2': [
    { id: 's0',  pos: 'GK',  x: 50, y: 92 },
    { id: 's1',  pos: 'CB',  x: 28, y: 76 },
    { id: 's2',  pos: 'CB',  x: 50, y: 80 },
    { id: 's3',  pos: 'CB',  x: 72, y: 76 },
    { id: 's4',  pos: 'LM',  x: 8,  y: 50 },
    { id: 's5',  pos: 'CM',  x: 30, y: 56 },
    { id: 's6',  pos: 'CM',  x: 50, y: 50 },
    { id: 's7',  pos: 'CM',  x: 70, y: 56 },
    { id: 's8',  pos: 'RM',  x: 92, y: 50 },
    { id: 's9',  pos: 'ST',  x: 35, y: 14 },
    { id: 's10', pos: 'ST',  x: 65, y: 14 },
  ],
};

export const FORMATION_NAMES = Object.keys(FORMATIONS);
export const DEFAULT_FORMATION = '4-3-3';
export const BENCH_SIZE = 7;
export const XI_MAX_CHEM = 33; // 11 slots × 3
