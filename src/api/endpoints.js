// The API surface the UI talks to. One object, two implementations:
//   - mock  : resolves from src/api/mock.js (used when VITE_API_URL is unset)
//   - http  : calls a real backend at VITE_API_URL using the routes below
//
// To attach a backend: set VITE_API_URL and implement these routes. Response
// shapes must match src/api/mock.js (see PersonRecord / PatientSummary там).

import { http, USE_MOCK, setToken } from './client';
import * as db from './mock';

const delay = (ms = 180) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------- mock impl
const mock = {
  auth: {
    async login({ role }) {
      await delay();
      const token = `mock.${role}.${Date.now()}`;
      setToken(token);
      return { role, token };
    },
    async logout() {
      await delay(40);
      setToken(null);
      return null;
    },
  },
  me: {
    async record() { await delay(); return db.patientSelf; },              // PersonRecord
    async devices() { await delay(); return db.selfDevices; },
  },
  clinic: {
    async profile() { await delay(); return db.hospital; },
    async patients() { await delay(); return db.patients.map(db.toSummary); }, // PatientSummary[]
    async patient(id) { await delay(); return db.getPatient(id); },           // PersonRecord
  },
  meta: {
    async modelContext() { return db.modelContext; },
  },
};

// ---------------------------------------------------------------- http impl
const rest = {
  auth: {
    async login(creds) {
      const out = await http('/auth/login', { method: 'POST', body: creds });
      setToken(out.token);
      return out; // { role, token }
    },
    async logout() {
      await http('/auth/logout', { method: 'POST' });
      setToken(null);
      return null;
    },
  },
  me: {
    record: () => http('/me/record'),
    devices: () => http('/me/devices'),
  },
  clinic: {
    profile: () => http('/clinic/profile'),
    patients: () => http('/clinic/patients'),
    patient: (id) => http(`/clinic/patients/${encodeURIComponent(id)}`),
  },
  meta: {
    modelContext: () => http('/meta/model-context'),
  },
};

export const api = USE_MOCK ? mock : rest;
export { USE_MOCK };
