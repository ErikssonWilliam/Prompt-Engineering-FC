import React, { useMemo, useState } from 'react';
import { Card } from './Card.jsx';

// Squad view: shows every player the user has pulled, deduplicated and
// sorted by OVR. Click a player to add to the starting XI; click again to
// remove. The XI panel is purely cosmetic — it does not affect drops.
export function Squad({ players, prizes, onReset }) {
  const list = useMemo(() => {
    return Object.values(players)
      .map(({ card, count }) => ({ ...card, count }))
      .sort((a, b) => b.ovr - a.ovr || a.name.localeCompare(b.name));
  }, [players]);

  const [xi, setXi] = useState([]);
  const totalPlayers = list.length;
  const totalPulls = list.reduce((s, p) => s + p.count, 0);
  const avgOvr = list.length
    ? Math.round(list.reduce((s, p) => s + p.ovr, 0) / list.length)
    : 0;

  function toggleXi(name) {
    setXi((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= 11) return prev;
      return [...prev, name];
    });
  }

  if (list.length === 0) {
    return (
      <div className="squad squad--empty">
        <div className="squad__empty-title">Your squad is empty.</div>
        <div className="squad__empty-sub">Open packs to collect players.</div>
      </div>
    );
  }

  const xiCards = xi.map((n) => list.find((p) => p.name === n)).filter(Boolean);
  const xiAvg = xiCards.length
    ? Math.round(xiCards.reduce((s, p) => s + p.ovr, 0) / xiCards.length)
    : 0;

  return (
    <div className="squad">
      <div className="squad__stats">
        <Stat label="Players" value={totalPlayers} />
        <Stat label="Total pulls" value={totalPulls} />
        <Stat label="Avg OVR" value={avgOvr} />
        <Stat label="Prizes won" value={prizes.length} />
        <button
          type="button"
          className="squad__reset"
          onClick={() => {
            if (confirm('Reset your collection? This cannot be undone.')) onReset();
          }}
        >
          Reset
        </button>
      </div>

      {xi.length > 0 && (
        <div className="squad__xi">
          <div className="squad__xi-head">
            <span>Starting XI ({xi.length}/11)</span>
            <span className="squad__xi-rating">Rating · {xiAvg}</span>
          </div>
          <div className="squad__xi-list">
            {xiCards.map((p) => (
              <span key={p.name} className={`xi-chip xi-chip--${p.tier}`}>
                {p.ovr} {p.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="squad__hint">Tap a card to add it to your XI.</div>

      <div className="squad__grid">
        {list.map((p) => (
          <div
            key={p.name}
            className={`squad__slot ${xi.includes(p.name) ? 'squad__slot--picked' : ''}`}
            onClick={() => toggleXi(p.name)}
          >
            <Card data={p} compact />
            {p.count > 1 && <div className="squad__count">×{p.count}</div>}
          </div>
        ))}
      </div>
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
