import { useCallback, useState } from 'react';
import { drawPrize, ovrFor } from '../config/prizes.js';
import { drawPlayers } from '../config/players.js';

const FILLERS_PER_PACK = 4;

// State machine: 'idle' → 'opening' → 'idle'.
// Builds a deck of filler players plus one prize "walkout" card,
// drawn from the chosen pack's tier distribution.
export function usePackOpen({ onComplete } = {}) {
  const [phase, setPhase] = useState('idle');
  const [deck, setDeck] = useState([]);
  const [pack, setPack] = useState(null);

  const open = useCallback((selectedPack) => {
    const fillers = drawPlayers(FILLERS_PER_PACK);
    const prize = drawPrize(selectedPack);
    const prizeCard = {
      ...prize,
      ovr: ovrFor(prize.tier),
      isPrize: true,
    };
    setDeck([...fillers, prizeCard]);
    setPack(selectedPack);
    setPhase('opening');
  }, []);

  const finish = useCallback(() => {
    if (deck.length && onComplete) onComplete(deck, pack);
    setPhase('idle');
    setDeck([]);
    setPack(null);
  }, [deck, pack, onComplete]);

  return { phase, deck, pack, open, finish };
}
