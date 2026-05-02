import React, { useEffect, useState } from 'react';
import { Card } from './Card.jsx';

// Reveals cards one at a time, last card = prize ("walkout").
// Click anywhere to advance; auto-advances filler cards on a short timer.
export function CardReveal({ cards, onDone }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const isLast = idx === cards.length - 1;

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 120);
    return () => clearTimeout(t);
  }, [idx]);

  // Auto-advance filler cards. Hold on the walkout for the user to click.
  useEffect(() => {
    if (!revealed || isLast) return;
    const t = setTimeout(() => setIdx((i) => i + 1), 1100);
    return () => clearTimeout(t);
  }, [revealed, isLast]);

  function advance() {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    if (isLast) onDone();
    else setIdx((i) => i + 1);
  }

  const current = cards[idx];

  return (
    <div className="reveal" onClick={advance} role="presentation">
      {isLast && revealed && (
        <div className={`reveal__walkout-glow reveal__walkout-glow--${current.tier}`} aria-hidden="true" />
      )}

      <div className="reveal__stage">
        <Card data={current} revealed={revealed} walkout={isLast} />
      </div>

      <div className="reveal__progress" aria-hidden="true">
        {cards.map((_, i) => (
          <span
            key={i}
            className={`reveal__dot ${i < idx ? 'reveal__dot--past' : ''} ${i === idx ? 'reveal__dot--cur' : ''}`}
          />
        ))}
      </div>

      <div className="reveal__hint">
        {isLast && revealed ? 'Click to continue' : revealed ? '' : 'Click to flip'}
      </div>
    </div>
  );
}
