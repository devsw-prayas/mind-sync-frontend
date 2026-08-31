import React from 'react';
import { useApp } from '../context/AppContext';

// Clinician sidebar (Patients roster + per-patient drill-down).
export const ClinicianSidebar = ({ active, hospitalName = 'MindSync Pro' }) => {
  const { setActiveTab, logout } = useApp();
  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 p-6 z-40 bg-warm-grey-bg border-r border-border-light shrink-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-mindsync-teal text-on-primary flex items-center justify-center font-bold">
          <span className="material-symbols-outlined filled">psychology</span>
        </div>
        <div>
          <h1 className="text-body-lg font-headline-md font-semibold text-mindsync-teal leading-tight">MindSync Pro</h1>
          <p className="text-label-sm font-label-sm text-secondary">{hospitalName}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <button
          onClick={() => setActiveTab('clinical')}
          className={
            active === 'clinical'
              ? 'flex items-center gap-3 bg-secondary-container text-primary rounded-lg px-4 py-3 text-label-md font-label-md font-semibold text-left'
              : 'flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-high transition-all text-left'
          }
        >
          <span className="material-symbols-outlined filled">group</span>
          <span className="font-label-md text-label-md">Patients</span>
        </button>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-high transition-all" href="#"><span className="material-symbols-outlined">notifications</span> Alerts</a>
        <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:bg-surface-container-high transition-all" href="#"><span className="material-symbols-outlined">assessment</span> Reports</a>
      </div>

      <div className="flex flex-col gap-2 mt-auto border-t border-border-light pt-4">
        <a className="flex items-center gap-3 px-4 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-all" href="#"><span className="material-symbols-outlined">settings</span> Settings</a>
        <button onClick={() => logout()} className="flex items-center gap-3 px-4 py-2 rounded-lg text-secondary hover:bg-surface-container-high transition-all text-left"><span className="material-symbols-outlined">logout</span> Log out</button>
      </div>
    </nav>
  );
};
