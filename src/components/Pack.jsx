import React from 'react';

// Closed pack the user clicks to open. Shimmers when idle; bursts on click.
export function Pack({ onOpen, busy }) {
  return (
    <button
      type="button"
      className={`pack ${busy ? 'pack--busy' : ''}`}
      onClick={onOpen}
      disabled={busy}
      aria-label="Open pack"
    >
      <div className="pack__glow" aria-hidden="true" />
      <div className="pack__face">
        <div className="pack__brand">LiU AI Society</div>
        <div className="pack__title">PACK OPENER</div>
        <div className="pack__divider" />
        <div className="pack__cta">{busy ? 'Opening…' : 'Click to open'}</div>
      </div>
      <div className="pack__sparkle pack__sparkle--1" aria-hidden="true" />
      <div className="pack__sparkle pack__sparkle--2" aria-hidden="true" />
      <div className="pack__sparkle pack__sparkle--3" aria-hidden="true" />
    </button>
  );
}
