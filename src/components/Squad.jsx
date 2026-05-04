import React, { useMemo, useState } from 'react';
import { Card } from './Card.jsx';
import { useDrag } from '../hooks/useDrag.js';
import {
  FORMATIONS,
  FORMATION_NAMES,
  BENCH_SIZE,
  XI_MAX_CHEM,
  chemFor,
} from '../config/formations.js';

// Squad screen: pitch with formation slots, bench, and a click-to-place
// picker drawer. Out-of-position drops chemistry à la FUT — the player can
// still be placed, but their chem stars (and the team total) take a hit.
export function Squad({
  players, prizes, team,
  onPlace, onClear, onRemoveBench, onSetFormation, onReset,
}) {
  const [picker, setPicker] = useState(null);
  const slots = FORMATIONS[team.formation] ?? FORMATIONS['4-3-3'];
  const { drag, startDrag, wasDragged } = useDrag({ onDrop: onPlace });

  const byName = useMemo(() => {
    const map = {};
    for (const { card, count } of Object.values(players)) {
      map[card.name] = { ...card, count };
    }
    return map;
  }, [players]);

  const collection = useMemo(() => {
    return Object.values(byName).sort((a, b) =>
      b.ovr - a.ovr || a.name.localeCompare(b.name)
    );
  }, [byName]);

  const chemBySlot = useMemo(() => {
    const out = {};
    for (const s of slots) {
      const name = team.xi[s.id];
      if (!name || !byName[name]) { out[s.id] = null; continue; }
      out[s.id] = chemFor(s.pos, byName[name].position);
    }
    return out;
  }, [slots, team.xi, byName]);

  const totalChem = Object.values(chemBySlot).reduce((s, c) => s + (c ?? 0), 0);
  const xiCount = Object.values(team.xi).filter((n) => n && byName[n]).length;
  const xiCards = slots.map((s) => byName[team.xi[s.id]]).filter(Boolean);
  const xiAvg = xiCards.length
    ? Math.round(xiCards.reduce((s, c) => s + c.ovr, 0) / xiCards.length)
    : 0;

  if (collection.length === 0) {
    return (
      <div className="squad squad--empty">
        <div className="squad__empty-title">Your squad is empty.</div>
        <div className="squad__empty-sub">Open packs to collect players.</div>
      </div>
    );
  }

  const placedSet = new Set([...Object.values(team.xi), ...team.bench].filter(Boolean));

  function placementOf(name) {
    for (const s of slots) if (team.xi[s.id] === name) return { kind: 'xi', slotId: s.id };
    if (team.bench.includes(name)) return { kind: 'bench' };
    return null;
  }

  return (
    <div className="squad">
      <div className="squad__stats">
        <Stat label="Players" value={collection.length} />
        <Stat label="XI rating" value={xiAvg} />
        <Stat label="Prizes" value={prizes.length} />
        <button
          type="button"
          className="squad__reset"
          onClick={() => {
            if (confirm('Reset your collection? This cannot be undone.')) onReset();
          }}
        >Reset</button>
      </div>

      <div className="formation-bar">
        <div className="formation-bar__group">
          <span className="formation-bar__label">Formation</span>
          <div className="formation-bar__tabs">
            {FORMATION_NAMES.map((n) => (
              <button
                key={n}
                type="button"
                className={`formation-tab ${team.formation === n ? 'formation-tab--active' : ''}`}
                onClick={() => onSetFormation(n)}
              >{n}</button>
            ))}
          </div>
        </div>
        <ChemMeter total={totalChem} max={XI_MAX_CHEM} count={xiCount} />
      </div>

      <div className="pitch">
        <div className="pitch__lines" aria-hidden="true">
          <div className="pitch__halfway" />
          <div className="pitch__circle" />
          <div className="pitch__box pitch__box--bottom" />
          <div className="pitch__box pitch__box--top" />
          <div className="pitch__spot pitch__spot--top" />
          <div className="pitch__spot pitch__spot--bottom" />
        </div>
        {slots.map((s) => {
          const name = team.xi[s.id];
          const card = name ? byName[name] : null;
          const chem = chemBySlot[s.id];
          const isDropActive = drag?.target?.kind === 'xi' && drag.target.slotId === s.id;
          const isDragSource = drag?.name === name;
          return (
            <button
              key={s.id}
              type="button"
              className={[
                'pitch__slot',
                isDropActive ? 'pitch__slot--drop-active' : '',
                isDragSource ? 'pitch__slot--dragging' : '',
              ].join(' ')}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                touchAction: card ? 'none' : 'auto',
              }}
              data-drop-target={JSON.stringify({ kind: 'xi', slotId: s.id })}
              onPointerDown={(e) => { if (card) startDrag(e, card.name); }}
              onClick={() => {
                if (wasDragged()) return;
                setPicker({ kind: 'xi', slotId: s.id, slotPos: s.pos });
              }}
            >
              {card ? (
                <SlotFilled card={card} chem={chem} />
              ) : (
                <SlotEmpty pos={s.pos} />
              )}
            </button>
          );
        })}
      </div>

      <div className="bench">
        <div className="bench__head">
          <span>Bench</span>
          <span className="bench__count">{team.bench.length}/{BENCH_SIZE}</span>
        </div>
        <div className="bench__row">
          {Array.from({ length: BENCH_SIZE }).map((_, i) => {
            const name = team.bench[i];
            const card = name ? byName[name] : null;
            const isDropActive = drag?.target?.kind === 'bench' && drag.target.index === i;
            const isDragSource = drag?.name === name;
            return (
              <button
                key={i}
                type="button"
                className={[
                  'bench__slot',
                  isDropActive ? 'bench__slot--drop-active' : '',
                  isDragSource ? 'bench__slot--dragging' : '',
                ].join(' ')}
                style={{ touchAction: card ? 'none' : 'auto' }}
                data-drop-target={JSON.stringify({ kind: 'bench', index: i })}
                onPointerDown={(e) => { if (card) startDrag(e, card.name); }}
                onClick={() => {
                  if (wasDragged()) return;
                  setPicker({ kind: 'bench', index: i });
                }}
              >
                {card ? <Card data={card} compact /> : <SlotEmpty bench />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="collection">
        <div className="collection__head">Collection</div>
        <div className="collection__grid">
          {collection.map((p) => {
            const at = placementOf(p.name);
            const isDragSource = drag?.name === p.name;
            return (
              <div
                key={p.name}
                className={`collection__cell ${isDragSource ? 'collection__cell--dragging' : ''}`}
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => startDrag(e, p.name)}
              >
                <Card data={p} compact />
                {p.count > 1 && <div className="collection__count">×{p.count}</div>}
                {at && (
                  <div className={`collection__badge collection__badge--${at.kind}`}>
                    {at.kind === 'xi' ? 'XI' : 'Bench'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {drag && byName[drag.name] && (
        <div
          className="drag-ghost"
          style={{ left: drag.x, top: drag.y }}
          aria-hidden="true"
        >
          <Card data={byName[drag.name]} compact />
        </div>
      )}

      {picker && (
        <Picker
          target={picker}
          collection={collection}
          placedSet={placedSet}
          onPick={(name) => { onPlace(name, picker); setPicker(null); }}
          onClear={() => {
            if (picker.kind === 'xi') onClear(picker.slotId);
            else if (picker.kind === 'bench' && team.bench[picker.index]) {
              onRemoveBench(team.bench[picker.index]);
            }
            setPicker(null);
          }}
          onClose={() => setPicker(null)}
          isFilled={picker.kind === 'xi'
            ? !!team.xi[picker.slotId]
            : !!team.bench[picker.index]}
        />
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

function ChemMeter({ total, max, count }) {
  const pct = max ? Math.round((total / max) * 100) : 0;
  const color = pct >= 80 ? '#3ee08a' : pct >= 50 ? '#ffd56b' : '#ff7a7a';
  return (
    <div className="chem">
      <div className="chem__head">
        <span className="chem__label">Chemistry</span>
        <span className="chem__value" style={{ color }}>{total}/{max}</span>
      </div>
      <div className="chem__bar">
        <div className="chem__fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="chem__sub">{count}/11 placed</div>
    </div>
  );
}

function SlotEmpty({ pos, bench }) {
  return (
    <div className={`slot-empty ${bench ? 'slot-empty--bench' : ''}`}>
      <div className="slot-empty__plus">+</div>
      {pos && <div className="slot-empty__pos">{pos}</div>}
    </div>
  );
}

function SlotFilled({ card, chem }) {
  const cls = chem === 3 ? 'slot-chem--full'
            : chem === 1 ? 'slot-chem--partial'
            : 'slot-chem--off';
  return (
    <div className={`slot-filled ${cls}`}>
      <Card data={card} compact />
      <div className="slot-chem">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`chem-dot ${i < chem ? 'chem-dot--on' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

function Picker({ target, collection, placedSet, onPick, onClear, onClose, isFilled }) {
  const slotPos = target.kind === 'xi' ? target.slotPos : null;
  const title = slotPos ? `Pick for ${slotPos}` : 'Pick for bench';

  const sorted = useMemo(() => {
    if (!slotPos) return collection;
    return [...collection].sort((a, b) => {
      const ca = chemFor(slotPos, a.position);
      const cb = chemFor(slotPos, b.position);
      if (cb !== ca) return cb - ca;
      return b.ovr - a.ovr;
    });
  }, [collection, slotPos]);

  return (
    <div className="picker" onClick={onClose}>
      <div className="picker__panel" onClick={(e) => e.stopPropagation()}>
        <div className="picker__head">
          <h3>{title}</h3>
          <button type="button" className="picker__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        {isFilled && (
          <button type="button" className="picker__clear" onClick={onClear}>
            Empty this slot
          </button>
        )}
        <div className="picker__list">
          {sorted.map((c) => {
            const chem = slotPos ? chemFor(slotPos, c.position) : null;
            const placed = placedSet.has(c.name);
            return (
              <button
                key={c.name}
                type="button"
                className="picker__row"
                onClick={() => onPick(c.name)}
              >
                <span className={`picker__ovr picker__ovr--${c.tier}`}>{c.ovr}</span>
                <span className="picker__pos">{c.position}</span>
                <span className="picker__name">{c.name}</span>
                {chem !== null && (
                  <span className={`picker__chem picker__chem--${chem}`}>
                    {[0,1,2].map((i) => (
                      <span key={i} className={`chem-dot ${i < chem ? 'chem-dot--on' : ''}`} />
                    ))}
                  </span>
                )}
                {placed && <span className="picker__placed">in team</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
