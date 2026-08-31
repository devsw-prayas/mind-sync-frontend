import React from 'react';
import { modelContext } from '../api/mock';

const ProbRow = ({ label, value, active, color }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-label-sm font-label-sm">
      <span className={active ? `text-${color} font-bold` : ''}>{label}</span>
      <span className={active ? `text-${color} font-bold` : 'text-secondary'}>{value}%</span>
    </div>
    <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
      <div className={active ? `bg-${color} h-1.5 rounded-full` : 'bg-outline h-1.5 rounded-full opacity-40'} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

const CIRCADIAN_BARS = [18, 12, 9, 8, 10, 22, 40, 62, 78, 88, 84, 70, 66, 74, 60, 52, 44, 30, 24, 18, 14, 20, 28, 22];

const TREND_PATH = {
  declining: 'M 0,60 L 140,72 L 280,85 L 420,100 L 560,120 L 700,140 L 840,160 L 1000,178',
  improving: 'M 0,160 L 140,150 L 280,130 L 420,120 L 560,95 L 700,80 L 840,55 L 1000,45',
  volatile: 'M 0,120 L 140,70 L 280,150 L 420,90 L 560,140 L 700,80 L 840,130 L 1000,95',
};

// The two-model view for a single person. Used by the patient (their own record)
// and by the clinician drill-down (a patient assigned to their hospital).
export const PersonView = ({ person, subjectLabel, showResilience = false }) => {
  const { chronic, weekly } = person;
  return (
    <div className="flex flex-col gap-stack-lg">
      {/* Context row */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md pb-4 border-b border-border-light">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-midnight-navy">{person.name}</h1>
            <span className="bg-[#F9FAFA] border border-border-light rounded-lg px-3 py-1 text-label-md font-label-md">{subjectLabel || person.id}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-label-sm font-label-sm text-secondary">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_month</span> {person.window}</span>
            <span className="text-border-light">|</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">watch</span> {person.device}</span>
            <span className="text-border-light">|</span>
            <span className="flex items-center gap-1 text-sage-status"><span className="material-symbols-outlined text-sm">check_circle</span> {person.coverage}% Data Coverage</span>
          </div>
        </div>
        <div className="bg-error-container/20 border border-error-container rounded-full px-4 py-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-sm">info</span>
          <span className="text-label-sm font-label-sm text-error">Screening / risk indication — not a diagnosis</span>
        </div>
      </header>

      {/* Band 1: Chronic Trait Screening */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h2 className="text-headline-md font-headline-md text-midnight-navy">Chronic Trait Screening</h2>
          <div className="h-[1px] flex-grow bg-border-light ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3 bg-surface-container-lowest border border-border-light rounded-xl p-6 soft-shadow flex flex-col justify-center">
            <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider mb-2">Model Verdict</span>
            <div className="flex items-baseline gap-2 mb-4"><span className="text-headline-lg font-headline-lg text-midnight-navy">{chronic.verdict}</span></div>
            <div className="w-full bg-surface-container-high rounded-full h-2 mb-1 overflow-hidden">
              <div className="bg-tertiary h-2 rounded-full" style={{ width: `${chronic.confidence}%` }}></div>
            </div>
            <span className="text-label-sm font-label-sm text-secondary text-right">{chronic.confidence}% Confidence</span>
          </div>
          <div className="md:col-span-3 bg-surface-container-lowest border border-border-light rounded-xl p-6 soft-shadow flex flex-col gap-4">
            <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Class Probabilities</span>
            {chronic.probs.map((p) => (
              <ProbRow key={p.label} label={p.label} value={p.value} active={p.label === chronic.verdict} color="tertiary" />
            ))}
          </div>
          <div className="md:col-span-6 bg-surface-container-lowest border border-border-light rounded-xl p-6 soft-shadow flex flex-col justify-between">
            <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider mb-4">Circadian Fingerprint</span>
            <div className="flex items-end h-32 gap-[3px] w-full mb-4">
              {CIRCADIAN_BARS.map((h, i) => (
                <div key={i} className="flex-1 bg-mindsync-teal/60 rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between border-t border-border-light pt-4">
              <div className="flex flex-col"><span className="text-label-sm font-label-sm text-secondary">IS</span><span className="text-body-md font-body-md">{chronic.circadian.IS}</span></div>
              <div className="flex flex-col"><span className="text-label-sm font-label-sm text-secondary">IV</span><span className="text-body-md font-body-md">{chronic.circadian.IV}</span></div>
              <div className="flex flex-col"><span className="text-label-sm font-label-sm text-secondary">RA</span><span className="text-body-md font-body-md">{chronic.circadian.RA}</span></div>
              <div className="flex flex-col"><span className="text-label-sm font-label-sm text-secondary">L5</span><span className="text-body-md font-body-md text-coral-status">{chronic.circadian.L5}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2: Weekly Emotional State */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <h2 className="text-headline-md font-headline-md text-midnight-navy">Weekly Emotional State</h2>
          <div className="h-[1px] flex-grow bg-border-light ml-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-3 bg-surface-container-lowest border border-border-light rounded-xl p-6 soft-shadow flex flex-col justify-center">
            <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider mb-2">Current State</span>
            <div className="flex items-baseline gap-2 mb-4"><span className="text-headline-lg font-headline-lg text-midnight-navy">{weekly.state}</span></div>
            {weekly.uncertain && (
              <div className="flex gap-2 mb-4"><span className="bg-coral-status/10 text-coral-status px-2 py-1 rounded-md text-label-sm font-label-sm">Uncertain</span></div>
            )}
            <div className="w-full bg-surface-container-high rounded-full h-2 mb-1 overflow-hidden">
              <div className="bg-mindsync-teal h-2 rounded-full opacity-60" style={{ width: `${weekly.confidence}%` }}></div>
            </div>
            <span className="text-label-sm font-label-sm text-secondary text-right">{weekly.confidence}% Confidence{weekly.confidence < 50 ? ' (< 0.5)' : ''}</span>
          </div>
          <div className="md:col-span-3 bg-surface-container-lowest border border-border-light rounded-xl p-6 soft-shadow flex flex-col gap-4">
            <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">State Probabilities</span>
            {weekly.probs.map((p) => (
              <ProbRow key={p.label} label={p.label} value={p.value} active={p.label === weekly.state} color="mindsync-teal" />
            ))}
          </div>
          <div className="md:col-span-6 bg-surface-container-lowest border border-border-light rounded-xl p-6 soft-shadow flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-label-sm font-label-sm text-secondary uppercase tracking-wider">Key Drivers &amp; Signals</span>
              <span className="text-label-sm font-label-sm bg-warm-grey-bg px-2 py-1 rounded border border-border-light">Attention: Day {weekly.attentionDay}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 p-3 bg-warm-grey-bg rounded-lg border border-border-light">
                <span className="text-label-sm font-label-sm text-secondary">Estimated STAI-S</span>
                <div className="flex items-end gap-2"><span className="text-headline-md font-headline-md">{weekly.drivers.staiS}</span><span className="text-label-sm text-secondary mb-1">/ {weekly.drivers.staiMax}</span></div>
              </div>
              <div className="flex flex-col gap-2 p-3 bg-warm-grey-bg rounded-lg border border-border-light">
                <span className="text-label-sm font-label-sm text-secondary">Sleep Efficiency</span>
                <div className="flex items-end gap-2"><span className="text-headline-md font-headline-md text-coral-status">{weekly.drivers.sleepEfficiency}%</span><span className="text-label-sm text-secondary mb-1">vs {weekly.drivers.sleepAvg}% avg</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resilience Record (clinician drill-down only) */}
      {showResilience && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <h2 className="text-headline-md font-headline-md text-midnight-navy">Resilience Record</h2>
            <div className="h-[1px] flex-grow bg-border-light ml-4"></div>
          </div>
          <div className="bg-surface-container-lowest border border-border-light rounded-xl p-8 soft-shadow">
            <div className="flex justify-between items-center mb-6">
              <p className="text-on-surface-variant text-body-md">90-day longitudinal stability index — trend: <span className="font-semibold text-midnight-navy">{person.resilienceTrend || 'stable'}</span></p>
              <div className="flex bg-warm-grey-bg rounded-lg border border-border-light p-1">
                <button className="px-4 py-1.5 rounded bg-surface text-midnight-navy shadow-sm font-label-sm">90 Days</button>
                <button className="px-4 py-1.5 rounded text-on-surface-variant font-label-sm">6 Months</button>
              </div>
            </div>
            <div className="h-56 relative w-full border-b border-l border-border-light">
              <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <defs>
                  <linearGradient id="pv-line" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#3D6B7A"></stop>
                    <stop offset="100%" stopColor="#8DA399"></stop>
                  </linearGradient>
                </defs>
                <path
                  d={(TREND_PATH[person.resilienceTrend] || TREND_PATH.improving) + ' L 1000,200 L 0,200 Z'}
                  fill="#3D6B7A" fillOpacity="0.08"
                />
                <path
                  d={TREND_PATH[person.resilienceTrend] || TREND_PATH.improving}
                  fill="none" stroke="url(#pv-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                />
              </svg>
            </div>
            <div className="flex justify-between text-label-sm text-on-surface-variant px-4 mt-3">
              <span>Sep 1</span><span>Oct 1</span><span>Nov 1</span><span>Today</span>
            </div>
          </div>
        </section>
      )}

      {/* Bottom context */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-4 border-t border-border-light pt-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-label-md font-label-md text-midnight-navy flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">verified_user</span> Data Quality</h3>
          <p className="text-body-md text-secondary text-sm">{person.dataQuality}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-label-md font-label-md text-midnight-navy flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">science</span> Model Context</h3>
          <p className="text-body-md text-secondary text-sm">
            CV Macro-F1: {modelContext.chronicF1} (Chronic, {modelContext.chronicDataset} N={modelContext.chronicN}),
            {' '}{modelContext.weeklyF1} (Weekly, {modelContext.weeklyDataset} N={modelContext.weeklyN}). {modelContext.blurb}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-label-md font-label-md text-midnight-navy flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">warning</span> Limitations</h3>
          <p className="text-body-md text-secondary text-sm">Not a diagnostic tool. Algorithmic affect estimation does not equate to clinical depression or anxiety disorders.</p>
        </div>
      </section>
    </div>
  );
};
