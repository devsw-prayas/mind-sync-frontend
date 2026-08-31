import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClinicianSidebar } from '../components/ClinicianSidebar';
import { Loading, ErrorState } from '../components/Loading';
import { useApi } from '../hooks/useApi';
import { api } from '../api/endpoints';

const TONE = {
  error: 'bg-error-container/50 text-error',
  sage: 'bg-sage-status/20 text-sage-status',
  teal: 'bg-mindsync-teal/10 text-mindsync-teal',
};
const DOT = { error: 'bg-error', sage: 'bg-sage-status', teal: 'bg-mindsync-teal' };

// Hospital account: patients assigned to this hospital.
export const ClinicalPortal = () => {
  const { setActiveTab, setSelectedPatientId } = useApp();
  const [q, setQ] = useState('');
  const { data: profile } = useApi(() => api.clinic.profile(), []);
  const { data: patients, loading, error, reload } = useApi(() => api.clinic.patients(), []);

  const open = (id) => { setSelectedPatientId(id); setActiveTab('patient-view'); };
  const rows = (patients || []).filter(
    (p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase())
  );
  const needsReview = (patients || []).filter((p) => p.tone === 'error').length;

  return (
    <div className="font-body-md text-body-md flex min-h-screen bg-background">
      <ClinicianSidebar active="clinical" hospitalName={profile?.name} />

      <main className="flex-1 md:ml-64 p-4 md:p-10 flex flex-col gap-8 max-w-[1280px] mx-auto w-full">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h2 className="text-display-lg font-display-lg text-on-surface">Patients</h2>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">
              {patients ? `${patients.length} people assigned` : 'Loading roster'}
              {profile ? ` to ${profile.name} · ${profile.unit}` : ''}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            {needsReview > 0 && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-error-container/40 text-error text-label-sm font-label-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-error"></span> {needsReview} need review
              </span>
            )}
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold border-2 border-white shadow-soft">DR</div>
          </div>
        </header>

        <div className="bg-surface-container-lowest rounded-xl shadow-ultra-soft border border-border-light">
          <div className="flex justify-between items-center p-6 border-b border-border-light">
            <h3 className="text-headline-md font-headline-md text-on-surface">Assigned Roster</h3>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} className="pl-10 pr-4 py-2 bg-surface-container-low rounded-lg border-transparent focus:border-mindsync-teal focus:ring-1 focus:ring-mindsync-teal outline-none text-label-md w-64" placeholder="Search patients..." />
            </div>
          </div>

          {loading && <Loading label="Loading patients…" />}
          {error && <ErrorState error={error} onRetry={reload} />}

          {patients && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-label-md font-label-md text-on-surface-variant border-b border-border-light">
                  <th className="py-3 px-6 font-semibold">Patient</th>
                  <th className="py-3 px-6 font-semibold hidden md:table-cell">Condition</th>
                  <th className="py-3 px-6 font-semibold">Status</th>
                  <th className="py-3 px-6 font-semibold hidden sm:table-cell">Last Sync</th>
                  <th className="py-3 px-6 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md">
                {rows.map((p) => (
                  <tr key={p.id} className="border-b border-border-light last:border-0 hover:bg-surface-container-low/50 transition-colors cursor-pointer" onClick={() => open(p.id)}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center font-label-md font-bold text-mindsync-teal">{p.initials}</div>
                        <div><p className="font-semibold text-on-surface">{p.name}</p><p className="text-label-sm font-label-sm text-on-surface-variant">ID: {p.id}</p></div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant hidden md:table-cell">{p.dx}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold ${TONE[p.tone]}`}>
                        <span className={`w-2 h-2 rounded-full ${DOT[p.tone]}`}></span> {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-on-surface-variant text-label-sm font-label-sm hidden sm:table-cell">{p.lastSync}</td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={(e) => { e.stopPropagation(); open(p.id); }} className="text-mindsync-teal hover:text-mindsync-teal/80 font-label-md font-semibold">Open</button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={5} className="py-10 text-center text-on-surface-variant text-label-md">No patients match “{q}”.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};
