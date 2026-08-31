import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const DEVICES = [
  ['apple', 'Apple Health', 'favorite'],
  ['fitbit', 'Fitbit', 'watch'],
  ['oura', 'Oura', 'radio_button_unchecked'],
  ['garmin', 'Garmin', 'watch'],
  ['whoop', 'Whoop', 'fitness_center'],
  ['google', 'Google Fit', 'directions_walk'],
];

// Dual mode: onboarding (new individual, must link before dashboard) vs
// device management (returning individual, opened from the app).
export const WearablesConnect = () => {
  const { onboarded, completeOnboarding, setActiveTab } = useApp();
  const isOnboarding = !onboarded;
  const [connected, setConnected] = useState({ apple: true });

  const toggle = (id) => setConnected((c) => ({ ...c, [id]: !c[id] }));
  const count = Object.values(connected).filter(Boolean).length;

  const finish = () => (isOnboarding ? completeOnboarding() : setActiveTab('dashboard'));

  return (
    <div className="bg-surface text-on-background min-h-screen flex flex-col font-body-md selection:bg-mindsync-teal selection:text-on-primary">
      <header className="w-full h-20 px-container-padding-mobile md:px-container-padding-desktop flex justify-between items-center max-w-[1280px] mx-auto">
        <button onClick={() => setActiveTab(isOnboarding ? 'home' : 'dashboard')} className="text-headline-md font-headline-md text-mindsync-teal flex items-center gap-unit">
          <span className="material-symbols-outlined filled">psychology</span>
          MindSync
        </button>
        {isOnboarding ? (
          <span className="text-label-sm font-label-sm text-on-surface-variant bg-surface-container rounded-full px-3 py-1">Step 2 of 2 · Link your data</span>
        ) : (
          <button onClick={() => setActiveTab('dashboard')} className="flex items-center gap-unit text-on-surface-variant hover:text-mindsync-teal transition-colors text-label-md font-label-md">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span> Back to dashboard
          </button>
        )}
      </header>

      <main className="flex-grow w-full px-container-padding-mobile py-stack-lg max-w-4xl mx-auto flex flex-col items-center justify-center">
        <div className="text-center mb-stack-lg">
          <h1 className="text-headline-lg-mobile font-headline-lg-mobile md:text-headline-lg md:font-headline-lg text-on-surface mb-unit">
            {isOnboarding ? 'Connect your health data' : 'Linked devices & apps'}
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant max-w-lg mx-auto">
            {isOnboarding
              ? 'Link at least one wearable or health app so MindSync can read continuous 15-minute activity, sleep and heart-rate snapshots.'
              : 'Manage the wearables and health apps feeding your MindSync models.'}
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-stack-md mb-stack-md">
          {DEVICES.map(([id, name, icon]) => {
            const on = !!connected[id];
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={
                  'relative flex flex-col items-center justify-center p-stack-md rounded-[16px] border transition-all duration-300 group ' +
                  (on
                    ? 'border-sage-status bg-[#f0f4f2] text-on-surface shadow-sm'
                    : 'border-border-light bg-surface-container-lowest text-on-surface hover:border-mindsync-teal hover:shadow-sm')
                }
              >
                {on && (
                  <>
                    <div className="absolute w-20 h-20 rounded-full border border-sage-status opacity-30 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                    <div className="absolute w-16 h-16 rounded-full border-2 border-sage-status opacity-50 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] delay-150"></div>
                  </>
                )}
                <span className={'material-symbols-outlined text-[36px] mb-unit z-10 transition-colors ' + (on ? 'text-sage-status filled' : 'text-on-surface-variant group-hover:text-mindsync-teal')}>{icon}</span>
                <span className="text-label-md font-label-md z-10">{name}</span>
                {on ? (
                  <div className="flex items-center gap-unit mt-unit z-10 bg-sage-status text-on-primary px-[12px] py-[4px] rounded-full text-label-sm font-label-sm shadow-sm">
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span> Connected
                  </div>
                ) : (
                  <span className="mt-unit z-10 text-label-sm font-label-sm text-mindsync-teal">Connect</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="w-full max-w-2xl bg-surface-container-lowest border border-border-light p-stack-md rounded-[16px] flex items-center justify-between gap-stack-md mb-stack-lg shadow-sm">
          <div className="flex flex-col gap-unit">
            <div className="flex items-center gap-unit">
              <span className="material-symbols-outlined text-outline">verified_user</span>
              <span className="text-label-md font-label-md text-on-surface">Data sharing consent</span>
            </div>
            <span className="text-body-md font-body-md text-on-surface-variant pl-8">Allow linked data to power my MindSync screening models.</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input defaultChecked className="sr-only peer" type="checkbox" />
            <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-light after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mindsync-teal shadow-inner"></div>
          </label>
        </div>

        <div className="flex items-center gap-4">
          {isOnboarding && (
            <button onClick={completeOnboarding} className="text-label-md font-label-md text-on-surface-variant hover:text-mindsync-teal transition-colors">
              Skip for now
            </button>
          )}
          <button
            onClick={finish}
            disabled={count === 0}
            className="bg-mindsync-teal text-on-primary text-label-md font-label-md px-[40px] py-[16px] rounded-full hover:bg-primary-container transition-colors shadow-sm min-w-[220px] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isOnboarding ? `Continue to dashboard${count ? ` (${count} linked)` : ''}` : 'Done'}
          </button>
        </div>
      </main>
    </div>
  );
};
