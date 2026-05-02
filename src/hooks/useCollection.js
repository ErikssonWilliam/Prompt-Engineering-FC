import { useCallback, useEffect, useState } from 'react';

const KEY = 'liuais-walkout-collection-v1';

// Persists the user's pulled players + prize history in localStorage.
// Players are de-duplicated by name (count tracks how many times pulled).
// Prizes are stored as a flat history (newest first).
export function useCollection() {
  const [players, setPlayers] = useState({});
  const [prizes, setPrizes] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlayers(data.players ?? {});
        setPrizes(data.prizes ?? []);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ players, prizes }));
    } catch {}
  }, [players, prizes, hydrated]);

  const addPack = useCallback((deck, pack) => {
    setPlayers((prev) => {
      const next = { ...prev };
      for (const card of deck) {
        if (card.isPrize) continue;
        const key = card.name;
        if (next[key]) {
          next[key] = { ...next[key], count: next[key].count + 1 };
        } else {
          next[key] = { card, count: 1 };
        }
      }
      return next;
    });
    const prize = deck.find((c) => c.isPrize);
    if (prize) {
      setPrizes((prev) => [
        { ...prize, packId: pack?.id, ts: Date.now() },
        ...prev,
      ].slice(0, 200));
    }
  }, []);

  const reset = useCallback(() => {
    setPlayers({});
    setPrizes([]);
  }, []);

  return { players, prizes, addPack, reset };
}
