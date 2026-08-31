import React from 'react';

// Shared footer for marketing + app pages (ported from the Stitch home footer).
export const SiteFooter = () => (
  <footer className="w-full py-[64px] px-container-padding-mobile md:px-container-padding-desktop flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto bg-surface-container-lowest border-t border-outline-variant">
    <div className="flex flex-col items-center md:items-start mb-[24px] md:mb-0">
      <span className="text-label-md font-label-md font-bold text-on-surface mb-[4px]">MindSync</span>
      <p className="text-[12px] font-medium text-on-surface-variant">© 2024 MindSync. Screening / risk indication — not a diagnosis.</p>
    </div>
    <div className="flex flex-wrap justify-center gap-[24px]">
      <a className="text-[12px] font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
      <a className="text-[12px] font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
      <a className="text-[12px] font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Security Trust</a>
      <a className="text-[12px] font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">HIPAA Compliance</a>
    </div>
  </footer>
);
