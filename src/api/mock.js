// Coherent placeholder data. NOT model output — unified dummy values so every
// screen describes the same people.

// CV numbers actually reported by the pipeline (subject-level grouped CV)
export const modelContext = {
  chronicF1: 0.73, chronicN: 55, chronicDataset: 'Depresjon',
  weeklyF1: 0.42, weeklyN: 53, weeklyDataset: 'LifeSnaps',
  blurb:
    'Chronic evaluates structural rest-activity rhythms; Weekly evaluates acute deviations. Screening / risk indication — not a diagnosis.',
};

// Full per-person shape used by both the patient's own view and the clinician's
// per-patient drill-down.
function person(o) {
  return {
    device: 'ActiGraph GT9X',
    window: 'Oct 12 - Oct 19, 2023',
    coverage: 94,
    traits: [
      { label: 'Emotional Stability', value: 'High', pct: 85 },
      { label: 'Social Engagement', value: 'Moderate', pct: 60 },
      { label: 'Stress Tolerance', value: 'Optimal', pct: 92 },
      { label: 'Cognitive Load', value: 'Low', pct: 25 },
    ],
    weekBars: [
      ['Mon', 60, 40], ['Tue', 75, 60], ['Wed', 45, 30], ['Thu', 90, 100],
      ['Fri', 65, 50], ['Sat', 80, 70], ['Sun', 85, 90],
    ],
    biometrics: { sleep: '7h 20m', sleepDelta: '+20m vs yesterday', hrv: '55ms', hrvNote: 'Optimal Range', steps: '6,000' },
    dataQuality: '94% wear compliance over 7 days. Missing segments mainly 09:00-11:00 on Day 2.',
    ...o,
  };
}

// The logged-in individual's own record
export const patientSelf = person({
  id: 'you', name: 'Alex Rivera',
  chronic: {
    verdict: 'Moderate', confidence: 72,
    probs: [
      { label: 'None / Mild', value: 15 },
      { label: 'Moderate', value: 72 },
      { label: 'Severe', value: 13 },
    ],
    circadian: { IS: 0.42, IV: 1.15, RA: 0.88, L5: '2:00 AM' },
  },
  weekly: {
    state: 'Low Mood', confidence: 48, uncertain: true,
    probs: [
      { label: 'Calm', value: 22 },
      { label: 'Stressed', value: 30 },
      { label: 'Low Mood', value: 48 },
    ],
    attentionDay: 4,
    drivers: { staiS: 45, staiMax: 80, sleepEfficiency: 68, sleepAvg: 85 },
  },
});

export const hospital = { name: 'Northside General', unit: 'Behavioural Health' };

// Patients assigned to this hospital account
export const patients = [
  person({
    id: 'NG-0142', name: 'Sarah Jensen', initials: 'SJ',
    dx: 'Recurrent depressive episode', enrolled: 'Enrolled Oct 2023',
    status: 'Needs review', tone: 'error', lastSync: '2m ago',
    coverage: 88,
    traits: [
      { label: 'Emotional Stability', value: 'Low', pct: 28 },
      { label: 'Social Engagement', value: 'Reduced', pct: 22 },
      { label: 'Stress Tolerance', value: 'Low', pct: 30 },
      { label: 'Cognitive Load', value: 'High', pct: 82 },
    ],
    biometrics: { sleep: '5h 40m', sleepDelta: '-50m vs baseline', hrv: '22ms', hrvNote: 'Below baseline', steps: '1,900' },
    chronic: {
      verdict: 'Severe', confidence: 81,
      probs: [
        { label: 'None / Mild', value: 6 },
        { label: 'Moderate', value: 19 },
        { label: 'Severe', value: 75 },
      ],
      circadian: { IS: 0.31, IV: 1.42, RA: 0.71, L5: '3:40 AM' },
    },
    weekly: {
      state: 'Low Mood', confidence: 74, uncertain: false,
      probs: [
        { label: 'Calm', value: 8 },
        { label: 'Stressed', value: 18 },
        { label: 'Low Mood', value: 74 },
      ],
      attentionDay: 6,
      drivers: { staiS: 58, staiMax: 80, sleepEfficiency: 61, sleepAvg: 85 },
    },
    resilienceTrend: 'declining',
    dataQuality: '88% wear compliance. Non-wear gaps on Day 2 and Day 5 evenings.',
  }),
  person({
    id: 'NG-0219', name: 'Michael Reyes', initials: 'MR',
    dx: 'Generalized Anxiety Disorder', enrolled: 'Enrolled Aug 2023',
    status: 'Stable', tone: 'sage', lastSync: 'Just now',
    chronic: {
      verdict: 'None / Mild', confidence: 69,
      probs: [
        { label: 'None / Mild', value: 69 },
        { label: 'Moderate', value: 24 },
        { label: 'Severe', value: 7 },
      ],
      circadian: { IS: 0.58, IV: 0.74, RA: 0.91, L5: '2:10 AM' },
    },
    weekly: {
      state: 'Calm', confidence: 63, uncertain: false,
      probs: [
        { label: 'Calm', value: 63 },
        { label: 'Stressed', value: 25 },
        { label: 'Low Mood', value: 12 },
      ],
      attentionDay: 3,
      drivers: { staiS: 38, staiMax: 80, sleepEfficiency: 89, sleepAvg: 85 },
    },
    resilienceTrend: 'improving',
  }),
  person({
    id: 'NG-0263', name: 'Emma Lindqvist', initials: 'EL',
    dx: 'Bipolar II — hypomanic surveillance', enrolled: 'Enrolled Nov 2023',
    status: 'Monitoring', tone: 'teal', lastSync: '15m ago',
    traits: [
      { label: 'Emotional Stability', value: 'Variable', pct: 48 },
      { label: 'Social Engagement', value: 'High', pct: 88 },
      { label: 'Stress Tolerance', value: 'Moderate', pct: 55 },
      { label: 'Cognitive Load', value: 'Elevated', pct: 70 },
    ],
    biometrics: { sleep: '4h 05m', sleepDelta: '-2h vs baseline', hrv: '65ms', hrvNote: 'Elevated baseline', steps: '14,300' },
    chronic: {
      verdict: 'Moderate', confidence: 64,
      probs: [
        { label: 'None / Mild', value: 21 },
        { label: 'Moderate', value: 64 },
        { label: 'Severe', value: 15 },
      ],
      circadian: { IS: 0.34, IV: 1.28, RA: 0.83, L5: '4:20 AM' },
    },
    weekly: {
      state: 'Stressed', confidence: 55, uncertain: true,
      probs: [
        { label: 'Calm', value: 18 },
        { label: 'Stressed', value: 55 },
        { label: 'Low Mood', value: 27 },
      ],
      attentionDay: 5,
      drivers: { staiS: 52, staiMax: 80, sleepEfficiency: 54, sleepAvg: 85 },
    },
    resilienceTrend: 'volatile',
    dataQuality: '96% wear compliance. High nocturnal activity flagged Days 3-5.',
  }),
  person({
    id: 'NG-0311', name: 'David Okafor', initials: 'DO',
    dx: 'Adjustment disorder', enrolled: 'Enrolled Dec 2023',
    status: 'Stable', tone: 'sage', lastSync: '1h ago',
    chronic: {
      verdict: 'None / Mild', confidence: 77,
      probs: [
        { label: 'None / Mild', value: 77 },
        { label: 'Moderate', value: 18 },
        { label: 'Severe', value: 5 },
      ],
      circadian: { IS: 0.61, IV: 0.66, RA: 0.9, L5: '1:50 AM' },
    },
    weekly: {
      state: 'Calm', confidence: 71, uncertain: false,
      probs: [
        { label: 'Calm', value: 71 },
        { label: 'Stressed', value: 20 },
        { label: 'Low Mood', value: 9 },
      ],
      attentionDay: 2,
      drivers: { staiS: 34, staiMax: 80, sleepEfficiency: 91, sleepAvg: 85 },
    },
    resilienceTrend: 'improving',
  }),
];

export const getPatient = (id) => patients.find((p) => p.id === id) || patients[0];

// Roster row shape (subset of PersonRecord) — what /clinic/patients returns.
export const toSummary = (p) => ({
  id: p.id, name: p.name, initials: p.initials, dx: p.dx,
  status: p.status, tone: p.tone, lastSync: p.lastSync,
});

// Devices linked to the logged-in individual (/me/devices).
export const selfDevices = [
  { id: 'apple', name: 'Apple Health', connected: true },
  { id: 'fitbit', name: 'Fitbit', connected: false },
  { id: 'oura', name: 'Oura', connected: false },
  { id: 'garmin', name: 'Garmin', connected: false },
  { id: 'whoop', name: 'Whoop', connected: false },
  { id: 'google', name: 'Google Fit', connected: false },
];
