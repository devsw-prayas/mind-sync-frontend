import React from 'react';

// Minimal centred loading / error states, on-brand.
export const Loading = ({ label = 'Loading…' }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-3 text-on-surface-variant">
    <span className="material-symbols-outlined animate-spin text-mindsync-teal text-[32px]">progress_activity</span>
    <span className="text-label-md font-label-md">{label}</span>
  </div>
);

export const ErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-3 text-on-surface-variant">
    <span className="material-symbols-outlined text-error text-[32px]">error</span>
    <span className="text-label-md font-label-md">Couldn’t load this data.</span>
    {error?.message && <span className="text-label-sm font-label-sm text-secondary max-w-md text-center">{error.message}</span>}
    {onRetry && (
      <button onClick={onRetry} className="mt-2 px-4 py-2 rounded-lg bg-mindsync-teal text-white text-label-md font-label-md">Retry</button>
    )}
  </div>
);
