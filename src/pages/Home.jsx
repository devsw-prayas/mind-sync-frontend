import React from 'react';
import { useApp } from '../context/AppContext';
import { MarketingNav } from '../components/MarketingNav';
import { SiteFooter } from '../components/SiteFooter';
import heroBg from '../assets/hero-bg.png';

// Ported from private/.../mindsync_home_canonical/code.html
export const Home = () => {
  const { setActiveTab } = useApp();
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <MarketingNav active="home" />

      <main className="flex-grow pt-[48px] pb-[64px] px-container-padding-mobile md:px-container-padding-desktop max-w-[1280px] mx-auto w-full">
        {/* Hero */}
        <section
          className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-[64px] items-center rounded-2xl overflow-hidden"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
        >
          <div className="space-y-[24px] lg:col-span-8 p-[40px] rounded-2xl bg-surface/40 backdrop-blur-sm m-[24px]">
            <div className="inline-flex items-center gap-[12px] bg-secondary-container/30 px-[12px] py-[8px] rounded-full text-secondary font-label-md text-label-md">
              <span className="material-symbols-outlined text-sm">health_and_safety</span>
              <span>Screening / risk indication — not a diagnosis</span>
            </div>
            <h1 className="text-display-lg font-display-lg text-on-surface">Your Mind,<br />Synchronized by AI.</h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg">
              Harness the power of your wearable data. MindSync uses temporal models to estimate mood and resilience from actigraphy, HRV, sleep and daily activity — a calm, clinical approach to everyday wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-[12px] pt-[12px]">
              <button onClick={() => setActiveTab('wearables')} className="bg-[#3d6b7a] text-[#ffffff] px-6 py-3 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity shadow-sm text-center">
                Start Your Journey
              </button>
              <button onClick={() => setActiveTab('clinical')} className="border border-outline text-on-surface px-6 py-3 rounded-full font-label-md text-label-md hover:bg-surface-container transition-colors text-center">
                For Healthcare Providers
              </button>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="mb-[64px]">
          <h2 className="text-headline-lg font-headline-lg text-center mb-[40px]">Precision Insights for Peace of Mind</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <button onClick={() => setActiveTab('wearables')} className="text-left md:col-span-7 bg-surface-container-lowest rounded-2xl p-[40px] shadow-[0_20px_40px_0_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col justify-between relative overflow-hidden hover:border-mindsync-teal transition-colors">
              <div className="z-10">
                <div className="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center mb-[24px]">
                  <span className="material-symbols-outlined text-primary">watch</span>
                </div>
                <h3 className="text-headline-md font-headline-md mb-[12px]">Wearable Sync</h3>
                <p className="text-body-md font-body-md text-on-surface-variant max-w-md">Seamlessly connect your devices. We continuously analyze background biometrics to map the physical indicators of stress and recovery.</p>
              </div>
              <div className="mt-[40px] relative h-48 w-full bg-surface-container-low rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute w-24 h-24 border-2 border-secondary rounded-full animate-ping opacity-20"></div>
                <div className="absolute w-16 h-16 bg-secondary/10 border border-secondary rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">sync</span>
                </div>
              </div>
            </button>

            <button onClick={() => setActiveTab('clinical')} className="text-left md:col-span-5 bg-surface-container-lowest rounded-2xl p-[40px] shadow-[0_20px_40px_0_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col hover:border-mindsync-teal transition-colors">
              <div className="w-12 h-12 bg-secondary-container/50 rounded-full flex items-center justify-center mb-[24px]">
                <span className="material-symbols-outlined text-secondary">medical_services</span>
              </div>
              <h3 className="text-headline-md font-headline-md mb-[12px]">Clinical Support</h3>
              <p className="text-body-md font-body-md text-on-surface-variant flex-grow">Share your predictive insights directly with your care team. MindSync provides structured, HIPAA-compliant reporting designed for clinical review.</p>
              <div className="mt-[24px] p-[12px] bg-surface-container rounded-xl border border-outline-variant/50">
                <div className="flex items-center gap-[12px] mb-[4px]">
                  <span className="material-symbols-outlined text-tertiary text-sm">lock</span>
                  <span className="text-label-md font-label-md text-tertiary">End-to-End Encrypted</span>
                </div>
              </div>
            </button>

            <button onClick={() => setActiveTab('analytics')} className="text-left md:col-span-12 bg-surface-container-lowest rounded-2xl p-[40px] shadow-[0_20px_40px_0_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col md:flex-row items-center gap-[40px] hover:border-mindsync-teal transition-colors">
              <div className="flex-1 space-y-[12px]">
                <div className="w-12 h-12 bg-tertiary-container/20 rounded-full flex items-center justify-center mb-[12px]">
                  <span className="material-symbols-outlined text-tertiary">monitoring</span>
                </div>
                <h3 className="text-headline-md font-headline-md">Predictive Insights</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">Don't wait for burnout. Our models estimate mood and resilience by identifying subtle shifts in your baseline biometrics, surfacing periods of high cognitive load before they manifest.</p>
              </div>
              <div className="flex-1 w-full relative rounded-xl overflow-hidden bg-surface-container-low h-48 border border-outline-variant/30 flex items-end px-[24px] pt-[24px]">
                <div className="w-full flex items-end justify-between gap-[4px] h-full opacity-70">
                  <div className="w-1/6 bg-primary/30 h-1/4 rounded-t-sm"></div>
                  <div className="w-1/6 bg-primary/40 h-2/4 rounded-t-sm"></div>
                  <div className="w-1/6 bg-primary/50 h-3/4 rounded-t-sm"></div>
                  <div className="w-1/6 bg-secondary/60 h-full rounded-t-sm relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface text-on-surface text-[12px] font-medium px-2 py-1 rounded shadow-sm border border-outline-variant/50">Optimal</div>
                  </div>
                  <div className="w-1/6 bg-primary/40 h-2/4 rounded-t-sm"></div>
                </div>
              </div>
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};
