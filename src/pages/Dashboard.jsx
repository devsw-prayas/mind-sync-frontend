import React from 'react';
import { useApp } from '../context/AppContext';
import { AppNav } from '../components/AppNav';
import { SiteFooter } from '../components/SiteFooter';
import { Loading, ErrorState } from '../components/Loading';
import { useApi } from '../hooks/useApi';
import { api } from '../api/endpoints';

// Ported from private/.../mindsync_dashboard_canonical/code.html
export const Dashboard = () => {
  const { setActiveTab } = useApp();
  const { data: subject, loading, error, reload } = useApi(() => api.me.record(), []);
  const { data: modelContext } = useApi(() => api.meta.modelContext(), []);

  if (loading || !modelContext) return (<div className="min-h-screen bg-background"><AppNav active="dashboard" /><div className="pt-[140px]"><Loading label="Loading your dashboard…" /></div></div>);
  if (error) return (<div className="min-h-screen bg-background"><AppNav active="dashboard" /><div className="pt-[140px]"><ErrorState error={error} onRetry={reload} /></div></div>);

  const b = subject.biometrics;
  return (
    <div className="antialiased min-h-screen pb-stack-lg bg-background text-on-surface">
      <AppNav active="dashboard" />

      <main className="pt-[140px] max-w-[1440px] mx-auto px-container-padding-mobile md:px-container-padding-desktop grid grid-cols-4 md:grid-cols-12 gap-gutter">
        {/* Welcome */}
        <div className="col-span-4 md:col-span-12 mb-stack-md flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-headline-lg-mobile md:text-display-lg font-headline-lg-mobile md:font-display-lg text-on-surface">Good Morning, {subject.name.split(' ')[0]}</h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant mt-2">Your emotional states and resilience are being predicted automatically.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('analytics')} className="bg-primary-container text-on-primary rounded-full px-8 py-3.5 text-label-md font-label-md hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined filled">psychology</span>View AI Insights
            </button>
            <button onClick={() => setActiveTab('wearables')} className="border border-outline-variant text-on-surface rounded-full px-8 py-3.5 text-label-md font-label-md hover:bg-surface-container-low transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined">watch</span>Manage Devices
            </button>
          </div>
        </div>

        {/* Chronic Trait Screening */}
        <section className="col-span-4 md:col-span-12 bento-card soft-shadow bg-surface-container-lowest/80 flex flex-col gap-6" style={{ borderLeft: '4px solid rgb(61, 107, 122)' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-headline-md font-headline-md text-on-surface">Chronic Trait Screening</h2>
            <span className="text-label-sm font-label-sm text-mindsync-teal bg-primary-fixed/30 px-3 py-1 rounded-full">Long-term Baseline</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {subject.traits.map((t) => (
              <div key={t.label} className="p-4 rounded-lg bg-surface-container-low">
                <div className="text-label-sm text-tertiary uppercase mb-2">{t.label}</div>
                <div className="text-headline-md text-on-surface">{t.value}</div>
                <div className="w-full bg-outline-variant h-1.5 mt-3 rounded-full">
                  <div className="bg-mindsync-teal h-full rounded-full" style={{ width: `${t.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Emotional State */}
        <section className="col-span-4 md:col-span-12 bento-card soft-shadow bg-surface-container-lowest/80 flex flex-col gap-6" style={{ borderLeft: '4px solid rgb(141, 163, 153)' }}>
          <div className="flex justify-between items-center">
            <h2 className="text-headline-md font-headline-md text-on-surface">Weekly Emotional State</h2>
            <span className="text-label-sm font-label-sm text-sage-status bg-sage-status/10 px-3 py-1 rounded-full">7-Day Variance</span>
          </div>
          <div className="h-48 w-full bg-surface-container-low rounded-lg relative overflow-hidden p-6">
            <div className="flex items-end justify-between h-full gap-4">
              {subject.weekBars.map(([d, h, op]) => (
                <div key={d} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-sm" style={{ height: `${h}%`, backgroundColor: `rgba(141,163,153,${op / 100})` }}></div>
                  <span className="text-label-sm text-outline">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biometric Cards */}
        <div className="col-span-4 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-gutter mt-2">
          <div className="bento-card soft-shadow flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-primary-fixed/30 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-mindsync-teal text-[28px]">bedtime</span>
            </div>
            <div>
              <h3 className="text-label-md font-label-md text-tertiary mb-1">Sleep</h3>
              <div className="text-headline-md font-headline-md text-on-surface">{b.sleep}</div>
              <div className="text-label-sm font-label-sm text-sage-status mt-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>{b.sleepDelta}
              </div>
            </div>
          </div>
          <div className="bento-card soft-shadow flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 relative">
              <span className="absolute inset-0 rounded-full border-2 border-mindsync-teal animate-ping opacity-20"></span>
              <span className="material-symbols-outlined text-mindsync-teal text-[28px]">monitor_heart</span>
            </div>
            <div>
              <h3 className="text-label-md font-label-md text-tertiary mb-1">HRV</h3>
              <div className="text-headline-md font-headline-md text-on-surface">{b.hrv}</div>
              <div className="text-label-sm font-label-sm text-on-surface-variant mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sage-status"></span>{b.hrvNote}
              </div>
            </div>
          </div>
          <div className="bento-card soft-shadow flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-surface-container-low flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-mindsync-teal text-[28px]">directions_run</span>
            </div>
            <div>
              <h3 className="text-label-md font-label-md text-tertiary mb-1">Daily Activity</h3>
              <div className="text-headline-md font-headline-md text-on-surface">{b.steps}</div>
              <div className="text-label-sm font-label-sm text-on-surface-variant mt-2">Steps today</div>
            </div>
          </div>
        </div>

        <div className="col-span-4 md:col-span-12 mt-stack-lg pt-8 border-t border-border-light grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="flex flex-col gap-2">
            <h4 className="text-label-md font-label-md text-on-surface uppercase tracking-wider">Model Context</h4>
            <p className="text-label-sm text-on-surface-variant">
              Predictions come from a hierarchical temporal model (day &rarr; week encoders with attention) over wearable actigraphy.
              Subject-level CV macro-F1: {modelContext.chronicF1} ({modelContext.chronicDataset} N={modelContext.chronicN}, chronic depression severity),
              {' '}{modelContext.weeklyF1} ({modelContext.weeklyDataset} N={modelContext.weeklyN}, weekly stress state).
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-label-md font-label-md text-on-surface uppercase tracking-wider">Limitations</h4>
            <p className="text-label-sm text-on-surface-variant">Informational only; not a clinical diagnosis. Sudden changes in biometric data may reflect physical activity or illness rather than emotional state.</p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};
