import { useCallback, useState } from 'react';
import { drawPrize, ovrFor } from '../config/prizes.js';
import { drawPlayers } from '../config/players.js';

const FILLERS_PER_PACK = 4;

// State machine: 'idle' → 'opening' → 'idle'
// Builds a deck of FILLERS_PER_PACK random nostalgic players plus
// one randomly-drawn prize card at the end (the walkout).
export function usePackOpen() {
  const [phase, setPhase] = useState('idle');
  const [deck, setDeck] = useState([]);
  const [history, setHistory] = useState([]);

  const open = useCallback(() => {
    const fillers = drawPlayers(FILLERS_PER_PACK);
    const prize = drawPrize();
    const prizeCard = {
      ...prize,
      ovr: ovrFor(prize.tier),
      isPrize: true,
    };
    setDeck([...fillers, prizeCard]);
    setPhase('opening');
  }, []);

  const finish = useCallback(() => {
    const prize = deck[deck.length - 1];
    if (prize) setHistory((h) => [prize, ...h].slice(0, 12));
    setPhase('idle');
    setDeck([]);
  }, [deck]);

  return { phase, deck, history, open, finish };
}
