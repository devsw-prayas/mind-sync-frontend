import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

// No navbar — this is the gate. Pick an account type to continue (mock auth).
export const Login = () => {
  const { login, busy, setActiveTab } = useApp();
  const [mode, setMode] = useState('patient'); // patient | clinician
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('demo-password');

  const submit = (e) => {
    e.preventDefault();
    login({ email, password, role: mode });
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <header className="w-full h-20 px-container-padding-mobile md:px-container-padding-desktop flex justify-between items-center max-w-[1280px] mx-auto">
        <button onClick={() => setActiveTab('home')} className="text-headline-md font-headline-md text-mindsync-teal flex items-center gap-unit">
          <span className="material-symbols-outlined filled">psychology</span>
          MindSync
        </button>
        <button onClick={() => setActiveTab('home')} className="text-label-md font-label-md text-on-surface-variant hover:text-mindsync-teal transition-colors">
          Back to site
        </button>
      </header>

      <main className="flex-grow w-full px-container-padding-mobile py-stack-lg max-w-md mx-auto flex flex-col justify-center">
        <div className="text-center mb-stack-lg">
          <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-unit">Sign in to MindSync</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">Choose your account type to continue.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-stack-md">
          {[
            ['patient', 'Individual', 'person', 'alex@example.com'],
            ['clinician', 'Hospital / Clinician', 'medical_services', 'clinician@hospital.org'],
          ].map(([val, label, icon, defEmail]) => (
            <button
              key={val}
              type="button"
              onClick={() => { setMode(val); setEmail(defEmail); }}
              className={
                'flex flex-col items-center gap-2 p-4 rounded-[16px] border transition-all ' +
                (mode === val
                  ? 'border-mindsync-teal bg-mindsync-teal/5 text-mindsync-teal font-semibold'
                  : 'border-border-light bg-surface-container-lowest text-on-surface-variant hover:border-mindsync-teal')
              }
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span className="text-label-md font-label-md text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="bg-surface-container-lowest border border-border-light rounded-[16px] p-6 shadow-sm flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-label-sm font-label-sm text-on-surface-variant">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-warm-grey-bg border border-border-light rounded-lg px-3 py-2.5 text-body-md focus:outline-none focus:border-mindsync-teal focus:ring-1 focus:ring-mindsync-teal transition-all" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-label-sm font-label-sm text-on-surface-variant">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-warm-grey-bg border border-border-light rounded-lg px-3 py-2.5 text-body-md focus:outline-none focus:border-mindsync-teal focus:ring-1 focus:ring-mindsync-teal transition-all" />
          </label>
          <button type="submit" disabled={busy}
            className="mt-2 bg-mindsync-teal text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary transition-colors shadow-sm disabled:opacity-50">
            {busy ? 'Signing in…' : `Continue as ${mode === 'clinician' ? 'Clinician' : 'Individual'}`}
          </button>
          <p className="text-label-sm font-label-sm text-on-surface-variant text-center">Demo build — any credentials work.</p>
        </form>
      </main>
    </div>
  );
};
