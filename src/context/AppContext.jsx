import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/endpoints';
import { setToken } from '../api/client';

const AppContext = createContext();

// role: null (logged out) | 'patient' | 'clinician'
export const ACCESS = {
  home: 'public',
  pricing: 'public',
  login: 'public',
  dashboard: 'patient',
  analytics: 'patient',
  wearables: 'patient',
  clinical: 'clinician',
  'patient-view': 'clinician',
};

const HOME_FOR = { patient: 'dashboard', clinician: 'clinical' };

const ls = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  del: (k) => { try { localStorage.removeItem(k); } catch { /* ignore */ } },
};

const readRole = () => {
  const r = ls.get('mindsync.role');
  return r === 'patient' || r === 'clinician' ? r : null;
};
const readOnboarded = () => ls.get('mindsync.onboarded') === '1';

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(readRole);
  const [onboarded, setOnboarded] = useState(readOnboarded);
  const [busy, setBusy] = useState(false);
  const [activeTab, setActiveTabRaw] = useState(() => {
    const r = readRole();
    if (!r) return 'home';
    if (r === 'patient' && !readOnboarded()) return 'wearables';
    return HOME_FOR[r];
  });
  const [selectedPatientId, setSelectedPatientId] = useState('NG-0142');

  // restore mock/real token on boot so api calls are authorised after refresh
  useEffect(() => {
    const t = ls.get('mindsync.token');
    if (t) setToken(t);
  }, []);

  const resolve = (tab, r) => {
    const need = ACCESS[tab] ?? 'public';
    if (need === 'public') {
      if (tab === 'login' && r) return HOME_FOR[r];
      return tab;
    }
    if (need === r) return tab;
    return r ? HOME_FOR[r] : 'login';
  };

  const go = (tab) => { setActiveTabRaw(resolve(tab, role)); window.scrollTo({ top: 0 }); };
  const setActiveTab = go;

  const login = async ({ email, password, role: wantRole }) => {
    setBusy(true);
    try {
      const { role: r, token } = await api.auth.login({ email, password, role: wantRole });
      ls.set('mindsync.role', r);
      if (token) ls.set('mindsync.token', token);
      setRole(r);
      setActiveTabRaw(r === 'patient' && !onboarded ? 'wearables' : HOME_FOR[r]);
      window.scrollTo({ top: 0 });
    } finally {
      setBusy(false);
    }
  };

  const completeOnboarding = () => {
    ls.set('mindsync.onboarded', '1');
    setOnboarded(true);
    setActiveTabRaw('dashboard');
    window.scrollTo({ top: 0 });
  };

  const logout = async () => {
    try { await api.auth.logout(); } catch { /* ignore */ }
    ls.del('mindsync.role'); ls.del('mindsync.token'); ls.del('mindsync.onboarded');
    setRole(null);
    setOnboarded(false);
    setActiveTabRaw('home');
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    setActiveTabRaw((t) => resolve(t, role));
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider
      value={{
        role, onboarded, busy, login, logout, completeOnboarding,
        activeTab, setActiveTab, selectedPatientId, setSelectedPatientId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
