import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

// Top nav for the signed-in individual pages (Dashboard, Analytics, Devices).
const LINKS = [
  ['dashboard', 'Dashboard'],
  ['analytics', 'Analytics'],
  ['wearables', 'Devices'],
];

export const AppNav = ({ active }) => {
  const { setActiveTab, logout } = useApp();
  const [menu, setMenu] = useState(false);
  return (
    <nav className="bg-surface-container-lowest/80 backdrop-blur-md border-b border-border-light fixed top-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-[88px]">
      <div className="flex items-center gap-stack-md">
        <span className="text-headline-md font-headline-md text-primary font-bold">MindSync</span>
        <div className="hidden md:flex gap-gutter">
          {LINKS.map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                active === tab
                  ? 'text-label-md font-label-md text-primary border-b-2 border-primary pb-1 transition-opacity'
                  : 'text-label-md font-label-md text-on-surface-variant hover:text-primary transition-colors'
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-stack-md">
        <div className="relative hidden md:block">
          <input className="bg-surface border border-border-light rounded-full py-2.5 pl-4 pr-10 text-body-md font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-64" placeholder="Search..." type="text" />
          <span className="material-symbols-outlined absolute right-4 top-3 text-outline">search</span>
        </div>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="relative">
          <button onClick={() => setMenu((v) => !v)} className="flex items-center gap-unit cursor-pointer hover:opacity-80 transition-opacity">
            <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center border border-outline-variant text-label-md font-bold">A</span>
            <span className="text-label-md font-label-md hidden md:block text-on-surface ml-2">Alex</span>
            <span className="material-symbols-outlined text-outline text-[18px]">expand_more</span>
          </button>
          {menu && (
            <div className="absolute right-0 mt-2 w-44 bg-surface-container-lowest border border-border-light rounded-lg shadow-ultra-soft py-1 z-50">
              <button onClick={() => { setMenu(false); setActiveTab('wearables'); }} className="w-full text-left px-4 py-2 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-low">Devices</button>
              <button onClick={() => { setMenu(false); logout(); }} className="w-full text-left px-4 py-2 text-label-md font-label-md text-error hover:bg-surface-container-low">Log out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
