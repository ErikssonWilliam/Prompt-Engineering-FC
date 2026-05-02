import React from 'react';
import { Pack } from './components/Pack.jsx';
import { CardReveal } from './components/CardReveal.jsx';
import { usePackOpen } from './hooks/usePackOpen.js';
import './App.css';

export default function App() {
  const { phase, deck, history, open, finish } = usePackOpen();

  return (
    <div className="app">
      <div className="bg">
        <div className="bg__blob bg__blob--1" />
        <div className="bg__blob bg__blob--2" />
        <div className="bg__blob bg__blob--3" />
        <div className="bg__grid" />
      </div>

      <header className="header">
        <div className="header__brand">
          <div className="header__logo">AIS</div>
          <div className="header__text">
            <div className="header__org">LiU AI Society</div>
            <div className="header__sub">Pack Opener</div>
          </div>
        </div>
      </header>

      <main className="main">
        {phase === 'idle' && (
          <>
            <Pack onOpen={open} busy={false} />
            <p className="tagline">Open packs. Win snacks. Discover legends.</p>
          </>
        )}

        {phase === 'opening' && deck.length > 0 && (
          <CardReveal cards={deck} onDone={finish} />
        )}
      </main>

      {history.length > 0 && phase === 'idle' && (
        <aside className="history">
          <div className="history__title">Recent pulls</div>
          <ul className="history__list">
            {history.map((p, i) => (
              <li key={i} className={`history__item history__item--${p.tier}`}>
                <span className="history__ovr">{p.ovr}</span>
                <span className="history__name">{p.name}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <footer className="footer">
        liuais.com · made for the lunch crew
      </footer>
    </div>
  );
}
