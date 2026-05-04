import React, { useState } from 'react';

// FIFA-style card. Tier controls colors. `revealed` flips the card open.
// `walkout` adds the dramatic glow + scale used for the prize reveal.
// Tries to load a real player image; falls back to emoji on error.
export function Card({ data, revealed = true, walkout = false, onClick, compact = false }) {
  const { name, position, nation, club, ovr, tier, emoji, image } = data;
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = image && !imgFailed;

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'card',
        `card--${tier}`,
        revealed ? 'card--revealed' : 'card--hidden',
        walkout ? 'card--walkout' : '',
        compact ? 'card--compact' : '',
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
            {showImage ? (
              <img
                src={image}
                alt=""
                className="card__img"
                onError={() => setImgFailed(true)}
                loading="lazy"
                draggable={false}
              />
            ) : (
              <span className="card__emoji">{emoji ?? '⚽'}</span>
            )}
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
