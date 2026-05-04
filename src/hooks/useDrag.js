import { useCallback, useRef, useState } from 'react';

// Pointer-event drag system that works for mouse + touch + pen.
// Caller wires `startDrag(e, name)` to pointerdown on draggable cards and
// adds `data-drop-target='<JSON>'` to droppable slots. On a successful drop
// `onDrop(name, target)` fires; tapping without movement falls through so
// the slot's normal onClick still works (gated via `wasDragged()`).
const THRESHOLD_PX = 6;

export function useDrag({ onDrop } = {}) {
  const [drag, setDrag] = useState(null);
  const stateRef = useRef(null);
  const blockClick = useRef(false);

  const startDrag = useCallback((e, name) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    blockClick.current = false;
    const s = {
      name,
      ox: e.clientX,
      oy: e.clientY,
      x: e.clientX,
      y: e.clientY,
      started: false,
      target: null,
    };
    stateRef.current = s;

    function onMove(ev) {
      const cur = stateRef.current;
      if (!cur) return;
      const dx = ev.clientX - cur.ox;
      const dy = ev.clientY - cur.oy;
      if (!cur.started && Math.hypot(dx, dy) < THRESHOLD_PX) return;
      cur.started = true;
      cur.x = ev.clientX;
      cur.y = ev.clientY;

      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const dropEl = el?.closest('[data-drop-target]');
      let target = null;
      if (dropEl) {
        try { target = JSON.parse(dropEl.getAttribute('data-drop-target')); } catch {}
      }
      cur.target = target;
      setDrag({ name: cur.name, x: cur.x, y: cur.y, target });
      ev.preventDefault();
    }

    function teardown() {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onCancel);
    }

    function onUp() {
      const cur = stateRef.current;
      teardown();
      stateRef.current = null;
      setDrag(null);
      if (cur?.started) {
        blockClick.current = true;
        if (cur.target && onDrop) onDrop(cur.name, cur.target);
      }
    }

    function onCancel() {
      teardown();
      stateRef.current = null;
      setDrag(null);
    }

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onCancel);
  }, [onDrop]);

  const wasDragged = useCallback(() => blockClick.current, []);

  return { drag, startDrag, wasDragged };
}
