import React from 'react';
import { AppNav } from '../components/AppNav';
import { SiteFooter } from '../components/SiteFooter';
import { PersonView } from '../components/PersonView';
import { Loading, ErrorState } from '../components/Loading';
import { useApi } from '../hooks/useApi';
import { api } from '../api/endpoints';

// Individual's own two-model view.
export const AnalyticalDashboard = () => {
  const { data, loading, error, reload } = useApi(() => api.me.record(), []);
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pt-[112px] pb-16">
      <AppNav active="analytics" />
      <main className="max-w-[1280px] mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        {loading && <Loading label="Loading your analysis…" />}
        {error && <ErrorState error={error} onRetry={reload} />}
        {data && <PersonView person={data} subjectLabel="Your record" />}
      </main>
      <div className="mt-16"><SiteFooter /></div>
    </div>
  );
};
