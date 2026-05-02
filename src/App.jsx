import React, { useState } from 'react';
import { Pack } from './components/Pack.jsx';
import { CardReveal } from './components/CardReveal.jsx';
import { Squad } from './components/Squad.jsx';
import { Nav } from './components/Nav.jsx';
import { usePackOpen } from './hooks/usePackOpen.js';
import { useCollection } from './hooks/useCollection.js';
import { PACK } from './config/packs.js';
import './App.css';

export default function App() {
  const [tab, setTab] = useState('packs');
  const collection = useCollection();
  const { phase, deck, pack, open, finish } = usePackOpen({
    onComplete: collection.addPack,
  });

  const squadCount = Object.keys(collection.players).length;

  return (
    <div className="app">
      <div className="bg">
        <div className="bg__blob bg__blob--1" />
        <div className="bg__blob bg__blob--2" />
        <div className="bg__blob bg__blob--3" />
        <div className="bg__grid" />
      </div>

      <header className="header">
        <Nav active={tab} onChange={setTab} squadCount={squadCount} />
      </header>

      <main className="main">
        {tab === 'packs' && phase === 'idle' && (
          <Pack onOpen={() => open(PACK)} busy={false} />
        )}

        {tab === 'packs' && phase === 'opening' && deck.length > 0 && (
          <CardReveal cards={deck} packTier={pack?.tier} onDone={finish} />
        )}

        {tab === 'squad' && (
          <Squad
            players={collection.players}
            prizes={collection.prizes}
            onReset={collection.reset}
          />
        )}
      </main>

      <footer className="footer">liuais.com</footer>
    </div>
  );
}
