import React from 'react';
import { useApp } from '../context/AppContext';

// Minimal public nav (Home, Pricing) — logo + one link + Log in. No app menu.
export const MarketingNav = ({ active }) => {
  const { setActiveTab } = useApp();
  return (
    <nav className="bg-surface w-full top-0 sticky border-b border-outline-variant z-50">
      <div className="flex justify-between items-center h-20 px-container-padding-mobile md:px-container-padding-desktop max-w-[1280px] mx-auto w-full">
        <button onClick={() => setActiveTab('home')} className="font-display-lg text-headline-md font-bold text-mindsync-teal">MindSync</button>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('pricing')}
            className={
              active === 'pricing'
                ? 'text-primary font-bold border-b-2 border-primary transition-colors hidden sm:block'
                : 'text-on-surface-variant hover:text-primary transition-colors hidden sm:block'
            }
          >
            Pricing
          </button>
          <button onClick={() => setActiveTab('login')} className="bg-mindsync-teal text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-primary transition-colors">
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
};
