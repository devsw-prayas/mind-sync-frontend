import React from 'react';
import { useApp } from '../context/AppContext';
import { ClinicianSidebar } from '../components/ClinicianSidebar';
import { PersonView } from '../components/PersonView';
import { Loading, ErrorState } from '../components/Loading';
import { useApi } from '../hooks/useApi';
import { api } from '../api/endpoints';

// Clinician drill-down: one patient assigned to this hospital.
export const PatientView = () => {
  const { setActiveTab, selectedPatientId } = useApp();
  const { data: profile } = useApi(() => api.clinic.profile(), []);
  const { data: p, loading, error, reload } = useApi(
    () => api.clinic.patient(selectedPatientId),
    [selectedPatientId]
  );

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex">
      <ClinicianSidebar active="clinical" hospitalName={profile?.name} />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen w-full">
        <header className="min-h-20 py-4 flex items-center px-container-padding-mobile md:px-container-padding-desktop border-b border-border-light bg-surface sticky top-0 z-40 shadow-ultra-soft">
          <div className="max-w-[1280px] mx-auto w-full flex items-center gap-4">
            <button onClick={() => setActiveTab('clinical')} className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors shrink-0">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex-1">
              <button onClick={() => setActiveTab('clinical')} className="text-label-sm font-label-sm text-on-surface-variant hover:text-mindsync-teal">{profile?.name || 'Hospital'} · Patients</button>
              <p className="text-label-md font-label-md text-midnight-navy">{p ? <>{p.name} <span className="text-on-surface-variant font-normal">· {p.dx}</span></> : 'Loading…'}</p>
            </div>
            <div className="hidden sm:flex gap-3">
              <button className="px-5 py-2 rounded-lg border border-border-light text-midnight-navy font-label-md text-label-md hover:bg-surface-variant transition-colors">Export</button>
              <button className="px-5 py-2 rounded-lg bg-mindsync-teal text-white font-label-md text-label-md hover:bg-primary transition-colors">Add Note</button>
            </div>
          </div>
        </header>

        <div className="px-container-padding-mobile md:px-container-padding-desktop py-stack-md max-w-[1280px] mx-auto w-full">
          {loading && <Loading label="Loading patient record…" />}
          {error && <ErrorState error={error} onRetry={reload} />}
          {p && <PersonView person={p} subjectLabel={`ID ${p.id}`} showResilience />}
        </div>
      </main>
    </div>
  );
};
