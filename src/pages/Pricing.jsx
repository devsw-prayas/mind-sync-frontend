import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MarketingNav } from '../components/MarketingNav';
import { SiteFooter } from '../components/SiteFooter';

// Ported from private/.../mindsync_pricing/code.html (toggle + FAQ -> React state)
const FAQS = [
  ['Can I cancel my subscription at any time?', 'Yes, you can cancel your subscription at any time from your account settings. If you cancel an annual plan, you will retain access until the end of your current billing cycle.'],
  ['Is my data secure and private?', 'We employ end-to-end encryption and adhere to strict privacy standards. The Clinical tier adds HIPAA-compliant data handling for direct provider communication.'],
  ['How does the clinician sharing work?', 'With the Clinical plan, you can generate a secure, temporary link or add your provider directly to your account. They will see a simplified, analytical view of your tracked data to aid in treatment.'],
];

export const Pricing = () => {
  const { setActiveTab } = useApp();
  const [annual, setAnnual] = useState(true);
  const [open, setOpen] = useState(null);
  const proPrice = annual ? 12 : 15;

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      <MarketingNav active="pricing" />

      <main className="flex-grow flex flex-col items-center w-full px-container-padding-mobile md:px-container-padding-desktop max-w-[1280px] mx-auto py-stack-lg">
        <section className="text-center w-full max-w-3xl mx-auto mb-stack-lg mt-stack-md">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary mb-4">Invest in your mind.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Choose the plan that best supports your mental health journey. Transparent pricing, clinical-grade tools.</p>
          <div className="flex items-center justify-center space-x-4">
            <span className={`font-label-md text-label-md transition-colors duration-200 ${annual ? 'billing-text-inactive' : 'billing-text-active'}`}>Monthly</span>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input checked={annual} onChange={(e) => setAnnual(e.target.checked)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 transition-transform duration-200 ease-in-out border-outline" type="checkbox" id="billing-toggle" />
              <label className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container-high cursor-pointer transition-colors duration-200 ease-in-out" htmlFor="billing-toggle"></label>
            </div>
            <span className={`font-label-md text-label-md transition-colors duration-200 flex items-center gap-2 ${annual ? 'billing-text-active' : 'billing-text-inactive'}`}>
              Annual <span className="bg-sage-status/12 text-sage-status px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Save 20%</span>
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 w-full mb-stack-lg md:grid-cols-2 justify-center max-w-3xl mx-auto">
          <div className="bg-surface-container-lowest border border-border-light rounded-xl p-8 flex flex-col h-full soft-shadow transition-transform hover:-translate-y-1 duration-300">
            <div className="mb-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Free</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 min-h-[52px]">Basic tracking and mindfulness exercises for individuals starting out.</p>
              <div className="flex items-baseline gap-1"><span className="font-display-lg text-headline-lg font-bold text-on-surface">$0</span><span className="font-label-sm text-label-sm text-secondary-fixed-dim">/mo</span></div>
            </div>
            <div className="flex-grow mb-8">
              <ul className="space-y-4 font-body-md text-body-md text-on-surface">
                {['Daily mood & habit tracking', 'Basic journal prompts', '7-day history view'].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span className="material-symbols-outlined text-mindsync-teal text-opacity-70 text-[20px]">check</span><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveTab('wearables')} className="w-full border border-border-light text-midnight-navy font-label-md text-label-md py-3 rounded-lg hover:bg-surface-container-low transition-colors">Get Started</button>
          </div>

          <div className="bg-warm-grey-bg border border-mindsync-teal rounded-xl p-8 flex flex-col h-full soft-shadow relative transform md:-translate-y-4 transition-transform hover:-translate-y-5 duration-300 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mindsync-teal text-on-primary px-4 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider">Most Popular</div>
            <div className="mb-6">
              <h3 className="font-headline-md text-headline-md text-primary mb-2">Pro</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 min-h-[52px]">Advanced insights using the same temporal model as Free, with complete chronological analysis.</p>
              <div className="flex items-baseline gap-1"><span className="font-display-lg text-headline-lg font-bold text-on-surface">${proPrice}</span><span className="font-label-sm text-label-sm text-secondary-fixed-dim">{annual ? '/mo, billed annually' : '/mo'}</span></div>
            </div>
            <div className="flex-grow mb-8">
              <ul className="space-y-4 font-body-md text-body-md text-on-surface">
                {['Everything in Free', 'Model-driven pattern recognition', 'Unlimited chronology & history', 'Export data reports', 'Priority Support', 'Faster Processing & Prioritization'].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span className="material-symbols-outlined text-mindsync-teal text-[20px]">check</span><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <button onClick={() => setActiveTab('dashboard')} className="w-full bg-mindsync-teal text-on-primary font-label-md text-label-md py-3 rounded-lg hover:bg-primary transition-colors shadow-sm">Start 14-Day Trial</button>
          </div>
        </section>

        <section className="w-full max-w-3xl mx-auto mt-stack-lg mb-stack-lg">
          <h2 className="font-headline-md text-headline-md text-primary text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQS.map(([q, a], i) => (
              <div key={q} className="border-b border-border-light pb-6">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center text-left focus:outline-none">
                  <span className="font-label-md text-label-md text-on-surface text-lg">{q}</span>
                  <span className="material-symbols-outlined text-secondary transition-transform duration-200" style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                </button>
                {open === i && <div className="mt-4 font-body-md text-body-md text-on-surface-variant">{a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};
