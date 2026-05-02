import React from 'react';

const TABS = [
  { id: 'packs', label: 'Packs' },
  { id: 'squad', label: 'Squad' },
];

export function Nav({ active, onChange, squadCount }) {
  return (
    <nav className="nav" role="tablist">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          className={`nav__tab ${active === t.id ? 'nav__tab--active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
          {t.id === 'squad' && squadCount > 0 && (
            <span className="nav__badge">{squadCount}</span>
          )}
        </button>
      ))}
    </nav>
  );
}
