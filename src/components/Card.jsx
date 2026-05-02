import React from 'react';

// FIFA-style card. Tier controls colors. `revealed` flips the card open.
// `walkout` adds the dramatic glow + scale used for the prize reveal.
export function Card({ data, revealed = true, walkout = false, onClick }) {
  const { name, position, nation, club, ovr, tier, emoji } = data;

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'card',
        `card--${tier}`,
        revealed ? 'card--revealed' : 'card--hidden',
        walkout ? 'card--walkout' : '',
      ].join(' ')}
      aria-label={`${name} ${ovr}`}
    >
      <div className="card__inner">
        <div className="card__face card__face--back">
          <div className="card__back-logo">AIS</div>
        </div>

        <div className="card__face card__face--front">
          <div className="card__top">
            <div className="card__ovr">{ovr}</div>
            <div className="card__pos">{position}</div>
          </div>

          <div className="card__art" aria-hidden="true">
            <span className="card__emoji">{emoji ?? '⚽'}</span>
          </div>

          <div className="card__name">{name}</div>

          <div className="card__bottom">
            <span className="card__nation">{nation}</span>
            {club && <span className="card__club">{club}</span>}
          </div>

          <div className="card__shine" aria-hidden="true" />
        </div>
      </div>
    </button>
  );
}
