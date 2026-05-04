import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_FORMATION, FORMATIONS, BENCH_SIZE } from '../config/formations.js';

const KEY = 'liuais-walkout-collection-v1';

const emptyTeam = () => ({
  formation: DEFAULT_FORMATION,
  xi: {},      // slotId -> playerName
  bench: [],   // playerNames in placement order
});

// Persists the user's pulled players, prize history, and assembled team
// (formation + XI + bench) in localStorage.
export function useCollection() {
  const [players, setPlayers] = useState({});
  const [prizes, setPrizes] = useState([]);
  const [team, setTeam] = useState(emptyTeam);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlayers(data.players ?? {});
        setPrizes(data.prizes ?? []);
        if (data.team) setTeam({ ...emptyTeam(), ...data.team });
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ players, prizes, team }));
    } catch {}
  }, [players, prizes, team, hydrated]);

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
    setTeam(emptyTeam());
  }, []);

  // Place a player at a target. Removes them from any current spot.
  // XI→XI placements swap; bench-or-unplaced→XI bumps the previous occupant
  // to bench (or to nowhere if bench is full).
  const placePlayer = useCallback((playerName, target) => {
    setTeam((t) => {
      const xi = { ...t.xi };
      const bench = [...t.bench];

      let oldSlot = null;
      for (const sid in xi) {
        if (xi[sid] === playerName) { oldSlot = sid; delete xi[sid]; break; }
      }
      const oldBenchIdx = bench.indexOf(playerName);
      if (oldBenchIdx >= 0) bench.splice(oldBenchIdx, 1);

      if (target.kind === 'xi') {
        const bumped = xi[target.slotId];
        xi[target.slotId] = playerName;
        if (bumped && bumped !== playerName) {
          if (oldSlot && oldSlot !== target.slotId) {
            xi[oldSlot] = bumped;
          } else if (bench.length < BENCH_SIZE) {
            bench.push(bumped);
          }
        }
      } else if (target.kind === 'bench') {
        if (bench.length < BENCH_SIZE) bench.push(playerName);
      }
      return { ...t, xi, bench };
    });
  }, []);

  const clearSlot = useCallback((slotId) => {
    setTeam((t) => {
      const xi = { ...t.xi };
      delete xi[slotId];
      return { ...t, xi };
    });
  }, []);

  const removeFromBench = useCallback((playerName) => {
    setTeam((t) => ({ ...t, bench: t.bench.filter((n) => n !== playerName) }));
  }, []);

  // Switch formation; preserve XI by index where slot lists align.
  const setFormation = useCallback((name) => {
    setTeam((t) => {
      if (!FORMATIONS[name] || name === t.formation) return { ...t, formation: name };
      const oldSlots = FORMATIONS[t.formation] ?? [];
      const newSlots = FORMATIONS[name];
      const newXi = {};
      newSlots.forEach((s, i) => {
        const oldId = oldSlots[i]?.id;
        if (oldId && t.xi[oldId]) newXi[s.id] = t.xi[oldId];
      });
      return { ...t, formation: name, xi: newXi };
    });
  }, []);

  return {
    players, prizes, team,
    addPack, reset,
    placePlayer, clearSlot, removeFromBench, setFormation,
  };
}
